<template>
    
    <!-- title section -->
    <section class="px-6">
        <div class="py-5 border-b hborder-gray-400">
            <div class="flex items-center justify-between">
                <!-- title -->
                <div class="flex items-center gap-2">
                    <h1 class="text-[22px] font-medium leading-[110%]">Comunicaciones</h1>
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
        <div class="flex flex-col w-full mb-6 gap-2">
            <p class="text-[16px] leading-[120%] font-semibold">
                Gestiona la comunicación con tus huéspedes en cada etapa de su estancia.
            </p>
            <p class="text-[14px] leading-[140%] font-normal">
                Aquí encontrarás todos los mensajes automáticos que recibirán, antes, durante y después de su estancia.<br>
                Configura su envío y optimiza cada impacto para mejorar la experiencia de tus huéspedes y potenciar su experiencia en tu alojamiento.
            </p>
        </div>
        <div class="w-full flex justify-start">
            <div class="grid grid-cols-3 gap-6 pr-[150px]  3xl:grid-cols-5 3xl:pr-0 max-w-[1920px]">
                <CardSectionHome title="Te damos la bienvenida" padding="p-4" communication>
                    <template #toggle>
                        <small class="text-[10px] font-semibold opacity-50 cursor-not-allowed">Activo</small>
                        <BaseSwichInput
                            v-model="toggleOptions.welcome_email"
                            @update:modelValue="(val) => updateTogglecommunication('welcome_email', val)"
                            :id="`welcome_email`"
                            :disabled="true"
                        />
                    </template>
                    <template #msg>Cuando tus huéspedes accedan por primera vez a la WebApp, recibirán este mensaje de bienvenida.</template>
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
                <CardSectionHome title="¿Todo listo huésped?" padding="p-4" communication>
                    <template #toggle>
                        <small class="text-[10px] font-semibold">Activo</small>
                        <BaseSwichInput
                            v-model="toggleOptions.pre_checkin_email"
                            @update:modelValue="(val) => updateTogglecommunication('pre_checkin_email', val)"
                            :id="`pre_checkin_email`"
                        />
                    </template>
                    <template #msg>Faltando 2 días para su check-in, les enviaremos este email con información clave.</template>
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
                <CardSectionHome title="¿Cómo va todo?" padding="p-4">
                    <template #toggle>  
                        <small class="text-[10px] font-semibold">Activo</small>
                        <BaseSwichInput
                            v-model="toggleOptions.post_checkin_email"
                            @update:modelValue="(val) => updateTogglecommunication('post_checkin_email', val)"
                            :id="`post_checkin_email`"
                        />
                    </template>
                    <template #msg>A las 24 horas de su llegada, este mensaje te ayudará a medir su satisfacción en tiempo real.</template>
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
                <CardSectionHome title="Gracias por elegirnos" padding="p-4" communication>
                    <template #toggle>  
                        <small class="text-[10px] font-semibold">Activo</small>
                        <BaseSwichInput
                            v-model="toggleOptions.checkout_email"
                            @update:modelValue="(val) => updateTogglecommunication('checkout_email', val)"
                            :id="`checkout_email`"
                        />
                    </template>
                    <template #msg>Al momento del check-out, recibirán un mensaje de agradecimiento y despedida.</template>
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
                <CardSectionHome title="Te esperamos de vuelta" padding="p-4" communication>
                    <template #toggle>  
                        <small class="text-[10px] font-semibold">Activo</small>
                        <BaseSwichInput
                            v-model="toggleOptions.pre_checkout_email"
                            @update:modelValue="(val) => updateTogglecommunication('pre_checkout_email', val)"
                            :id="`pre_checkout_email`"
                        />
                    </template>
                    <template #msg>Dos días después de su partida, este recordatorio los invitará a regresar.</template>
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

        <div class="w-full flex justify-start mt-6">
            <div class="grid grid-cols-3 gap-6 pr-[150px]  3xl:grid-cols-5 3xl:pr-0 max-w-[1920px]">
                <CardSectionHome title="Aviso de mensaje en chat" padding="p-4" communication>
                    <template #toggle>
                        <small class="text-[10px] font-semibold">Activo</small>
                        <BaseSwichInput
                            v-model="toggleOptions.new_chat_email"
                            @update:modelValue="(val) => updateTogglecommunication('new_chat_email', val)"
                            :id="`new_chat_email`"
                        />
                    </template>
                    
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
                <CardSectionHome title="Referente - Código de regalo" padding="p-4" communication>
                    <template #toggle>
                        <span class="text-[10px] font-semibold">Activo</span>
                        <BaseSwichInput
                            v-model="toggleOptions.referent_email"
                            @update:modelValue="(val) => updateTogglecommunication('referent_email', val)"
                            :id="`referent_email`"
                        />
                    </template>
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
    <ChangesBar 
        :existingChanges="changes"
        :validChanges="changes"
        @cancel="cancelChange" 
        @submit="handlesubmitData"
       
    />

    <ModalNoSave
        :id="'not-saved'"
        :open="changes"
        title="¿Salir sin guardar?"
        text="Si sales sin guardar, los cambios que has realizado en esta sección se perderán."
        textbtn="Guardar"
        @saveChanges="handlesubmitData"
        type="save_changes"
    />
