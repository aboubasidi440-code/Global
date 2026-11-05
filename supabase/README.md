# Supabase — schéma et configuration

Projet : `global-solutions` (`zjfrxfddrzkvpgtaorqp`).

## Tables (`public`)

| Table | Rôle | Lecture publique | Écriture |
| --- | --- | --- | --- |
| `projects` | réalisations (titre, catégorie, lieu, année, client, description, images, mise en avant) | lignes `published` | staff (`admin`/`editor`) |
| `team` | membres de l'équipe (nom, poste, bio, photo) | lignes `published` | staff |
| `articles` | actualités | lignes `published` | staff |
| `documents` | documents téléchargeables | lignes `published` | staff |
| `site_settings` | réglages éditoriaux (`homepage`, `contact`) en JSONB | lignes `published` | `admin` |
| `contact_requests` | demandes reçues via le formulaire | ❌ | staff en lecture/mise à jour ; insertion via la fonction edge uniquement |
| `contact_rate_limits` | compteurs anti-spam (5 demandes / 15 min par IP) | ❌ | ❌ |
| `profiles` | rôles (`admin` / `editor`) liés à `auth.users` | soi-même ou admin | ❌ |

Toutes les tables ont la RLS activée. Helpers : `public.is_admin()`, `public.is_staff()`,
`public.check_contact_rate(p_key)` (SECURITY DEFINER).

## Champs bilingues

`projects.title_en / category_en / description_en`, `team.position_en / bio_en`,
`articles.title_en / body_en`, `documents.title_en` et les variantes `*_en` de `site_settings`
(`homepage`) permettent la version anglaise du site.

## Stockage

- `contact-attachments` — pièces jointes du formulaire (privé, PDF/JPG/PNG/WebP, 5 Mo max).
- bucket média du site — privé, servi via URL signées.

## Fonction edge `contact-submit`

`POST /functions/v1/contact-submit` (multipart/form-data) :
`name`, `organisation`, `email`, `phone`, `service`, `message`, `attachment`, `website` (honeypot).

Réponses : `200 {ok:true}`, `400` champs invalides, `413` fichier trop lourd, `429` trop de demandes,
`503` service indisponible.

## Réglages `site_settings.contact`

```json
{
  "address": "Quartier Kouara Kano, N° 80, rue KK 33",
  "postal": "BP 11661, Niamey, Niger",
  "email_primary": "info@globalsolutions.one",
  "email_secondary": "",
  "notification_email": "globalsolution877@gmail.com",
  "notification_from": "Global Solutions <onboarding@resend.dev>",
  "phone_primary": "+227 90 39 31 32",
  "phone_secondary": "+227 98 33 61 91",
  "whatsapp": "22790393132",
  "facebook": "",
  "linkedin": "",
  "youtube": ""
}
```

`email_primary` est l'adresse affichée sur le site ; `notification_email` est l'adresse qui reçoit
les messages du formulaire.
