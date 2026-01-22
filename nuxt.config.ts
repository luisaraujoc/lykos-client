export default defineNuxtConfig({
  modules: [
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxtjs/color-mode',
    '@nuxt/test-utils',
    '@nuxt/scripts',
    '@nuxt/eslint',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt'
  ],

  css: [
    '~/assets/css/main.css'
  ],

  // Disable devtools to avoid cross-origin iframe issues in Builder.io
  devtools: {
    enabled: false
  },

  // Fix hydration mismatch issues
  ssr: true,
  experimental: {
    payloadExtraction: false,
    renderJsonPayload: true
  },

  colorMode: {
    classSuffix: '',
    preference: 'light',
    fallback: 'light',
    storageKey: 'lykos-theme'
  },

  // Nitro config for proper SSR handling
  nitro: {
    prerender: {
      crawlLinks: false
    }
  }
})
