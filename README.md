# Global Solutions — site vitrine & espace d'administration

Site bilingue (FR/EN) de **Global Solutions** (génie civil, hydraulique, énergie — Niamey, Niger),
adossé à Supabase (base de données, stockage privé, authentification et fonction edge de contact).

## État du dépôt

Le dépôt contient pour l'instant :

- `supabase/functions/contact-submit/index.ts` — fonction edge qui reçoit le formulaire de contact
  (validation, anti-spam, limitation de débit, pièce jointe, notification e-mail).
- `supabase/README.md` — description du schéma de données et de la configuration Supabase.

> ⚠️ Le code du site (front-end) n'est pas présent dans ce dépôt : seul le backend Supabase
> (schéma, données, fonction edge) a été conservé.

## Projet Supabase

| Élément | Valeur |
| --- | --- |
| Projet | `global-solutions` |
| Réf. | `zjfrxfddrzkvpgtaorqp` |
| Région | `eu-west-1` |
| URL | `https://zjfrxfddrzkvpgtaorqp.supabase.co` |

## Messages du formulaire de contact

Les demandes envoyées depuis le site sont :

1. enregistrées dans la table `public.contact_requests` (visibles dans l'espace d'administration) ;
2. notifiées par e-mail à **globalsolution877@gmail.com** (champ
   `site_settings.contact.notification_email`, modifiable sans redéploiement ; l'adresse de repli
   codée dans la fonction est identique).

L'envoi utilise [Resend](https://resend.com) et nécessite deux secrets de la fonction :

- `RESEND_API_KEY` — clé API Resend ;
- `NOTIFICATION_FROM` — expéditeur vérifié (ex. `Global Solutions <notifications@globalsolutions.one>`).

Si l'un des deux manque, la demande reste enregistrée mais `notification_status` passe à `failed`
et `notification_error` indique la cause (visible dans l'administration).
