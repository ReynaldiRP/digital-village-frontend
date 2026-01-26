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
      />
      <!-- Left Icon Container -->
      <div class="absolute transform -translate-y-1/2 top-1/2 left-4 flex size-6 shrink-0">
        <img
          :src="iconInactive"
          class="size-6 hidden group-has-[:placeholder-shown]:flex group-[.invalid]:!hidden"
          alt="icon"
        />
        <img
          :src="iconActive"
          class="size-6 flex group-has-[:placeholder-shown]:hidden group-[.invalid]:hidden"
          alt="icon"
        />
        <img
          v-if="iconError"
          :src="iconError"
          class="size-6 hidden group-[.invalid]:flex"
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
}>()

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

<style scoped></style>
