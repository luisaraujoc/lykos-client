import { createWebHistory, createRouter } from "vue-router";
import CadastroUsuario from '../components/CadastroUsuario.vue';
import CadastroFreelancer from '../components/CadastroFreelancer.vue';

const routes = [
  { path: '/CadastroUsuario', component: CadastroUsuario },
  { path: '/CadastroFreelancer', component: CadastroFreelancer }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;