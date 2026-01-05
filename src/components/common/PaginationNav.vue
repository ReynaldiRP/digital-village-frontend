<template>
  <nav class="mt-4">
    <ul class="flex items-center gap-3">
      <li class="group">
        <button
          type="button"
          :disabled="isPrevDisabled"
          @click="previousPage"
          class="group/arrow flex size-11 shrink-0 items-center justify-center rounded-full bg-desa-foreshadow disabled:!bg-desa-foreshadow group-hover:bg-desa-dark-green transition-setup"
        >
          <img
            src="@/assets/images/icons/arrow-left-dark-green.svg"
            class="flex size-6 shrink-0 group-hover:hidden group-disabled/arrow:!hidden"
            alt="icon"
          />
          <img
            src="@/assets/images/icons/arrow-left-foreshadow.svg"
            class="hidden size-6 shrink-0 group-hover:flex group-disabled/arrow:!hidden"
            alt="icon"
          />
          <img
            src="@/assets/images/icons/disabled-arrow-pagination.svg"
            class="hidden size-6 shrink-0 group-disabled/arrow:!flex"
            alt="icon"
          />
        </button>
      </li>
      <li
        v-for="page in visiblePages"
        :key="page"
        class="group"
        :class="{ active: page === currentPage }"
      >
        <button
          type="button"
          @click="goToPage(page)"
          class="flex size-11 shrink-0 items-center justify-center rounded-full bg-desa-foreshadow group-hover:bg-desa-dark-green group-[.active]:bg-desa-dark-green transition-setup"
        >
          <span
            class="text-desa-dark-green font-semibold group-[.active]:text-desa-foreshadow group-hover:text-desa-foreshadow transition-setup"
          >
            {{ page }}
          </span>
        </button>
      </li>
      <li class="group">
        <button
          type="button"
          :disabled="isNextDisabled"
          @click="nextPage"
          class="group/arrow flex size-11 shrink-0 items-center justify-center rounded-full bg-desa-foreshadow disabled:!bg-desa-foreshadow group-hover:bg-desa-dark-green transition-setup"
        >
          <img
            src="@/assets/images/icons/arrow-left-dark-green.svg"
            class="flex size-6 shrink-0 rotate-180 group-hover:hidden group-disabled/arrow:!hidden"
            alt="icon"
          />
          <img
            src="@/assets/images/icons/arrow-left-foreshadow.svg"
            class="hidden size-6 shrink-0 rotate-180 group-hover:flex group-disabled/arrow:!hidden"
            alt="icon"
          />
          <img
            src="@/assets/images/icons/disabled-arrow-pagination.svg"
            class="hidden size-6 shrink-0 rotate-180 group-disabled/arrow:!flex"
            alt="icon"
          />
        </button>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  currentPage: number
  totalPages: number
  maxVisiblePages?: number
}

interface Emits {
  (e: 'update:currentPage', page: number): void
}

const props = withDefaults(defineProps<Props>(), {
  maxVisiblePages: 5,
})

const emit = defineEmits<Emits>()

const isPrevDisabled = computed(() => props.currentPage === 1)
const isNextDisabled = computed(() => props.currentPage === props.totalPages)

const visiblePages = computed(() => {
  const pages: number[] = []
  const total = props.totalPages
  const current = props.currentPage
  const max = props.maxVisiblePages

  if (total <= max) {
    // Show all pages if total is less than max
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    // Calculate start and end of visible range
    let start = Math.max(1, current - Math.floor(max / 2))
    let end = start + max - 1

    if (end > total) {
      end = total
      start = Math.max(1, end - max + 1)
    }

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
  }

  return pages
})

const goToPage = (page: number) => {
  if (page >= 1 && page <= props.totalPages && page !== props.currentPage) {
    emit('update:currentPage', page)
  }
}

const previousPage = () => {
  if (!isPrevDisabled.value) {
    goToPage(props.currentPage - 1)
  }
}

const nextPage = () => {
  if (!isNextDisabled.value) {
    goToPage(props.currentPage + 1)
  }
}
</script>

<style scoped></style>
