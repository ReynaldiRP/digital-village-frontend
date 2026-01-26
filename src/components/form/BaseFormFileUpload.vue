<template>
  <div class="flex-1 flex items-center justify-between">
    <div
      class="flex items-center justify-center overflow-hidden bg-desa-foreshadow"
      :class="previewClasses"
    >
      <img :src="previewUrl" alt="image" class="size-full object-cover" />
    </div>
    <div class="relative">
      <input
        ref="fileInput"
        type="file"
        :accept="accept"
        class="absolute opacity-0 left-0 w-full top-0 h-full cursor-pointer"
        @change="handleFileChange"
      />
      <button
        type="button"
        class="relative flex items-center py-4 px-6 rounded-2xl bg-desa-black gap-[10px]"
        @click="triggerFileInput"
      >
        <img :src="SendSquareWhiteIcon" alt="icon" class="size-6 shrink-0" />
        <p class="font-medium leading-5 text-white">{{ buttonText }}</p>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import SendSquareWhiteIcon from '@/assets/images/icons/send-square-white.svg'

interface Props {
  modelValue?: File | null
  previewShape?: 'circle' | 'square'
  previewSize?: 'small' | 'medium' | 'large'
  accept?: string
  buttonText?: string
  defaultPreview?: string
}

const props = withDefaults(defineProps<Props>(), {
  previewShape: 'circle',
  previewSize: 'medium',
  accept: 'image/*',
  buttonText: 'Upload',
  defaultPreview: '/src/assets/images/photos/kk-preview.png',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: File | null): void
}>()

const fileInput = ref<HTMLInputElement | null>(null)
const previewUrl = ref(props.defaultPreview)

const previewClasses = computed(() => {
  const sizeClasses = {
    small: 'size-[60px]',
    medium: 'size-[100px]',
    large: 'size-[140px]',
  }
  const shapeClasses = {
    circle: 'rounded-full',
    square: 'rounded-2xl',
  }
  return `${sizeClasses[props.previewSize]} ${shapeClasses[props.previewShape]}`
})

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0] || null

  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      previewUrl.value = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }

  emit('update:modelValue', file)
}

watch(
  () => props.modelValue,
  (newFile) => {
    if (!newFile) {
      previewUrl.value = props.defaultPreview
    }
  },
)
</script>

<style scoped></style>
