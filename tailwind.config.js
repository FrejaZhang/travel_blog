/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF8FB1',
          light: '#FFB3CC',
          dark: '#FF6B9D',
        },
        mint: {
          DEFAULT: '#A0E7E5',
          light: '#C8F5F4',
          dark: '#7DD8D6',
        },
        cream: {
          DEFAULT: '#FFF7F0',
          yellow: '#FFD166',
          pink: '#FFF0F5',
        },
        sage: '#B5EAD7',
        coral: '#FF6B6B',
      },
      fontFamily: {
        display: ['Baloo 2', 'Noto Sans SC', 'sans-serif'],
        body: ['Noto Sans SC', 'sans-serif'],
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        soft: '0 4px 20px rgba(255, 143, 177, 0.15)',
        card: '0 8px 30px rgba(255, 143, 177, 0.12)',
        hover: '0 12px 40px rgba(255, 143, 177, 0.25)',
      },
      animation: {
        'bounce-soft': 'bounce-soft 2s infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        'bounce-soft': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
    },
  },
  plugins: [],
}
