<template>
    
    <!-- title section -->
    <section class="px-6">
        <div class="py-5 border-b hborder-gray-400">
            <div class="flex items-center justify-between">
                <!-- title -->
                <div class="flex items-center gap-2">
                    <h1 class="text-[22px] font-medium leading-[110%]">Comunicaciones</h1>
                    <BaseTooltipResponsive
                        size="l"
                        :top="30"
                        :left="0"
                    >
                        <template #button>
                            <img class="w-5 h-5" src="/assets/icons/TH.INFO.GREEN.svg">
                        </template>
                        <template #content>
                            <p class="text-sm leading-[150%] font-normal">
                                En esta sección podrás ver todas las vías e impactos de comunicación, para configurarlas o ver las instrucciones sobre como aplicarlas a tu alojamiento.
                            </p>
                        </template>
                    </BaseTooltipResponsive>
                </div>
                <div class="flex items-center gap-2">
                    <h2 class="font-semibold text-sm leading-[120%]">Idiomas</h2>
                    <TooltipLanguages
                        size="l"
                        :top="30"
                        :right="0"
                    >
                        <template #button>
                            <img class="w-5 h-5" src="/assets/icons/TH.INFO.GREEN.svg">
                        </template>
                    </TooltipLanguages>
                </div>
            </div>
        </div>
    </section>

    <!-- promotion section -->
    <section class="px-6 mt-[48px] mb-20">
        <div class="flex justify-start gap-6 mt-6">
            <CardSectionHome title="Bienvenida">
                <template #msg>El mensaje que recibirán tus huéspedes al acceder a tu WebApp por primera vez.</template>
                <template #canal>
                    <div class="h-full w-full py-2">
                        <img class="mx-auto w-6 h-6" src="/assets/icons/material-symbols-light_mail-outline.svg" alt="">
                    </div>
                </template>
                <template #button>
                    <a 
                        href="javascript:void(0)" 
                        class="hbtn-primary p-2 text-xs font-semibold leading-[114%] h-8"
                        @click="openSidePanel('welcomeMsg')"
                    >
                        Configurar
                    </a>
                </template>
            </CardSectionHome>
            <CardSectionHome title="Recordatorio: Chat" period="stay" special>
                <template #msg>Podrás recordarles a tus huéspedes sobre mensajes no respondidos en la WebApp.</template>
                <template #canal>
                    <div class="h-full w-full py-2">
                        <img class="mx-auto w-6 h-6" src="/assets/icons/material-symbols-light_mail-outline.svg" alt="">
                    </div>
                </template>
                <template #button>
                    <a 
                        href="javascript:void(0)" 
                        class="hbtn-primary p-2 text-xs font-semibold leading-[114%] h-8"
                        @click="openSidePanel('reminderChatMsg')"
                    >
                        Configurar
                    </a>
                </template>
            </CardSectionHome>
        </div>
    </section>

    <section class="px-6 mt-[48px] mb-20">
        <h2 class="text-lg font-medium leading-[120%]">Mensajes eventuales</h2>
        <div class="flex justify-start gap-6 mt-6">
            <CardSectionHome title="Bienvenida">
                <template #msg>El mensaje que recibirán tus huéspedes al acceder a tu WebApp por primera vez.</template>
                <template #canal>
                    <div class="h-full w-full py-2">
                        <img class="mx-auto w-6 h-6" src="/assets/icons/material-symbols-light_mail-outline.svg" alt="">
                    </div>
                </template>
                <template #button>
                    <a 
                        href="javascript:void(0)" 
                        class="hbtn-primary p-2 text-xs font-semibold leading-[114%] h-8"
                        @click="openSidePanel('welcomeMsg')"
                    >
                        Configurar
                    </a>
                </template>
            </CardSectionHome>
            <CardSectionHome title="Recordatorio: Chat" period="stay" special>
                <template #msg>Podrás recordarles a tus huéspedes sobre mensajes no respondidos en la WebApp.</template>
                <template #canal>
                    <div class="h-full w-full py-2">
                        <img class="mx-auto w-6 h-6" src="/assets/icons/material-symbols-light_mail-outline.svg" alt="">
                    </div>
                </template>
                <template #button>
                    <a 
                        href="javascript:void(0)" 
                        class="hbtn-primary p-2 text-xs font-semibold leading-[114%] h-8"
                        @click="openSidePanel('reminderChatMsg')"
                    >
                        Configurar
                    </a>
                </template>
            </CardSectionHome>
        </div>
    </section>

    <SidePanel />
</template>
<script setup>
import { ref, provide, onMounted } from 'vue'
import BaseTooltipResponsive from "@/components/BaseTooltipResponsive.vue";
import TooltipLanguages from "@/components/TooltipLanguages.vue";
import CardSectionHome from "./CardSectionHome.vue";
import SidePanel from "./components/SidePanel.vue";

import { useHotelStore } from '@/stores/modules/hotel';
const hotelStorage = useHotelStore();

const isOpenSidePanel = ref(false)
const conceptPanel = ref(null)
const maskEmail = ref("no-reply@thehoster.es")

const openSidePanel = (concept) =>{
    conceptPanel.value = concept;
    isOpenSidePanel.value = true;
}

onMounted(async() => {
    // {subdomain: sessionStorage.getItem('current_subdomain')}
    let dataHotel = await hotelStorage.$findByParams()
    if(dataHotel.sender_mail_mask){
        maskEmail.value = dataHotel.sender_mail_mask;
    }
})


provide('isOpenSidePanel',isOpenSidePanel)
provide('conceptPanel',conceptPanel)
provide('maskEmail',maskEmail)
</script>
