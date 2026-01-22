<script setup lang="ts">
import { ref, computed } from 'vue'

definePageMeta({
  layout: 'DefaultLayout',
})

const filterRating = ref(0)
const sortBy = ref('recent')

// Mock reviews data
const reviews = ref([
  {
    id: 1,
    orderId: 'ORD-001',
    buyerName: 'Ethan Bennett',
    buyerImage: 'https://i.pravatar.cc/50?img=3',
    packageName: 'Logo Design Profissional',
    rating: 5,
    date: '2024-01-22',
    text: 'O design do logotipo da Sophia superou minhas expectativas. Capturou perfeitamente a visão da minha marca.',
    helpful: 12,
    gig: 'Logo Designer'
  },
  {
    id: 2,
    orderId: 'ORD-002',
    buyerName: 'Olívia Hayes',
    buyerImage: 'https://i.pravatar.cc/50?img=5',
    packageName: 'Branding Kit Completo',
    rating: 5,
    date: '2024-01-20',
    text: 'Trabalhar com a Sophia foi um prazer. Ela foi ágil, criativa e criou um logotipo que realmente representa a identidade da minha marca.',
    helpful: 8,
    gig: 'Branding Kit'
  },
  {
    id: 3,
    orderId: 'ORD-003',
    buyerName: 'James Wilson',
    buyerImage: 'https://i.pravatar.cc/50?img=7',
    packageName: 'Logo Design Profissional',
    rating: 4,
    date: '2024-01-15',
    text: 'Ótimo trabalho! O design é moderno e profissional. Apenas precisei de uma pequena revisão.',
    helpful: 5,
    gig: 'Logo Designer'
  },
  {
    id: 4,
    orderId: 'ORD-004',
    buyerName: 'Sarah Johnson',
    buyerImage: 'https://i.pravatar.cc/50?img=9',
    packageName: 'Social Media Templates',
    rating: 4,
    date: '2024-01-10',
    text: 'Os templates são bem feitos e muito úteis. Gostaria de mais variações de cores.',
    helpful: 3,
    gig: 'Social Media Templates'
  },
  {
    id: 5,
    orderId: 'ORD-005',
    buyerName: 'Michael Chen',
    buyerImage: 'https://i.pravatar.cc/50?img=11',
    packageName: 'Logo Design Profissional',
    rating: 3,
    date: '2024-01-05',
    text: 'Bom trabalho, mas o tempo de entrega foi um pouco além do previsto.',
    helpful: 2,
    gig: 'Logo Designer'
  }
])

const filteredReviews = computed(() => {
  let result = reviews.value

  // Filter by rating
  if (filterRating.value > 0) {
    result = result.filter(r => r.rating === filterRating.value)
  }

  // Sort
  if (sortBy.value === 'helpful') {
    result.sort((a, b) => b.helpful - a.helpful)
  } else if (sortBy.value === 'lowest-rating') {
    result.sort((a, b) => a.rating - b.rating)
  } else {
    result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }

  return result
})

const averageRating = computed(() => {
  if (reviews.value.length === 0) return 0
  const total = reviews.value.reduce((sum, r) => sum + r.rating, 0)
  return (total / reviews.value.length).toFixed(1)
})

const ratingDistribution = computed(() => {
  return [5, 4, 3, 2, 1].map(stars => ({
    stars,
    count: reviews.value.filter(r => r.rating === stars).length,
    percent: Math.round((reviews.value.filter(r => r.rating === stars).length / reviews.value.length) * 100)
  }))
})

const respondToReview = (reviewId: number) => {
  alert(`Responder à avaliação #${reviewId}`)
}
</script>

