/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#16a8ff',
          orange: '#ff7a00',
          dark: '#050914',
          card: '#09111f'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif']
      },
      boxShadow: {
        'glow-blue': '0 0 25px rgba(22, 168, 255, 0.35)',
        'glow-orange': '0 0 25px rgba(255, 122, 0, 0.35)',
        'glow-emerald': '0 0 25px rgba(16, 185, 129, 0.45)',
        'btn-primary': '0 10px 25px -3px rgba(8, 124, 255, 0.3), 0 4px 10px -2px rgba(255, 122, 0, 0.25)',
      }
    },
  },
  plugins: [],
};
