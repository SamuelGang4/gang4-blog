/**
 * Thèmes éditoriaux du blog Gang4
 *
 * Source de vérité unique pour le mapping pillar → thème lisible.
 * Utilisé par /blog/index, /, /blog/auteur/[slug] et tout autre listing.
 *
 * L'ordre des thèmes ici = l'ordre d'affichage dans les listes.
 */

export interface BlogTheme {
  /** Code interne du pillar (ce qu'on stocke dans le frontmatter MDX) */
  pillar: string;
  /** Label court affiché sur les cartes article */
  label: string;
  /** Titre de section affiché sur les pages de listing */
  sectionTitle: string;
  /** Pitch court qui décrit ce que couvre le thème */
  sectionDescription: string;
}

export const BLOG_THEMES: BlogTheme[] = [
  {
    pillar: 'P1',
    label: 'Whitelisting',
    sectionTitle: 'Whitelisting & Partnership Ads',
    sectionDescription:
      'Le pilier qui domine les Meta Ads en 2026 : comprendre, configurer et industrialiser le whitelisting créateurs.',
  },
  {
    pillar: 'P2A',
    label: 'Expertise Meta',
    sectionTitle: 'Expertise Meta Ads',
    sectionDescription:
      'Décrypter le moteur de delivery Meta (Andromeda) et structurer la production créative qui le nourrit.',
  },
  {
    pillar: 'P2B',
    label: 'Scaling',
    sectionTitle: 'Scaling & frameworks',
    sectionDescription:
      'Les structures et frameworks pour passer de 30k€ à 100k€/mois sur Meta sans casser le CPA.',
  },
  {
    pillar: 'P2B-CMO',
    label: 'CMO Insights',
    sectionTitle: 'CMO Insights',
    sectionDescription:
      'Attribution, MMM, modèles de mesure : ce que les CMO doivent comprendre pour piloter le budget Meta.',
  },
  {
    pillar: 'P2C',
    label: 'International',
    sectionTitle: 'Internationalisation',
    sectionDescription:
      'Lancer et scaler ses Meta Ads à l\'international : marchés émergents vs matures, localisation créative.',
  },
  {
    pillar: 'P3A',
    label: 'Tactiques créa',
    sectionTitle: 'Tactiques créatives',
    sectionDescription:
      'Hooks, formats, scripts UGC : les leviers tactiques pour faire performer chaque créatif.',
  },
  {
    pillar: 'P3B',
    label: 'Outils',
    sectionTitle: 'Outils & ressources',
    sectionDescription:
      'Templates, calculateurs, checklists prêts à l\'emploi pour les équipes growth.',
  },
  {
    pillar: 'P3C',
    label: 'Inspiration',
    sectionTitle: 'Inspiration & analyses',
    sectionDescription:
      'Études de cas, dissections de campagnes virales, observations terrain.',
  },
  {
    pillar: 'BOFU',
    label: 'Solutions',
    sectionTitle: 'Solutions Gang4',
    sectionDescription:
      'Ce qu\'on construit chez Gang4 pour industrialiser le whitelisting Meta.',
  },
];

/** Map utilitaire pour récupérer rapidement le label d'un pillar */
export const PILLAR_LABEL: Record<string, string> = Object.fromEntries(
  BLOG_THEMES.map((t) => [t.pillar, t.label])
);

/** Retourne le thème complet d'un pillar (ou null si inconnu) */
export function getThemeByPillar(pillar: string): BlogTheme | undefined {
  return BLOG_THEMES.find((t) => t.pillar === pillar);
}
