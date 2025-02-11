/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{html,css,jsx}"
    ],
    theme: {
      fontFamily: {
        Roboto: ['Roboto', 'Sans-serif'], // Corrected the font name
        Poppins: ['Poppins', 'sans-serif']
      },
      extend: {
        screens: {
          "1000px": "1050px",
          "1100px": "1110px",
          "800px": "800px",
          "1300px": "1300px",
          "400px": "400px"
        }
      },
    },
    plugins: [],
  }