</template>
<script setup>
import { ref, provide, onMounted, computed } from 'vue'
import TooltipLanguages from "@/components/TooltipLanguages.vue";
import CardSectionHome from "./CardSectionHome.vue";
import SidePanel from "./components/SidePanel.vue";
import BaseSwichInput from "@/components/Forms/BaseSwichInput.vue";
import ChangesBar from '@/components/Forms/ChangesBar.vue'
import ModalNoSave from '@/components/ModalNoSave.vue';

import { useHotelStore } from '@/stores/modules/hotel';
const hotelStorage = useHotelStore();

import { useHotelCommunicationStore } from '@/stores/modules/hotelCommunication';
const hotelCommunicationStorage = useHotelCommunicationStore();

import { useToastAlert } from '@/composables/useToastAlert';
const toast = useToastAlert();

const isOpenSidePanel = ref(false)
const conceptPanel = ref(null)
const maskEmail = ref("no-reply@thehoster.es")

const openSidePanel = (concept) =>{
    conceptPanel.value = concept;
    isOpenSidePanel.value = true;
}

const toggleOptions = ref({
    welcome_email: false,
    pre_checkin_email: true,
    post_checkin_email: false,
    checkout_email: false,
    pre_checkout_email: false,
    new_chat_email: false,
    referent_email: false,
})

const initToggleOptions = ref({})

const changes = computed(() => {
    return JSON.stringify(toggleOptions.value) !== JSON.stringify(initToggleOptions.value);
})

const cancelChange = () => {
    toggleOptions.value = { ...initToggleOptions.value };
}

const getHotelCommunication = async () => {
    let dataHotelCommunication = await hotelCommunicationStorage.$getHotelCommunication()
    toggleOptions.value = dataHotelCommunication.data.email
    initToggleOptions.value = { ...toggleOptions.value }; 
}



onMounted(async() => {
    let dataHotel = await hotelStorage.$findByParams()
    if(dataHotel.sender_mail_mask){
        maskEmail.value = dataHotel.sender_mail_mask;
    }

    await getHotelCommunication()
})

const updateTogglecommunication = (key, val) => {
    toggleOptions.value[key] = val 
    console.log({toggleOptions: toggleOptions.value, initToggleOptions: initToggleOptions.value})
}


const handlesubmitData = async () => {
    let params = {
        options: toggleOptions.value,
        type: 'email'
    }
    const response = await hotelCommunicationStorage.$updateOrStoreHotelCommunication(params)

    if(response.ok){
        toast.warningToast('Actualizado correctamente','top-right')
    }else{
        toast.errorToast('Error al actualizar','top-right')
    }
    await getHotelCommunication()
}

provide('isOpenSidePanel',isOpenSidePanel)
provide('conceptPanel',conceptPanel)
provide('maskEmail',maskEmail)
</script>
