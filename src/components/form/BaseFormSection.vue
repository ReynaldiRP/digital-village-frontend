<template>
  <section class="flex items-center justify-between">
    <p class="font-medium leading-5 text-desa-secondary w-[calc(424/904*100%)]">
      {{ label }}
    </p>
    <div :class="contentClass">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  label: string
  direction?: 'column' | 'row'
}

const props = withDefaults(defineProps<Props>(), {
  direction: 'column',
})

const contentClass = computed(() => {
  const base = 'flex-1 shrink-0'
  if (props.direction === 'column') {
    return `${base} flex flex-col gap-3`
  }
  return `${base} flex items-center gap-6`
})
</script>

<style scoped></style>
