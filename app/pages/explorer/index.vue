<script setup lang="ts">
import { ref, computed } from 'vue'

definePageMeta({
  layout: 'DefaultLayout',
})

// State
const searchQuery = ref('')
const selectedCategory = ref('all')
const sortBy = ref('relevance')
const currentPage = ref(1)
const itemsPerPage = 12

// Mock data - replace with API calls later
const categories = [
  { id: 'all', label: 'Todas as categorias', icon: '🎯' },
  { id: 'design', label: 'Design', icon: '🎨' },
  { id: 'programming', label: 'Programação', icon: '💻' },
  { id: 'marketing', label: 'Marketing', icon: '📱' },
  { id: 'writing', label: 'Redação', icon: '✍️' },
  { id: 'video', label: 'Vídeo', icon: '🎬' },
]

// Mock gigs data
const allGigs = [
  {
    id: 1,
    title: 'Logo Design Profissional',
    seller: 'Sophia Carter',
    avatar: 'https://i.pravatar.cc/100?u=sophia-carter',
    image: 'https://picsum.photos/300/200?random=1',
    price: 1200,
    rating: 4.9,
    reviews: 120,
    category: 'design',
    tag: 'Design'
  },
  {
    id: 2,
    title: 'Desenvolvimento Web React',
    seller: 'João Silva',
    avatar: 'https://i.pravatar.cc/100?u=joao-silva',
    image: 'https://picsum.photos/300/200?random=2',
    price: 5000,
    rating: 4.8,
    reviews: 87,
    category: 'programming',
    tag: 'Desenvolvimento'
  },
  {
    id: 3,
    title: 'Sessão Fotográfica Profissional',
    seller: 'Maria Santos',
    avatar: 'https://i.pravatar.cc/100?u=maria-santos',
    image: 'https://picsum.photos/300/200?random=3',
    price: 800,
    rating: 4.7,
    reviews: 56,
    category: 'video',
    tag: 'Fotografia'
  },
  {
    id: 4,
    title: 'Redação de Conteúdo SEO',
    seller: 'Carlos Mendes',
    avatar: 'https://i.pravatar.cc/100?u=carlos-mendes',
    image: 'https://picsum.photos/300/200?random=4',
    price: 500,
    rating: 4.6,
    reviews: 112,
    category: 'writing',
    tag: 'Conteúdo'
  },
  {
    id: 5,
    title: 'Social Media Marketing',
    seller: 'Ana Costa',
    avatar: 'https://i.pravatar.cc/100?u=ana-costa',
    image: 'https://picsum.photos/300/200?random=5',
    price: 3000,
    rating: 4.9,
    reviews: 95,
    category: 'marketing',
    tag: 'Marketing'
  },
  {
    id: 6,
    title: 'Branding Completo',
    seller: 'Sophia Carter',
    avatar: 'https://i.pravatar.cc/100?u=sophia-carter',
    image: 'https://picsum.photos/300/200?random=6',
    price: 10000,
    rating: 5.0,
    reviews: 42,
    category: 'design',
    tag: 'Branding'
  },
  {
    id: 7,
    title: 'Consultoria de Marketing Digital',
    seller: 'Pedro Oliveira',
    avatar: 'https://i.pravatar.cc/100?u=pedro-oliveira',
    image: 'https://picsum.photos/300/200?random=7',
    price: 2500,
    rating: 4.8,
    reviews: 78,
    category: 'marketing',
    tag: 'Consultoria'
  },
  {
    id: 8,
    title: 'Edição de Vídeo Profissional',
    seller: 'Lucas Ferreira',
    avatar: 'https://i.pravatar.cc/100?u=lucas-ferreira',
    image: 'https://picsum.photos/300/200?random=8',
    price: 2000,
    rating: 4.7,
    reviews: 64,
    category: 'video',
    tag: 'Edição'
  },
  {
    id: 9,
    title: 'Desenvolvimento App Mobile',
    seller: 'João Silva',
    avatar: 'https://i.pravatar.cc/100?u=joao-silva',
    image: 'https://picsum.photos/300/200?random=9',
    price: 8000,
    rating: 4.9,
    reviews: 53,
    category: 'programming',
    tag: 'Mobile'
  },
]

// Computed properties
const filteredGigs = computed(() => {
  let result = allGigs

  // Filter by category
  if (selectedCategory.value !== 'all') {
    result = result.filter(gig => gig.category === selectedCategory.value)
  }

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(gig =>
      gig.title.toLowerCase().includes(query) ||
      gig.seller.toLowerCase().includes(query)
    )
  }

  // Sort
  if (sortBy.value === 'price-low') {
    result.sort((a, b) => a.price - b.price)
  } else if (sortBy.value === 'price-high') {
    result.sort((a, b) => b.price - a.price)
  } else if (sortBy.value === 'rating') {
    result.sort((a, b) => b.rating - a.rating)
  }

  return result
})

