<template>
  <div class="flex flex-1 gap-6 shrink-0">
    <label
      v-for="option in options"
      :key="option.value"
      class="group flex w-full items-center h-14 rounded-2xl p-4 ring-[1.5px] ring-desa-background gap-2 has-[:checked]:ring-desa-dark-green transition-setup"
    >
      <input
        type="radio"
        :name="name"
        :value="option.value"
        :checked="modelValue === option.value"
        class="flex size-[18px] shrink-0 accent-desa-secondary checked:accent-desa-dark-green transition-setup"
        @change="handleChange(option.value)"
      />
      <span
        class="font-medium leading-5 text-desa-secondary w-full group-has-[:checked]:text-desa-dark-green transition-setup"
      >
        {{ option.label }}
      </span>
      <div class="flex size-6 shrink-0">
        <img
          :src="option.iconInactive"
          class="size-6 flex group-has-[:checked]:hidden"
          alt="icon"
        />
        <img :src="option.iconActive" class="size-6 hidden group-has-[:checked]:flex" alt="icon" />
      </div>
    </label>
  </div>
</template>

<script setup lang="ts">
export interface RadioOption {
  label: string
  value: string
  iconInactive: string
  iconActive: string
}

interface Props {
  modelValue: string
  options: RadioOption[]
  name: string
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const handleChange = (value: string) => {
  emit('update:modelValue', value)
}
</script>

<style scoped></style>
