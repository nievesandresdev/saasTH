<template>
    <div class="px-6">
        <div class="flex items-center gap-2 border-b py-5 border-gray-400">
            <h1 class="text-[22px] font-medium leading-[110%]">Marketplace</h1>
            <div class="">
                <Tooltip
                    size="m"
                    :top="25"
                    :left="0"
                >
                    <template v-slot:button>
                        <img class="w-6 h-6" src="/assets/icons/info.blue.svg">
                    </template>
                    <template v-slot:content>
                        <p class="text-sm">
                            Aquí podrás descubrir y activar funcionalidades que mejoran la experiencia de tus huéspedes y optimizan la gestión de tu alojamiento.
                        </p>
                    </template>
                </Tooltip>
            </div>
        </div>
        
        <div class="mt-6 flex items-center gap-6">
            <div 
                v-for="item in modules" 
                class="card-service bg-white rounded-[10px] shadow-hoster p-4 cursor-pointer"
                @click="openModal = item.name"
            >
                <div class="flex items-center gap-2">
                    <img class="w-8 h-8" :src="item.icon" alt="">
                    <h4 class="text-[16px] font-medium leading-[140%]">{{ item.name }}</h4>
                </div>
                <p class="text-[14px] leading-[140%] mt-2">
                    {{ item.description }}
                </p>
                <div class="mt-2 flex items-center">
                    <div 
                        v-if="item.active"
                        class="rounded-full flex items-center px-2 h-4 bg-[#D9F2E9]"
                    >
                        <img class="w-3 h-3 mr-[2px]" src="/assets/icons/TH.CHECK.svg" alt="">
                        <p class="text-[10px] font-semibold leading-[130%]">Activo</p>
                    </div>
                    <p class="ml-auto text-[12px] font-medium leading-[130%]">GRATIS</p>
                </div>
            </div>
        </div>
    </div>
    <ActiveModalChat />
    <ActiveModalCheckin />
    <ActiveModalReviews />
</template>
<script setup>
import { computed, provide, ref } from 'vue'
import Tooltip from '@/components/Tooltip.vue'
import ActiveModalChat from './components/ActiveModalChat.vue'
import ActiveModalCheckin from './components/ActiveModalCheckin.vue'
import ActiveModalReviews from './components/ActiveModalReviews.vue'
import { $formatTypeLodging } from '@/utils/helpers'
//stores
import { useHotelStore } from '@/stores/modules/hotel'
const hotelStore = useHotelStore();

const openModal = ref(null)

provide('openModal', openModal)
const modules = computed(() => [
    {
        name: 'Chat',
        icon: '/assets/icons/1.TH.chat-fill-green.svg',
        description: 'Tus huéspedes podrán comunicarse directamente con el staff de tu '+$formatTypeLodging()+' a través de la WebApp',
        active: hotelStore.hotelData.chat_service_enabled,
    },
    {
        name: 'Check-in',
        icon: '/assets/icons/1.TH.checkin-fill-green.svg',
        description: 'Permite que tus huéspedes completen su proceso de registro online desde la WebApp antes de su llegada',
        active: hotelStore.hotelData.checkin_service_enabled,
    },  
    {
        name: 'Reseñas',
        icon: '/assets/icons/1.TH.reseñas-fill.svg',
        description: 'Gestiona y genera las reseñas de tus huéspedes desde un único lugar, centralizando la reputación de tu '+$formatTypeLodging(),
        active: hotelStore.hotelData.reviews_service_enabled,
    },
])
</script>
<style scoped>
.card-service {
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.15);
    width: 360px;
    height: 156px;
}

.card-service:hover {
    box-shadow: 0px 3.5px 7px 0px rgba(0, 0, 0, 0.15);
}
</style>

