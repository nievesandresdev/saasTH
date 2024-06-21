<template>
    <component :is="dynamicComponent" />
</template>

<script setup>
import { computed, defineProps } from 'vue';
import SettingsMenu from '@/layout/Settings/SettingsMenu.vue';

const props = defineProps({
sidebarName: String
});

// mapeo de nombres de componentes a componentes
const componentMap = {
SettingsMenu,
};

// computed property para determinar cuál componente renderizar
const dynamicComponent = computed(() => {
return componentMap[props.sidebarName] || null;
});
</script>
  