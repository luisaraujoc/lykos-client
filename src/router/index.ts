import { createWebHistory, createRouter } from "vue-router";
//import CadastroUsuario from '../components/CadastroUsuario.vue';
//import CadastroFreelancer from '../components/CadastroFreelancer.vue';
import PerfilFreelancer from "../components/PerfilFreelancer.vue";
import PerfilCliente from "../components/PerfilCliente.vue";

const routes = [
  //{ path: '/CadastroUsuario', component: CadastroUsuario },
  //{ path: '/CadastroFreelancer', component: CadastroFreelancer },
  {path: '/PerfilFreelancer', component: PerfilFreelancer },
  {path: '/PerfilCliente', component: PerfilCliente }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;