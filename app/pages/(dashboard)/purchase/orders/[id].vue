<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
  layout: 'DefaultLayout',
})

const route = useRoute()
const orderId = route.params.id

const order = ref({
  id: 'ORD-001',
  packageName: 'Logo Design Profissional',
  sellerName: 'Sophia Carter',
  sellerImage: 'https://i.pravatar.cc/100?u=sophia-carter',
  image: 'https://picsum.photos/300/200?random=1',
  price: 1200,
  orderDate: '2024-01-15',
  deliveryDate: '2024-01-22',
  description: 'Este pacote foca no essencial para quem precisa de um logo profissional sem muitas complexidades.',
  status: 'completed',
  deliveryFile: 'logo-design-final.zip',
  rating: 5,
  features: [
    '1 a 2 conceitos de logo iniciais',
    'Entrega de arquivos em alta resolução',
    'Revisões ilimitadas'
  ],
  timeline: [
    {
      date: '2024-01-15',
      title: 'Pedido Confirmado',
      description: 'Seu pedido foi confirmado e o freelancer iniciou o trabalho',
      completed: true
    },
    {
      date: '2024-01-18',
      title: 'Em Desenvolvimento',
      description: 'O freelancer está trabalhando no seu projeto',
      completed: true
    },
    {
      date: '2024-01-22',
      title: 'Entregue',
      description: 'O projeto foi entregue com sucesso',
      completed: true
    },
    {
      date: '2024-01-22',
      title: 'Aprovado',
      description: 'Você aprovou a entrega',
      completed: true
    }
  ],
  messages: [
    {
      id: 1,
      sender: 'Sophia Carter',
      senderImage: 'https://i.pravatar.cc/100?u=sophia-carter',
      date: '2024-01-15',
      message: 'Olá! Recebi seu pedido e vou começar a trabalhar no logo agora.',
      isOwner: false
    },
    {
      id: 2,
      sender: 'Você',
      senderImage: 'https://i.pravatar.cc/100?u=buyer',
      date: '2024-01-15',
      message: 'Ótimo! Mal posso esperar para ver os conceitos.',
      isOwner: true
    },
    {
      id: 3,
      sender: 'Sophia Carter',
      senderImage: 'https://i.pravatar.cc/100?u=sophia-carter',
      date: '2024-01-20',
      message: 'Aqui estão os primeiros conceitos. Gostaria que você desse uma olhada!',
      isOwner: false
    }
  ]
})

const userMessage = ref('')
const userRating = ref(5)
const ratingSubmitted = ref(false)

const sendMessage = () => {
  if (userMessage.value.trim()) {
    order.value.messages.push({
      id: order.value.messages.length + 1,
      sender: 'Você',
      senderImage: 'https://i.pravatar.cc/100?u=buyer',
      date: new Date().toLocaleDateString('pt-BR'),
      message: userMessage.value,
      isOwner: true
    })
    userMessage.value = ''
  }
}

const submitRating = () => {
  if (!ratingSubmitted.value) {
    order.value.rating = userRating.value
    ratingSubmitted.value = true
  }
}

const downloadFile = () => {
  alert(`Baixando ${order.value.deliveryFile}`)
}
</script>

