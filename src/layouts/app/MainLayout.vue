<template>
  <div class="flex flex-1">
    <Sidebar />
    <main id="content" class="flex flex-1 flex-col">
      <TopBar />
      <section
        id="content"
        class="p-6 relative flex w-full flex-1 shrink-0 flex-col gap-[14px] pb-[30px]"
      >
        <RouterView />
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import Sidebar from '@/components/sidebar/SideBar.vue'
import TopBar from '@/components/TopBar.vue'
</script>

<style scoped></style>
