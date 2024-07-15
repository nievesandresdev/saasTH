<template>
    <component :is="dynamicComponent" />
</template>

<script setup>
import { computed, defineProps } from 'vue';
import SidebarMockup from '@/layout/Settings/SidebarMockup.vue'
import SideStayFeedback from './Guest/SideStayFeedback.vue'
const props = defineProps({
    sidebarName: String
});

// mapeo de nombres de componentes a componentes
const componentMap = {
    SidebarMockup,
    SideStayFeedback
};

// computed property para determinar cuál componente renderizar
const dynamicComponent = computed(() => {
return componentMap[props.sidebarName] || null;
});
</script>
  