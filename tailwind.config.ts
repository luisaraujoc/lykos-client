import { defineConfig } from 'tailwindcss'
import ui from '@nuxt/ui/tailwind'

export default defineConfig({
  presets: [ui], // herda o tema do @nuxt/ui
  content: [
    './app.vue',
    './pages/**/*.{vue,js,ts}',
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.{vue,js,ts}'
  ],
  theme: {
    extend: {
      colors: {
        dourado: '#CFAA60',
        azulEscuro: '#0C1C2C',
        azulClaro: '#54ABDD',
        laranja: '#EBB855',
      }
    }
  }
})
