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
            color: 'hsl(0, 0%, 100%, 0.85)',
            a: {
              color: theme('colors.gang4-vivid'),
              textDecoration: 'underline',
              textUnderlineOffset: '4px',
              '&:hover': { color: theme('colors.gang4-glow') },
            },
            h1: { color: theme('colors.white'), fontWeight: '900' },
            h2: { color: theme('colors.white'), fontWeight: '800' },
            h3: { color: theme('colors.white'), fontWeight: '700' },
            h4: { color: theme('colors.white'), fontWeight: '700' },
            strong: { color: theme('colors.white'), fontWeight: '700' },
            code: {
              color: theme('colors.gang4-vivid'),
              backgroundColor: 'hsla(231, 100%, 74%, 0.1)',
              padding: '0.125rem 0.375rem',
              borderRadius: '0.25rem',
              fontWeight: '600',
            },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            blockquote: {
              color: 'hsl(0, 0%, 100%, 0.7)',
              borderLeftColor: theme('colors.gang4-vivid'),
            },
            hr: { borderColor: 'hsla(0, 0%, 100%, 0.1)' },
          },
        },
      }),
    },
  },
  plugins: [],
};
