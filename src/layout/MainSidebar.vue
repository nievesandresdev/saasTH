<template>
    <div class="group px-3 py-2 flex flex-col relative z-[600] shadow-lg bg-white h-full">
        <!-- select hotel -->
        <div class="flex flex-shrink-0 p-2 shadow-xl">
            <img class="w-6 h-8" src="/assets/icons/1.TH.logo.svg" alt="">
            <div 
                :class="`flex items-center ${widthMenu} ${displayedMenu ? 'pl-4' : 'group-hover:pl-4'}`"
            >
                <p class="text-lg font-semibold ml-2 whitespace-nowrap text-left leading-[120%]">Nombre Hotel</p>
                <img class="w-3 h-3 ml-auto" src="/assets/icons/1.TH.I.dropdown.svg" alt="">
            </div>
        </div>
        
        <div class="overflow-y-auto bg-white no-scrollbar">
            <!-- links -->
            <router-link
                class="rounded-[10px] hbg-green-200 flex items-center p-2 mt-6"
                :class="{'hbg-green-600 shadow-lg':$route.name == 'DashboardIndex','hover-gray-100':$route.name !== 'DashboardIndex'}"
                to="/dashboard"
            >
                <img class="w-6 h-6" src="/assets/icons/1.TH.DASHBOARD.svg" :class="{'icon-white':$route.name == 'DashboardIndex'}">
                <div :class="widthMenu">
                    <p class="text-sm font-semibold ml-2 whitespace-nowrap text-left leading-[120%]" :class="{'text-white':$route.name == 'DashboardIndex'}">
                        Dashboard
                    </p>
                </div>
            </router-link>
            <template v-for="(section, index) in menu_links" :key="index">
                <div 
                    :class="`mt-4 py-2.5 min-h-[40px] h-10 ${widthMenu} ${displayedMenu ? 'pl-3' : 'group-hover:pl-3'}`"
                >
                    <p class="text-sm font-semibold">
                        {{ section.title }}
                    </p>
                </div>
                <div 
                    class="rounded-[10px] hbg-green-200"
                >
                    <router-link
                        v-for="(link, indexLink) in section.group" :key="indexLink"
                        :to="link.url"
                        class="rounded-[10px] flex items-center p-2"
                        :class="{'hbg-green-600 shadow-lg':$route.fullPath.includes(link.include),'hover-gray-100':!$route.fullPath.includes(link.include)}"
                    >
                        <img class="w-6 h-6" src="/assets/icons/1.TH.DASHBOARD.svg" :class="{'icon-white':$route.fullPath.includes(link.include)}">
                        <div :class="widthMenu">
                            <p class="text-sm font-semibold ml-2 whitespace-nowrap text-left leading-[120%]" :class="{'text-white':$route.fullPath.includes(link.include)}">{{link.title}}</p>
                        </div>
                    </router-link>
                </div>
            </template>

            <!-- help, user and news -->
            <div class="mt-auto mb-4 pt-4">
                <button 
                    v-for="(button, indexButton) in user_buttons" :key="indexButton"
                    @click="button.action && button.action()"
                    class="rounded-[10px] flex items-center p-1 max-h-[40px]"
                    :class="{'hbg-green-600 shadow-lg':false,'hover-gray-100':false}"
                >
                    <img 
                        class="w-8 h-8 rounded-full" :src="button.icon"
                        :class="{'icon-white':false,'border border-white':false}"
                    >
                    <div :class="widthMenu">
                        <p 
                            class="text-sm font-semibold ml-2 text-left leading-[120%]"
                            :class="{'text-white': false}"
                        >{{button.title}}</p>
                    </div>
                </button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/modules/auth/login'

const route = useRoute();
const authStore = useAuthStore() 

const menu_links = ref([
    {
        title: 'Operación',
        group: [
            {
                title: 'Estancias',
                icon: '1.TH.DASHBOARD',
                include : '-',
                url : '/dashboard'
            },
            {
                title: 'Reseñas',
                icon: '1.TH.DASHBOARD',
                include : '-',
                url : '/dashboard'
            },
            {
                title: 'Análisis',
                icon: '1.TH.DASHBOARD',
                include : '-',
                url : '/dashboard'
            },
            
        ],
    },
    {
        title: 'Administración',
        group: [
            {
                title: 'WebApp',
                icon: '1.TH.DASHBOARD',
                include : '-',
                url : '/dashboard'
            },
            {
                title: 'Comunicaciones',
                icon: '1.TH.DASHBOARD',
                include : '-',
                url : '/dashboard'
            },
            {
                title: 'Plataformas externas',
                icon: '1.TH.DASHBOARD',
                include : '-',
                url : '/dashboard'
            },
            {
                title: 'Datos',
                icon: '1.TH.DASHBOARD',
                include : '-',
                url : '/dashboard'
            },
            {
                title: 'Equipo',
                icon: '1.TH.DASHBOARD',
                include : '/usuarios/configuracion',
                url : '/usuarios/configuracion/usuarios'
            },
        ],
    },  
])

const user_buttons = ref([
    {
        title: 'Ayuda',
        icon: '/assets/icons/1.TH.AYUDA.MM.svg',
        include : '-',
    },
    {
        title: 'Novedades',
        icon: '/assets/icons/1.TH.NOVEDADES.MM.svg',
        include : '-',
    },
    {
        title: 'Manuel Gimenez',
        icon: 'https://ui-avatars.com/api/?name=NA&color=fff&background=3D5F87',
        include : '-',
        border : true
    },
    {
        title: 'Cerrar sesión',
        icon: null, 
        include : '-',
        action: async () => {
            await authStore.logout() 
        }
    }
])

const displayedMenu = computed(() => route.meta.displayedMenu ?? false);
const widthMenu = computed(() => {
    let withStyles = 'w-0 group-hover:w-[188px] overflow-hidden transition-all duration-500 ease-in-out';
    if(displayedMenu.value){
        withStyles = 'w-[188px]';
    }
    return withStyles;
});
</script>
