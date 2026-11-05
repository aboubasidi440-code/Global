// Edge function : réception sécurisée des demandes du formulaire de contact.
// - validation + limitation de débit (RPC check_contact_rate)
// - stockage de la pièce jointe dans le bucket privé contact-attachments
// - notification e-mail vers l'adresse définie dans site_settings (clé "contact",
//   champ "notification_email"), avec globalsolution877@gmail.com en repli.
const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json',
};
const respond = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), { status, headers: cors });

const DEFAULT_NOTIFICATION_EMAIL = 'globalsolution877@gmail.com';

type ContactSettings = {
  notification_email?: string;
  email_primary?: string;
  phone_primary?: string;
};

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
  if (req.method !== 'POST') return respond(405, { error: 'Méthode non autorisée' });
  const base = Deno.env.get('SUPABASE_URL'), key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!base || !key) return respond(503, { error: 'Service indisponible' });
  const auth = { apikey: key, Authorization: 'Bearer ' + key };

  try {
    if (Number(req.headers.get('content-length') || 0) > 6000000) return respond(413, { error: 'Fichier trop volumineux' });

    const ip = req.headers.get('cf-connecting-ip') || req.headers.get('x-real-ip') || req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(key + ':' + ip));
    const rateKey = Array.from(new Uint8Array(hash)).map((x) => x.toString(16).padStart(2, '0')).join('');
    const limit = await fetch(base + '/rest/v1/rpc/check_contact_rate', {
      method: 'POST',
      headers: { ...auth, 'Content-Type': 'application/json' },
      body: JSON.stringify({ p_key: rateKey }),
    });
    if (!limit.ok) return respond(503, { error: 'Service temporairement indisponible' });
    if ((await limit.json()) !== true) return respond(429, { error: 'Trop de demandes. Réessayez dans quelques minutes.' });

    const form = await req.formData();
    if (String(form.get('website') || '').trim()) return respond(200, { ok: true });

    const val = (name: string, max: number) => String(form.get(name) || '').trim().slice(0, max);
    const name = val('name', 150), organisation = val('organisation', 200), email = val('email', 254),
      phone = val('phone', 40), service = val('service', 150), message = val('message', 5000);
    if (!name || !email || !service || !message || !/^\S+@\S+\.\S+$/.test(email))
      return respond(400, { error: 'Veuillez vérifier les champs obligatoires.' });

    let attachmentPath: string | null = null, attachmentName: string | null = null;
    const file = form.get('attachment');
    if (file instanceof File && file.size) {
      if (file.size > 5242880) return respond(413, { error: 'La pièce jointe dépasse 5 Mo.' });
      const bytes = new Uint8Array(await file.arrayBuffer());
      const pdf = bytes.length >= 4 && bytes[0] === 37 && bytes[1] === 80 && bytes[2] === 68 && bytes[3] === 70;
      const jpg = bytes.length >= 3 && bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255;
      const png = bytes.length >= 8 && bytes[0] === 137 && bytes[1] === 80 && bytes[2] === 78 && bytes[3] === 71 && bytes[4] === 13 && bytes[5] === 10 && bytes[6] === 26 && bytes[7] === 10;
      const webp = bytes.length >= 12 && String.fromCharCode(...bytes.slice(0, 4)) === 'RIFF' && String.fromCharCode(...bytes.slice(8, 12)) === 'WEBP';
      const type = pdf ? 'application/pdf' : jpg ? 'image/jpeg' : png ? 'image/png' : webp ? 'image/webp' : null;
      const ext = pdf ? 'pdf' : jpg ? 'jpg' : png ? 'png' : webp ? 'webp' : null;
      if (!type || !ext) return respond(400, { error: 'Seuls les fichiers PDF, JPG, PNG et WebP sont acceptés.' });
      attachmentPath = crypto.randomUUID() + '.' + ext;
      attachmentName = file.name.replace(/[\u0000-\u001f\u007f/\\]/g, '_').slice(0, 150);
      const upload = await fetch(base + '/storage/v1/object/contact-attachments/' + attachmentPath, {
        method: 'POST',
        headers: { ...auth, 'Content-Type': type },
        body: bytes,
      });
      if (!upload.ok) return respond(503, { error: 'Le fichier ne peut pas être enregistré.' });
    }

    const saved = await fetch(base + '/rest/v1/contact_requests', {
      method: 'POST',
      headers: { ...auth, 'Content-Type': 'application/json', Prefer: 'return=representation' },
      body: JSON.stringify({ name, organisation: organisation || null, email, phone: phone || null, service, message, attachment_path: attachmentPath, attachment_name: attachmentName }),
    });
    if (!saved.ok) {
      if (attachmentPath)
        await fetch(base + '/storage/v1/object/contact-attachments', {
          method: 'DELETE',
          headers: { ...auth, 'Content-Type': 'application/json' },
          body: JSON.stringify({ prefixes: [attachmentPath] }),
        });
      return respond(503, { error: 'La demande ne peut pas être enregistrée.' });
    }
    const row = (await saved.json())[0];

    // Adresse de réception : site_settings.contact.notification_email, sinon repli.
    let recipient = DEFAULT_NOTIFICATION_EMAIL;
    try {
      const settingsRes = await fetch(base + '/rest/v1/site_settings?key=eq.contact&select=value', { headers: auth });
      if (settingsRes.ok) {
        const settings = (await settingsRes.json())?.[0]?.value as ContactSettings | undefined;
        const configured = String(settings?.notification_email || settings?.email_primary || '').trim();
        if (/^\S+@\S+\.\S+$/.test(configured)) recipient = configured;
      }
    } catch { /* on garde l'adresse de repli */ }

    const resendKey = Deno.env.get('RESEND_API_KEY'), from = Deno.env.get('NOTIFICATION_FROM');
    let status = 'failed', detail = '';
    if (!resendKey) detail = 'RESEND_API_KEY manquante';
    else if (!from) detail = 'NOTIFICATION_FROM manquante';
    else {
      try {
        const lines = [
          'Nouvelle demande reçue depuis le site Global Solutions.',
          '',
          'Nom : ' + name,
          organisation ? 'Organisation : ' + organisation : '',
          'E-mail : ' + email,
          phone ? 'Téléphone : ' + phone : '',
          'Service : ' + service,
          attachmentName ? 'Pièce jointe : ' + attachmentName : '',
          '',
          'Message :',
          message,
          '',
          'Référence : ' + row.id,
        ].filter(Boolean);
        const mail = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: { Authorization: 'Bearer ' + resendKey, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            from,
            to: [recipient],
            reply_to: email,
            subject: 'Nouvelle demande de ' + name + ' — ' + service,
            text: lines.join('\n'),
          }),
        });
        if (mail.ok) status = 'sent';
        else detail = ('Resend ' + mail.status + ' ' + (await mail.text())).slice(0, 500);
      } catch (mailError) {
        detail = String(mailError).slice(0, 500);
      }
    }

    await fetch(base + '/rest/v1/contact_requests?id=eq.' + row.id, {
      method: 'PATCH',
      headers: { ...auth, 'Content-Type': 'application/json' },
      body: JSON.stringify({ notification_status: status, notification_error: detail || null }),
    });

    return respond(200, { ok: true });
  } catch (_error) {
    return respond(500, { error: 'Une erreur est survenue. Veuillez réessayer.' });
  }
});
