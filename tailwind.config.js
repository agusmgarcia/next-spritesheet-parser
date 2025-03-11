const colors = require("tailwindcss/colors");

/** @type import('tailwindcss').Config */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [],
  theme: {
    colors: {
      black: colors.black,
      cranberry: {
        50: "#fdf2f7",
        100: "#fce7f0",
        200: "#fad0e3",
        300: "#f7aaca",
        400: "#f175a6",
        500: "#e63b7a",
        600: "#d72b61",
        700: "#ba1c4a",
        800: "#9a1a3e",
        900: "#801b36",
        950: "#4e091b",
      },
      current: colors.current,
      dark: "#212529",
      gray: colors.gray,
      transparent: colors.transparent,
      white: colors.white,
    },
    screens: {
      lg: "1024px",
      md: "768px",
      xl: "1440px",
    },
  },
};
