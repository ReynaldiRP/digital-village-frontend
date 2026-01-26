<template>
  <div class="flex flex-col gap-3 flex-1">
    <div class="flex items-center gap-6 shrink-0">
      <label
        class="relative group peer w-full"
        :class="{
          valid: validationState === 'valid',
          invalid: validationState === 'invalid',
        }"
      >
        <input
          ref="dateInput"
          type="date"
          :value="modelValue"
          :placeholder="placeholder"
          class="appearance-none outline-none w-full h-14 rounded-2xl ring-[1.5px] ring-desa-background focus:ring-desa-black p-4 pl-12 gap-2 font-medium invalid:text-desa-secondary transition-all duration-300 [&::-webkit-calendar-picker-indicator]:hidden group-[.invalid]:input-invalid-state"
          @input="handleInput"
          @click="openPicker"
          @blur="handleBlur"
        />
        <div class="absolute transform -translate-y-1/2 top-1/2 left-4 flex size-6 shrink-0">
          <!-- Inactive icon: shown when no value (invalid native state) AND not validation invalid -->
          <img
            :src="Calendar2SecondaryGreenIcon"
            class="size-6 hidden group-has-[:invalid]:flex group-[.invalid]:!hidden"
            alt="icon"
          />
          <!-- Active icon: shown when has value AND not validation invalid -->
          <img
            :src="Calendar2BlackIcon"
            class="size-6 flex group-has-[:invalid]:hidden group-[.invalid]:hidden"
            alt="icon"
          />
          <!-- Error icon: shown when validation invalid - uses red filter -->
          <img
            :src="Calendar2BlackIcon"
            class="size-6 hidden group-[.invalid]:flex icon-to-red"
            alt="icon"
          />
        </div>
        <img
          :src="ChecklistDarkGreenFillIcon"
          class="absolute transform -translate-y-1/2 top-1/2 right-4 size-6 shrink-0 hidden group-[.valid]:flex"
          alt="icon"
        />
        <img
          :src="CloseCircleRedFillIcon"
          class="absolute transform -translate-y-1/2 top-1/2 right-4 size-6 shrink-0 hidden group-[.invalid]:flex"
          alt="icon"
        />
      </label>
      <div
        v-if="showAge"
        class="w-[180px] flex shrink-0 h-[52px] rounded-2xl bg-desa-foreshadow p-4 font-medium leading-5 text-desa-dark-green justify-center"
      >
        <p>
          {{ ageLabel }}: <span>{{ calculatedAge }}</span> tahun
        </p>
      </div>
    </div>
    <span
      v-if="errorMessage && validationState === 'invalid'"
      class="font-medium text-sm text-desa-red"
    >
      {{ errorMessage }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import Calendar2SecondaryGreenIcon from '@/assets/images/icons/calendar-2-secondary-green.svg'
import Calendar2BlackIcon from '@/assets/images/icons/calendar-2-black.svg'
import ChecklistDarkGreenFillIcon from '@/assets/images/icons/Checklist-dark-green-fill.svg'
import CloseCircleRedFillIcon from '@/assets/images/icons/close-circle-red-fill.svg'

interface Props {
  modelValue?: string
  placeholder?: string
  showAge?: boolean
  ageLabel?: string
  validationState?: 'valid' | 'invalid' | 'default'
  errorMessage?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: 'Masukan tanggal lahir',
  showAge: false,
  ageLabel: 'Umur',
  validationState: 'default',
  errorMessage: '',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'blur'): void
}>()

const handleBlur = () => {
  emit('blur')
}

const dateInput = ref<HTMLInputElement | null>(null)

const calculatedAge = computed(() => {
  if (!props.modelValue) return 0

  const birthDate = new Date(props.modelValue)
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }

  return age >= 0 ? age : 0
})

const openPicker = () => {
  dateInput.value?.showPicker()
}

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

watch(
  () => props.modelValue,
  (newValue) => {
    if (dateInput.value) {
      dateInput.value.value = newValue
    }
  },
)
</script>

<style scoped>
/* CSS filter to convert black/dark icons to red (#EF4444 / desa-red) */
.icon-to-red {
  filter: brightness(0) saturate(100%) invert(36%) sepia(95%) saturate(1639%) hue-rotate(338deg)
    brightness(93%) contrast(95%);
}
</style>
