module.exports = {
  purge: ["./src/components/**/*.jsx", "./src/components/*.jsx", "./src/views/*.jsx", "./src/*.jsx"],
  theme: {
    extend: {},
    colors: {
      transparent: "transparent",
      primary: "#B41C2E",
      white: "#ffffff",
      black: "#000",
      bgdisabled: "#FFEEEE",
      textdisabled: '#B41C2E',
      green: "#3CBC00",
      purple: "#8501ff",
      bgpurple: "#F4F3FF",
      cyan: "#008272",
      red: "#ff0101",
      gray: "#e4e4e4",
      darkgray: "#424242",
      guyabano: "#f8f8f8",
      darkblack: "#090909",
      bordergrey: "#f0f0f1",
      textgrey: "#909090",
      bggrey: "#FAFAFA",
      blue: "#0058DD",
      bgblue: "#DCE2F6",
      green: "#01930F",
      bggreen: "#D8FCE4",
      bgred: "#FFEEEE",
    },
    fontFamily: {
      'mont': ["Montserrat", "ui-sans-serif", "system-ui"],
    },
  },
  plugins: [
    require('@tailwindcss/forms')
    // require("tw-elements/dist/plugin")
  ],
};
