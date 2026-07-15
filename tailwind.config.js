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
        shamisen: {
          DEFAULT: '#C23B22', // Vermilion Red (朱色)
          light: '#E86850',   // Light Vermilion
          dark: '#8B1A1A',    // Deep Crimson
          warm: '#F5A623',    // Warm Gold Accent
          bg: '#FDF6F0',      // Warm cream background
          bglight: '#FEF9F5',  // Lighter warm background
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
        serif: ['Cormorant Garamond', 'Noto Serif JP', 'YuMincho', 'Hiragino Mincho ProN', 'serif'],
        sans: ['Noto Sans JP', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
