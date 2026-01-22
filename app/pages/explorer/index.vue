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

// Mock data
const categories = [
  { id: 'all', label: 'Todas as categorias', icon: '🎯' },
  { id: 'design', label: 'Design', icon: '🎨' },
  { id: 'programming', label: 'Programação', icon: '💻' },
  { id: 'marketing', label: 'Marketing', icon: '📱' },
  { id: 'writing', label: 'Redação', icon: '✍️' },
  { id: 'video', label: 'Vídeo', icon: '🎬' },
]

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

  if (selectedCategory.value !== 'all') {
    result = result.filter(gig => gig.category === selectedCategory.value)
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(gig =>
      gig.title.toLowerCase().includes(query) ||
      gig.seller.toLowerCase().includes(query)
    )
  }

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

const navigateToGig = (id: number) => {
  navigateTo(`/explorer/${id}`)
}
</script>

<template>
  <div class="explorer-page">
    <!-- Search Section -->
    <section class="explorer-search">
      <div class="max-w-7xl mx-auto">
        <h1 class="explorer-title">Explorar Serviços</h1>
        <div class="explorer-search-input-wrapper">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Buscar serviços, freelancers..."
            class="explorer-search-input"
          />
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-6 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Sidebar - Filters -->
        <div class="lg:col-span-1">
          <!-- Category Filter -->
          <div class="mb-8">
            <h3 class="explorer-filter-title">Categorias</h3>
            <div class="space-y-2">
              <button
                v-for="cat in categories"
                :key="cat.id"
                @click="selectedCategory = cat.id; currentPage = 1"
                class="explorer-category-btn"
                :class="{ active: selectedCategory === cat.id }"
              >
                <span class="mr-2">{{ cat.icon }}</span>
                {{ cat.label }}
              </button>
            </div>
          </div>

          <!-- Sort Filter -->
          <div>
            <h3 class="explorer-filter-title">Ordenar por</h3>
            <select
              v-model="sortBy"
              class="explorer-select"
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
          <div class="mb-6">
            <p class="explorer-result-count">
              Exibindo <span class="font-semibold">{{ filteredGigs.length }}</span> resultado(s)
            </p>
          </div>

          <!-- Empty State -->
          <div v-if="filteredGigs.length === 0" class="explorer-empty-state">
            <p>Nenhum serviço encontrado</p>
          </div>

          <!-- Gigs Grid -->
          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div
              v-for="gig in paginatedGigs"
              :key="gig.id"
              @click="navigateToGig(gig.id)"
              class="explorer-gig-card"
            >
              <!-- Image -->
              <div class="explorer-gig-image">
                <img
                  :src="gig.image"
                  :alt="gig.title"
                  class="w-full h-full object-cover"
                />
                <span class="explorer-gig-tag">{{ gig.tag }}</span>
              </div>

              <!-- Content -->
              <div class="explorer-gig-content">
                <!-- Seller Info -->
                <div class="explorer-gig-seller">
                  <img
                    :src="gig.avatar"
                    :alt="gig.seller"
                    class="w-8 h-8 rounded-full object-cover"
                  />
                  <p class="explorer-gig-seller-name">{{ gig.seller }}</p>
                </div>

                <!-- Title -->
                <h3 class="explorer-gig-title">{{ gig.title }}</h3>

                <!-- Rating -->
                <div class="explorer-gig-rating">
                  <span class="explorer-gig-star">★</span>
                  <span class="explorer-gig-rating-value">{{ gig.rating }}</span>
                  <span class="explorer-gig-reviews">({{ gig.reviews }})</span>
                </div>

                <!-- Price -->
                <div class="explorer-gig-price-wrapper">
                  <p class="explorer-gig-price">R$ {{ gig.price.toLocaleString('pt-BR') }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Pagination -->
          <div v-if="totalPages > 1" class="explorer-pagination">
            <UButton
              @click="currentPage = Math.max(1, currentPage - 1)"
              :disabled="currentPage === 1"
              variant="soft"
            >
              Anterior
            </UButton>

            <div class="explorer-pagination-pages">
              <button
                v-for="page in totalPages"
                :key="page"
                @click="currentPage = page"
                class="explorer-pagination-btn"
                :class="{ active: currentPage === page }"
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

<style scoped>
.explorer-page {
  min-height: 100vh;
  background-color: var(--ui-bg);
}

.explorer-search {
  background-color: var(--ui-bg-muted);
  padding: var(--space-7) var(--space-6);
}

.explorer-title {
  font-size: var(--text-3xl);
  font-weight: var(--font-bold);
  color: var(--ui-text);
  margin-bottom: var(--space-6);
}

.explorer-search-input-wrapper {
  display: flex;
  gap: var(--space-4);
  align-items: center;
}

.explorer-search-input {
  flex: 1;
  padding: var(--space-3) var(--space-4);
  border: 1px solid var(--ui-border);
  border-radius: var(--radius-lg);
  background-color: var(--ui-bg-elevated);
  color: var(--ui-text);
  font-size: var(--text-md);
}

.explorer-search-input::placeholder {
  color: var(--ui-text-muted);
}

.explorer-search-input:focus {
  outline: none;
  border-color: var(--ui-ring);
  box-shadow: 0 0 0 2px var(--primary-100);
}

.explorer-filter-title {
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
  color: var(--ui-text);
  margin-bottom: var(--space-4);
}

.explorer-category-btn {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-lg);
  text-align: left;
  font-weight: var(--font-medium);
  font-size: var(--text-sm);
  transition: all 0.2s ease;
  background-color: var(--ui-bg-muted);
  color: var(--ui-text);
  border: none;
  cursor: pointer;
}

