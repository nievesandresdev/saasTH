<template>
    <aside class="w-full h-full flex flex-col bg-white">
        <button class="py-[23px] px-4 block">
            <h5 class="text-base font-semibold leading-[120%] text-left">{{ title }}</h5>
        </button>

        <nav class="px-4 border-b border-gray-400">
            <ul>
                <li v-for="item in menuItems" :key="item.text" class="flex items-center py-2 cursor-pointer">
                    <img :src="item.icon" class="w-6 h-6 mr-3" />
                    <span>{{ item.text }}</span>
                </li>
            </ul>
        </nav>
    </aside>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    title: {
        type: String,
        default: 'Plataforma'
    },
    menuItems: {
        type: Array,
        default: () => ([
            { text: 'Plataformas externas', icon: '/assets/icons/external-platforms.svg' },
            { text: 'Datos de clientes', icon: '/assets/icons/client-data.svg' },
            { text: 'Equipo', icon: '/assets/icons/team.svg' }
        ])
    }
});
</script>

<style scoped>
aside {
    border-right: 1px solid #e5e7eb;
}
nav ul {
    list-style-type: none;
    padding: 0;
}
nav ul li:hover {
    background-color: #f3f4f6;
}
</style>
