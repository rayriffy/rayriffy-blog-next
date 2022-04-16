const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './src/**/*.html',
    './src/**/*.tsx',
    './src/**/*.ts',
    './src/**/*.jsx',
    './src/**/*.js',
  ],
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
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
