<template>
  <div class="flex flex-col gap-3 w-[370px] shrink-0">
    <label class="relative group peer w-full valid">
      <input
        type="text"
        :value="modelValue"
        @input="handleInput"
        :placeholder="placeholder"
        class="appearance-none outline-none w-full h-14 rounded-2xl ring-[1.5px] ring-desa-background focus:ring-desa-black py-4 pl-12 pr-6 gap-2 font-medium placeholder:text-desa-secondary transition-all duration-300"
      />
      <div class="absolute transform -translate-y-1/2 top-1/2 left-4 flex size-6 shrink-0">
        <img
          src="@/assets/images/icons/user-search-secondary-green.svg"
          class="size-6 hidden group-has-[:placeholder-shown]:flex"
          alt="icon"
        />
        <img
          src="@/assets/images/icons/user-search-black.svg"
          class="size-6 flex group-has-[:placeholder-shown]:hidden"
          alt="icon"
        />
      </div>
    </label>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string
  placeholder?: string
}

interface Emits {
  (e: 'update:modelValue', value: string): void
}

withDefaults(defineProps<Props>(), {
  placeholder: 'Search...',
})

const emit = defineEmits<Emits>()

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<style scoped></style>
