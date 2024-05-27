/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#F4EEE4",
        },
        secondary: {
          DEFAULT: "#2B4735",
        },
        orange: {
          DEFAULT: "#F28C2F",
        },
        pink: {
          DEFAULT: "#E2A1AE",
        },
      },
      fontFamily: {
        avlightitalic: ["AveriaSerifLibre-LightItalic", "sans-serif"],
        avlight: ["AveriaSerifLibre-Light", "sans-serif"],
        avregular: ["AveriaSerifLibre-Regular", "sans-serif"],
        avitalic: ["AveriaSerifLibre-Italic", "sans-serif"],
        avbold: ["AveriaSerifLibre-Bold", "sans-serif"],
        avbolditalic: ["AveriaSerifLibre-BoldItalic", "sans-serif"],
        yesregular: ["YesevaOne-Regular", "sans-serif"],
      },
    },
  },
  plugins: [],
};
