/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        rubik: ['Rubik', 'sans-serif'],
      },
    },
  },
  variants: {},
  plugins: [],
  corePlugins: {
    // Optionally disable built-in scrollbar utilities if you have any custom styling
    scrollbar: false,
  },
}

