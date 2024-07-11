/** @type {import('tailwindcss').Config} */



export default {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: "#6C63FF",
        lightPurple: "#A6A0FF",
        black: "#252525",
        while: "F7F7F7"
      }
    },
  },
  plugins: [],
}

