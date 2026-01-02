<template>
  <div
    :class="{
      'fixed inset-0 z-50 flex items-center justify-center bg-desa-black/50 backdrop-blur-xl':
        variant === 'overlay',
      'flex items-center justify-center': variant === 'inline',
    }"
  >
    <div class="flex flex-col items-center gap-4">
      <div
        :class="{
          'size-16 border-[3px]': size === 'large',
          'size-12 border-[3px]': size === 'medium',
          'size-6 border-[2px]': size === 'small',
        }"
        class="spinner rounded-full"
      ></div>
      <p
        v-if="text"
        :class="{
          'text-white': variant === 'overlay',
          'text-desa-secondary': variant === 'inline',
        }"
        class="font-medium"
      >
        {{ text }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'overlay' | 'inline'
    size?: 'small' | 'medium' | 'large'
    text?: string
  }>(),
  {
    variant: 'inline',
    size: 'medium',
    text: '',
  },
)
</script>

<style scoped>
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.spinner {
  border: 3px solid #e8efe9;
  border-top-color: #346139;
  border-right-color: #346139;
  animation: spin 0.8s linear infinite;
}
</style>
