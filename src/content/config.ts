import { defineCollection, z } from 'astro:content';

/**
 * Content Collections — Schemas Zod pour le frontmatter MDX
 *
 * Référence : ~/Desktop/Gang4-SEO/astro-blog-spec.md (section frontmatter standard)
 */

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    // Identité de l'article
    title: z.string(),
    description: z.string(),
    author: z.string().default('samuel'),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    draft: z.boolean().default(false),

    // Stratégie SEO (cf. 03-strategy.md)
    pillar: z.enum([
      'P1', // Whitelisting & Partnership Ads
      'P2A', // Expertise technique Meta
      'P2B', // Scaling & frameworks
      'P2B-CMO', // Cluster CMO (attribution, MMM)
      'P2C', // Internationalisation
      'P3A', // Tactiques créatives
      'P3B', // Outils interactifs
      'P3C', // Inspiration & listicles
      'BOFU', // Pages conversion
    ]),
    persona: z.enum(['cmo', 'traffic-manager', 'creative-strategist', 'mixed']),

    // SEO
    keywordPrincipal: z.string(),
    keywordsSecondaires: z.array(z.string()).default([]),
    volumeFR: z.number().optional(),
    keywordDifficulty: z.number().optional(),
    intent: z.enum(['informational', 'commercial', 'transactional', 'navigational']),

    // GEO — Bloc "Réponse directe" obligatoire en ouverture (40-60 mots optimal pour AI Overviews)
    // Reco audit seo-geo : doit répondre à la question du titre + contenir le KW principal
    directAnswer: z.string().min(40, 'directAnswer doit faire au moins 40 caractères').max(500, 'directAnswer doit faire moins de 500 caractères').optional(),

    // Reading time (auto-calculable mais peut être surchargé)
    readingTimeMinutes: z.number().optional(),

    // CTA contextuel BOFU (recommandation seo-sxo : libellé spécifique à l'angle de l'article)
    cta: z
      .object({
        label: z.string().default('Réserver une démo'),
        href: z.string().default('https://gang4.io/whitelisting#demo'),
        contextLabel: z.string().optional(), // Ex: "Voir comment Gang4 gère votre whitelisting"
      })
      .default({}),

    // Visuels
    heroImage: z.string().optional(),
    ogImage: z.string().optional(),

    // Lead magnet associé (cf. pages-ideas.md) — enrichi pour sidebar sticky
    leadMagnet: z
      .object({
        type: z.enum(['pdf-gated', 'tool', 'newsletter', 'template', 'database', 'audit', 'webinar']),
        title: z.string(),
        description: z.string().optional(),
        bullets: z.array(z.string()).default([]),
        ctaLabel: z.string().default('Télécharger gratuitement'),
        url: z.string(),
        image: z.string().optional(), // Preview cover
        eyebrow: z.string().optional(), // Petit label au-dessus, ex: "Cheat sheet exclusive"
      })
      .optional(),

    // Cross-linking interne
    relatedPosts: z.array(z.string()).default([]),

    // GEO (Generative Engine Optimization) — cf. 05-authority-geo.md
    faq: z
      .array(
        z.object({
          question: z.string(),
          answer: z.string(),
        })
      )
      .default([]),
    schema: z
      .object({
        type: z.enum(['Article', 'BlogPosting', 'NewsArticle', 'HowTo', 'TechArticle']).default('Article'),
        enableFAQPage: z.boolean().default(false),
        enableHowTo: z.boolean().default(false),
      })
      .default({}),

    // Sources externes (signal de fraîcheur + autorité)
    sources: z
      .array(
        z.object({
          title: z.string(),
          url: z.string().url(),
        })
      )
      .default([]),

    // Data Gang4 propriétaire (cf. 06-data-assets.md)
    gangsData: z
      .object({
        enabled: z.boolean().default(false),
        tables: z.array(z.string()).default([]),
        description: z.string().optional(),
      })
      .default({}),
  }),
});

const authorsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    title: z.string(),
    bio: z.string(),
    avatar: z.string().optional(),
    linkedin: z.string().url().optional(),
    twitter: z.string().url().optional(),
    expertise: z.array(z.string()).default([]),
    yearsExperience: z.number().optional(),
  }),
});

export const collections = {
  blog: blogCollection,
  authors: authorsCollection,
};
