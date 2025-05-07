<template>
    <div class="px-6 flex-grow min-h-screen">
        <HeaderIntegrations />
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div @click="openModalIntegrations('booking')" class="rounded-[10px] border border-[#E9E9E9] bg-white p-4 shadow-[0px_2px_4px_0px_rgba(0,0,0,0.15)] cursor-pointer">
                <div class="flex items-center gap-2">
                    <img src="/assets/icons/otas/Booking.svg" class="w-8 h-8">
                    <span class="text-[#333333] text-base font-medium">Booking</span>
                </div>
                <div class="flex items-center gap-2 mt-2">
                    <img :src="dataOTAS?.otas?.find(ota => ota.ota === 'BOOKING')?.url ? '/assets/icons/TH.CHECK.svg' : '/assets/icons/1.TH.WARNING.svg'" class="w-[16px] h-[16px]">
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
                    <img :src="dataOTAS?.otas?.find(ota => ota.ota === 'TRIPADVISOR')?.url ? '/assets/icons/TH.CHECK.svg' : '/assets/icons/1.TH.WARNING.svg'" class="w-[16px] h-[16px]">
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
                    <img :src="dataOTAS?.otas?.find(ota => ota.ota === 'EXPEDIA')?.url ? '/assets/icons/TH.CHECK.svg' : '/assets/icons/1.TH.WARNING.svg'" class="w-[16px] h-[16px]">
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
                    <img :src="dataOTAS?.otas?.find(ota => ota.ota === 'GOOGLE')?.url ? '/assets/icons/TH.CHECK.svg' : '/assets/icons/1.TH.WARNING.svg'" class="w-[16px] h-[16px]">
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

    <ModalWindow v-if="open" :isVisible="open"  :width="'440px'" padding-content="p-0" footer="true" >
        <template #content>
            <div class="flex justify-between p-4">
                <span class="text-[18px] font-medium">
                    Configura la integración con {{ selectedOtaCapitalize }}
                </span>
                <button @click="closeModalIntegration">
                    <img src="/assets/icons/1.TH.CLOSE.svg" alt="1.TH.CLOSE" class="h-6 w-6">
                </button>
            </div>
            <hr>
            <div class="p-4">
                <div class="flex flex-col gap-2 mb-4">
                    <LabelIntegrations :label="'URL de ' + selectedOtaCapitalize" :tooltip="'https://www.booking.com/hotel/es/hotel-name.html'" />
                    <BaseTextField v-model="form.url" placeholder="https://www.booking.com/hotel/es/hotel-name.html" />
                </div>
                <div class="flex flex-col gap-2 mb-4">
                    <LabelIntegrations :label="'Tu dirección de correo de ' + selectedOtaCapitalize" :tooltip="'https://www.booking.com/hotel/es/hotel-name.html'" />
                    <BaseTextField v-model="form.email" placeholder="correo@tu-hotel.com" />
                </div>
                <div class="flex flex-col gap-2 mb-4">
                    <LabelIntegrations :label="'Tu contraseña de ' + selectedOtaCapitalize" :tooltip="'https://www.booking.com/hotel/es/hotel-name.html'" />
                    <BaseTextField v-model="form.password" placeholder="Introduce tu contraseña" />
                </div>
            </div>
            <hr>
            <div class="p-4 flex justify-between">
                <button @click="closeModalIntegration" class="hbtn-tertiary text-sm font-medium underline my-auto">
                    Descartar
                </button>
                
                <button  @click="submit" class="hbtn-cta px-4 py-3 text-sm leading-[110%] font-medium">
                    Guardar
                </button>
            </div>
        </template>
    </ModalWindow>
    
</template>
<script setup>
import { ref, onMounted, computed } from 'vue';
import HeaderIntegrations from './Components/HeaderIntegrations.vue';
import ModalWindow from '@/components/ModalWindow';
import BaseTextField from '@/components/Forms/BaseTextField';
import LabelIntegrations from './Components/LabelIntegrations.vue';
import { platformsExternalStore } from '@/stores/modules/platformsExternal/platformsExternal';
const platformsStore = platformsExternalStore();


const current_hotel = ref(JSON.parse(localStorage.getItem('current_hotel')));
const dataOTAS = ref([]);
const open = ref(false);
const serviceSelected = ref(null);
const closeModalIntegration = () => {
    open.value = false;
}

const form = ref({
    url: '',
    email: '',
    password: '',
});

const openModalIntegrations = (service) => {
    console.log('Opening modal for service:', service);
    open.value = true;
    serviceSelected.value = service;
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

const selectedOtaCapitalize = computed(() => {
    return serviceSelected.value.charAt(0).toUpperCase() + serviceSelected.value.slice(1);
});

const submit = () => {
    console.log(form.value);
}

</script>


