module.exports = {
  prefix: 'tw-',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'th-green': '#01A78D',
        'th-light-green': '#F6FFFD',
        'th-dark-green': '#056052',
        'th-blue': '#0D2A4A',
      },
    },
  },
  plugins: [],
}