<template>
  <div class="min-h-screen bg-white">
    <div class="max-w-7xl mx-auto px-6 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-black">Avaliações Recebidas</h1>
        <p class="text-gray-600 mt-2">Gerencie as avaliações dos seus clientes</p>
      </div>

      <!-- Rating Summary -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <!-- Overall Rating -->
        <div class="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-lg p-6 border border-yellow-200">
          <p class="text-gray-600 text-sm mb-2">Avaliação Geral</p>
          <div class="flex items-baseline gap-2">
            <p class="text-4xl font-bold text-[var(--color-dourado)]">{{ averageRating }}</p>
            <div class="flex text-yellow-400">
              <span v-for="i in 5" :key="i">
                {{ i <= Math.round(Number(averageRating)) ? '★' : '☆' }}
              </span>
            </div>
          </div>
          <p class="text-sm text-gray-600 mt-2">Baseado em {{ reviews.length }} avaliações</p>
        </div>

        <!-- Total Reviews -->
        <div class="bg-blue-50 rounded-lg p-6 border border-blue-200">
          <p class="text-gray-600 text-sm mb-2">Total de Avaliações</p>
          <p class="text-4xl font-bold text-blue-600">{{ reviews.length }}</p>
          <p class="text-sm text-gray-600 mt-2">De clientes satisfeitos</p>
        </div>

        <!-- Positive Rating Percentage -->
        <div class="bg-green-50 rounded-lg p-6 border border-green-200">
          <p class="text-gray-600 text-sm mb-2">Avaliações Positivas</p>
          <p class="text-4xl font-bold text-green-600">
            {{ Math.round((reviews.filter(r => r.rating >= 4).length / reviews.length) * 100) }}%
          </p>
          <p class="text-sm text-gray-600 mt-2">4 ou 5 estrelas</p>
        </div>
      </div>

      <!-- Rating Distribution -->
      <div class="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-black mb-6">Distribuição de Avaliações</h3>
        <div class="space-y-4">
          <div
            v-for="dist in ratingDistribution"
            :key="dist.stars"
            class="flex items-center gap-4"
          >
            <div class="w-12 text-right">
              <span class="font-medium text-gray-700">{{ dist.stars }}★</span>
            </div>
            <div class="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                class="bg-yellow-400 h-full"
                :style="{ width: dist.percent + '%' }"
              ></div>
            </div>
            <div class="w-20 text-right">
              <span class="text-sm text-gray-600">{{ dist.count }} ({{ dist.percent }}%)</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Filters -->
      <div class="bg-gray-50 rounded-lg p-6 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Filtrar por Avaliação</label>
            <select
              v-model.number="filterRating"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-dourado)]"
            >
              <option value="0">Todas as avaliações</option>
              <option value="5">5 Estrelas</option>
              <option value="4">4 Estrelas</option>
              <option value="3">3 Estrelas</option>
              <option value="2">2 Estrelas</option>
              <option value="1">1 Estrela</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Ordenar por</label>
            <select
              v-model="sortBy"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-dourado)]"
            >
              <option value="recent">Mais Recentes</option>
              <option value="helpful">Mais Úteis</option>
              <option value="lowest-rating">Menor Avaliação</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Reviews List -->
      <div class="space-y-4">
        <div v-if="filteredReviews.length === 0" class="text-center py-12">
          <p class="text-gray-500 text-lg">Nenhuma avaliação encontrada</p>
        </div>

        <div
          v-for="review in filteredReviews"
          :key="review.id"
          class="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
        >
          <div class="flex items-start justify-between mb-4">
            <div class="flex items-center gap-4">
              <img
                :src="review.buyerImage"
                :alt="review.buyerName"
                class="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h3 class="font-semibold text-black">{{ review.buyerName }}</h3>
                <p class="text-sm text-gray-500">{{ new Date(review.date).toLocaleDateString('pt-BR') }}</p>
              </div>
            </div>
            <div class="flex gap-1">
              <span v-for="i in 5" :key="i" class="text-yellow-400">
                {{ i <= review.rating ? '★' : '☆' }}
              </span>
            </div>
          </div>

          <!-- Gig Info -->
          <div class="mb-3">
            <span class="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
              {{ review.gig }}
            </span>
          </div>

          <!-- Review Text -->
          <p class="text-gray-700 mb-4">{{ review.text }}</p>

          <!-- Helpful & Actions -->
          <div class="flex items-center justify-between text-sm">
            <div class="flex items-center gap-4 text-gray-500">
              <button class="hover:text-gray-700 flex items-center gap-1">
                👍 {{ review.helpful }}
              </button>
            </div>
            <div class="flex gap-3">
              <UButton
                size="sm"
                variant="soft"
                @click="respondToReview(review.id)"
              >
                Responder
              </UButton>
              <UButton
                size="sm"
                variant="ghost"
              >
                Mais Ações
              </UButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
