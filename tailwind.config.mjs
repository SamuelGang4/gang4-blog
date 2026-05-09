/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Gang4 design tokens (cohérence avec gang4-landing/Lovable)
        'gang4-deep': 'hsl(231, 60%, 11%)', // Background principal dark blue
        'gang4-mid': 'hsl(231, 45%, 28%)', // Mi-tons
        'gang4-vivid': 'hsl(231, 100%, 74%)', // Primary accent (purple/blue)
        'gang4-glow': 'hsl(231, 100%, 78%)', // Hover state
        'gang4-light': 'hsl(231, 100%, 96%)', // Light tint
      },
      backgroundImage: {
        'gang4-gradient': 'linear-gradient(135deg, hsl(231, 60%, 11%) 0%, hsl(231, 50%, 18%) 50%, hsl(231, 60%, 11%) 100%)',
        'gang4-text-gradient': 'linear-gradient(135deg, hsl(231, 100%, 74%) 0%, hsl(231, 100%, 88%) 100%)',
      },
      fontFamily: {
        sans: ['Lato', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 40px hsla(231, 100%, 74%, 0.4), 0 0 80px hsla(231, 100%, 74%, 0.2)',
        'glow-sm': '0 0 20px hsla(231, 100%, 74%, 0.3)',
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            color: 'hsla(0, 0%, 100%, 0.85)',
            fontSize: '1.0625rem', // 17px — confort lecture longue
            lineHeight: '1.75',
            maxWidth: 'none',

            // Liens : underline sobre, hover lumineux
            a: {
              color: theme('colors.gang4-vivid'),
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
              textDecorationThickness: '1px',
              transition: 'all 0.2s',
              '&:hover': { color: theme('colors.gang4-glow'), textDecorationThickness: '2px' },
            },

            // Hiérarchie typographique forte (scannabilité)
            h1: { color: theme('colors.white'), fontWeight: '900', letterSpacing: '-0.02em' },
            h2: {
              color: theme('colors.white'),
              fontWeight: '800',
              fontSize: '1.875rem',
              letterSpacing: '-0.015em',
              marginTop: '3rem',
              marginBottom: '1rem',
              paddingBottom: '0.75rem',
              borderBottom: '1px solid hsla(0, 0%, 100%, 0.08)',
              scrollMarginTop: '6rem',
            },
            h3: {
              color: theme('colors.white'),
              fontWeight: '700',
              fontSize: '1.375rem',
              marginTop: '2.25rem',
              marginBottom: '0.75rem',
              scrollMarginTop: '6rem',
            },
            h4: {
              color: theme('colors.white'),
              fontWeight: '700',
              fontSize: '1.125rem',
              marginTop: '1.75rem',
              marginBottom: '0.5rem',
            },

            // Paragraphes confortables
            p: {
              marginTop: '1.25rem',
              marginBottom: '1.25rem',
            },

            // Strong = blanc franc (visibilité scan)
            strong: { color: theme('colors.white'), fontWeight: '700' },

            // Code inline : pill subtle
            code: {
              color: theme('colors.gang4-vivid'),
              backgroundColor: 'hsla(231, 100%, 74%, 0.1)',
              padding: '0.15rem 0.4rem',
              borderRadius: '0.375rem',
              fontWeight: '600',
              fontSize: '0.9em',
              border: '1px solid hsla(231, 100%, 74%, 0.2)',
            },
            'code::before': { content: '""' },
            'code::after': { content: '""' },

            // Code block : style "dark editor"
            'pre': {
              backgroundColor: 'hsla(231, 60%, 6%, 0.9)',
              border: '1px solid hsla(0, 0%, 100%, 0.08)',
              borderRadius: '0.75rem',
              padding: '1.25rem',
              fontSize: '0.875rem',
              lineHeight: '1.6',
            },

            // Blockquote : signature visuelle forte (pull quote)
            blockquote: {
              color: theme('colors.white'),
              fontStyle: 'normal',
              fontWeight: '500',
              fontSize: '1.125rem',
              lineHeight: '1.65',
              borderLeft: '4px solid',
              borderLeftColor: theme('colors.gang4-vivid'),
              backgroundColor: 'hsla(231, 100%, 74%, 0.05)',
              padding: '1rem 1.25rem',
              borderRadius: '0 0.5rem 0.5rem 0',
              margin: '1.75rem 0',
              quotes: 'none',
            },
            'blockquote p': {
              marginTop: '0',
              marginBottom: '0',
            },
            'blockquote p:first-of-type::before': { content: 'none' },
            'blockquote p:last-of-type::after': { content: 'none' },

            // Listes : alignement propre + bullets vivid
            'ul > li': { paddingLeft: '0.5rem' },
            'ul > li::marker': { color: theme('colors.gang4-vivid') },
            'ol > li::marker': { color: theme('colors.gang4-vivid'), fontWeight: '700' },

            // Tableaux : style premium dark
            table: {
              fontSize: '0.95em',
              borderCollapse: 'separate',
              borderSpacing: '0',
              borderRadius: '0.75rem',
              overflow: 'hidden',
              border: '1px solid hsla(0, 0%, 100%, 0.1)',
              marginTop: '2rem',
              marginBottom: '2rem',
            },
            'thead': {
              backgroundColor: 'hsla(231, 100%, 74%, 0.08)',
              borderBottom: '1px solid hsla(0, 0%, 100%, 0.1)',
            },
            'thead th': {
              color: theme('colors.white'),
              fontWeight: '700',
              padding: '0.875rem 1rem',
              textAlign: 'left',
              fontSize: '0.875rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            },
            'tbody tr': {
              borderBottom: '1px solid hsla(0, 0%, 100%, 0.05)',
            },
            'tbody tr:last-child': { borderBottom: 'none' },
            'tbody td': {
              padding: '0.875rem 1rem',
              color: 'hsla(0, 0%, 100%, 0.8)',
            },

            // HR : séparateur subtle
            hr: {
              borderColor: 'hsla(0, 0%, 100%, 0.08)',
              marginTop: '3rem',
              marginBottom: '3rem',
            },

            // Images : rounded propres
            img: {
              borderRadius: '0.75rem',
            },
          },
        },
      }),
    },
  },
  plugins: [],
};
