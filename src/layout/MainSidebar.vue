<template>
    <div class="group px-3 py-2 flex flex-col relative z-[600] shadow-lg">
        <!-- select hotel -->
        <div class="flex flex-shrink-0 p-2">
            <img class="w-6 h-8" src="/assets/icons/1.TH.logo.svg" alt="">
            <div class="w-0 group-hover:w-[188px] overflow-hidden group-hover:pl-4 flex items-center transition-all duration-500 ease-in-out">
                <p class="text-lg font-semibold ml-2 whitespace-nowrap text-left leading-[120%]">Nombre Hotel</p>
                <img class="w-3 h-3 ml-auto" src="/assets/icons/1.TH.I.dropdown.svg" alt="">
            </div>
        </div>
        
        <!-- links -->
        <button 
            class="rounded-[10px] hbg-green-200 flex items-center p-2 mt-6"
            :class="{'hbg-green-600 shadow-lg':false,'hover-gray-100':!false}"
        >
            <img class="w-6 h-6" src="/assets/icons/1.TH.DASHBOARD.svg" :class="{'icon-white':false}">
            <div class="w-0 group-hover:w-[188px] overflow-hidden transition-all duration-500 ease-in-out">
                <p class="text-sm font-semibold ml-2 whitespace-nowrap text-left leading-[120%]" :class="{'text-white':false}">Dashboard</p>
            </div>
        </button>
        <template v-for="(section, index) in menu_links" :key="index">
            <div class="mt-4 py-2.5 h-10 w-0 group-hover:w-[188px] overflow-hidden group-hover:pl-3 transition-all duration-500 ease-in-out">
                <p class="text-sm font-semibold">
                    {{ section.title }}
                </p>
            </div>
            <div 
                class="rounded-[10px] hbg-green-200"
            >
                <button
                    v-for="(link, indexLink) in section.group" :key="indexLink"
                    class="rounded-[10px] flex items-center p-2"
                    :class="{'hbg-green-600 shadow-lg':link.selected,'hover-gray-100':!link.selected}"
                >
                    <img class="w-6 h-6" src="/assets/icons/1.TH.DASHBOARD.svg" :class="{'icon-white':link.selected}">
                    <div class="w-0 group-hover:w-[188px] overflow-hidden transition-all duration-500 ease-in-out">
                        <p class="text-sm font-semibold ml-2 whitespace-nowrap text-left leading-[120%]" :class="{'text-white':link.selected}">{{link.title}}</p>
                    </div>
                </button>
            </div>
        </template>

        <!-- help, user and news -->
        <div class="mt-auto mb-4">
            <button 
                v-for="(button, indexButton) in user_buttons" :key="indexButton"
                class="rounded-[10px] flex items-center p-1 max-h-[40px]"
                :class="{'hbg-green-600 shadow-lg':false,'hover-gray-100':false}"
            >
                <img 
                    class="w-8 h-8 rounded-full" :src="button.icon"
                    :class="{'icon-white':false,'border border-white':false}"
                >
                <div class="w-0 group-hover:w-[188px] overflow-hidden transition-all duration-500 ease-in-out">
                    <p 
                        class="text-sm font-semibold ml-2 text-left leading-[120%]"
                        :class="{'text-white': false}"
                    >{{button.title}}</p>
                </div>
            </button>
        </div>
        
    </div>
</template>
<script setup>
import { reactive } from 'vue'

const menu_links = reactive([
    {
        title: 'Operación',
        group: [
            {
                title: 'Estancias',
                icon: '1.TH.DASHBOARD',
                selected : false
            },
            {
                title: 'Reseñas',
                icon: '1.TH.DASHBOARD',
                selected : false
            },
            {
                title: 'Análisis',
                icon: '1.TH.DASHBOARD',
                selected : false
            },
            
        ],
    },
    {
        title: 'Administración',
        group: [
            {
                title: 'WebApp',
                icon: '1.TH.DASHBOARD',
                selected : false
            },
            {
                title: 'Comunicaciones',
                icon: '1.TH.DASHBOARD',
                selected : false
            },
            {
                title: 'Plataformas externas',
                icon: '1.TH.DASHBOARD',
                selected : false
            },
            {
                title: 'Datos',
                icon: '1.TH.DASHBOARD',
                selected : true
            },
            {
                title: 'Equipo',
                icon: '1.TH.DASHBOARD',
                selected : false
            },
        ],
    },  
])

const user_buttons = reactive([
    {
        title: 'Ayuda',
        icon: '/assets/icons/1.TH.AYUDA.MM.svg',
        selected : false
    },
    {
        title: 'Novedades',
        icon: '/assets/icons/1.TH.NOVEDADES.MM.svg',
        selected : false
    },
    {
        title: 'Manuel Gimenez',
        icon: 'https://ui-avatars.com/api/?name=NA&color=fff&background=3D5F87',
        selected : false,
        border : true
    },
])
</script>
