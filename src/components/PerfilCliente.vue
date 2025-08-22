<script setup>
import { MapPin, User, Language, Clock, Twitter, Instagram, Facebook } from "@iconoir/vue"

const user = {
  name: "Bruno Nunes",
  username: "@brunonunes",
  location: "Eunápolis, BA - Brasil",
  joined: "Ingressou em maio de 2025",
  languages: ["Português (Nativo)", "Inglês (Fluente): Chamadas e mensagens"],
  schedule: "Seg-Sex, 08:00-18:00",
  
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <!-- Conteúdo principal -->
    <div class="flex flex-1  mx-auto w-full p-6 gap-6 flex-col md:flex-row">
      
      <!-- Coluna esquerda - Perfil -->
      <aside class="bg-white shadow rounded-lg p-6 w-full md:w-1/3 flex flex-col items-center">
        <!-- Avatar -->
        <img src="../Lykos - Simbolo.png" alt="Foto do usuário" class="w-28 h-28 rounded-full object-cover mb-4" />

        <!-- Nome e username -->
        <h2 class="text-lg font-semibold">{{ user.name }}</h2>
        <p class="text-gray-500 mb-4">{{ user.username }}</p>

        <!-- Informações -->
        <ul class="w-full space-y-3 text-sm text-gray-600">
          <li class="flex items-center gap-2">
            <MapPin class="w-5 h-5" /> {{ user.location }}
          </li>
          <li class="flex items-center gap-2">
            <User class="w-5 h-5" /> {{ user.joined }}
          </li>
          <li class="flex items-start gap-2">
            <Language class="w-5 h-5 mt-1" />
            <div class="flex flex-col">
              <span v-for="(lang, i) in user.languages" :key="i">{{ lang }}</span>
            </div>
          </li>
          <li class="flex items-center gap-2">
            <Clock class="w-5 h-5" /> Horário preferencial: {{ user.schedule }}
          </li>
        </ul>

        <!-- Botões -->
        <div class="mt-6 w-full space-y-3">
          <button class="w-full border border-yellow-600 text-yellow-600 px-4 py-2 rounded-lg  flex items-center justify-center gap-2 cursor-pointer">
            <a href="">Editar ✏️</a>
          </button>
          <button class="w-full border border-yellow-600 text-yellow-600 px-4 py-2 rounded-lg  flex items-center justify-center gap-2 cursor-pointer">
            <a href="">Conheça Lykos</a>
          </button>
        </div>
      </aside>

      <!-- Coluna direita - Contratações -->
      <main class="flex-1">
        <div class="bg-white shadow rounded-lg p-6 h-full flex flex-col items-center justify-center">
          <h3 class="text-lg font-semibold mb-6 self-start">Contratações ativas</h3>
          <div class="flex flex-col items-center text-gray-600">
            <span class="text-5xl mb-4">🤷🏽‍♂️</span>
            <p>Você ainda não contratou ninguém!</p>
          </div>
        </div>
      </main>
    </div>

    <!-- Rodapé -->
    <footer class="bg-blue-100 py-6">
      <div class="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-gray-600 px-6 gap-4">
        <!-- Links -->
        <div class="flex gap-6 text-sm">
          <a href="#">Sobre</a>
          <a href="#">Contato</a>
          <a href="#">Termos de Serviço</a>
          <a href="#">Política de Privacidade</a>
        </div>

        <!-- Redes sociais -->
        <div class="flex gap-4 text-gray-500 text-lg">
          <a href="#"><Twitter class="w-6 h-6" /></a>
          <a href="#"><Instagram class="w-6 h-6" /></a>
          <a href="#"><Facebook class="w-6 h-6" /></a>
        </div>
      </div>
    </footer>
  </div>
</template>
