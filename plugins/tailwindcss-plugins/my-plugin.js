// plugins/tailwindcss-plugins/my-plugin.js
const plugin = require('tailwindcss/plugin')

module.exports = plugin(function({ addUtilities }) {
  const newUtilities = {
    '.text-shadow': {
      textShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
    },
    '.text-shadow-md': {
      textShadow: '4px 4px 10px rgba(0, 0, 0, 0.3)',
    },
    '.text-shadow-lg': {
      textShadow: '6px 6px 15px rgba(0, 0, 0, 0.3)',
    },
    '.text-shadow-none': {
      textShadow: 'none',
    },
  }

  addUtilities(newUtilities, ['responsive', 'hover'])
})
