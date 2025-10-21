<template>
    <div class="gap-2 flex flex-col">
        <div class="relative">
            <input
                :placeholder="placeholder"
                :type="type"
                :model-value="modelValue"
                @input="handleInput"
                class="peer rounded-2xl pr-4 border-desa-background font-medium leading-5 focus:ring-desa-dark-green placeholder:leading-5 placeholder:text-desa-secondary placeholder:font-medium h-[56px] w-full border-[1.5px] pl-[48px] transition-all duration-300 focus:ring-[1.5px] focus:outline-none"
                :class="{ 'border-red-500': errorMessage }"
            />
            <img
                :src="icon"
                alt="icon"
                class="size-6 left-4 absolute top-1/2 shrink-0 -translate-y-1/2 opacity-0 transition-all duration-300 peer-placeholder-shown:opacity-100"
            />
            <img
                :src="filledIcon"
                alt="icon"
                class="size-6 left-4 absolute top-1/2 shrink-0 -translate-y-1/2 opacity-100 transition-all duration-300 peer-placeholder-shown:opacity-0"
            />
        </div>

        <span class="text-red-700 text-left text-[12px]" v-if="errorMessage">
            {{ errorMessage }}
        </span>
    </div>
</template>

<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        modelValue: string;
        type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'file' | 'radio';
        placeholder?: string;
        errorMessage?: string;
        icon: string;
        filledIcon: string;
    }>(),
    {
        type: 'text',
        placeholder: '',
        errorMessage: '',
    },
);

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
}>();

const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    emit('update:modelValue', target.value);
};
</script>

<style scoped></style>
