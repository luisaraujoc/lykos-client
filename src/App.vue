<script setup lang="ts">
import navBarCadastros from './components/navBarCadastros.vue';
</script>

<template>
  <div>
    <navBarCadastros />
    <router-link to="/CadastroUsuario"></router-link>
    <router-link to="/CadastroFreelancer"></router-link>
    <router-link to="/PerfilFreelancer"></router-link>
    <router-link to="/PerfilCliente"></router-link>
    <router-view></router-view>
  </div>
</template>