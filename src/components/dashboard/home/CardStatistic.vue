<template>
  <div
    :class="{
      'card flex flex-col w-full rounded-2xl p-6 gap-3 bg-white': variant === 'default',
      'flex flex-col gap-3 p-6': variant === 'plain',
    }"
  >
    <div class="flex items-center justify-between">
      <p class="font-medium text-desa-secondary">{{ label }}</p>
      <img
        :src="icon"
        class="flex size-12 shrink-0"
        alt="icon"
      />
    </div>
    <div class="flex flex-col gap-[6px]">
      <p class="font-semibold text-[32px] leading-10">{{ value }}</p>
      <div class="flex items-center gap-0.5">
        <img
          :src="trendIcon"
          class="flex size-[18px] shrink-0"
          alt="icon"
        />
        <p class="font-medium text-sm text-desa-secondary">
          <span class="text-desa-dark-green">+12%</span>
          dari bulan sebelumnya
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    label: string
    icon?: string
    trendIcon?: string
    value: number
    variant?: 'default' | 'plain'
  }>(),
  {
    label: '',
    icon: '',
    trendIcon: '',
    value: 0,
    variant: 'default',
  },
)
</script>

<style scoped></style>
