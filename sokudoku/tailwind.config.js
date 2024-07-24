/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable dark mode
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        palette1: {
          primary: '#ff6347', // Tomato
          secondary: '#4caf50', // Green
          accent: '#1e90ff', // DodgerBlue
        },
        palette2: {
          primary: '#6a0dad', // Purple
          secondary: '#ff4500', // OrangeRed
          accent: '#32cd32', // LimeGreen
        },
        palette3: {
          primary: '#4682b4', // SteelBlue
          secondary: '#ff69b4', // HotPink
          accent: '#ff8c00', // DarkOrange
        },
        palette4: {
          primary: '#8a2be2', // BlueViolet
          secondary: '#7fff00', // Chartreuse
          accent: '#dc143c', // Crimson
        },
        palette5: {
          primary: '#d2691e', // Chocolate
          secondary: '#6495ed', // CornflowerBlue
          accent: '#ff1493', // DeepPink
        },
        palette6: {
          primary: '#5f9ea0', // CadetBlue
          secondary: '#ff6347', // Tomato
          accent: '#7fffd4', // Aquamarine
        },
        palette7: {
          primary: '#ff4500', // OrangeRed
          secondary: '#2e8b57', // SeaGreen
          accent: '#ff6347', // Tomato
        },
        palette8: {
          primary: '#daa520', // GoldenRod
          secondary: '#8b008b', // DarkMagenta
          accent: '#ff69b4', // HotPink
        },
        palette9: {
          primary: '#b22222', // FireBrick
          secondary: '#ff4500', // OrangeRed
          accent: '#1e90ff', // DodgerBlue
        },
        palette10: {
          primary: '#8b0000', // DarkRed
          secondary: '#ff8c00', // DarkOrange
          accent: '#32cd32', // LimeGreen
        },
      },
    },
  },
  plugins: [],
};
