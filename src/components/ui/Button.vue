<template>
  <button
    :type="type"
    class="py-[18px] flex justify-center items-center bg-desa-dark-green rounded-2xl font-medium loading-5 text-white disabled:bg-desa-grey"
    :disabled="loading"
  >
    <span v-if="!loading">{{ label }}</span>
    <Loading v-else variant="inline" size="small" />
  </button>
</template>

<script setup lang="ts">
import Loading from './Loading.vue'

withDefaults(
  defineProps<{
    label: string
    type: 'button' | 'submit' | 'reset'
    loading: boolean
  }>(),
  {
    type: 'button',
    loading: false,
  },
)
</script>

<style scoped></style>
