module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        'sans-serif': ['Lexend'],
      },
      colors: {
        primary: {
          100: "#005EB4",
        },
        extrablack: {
          100: "#0E0E0E",
        },
        dark: {
          100: "#434343",
          200: "#141414",
        }
      }
    },
  },
  plugins: [],
};
