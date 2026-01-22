<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
  layout: 'DefaultLayout',
})

const timeframe = ref('month')

// Mock analytics data
const stats = ref({
  revenue: {
    total: 45250.00,
    lastMonth: 38920.00,
    change: 16.2
  },
  orders: {
    active: 12,
    completed: 128,
    totalIncome: 45250,
    averageOrderValue: 353.51
  },
  profile: {
    visitors: 2543,
    clickthrough: 8.5,
    searchImpressions: 15320,
    searchClicks: 1302
  },
  response: {
    time: '< 1 hora',
    rate: 98.5,
    rateChange: 2.3
  }
})

const salesData = [
  { month: 'Jan', orders: 12, revenue: 4200 },
  { month: 'Fev', orders: 15, revenue: 5800 },
  { month: 'Mar', orders: 18, revenue: 7120 },
  { month: 'Abr', orders: 22, revenue: 8900 },
  { month: 'Mai', orders: 25, revenue: 9630 },
  { month: 'Jun', orders: 28, revenue: 9600 }
]

const topGigs = ref([
  {
    id: 1,
    name: 'Logo Design Profissional',
    image: 'https://picsum.photos/300/200?random=1',
    revenue: 15600,
    orders: 13,
    rating: 4.9
  },
  {
    id: 2,
    name: 'Branding Kit Completo',
    image: 'https://picsum.photos/300/200?random=2',
    revenue: 20000,
    orders: 2,
    rating: 5.0
  },
  {
    id: 3,
    name: 'Social Media Templates',
    image: 'https://picsum.photos/300/200?random=3',
    revenue: 4650,
    orders: 62,
    rating: 4.8
  }
])

const recentOrders = ref([
  {
    id: 'ORD-128',
    buyer: 'John Smith',
    gig: 'Logo Design Profissional',
    amount: 1200,
    date: '2024-01-22',
    status: 'completed'
  },
  {
    id: 'ORD-127',
    buyer: 'Sarah Johnson',
    gig: 'Branding Kit',
    amount: 10000,
    date: '2024-01-20',
    status: 'in-progress'
  },
  {
    id: 'ORD-126',
    buyer: 'Mike Davis',
    gig: 'Social Media Templates',
    amount: 300,
    date: '2024-01-18',
    status: 'completed'
  }
])

