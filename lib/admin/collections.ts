export type FieldKind = 'text' | 'textarea' | 'number' | 'boolean' | 'image' | 'images' | 'file';

export type FieldDef = {
  name: string;
  label: string;
  kind: FieldKind;
  hint?: string;
  placeholder?: string;
  maxLength?: number;
  full?: boolean;
  folder?: string;
};

export type CollectionDef = {
  table: 'projects' | 'team' | 'articles' | 'documents';
  title: string;
  description: string;
  singular: string;
  titleField: string;
  orderBy: { column: string; ascending: boolean };
  fields: FieldDef[];
  columns: { name: string; label: string; kind?: 'text' | 'boolean' | 'image' | 'date' | 'number' }[];
};

export const PROJECTS: CollectionDef = {
  table: 'projects',
  title: 'Projets',
  description: 'Réalisations affichées sur le site public.',
  singular: 'projet',
  titleField: 'title',
  orderBy: { column: 'sort_order', ascending: true },
  columns: [
    { name: 'title', label: 'Titre' },
    { name: 'category', label: 'Domaine' },
    { name: 'location', label: 'Lieu' },
    { name: 'year', label: 'Année', kind: 'number' },
    { name: 'published', label: 'Statut', kind: 'boolean' },
  ],
  fields: [
    { name: 'title', label: 'Titre (français)', kind: 'text', maxLength: 200 },
    { name: 'title_en', label: 'Titre (anglais)', kind: 'text', maxLength: 200 },
    { name: 'category', label: 'Domaine (français)', kind: 'text', maxLength: 120 },
    { name: 'category_en', label: 'Domaine (anglais)', kind: 'text', maxLength: 120 },
    { name: 'location', label: 'Localisation', kind: 'text', maxLength: 160 },
    { name: 'year', label: 'Année', kind: 'number' },
    { name: 'client', label: 'Maître d’ouvrage', kind: 'text', maxLength: 200 },
    { name: 'status', label: 'Statut du chantier', kind: 'text', maxLength: 80, hint: 'Ex. « En cours », « Livré »' },
    { name: 'description', label: 'Description (français)', kind: 'textarea', full: true, maxLength: 6000 },
    { name: 'description_en', label: 'Description (anglais)', kind: 'textarea', full: true, maxLength: 6000 },
    { name: 'image_urls', label: 'Photos', kind: 'images', full: true, folder: 'projects' },
    { name: 'sort_order', label: 'Ordre d’affichage', kind: 'number' },
  ],
};

export const TEAM: CollectionDef = {
  table: 'team',
  title: 'Équipe',
  description: 'Membres de l’équipe présentés sur le site.',
  singular: 'membre',
  titleField: 'name',
  orderBy: { column: 'sort_order', ascending: true },
  columns: [
    { name: 'name', label: 'Nom' },
    { name: 'position', label: 'Fonction' },
    { name: 'photo_url', label: 'Photo', kind: 'image' },
    { name: 'published', label: 'Statut', kind: 'boolean' },
  ],
  fields: [
    { name: 'name', label: 'Nom complet', kind: 'text', maxLength: 160 },
    { name: 'position', label: 'Fonction (français)', kind: 'text', maxLength: 160 },
    { name: 'position_en', label: 'Fonction (anglais)', kind: 'text', maxLength: 160 },
    { name: 'bio', label: 'Biographie (français)', kind: 'textarea', full: true, maxLength: 1500 },
    { name: 'bio_en', label: 'Biographie (anglais)', kind: 'textarea', full: true, maxLength: 1500 },
    { name: 'photo_url', label: 'Photo', kind: 'image', full: true, folder: 'team' },
    { name: 'sort_order', label: 'Ordre d’affichage', kind: 'number' },
  ],
};

export const ARTICLES: CollectionDef = {
  table: 'articles',
  title: 'Actualités',
  description: 'Articles publiés dans la rubrique actualités.',
  singular: 'actualité',
  titleField: 'title',
  orderBy: { column: 'created_at', ascending: false },
  columns: [
    { name: 'title', label: 'Titre' },
    { name: 'created_at', label: 'Créé le', kind: 'date' },
    { name: 'published', label: 'Statut', kind: 'boolean' },
  ],
  fields: [
    { name: 'title', label: 'Titre (français)', kind: 'text', maxLength: 220 },
    { name: 'title_en', label: 'Titre (anglais)', kind: 'text', maxLength: 220 },
    { name: 'body', label: 'Contenu (français)', kind: 'textarea', full: true, maxLength: 20000 },
    { name: 'body_en', label: 'Contenu (anglais)', kind: 'textarea', full: true, maxLength: 20000 },
  ],
};

export const DOCUMENTS: CollectionDef = {
  table: 'documents',
  title: 'Documents',
  description: 'Brochures et documents téléchargeables.',
  singular: 'document',
  titleField: 'title',
  orderBy: { column: 'created_at', ascending: false },
  columns: [
    { name: 'title', label: 'Titre' },
    { name: 'created_at', label: 'Créé le', kind: 'date' },
    { name: 'published', label: 'Statut', kind: 'boolean' },
  ],
  fields: [
    { name: 'title', label: 'Titre (français)', kind: 'text', maxLength: 220 },
    { name: 'title_en', label: 'Titre (anglais)', kind: 'text', maxLength: 220 },
    { name: 'file_url', label: 'Fichier', kind: 'file', full: true, folder: 'documents' },
  ],
};

export const COLLECTIONS = { projects: PROJECTS, team: TEAM, articles: ARTICLES, documents: DOCUMENTS };
