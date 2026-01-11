<template>
  <div id="Tabs-Button" class="grid grid-cols-3 gap-3">
    <BaseTabButton
      v-for="tab in tabs"
      :key="tab.value"
      :label="tab.label"
      :value="tab.value"
      :is-active="props.modelValue === tab.value"
      @click="handleTabClick"
    />
  </div>
</template>

<script setup lang="ts">
import BaseTabButton from './BaseTabButton.vue'

interface Tab {
  label: string
  value: string
}

interface Props {
  modelValue: string
}

const props = defineProps<Props>()

const tabs: Tab[] = [
  { label: 'Bansos', value: 'Bansos' },
  { label: 'Events', value: 'Events' },
  { label: 'Applicants', value: 'Applicants' },
]

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const handleTabClick = (value: string) => {
  emit('update:modelValue', value)
}
</script>

<style scoped></style>