const paginatedGigs = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredGigs.value.slice(start, start + itemsPerPage)
})

const totalPages = computed(() => {
  return Math.ceil(filteredGigs.value.length / itemsPerPage)
})

// Methods
const navigateToGig = (id: number) => {
  navigateTo(`/explorer/${id}`)
}
</script>

<template>
  <div class="min-h-screen bg-white">
    <!-- Search Section -->
    <div class="bg-gray-50 py-8 px-6">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-3xl font-bold text-black mb-6">Explorar Serviços</h1>
        <div class="flex gap-4 items-center">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Buscar serviços, freelancers..."
            class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-dourado)]"
          />
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-6 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Sidebar - Filters -->
        <div class="lg:col-span-1">
          <!-- Category Filter -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-black">Categorias</h3>
            <div class="space-y-2">
              <button
                v-for="cat in categories"
                :key="cat.id"
                @click="selectedCategory = cat.id; currentPage = 1"
                :class="[
                  'w-full px-4 py-3 rounded-lg text-left font-medium transition-colors',
                  selectedCategory === cat.id
                    ? 'bg-[var(--color-dourado)] text-white'
                    : 'bg-gray-100 text-black hover:bg-gray-200'
                ]"
              >
                <span class="mr-2">{{ cat.icon }}</span>
                {{ cat.label }}
              </button>
            </div>
          </div>

          <!-- Sort Filter -->
          <div class="mt-8 space-y-4">
            <h3 class="text-lg font-semibold text-black">Ordenar por</h3>
            <select
              v-model="sortBy"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-dourado)]"
            >
              <option value="relevance">Relevância</option>
              <option value="rating">Melhor avaliado</option>
              <option value="price-low">Preço: Menor para Maior</option>
              <option value="price-high">Preço: Maior para Menor</option>
            </select>
          </div>
        </div>

        <!-- Main Content - Gigs Grid -->
        <div class="lg:col-span-3">
          <div class="mb-6 flex justify-between items-center">
            <p class="text-gray-600">
              Exibindo
              <span class="font-semibold">{{ filteredGigs.length }}</span>
              resultado(s)
            </p>
          </div>

          <!-- Empty State -->
          <div v-if="filteredGigs.length === 0" class="text-center py-12">
            <p class="text-gray-500 text-lg">Nenhum serviço encontrado</p>
          </div>

          <!-- Gigs Grid -->
          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div
              v-for="gig in paginatedGigs"
              :key="gig.id"
              @click="navigateToGig(gig.id)"
              class="cursor-pointer group overflow-hidden rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <!-- Image -->
              <div class="relative overflow-hidden h-48 bg-gray-200">
                <img
                  :src="gig.image"
                  :alt="gig.title"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <span class="absolute top-3 right-3 bg-[var(--color-dourado)] text-white px-3 py-1 rounded-full text-xs font-medium">
                  {{ gig.tag }}
                </span>
              </div>

              <!-- Content -->
              <div class="p-4">
                <!-- Seller Info -->
                <div class="flex items-center gap-3 mb-3">
                  <img
                    :src="gig.avatar"
                    :alt="gig.seller"
                    class="w-8 h-8 rounded-full object-cover"
                  />
                  <p class="text-sm font-medium text-gray-700">{{ gig.seller }}</p>
                </div>

                <!-- Title -->
                <h3 class="font-semibold text-black mb-3 line-clamp-2">
                  {{ gig.title }}
                </h3>

                <!-- Rating -->
                <div class="flex items-center gap-1 mb-3">
                  <span class="text-yellow-500">★</span>
                  <span class="text-sm font-medium text-gray-700">{{ gig.rating }}</span>
                  <span class="text-sm text-gray-500">({{ gig.reviews }})</span>
                </div>

                <!-- Price -->
                <div class="border-t border-gray-200 pt-3">
                  <p class="text-xl font-bold text-[var(--color-dourado)]">
                    R$ {{ gig.price.toLocaleString('pt-BR') }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Pagination -->
          <div v-if="totalPages > 1" class="flex justify-center items-center gap-2">
            <UButton
              @click="currentPage = Math.max(1, currentPage - 1)"
              :disabled="currentPage === 1"
              variant="soft"
            >
              Anterior
            </UButton>

            <div class="flex gap-1">
              <button
                v-for="page in totalPages"
                :key="page"
                @click="currentPage = page"
                :class="[
                  'px-3 py-2 rounded transition-colors',
                  currentPage === page
                    ? 'bg-[var(--color-dourado)] text-white'
                    : 'bg-gray-200 text-black hover:bg-gray-300'
                ]"
              >
                {{ page }}
              </button>
            </div>

            <UButton
              @click="currentPage = Math.min(totalPages, currentPage + 1)"
              :disabled="currentPage === totalPages"
              variant="soft"
            >
              Próxima
            </UButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
