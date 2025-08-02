<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  text: string;
  icon?: string; // Optional icon prop
}>();

</script>

<template>
    <!-- Button solid with text sended of props -->
    <button class="btn-primary-solid">
        <span>{{ props.text }}</span>
        <!-- <span v-if="props.icon" class="icon">
            <i :class="props.icon"></i>
        </span> -->
    </button>
</template>