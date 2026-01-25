/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        leather: {
          DEFAULT: '#1E3A8A', // Indigo Blue (Denim)
          light: '#60A5FA',   // Light Denim
          dark: '#172554',    // Deep Indigo
        },
        gold: {
          foil: '#F59E0B',    // Mustard/Gold Stitch
        },
        accent: {
          red: '#E11D48',     // Bingata Red
          yellow: '#FBBF24',  // Bingata Yellow
        }
      },
      fontFamily: {
        serif: ['Times New Roman', 'YuMincho', 'Hiragino Mincho ProN', 'serif'],
      }
    },
  },
  plugins: [],
}
