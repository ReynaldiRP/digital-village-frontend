<template>
  <li class="group" :class="{ active: isActive }" v-if="!item.children">
    <RouterLink
      :to="item.link"
      class="h-14 gap-2 rounded-2xl p-4 group-hover:bg-desa-foreshadow group-[.active]:bg-desa-foreshadow transition-setup flex items-center"
    >
      <div class="size-6 relative flex shrink-0" v-if="item.icon.active && item.icon.inactive">
        <img
          :src="item.icon.active"
          class="size-6 transition-setup absolute flex shrink-0 opacity-0 group-hover:opacity-100 group-[.active]:opacity-100"
          alt="icon"
        />
        <img
          :src="item.icon.inactive"
          class="size-6 transition-setup absolute flex shrink-0 opacity-100 group-hover:opacity-0 group-[.active]:opacity-0"
          alt="icon"
        />
      </div>
      <span
        class="leading-5 text-desa-secondary group-hover:text-desa-dark-green group-[.active]:text-desa-dark-green group-[.active]:font-medium transition-setup flex flex-1 text-left"
      >
        {{ item.name }}
      </span>
    </RouterLink>
  </li>

  <template v-if="item.children">
    <div class="accordion group/accordion gap-1 flex w-full flex-col">
      <button
        :data-expand="`accordion-${item.name}`"
        class="group h-14 gap-2 rounded-2xl p-4 active flex w-full shrink-0 items-center"
        @click="isOpen = !isOpen"
      >
        <div class="size-6 relative flex shrink-0">
          <img
            :src="item.icon.active"
            class="size-6 transition-setup absolute flex shrink-0 opacity-0 group-[.active]:opacity-100"
            alt="icon"
          />
          <img
            :src="item.icon.inactive"
            class="size-6 transition-setup absolute flex shrink-0 opacity-100 group-[.active]:opacity-0"
            alt="icon"
          />
        </div>
        <span
          class="leading-5 text-desa-secondary group-[.active]:text-desa-dark-green transition-setup flex flex-1 text-left"
        >
          {{ item.name }}
        </span>
        <div class="size-6 relative flex shrink-0">
          <img
            src="@/assets/images/icons/arrow-circle-dark-green-up.svg"
            class="size-6 transition-setup absolute flex shrink-0"
            alt="icon"
            v-if="isOpen"
          />
          <img
            src="@/assets/images/icons/arrow-circle-secondary-green-down.svg"
            class="size-6 transition-setup absolute flex shrink-0"
            alt="icon"
            v-else
          />
        </div>
      </button>
      <ul
        :id="`accordion-${item.name}`"
        class="flex-1r flex flex-col pl-[28px]"
        :class="{ hidden: !isOpen }"
      >
        <SidebarItem v-for="child in item.children" :key="child.id" :item="child" />
      </ul>
    </div>
  </template>
</template>

<script setup lang="ts">
import type { SidebarItem } from '@/types/index'
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps<{
  item: SidebarItem
}>()

const route = useRoute()

const isActive = computed(() => {
  return route.path === props.item.link
})

const isChildActive = computed(() => {
  if (props.item.children) {
    return props.item.children.some((child) => route.path === child.link)
  }

  return false
})

const isOpen = ref(isChildActive.value)

watch(isChildActive, () => {
  isOpen.value = isChildActive.value
  console.log(isOpen.value)
})
</script>

<style scoped></style>
