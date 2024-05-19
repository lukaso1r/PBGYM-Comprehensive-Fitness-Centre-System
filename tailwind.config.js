/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [
    require('./plugins/tailwindcss-plugins/my-plugin'),
    require('./plugins/tailwindcss-plugins/benefit-card'),
  ],
}

