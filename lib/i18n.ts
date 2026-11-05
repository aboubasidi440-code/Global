export const LOCALES = ['fr', 'en'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'fr';

export function isLocale(value: string | undefined): value is Locale {
  return value === 'fr' || value === 'en';
}

type Dict = Record<string, string>;

const fr: Dict = {
  'brand.name': 'Global Solutions',
  'brand.tagline': 'Génie civil · Hydraulique · Énergie',

  'nav.home': 'Accueil',
  'nav.projects': 'Projets',
  'nav.team': 'Équipe',
  'nav.news': 'Actualités',
  'nav.documents': 'Documents',
  'nav.contact': 'Contact',
  'nav.admin': 'Administration',
  'nav.menu': 'Menu',
  'nav.close': 'Fermer',

  'cta.contact': 'Nous contacter',
  'cta.discover': 'Découvrir nos projets',
  'cta.all_projects': 'Tous les projets',
  'cta.all_news': 'Toutes les actualités',
  'cta.read': 'Lire la suite',
  'cta.back': 'Retour',
  'cta.download': 'Télécharger',
  'cta.send': 'Envoyer la demande',
  'cta.sending': 'Envoi en cours…',
  'cta.view_all': 'Tout voir',

  'home.eyebrow': 'Niger · Depuis {year}',
  'home.activities.label': 'Nos activités',
  'home.feature.caption_title': 'Chantier de Niamey',
  'home.feature.caption_text': 'Structure en béton armé — suivi d’exécution',
  'home.meta.1': 'Bureau d’études & maîtrise d’œuvre',
  'home.meta.2': 'Niamey, Niger',
  'home.scroll': 'Découvrir',

  'services.label': 'Nos services',
  'home.card.title': 'Contact direct',
  'home.card.write': 'Écrire',
  'home.gallery.title': 'Nos chantiers en images',
  'home.gallery.subtitle':
    'Quelques chantiers représentatifs de nos métiers. Les fiches projets détaillées seront publiées prochainement.',

  'home.expertise.title': 'Nos domaines d’intervention',
  'home.expertise.subtitle':
    'Six expertises complémentaires, mobilisées ensemble sur chaque projet — de l’étude de faisabilité à la réception des ouvrages.',
  'home.projects.title': 'Réalisations',
  'home.projects.subtitle': 'Quelques projets conduits pour des institutions, des collectivités et des entreprises.',
  'home.projects.empty': 'Les premières réalisations seront publiées très prochainement.',
  'home.approach.title': 'Notre approche',
  'home.approach.subtitle':
    'Une entreprise à taille humaine, ancrée à Niamey, qui associe exigence technique et connaissance fine du terrain.',
  'home.team.title': 'L’équipe',
  'home.team.subtitle': 'Des profils complémentaires en ingénierie, gestion et logistique.',
  'home.team.link': 'Rencontrer l’équipe',
  'home.contact.title': 'Un projet à étudier, un chantier à conduire ?',
  'home.contact.subtitle':
    'Décrivez-nous votre besoin : nous revenons vers vous avec une première lecture technique et un budget indicatif.',

  'stats.years': 'années d’expérience',
  'stats.team': 'collaborateurs',
  'stats.expertise': 'domaines d’expertise',
  'stats.location': 'basés à Niamey',

  'approach.item1.title': 'Écoute du besoin',
  'approach.item1.text': 'Un diagnostic sur site, des échanges avec les futurs usagers, un cahier des charges partagé.',
  'approach.item2.title': 'Rigueur technique',
  'approach.item2.text': 'Des études dimensionnées, des choix de matériaux justifiés, des livrables vérifiables.',
  'approach.item3.title': 'Ancrage local',
  'approach.item3.text': 'Des équipes et des fournisseurs nigériens, une connaissance des contraintes climatiques et logistiques.',
  'approach.item4.title': 'Durabilité',
  'approach.item4.text': 'Des ouvrages pensés pour être exploités et entretenus localement, sur plusieurs décennies.',

  'projects.title': 'Projets',
  'projects.lead': 'Études, travaux et maîtrise d’œuvre conduits par Global Solutions.',
  'projects.empty': 'Aucun projet publié pour le moment.',
  'projects.filter.all': 'Tous',
  'projects.meta.location': 'Localisation',
  'projects.meta.year': 'Année',
  'projects.meta.client': 'Maître d’ouvrage',
  'projects.meta.category': 'Domaine',
  'projects.meta.status': 'Statut',
  'projects.meta.images': 'Galerie',
  'projects.not_found': 'Projet introuvable.',
  'projects.others': 'Autres projets',

  'team.title': 'Équipe',
  'team.lead': 'Une direction resserrée, disponible et impliquée sur chaque mission.',
  'team.empty': 'Les profils de l’équipe seront publiés prochainement.',

  'news.title': 'Actualités',
  'news.lead': 'Chantiers, études et vie de l’entreprise.',
  'news.empty': 'Aucune actualité publiée pour le moment.',
  'news.not_found': 'Actualité introuvable.',

  'documents.title': 'Documents',
  'documents.lead': 'Brochures, références et documents techniques à télécharger.',
  'documents.empty': 'Aucun document disponible pour le moment.',
  'documents.download': 'Télécharger le document',

  'contact.title': 'Contact',
  'contact.lead': 'Écrivez-nous : nous répondons sous deux jours ouvrés.',
  'contact.form.title': 'Décrivez votre projet',
  'contact.form.name': 'Nom et prénom',
  'contact.form.organisation': 'Organisation',
  'contact.form.email': 'Adresse e-mail',
  'contact.form.phone': 'Téléphone',
  'contact.form.service': 'Domaine concerné',
  'contact.form.service_placeholder': 'Sélectionnez un domaine',
  'contact.form.message': 'Votre message',
  'contact.form.attachment': 'Pièce jointe (PDF, JPG, PNG ou WebP — 5 Mo max.)',
  'contact.form.optional': 'facultatif',
  'contact.form.required': 'Champs obligatoires',
  'contact.form.error_required': 'Merci de renseigner les champs obligatoires.',
  'contact.form.error_generic': 'L’envoi a échoué. Merci de réessayer ou de nous appeler.',
  'contact.form.error_size': 'La pièce jointe dépasse 5 Mo.',
  'contact.form.success.title': 'Demande envoyée',
  'contact.form.success.text':
    'Merci ! Votre demande a bien été enregistrée. Notre équipe vous répond sous deux jours ouvrés.',
  'contact.form.again': 'Envoyer une autre demande',
  'contact.details': 'Coordonnées',
  'contact.address': 'Adresse',
  'contact.postal': 'Boîte postale',
  'contact.phone': 'Téléphone',
  'contact.email': 'E-mail',
  'contact.whatsapp': 'WhatsApp',
  'contact.hours': 'Horaires',
  'contact.hours.value': 'Lundi – vendredi, 8h – 17h (GMT+1)',
  'contact.map': 'Nous trouver',

  'footer.about':
    'Global Solutions conçoit et réalise des projets de génie civil, d’hydraulique et d’énergie au Niger.',
  'footer.navigation': 'Navigation',
  'footer.contact': 'Contact',
  'footer.rights': 'Tous droits réservés.',
  'footer.legal': 'Mentions légales',
  'footer.admin': 'Espace d’administration',

  'common.loading': 'Chargement…',
  'common.error': 'Une erreur est survenue.',
  'common.retry': 'Réessayer',
  'common.published': 'Publié',
  'common.draft': 'Brouillon',
  'common.language': 'Langue',
};

const en: Dict = {
  'brand.name': 'Global Solutions',
  'brand.tagline': 'Civil engineering · Water · Energy',

  'nav.home': 'Home',
  'nav.projects': 'Projects',
  'nav.team': 'Team',
  'nav.news': 'News',
  'nav.documents': 'Documents',
  'nav.contact': 'Contact',
  'nav.admin': 'Administration',
  'nav.menu': 'Menu',
  'nav.close': 'Close',

  'cta.contact': 'Get in touch',
  'cta.discover': 'Explore our projects',
  'cta.all_projects': 'All projects',
  'cta.all_news': 'All news',
  'cta.read': 'Read more',
  'cta.back': 'Back',
  'cta.download': 'Download',
  'cta.send': 'Send request',
  'cta.sending': 'Sending…',
  'cta.view_all': 'View all',

  'home.eyebrow': 'Niger · Since {year}',
  'home.activities.label': 'What we do',
  'home.feature.caption_title': 'Site in Niamey',
  'home.feature.caption_text': 'Reinforced concrete structure — works supervision',
  'home.meta.1': 'Design office & construction management',
  'home.meta.2': 'Niamey, Niger',
  'home.scroll': 'Discover',

  'services.label': 'Our services',
  'home.card.title': 'Direct contact',
  'home.card.write': 'Write',
  'home.gallery.title': 'Our work in pictures',
  'home.gallery.subtitle':
    'A few sites representative of our trades. Detailed case studies will be published shortly.',

  'home.expertise.title': 'What we do',
  'home.expertise.subtitle':
    'Six complementary disciplines, combined on every project — from feasibility studies to handover.',
  'home.projects.title': 'Selected work',
  'home.projects.subtitle': 'Projects delivered for institutions, local authorities and businesses.',
  'home.projects.empty': 'Our first case studies will be published shortly.',
  'home.approach.title': 'How we work',
  'home.approach.subtitle':
    'A human-sized firm based in Niamey, combining technical rigour with first-hand field knowledge.',
  'home.team.title': 'Our team',
  'home.team.subtitle': 'Complementary profiles in engineering, management and logistics.',
  'home.team.link': 'Meet the team',
  'home.contact.title': 'A project to study, a site to deliver?',
  'home.contact.subtitle':
    'Tell us what you need: we come back with a first technical reading and an indicative budget.',

  'stats.years': 'years of experience',
  'stats.team': 'team members',
  'stats.expertise': 'areas of expertise',
  'stats.location': 'based in Niamey',

  'approach.item1.title': 'Listening first',
  'approach.item1.text': 'An on-site diagnosis, conversations with future users, a shared brief.',
  'approach.item2.title': 'Technical rigour',
  'approach.item2.text': 'Properly sized designs, justified material choices, verifiable deliverables.',
  'approach.item3.title': 'Local roots',
  'approach.item3.text': 'Nigerien teams and suppliers, a clear grasp of climate and logistics constraints.',
  'approach.item4.title': 'Durability',
  'approach.item4.text': 'Infrastructure designed to be operated and maintained locally for decades.',

  'projects.title': 'Projects',
  'projects.lead': 'Studies, works and construction management delivered by Global Solutions.',
  'projects.empty': 'No project published yet.',
  'projects.filter.all': 'All',
  'projects.meta.location': 'Location',
  'projects.meta.year': 'Year',
  'projects.meta.client': 'Client',
  'projects.meta.category': 'Sector',
  'projects.meta.status': 'Status',
  'projects.meta.images': 'Gallery',
  'projects.not_found': 'Project not found.',
  'projects.others': 'More projects',

  'team.title': 'Team',
  'team.lead': 'A compact leadership team, available and involved in every assignment.',
  'team.empty': 'Team profiles will be published shortly.',

  'news.title': 'News',
  'news.lead': 'Sites, studies and company news.',
  'news.empty': 'No news published yet.',
  'news.not_found': 'Article not found.',

  'documents.title': 'Documents',
  'documents.lead': 'Brochures, references and technical documents to download.',
  'documents.empty': 'No document available yet.',
  'documents.download': 'Download document',

  'contact.title': 'Contact',
  'contact.lead': 'Write to us — we reply within two business days.',
  'contact.form.title': 'Tell us about your project',
  'contact.form.name': 'Full name',
  'contact.form.organisation': 'Organisation',
  'contact.form.email': 'Email address',
  'contact.form.phone': 'Phone',
  'contact.form.service': 'Sector of interest',
  'contact.form.service_placeholder': 'Select a sector',
  'contact.form.message': 'Your message',
  'contact.form.attachment': 'Attachment (PDF, JPG, PNG or WebP — 5 MB max.)',
  'contact.form.optional': 'optional',
  'contact.form.required': 'Required fields',
  'contact.form.error_required': 'Please fill in the required fields.',
  'contact.form.error_generic': 'Sending failed. Please try again or give us a call.',
  'contact.form.error_size': 'The attachment exceeds 5 MB.',
  'contact.form.success.title': 'Request sent',
  'contact.form.success.text':
    'Thank you! Your request has been recorded. Our team will reply within two business days.',
  'contact.form.again': 'Send another request',
  'contact.details': 'Contact details',
  'contact.address': 'Address',
  'contact.postal': 'PO box',
  'contact.phone': 'Phone',
  'contact.email': 'Email',
  'contact.whatsapp': 'WhatsApp',
  'contact.hours': 'Opening hours',
  'contact.hours.value': 'Monday – Friday, 8am – 5pm (GMT+1)',
  'contact.map': 'Find us',

  'footer.about':
    'Global Solutions designs and delivers civil engineering, water and energy projects in Niger.',
  'footer.navigation': 'Navigation',
  'footer.contact': 'Contact',
  'footer.rights': 'All rights reserved.',
  'footer.legal': 'Legal notice',
  'footer.admin': 'Administration',

  'common.loading': 'Loading…',
  'common.error': 'Something went wrong.',
  'common.retry': 'Try again',
  'common.published': 'Published',
  'common.draft': 'Draft',
  'common.language': 'Language',
};

export const dictionaries = { fr, en } as const;

export function translator(locale: Locale) {
  return (key: string, vars?: Record<string, string>) => {
    const raw = dictionaries[locale][key] ?? dictionaries.fr[key] ?? key;
    if (!vars) return raw;
    return Object.entries(vars).reduce((acc, [k, v]) => acc.replaceAll(`{${k}}`, v), raw);
  };
}

/** Retourne la variante linguistique d'un champ bilingue, avec repli sur le français. */
export function bilingual<T extends Record<string, unknown>>(
  row: T | null | undefined,
  field: string,
  locale: Locale,
): string {
  if (!row) return '';
  const suffix = locale === 'en' ? '_en' : '';
  const localized = suffix ? (row[`${field}${suffix}`] as string | null | undefined) : undefined;
  const fallback = (row[field] as string | null | undefined) ?? '';
  return (localized && localized.trim()) || fallback || '';
}

export function href(locale: Locale, path = '') {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `/${locale}${clean === '/' ? '' : clean}`;
}
