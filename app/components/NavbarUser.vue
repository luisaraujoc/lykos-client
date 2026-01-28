<script setup lang="ts">
// Removemos o import não usado para corrigir o ESLint
const { user, logout } = useAuth()

const profileLink = computed(() => `/u/${user.value?.nome_usuario || 'me'}`)
</script>

<template>
  <header class="border-b border-[var(--ui-border)] bg-[var(--ui-bg)] sticky top-0 z-50">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between gap-4">

        <NuxtLink to="/home" class="flex-shrink-0 flex items-center gap-2">
          <img src="~/assets/img/Logo.png" alt="Lykos" class="h-8 w-auto" />
        </NuxtLink>

        <div class="hidden md:flex flex-1 max-w-xl mx-8">
          <UInput
              icon="i-heroicons-magnifying-glass"
              placeholder="Encontre serviços..."
              color="gray"
              variant="outline"
              size="md"
              class="w-full"
              :ui="{ icon: { trailing: { pointer: '' } } }"
          />
        </div>

        <div class="flex items-center gap-3">

          <div class="relative">
            <UButton
                icon="i-heroicons-bell"
                color="neutral"
                variant="ghost"
                aria-label="Notificações"
            />
            <span class="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-[var(--ui-bg)]"></span>
          </div>

          <div class="h-6 w-px bg-[var(--ui-border)] mx-1"></div>

          <UButton
              color="secondary"
              to="/become-seller"
          >
            Seja um Freelancer
          </UButton>

          <UButton
              icon="i-heroicons-user"
              color="neutral"
              variant="ghost"
              :to="profileLink"
          >
            Perfil
          </UButton>

          <UButton
              icon="i-heroicons-arrow-left-on-rectangle"
              color="error"
              variant="ghost"
              @click="logout"
          >
            Sair
          </UButton>

        </div>

      </div>
    </div>
  </header>
</template>