<script setup lang="ts">
import { ref, computed } from 'vue'

definePageMeta({
  layout: 'DefaultLayout',
})

const filterStatus = ref('all')
const searchQuery = ref('')

// Mock orders data
const orders = ref([
  {
    id: 'ORD-001',
    packageName: 'Logo Design Profissional',
    sellerName: 'Sophia Carter',
    sellerImage: 'https://i.pravatar.cc/100?u=sophia-carter',
    image: 'https://picsum.photos/300/200?random=1',
    price: 1200,
    orderDate: '2024-01-15',
    deliveryDate: '2024-01-22',
    status: 'completed',
    deliveryFile: 'logo-design-final.zip',
    rating: 5
  },
  {
    id: 'ORD-002',
    packageName: 'Branding Kit Completo',
    sellerName: 'Sophia Carter',
    sellerImage: 'https://i.pravatar.cc/100?u=sophia-carter',
    image: 'https://picsum.photos/300/200?random=2',
    price: 10000,
    orderDate: '2024-01-10',
    deliveryDate: '2024-02-10',
    status: 'in-progress',
    rating: null
  },
  {
    id: 'ORD-003',
    packageName: 'Social Media Templates',
    sellerName: 'João Silva',
    sellerImage: 'https://i.pravatar.cc/100?u=joao-silva',
    image: 'https://picsum.photos/300/200?random=3',
    price: 300,
    orderDate: '2024-01-05',
    deliveryDate: '2024-01-08',
    status: 'completed',
    deliveryFile: 'social-templates.zip',
    rating: 4
  },
  {
    id: 'ORD-004',
    packageName: 'Consultoria de Marketing',
    sellerName: 'Pedro Oliveira',
    sellerImage: 'https://i.pravatar.cc/100?u=pedro-oliveira',
    image: 'https://picsum.photos/300/200?random=4',
    price: 2500,
    orderDate: '2024-01-12',
    deliveryDate: '2024-01-15',
    status: 'awaiting-delivery',
    rating: null
  },
  {
    id: 'ORD-005',
    packageName: 'Edição de Vídeo Profissional',
    sellerName: 'Lucas Ferreira',
    sellerImage: 'https://i.pravatar.cc/100?u=lucas-ferreira',
    image: 'https://picsum.photos/300/200?random=5',
    price: 2000,
    orderDate: '2024-01-08',
    deliveryDate: '2024-01-10',
    status: 'completed',
    deliveryFile: 'video-final.mp4',
    rating: 5
  }
])

const filteredOrders = computed(() => {
  let result = orders.value

  // Filter by status
  if (filterStatus.value !== 'all') {
    result = result.filter(order => order.status === filterStatus.value)
  }

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(order =>
      order.packageName.toLowerCase().includes(query) ||
      order.sellerName.toLowerCase().includes(query) ||
      order.id.toLowerCase().includes(query)
    )
  }

  return result.sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime())
})

const getStatusBadge = (status: string) => {
  const statusMap = {
    'completed': { bg: 'bg-green-100', text: 'text-green-700', label: 'Concluído' },
    'in-progress': { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Em Progresso' },
    'awaiting-delivery': { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Aguardando Entrega' },
    'cancelled': { bg: 'bg-red-100', text: 'text-red-700', label: 'Cancelado' }
  }
  return statusMap[status] || statusMap['in-progress']
}

const navigateToOrder = (orderId: string) => {
  navigateTo(`/dashboard/purchase/orders/${orderId}`)
}
</script>

<template>
  <div class="min-h-screen bg-white">
    <div class="max-w-7xl mx-auto px-6 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-black">Meus Pedidos</h1>
        <p class="text-gray-600 mt-2">Acompanhe todos os seus serviços contratados</p>
      </div>

      <!-- Search and Filters -->
      <div class="bg-gray-50 rounded-lg p-6 mb-8">
        <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Buscar por nome do serviço, seller ou ID do pedido..."
            class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-dourado)]"
          />
        </div>

        <!-- Status Filters -->
        <div class="flex gap-3 mt-6 flex-wrap">
          <button
            v-for="status in ['all', 'completed', 'in-progress', 'awaiting-delivery']"
            :key="status"
            @click="filterStatus = status"
            :class="[
              'px-4 py-2 rounded-full font-medium transition-colors text-sm',
              filterStatus === status
                ? 'bg-[var(--color-dourado)] text-white'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
            ]"
          >
            {{
              status === 'all' ? 'Todos' :
              status === 'completed' ? 'Concluídos' :
              status === 'in-progress' ? 'Em Progresso' :
              'Aguardando Entrega'
            }}
          </button>
        </div>
      </div>

      <!-- Orders List -->
      <div class="space-y-4">
        <!-- Empty State -->
        <div v-if="filteredOrders.length === 0" class="text-center py-12">
          <p class="text-gray-500 text-lg">Nenhum pedido encontrado</p>
        </div>

        <!-- Order Cards -->
        <div
          v-for="order in filteredOrders"
          :key="order.id"
          @click="navigateToOrder(order.id)"
          class="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
        >
          <div class="flex gap-6">
            <!-- Image -->
            <div class="w-32 h-24 flex-shrink-0">
              <img
                :src="order.image"
                :alt="order.packageName"
                class="w-full h-full object-cover rounded-lg"
              />
            </div>

            <!-- Order Info -->
            <div class="flex-1">
              <div class="flex items-start justify-between mb-2">
                <div>
                  <p class="text-sm text-gray-500 mb-1">{{ order.id }}</p>
                  <h3 class="text-lg font-semibold text-black">{{ order.packageName }}</h3>
                </div>
                <span
                  :class="[
                    'px-3 py-1 rounded-full text-sm font-medium',
                    getStatusBadge(order.status).bg,
                    getStatusBadge(order.status).text
                  ]"
                >
                  {{ getStatusBadge(order.status).label }}
                </span>
              </div>

              <!-- Seller Info -->
              <div class="flex items-center gap-2 mb-3">
                <img
                  :src="order.sellerImage"
                  :alt="order.sellerName"
                  class="w-6 h-6 rounded-full object-cover"
                />
                <p class="text-sm text-gray-600">{{ order.sellerName }}</p>
              </div>

              <!-- Dates -->
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                <div>
                  <p class="text-gray-500">Pedido em</p>
                  <p class="font-medium text-black">{{ new Date(order.orderDate).toLocaleDateString('pt-BR') }}</p>
                </div>
                <div>
                  <p class="text-gray-500">Entrega em</p>
                  <p class="font-medium text-black">{{ new Date(order.deliveryDate).toLocaleDateString('pt-BR') }}</p>
                </div>
                <div v-if="order.rating" class="md:col-span-1">
                  <p class="text-gray-500">Sua avaliação</p>
                  <div class="flex items-center gap-1">
                    <span class="text-yellow-500">★</span>
                    <p class="font-medium text-black">{{ order.rating }}</p>
                  </div>
                </div>
              </div>

              <!-- Price -->
              <p class="text-lg font-bold text-[var(--color-dourado)]">
                R$ {{ order.price.toLocaleString('pt-BR') }}
              </p>
            </div>

            <!-- Action Button -->
            <div class="flex flex-col justify-center">
              <UButton
                v-if="order.status === 'completed'"
                size="sm"
                variant="soft"
              >
                Ver Detalhes
              </UButton>
              <UButton
                v-else
                size="sm"
              >
                Acompanhar
              </UButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
