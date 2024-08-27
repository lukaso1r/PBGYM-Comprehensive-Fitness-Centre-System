// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  build: {
    transpile: ['@vuepic/vue-datepicker']
  },
  modules: ["@nuxt/ui", '@nuxtjs/tailwindcss', '@pinia/nuxt'],
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config.js',
  },
  css: ['@/assets/css/main.css'],
  ui: {
    icons: ['material-symbols', 'ic', 'ph', 'twemoji', 'icon-park', 'icon-park-outline']
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
