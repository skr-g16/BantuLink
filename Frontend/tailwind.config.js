/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'bg-gray-700',
    'text-white',
    'bg-yellow-50',
    'text-orange-900',
    'hover:bg-gray-700',
    'hover:bg-yellow-50',
    'hover:text-orange-900',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}