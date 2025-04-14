/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        white: '#FFFFFF',
        lightGray: '#F5F5F5',
        darkGray: '#333333',
        coral: '#FF6F61',
        calmBlue: '#4A90E2',
        calmBlueLight: '#EFF6FF',
        coralLight: '#FFF0EE',
      },
      boxShadow: {
        'coral/20': '0 4px 6px -1px rgba(255, 111, 97, 0.2)',
      },
    },
  },
  plugins: [],
};
