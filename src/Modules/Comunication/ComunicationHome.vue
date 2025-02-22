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
    <section class="px-6 mt-[24px] mb-6">
        <div class="w-full flex justify-start">
            <div class="grid grid-cols-3 gap-6 pr-[150px]  3xl:grid-cols-5 3xl:pr-0 max-w-[1920px]">
                <CardSectionHome title="Te damos la bienvenida">
                    <template #msg>Cuando un huésped cree su estancia en un {{$formatTypeLodging()}} de tu cuenta, recibirá este mensaje.</template>
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
                            Ver Detalles
                        </a>
                    </template>
                </CardSectionHome>
                <CardSectionHome title="Prepara tu llegada">
                    <template #msg>Este es el mensaje que recibirán tus huéspedes faltando 2 días para su llegada a tu {{$formatTypeLodging()}}.</template>
                    <template #canal>
                        <div class="h-full w-full py-2">
                            <img class="mx-auto w-6 h-6" src="/assets/icons/material-symbols-light_mail-outline.svg" alt="">
                        </div>
                    </template>
                    <template #button>
                        <a 
                            href="javascript:void(0)" 
                            class="hbtn-primary p-2 text-xs font-semibold leading-[114%] h-8"
                            @click="openSidePanel('prepareYourArrival')"
                        >
                            Ver Detalles
                        </a>
                    </template>
                </CardSectionHome>
                <CardSectionHome title="¿Qué tal va todo?">
                    <template #msg>Conocerás cómo se sienten tus huéspedes durante su estancia y les harás recomendaciones.</template>
                    <template #canal>
                        <div class="h-full w-full py-2">
                            <img class="mx-auto w-6 h-6" src="/assets/icons/material-symbols-light_mail-outline.svg" alt="">
                        </div>
                    </template>
                    <template #button>
                        <a 
                            href="javascript:void(0)" 
                            class="hbtn-primary p-2 text-xs font-semibold leading-[114%] h-8"
                            @click="openSidePanel('howGoing')"
                        >
                            Ver Detalles
                        </a>
                    </template>
                </CardSectionHome>
                <CardSectionHome title="Gracias por elegirnos">
                    <template #msg>Enviarás a tus huéspedes un cálido mensaje de despedida y agradecimiento por su estancia.</template>
                    <template #canal>
                        <div class="h-full w-full py-2">
                            <img class="mx-auto w-6 h-6" src="/assets/icons/material-symbols-light_mail-outline.svg" alt="">
                        </div>
                    </template>
                    <template #button>
                        <a 
                            href="javascript:void(0)" 
                            class="hbtn-primary p-2 text-xs font-semibold leading-[114%] h-8"
                            @click="openSidePanel('thankChoosing')"
                        >
                            Ver Detalles
                        </a>
                    </template>
                </CardSectionHome>
                <CardSectionHome title="Te esperamos de vuelta">
                    <template #msg>Recuerda a tus huéspedes de su experiencia y motívalos a regresar.</template>
                    <template #canal>
                        <div class="h-full w-full py-2">
                            <img class="mx-auto w-6 h-6" src="/assets/icons/material-symbols-light_mail-outline.svg" alt="">
                        </div>
                    </template>
                    <template #button>
                        <a 
                            href="javascript:void(0)" 
                            class="hbtn-primary p-2 text-xs font-semibold leading-[114%] h-8"
                            @click="openSidePanel('youBack')"
                        >
                            Ver Detalles
                        </a>
                    </template>
                </CardSectionHome>
            </div>
        </div>
    </section>

    <section class="px-6 mt-[24px] mb-20">
        <div class="flex items-center gap-2">
            <h2 class="text-lg font-medium leading-[120%] whitespace-nowrap">Mensajes eventuales</h2>
            <div class="flex-1 border-b border-[#BFBFBF]"></div>
        </div>

        <div class="w-full flex justify-start">
            <div class="grid grid-cols-3 gap-6 pr-[150px]  3xl:grid-cols-5 3xl:pr-0 max-w-[1920px]">
                <CardSectionHome title="Aviso de mensaje en chat">
                    <template #msg>Se utiliza para avisarle al huésped que tiene un mensaje no leído.</template>
                    <template #canal>
                        <div class="h-full w-full py-2">
                            <img class="mx-auto w-6 h-6" src="/assets/icons/material-symbols-light_mail-outline.svg" alt="">
                        </div>
                    </template>
                    <template #button>
                        <a 
                            href="javascript:void(0)" 
                            class="hbtn-primary p-2 text-xs font-semibold leading-[114%] h-8"
                            @click="openSidePanel('warningMsg')"
                        >
                            Ver Detalles
                        </a>
                    </template>
                </CardSectionHome>
                <!-- <CardSectionHome title="Check-in Huésped - Huésped" :multichannel="['material-symbols-light_mail-outline','Frame 2613489','Frame 2613488','Frame 2613557']">
                    <template #msg>Tus huéspedes podrán invitarse entre sí a realizar su Check-in online en tu WebApp</template>
                    <template #canal>
                        <div class="h-full w-full py-2">
                            <img class="mx-auto w-6 h-6" src="/assets/icons/material-symbols-light_mail-outline.svg" alt="">
                        </div>
                    </template>
                    <template #button>
                        <a 
                            href="javascript:void(0)" 
                            class="hbtn-primary p-2 text-xs font-semibold leading-[114%] h-8"
                            @click="openSidePanel('checkInGuestGuest')"
                        >
                            Ver Detalles
                        </a>
                    </template>
                </CardSectionHome> -->
                <!-- <CardSectionHome title="Programa de referidos" :multichannel="['material-symbols-light_mail-outline','Frame 2613488','Frame 2613489','Frame 2613557']">
                    <template #msg>Tus huéspedes podrán participar de un programa de referidos, compartiendo sus códigos.</template>
                    <template #canal>
                        <div class="h-full w-full py-2">
                            <img class="mx-auto w-6 h-6" src="/assets/icons/material-symbols-light_mail-outline.svg" alt="">
                        </div>
                    </template>
                    <template #button>
                        <a 
                            href="javascript:void(0)" 
                            class="hbtn-primary p-2 text-xs font-semibold leading-[114%] h-8"
                            @click="openSidePanel('referrals')"
                        >
                            Ver Detalles
                        </a>
                    </template>
                </CardSectionHome> -->
                <CardSectionHome title="Referente - Código de regalo" >
                    <template #msg>Tus huéspedes recibirán un regalo cuando uno de sus referidos utilice su código de programa de referidos.</template>
                    <template #canal>
                        <div class="h-full w-full py-2">
                            <img class="mx-auto w-6 h-6" src="/assets/icons/material-symbols-light_mail-outline.svg" alt="">
                        </div>
                    </template>
                    <template #button>
                        <a 
                            href="javascript:void(0)" 
                            class="hbtn-primary p-2 text-xs font-semibold leading-[114%] h-8"
                            @click="openSidePanel('referent')"
                        >
                            Ver Detalles
                        </a>
                    </template>
                </CardSectionHome>
            </div>
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