const getStatusBadge = (status: string) => {
  const statusMap = {
    'completed': { bg: 'bg-green-100', text: 'text-green-700', label: 'Concluído' },
    'in-progress': { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Em Progresso' }
  }
  return statusMap[status] || statusMap['in-progress']
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}
</script>

<template>
  <div class="min-h-screen bg-white">
    <div class="max-w-7xl mx-auto px-6 py-8">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-black">Analytics</h1>
          <p class="text-gray-600 mt-2">Acompanhe o desempenho dos seus serviços</p>
        </div>
        <select
          v-model="timeframe"
          class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-dourado)]"
        >
          <option value="week">Esta Semana</option>
          <option value="month">Este Mês</option>
          <option value="quarter">Este Trimestre</option>
          <option value="year">Este Ano</option>
        </select>
      </div>

      <!-- Key Metrics -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <!-- Revenue -->
        <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
          <p class="text-gray-600 text-sm mb-2">Receita Total</p>
          <p class="text-3xl font-bold text-green-600">{{ formatCurrency(stats.revenue.total) }}</p>
          <p class="text-sm text-green-700 mt-2">
            ↑ {{ stats.revenue.change }}% vs mês anterior
          </p>
        </div>

        <!-- Active Orders -->
        <div class="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-6 border border-blue-200">
          <p class="text-gray-600 text-sm mb-2">Pedidos Ativos</p>
          <p class="text-3xl font-bold text-blue-600">{{ stats.orders.active }}</p>
          <p class="text-sm text-blue-700 mt-2">{{ stats.orders.completed }} pedidos completos</p>
        </div>

        <!-- Completed Orders -->
        <div class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200">
          <p class="text-gray-600 text-sm mb-2">Valor Médio de Pedido</p>
          <p class="text-3xl font-bold text-purple-600">{{ formatCurrency(stats.orders.averageOrderValue) }}</p>
          <p class="text-sm text-purple-700 mt-2">De {{ stats.orders.completed }} pedidos</p>
        </div>

        <!-- Response Rate -->
        <div class="bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg p-6 border border-orange-200">
          <p class="text-gray-600 text-sm mb-2">Taxa de Resposta</p>
          <p class="text-3xl font-bold text-orange-600">{{ stats.response.rate }}%</p>
          <p class="text-sm text-orange-700 mt-2">
            ↑ {{ stats.response.rateChange }}% vs mês anterior
          </p>
        </div>
      </div>

      <!-- Charts Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <!-- Sales Chart -->
        <div class="bg-white border border-gray-200 rounded-lg p-6">
          <h3 class="font-semibold text-black mb-6">Receita por Mês</h3>
          <div class="space-y-4">
            <div
              v-for="data in salesData"
              :key="data.month"
              class="flex items-center gap-4"
            >
              <span class="w-8 text-sm font-medium text-gray-600">{{ data.month }}</span>
              <div class="flex-1">
                <div class="bg-gray-200 rounded-full h-8 overflow-hidden flex items-center">
                  <div
                    class="bg-gradient-to-r from-[var(--color-dourado)] to-[var(--color-laranja)] h-full"
                    :style="{ width: (data.revenue / 10000) * 100 + '%' }"
                  ></div>
                </div>
              </div>
              <span class="text-sm font-medium text-gray-700 w-20 text-right">{{ formatCurrency(data.revenue) }}</span>
            </div>
          </div>
        </div>

        <!-- Profile Views -->
        <div class="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
          <h3 class="font-semibold text-black mb-6">Atividade do Perfil</h3>
          
          <div class="space-y-4">
            <div>
              <div class="flex justify-between mb-2">
                <span class="text-sm font-medium text-gray-700">Visitantes do Perfil</span>
                <span class="text-sm font-bold text-gray-900">{{ stats.profile.visitors }}</span>
              </div>
              <div class="bg-gray-200 rounded-full h-2">
                <div class="bg-blue-500 h-full rounded-full" style="width: 65%"></div>
              </div>
            </div>

            <div>
              <div class="flex justify-between mb-2">
                <span class="text-sm font-medium text-gray-700">Impressões de Busca</span>
                <span class="text-sm font-bold text-gray-900">{{ stats.profile.searchImpressions }}</span>
              </div>
              <div class="bg-gray-200 rounded-full h-2">
                <div class="bg-green-500 h-full rounded-full" style="width: 75%"></div>
              </div>
            </div>

            <div>
              <div class="flex justify-between mb-2">
                <span class="text-sm font-medium text-gray-700">Cliques na Busca</span>
                <span class="text-sm font-bold text-gray-900">{{ stats.profile.searchClicks }}</span>
              </div>
              <div class="bg-gray-200 rounded-full h-2">
                <div class="bg-purple-500 h-full rounded-full" style="width: 45%"></div>
              </div>
            </div>

            <div>
              <div class="flex justify-between mb-2">
                <span class="text-sm font-medium text-gray-700">Taxa de Clique</span>
                <span class="text-sm font-bold text-gray-900">{{ stats.profile.clickthrough }}%</span>
              </div>
              <div class="bg-gray-200 rounded-full h-2">
                <div class="bg-orange-500 h-full rounded-full" style="width: 30%"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Top Gigs Section -->
      <div class="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <h3 class="font-semibold text-black mb-6">Serviços com Melhor Desempenho</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="gig in topGigs"
            :key="gig.id"
            class="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
          >
            <img
              :src="gig.image"
              :alt="gig.name"
              class="w-full h-40 object-cover"
            />
            <div class="p-4">
              <h4 class="font-semibold text-black mb-2">{{ gig.name }}</h4>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-600">Receita</span>
                  <span class="font-medium text-green-600">{{ formatCurrency(gig.revenue) }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Pedidos</span>
                  <span class="font-medium text-gray-900">{{ gig.orders }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Avaliação</span>
                  <span class="font-medium">
                    <span class="text-yellow-500">★</span> {{ gig.rating }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Orders -->
      <div class="bg-white border border-gray-200 rounded-lg p-6">
        <h3 class="font-semibold text-black mb-6">Pedidos Recentes</h3>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b border-gray-200">
                <th class="text-left py-3 px-4 font-medium text-gray-700 text-sm">Pedido</th>
                <th class="text-left py-3 px-4 font-medium text-gray-700 text-sm">Cliente</th>
                <th class="text-left py-3 px-4 font-medium text-gray-700 text-sm">Serviço</th>
                <th class="text-left py-3 px-4 font-medium text-gray-700 text-sm">Valor</th>
                <th class="text-left py-3 px-4 font-medium text-gray-700 text-sm">Data</th>
                <th class="text-left py-3 px-4 font-medium text-gray-700 text-sm">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order in recentOrders" :key="order.id" class="border-b border-gray-200 hover:bg-gray-50">
                <td class="py-4 px-4 text-sm font-medium text-black">{{ order.id }}</td>
                <td class="py-4 px-4 text-sm text-gray-600">{{ order.buyer }}</td>
                <td class="py-4 px-4 text-sm text-gray-600">{{ order.gig }}</td>
                <td class="py-4 px-4 text-sm font-medium text-green-600">{{ formatCurrency(order.amount) }}</td>
                <td class="py-4 px-4 text-sm text-gray-600">{{ new Date(order.date).toLocaleDateString('pt-BR') }}</td>
                <td class="py-4 px-4 text-sm">
                  <span
                    :class="[
                      'px-3 py-1 rounded-full text-xs font-medium',
                      getStatusBadge(order.status).bg,
                      getStatusBadge(order.status).text
                    ]"
                  >
                    {{ getStatusBadge(order.status).label }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
