<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
  layout: 'DefaultLayout',
})

// Mock service data - replace with API call later
const service = ref({
  id: 1,
  title: 'Logo Design Profissional',
  seller: {
    name: 'Sophia Carter',
    avatar: 'https://i.pravatar.cc/100?u=sophia-carter',
    rating: 4.9,
    reviews: 120,
    responseTime: '< 1 hora',
    joinDate: 'Membro desde 2021',
    bio: 'Olá! Sou Sophia, uma designer gráfica apaixonada por criar identidades visuais únicas e impactantes. Com mais de 5 anos de experiência, ajudo empresas a se destacarem no mercado através de designs criativos e personalizados. Vamos trabalhar juntos para transformar suas ideias em realidade!'
  },
  images: [
    { src: 'https://picsum.photos/600/400?random=1', alt: 'Portfolio 1' },
    { src: 'https://picsum.photos/600/400?random=2', alt: 'Portfolio 2' },
    { src: 'https://picsum.photos/600/400?random=3', alt: 'Portfolio 3' },
  ],
  packages: [
    {
      id: 1,
      name: 'Logo Designer',
      description: 'Este pacote foca no essencial para quem precisa de um logo profissional sem muitas complexidades ou elementos de marca adicionais.',
      price: 1200,
      features: [
        '1 a 2 conceitos de logo iniciais',
        'Entrega de arquivos em alta resolução'
      ],
      deliveryDays: '3-5 dias úteis',
      revisions: '2 revisões'
    },
    {
      id: 2,
      name: 'Branding Kit',
      description: 'Este pacote é para quem busca não apenas um logo, mas também alguns elementos de branding.',
      price: 10000,
      features: [
        '3 a 4 conceitos de brandings iniciais',
        'Paleta de Cores Definida',
        'Manual de Uso Simplificado da Marca',
        'Seleção de Fontes (Primária e Secundária)'
      ],
      deliveryDays: '15-30 dias úteis',
      revisions: '3-4 revisões'
    },
    {
      id: 3,
      name: 'Brand Strategy',
      description: 'Este é o pacote mais robusto, ideal para empresas que buscam uma imersão completa na estratégia de marca.',
      price: 15000,
      features: [
        'Brand Book (Manual de Marca Completo)',
        'Pesquisa de Mercado e Análise de Concorrência',
        'Definição de Persona/Público-Alvo',
        'Mockups de Aplicação da Marca'
      ],
      deliveryDays: '1-2 meses',
      revisions: '7-9 revisões'
    }
  ],
  serviceFeatures: [
    'Design de logotipo personalizado e adaptado à sua marca',
    'Arquivos de alta resolução em vários formatos',
    'Revisões ilimitadas até a satisfação'
  ],
  rating: 4.9,
  totalReviews: 120,
  ratingDistribution: [
    { stars: 5, percent: 80 },
    { stars: 4, percent: 14 },
    { stars: 3, percent: 3 },
    { stars: 2, percent: 1 },
    { stars: 1, percent: 2 },
  ],
  reviews: [
    {
      id: 1,
      user: 'Ethan Bennett',
      avatar: 'https://i.pravatar.cc/50?img=3',
      date: '1 mês atrás',
      stars: 5,
      text: 'O design do logotipo da Sophia superou minhas expectativas. Capturou perfeitamente a visão da minha marca.',
      likes: 2
    },
    {
      id: 2,
      user: 'Olívia Hayes',
      avatar: 'https://i.pravatar.cc/50?img=5',
      date: '2 meses atrás',
      stars: 5,
      text: 'Trabalhar com a Sophia foi um prazer. Ela foi ágil, criativa e criou um logotipo que realmente representa a identidade da minha marca.',
      likes: 1
    }
  ]
})

const selectedPackage = ref(null)

const selectPackage = (packageId) => {
  selectedPackage.value = packageId
  navigateTo(`/dashboard/purchase/checkout/${packageId}`)
}
</script>

