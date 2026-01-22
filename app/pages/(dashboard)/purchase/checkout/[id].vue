<script setup lang="ts">
import { ref, reactive } from 'vue'

definePageMeta({
  layout: 'DefaultLayout',
})

const paymentMethod = ref('card')
const agreeTerms = ref(false)
const saveCard = ref(false)

// Mock package data
const orderData = reactive({
  packageName: 'Logo Designer',
  sellerName: 'Sophia Carter',
  sellerImage: 'https://i.pravatar.cc/100?u=sophia-carter',
  serviceImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA90odZd3razRM2DGbQD9QvpHml6rifZXxdAytw_iMNOCoBnybC9C3OtQtgTAi3_sWn7RHwHdx4idSCkDi4LxL6XQD3O9gNNUOYi8Kp40JEpYBXKd7N4IKeUlCRmuAhbBamFsjoscoNE5bMfHA9e-y-paQRWoq2wvAer3nc7rlZLju1cP2rXVoK7ILQyNoCqFERjBJ8XWtoHH2qeu2140pXtulS0yJJsOX0wJrXKV0LHAgWnYIDUMk_rkHUp_dORy_oK5uGqqSKTmA',
  items: [
    '1 a 2 conceitos de logo iniciais',
    'Entrega de arquivos em alta resolução'
  ],
  pricing: {
    packagePrice: 1200.00,
    serviceFee: 100.00,
    discount: 0,
    total: 1200.00
  },
  delivery: 7,
  buyer: {
    name: 'Bruno Silva',
    country: 'Brasil'
  }
})

const formData = reactive({
  cardNumber: '',
  expiry: '',
  cvv: '',
  cardholderName: '',
  cpf: '',
  promoCode: ''
})

