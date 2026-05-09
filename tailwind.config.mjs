/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Cohérence avec gang4-landing (Lovable)
        'gang4-deep': 'hsl(231, 60%, 11%)',
        'gang4-primary': 'hsl(212, 100%, 50%)',
        'gang4-accent': 'hsl(280, 80%, 60%)',
      },
      fontFamily: {
        sans: ['Lato', 'system-ui', '-apple-system', 'sans-serif'],
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            color: theme('colors.white'),
            a: {
              color: theme('colors.gang4-primary'),
              '&:hover': {
                color: theme('colors.gang4-accent'),
              },
            },
            h1: { color: theme('colors.white') },
            h2: { color: theme('colors.white') },
            h3: { color: theme('colors.white') },
            h4: { color: theme('colors.white') },
            strong: { color: theme('colors.white') },
            code: { color: theme('colors.gang4-primary') },
            blockquote: { color: theme('colors.white') },
          },
        },
      }),
    },
  },
  plugins: [],
};
