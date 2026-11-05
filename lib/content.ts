import type { Locale } from './i18n';

export type Expertise = {
  slug: string;
  title: string;
  titleEn: string;
  text: string;
  textEn: string;
  icon: 'compass' | 'building' | 'water' | 'drill' | 'solar' | 'site';
};

export const EXPERTISE: Expertise[] = [
  {
    slug: 'etudes',
    icon: 'compass',
    title: 'Études & conception',
    titleEn: 'Studies & design',
    text: 'Études de faisabilité, avant-projets, dossiers d’exécution et dimensionnement d’ouvrages.',
    textEn: 'Feasibility studies, preliminary designs, execution drawings and structural sizing.',
  },
  {
    slug: 'genie-civil',
    icon: 'building',
    title: 'Génie civil & bâtiment',
    titleEn: 'Civil engineering & buildings',
    text: 'Bâtiments administratifs et scolaires, ouvrages d’art, voiries et assainissement.',
    textEn: 'Public and school buildings, structures, roads and drainage works.',
  },
  {
    slug: 'hydraulique',
    icon: 'water',
    title: 'Hydraulique & AEP',
    titleEn: 'Water supply',
    text: 'Adduction d’eau potable, châteaux d’eau, réseaux, stations de pompage et de traitement.',
    textEn: 'Drinking water supply, water towers, networks, pumping and treatment stations.',
  },
  {
    slug: 'hydrogeologie',
    icon: 'drill',
    title: 'Hydrogéologie & forages',
    titleEn: 'Hydrogeology & boreholes',
    text: 'Prospection, implantation et réalisation de forages, essais de pompage et équipement.',
    textEn: 'Water prospection, borehole siting and drilling, pumping tests and equipment.',
  },
  {
    slug: 'energie',
    icon: 'solar',
    title: 'Énergie & solaire',
    titleEn: 'Energy & solar',
    text: 'Systèmes solaires photovoltaïques, électrification rurale et efficacité énergétique.',
    textEn: 'Solar photovoltaic systems, rural electrification and energy efficiency.',
  },
  {
    slug: 'suivi',
    icon: 'site',
    title: 'Suivi & contrôle de travaux',
    titleEn: 'Works supervision',
    text: 'Maîtrise d’œuvre, contrôle qualité, planification et réception des ouvrages.',
    textEn: 'Construction management, quality control, scheduling and handover.',
  },
];

export const SERVICES: { value: string; fr: string; en: string }[] = [
  { value: 'etudes', fr: 'Études & conception', en: 'Studies & design' },
  { value: 'genie-civil', fr: 'Génie civil & bâtiment', en: 'Civil engineering & buildings' },
  { value: 'hydraulique', fr: 'Hydraulique & AEP', en: 'Water supply' },
  { value: 'hydrogeologie', fr: 'Hydrogéologie & forages', en: 'Hydrogeology & boreholes' },
  { value: 'energie', fr: 'Énergie & solaire', en: 'Energy & solar' },
  { value: 'suivi', fr: 'Suivi & contrôle de travaux', en: 'Works supervision' },
  { value: 'autre', fr: 'Autre demande', en: 'Other request' },
];

export function serviceLabel(value: string, locale: Locale) {
  const match = SERVICES.find((s) => s.value === value);
  if (!match) return value;
  return locale === 'en' ? match.en : match.fr;
}

export const APPROACH = [
  { key: 'approach.item1', icon: '①' },
  { key: 'approach.item2', icon: '②' },
  { key: 'approach.item3', icon: '③' },
  { key: 'approach.item4', icon: '④' },
] as const;
