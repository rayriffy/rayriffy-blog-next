const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue,mjs}'],
  darkMode: 'media',
  mode: 'jit',
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            h2: {
              marginTop: '0',
            },
          },
        },
      },
      fontFamily: {
        sans: ['Niramit', ...defaultTheme.fontFamily.sans],
        header: ['Kanit', ...defaultTheme.fontFamily.sans],
      },
      backgroundColor: {
        'black-overlay': 'rgba(0, 0, 0, 0.25)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
}
