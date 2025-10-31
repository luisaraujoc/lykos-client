// main.ts
import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Importe a instância do roteador
import './style.css';

createApp(App)
  .use(router) // Use o roteador
  .mount('#app');