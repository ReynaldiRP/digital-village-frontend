<template>
  <div class="flex items-center justify-between">
    <h1 class="font-semibold text-2xl">{{ title }}</h1>
    <a
      v-if="showAddButton"
      :href="addButtonRoute"
      class="flex items-center rounded-2xl py-4 px-6 gap-[10px] bg-desa-dark-green"
    >
      <img
        src="@/assets/images/icons/add-square-white.svg"
        class="flex size-6 shrink-0"
        alt="icon"
      />
      <p class="font-medium text-white">{{ addButtonText }}</p>
    </a>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  showAddButton?: boolean
  addButtonText?: string
  addButtonRoute?: string
}

withDefaults(defineProps<Props>(), {
  showAddButton: false,
  addButtonText: 'Add New',
  addButtonRoute: '#',
})
</script>

<style scoped></style>
