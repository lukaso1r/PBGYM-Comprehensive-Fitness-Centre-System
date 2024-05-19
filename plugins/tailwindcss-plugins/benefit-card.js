const plugin = require('tailwindcss/plugin')

module.exports = plugin(function({ addUtilities }) {
  const newUtilities = {
    '.benefit-card': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F1F6FF',
      borderRadius: '0.375rem', // corresponds to rounded-md in Tailwind
      padding: '0.5rem', // corresponds to p-2 in Tailwind
    },
  }

  addUtilities(newUtilities, ['responsive', 'hover'])
})
