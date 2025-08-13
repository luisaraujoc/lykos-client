<script setup>
import { useRoute } from 'vue-router'

// Pegamos a rota atual
const route = useRoute()


</script>

<template>
  <header class="bg-[var(--color-fundos)] border-b ">
    <div class="flex-grow h-16 flex items-center justify-between px-10 w-full ">
      <a href=""><img src="../img/Logo.png" alt="Logo" class="h-10"></a>
      <a v-if="route.path !== '/CadastroFreelancer'" href="./CadastroFreelancer">Torne-se um Freelancer</a>
    </div>
  </header>
</template>

<style scoped>
a {
  color: #171717
}
</style>