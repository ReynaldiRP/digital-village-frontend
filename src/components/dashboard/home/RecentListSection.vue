<template>
  <div class="flex flex-col gap-4 p-6">
    <p class="font-semibold text-[20px] leading-[25px] text-left w-full">
      {{ title }}
    </p>
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<style scoped></style>
