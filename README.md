# gang4-blog

Le blog SEO de [Gang4](https://gang4.io) — expertise Meta Ads pour les DNVB e-commerce françaises.

🌐 **Production :** https://blog.gang4.io
🏗️ **Stack :** [Astro](https://astro.build) (SSG) + React + MDX + Tailwind + Netlify
📚 **Stratégie SEO :** documentée dans `~/Desktop/Gang4-SEO/` (cf. README de ce dossier)

---

## 🚀 Démarrage rapide

### Prérequis
- Node.js 20+
- Bun (recommandé) ou npm/pnpm

### Installation
```bash
bun install
```

### Dev
```bash
bun run dev
# → http://localhost:4321
```

### Build
```bash
bun run build       # produit dist/
bun run preview     # preview du build
```

### Type-check
```bash
bun run check
```

---

## 📁 Structure

```
gang4-blog/
├── public/
│   ├── robots.txt           # Autorise bots LLM
│   ├── llms.txt             # Guide pour les LLM
│   └── favicon.svg
│
├── src/
│   ├── content/
│   │   ├── config.ts        # Schemas Zod pour MDX
│   │   ├── blog/            # 1 .mdx par article
│   │   └── authors/
│   │       └── samuel.md
│   │
│   ├── pages/
│   │   ├── index.astro      # Homepage
│   │   └── blog/
│   │       ├── index.astro  # Liste articles
│   │       └── [...slug].astro  # Article dynamique
│   │
│   ├── layouts/
│   │   ├── BaseLayout.astro    # Layout général (SEO + nav + footer)
│   │   └── ArticleLayout.astro # Layout articles (Schema.org Article + FAQ)
│   │
│   ├── components/
│   │   ├── SEO.astro        # Méta tags + OG + Twitter + JSON-LD
│   │   ├── Navbar.astro
│   │   └── Footer.astro
│   │
│   └── styles/
│       └── global.css       # Tailwind + reset
│
├── astro.config.mjs         # Config Astro (intégrations)
├── tailwind.config.mjs      # Cohérent avec gang4-landing
├── tsconfig.json            # TS strict + path aliases
├── netlify.toml             # Config build + headers Netlify
└── package.json
```

---

## ✍️ Ajouter un nouvel article

1. Créer un fichier `.mdx` dans `src/content/blog/`
2. Frontmatter (cf. `src/content/config.ts` pour le schema complet) :

```yaml
---
title: "Andromeda Meta : le guide complet de l'algorithme de delivery"
description: "Comprendre comment Andromeda priorise les ads Meta en 2026..."
author: "samuel"
publishedAt: 2026-05-15
pillar: "P2A"
persona: "traffic-manager"
keywordPrincipal: "andromeda meta"
intent: "informational"
heroImage: "/og-images/andromeda.png"
schema:
  type: "Article"
  enableFAQPage: true
faq:
  - question: "Qu'est-ce qu'Andromeda chez Meta ?"
    answer: "Andromeda est le système de delivery Meta Ads lancé en 2024..."
gangsData:
  enabled: true
  tables: ["MetaAdInsight", "Whitelisting"]
  description: "Données issues de 999 demandes whitelisting + 3 700 insights Meta clients Gang4"
---

# Bloc "Réponse directe" GEO-friendly (40-60 mots)

Andromeda est le système de delivery Meta Ads lancé en 2024 qui...

## Section 1

Contenu...
```

3. Commit + push → Netlify déploie automatiquement.

---

## 🌐 Déploiement

- **Hébergeur :** Netlify
- **Build trigger :** push sur `main`
- **Domaine :** `blog.gang4.io` (CNAME vers `gang4-blog.netlify.app`)
- **DNS :** géré chez OVH

### Configuration DNS (à faire chez OVH une seule fois)
```
Type   Sub-domain   Target
CNAME  blog         gang4-blog.netlify.app
```

Puis dans Netlify : Settings → Domain management → Add custom domain → `blog.gang4.io`.

---

## 🛡️ SEO & GEO

- **SSG complet** par défaut (`output: 'static'` dans `astro.config.mjs`)
- **Sitemap auto** via `@astrojs/sitemap` → `/sitemap-index.xml`
- **Schema.org** Article + FAQPage + Person générés automatiquement
- **Bots LLM autorisés** dans `robots.txt`
- **llms.txt** disponible à la racine
- **Bloc "Réponse directe"** GEO-friendly à inclure en ouverture de chaque article (cf. `~/Desktop/Gang4-SEO/05-authority-geo.md` Section 8.5)

---

## 📚 Documentation projet

- Stratégie SEO complète : `~/Desktop/Gang4-SEO/`
- Spec technique : `~/Desktop/Gang4-SEO/astro-blog-spec.md`
- Décisions techniques : `~/Desktop/Gang4-SEO/decisions-log.md`

---

## 🤝 Contribuer

Pour ajouter un article ou modifier le code :
1. Créer une branche `feat/[nom-article]` ou `fix/[description]`
2. Commit + push
3. Ouvrir une PR vers `main`
4. Netlify déploie une preview automatiquement
5. Merge → déploiement production
