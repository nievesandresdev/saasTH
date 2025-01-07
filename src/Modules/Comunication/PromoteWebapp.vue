<template>
    
    <!-- title section -->
    <section class="px-6">
        <div class="py-5 border-b hborder-gray-400">
            <div class="flex items-center justify-between">
                <!-- title -->
                <div class="flex items-center gap-2">
                    <h1 class="text-[22px] font-medium leading-[110%]">Promociona tu WebApp</h1>
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
                                Conoce los canales y plataformas para promocionar la WebApp de tu hotel y atraer más huéspedes.
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

    <section class="px-6 mt-6 mb-20">
        <div class="flex justify-start gap-6 mt-6 flex-wrap">
            <CardSectionHome title="Desde tu OTA "  period="pre-stay">
                <template #msg>Aquí verás el mensaje que puedes incluir en el e-mail de confirmación de reserva para tus huéspedes.</template>
                <template #canal><h1 class="text-[10px] font-bold leading-[396%] text-center">OTA</h1></template>
                <template #button>
                    <router-link :to="{ name : 'comunicationInvitationByBooking'}"
                        class="hbtn-primary p-2 text-xs font-semibold leading-[114%] h-8"
                    >
                        Instrucciones
                    </router-link>
                </template>
            </CardSectionHome>
            <CardSectionHome title="Desde tu PMS"  period="pre-stay">
                <template #msg>Aquí verás el mensaje que puedes incluir en el e-mail de confirmación de reserva en tu PMS.</template>
                <template #canal><h1 class="text-[10px] font-bold leading-[396%] text-center">PMS</h1></template>
                <template #button>
                    <router-link :to="{ name : 'ComunicationFromPMS'}"
                        class="hbtn-primary p-2 text-xs font-semibold leading-[114%] h-8"
                    >
                        Instrucciones
                    </router-link>
                </template>
            </CardSectionHome>
            <CardSectionHome title="Señalética" period="stay">
                <template #msg>Utiliza medios físicos con un código QR para promocionar el acceso a tu WebApp.</template>
                <template #canal>
                    <div class="h-full w-full py-2.5">
                        <img class="mx-auto w-5 h-5" src="/assets/icons/1.TH.QR.svg" alt="">
                    </div>
                </template>
                <template #button>
                    <router-link :to="{ name : 'ComunicationSignage'}"
                        class="hbtn-primary p-2 text-xs font-semibold leading-[114%] h-8"
                    >
                        Instrucciones
                    </router-link>
                </template>
            </CardSectionHome>
            <CardSectionHome title="Código QR en TV" period="stay">
                    <template #msg>Ofrece acceso a tu WebApp desde las pantallas de los televisores de tu alojamiento.</template>
                    <template #canal>
                        <div class="h-full w-full py-2.5">
                            <img class="mx-auto w-5 h-5" src="/assets/icons/2.TH.ÍCONOS.COMUNICACIONES.PC.svg" alt="">
                        </div>
                    </template>
                    <template #button>
                        <router-link :to="{ name : 'ComunicationFromQRTV'}"
                            class="hbtn-primary p-2 text-xs font-semibold leading-[114%] h-8 block"
                        >
                            Instrucciones
                        </router-link>
                    </template>
            </CardSectionHome>
            <CardSectionHome title="Desde tu Web" period="pre-stay" special>
                <template #msg>Incluye en tu sitio web un enlace de invitación a tu WebApp.</template>
                <template #canal>
                    <div class="h-full w-full py-2.5">
                        <img class="mx-auto w-5 h-5" src="/assets/icons/2.TH.ÍCONOS.COMUNICACIONES.WEB.svg" alt="">
                    </div>
                </template>
                <template #button>
                    <router-link :to="{ name : 'ComunicationFromYourWeb'}"
                        class="hbtn-primary p-2 text-xs font-semibold leading-[114%] h-8 block"
                    >
                        Instrucciones
                    </router-link>
                </template>
            </CardSectionHome>

            <CardSectionHome title="Invitar huésped a WebApp" special>
                <template #msg>Invita a tus huéspedes a tu WebApp por correo electrónico.</template>
                <template #canal>
                    <div class="h-full w-full py-2">
                        <img class="mx-auto w-6 h-6" src="/assets/icons/material-symbols-light_mail-outline.svg" alt="">
                    </div>
                </template>
                <template #button>
                    <a 
                        href="javascript:void(0)" 
                        class="hbtn-primary p-2 text-xs font-semibold leading-[114%] h-8 block"
                        @click="openSidePanel('manualInvitation')"
                    >
                        Ver detalles
                    </a>
                </template>
            </CardSectionHome>
            <CardSectionHome title="Invitación entre huéspedes" :multichannel="['material-symbols-light_mail-outline','Frame 2613488','Frame 2613489','Frame 2613557']">
                <template #msg>Tus huéspedes podrán invitar a otros a unirse a tu WebApp a través de varios medios.</template>
                <template #canal>
                    <div class="h-full w-full py-2">
                        <img class="mx-auto w-6 h-6" src="/assets/icons/1.TH.MOBILE2.svg" alt="">
                    </div>
                </template>
                <template #button>
                    <a 
                        href="javascript:void(0)" 
                        class="hbtn-primary p-2 text-xs font-semibold leading-[114%] h-8 block"
                        @click="openSidePanel('betweenGuests')"
                    >
                    Ver detalles
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