<template>
  <div class="min-h-screen bg-white">
    <div class="max-w-6xl mx-auto px-6 py-8">
      <!-- Back Button -->
      <NuxtLink to="/dashboard/purchase/orders" class="text-[var(--color-dourado)] font-medium mb-6 inline-flex items-center gap-2">
        ← Voltar para Pedidos
      </NuxtLink>

      <!-- Order Header -->
      <div class="bg-gray-50 rounded-lg p-6 mb-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div class="lg:col-span-2">
            <div class="flex gap-6">
              <img
                :src="order.image"
                :alt="order.packageName"
                class="w-24 h-24 rounded-lg object-cover"
              />
              <div>
                <p class="text-sm text-gray-500 mb-1">{{ order.id }}</p>
                <h1 class="text-2xl font-bold text-black mb-2">{{ order.packageName }}</h1>
                <div class="flex items-center gap-3">
                  <img
                    :src="order.sellerImage"
                    :alt="order.sellerName"
                    class="w-8 h-8 rounded-full object-cover"
                  />
                  <span class="text-gray-700">{{ order.sellerName }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="text-right">
            <p class="text-gray-600 text-sm mb-2">Valor do Pedido</p>
            <p class="text-3xl font-bold text-[var(--color-dourado)]">
              R$ {{ order.price.toLocaleString('pt-BR') }}
            </p>
            <p class="text-sm text-gray-500 mt-2">Ordem #{{ order.id }}</p>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Order Timeline -->
          <div class="bg-white border border-gray-200 rounded-lg p-6">
            <h2 class="text-xl font-semibold text-black mb-6">Status do Pedido</h2>
            <div class="space-y-6">
              <div
                v-for="(step, idx) in order.timeline"
                :key="idx"
                class="flex gap-6"
              >
                <!-- Timeline Dot -->
                <div class="flex flex-col items-center">
                  <div
                    :class="[
                      'w-8 h-8 rounded-full flex items-center justify-center text-white font-bold',
                      step.completed
                        ? 'bg-green-500'
                        : 'bg-gray-300'
                    ]"
                  >
                    ✓
                  </div>
                  <div
                    v-if="idx < order.timeline.length - 1"
                    :class="[
                      'w-1 h-12 mt-2',
                      step.completed ? 'bg-green-500' : 'bg-gray-300'
                    ]"
                  ></div>
                </div>
                <!-- Content -->
                <div class="pb-4">
                  <p class="text-sm text-gray-500 mb-1">{{ new Date(step.date).toLocaleDateString('pt-BR') }}</p>
                  <h3 class="font-semibold text-black">{{ step.title }}</h3>
                  <p class="text-gray-600 text-sm mt-1">{{ step.description }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Delivery Section -->
          <div v-if="order.status === 'completed'" class="bg-green-50 border border-green-200 rounded-lg p-6">
            <div class="flex items-start gap-4">
              <div class="text-2xl">✓</div>
              <div class="flex-1">
                <h3 class="font-semibold text-black mb-2">Projeto Entregue</h3>
                <p class="text-gray-700 mb-4">Você aprovou a entrega em {{ new Date(order.deliveryDate).toLocaleDateString('pt-BR') }}</p>
                <button
                  @click="downloadFile"
                  class="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  ⬇️ Baixar Arquivos ({{ order.deliveryFile }})
                </button>
              </div>
            </div>
          </div>

          <!-- Rating Section -->
          <div v-if="order.status === 'completed'" class="bg-white border border-gray-200 rounded-lg p-6">
            <h3 class="font-semibold text-black mb-4">Sua Avaliação</h3>
            <div class="space-y-4">
              <div>
                <p class="text-sm text-gray-600 mb-3">Como foi sua experiência com {{ order.sellerName }}?</p>
                <div class="flex gap-2">
                  <button
                    v-for="star in 5"
                    :key="star"
                    @click="userRating = star"
                    :class="[
                      'text-3xl transition-colors',
                      star <= userRating ? 'text-yellow-400' : 'text-gray-300'
                    ]"
                  >
                    ★
                  </button>
                </div>
              </div>
              <button
                @click="submitRating"
                :disabled="ratingSubmitted"
                class="bg-[var(--color-dourado)] text-white px-4 py-2 rounded-lg hover:opacity-90 disabled:opacity-50"
              >
                {{ ratingSubmitted ? 'Avaliação Enviada' : 'Enviar Avaliação' }}
              </button>
            </div>
          </div>

          <!-- Messages Section -->
          <div class="bg-white border border-gray-200 rounded-lg p-6">
            <h3 class="font-semibold text-black mb-4">Conversa com o Freelancer</h3>

            <!-- Message List -->
            <div class="space-y-4 mb-6 max-h-96 overflow-y-auto">
              <div
                v-for="msg in order.messages"
                :key="msg.id"
                :class="[
                  'flex gap-3',
                  msg.isOwner && 'flex-row-reverse'
                ]"
              >
                <img
                  :src="msg.senderImage"
                  :alt="msg.sender"
                  class="w-8 h-8 rounded-full object-cover flex-shrink-0"
                />
                <div
                  :class="[
                    'max-w-xs rounded-lg p-3',
                    msg.isOwner
                      ? 'bg-[var(--color-dourado)] text-white'
                      : 'bg-gray-100 text-gray-800'
                  ]"
                >
                  <p class="font-medium text-sm mb-1">{{ msg.sender }}</p>
                  <p class="text-sm mb-1">{{ msg.message }}</p>
                  <p class="text-xs opacity-70">{{ msg.date }}</p>
                </div>
              </div>
            </div>

            <!-- Message Input -->
            <div class="flex gap-3">
              <input
                v-model="userMessage"
                type="text"
                placeholder="Envie uma mensagem..."
                @keyup.enter="sendMessage"
                class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-dourado)]"
              />
              <button
                @click="sendMessage"
                class="bg-[var(--color-dourado)] text-white px-6 py-2 rounded-lg hover:opacity-90"
              >
                Enviar
              </button>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="lg:col-span-1">
          <div class="sticky top-20 space-y-6">
            <!-- Order Summary -->
            <div class="bg-white border border-gray-200 rounded-lg p-6">
              <h3 class="font-semibold text-black mb-4">Resumo do Pedido</h3>
              <div class="space-y-3 text-sm">
                <div>
                  <p class="text-gray-600">Status</p>
                  <p class="font-medium text-black">
                    {{
                      order.status === 'completed' ? 'Concluído' :
                      order.status === 'in-progress' ? 'Em Progresso' :
                      'Aguardando Entrega'
                    }}
                  </p>
                </div>
                <div>
                  <p class="text-gray-600">Pedido em</p>
                  <p class="font-medium text-black">{{ new Date(order.orderDate).toLocaleDateString('pt-BR') }}</p>
                </div>
                <div>
                  <p class="text-gray-600">Entrega Prevista</p>
                  <p class="font-medium text-black">{{ new Date(order.deliveryDate).toLocaleDateString('pt-BR') }}</p>
                </div>
              </div>
            </div>

            <!-- Features -->
            <div class="bg-white border border-gray-200 rounded-lg p-6">
              <h3 class="font-semibold text-black mb-4">Serviço Contratado</h3>
              <p class="text-gray-600 text-sm mb-4">{{ order.description }}</p>
              <ul class="space-y-2">
                <li
                  v-for="(feature, idx) in order.features"
                  :key="idx"
                  class="flex gap-2 text-sm text-gray-700"
                >
                  <span class="text-[var(--color-dourado)]">✓</span>
                  {{ feature }}
                </li>
              </ul>
            </div>

            <!-- Help Card -->
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 class="font-semibold text-blue-900 mb-2">Precisa de Ajuda?</h4>
              <p class="text-sm text-blue-800 mb-4">
                Entre em contato com o freelancer através da aba de mensagens ou entre em contato com nosso suporte.
              </p>
              <button class="text-sm font-medium text-blue-600 hover:text-blue-700">
                Abrir Ticket de Suporte →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
