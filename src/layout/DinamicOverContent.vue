<template>
    <component :is="dynamicComponent" v-bind="props" />
</template>

<script setup>
import { computed, defineProps } from 'vue';
import HeaderOfStaysContent from '@/Modules/Stay/components/HeadDetail.vue';

const props = defineProps({
    headerName: String
});

const componentMap = {
    HeaderOfStaysContent,
};

const dynamicComponent = computed(() => {
    return componentMap[props.headerName] || null;
});
</script>
