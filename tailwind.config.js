const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    height: theme => ({
      '80': '18rem',
      auto: 'auto',
      ...theme('spacing'),
      full: '100%',
      screen: '100vh'
    }),
    extend: {
      fontFamily: {
        montserrat: [
          "'Montserrat'",
          '-apple-system',
          'BlinkMacSystemFont',
          "'Segoe UI'",
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          "'Open Sans'",
          "'Helvetica Neue'",
          'sans-serif'
        ],
        libreBaskerville: [
          "'Libre Baskerville'",
          '-apple-system',
          'BlinkMacSystemFont',
          "'Segoe UI'",
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          "'Open Sans'",
          "'Helvetica Neue'",
          'sans-serif'
        ]
      }
    },
    colors: {
      primary: '#1ea0ae',
      bgColor: '#7DD7E5',
      accent: '#BF9B30',
      circleBorder: '#7070704D',
      circleBackground: '#F6F6F6',
      circleTextColor: '#A5A5A5',
      ...defaultTheme.colors,
      red: '#D22A2A'
    }
  },
  plugins: [
    require('@tailwindcss/custom-forms'),
    require('tailwindcss-debug-screens')
  ]
}
