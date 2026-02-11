<template>
  <div class="flex flex-col gap-3">
    <label
      class="relative group peer w-full"
      :class="{
        valid: validationState === 'valid',
        invalid: validationState === 'invalid',
      }"
    >
      <input
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :class="inputClasses"
        @input="handleInput"
        @blur="handleBlur"
      />
      <!-- Left Icon Container -->
      <div class="absolute transform -translate-y-1/2 top-1/2 left-4 flex size-6 shrink-0">
        <!-- Inactive icon: shown when placeholder is shown AND not invalid -->
        <img
          :src="iconInactive"
          class="size-6 hidden group-has-[:placeholder-shown]:flex group-[.invalid]:!hidden"
          alt="icon"
        />
        <!-- Active icon: shown when has value AND not invalid -->
        <img
          :src="iconActive"
          :class="['size-6 group-has-[:placeholder-shown]:hidden', 'group-[.invalid]:hidden']"
          alt="icon"
        />
        <!-- Error icon: shown when invalid - uses iconError if provided, otherwise iconActive with red filter -->
        <img
          :src="iconError || iconActive"
          :class="['size-6 hidden group-[.invalid]:flex', !iconError ? 'icon-to-red' : '']"
          alt="icon"
        />
      </div>
      <!-- Right Icon - Valid State -->
      <img
        :src="ChecklistDarkGreenFillIcon"
        class="absolute transform -translate-y-1/2 top-1/2 right-4 size-6 shrink-0 hidden group-[.valid]:flex"
        alt="icon"
      />
      <!-- Right Icon - Invalid State -->
      <img
        :src="CloseCircleRedFillIcon"
        class="absolute transform -translate-y-1/2 top-1/2 right-4 size-6 shrink-0 hidden group-[.invalid]:flex"
        alt="icon"
      />
    </label>
    <span
      v-if="errorMessage && validationState === 'invalid'"
      class="font-medium text-sm text-desa-red"
    >
      {{ errorMessage }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import ChecklistDarkGreenFillIcon from '@/assets/images/icons/Checklist-dark-green-fill.svg'
import CloseCircleRedFillIcon from '@/assets/images/icons/close-circle-red-fill.svg'


interface Props {
  modelValue: string | number
  type?: 'text' | 'number' | 'email' | 'tel' | 'password'
  placeholder?: string
  iconInactive: string
  iconActive: string
  iconError?: string
  validationState?: 'valid' | 'invalid' | 'default'
  errorMessage?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  placeholder: '',
  validationState: 'default',
  errorMessage: '',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
  (e: 'blur'): void
}>()

const handleBlur = () => {
  emit('blur')
}

const inputClasses = computed(() => {
  const base =
    'appearance-none outline-none w-full h-14 rounded-2xl ring-[1.5px] ring-desa-background focus:ring-desa-black py-4 px-12 gap-2 font-medium placeholder:text-desa-secondary transition-all duration-300'

  if (props.type === 'password') {
    return `${base} tracking-[4px] placeholder:tracking-normal`
  }

  if (props.validationState === 'invalid') {
    return `${base} group-[.invalid]:input-invalid-state`
  }

  return base
})

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = props.type === 'number' ? Number(target.value) : target.value
  emit('update:modelValue', value)
}
</script>

<style scoped>
/* CSS filter to convert black/dark icons to red (#EF4444 / desa-red) */
.icon-to-red {
  filter: brightness(0) saturate(100%) invert(36%) sepia(95%) saturate(1639%) hue-rotate(338deg)
    brightness(93%) contrast(95%);
}
</style>
