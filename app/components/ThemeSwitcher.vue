<script setup lang="ts">
const colorMode = useColorMode()
const mounted = ref(false)

onMounted(() => {
  mounted.value = true
})

const toggleTheme = () => {
  colorMode.preference =
      colorMode.preference === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <ClientOnly>
    <UButton
        v-if="mounted"
        variant="ghost"
        @click="toggleTheme"
        :aria-label="`Ativar tema ${colorMode.preference === 'dark' ? 'claro' : 'escuro'}`"
    >
      <UIcon
          :name="colorMode.preference === 'dark'
          ? 'i-heroicons-sun'
          : 'i-heroicons-moon'"
      />
    </UButton>
    <template #fallback>
      <UButton variant="ghost" disabled>
        <UIcon name="i-heroicons-moon" />
      </UButton>
    </template>
  </ClientOnly>
</template>
