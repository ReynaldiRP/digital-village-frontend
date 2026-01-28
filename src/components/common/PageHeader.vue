<template>
  <div class="flex items-center justify-between">
    <div v-if="hasSecondSegment" class="flex flex-col gap-2">
      <div class="flex gap-1 items-center leading-5 text-desa-secondary">
        <template v-for="(breadcrumb, index) in breadcrumbs" :key="index">
          <RouterLink
            :to="breadcrumb.route"
            class="last-of-type:text-desa-dark-green last-of-type:font-semibold capitalize"
          >
            {{ breadcrumb.label }}
          </RouterLink>
          <span v-if="breadcrumbs && index < breadcrumbs.length - 1">/</span>
        </template>
      </div>
      <h1 class="font-semibold text-2xl">{{ title }}</h1>
    </div>
    <h1 v-else class="font-semibold text-2xl">{{ title }}</h1>
    <div class="flex gap-3">
      <router-link
        v-if="showAddButton"
        :to="addButtonRoute"
        class="flex items-center rounded-2xl py-4 px-6 gap-[10px] bg-desa-dark-green"
      >
        <img
          src="@/assets/images/icons/add-square-white.svg"
          class="flex size-6 shrink-0"
          alt="icon"
        />
        <p class="font-medium text-white">{{ addButtonText }}</p>
      </router-link>
      <button
        v-if="showDeleteButton"
        @click="toggleModal"
        class="flex items-center rounded-2xl py-4 px-6 gap-[10px] bg-desa-red"
      >
        <p class="font-medium text-white">{{ deleteButtonText }}</p>
        <img src="@/assets/images/icons/trash-white.svg" class="flex size-6 shrink-0" alt="icon" />
      </button>
      <router-link
        v-if="showEditButton"
        :to="editButtonRoute"
        class="flex items-center rounded-2xl py-4 px-6 gap-[10px] bg-desa-black"
      >
        <p class="font-medium text-white">{{ editButtonText }}</p>
        <img src="@/assets/images/icons/edit-white.svg" class="flex size-6 shrink-0" alt="icon" />
      </router-link>
    </div>
    <div
      v-if="isModalOpen"
      id="Modal-Delete"
      class="modal fixed inset-0 h-screen z-40 flex bg-[#080C1ACC]"
    >
      <div
        id="Alert"
        class="flex flex-col w-[335px] shrink-0 rounded-2xl overflow-hidden bg-white m-auto"
      >
        <div class="flex items-center justify-between p-4 gap-3 bg-desa-black">
          <p class="font-medium leading-5 text-white">{{ deleteModalTitle }}?</p>
          <button class="btn-close-modal" @click="toggleModal">
            <img
              src="@/assets/images/icons/close-circle-white.svg"
              class="flex size-6 shrink-0"
              alt="icon"
            />
          </button>
        </div>
        <div class="flex flex-col p-4 gap-3">
          <p class="font-medium text-sm leading-[22.5px] text-desa-secondary">
            Tindakan ini permanen dan tidak bisa dibatalkan!
          </p>
          <hr class="border-desa-background" />
          <div class="flex items-center gap-3">
            <button
              class="btn-close-modal flex items-center h-14 rounded-2xl py-3 px-8 gap-[10px] border border-desa-background hover:bg-desa-black hover:text-white transition-setup"
              @click="toggleModal"
            >
              <span class="font-semibold text-sm">Batal</span>
            </button>
            <button
              class="flex items-center h-14 rounded-2xl py-3 px-8 gap-[10px] bg-desa-red w-full"
              @click="handleDelete"
            >
              <img
                src="@/assets/images/icons/trash-white.svg"
                class="flex size-6 shrink-0"
                alt=""
              />
              <span class="font-semibold text-sm text-white">Iya Hapus</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

interface Props {
  title: string
  breadcrumbs?: Array<{
    label: string
    route: string
  }>
  showAddButton?: boolean
  showEditButton?: boolean
  showDeleteButton?: boolean
  addButtonText?: string
  editButtonText?: string
  deleteButtonText?: string
  addButtonRoute?: string
  editButtonRoute?: string
  deleteModalTitle?: string
}

withDefaults(defineProps<Props>(), {
  showAddButton: false,
  showEditButton: false,
  showDeleteButton: false,
  addButtonText: 'Tambah Baru',
  editButtonText: 'Ubah Data',
  deleteButtonText: 'Hapus Data',
  addButtonRoute: '#',
  editButtonRoute: '#',
})

const route = useRoute()
const isModalOpen = ref(false)
const emit = defineEmits<{
  (e: 'delete'): void
}>()

const toggleModal = () => {
  isModalOpen.value = !isModalOpen.value
}

const hasSecondSegment = computed(() => {
  const pathSegments = route.path.split('/').filter((segment) => segment !== '')
  return pathSegments.length >= 2
})

const closeModalOnClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  const modal = document.querySelector('#Modal-Delete')

  if (modal && !modal.querySelector('#Alert')?.contains(target)) {
    isModalOpen.value = false
  }
}

watch(isModalOpen, async (newValue) => {
  if (newValue) {
    await nextTick()
    setTimeout(() => {
      document.addEventListener('click', closeModalOnClickOutside)
    }, 0)
  } else {
    document.removeEventListener('click', closeModalOnClickOutside)
  }
})

const handleDelete = () => {
  emit('delete')
  toggleModal()
}
</script>

<style scoped></style>
