/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // toggle dark mode with a class
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#fafbfc',
        card: '#ffffff',

        primary: '#1a1a2e',
        secondary: '#64748b',
        muted: '#a1a1aa',

        border: '#e2e8f0',

        header: '#1e293b',
        sidebar: '#f8fafc',

        accent: '#0d9488',
        'accent-hover': '#0f766e',
        'accent-soft': '#ccfbf1',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },

      animation: {
        fadeIn: 'fadeIn 0.3s ease-out',
      },

      borderRadius: {
        xl: '12px', // for rounded cards
      },
    },
  },
  plugins: [],
}
