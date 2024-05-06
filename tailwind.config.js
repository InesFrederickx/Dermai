/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FEFCFB",
        "gradient-start": "#ffffff",
        "gradient-end": "#FCEDE7",
        secondary: {
          DEFAULT: "#44402F",
        },
        pink: {
          DEFAULT: "#FCEDE7",
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