<template>
  <div class="min-h-screen bg-white">
    <div class="max-w-6xl mx-auto px-6 py-8">
      <!-- Header Section -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <!-- Main Content -->
        <div class="lg:col-span-2">
          <!-- Service Title -->
          <h1 class="text-3xl font-bold text-black mb-4">{{ service.title }}</h1>

          <!-- Seller Info Card -->
          <div class="bg-gray-50 p-6 rounded-lg mb-8">
            <div class="flex items-center gap-4 mb-4">
              <img
                :src="service.seller.avatar"
                :alt="service.seller.name"
                class="w-16 h-16 rounded-full object-cover"
              />
              <div class="flex-1">
                <h2 class="text-xl font-semibold text-black">{{ service.seller.name }}</h2>
                <div class="flex items-center gap-2 text-sm text-gray-600 mt-1">
                  <span class="text-yellow-500">★</span>
                  <span>{{ service.seller.rating }} ({{ service.seller.reviews }} reviews)</span>
                  <span class="text-gray-400">•</span>
                  <span>{{ service.seller.responseTime }}</span>
                </div>
                <p class="text-sm text-gray-500 mt-1">{{ service.seller.joinDate }}</p>
              </div>
            </div>
            <p class="text-gray-700">{{ service.seller.bio }}</p>
          </div>

          <!-- Gallery -->
          <div class="mb-8">
            <h3 class="text-lg font-semibold text-black mb-4">Galeria</h3>
            <div class="grid grid-cols-3 gap-4">
              <div
                v-for="(image, idx) in service.images"
                :key="idx"
                class="aspect-video bg-gray-200 rounded-lg overflow-hidden"
              >
                <img
                  :src="image.src"
                  :alt="image.alt"
                  class="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </div>
            </div>
          </div>

          <!-- About Section -->
          <div class="mb-8">
            <h3 class="text-lg font-semibold text-black mb-4">Sobre este serviço</h3>
            <div class="space-y-4">
              <div>
                <h4 class="font-medium text-black mb-2">O que está incluído:</h4>
                <ul class="space-y-2">
                  <li
                    v-for="(feature, idx) in service.serviceFeatures"
                    :key="idx"
                    class="flex items-start gap-3 text-gray-700"
                  >
                    <span class="text-[var(--color-dourado)] mt-1">✓</span>
                    {{ feature }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar - Packages -->
        <div class="lg:col-span-1">
          <div class="sticky top-20">
            <div class="space-y-4">
              <div
                v-for="pkg in service.packages"
                :key="pkg.id"
                class="border-2 border-gray-200 rounded-lg p-5 hover:border-[var(--color-dourado)] transition-colors"
                :class="selectedPackage === pkg.id ? 'border-[var(--color-dourado)] bg-amber-50' : ''"
              >
                <h3 class="font-semibold text-black text-lg mb-2">{{ pkg.name }}</h3>
                <p class="text-sm text-gray-600 mb-4">{{ pkg.description }}</p>

                <!-- Features -->
                <ul class="space-y-2 mb-4">
                  <li
                    v-for="(feature, idx) in pkg.features"
                    :key="idx"
                    class="flex items-start gap-2 text-sm text-gray-700"
                  >
                    <span class="text-[var(--color-dourado)] mt-0.5">✓</span>
                    {{ feature }}
                  </li>
                </ul>

                <!-- Details -->
                <div class="bg-gray-50 rounded p-3 mb-4 space-y-2 text-sm">
                  <div class="flex justify-between">
                    <span class="text-gray-600">Prazo:</span>
                    <span class="font-medium text-black">{{ pkg.deliveryDays }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Revisões:</span>
                    <span class="font-medium text-black">{{ pkg.revisions }}</span>
                  </div>
                </div>

                <!-- Price and Button -->
                <div class="border-t border-gray-200 pt-4">
                  <p class="text-2xl font-bold text-[var(--color-dourado)] mb-3">
                    R$ {{ pkg.price.toLocaleString('pt-BR') }}
                  </p>
                  <UButton
                    @click="selectPackage(pkg.id)"
                    class="w-full bg-[var(--color-dourado)] text-white font-semibold hover:opacity-90"
                  >
                    Contratar
                  </UButton>
                </div>
              </div>
            </div>

            <!-- Contact Button -->
            <UButton
              variant="soft"
              class="w-full mt-4"
            >
              Contatar Freelancer
            </UButton>
          </div>
        </div>
      </div>

      <!-- Reviews Section -->
      <div class="border-t border-gray-200 pt-12">
        <h2 class="text-2xl font-bold text-black mb-8">Avaliações</h2>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <!-- Rating Summary -->
          <div class="lg:col-span-1">
            <div class="bg-gray-50 rounded-lg p-6">
              <div class="mb-6">
                <p class="text-5xl font-bold text-black">{{ service.rating }}</p>
                <div class="flex items-center gap-2 mt-2">
                  <div class="flex text-yellow-400 gap-0.5">
                    <span v-for="i in 5" :key="i">★</span>
                  </div>
                  <p class="text-sm text-gray-600">{{ service.totalReviews }} reviews</p>
                </div>
              </div>

              <!-- Rating Distribution -->
              <div class="space-y-3">
                <div
                  v-for="dist in service.ratingDistribution"
                  :key="dist.stars"
                  class="flex items-center gap-2"
                >
                  <span class="text-sm font-medium text-gray-700 w-12">{{ dist.stars }}★</span>
                  <div class="flex-1 bg-gray-300 rounded-full h-2 overflow-hidden">
                    <div
                      class="bg-yellow-400 h-full transition-all"
                      :style="{ width: dist.percent + '%' }"
                    ></div>
                  </div>
                  <span class="text-sm text-gray-600 w-8 text-right">{{ dist.percent }}%</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Individual Reviews -->
          <div class="lg:col-span-2 space-y-4">
            <div
              v-for="review in service.reviews"
              :key="review.id"
              class="border border-gray-200 rounded-lg p-6"
            >
              <div class="flex items-start justify-between mb-3">
                <div class="flex items-center gap-3">
                  <img
                    :src="review.avatar"
                    :alt="review.user"
                    class="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p class="font-semibold text-black">{{ review.user }}</p>
                    <p class="text-sm text-gray-500">{{ review.date }}</p>
                  </div>
                </div>
              </div>

              <!-- Stars -->
              <div class="flex gap-1 mb-3">
                <span
                  v-for="i in 5"
                  :key="i"
                  class="text-yellow-400"
                >
                  {{ i <= review.stars ? '★' : '☆' }}
                </span>
              </div>

              <!-- Review Text -->
              <p class="text-gray-700 mb-3">{{ review.text }}</p>

              <!-- Like Button -->
              <button class="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
                👍 {{ review.likes }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
