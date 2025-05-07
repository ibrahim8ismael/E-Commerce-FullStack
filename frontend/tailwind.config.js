/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#f9f9f9',
          DEFAULT: '#f5f5f5',
          dark: '#e0e0e0',
        },
        secondary: {
          light: '#424242',
          DEFAULT: '#212121',
          dark: '#000000',
        },
        accent: {
          light: '#c2185b',
          DEFAULT: '#880e4f',
          dark: '#560027',
        }
      },
      fontFamily: {
        sans: ['Helvetica', 'Arial', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}

