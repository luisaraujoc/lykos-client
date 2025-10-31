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
        <div class="bg-white shadow rounded-lg p-6 h-full flex flex-col ">
          <h3 class="text-lg font-semibold mb-6  text-black text-center">Contratações ativas</h3>
          <!-- Lista de contratações -->
          <div class="flex items-stretch justify-between gap-4 rounded-lg bg-[var(--color-fundo-input)] p-4">
                <div class="flex flex-col gap-2 p-4  w-full max-w-[480px]">
                  <div class="flex flex-col gap-1">
                    <p class="text-[#0d141c] text-base font-bold leading-tight">Sessão Fotografica</p>
                    <p class="text-[#49709c] text-sm font-normal leading-normal">Freelancer: Alex Turner</p>
                  </div>
                  <button
                    class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 flex-row-reverse bg-[#e7edf4] text-[#0d141c] text-sm font-medium leading-normal w-fit"
                  >
                    <span class="truncate">Detalhes</span>
                  </button>
                </div>
                <div
                  class="w-40 h-28 bg-center bg-no-repeat bg-cover rounded-lg"
                  style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuA90odZd3razRM2DGbQD9QvpHml6rifZXxdAytw_iMNOCoBnybC9C3OtQtgTAi3_sWn7RHwHdx4idSCkDi4LxL6XQD3O9gNNUOYi8Kp40JEpYBXKd7N4IKeUlCRmuAhbBamFsjoscoNE5bMfHA9e-y-paQRWoq2wvAer3nc7rlZLju1cP2rXVoK7ILQyNoCqFERjBJ8XWtoHH2qeu2140pXtulS0yJJsOX0wJrXKV0LHAgWnYIDUMk_rkHUp_dORy_oK5uGqqSKTmA");'
                ></div>
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