const handleSubmit = () => {
  if (!agreeTerms.value) {
    alert('Você precisa concordar com os termos')
    return
  }
  console.log('Order placed:', { ...orderData, ...formData })
  // Handle payment processing
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-6xl mx-auto px-6 py-8">
      <!-- Page Header -->
      <h1 class="text-3xl font-bold text-black mb-8">Checkout</h1>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content - Payment Form -->
        <div class="lg:col-span-2">
          <!-- Payment Method Selection -->
          <div class="bg-white rounded-lg p-6 mb-6">
            <h2 class="text-xl font-semibold text-black mb-4">Método de Pagamento</h2>
            <div class="space-y-3">
              <label class="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-[var(--color-dourado)] transition-colors"
                :class="paymentMethod === 'card' && 'border-[var(--color-dourado)] bg-amber-50'">
                <input
                  type="radio"
                  v-model="paymentMethod"
                  value="card"
                  class="w-4 h-4"
                />
                <span class="ml-3 font-medium text-black">Cartão de Crédito</span>
              </label>

              <label class="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-[var(--color-dourado)] transition-colors"
                :class="paymentMethod === 'debit' && 'border-[var(--color-dourado)] bg-amber-50'">
                <input
                  type="radio"
                  v-model="paymentMethod"
                  value="debit"
                  class="w-4 h-4"
                />
                <span class="ml-3 font-medium text-black">Cartão de Débito</span>
              </label>

              <label class="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-[var(--color-dourado)] transition-colors"
                :class="paymentMethod === 'paypal' && 'border-[var(--color-dourado)] bg-amber-50'">
                <input
                  type="radio"
                  v-model="paymentMethod"
                  value="paypal"
                  class="w-4 h-4"
                />
                <span class="ml-3 font-medium text-black">PayPal</span>
              </label>
            </div>
          </div>

          <!-- Card Details (shown only for card payment) -->
          <div v-if="paymentMethod !== 'paypal'" class="bg-white rounded-lg p-6 mb-6">
            <h2 class="text-xl font-semibold text-black mb-6">Informações do Cartão</h2>

            <div class="space-y-4">
              <!-- Card Number -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Número do Cartão
                </label>
                <input
                  v-model="formData.cardNumber"
                  type="text"
                  placeholder="0000 0000 0000 0000"
                  maxlength="19"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-dourado)]"
                />
              </div>

              <!-- Expiry and CVV -->
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Vencimento
                  </label>
                  <input
                    v-model="formData.expiry"
                    type="text"
                    placeholder="MM/AA"
                    maxlength="5"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-dourado)]"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Código de Segurança (CVV)
                  </label>
                  <input
                    v-model="formData.cvv"
                    type="text"
                    placeholder="000"
                    maxlength="4"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-dourado)]"
                  />
                </div>
              </div>

              <!-- Cardholder Name -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Nome do Titular
                </label>
                <input
                  v-model="formData.cardholderName"
                  type="text"
                  placeholder="Digite o nome completo"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-dourado)]"
                />
              </div>

              <!-- CPF/CNPJ -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  CPF/CNPJ
                </label>
                <input
                  v-model="formData.cpf"
                  type="text"
                  placeholder="000.000.000-00"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-dourado)]"
                />
              </div>

              <!-- Save Card Checkbox -->
              <label class="flex items-center gap-3 text-sm text-gray-700 cursor-pointer">
                <input
                  v-model="saveCard"
                  type="checkbox"
                  class="w-4 h-4 rounded"
                />
                Salvar este cartão para pagamentos futuros
              </label>
            </div>
          </div>

          <!-- Promo Code -->
          <div class="bg-white rounded-lg p-6 mb-6">
            <h3 class="font-semibold text-black mb-4">Código Promocional</h3>
            <div class="flex gap-3">
              <input
                v-model="formData.promoCode"
                type="text"
                placeholder="Digite seu código promocional"
                class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-dourado)]"
              />
              <UButton variant="soft" class="px-6">Aplicar</UButton>
            </div>
          </div>

          <!-- Terms Agreement -->
          <div class="bg-blue-50 rounded-lg p-6 mb-6 border border-blue-200">
            <label class="flex items-start gap-3 cursor-pointer">
              <input
                v-model="agreeTerms"
                type="checkbox"
                class="w-4 h-4 mt-1"
              />
              <div>
                <p class="text-sm text-gray-700">
                  Ao continuar, você concorda com nossos <span class="font-semibold text-blue-600">Termos de Serviço</span> e <span class="font-semibold text-blue-600">Política de Privacidade</span>.
                </p>
                <p class="text-xs text-gray-600 mt-2">
                  💡 Seu pagamento será retido até a aprovação da entrega. Você tem total proteção do comprador.
                </p>
              </div>
            </label>
          </div>
        </div>

        <!-- Sidebar - Order Summary -->
        <div class="lg:col-span-1">
          <div class="sticky top-20 space-y-6">
            <!-- Order Summary Card -->
            <div class="bg-white rounded-lg p-6 border border-gray-200">
              <h3 class="font-semibold text-black text-lg mb-4">Resumo da Compra</h3>

              <!-- Service Info -->
              <div class="flex gap-4 mb-6">
                <img
                  :src="orderData.serviceImage"
                  alt="Service"
                  class="w-20 h-20 rounded-lg object-cover"
                />
                <div>
                  <p class="text-sm text-gray-600">Serviço</p>
                  <p class="font-semibold text-black">{{ orderData.packageName }}</p>
                  <p class="text-xs text-gray-500 mt-1">Por {{ orderData.sellerName }}</p>
                </div>
              </div>

              <!-- Items Included -->
              <div class="mb-6">
                <p class="font-medium text-black mb-3 text-sm">Itens Inclusos:</p>
                <ul class="space-y-2">
                  <li v-for="(item, idx) in orderData.items" :key="idx" class="flex gap-2 text-sm text-gray-700">
                    <span class="text-[var(--color-dourado)]">✓</span>
                    {{ item }}
                  </li>
                </ul>
              </div>

              <!-- Pricing Breakdown -->
              <div class="border-t border-gray-200 pt-4 mb-4 space-y-2 text-sm">
                <div class="flex justify-between text-gray-700">
                  <span>Valor do Pacote</span>
                  <span class="font-medium">R$ {{ orderData.pricing.packagePrice.toFixed(2) }}</span>
                </div>
                <div class="flex justify-between text-gray-700">
                  <span>Taxa de Serviço</span>
                  <span class="font-medium">R$ {{ orderData.pricing.serviceFee.toFixed(2) }}</span>
                </div>
                <div v-if="orderData.pricing.discount > 0" class="flex justify-between text-green-600">
                  <span>Desconto</span>
                  <span class="font-medium">-R$ {{ orderData.pricing.discount.toFixed(2) }}</span>
                </div>
              </div>

              <!-- Total -->
              <div class="border-t border-gray-200 pt-4">
                <div class="flex justify-between mb-4">
                  <span class="font-semibold text-black">Total</span>
                  <span class="text-2xl font-bold text-[var(--color-dourado)]">
                    R$ {{ orderData.pricing.total.toFixed(2) }}
                  </span>
                </div>
              </div>

              <!-- Delivery Info -->
              <div class="bg-gray-50 rounded p-3 text-sm text-gray-700 mb-4">
                <p class="font-medium mb-1">Prazo de Entrega</p>
                <p>{{ orderData.delivery }} dias úteis</p>
              </div>

              <!-- Submit Button -->
              <UButton
                @click="handleSubmit"
                :disabled="!agreeTerms"
                class="w-full bg-[var(--color-dourado)] text-white font-semibold py-3"
              >
                🔒 Confirmar e Pagar
              </UButton>

              <p class="text-center text-xs text-gray-600 mt-3">
                Pagamento 100% Seguro com SSL
              </p>
            </div>

            <!-- Buyer Info Card -->
            <div class="bg-white rounded-lg p-6 border border-gray-200">
              <h3 class="font-semibold text-black mb-4 text-sm">Informações de Compra</h3>
              <div class="space-y-3 text-sm">
                <div>
                  <p class="text-gray-600">Comprador</p>
                  <p class="font-medium text-black">{{ orderData.buyer.name }}</p>
                </div>
                <div>
                  <p class="text-gray-600">País</p>
                  <p class="font-medium text-black">{{ orderData.buyer.country }}</p>
                </div>
              </div>
            </div>

            <!-- Protection Badge -->
            <div class="bg-green-50 rounded-lg p-4 border border-green-200 text-sm">
              <p class="font-medium text-green-900 mb-2">✓ Proteção do Comprador</p>
              <p class="text-green-800 text-xs">
                Seu pagamento será liberado apenas após você aprovar a entrega. Você tem proteção total.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
