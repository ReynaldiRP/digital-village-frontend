<template>
  <button
    :data-content="value"
    class="tab-btn group"
    :class="{ active: isActive }"
    @click="handleClick"
    type="button"
  >
    <div
      class="flex items-center justify-center rounded-full border border-desa-background py-[14px] px-[18px] group-hover:bg-desa-black group-[.active]:bg-desa-black transition-setup"
    >
      <span
        class="font-medium leading-5 text-desa-secondary group-hover:text-white group-[.active]:text-white transition-setup"
      >
        {{ label }}
      </span>
    </div>
  </button>
</template>

<script setup lang="ts">
interface Props {
  label: string
  value: string
  isActive?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isActive: false,
})

const emit = defineEmits<{
  click: [value: string]
}>()

const handleClick = () => {
  emit('click', props.value)
}
</script>

<style scoped></style>
