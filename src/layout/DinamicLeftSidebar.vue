<template>
    <component :is="dynamicComponent" />
</template>

<script setup>
import { computed, defineProps } from 'vue';
import SettingsLayout from '@/layout/Settings/SettingsLayout.vue';

const props = defineProps({
sidebarName: String
});

// mapeo de nombres de componentes a componentes
const componentMap = {
SettingsLayout,
};

// computed property para determinar cuál componente renderizar
const dynamicComponent = computed(() => {
return componentMap[props.sidebarName] || null;
});
</script>
  