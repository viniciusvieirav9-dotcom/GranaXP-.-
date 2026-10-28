/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#080a08',
          card: '#121613',
          border: '#1f2721',
          lime: '#a3e635',
          neon: '#10ef81',
          muted: '#8e9e92'
        }
      }
    },
  },
  plugins: [],
}