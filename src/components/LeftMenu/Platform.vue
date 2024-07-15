<template>
    <aside class="w-full h-full flex flex-col bg-white shadow-custom">
        <button class="py-[23px] px-4 block">
            <h5 class="text-base font-semibold leading-[120%] text-left">{{ title }}</h5>
        </button>

        <nav class="px-4">
            <ul>
                <li 
                    v-for="item in menuItems" 
                    :key="item.text" 
                    class="menu-item relative rounded-lg flex flex-col" 
                    @click="toggleSubmenu(item.text)"
                    :class="{ 'active': isActiveSubmenu(item.text) }"
                >
                    <div class="flex items-center justify-between w-full">
                        <div class="flex items-center">
                            <img :src="item.icon" class="w-6 h-6 mr-3" />
                            <span class="text-sm font-medium">{{ item.text }}</span>
                        </div>
                        <img v-if="item.text === 'Equipo'" src="/assets/icons/1.TH.I.dropdown.svg" :class="{'rotate-180': showSubmenu || isActiveSubmenu(item.text), 'transition-transform': true, 'duration-300': true}" class="w-4 h-4 ml-3" />
                    </div>
                </li>
                <transition name="fade">
                    <ul v-if="showSubmenu || isActiveSubmenu('Equipo')" class="submenu mt-2">
                        <router-link tag="li" to="/equipo/configuracion/usuarios" class="submenu-item py-2 pl-6" :class="{ 'submenu-item-active': route.path === '/equipo/configuracion/usuarios' }">Empleados</router-link>
                        <router-link tag="li" to="/equipo/configuracion/notificaciones" class="submenu-item py-2 pl-6" :class="{ 'submenu-item-active': route.path === '/equipo/configuracion/notificaciones' }">Notificaciones</router-link>
                    </ul>
                </transition>
            </ul>
        </nav>
    </aside>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const title = 'Plataforma';
const menuItems = [
    { text: 'Plataformas externas', icon: '/assets/icons/1.TH.PLATAFORMAS.EXTERNAS.svg' },
    { text: 'Datos de clientes', icon: '/assets/icons/1.TH.EQUIPO.svg' },
    { text: 'Equipo', icon: '/assets/icons/1.TH.EQUIPO.svg' }
];

const showSubmenu = ref(false);
const route = useRoute();

const toggleSubmenu = (itemText) => {
    if (itemText === 'Equipo') {
        if (showSubmenu.value && !isActiveSubmenu(itemText)) {
            showSubmenu.value = false;
        } else {
            showSubmenu.value = !showSubmenu.value;
        }
    }
};

const isActiveSubmenu = (itemText) => {
    if (itemText === 'Equipo') {
        return route.path.startsWith('/equipo/configuracion/usuarios') || route.path.startsWith('/equipo/configuracion/notificaciones');
    }
    return false;
};
</script>

<style scoped>
aside {
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.15);
}
nav ul {
    list-style-type: none;
    padding: 0;
}
.menu-item {
    display: flex;
    align-items: center;
    padding: 10px 12px;
    cursor: pointer;
    transition: background-color 0.3s;
}
.menu-item:hover {
    background-color: #ECF9F5;
    border-radius: 0.5rem; /* rounded-lg */
}
.menu-item.active {
    background-color: #ECF9F5;
}
.submenu {
    list-style-type: none;
    padding: 0;
    margin-left: 2rem;
}
.submenu-item {
    position: relative;
    padding-left: 1rem;
    display: flex;
    align-items: center;
}
.submenu-item::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    height: 25px;
    width: 4px;
    background-color: transparent; /* Por defecto, el fondo es transparente */
    border-radius: 9999px; /* rounded-full */
    z-index: 10; /* Coloca el borde verde por encima del borde gris */
}
.submenu-item-active::before {
    background-color: #0B6357; /* Aplica el color verde cuando la URL está activa */
}
.submenu-item::after {
    content: '';
    position: absolute;
    top: 0;
    left: 1.5px; /* Centra el borde gris en el borde verde */
    height: 100%;
    width: 1px;
    background-color: #bfbfbf;
    z-index: 5; /* Coloca el borde gris detrás del borde verde */
}
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0;
}
</style>
