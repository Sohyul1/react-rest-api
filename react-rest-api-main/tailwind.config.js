/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // This creates custom classes: bg-theme-bg and text-theme-text
        'theme-bg': 'var(--bg-color)',
        'theme-text': 'var(--text-color)',
      }
    },
  },
  plugins: [],
}