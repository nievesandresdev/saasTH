<template>
    <div class="px-6 flex-grow min-h-screen">
        <h1 class="text-[22px] font-medium leading-[110%] py-5 flex gap-2">
            Integraciones
            <Tooltip size="l" :top="25" :left="5">
                <template v-slot:button>
                    <img class="w-6 h-6" src="/assets/icons/info.blue.svg">
                </template>
                <template v-slot:content>
                    <p class="text-sm text-[#333333]">Aquí puedes revisar las URLs de tus plataformas externas y, si es necesario, añadir las credenciales para que podamos incluir el enlace a tu WebApp en los mensajes automáticos que lanzan las distintas plataformas cuando se genera una reserva</p>
                </template>
            </Tooltip>
        </h1>
        <hr class="mb-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div @click="openModalIntegrations('booking')" class="rounded-[10px] border border-[#E9E9E9] bg-white p-4 shadow-[0px_2px_4px_0px_rgba(0,0,0,0.15)] cursor-pointer">
                <div class="flex items-center gap-2">
                    <img src="/assets/icons/otas/Booking.svg" class="w-8 h-8">
                    <span class="text-[#333333] text-base font-medium">Booking</span>
                </div>
                <div class="flex items-center gap-2 mt-2">
                    <img src="/assets/icons/TH.CHECK.svg" class="w-[16px] h-[16px]">
                    <span class="text-[#333333] text-[12px] font-medium truncate">
                        {{ dataOTAS?.otas?.find(ota => ota.ota === 'BOOKING')?.url || 'Sin URL' }}
                    </span>
                </div>
                <div class="flex items-center gap-2 mt-2">
                    <img src="/assets/icons/1.TH.WARNING.svg" class="w-[16px] h-[16px]">
                    <span class="text-[#333333] text-[12px] font-medium">Sin credenciales</span>
                </div>
            </div>

            <div @click="openModalIntegrations('tripadvisor')" class="rounded-[10px] border border-[#E9E9E9] bg-white p-4 shadow-[0px_2px_4px_0px_rgba(0,0,0,0.15)] cursor-pointer">
                <div class="flex items-center gap-2">
                    <img src="/assets/icons/otas/Tripadvisor.svg" class="w-8 h-8">
                    <span class="text-[#333333] text-base font-medium">TripAdvisor</span>
                </div>
                <div class="flex items-center gap-2 mt-2">
                    <img src="/assets/icons/TH.CHECK.svg" class="w-[16px] h-[16px]">
                    <span class="text-[#333333] text-[12px] font-medium truncate">
                        {{ dataOTAS?.otas?.find(ota => ota.ota === 'TRIPADVISOR')?.url || 'Sin URL' }}
                    </span>
                </div>
                <div class="flex items-center gap-2 mt-2">
                    <img src="/assets/icons/1.TH.WARNING.svg" class="w-[16px] h-[16px]">
                    <span class="text-[#333333] text-[12px] font-medium">Sin credenciales</span>
                </div>
            </div>

            <div @click="openModalIntegrations('expedia')" class="rounded-[10px] border border-[#E9E9E9] bg-white p-4 shadow-[0px_2px_4px_0px_rgba(0,0,0,0.15)] cursor-pointer">
                <div class="flex items-center gap-2">
                    <img src="/assets/icons/otas/Expedia.svg" class="w-8 h-8">
                    <span class="text-[#333333] text-base font-medium">Expedia</span>
                </div>
                <div class="flex items-center gap-2 mt-2">
                    <img src="/assets/icons/TH.CHECK.svg" class="w-[16px] h-[16px]">
                    <span class="text-[#333333] text-[12px] font-medium truncate">
                        {{ dataOTAS?.otas?.find(ota => ota.ota === 'EXPEDIA')?.url || 'Sin URL' }}
                    </span>
                </div>
                <div class="flex items-center gap-2 mt-2">
                    <img src="/assets/icons/1.TH.WARNING.svg" class="w-[16px] h-[16px]">
                    <span class="text-[#333333] text-[12px] font-medium">Sin credenciales</span>
                </div>
            </div>

            <div @click="openModalIntegrations('google')" class="rounded-[10px] border border-[#E9E9E9] bg-white p-4 shadow-[0px_2px_4px_0px_rgba(0,0,0,0.15)] cursor-pointer">
                <div class="flex items-center gap-2">
                    <img src="/assets/icons/otas/Google.svg" class="w-8 h-8">
                    <span class="text-[#333333] text-base font-medium">Google</span>
                </div>
                <div class="flex items-center gap-2 mt-2">
                    <img src="/assets/icons/TH.CHECK.svg" class="w-[16px] h-[16px]">
                    <span class="text-[#333333] text-[12px] font-medium truncate">
                        {{ dataOTAS?.otas?.find(ota => ota.ota === 'GOOGLE')?.url || 'Sin URL' }}
                    </span>
                </div>
                <div class="flex items-center gap-2 mt-2">
                    <img src="/assets/icons/1.TH.WARNING.svg" class="w-[16px] h-[16px]">
                    <span class="text-[#333333] text-[12px] font-medium">Sin credenciales</span>
                </div>
            </div>

            <div @click="openModalIntegrations('airbnb')" class="rounded-[10px] border border-[#E9E9E9] bg-white p-4 shadow-[0px_2px_4px_0px_rgba(0,0,0,0.15)] cursor-pointer">
                <div class="flex items-center gap-2">
                    <img src="/assets/icons/otas/Airbnb.svg" class="w-8 h-8">
                    <span class="text-[#333333] text-base font-medium">Airbnb</span>
                </div>
                <div class="flex items-center gap-2 mt-2">
                    <img :src="dataOTAS?.otas?.find(ota => ota.ota === 'AIRBNB')?.url ? '/assets/icons/TH.CHECK.svg' : '/assets/icons/1.TH.WARNING.svg'" class="w-[16px] h-[16px]">
                    <span class="text-[#333333] text-[12px] font-medium truncate">
                        {{ dataOTAS?.otas?.find(ota => ota.ota === 'AIRBNB')?.url || 'Sin URL' }}
                    </span>
                </div>
                <div class="flex items-center gap-2 mt-2">
                    <img src="/assets/icons/1.TH.WARNING.svg" class="w-[16px] h-[16px]">
                    <span class="text-[#333333] text-[12px] font-medium">Sin credenciales</span>
                </div>
            </div>
        </div>
    </div>
    
</template>
<script setup>
import { ref, onMounted } from 'vue';
import Tooltip from '@/components/Tooltip.vue';

import { platformsExternalStore } from '@/stores/modules/platformsExternal/platformsExternal';
const platformsStore = platformsExternalStore();
const current_hotel = ref(JSON.parse(localStorage.getItem('current_hotel')));
const dataOTAS = ref([]);

const openModalIntegrations = (service) => {
    console.log('Opening modal for service:', service);
};

onMounted(async () => {
    await getSettings();
    console.log( btoa('1234567890') ); //encriptar

    console.log( atob('MTIzNDU2Nzg5MA==') ); //desencriptar
});

const getSettings = async () => {
    const params = {
        googleMapCid: current_hotel.value.code,
    };

    try {
        const response = await platformsStore.$getDataOTAS(params);
        dataOTAS.value = response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};
</script>


