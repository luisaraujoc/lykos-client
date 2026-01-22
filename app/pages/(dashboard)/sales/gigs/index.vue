<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
  layout: 'DefaultLayout',
})

// Mock seller gigs data
const gigs = ref([
  {
    id: 1,
    title: 'Logo Design Profissional',
    category: 'Design',
    image: 'https://picsum.photos/300/200?random=1',
    price: 1200,
    ordersActive: 5,
    totalOrders: 128,
    rating: 4.9,
    reviews: 120,
    status: 'active',
    createdDate: '2023-01-15'
  },
  {
    id: 2,
    title: 'Branding Completo',
    category: 'Design',
    image: 'https://picsum.photos/300/200?random=2',
    price: 10000,
    ordersActive: 2,
    totalOrders: 42,
    rating: 5.0,
    reviews: 42,
    status: 'active',
    createdDate: '2023-02-20'
  },
  {
    id: 3,
    title: 'Banner Design',
    category: 'Design',
    image: 'https://picsum.photos/300/200?random=3',
    price: 500,
    ordersActive: 0,
    totalOrders: 15,
    rating: 4.7,
    reviews: 15,
    status: 'paused',
    createdDate: '2023-03-10'
  },
  {
    id: 4,
    title: 'Social Media Templates',
    category: 'Design',
    image: 'https://picsum.photos/300/200?random=4',
    price: 300,
    ordersActive: 8,
    totalOrders: 156,
    rating: 4.8,
    reviews: 95,
    status: 'active',
    createdDate: '2023-04-05'
  }
])

const filterStatus = ref('all')

const filteredGigs = computed(() => {
  if (filterStatus.value === 'all') return gigs.value
  return gigs.value.filter(gig => gig.status === filterStatus.value)
})

const editGig = (id: number) => {
  navigateTo(`/dashboard/sales/gigs/${id}/edit`)
}

const deleteGig = (id: number) => {
  // Handle delete
  const index = gigs.value.findIndex(g => g.id === id)
  if (index !== -1) {
    gigs.value.splice(index, 1)
  }
}

const toggleStatus = (id: number) => {
  const gig = gigs.value.find(g => g.id === id)
  if (gig) {
    gig.status = gig.status === 'active' ? 'paused' : 'active'
  }
}
</script>

<template>
  <div class="min-h-screen bg-white">
    <div class="max-w-7xl mx-auto px-6 py-8">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-black">Meus Serviços</h1>
          <p class="text-gray-600 mt-2">Gerencie seus serviços e acompanhe os pedidos</p>
        </div>
        <UButton
          class="bg-[var(--color-dourado)] text-white font-semibold"
          @click="navigateTo('/dashboard/sales/gigs/create')"
        >
          + Criar Novo Serviço
        </UButton>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-blue-50 rounded-lg p-6 border border-blue-200">
          <p class="text-gray-600 text-sm mb-2">Serviços Ativos</p>
          <p class="text-3xl font-bold text-blue-600">
            {{ gigs.filter(g => g.status === 'active').length }}
          </p>
        </div>
        <div class="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
          <p class="text-gray-600 text-sm mb-2">Pedidos Ativos</p>
          <p class="text-3xl font-bold text-yellow-600">
            {{ gigs.reduce((sum, g) => sum + g.ordersActive, 0) }}
          </p>
        </div>
        <div class="bg-green-50 rounded-lg p-6 border border-green-200">
          <p class="text-gray-600 text-sm mb-2">Total de Pedidos</p>
          <p class="text-3xl font-bold text-green-600">
            {{ gigs.reduce((sum, g) => sum + g.totalOrders, 0) }}
          </p>
        </div>
        <div class="bg-purple-50 rounded-lg p-6 border border-purple-200">
          <p class="text-gray-600 text-sm mb-2">Avaliação Média</p>
          <p class="text-3xl font-bold text-purple-600">
            {{ (gigs.reduce((sum, g) => sum + g.rating, 0) / gigs.length).toFixed(1) }}
          </p>
        </div>
      </div>

      <!-- Filter Tabs -->
      <div class="flex gap-3 mb-6">
        <button
          v-for="status in ['all', 'active', 'paused']"
          :key="status"
          @click="filterStatus = status"
          :class="[
            'px-4 py-2 rounded-lg font-medium transition-colors',
            filterStatus === status
              ? 'bg-[var(--color-dourado)] text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          ]"
        >
          {{ status === 'all' ? 'Todos' : status === 'active' ? 'Ativos' : 'Pausados' }}
        </button>
      </div>

      <!-- Gigs Table -->
      <div class="space-y-4">
        <div
          v-for="gig in filteredGigs"
          :key="gig.id"
          class="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
        >
          <div class="flex gap-6">
            <!-- Thumbnail -->
            <div class="w-32 h-24 flex-shrink-0">
              <img
                :src="gig.image"
                :alt="gig.title"
                class="w-full h-full object-cover rounded-lg"
              />
            </div>

            <!-- Info -->
            <div class="flex-1">
              <div class="flex items-start justify-between mb-2">
                <div>
                  <h3 class="text-lg font-semibold text-black">{{ gig.title }}</h3>
                  <p class="text-sm text-gray-500">{{ gig.category }}</p>
                </div>
                <span
                  :class="[
                    'px-3 py-1 rounded-full text-sm font-medium',
                    gig.status === 'active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  ]"
                >
                  {{ gig.status === 'active' ? 'Ativo' : 'Pausado' }}
                </span>
              </div>

              <!-- Stats -->
              <div class="grid grid-cols-4 gap-4 my-4">
                <div>
                  <p class="text-xs text-gray-500 mb-1">Pedidos Ativos</p>
                  <p class="text-lg font-semibold text-black">{{ gig.ordersActive }}</p>
                </div>
                <div>
                  <p class="text-xs text-gray-500 mb-1">Total de Pedidos</p>
                  <p class="text-lg font-semibold text-black">{{ gig.totalOrders }}</p>
                </div>
                <div>
                  <p class="text-xs text-gray-500 mb-1">Avaliação</p>
                  <div class="flex items-center gap-1">
                    <span class="text-yellow-500">★</span>
                    <p class="text-lg font-semibold text-black">{{ gig.rating }}</p>
                  </div>
                </div>
                <div>
                  <p class="text-xs text-gray-500 mb-1">Preço Base</p>
                  <p class="text-lg font-semibold text-[var(--color-dourado)]">
                    R$ {{ gig.price.toLocaleString('pt-BR') }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex-shrink-0 flex flex-col gap-2">
              <UButton
                size="sm"
                @click="editGig(gig.id)"
                variant="soft"
              >
                Editar
              </UButton>
              <UButton
                size="sm"
                :color="gig.status === 'active' ? 'yellow' : 'green'"
                @click="toggleStatus(gig.id)"
              >
                {{ gig.status === 'active' ? 'Pausar' : 'Ativar' }}
              </UButton>
              <UButton
                size="sm"
                color="red"
                @click="deleteGig(gig.id)"
              >
                Deletar
              </UButton>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="filteredGigs.length === 0" class="text-center py-12">
          <p class="text-gray-500 text-lg mb-4">Nenhum serviço encontrado</p>
          <UButton
            class="bg-[var(--color-dourado)] text-white"
            @click="navigateTo('/dashboard/sales/gigs/create')"
          >
            Criar Seu Primeiro Serviço
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>
