// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:8080'
    }
  },

  build: {
    transpile: ['@vuepic/vue-datepicker']
  },

  modules: ["@nuxt/ui", '@nuxtjs/tailwindcss', '@pinia/nuxt', 'shadcn-nuxt'],
  shadcn: {
    prefix: '',
    componentDir: './components/ui'
  },

  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config.js',
  },

  colorMode: {
    preference: 'light'
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

  compatibilityDate: '2024-10-05',
})