import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://zjfrxfddrzkvpgtaorqp.supabase.co';

// Clé publishable (publique par conception) : elle ne donne accès qu'à ce que la RLS autorise.
const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpqZnJ4ZmRkcnprdnBndGFvcnFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM4Nzc2NzAsImV4cCI6MjEwOTQ1MzY3MH0.xC70ilR_CQMsomSV6fPE1xtWvttkQQgPC9Q50jqUJk0';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
});

export const FUNCTIONS_URL = `${SUPABASE_URL}/functions/v1`;
export const MEDIA_BUCKET = 'site-media';
export const CONTACT_ATTACHMENTS_BUCKET = 'contact-attachments';
export { SUPABASE_URL, SUPABASE_ANON_KEY };
