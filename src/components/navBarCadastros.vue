<script setup>
import { useRoute } from 'vue-router'
import { Bell } from '@iconoir/vue';


// Pegamos a rota atual
const route = useRoute()


</script>

<template>
  <header class="bg-[var(--color-fundo-input)] border-b-2 border-gray-200 ">
    <div class="flex-grow h-16 flex items-center justify-between px-10 w-full ">
      <a href=""><img src="../img/Logo.png" alt="Logo" class="h-10"></a>
      <a v-if="route.path !== '/CadastroFreelancer' && route.path !== '/PerfilFreelancer'" href="./CadastroFreelancer">Torne-se um Freelancer</a>
      <!--Área para navegação do perfil-->
      <div v-if="route.path === '/PerfilFreelancer'" class="flex items-center">
        <a href="" class="mr-4">Explorar</a>
        <a href="" class="mr-4">Dashboard</a>
        <button class="border-transparent rounded text-black h-auto p-2 cursor-pointer mr-4">Mensagens</button>
        <button class="border-transparent rounded text-black  p-2 cursor-pointer"><Bell class=""/></button>
        <img src="../Lykos - Simbolo.png" alt="Avatar" class="h-10 w-10 rounded-full ml-4">
      </div>
    </div>
  </header>
</template>

<style scoped>
a {
  color: #171717
}
button{
  background-color: #F2F0E8;
}
</style>