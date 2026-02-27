/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mysore: {
          50: '#FDFAF2',
          100: '#FAF2D9',
          200: '#F3E1AC',
          300: '#ECCB79',
          400: '#E6B44A',
          500: '#DF9F23',
          600: '#C37D15',
          700: '#9B5B13',
          800: '#7E4716',
          900: '#673B16',
          950: '#3A1E08',
          gold: '#D4AF37',
        },
      },
      backgroundImage: {
        'mysore-light': 'linear-gradient(to right bottom, #FDFAF2, #FAF2D9, #F3E1AC)',
        'mysore-dark': 'linear-gradient(to right bottom, #1a1a1a, #2d1b0e)',
        'card-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
      }
    },
  },
  plugins: [],
}
