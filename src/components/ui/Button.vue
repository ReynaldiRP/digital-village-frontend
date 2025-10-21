<template>
    <button :type="type"
    class="py-[18px] flex justify-center items-center bg-desa-dark-green rounded-2xl font-medium loading-5 text-white"
    :disabled="loading"
    >
        <span v-if="!loading">{{ label }}</span>
        <span v-else>Loading...</span>
    </button>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
    label: string;
    type: 'button' | 'submit' | 'reset';
    loading: boolean;
}>(),
    {
        type: 'button',
        loading: false,
    }
)
</script>

<style scoped>

</style>