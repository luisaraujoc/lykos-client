<script setup lang="ts">
// Importa o composable que criamos anteriormente
const {
  form,
  tempSkill, tempIdioma, tempFormacao,
  loading,
  handlePhotoSelect,
  addSkill, removeSkill,
  addIdioma, removeIdioma,
  addFormacao, removeFormacao,
  submit
} = useBecomeSeller()

definePageMeta({ middleware: 'auth' })

const fileInputRef = ref<HTMLInputElement | null>(null)
const triggerFileInput = () => fileInputRef.value?.click()

const onFileChange = (e: Event) => {
  const input = e.target as HTMLInputElement
  if (input.files?.[0]) handlePhotoSelect(input.files[0])
}

const NIVEIS_IDIOMA = [
  { label: 'Básico', value: 'BASICO' },
  { label: 'Intermediário', value: 'INTERMEDIARIO' },
  { label: 'Avançado', value: 'AVANCADO' },
  { label: 'Nativo', value: 'NATIVO' }
]
</script>

<template>
  <div class="min-h-screen bg-[var(--ui-bg)] py-12 px-4 sm:px-6 lg:px-8">

    <div class="max-w-3xl mx-auto space-y-8">

      <div class="flex flex-col items-center text-center space-y-2">
        <h1 class="text-3xl font-bold text-[var(--ui-text)] tracking-tight">
          Seja um Freelancer
        </h1>
        <p class="text-[var(--ui-text-muted)] max-w-lg">
          Configure seu perfil profissional para começar a vender seus serviços na Lykos.
        </p>
      </div>

      <form @submit.prevent="submit" class="flex flex-col gap-6">

        <UCard :ui="{ body: { base: 'flex flex-col gap-6' } }">
          <div class="flex flex-col sm:flex-row items-center gap-6">

            <div @click="triggerFileInput" class="cursor-pointer relative group shrink-0">
              <UAvatar
                  :src="form.photoPreview || undefined"
                  size="3xl"
                  icon="i-heroicons-user"
                  class="w-32 h-32 text-4xl ring-4 ring-[var(--ui-bg)] shadow-md"
                  :ui="{ placeholder: 'bg-[var(--ui-bg-accent)] text-[var(--ui-text-muted)]' }"
              />
              <div class="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition duration-200">
                <UIcon name="i-heroicons-camera" class="text-white w-8 h-8"/>
              </div>
            </div>

            <div class="flex flex-col w-full gap-2 text-center sm:text-left">
              <label class="font-bold text-[var(--ui-text)] text-lg">Foto de Perfil</label>
              <p class="text-sm text-[var(--ui-text-muted)] mb-2">
                Essa imagem será sua marca. Escolha uma foto que passe confiança e profissionalismo.
              </p>

              <input ref="fileInputRef" type="file" class="hidden" accept="image/*" @change="onFileChange" />

              <div class="flex flex-col sm:flex-row gap-3 justify-center">
                <UButton
                    label="Carregar Foto"
                    icon="i-heroicons-arrow-up-tray"
                    size="md"
                    color="primary"
                    variant="solid"
                    class="sm:w-auto font-bold"
                    @click="triggerFileInput"
                />
              </div>
            </div>
          </div>
        </UCard>

        <UCard :ui="{ body: { base: 'flex flex-col gap-5' } }">
          <template #header>
            <div class="flex items-center gap-2 text-lg font-bold text-[var(--ui-text)]">
              <UIcon name="i-heroicons-identification" class="text-primary-500 w-5 h-5"/>
              Informações Pessoais
            </div>
          </template>

          <UFormField label="Nome de Exibição" required class="w-full">
            <UInput
                v-model="form.nome"
                placeholder="Ex: João Silva Design"
                icon="i-heroicons-user"
                size="lg"
                class="w-full"
            />
          </UFormField>

          <UFormField label="Bio / Sobre Mim" required class="w-full">
            <UTextarea
                v-model="form.descricao"
                :rows="5"
                placeholder="Conte um pouco sobre sua experiência, especialidades e o que você oferece..."
                size="lg"
                class="w-full"
            />
          </UFormField>

          <UFormField label="Habilidades (Skills)" required help="Pressione Enter para adicionar" class="w-full">
            <UInput
                v-model="tempSkill"
                @keydown.enter.prevent="addSkill"
                icon="i-heroicons-bolt"
                placeholder="Ex: Photoshop, Python, Marketing..."
                size="lg"
                class="w-full"
            >
              <template #trailing>
                <UKbd size="md">Enter</UKbd>
              </template>
            </UInput>

            <div v-if="form.skills.length > 0" class="flex flex-wrap gap-2 mt-3 p-3 bg-[var(--ui-bg-accent)] rounded-lg border border-[var(--ui-border)]">
              <UBadge
                  v-for="s in form.skills"
                  :key="s"
                  color="primary"
                  variant="subtle"
                  size="md"
                  class="flex items-center gap-1 pl-2 pr-1 py-1"
              >
                {{ s }}
                <UButton
                    icon="i-heroicons-x-mark"
                    size="xs"
                    color="primary"
                    variant="ghost"
                    :padded="false"
                    class="rounded-full h-4 w-4"
                    @click="removeSkill(s)"
                />
              </UBadge>
            </div>
          </UFormField>
        </UCard>

        <UCard :ui="{ body: { base: 'flex flex-col gap-4' } }">
          <template #header>
            <div class="flex items-center gap-2 text-lg font-bold text-[var(--ui-text)]">
              <UIcon name="i-heroicons-language" class="text-primary-500 w-5 h-5"/>
              Idiomas
            </div>
          </template>

          <div class="flex flex-col gap-3">
            <div v-for="(item, idx) in form.idiomas" :key="idx" class="flex justify-between items-center p-3 bg-[var(--ui-bg-accent)] border border-[var(--ui-border)] rounded-lg">
              <div class="flex flex-col">
                <span class="font-bold text-[var(--ui-text)]">{{ item.nome }}</span>
                <span class="text-xs text-[var(--ui-text-muted)] uppercase tracking-wider">{{ item.nivel }}</span>
              </div>
              <UButton icon="i-heroicons-trash" color="error" variant="ghost" @click="removeIdioma(idx)"/>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-3 items-end pt-2">
            <div class="w-full sm:flex-1 flex flex-col gap-1.5">
              <label class="text-sm font-medium text-[var(--ui-text)]">Idioma</label>
              <UInput v-model="tempIdioma.nome" placeholder="Ex: Inglês" size="lg" class="w-full" />
            </div>

            <div class="w-full sm:w-1/3 flex flex-col gap-1.5">
              <label class="text-sm font-medium text-[var(--ui-text)]">Nível</label>
              <USelect v-model="tempIdioma.nivel" :options="NIVEIS_IDIOMA" size="lg" class="w-full" />
            </div>

            <UButton
                label="Adicionar"
                icon="i-heroicons-plus"
                color="neutral"
                variant="solid"
                size="lg"
                class="w-full sm:w-auto font-bold"
                @click="addIdioma"
            />
          </div>
        </UCard>

        <UCard :ui="{ body: { base: 'flex flex-col gap-4' } }">
          <template #header>
            <div class="flex items-center gap-2 text-lg font-bold text-[var(--ui-text)]">
              <UIcon name="i-heroicons-academic-cap" class="text-primary-500 w-5 h-5"/>
              Formação Acadêmica
            </div>
          </template>

          <div class="flex flex-col gap-3">
            <div v-for="(f, idx) in form.formacoes" :key="idx" class="p-4 bg-[var(--ui-bg-accent)] border border-[var(--ui-border)] rounded-lg relative group">
              <div class="flex flex-col">
                <span class="font-bold text-[var(--ui-text)]">{{ f.titulo }}</span>
                <span class="text-sm text-[var(--ui-text-muted)]">{{ f.instituicao }} • {{ f.ano }}</span>
              </div>
              <UButton
                  icon="i-heroicons-trash"
                  color="error"
                  variant="ghost"
                  size="sm"
                  class="absolute top-2 right-2 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                  @click="removeFormacao(idx)"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div class="flex flex-col gap-1.5 sm:col-span-2">
              <label class="text-sm font-medium text-[var(--ui-text)]">Curso / Grau</label>
              <UInput v-model="tempFormacao.titulo" placeholder="Ex: Design Gráfico" size="lg" class="w-full" />
            </div>

            <div class="flex flex-col gap-1.5">
              <label class="text-sm font-medium text-[var(--ui-text)]">Instituição</label>
              <UInput v-model="tempFormacao.instituicao" placeholder="Ex: USP" size="lg" class="w-full" />
            </div>

            <div class="flex flex-col gap-1.5">
              <label class="text-sm font-medium text-[var(--ui-text)]">Ano de Conclusão</label>
              <UInput v-model="tempFormacao.ano" placeholder="Ex: 2023" type="number" size="lg" class="w-full" />
            </div>

            <UButton
                label="Adicionar Formação"
                color="gray"
                variant="solid"
                icon="i-heroicons-plus-circle"
                size="lg"
                class="w-full sm:col-span-2 font-bold"
                @click="addFormacao"
            />
          </div>
        </UCard>

        <div class="flex flex-col-reverse sm:flex-row justify-end gap-4 pt-4 border-t border-[var(--ui-border)]">
          <UButton
              label="Cancelar"
              to="/home"
              color="neutral"
              variant="ghost"
              size="xl"
              class="w-full sm:w-auto"
          />
          <UButton
              type="submit"
              label="Criar Perfil e Continuar"
              color="primary"
              size="xl"
              :loading="loading"
              class="w-full sm:w-auto font-bold px-8"
              icon="i-heroicons-arrow-right"
              trailing
          />
        </div>

      </form>
    </div>
  </div>
</template>