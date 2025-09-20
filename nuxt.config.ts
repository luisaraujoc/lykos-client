export default defineNuxtConfig({
  modules: [
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/test-utils',
    '@nuxt/scripts',
    '@nuxt/eslint'
  ],

  css: [
    '~/assets/css/main.css'
  ],

  ui: {
    global: false // tira os estilos globais "extra"
  }
})
