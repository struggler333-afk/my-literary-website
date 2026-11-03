/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Amiri', 'Tajawal', 'Georgia', 'serif'],
        sans: ['Tajawal', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: {
          50: '#f6f5f2',
          100: '#e8e6e0',
          200: '#d4d0c7',
          300: '#b5afa3',
          400: '#8e8779',
          500: '#6b6557',
          600: '#4f4b41',
          700: '#3a372f',
          800: '#26241f',
          900: '#171613',
          950: '#0d0c0a',
        },
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out forwards',
        'fade-in': 'fade-in 0.4s ease-out forwards',
      },
    },
  },
  plugins: [],
};
