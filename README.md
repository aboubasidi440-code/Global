# Global Solutions — site vitrine & espace d’administration

Site bilingue (FR/EN) de **Global Solutions** — génie civil, hydraulique et énergie à Niamey (Niger) —
adossé à Supabase (base de données, stockage privé, authentification et fonction edge de contact).

## Démarrer

```bash
npm install
cp .env.example .env.local   # déjà fourni dans l'environnement de prévisualisation
npm run dev                  # http://localhost:3000
```

Variables d’environnement (la clé publishable est publique par conception, la RLS protège les données) :

| Variable | Valeur |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://zjfrxfddrzkvpgtaorqp.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | clé publishable du projet |

## Pages

| Route | Contenu |
| --- | --- |
| `/fr`, `/en` | accueil : titre, chiffres clés, 6 domaines d’expertise, réalisations, approche, équipe |
| `/fr/projets`, `/fr/projets/[id]` | réalisations publiées et fiche projet (galerie, maître d’ouvrage, année) |
| `/fr/equipe` | membres publiés |
| `/fr/actualites`, `/fr/actualites/[id]` | actualités |
| `/fr/documents` | documents téléchargeables (liens signés temporaires) |
| `/fr/contact` | formulaire (pièce jointe PDF/image, 5 Mo) + coordonnées |
| `/admin` | tableau de bord (accès réservé aux profils `admin` / `editor`) |

Les contenus viennent de Supabase côté navigateur : la clé publishable ne voit que ce que la RLS autorise
(lignes `published` pour le public, tout pour le personnel connecté).

## Administration

- Connexion : `/admin/login` — compte du projet `global-solutions` (profil `admin`).
- **Projets / Équipe / Actualités / Documents** : création, modification, publication, suppression, envoi
  des photos et PDF dans le bucket privé `site-media` (URLs signées à l’affichage).
- **Messages** : demandes reçues, statut de traitement, pièce jointe, statut de la notification e-mail.
- **Réglages** : titre et accroche de la page d’accueil, chiffres clés, coordonnées et **adresse qui reçoit
  les messages**.

## Messages du formulaire de contact

Les demandes sont enregistrées dans `public.contact_requests` puis notifiées par e-mail à l’adresse
`site_settings.contact.notification_email` — aujourd’hui **globalsolution877@gmail.com** (repli codé dans
la fonction : même adresse). L’adresse affichée sur le site reste `info@globalsolutions.one`.

L’envoi passe par [Resend](https://resend.com). La clé API est stockée dans le secret `RESEND_API_KEY`
de la fonction `contact-submit` (déjà configuré). L’expéditeur se règle, dans cet ordre de priorité :

1. champ `notification_from` des réglages du site (`/admin/reglages`) ;
2. secret `NOTIFICATION_FROM` de la fonction ;
3. valeur de repli `Global Solutions <onboarding@resend.dev>`.

### Limite actuelle de Resend (constatée lors des tests)

Domaine `globalsolutions.one` **non vérifié** dans Resend, et compte Resend ouvert avec
`aboubasidi440@gmail.com`. Dans cet état :

- envoi depuis `…@mail.globalsolutions.one` → `403 domain is not verified` ;
- envoi depuis `onboarding@resend.dev` vers `globalsolution877@gmail.com` →
  `403 You can only send testing emails to your own email address (aboubasidi440@gmail.com)`.

Deux solutions, au choix :

1. **Vérifier le domaine** `globalsolutions.one` dans Resend (enregistrements DNS SPF/DKIM), puis mettre
   `Global Solutions <notifications@globalsolutions.one>` dans `/admin/reglages` — recommandé ;
2. **Changer l’e-mail du compte Resend** pour `globalsolution877@gmail.com` (aucun DNS à toucher) : les
   envois depuis `onboarding@resend.dev` arrivent alors dans cette boîte.

Tant que l’un des deux n’est pas fait, les demandes restent enregistrées dans l’administration et le
statut « échec » indique précisément la cause.

Sans ces secrets, la demande reste enregistrée et visible dans l’administration ; `notification_status`
passe à `failed` et `notification_error` indique la cause.

## Structure

```
app/
  [locale]/                     pages publiques FR/EN (+ métadonnées par page)
  admin/login/                  connexion
  admin/(dashboard)/            tableau de bord, contenus, messages, réglages
  sitemap.ts, robots.ts         référencement
  icon.svg, not-found.tsx       favicon et page 404
components/                     header, footer, cartes, formulaire, éditeurs d’administration
lib/                            i18n, accès Supabase, hooks de données, médias, auth
supabase/
  functions/contact-submit/             fonction edge de réception des demandes
  migrations/0001_schema_baseline.sql   schéma complet (tables, RLS, stockage, réglages)
  README.md                             documentation du schéma et des politiques RLS
```

## Déploiement

### Netlify (configuration fournie)

Le dépôt contient un `netlify.toml` (plugin officiel `@netlify/plugin-nextjs`, Node 22 épinglé via
`NODE_VERSION` et `.nvmrc`, variables `NEXT_PUBLIC_*` renseignées) : **« Add new site → Import from Git »**
suffit, aucun réglage manuel requis. Le plugin gère le SSR et les routes dynamiques.

Vérifications côté Netlify / Supabase :

1. Ajouter le domaine Netlify aux *Redirect URLs* de l’authentification Supabase
   (*Authentication → URL Configuration*), ainsi que `site_url`.
2. Si les variables sont retirées du `netlify.toml`, les renseigner dans
   *Site settings → Environment variables* (valeurs identiques à `.env.example`).

### Vercel

`npm run build` + les deux variables `NEXT_PUBLIC_*` dans les *Environment Variables*, puis ajouter le domaine
final aux *Redirect URLs* Supabase Auth.