.explorer-category-btn:hover {
  background-color: var(--ui-bg-muted);
}

.explorer-category-btn.active {
  background-color: var(--primary-500);
  color: var(--darkblue-800);
}

.explorer-select {
  width: 100%;
  padding: var(--space-2) var(--space-4);
  border: 1px solid var(--ui-border);
  border-radius: var(--radius-lg);
  background-color: var(--ui-bg-elevated);
  color: var(--ui-text);
  font-size: var(--text-sm);
}

.explorer-select:focus {
  outline: none;
  border-color: var(--ui-ring);
}

.explorer-result-count {
  color: var(--ui-text-muted);
  font-size: var(--text-sm);
}

.explorer-empty-state {
  text-align: center;
  padding: var(--space-9);
  color: var(--ui-text-muted);
  font-size: var(--text-lg);
}

.explorer-gig-card {
  cursor: pointer;
  overflow: hidden;
  border: 1px solid var(--ui-border);
  border-radius: var(--radius-lg);
  background-color: var(--ui-bg-elevated);
  transition: all 0.2s ease;
}

.explorer-gig-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.explorer-gig-image {
  position: relative;
  overflow: hidden;
  height: 12rem;
  background-color: var(--offwhite-200);
}

.explorer-gig-image img {
  transition: transform 0.3s ease;
}

.explorer-gig-card:hover .explorer-gig-image img {
  transform: scale(1.05);
}

.explorer-gig-tag {
  position: absolute;
  top: var(--space-3);
  right: var(--space-3);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  background-color: var(--primary-500);
  color: var(--darkblue-800);
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
}

.explorer-gig-content {
  padding: var(--space-4);
}

.explorer-gig-seller {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-3);
}

.explorer-gig-seller-name {
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--ui-text);
}

.explorer-gig-title {
  font-size: var(--text-md);
  font-weight: var(--font-semibold);
  color: var(--ui-text);
  margin-bottom: var(--space-3);
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.explorer-gig-rating {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  margin-bottom: var(--space-3);
}

.explorer-gig-star {
  color: var(--secondary-500);
}

.explorer-gig-rating-value {
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--ui-text);
}

.explorer-gig-reviews {
  font-size: var(--text-sm);
  color: var(--ui-text-muted);
}

.explorer-gig-price-wrapper {
  border-top: 1px solid var(--ui-border);
  padding-top: var(--space-3);
}

.explorer-gig-price {
  font-size: 1.25rem;
  font-weight: var(--font-bold);
  color: var(--primary-500);
}

.explorer-pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--space-2);
}

.explorer-pagination-pages {
  display: flex;
  gap: var(--space-1);
}

.explorer-pagination-btn {
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-md);
  background-color: var(--ui-bg-muted);
  color: var(--ui-text);
  font-weight: var(--font-medium);
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.explorer-pagination-btn:hover {
  background-color: var(--offwhite-300);
}

.explorer-pagination-btn.active {
  background-color: var(--primary-500);
  color: var(--darkblue-800);
}
</style>
