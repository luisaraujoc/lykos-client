<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuth } from '~/composables/useAuth'

definePageMeta({
  layout: 'default',
  middleware: 'auth' // Garante que só logados entrem
})

const route = useRoute()
const router = useRouter()
const { user, fetchMe, loading } = useAuth()

const usernameParam = route.params.username

// Busca os dados ao montar o componente
onMounted(async () => {
  if (!user.value) {
    await fetchMe()
  }

  // Redireciona se o usuário tentar acessar um /u/outro-usuario
  // e você quiser que essa rota seja estritamente privada
  if (user.value && user.value.nome_usuario !== usernameParam) {
    // router.push(`/u/${user.value.nome_usuario}`)
  }
})

const isOwner = computed(() => user.value?.nome_usuario === usernameParam)

// Formatação de data simples para "Membro desde"
const memberSince = computed(() => {
  if (!user.value?.data_criacao) return '---'
  return new Date(user.value.data_criacao).toLocaleDateString('pt-BR', {
    month: 'long',
    year: 'numeric'
  })
})

const money = (val: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val)
</script>

<template>
  <div v-if="loading" class="flex justify-center py-20">
    <UIcon name="i-heroicons-arrow-path" class="animate-spin w-8 h-8" />
  </div>

  <div v-else-if="user" class="max-w-6xl mx-auto px-[var(--space-4)] py-[var(--space-8)]">
    <div class="grid grid-cols-1 md:grid-cols-12 gap-[var(--space-8)]">

      <div class="md:col-span-4 space-y-[var(--space-6)]">
        <UCard class="sticky top-6 bg-[var(--ui-bg-elevated)] ring-1 ring-[var(--ui-border)] overflow-hidden">

          <div class="flex flex-col items-center text-center space-y-4 pb-6 border-b border-[var(--ui-border)]">
            <div class="relative mt-4">
              <UAvatar
                  :src="user.avatar_url"
                  :alt="user.pessoa?.nome_completo"
                  size="3xl"
                  class="ring-4 ring-[var(--ui-bg)]"
              />
            </div>

            <div>
              <h1 class="font-bold text-xl text-[var(--ui-text)]">
                {{ user.pessoa?.nome_completo || 'Usuário Lykos' }}
              </h1>
              <p class="text-[var(--ui-text-muted)]">@{{ user.nome_usuario }}</p>
            </div>

            <div class="flex gap-2 justify-center">
              <UBadge color="neutral" variant="solid">{{ user.tipo }}</UBadge>
              <UBadge v-if="isOwner" color="primary" variant="subtle">Você</UBadge>
            </div>
          </div>

          <div class="py-6 space-y-3">
            <div class="flex justify-between text-sm">
              <span class="text-[var(--ui-text-muted)] flex items-center gap-2">
                <UIcon name="i-heroicons-map-pin" /> Local
              </span>
              <span class="font-bold text-[var(--ui-text)] text-right">
                {{ user.enderecos?.[0] ? `${user.enderecos[0].cidade}, ${user.enderecos[0].estado}` : 'Não informado' }}
              </span>
            </div>

            <div class="flex justify-between text-sm">
              <span class="text-[var(--ui-text-muted)] flex items-center gap-2">
                <UIcon name="i-heroicons-calendar" /> Membro desde
              </span>
              <span class="font-bold text-[var(--ui-text)] capitalize">{{ memberSince }}</span>
            </div>

            <div class="flex justify-between text-sm">
              <span class="text-[var(--ui-text-muted)] flex items-center gap-2">
                <UIcon name="i-heroicons-envelope" /> E-mail
              </span>
              <span class="font-bold text-[var(--ui-text)]">{{ user.email }}</span>
            </div>
          </div>

          <div v-if="user.bio" class="pt-4 border-t border-[var(--ui-border)]">
            <p class="text-sm text-[var(--ui-text-muted)] leading-relaxed italic">
              "{{ user.bio }}"
            </p>
          </div>

          <div v-if="isOwner" class="pt-6 mt-4 border-t border-[var(--ui-border)] space-y-2">
            <UButton block disabled color="neutral" variant="ghost" icon="i-heroicons-cog-6-tooth">
              Configurações
            </UButton>
            <UButton block to="/u/orders" color="primary" variant="solid" icon="i-heroicons-list-bullet">
              Meus Pedidos
            </UButton>
          </div>
        </UCard>
      </div>

      <div class="md:col-span-8 space-y-[var(--space-8)]">
        <div class="space-y-4">
          <h2 class="text-xl font-bold">Reputação</h2>
          <p class="text-sm text-muted">Informações de reputação serão integradas em breve com o serviço de pedidos.</p>
        </div>
      </div>

    </div>
  </div>

  <div v-else class="text-center py-20">
    <p>Usuário não encontrado ou erro na autenticação.</p>
    <UButton to="/login" class="mt-4">Ir para Login</UButton>
  </div>
</template>