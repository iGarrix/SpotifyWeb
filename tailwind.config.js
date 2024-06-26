module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    screens: {
      'mm': { 'min': '310px', 'max': '640px' },

      'sm': { 'min': '640px', 'max': '767px' },

      'md': { 'min': '768px', 'max': '1023px' },

      'lg': { 'min': '1024px', 'max': '1279px' },

      'xl': { 'min': '1280px', 'max': '1535px' },

      '2xl': { 'min': '1536px' },
    },
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
        },
        light: {
          100: "#f5f5f5",
          200: "#e6e6e6",
          300: "#cfcfcf",
        },
        buttongray: {
          100: "#424242",
        }
      },
      gridTemplateRows: {
        '7': 'repeat(7, minmax(0, 1fr))',
        '8': 'repeat(8, minmax(0, 1fr))',
        '9': 'repeat(9, minmax(0, 1fr))',
        '10': 'repeat(10, minmax(0, 1fr))',
        '11': 'repeat(11, minmax(0, 1fr))',
        '12': 'repeat(12, minmax(0, 1fr))',
        '13': 'repeat(13, minmax(0, 1fr))',
        '14': 'repeat(14, minmax(0, 1fr))',
        '15': 'repeat(15, minmax(0, 1fr))',
        '20': 'repeat(20, minmax(0, 1fr))',
        '39': 'repeat(39, minmax(0, 1fr))',
        '51': 'repeat(51, minmax(0, 1fr))',
      },
      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
        '14': 'repeat(14, minmax(0, 1fr))',
        '15': 'repeat(15, minmax(0, 1fr))',
        '16': 'repeat(16, minmax(0, 1fr))',
        '20': 'repeat(20, minmax(0, 1fr))',
      }
    },
  },
  plugins: [],
};
