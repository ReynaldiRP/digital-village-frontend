<template>
  <div class="options flex items-center gap-4">
    <div class="flex items-center gap-[10px]">
      <span class="font-medium leading-5">Show</span>
      <div class="relative">
        <select
          :value="entriesPerPage"
          @change="handleEntriesChange"
          class="appearance-none outline-none w-full h-14 rounded-2xl ring-[1.5px] ring-desa-background focus:ring-desa-black py-4 px-6 pr-[52px] gap-2 font-medium placeholder:text-desa-secondary transition-all duration-300"
        >
          <option v-for="option in entriesOptions" :key="option" :value="option">
            {{ option }} Entries
          </option>
        </select>
        <img
          src="@/assets/images/icons/arrow-down-black.svg"
          class="flex size-6 shrink-0 absolute transform -translate-y-1/2 top-1/2 right-6"
          alt="icon"
        />
      </div>
    </div>
    <button
      type="button"
      @click="handleFilterClick"
      class="flex items-center gap-1 h-14 w-fit rounded-2xl border border-desa-background bg-white py-4 px-6"
    >
      <img src="@/assets/images/icons/filter-black.svg" class="flex size-6 shrink-0" alt="icon" />
      <span class="font-medium leading-5">Filter</span>
    </button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  entriesPerPage: number
  entriesOptions?: number[]
}

interface Emits {
  (e: 'update:entriesPerPage', value: number): void
  (e: 'filter-click'): void
}

withDefaults(defineProps<Props>(), {
  entriesOptions: () => [5, 10, 20, 30, 40, 50],
})

const emit = defineEmits<Emits>()

const handleEntriesChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  emit('update:entriesPerPage', Number(target.value))
}

const handleFilterClick = () => {
  emit('filter-click')
}
</script>

<style scoped></style>
