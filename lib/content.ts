import type { Locale } from './i18n';
import type { IconName } from '@/components/Icon';

export type Expertise = {
  slug: string;
  title: string;
  titleEn: string;
  text: string;
  textEn: string;
  icon: IconName;
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

export type ExpertiseFull = {
  slug: string;
  icon: IconName;
  image: string;
  title: string;
  titleEn: string;
  text: string;
  textEn: string;
  services: string[];
  servicesEn: string[];
};

/** Catalogue complet des 14 domaines d’intervention (page Nos expertises). */
export const EXPERTISE_FULL: ExpertiseFull[] = [
  {
    slug: 'batiment-travaux-publics',
    icon: 'building',
    image: '/images/expertise-batiment.jpg',
    title: 'Bâtiment et travaux publics',
    titleEn: 'Building & public works',
    text: 'Construction de bâtiments administratifs, scolaires et commerciaux, voiries et ouvrages associés.',
    textEn: 'Administrative, school and commercial buildings, roads and associated structures.',
    services: ['Construction neuve', 'Rénovation et réhabilitation', 'Voirie et réseaux divers'],
    servicesEn: ['New builds', 'Renovation and rehabilitation', 'Roads and utility networks'],
  },
  {
    slug: 'genie-civil-infrastructures',
    icon: 'site',
    image: '/images/expertise-geniecivil.jpg',
    title: 'Génie civil et infrastructures',
    titleEn: 'Civil engineering & infrastructure',
    text: 'Ouvrages d’art, terrassements, plateformes et infrastructures de transport dimensionnés pour durer.',
    textEn: 'Structures, earthworks, platforms and transport infrastructure engineered to last.',
    services: ['Études et dimensionnement', 'Terrassements et fondations', 'Ouvrages d’art'],
    servicesEn: ['Studies and sizing', 'Earthworks and foundations', 'Civil structures'],
  },
  {
    slug: 'hydraulique-amenagement',
    icon: 'water',
    image: '/images/expertise-hydraulique.jpg',
    title: 'Hydraulique et aménagement',
    titleEn: 'Water engineering & development',
    text: 'Aménagement de retenues, canaux et périmètres irrigués pour valoriser la ressource en eau.',
    textEn: 'Dams, canals and irrigated schemes that make the most of the water resource.',
    services: ['Barrages et retenues', 'Canaux et chenaux', 'Aménagements hydro-agricoles'],
    servicesEn: ['Dams and reservoirs', 'Canals and channels', 'Hydro-agricultural schemes'],
  },
  {
    slug: 'adduction-eau-potable',
    icon: 'pipe',
    image: '/images/expertise-aep.webp',
    title: 'Adduction d’eau potable',
    titleEn: 'Drinking water supply',
    text: 'Réseaux de distribution, châteaux d’eau et branchements pour alimenter durablement les populations.',
    textEn: 'Distribution networks, water towers and connections for lasting community supply.',
    services: ['Réseaux AEP', 'Châteaux d’eau et réservoirs', 'Branchements particuliers'],
    servicesEn: ['Water supply networks', 'Water towers and tanks', 'Household connections'],
  },
  {
    slug: 'forages-hydraulique-villageoise',
    icon: 'drill',
    image: '/images/expertise-forage.webp',
    title: 'Forages et hydraulique villageoise',
    titleEn: 'Boreholes & village water supply',
    text: 'Prospection, forage et équipement de points d’eau en milieu rural et périurbain.',
    textEn: 'Prospection, drilling and equipping of water points in rural and peri-urban areas.',
    services: ['Implantation et forage', 'Essais de pompage', 'Pompes et équipements'],
    servicesEn: ['Siting and drilling', 'Pumping tests', 'Pumps and equipment'],
  },
  {
    slug: 'irrigation-perimetres-agricoles',
    icon: 'leaf',
    image: '/images/expertise-irrigation.jpg',
    title: 'Irrigation et aménagement des périmètres agricoles',
    titleEn: 'Irrigation & agricultural development',
    text: 'Périmètres irrigués, canaux et ouvrages de régulation au service de la production agricole.',
    textEn: 'Irrigated schemes, canals and control structures supporting agricultural production.',
    services: ['Périmètres irrigués', 'Canaux d’irrigation', 'Ouvrages de régulation'],
    servicesEn: ['Irrigated perimeters', 'Irrigation canals', 'Control structures'],
  },
  {
    slug: 'construction-metallique',
    icon: 'layers',
    image: '/images/expertise-metallique.jpg',
    title: 'Construction métallique',
    titleEn: 'Steel construction',
    text: 'Charpentes métalliques, hangars, passerelles et structures industrielles soudées et assemblées sur site.',
    textEn: 'Steel frames, warehouses, footbridges and industrial structures welded and erected on site.',
    services: ['Charpentes et hangars', 'Passerelles métalliques', 'Structures industrielles'],
    servicesEn: ['Frames and warehouses', 'Steel footbridges', 'Industrial structures'],
  },
  {
    slug: 'assainissement-latrines',
    icon: 'pipe',
    image: '/images/expertise-eau.jpg',
    title: 'Assainissement et latrines',
    titleEn: 'Sanitation & latrines',
    text: 'Réseaux d’assainissement, fosses septiques et latrines familiales ou institutionnelles.',
    textEn: 'Sewerage networks, septic tanks and family or institutional latrines.',
    services: ['Réseaux d’assainissement', 'Fosses septiques', 'Blocs sanitaires'],
    servicesEn: ['Sewer networks', 'Septic tanks', 'Sanitary blocks'],
  },
  {
    slug: 'energie-solaire-photovoltaique',
    icon: 'solar',
    image: '/images/expertise-solaire.jpg',
    title: 'Énergie solaire et systèmes photovoltaïques',
    titleEn: 'Solar energy & photovoltaic systems',
    text: 'Centrales solaires, kits individuels et mini-réseaux pour l’électrification des sites isolés.',
    textEn: 'Solar plants, individual kits and mini-grids for off-grid electrification.',
    services: ['Étude et dimensionnement', 'Installation photovoltaïque', 'Maintenance et suivi'],
    servicesEn: ['Design and sizing', 'Solar installation', 'Maintenance and monitoring'],
  },
  {
    slug: 'energie-renouvelable-fossile',
    icon: 'gear',
    image: '/images/projet-solaire.jpg',
    title: 'Énergie renouvelable et énergie fossile',
    titleEn: 'Renewable & fossil energy',
    text: 'Solutions énergétiques hybrides : groupes électrogènes, stockage et intégration des renouvelables.',
    textEn: 'Hybrid energy solutions: generators, storage and renewable integration.',
    services: ['Groupes électrogènes', 'Systèmes de stockage', 'Hybridation solaire'],
    servicesEn: ['Generators', 'Storage systems', 'Solar hybridisation'],
  },
  {
    slug: 'exploitation-negoce-minier',
    icon: 'factory',
    image: '/images/hero-chantier.jpg',
    title: 'Exploitation et négoce minier',
    titleEn: 'Mining & mineral trading',
    text: 'Approvisionnement en matériaux de carrière et négoce de minerais dans le respect des réglementations.',
    textEn: 'Quarry materials supply and mineral trading in compliance with regulations.',
    services: ['Matériaux de carrière', 'Négoce de minerais', 'Logistique d’exploitation'],
    servicesEn: ['Quarry materials', 'Mineral trading', 'Operations logistics'],
  },
  {
    slug: 'transport-logistique-materiaux',
    icon: 'truck',
    image: '/images/expertise-voirie.jpg',
    title: 'Transport et logistique de matériaux',
    titleEn: 'Materials transport & logistics',
    text: 'Transport de matériaux de construction et logistique de chantier sur l’ensemble du territoire.',
    textEn: 'Construction materials haulage and site logistics across the country.',
    services: ['Transport de matériaux', 'Livraison sur chantier', 'Manutention et levage'],
    servicesEn: ['Materials haulage', 'Site delivery', 'Handling and lifting'],
  },
  {
    slug: 'fourniture-equipements-forage',
    icon: 'drill',
    image: '/images/banner-ingenieurs.jpg',
    title: 'Fourniture d’équipements et matériels de forage',
    titleEn: 'Drilling equipment & supplies',
    text: 'Fourniture de pompes, tiges, trépans et équipements de forage pour les professionnels de l’eau.',
    textEn: 'Pumps, rods, bits and drilling equipment for water professionals.',
    services: ['Pompes et groupes motopompes', 'Trépans et tiges de forage', 'Pièces et consommables'],
    servicesEn: ['Pumps and motor-pumps', 'Bits and drill rods', 'Spare parts and consumables'],
  },
  {
    slug: 'etudes-expertise-conseil',
    icon: 'compass',
    image: '/images/hero-clair.jpg',
    title: 'Études techniques, expertise et conseil',
    titleEn: 'Technical studies, expertise & advisory',
    text: 'Études de faisabilité, expertises d’ouvrages et conseil aux maîtres d’ouvrage publics et privés.',
    textEn: 'Feasibility studies, structural expertise and advisory to public and private clients.',
    services: ['Études de faisabilité', 'Expertise d’ouvrages existants', 'Conseil et assistance'],
    servicesEn: ['Feasibility studies', 'Existing-structure expertise', 'Advisory and assistance'],
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

export const SERVICES_BAND = [
  { fr: 'BTP', en: 'Construction' },
  { fr: 'Hydraulique', en: 'Water' },
  { fr: 'Forages', en: 'Boreholes' },
  { fr: 'Énergie solaire', en: 'Solar energy' },
  { fr: 'Études', en: 'Design' },
  { fr: 'Suivi de chantier', en: 'Supervision' },
];

/** Visuels de démonstration utilisés quand aucun projet publié n'est disponible. */
export const DOMAIN_IMAGES = [
  { src: '/images/projet-batiment.jpg', fr: 'Génie civil & bâtiment', en: 'Civil engineering & buildings' },
  { src: '/images/projet-hydraulique.jpg', fr: 'Hydraulique & AEP', en: 'Water supply' },
  { src: '/images/projet-solaire.jpg', fr: 'Énergie & solaire', en: 'Energy & solar' },
];
