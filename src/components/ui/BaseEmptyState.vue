<template>
  <div
    class="flex flex-col shrink-0 justify-center items-center gap-6"
    :class="[containerClass, sizeClasses]"
  >
    <div
      v-if="icon || $slots.icon"
      class="flex shrink-0 items-center justify-center"
      :class="iconSizeClasses"
    >
      <slot name="icon">
        <img v-if="icon" :src="icon" :alt="iconAlt" class="w-full h-full" />
      </slot>
    </div>

    <div class="flex flex-col gap-2 items-center">
      <p v-if="title || $slots.title" class="font-semibold text-center" :class="titleClass">
        <slot name="title">{{ title }}</slot>
      </p>

      <p
        v-if="message || $slots.message"
        class="font-medium leading-5 text-center text-desa-secondary"
        :class="messageClass"
      >
        <slot name="message">{{ message }}</slot>
      </p>
    </div>

    <slot name="action"></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  /**
   * Icon URL to display in the empty state
   */
  icon?: string
  /**
   * Alt text for the icon
   */
  iconAlt?: string
  /**
   * Title text for the empty state
   */
  title?: string
  /**
   * Message text for the empty state
   */
  message?: string
  /**
   * Size variant of the empty state
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * Additional CSS classes for the container
   */
  containerClass?: string
  /**
   * Additional CSS classes for the title
   */
  titleClass?: string
  /**
   * Additional CSS classes for the message
   */
  messageClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  iconAlt: 'Empty state icon',
  size: 'medium',
  containerClass: '',
  titleClass: '',
  messageClass: '',
})

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'small':
      return 'py-6'
    case 'large':
      return 'py-12 h-[384px]'
    case 'medium':
    default:
      return 'py-8'
  }
})

const iconSizeClasses = computed(() => {
  switch (props.size) {
    case 'small':
      return 'size-[40px]'
    case 'large':
      return 'size-[64px]'
    case 'medium':
    default:
      return 'size-[52px]'
  }
})
</script>

<style scoped></style>
