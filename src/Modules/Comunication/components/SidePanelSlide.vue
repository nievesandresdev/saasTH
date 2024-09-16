<template>
    <div class="flex flex-col h-full">
        <!-- head -->
        <div class="py-5 px-6 flex items-center justify-between border-b hborder-gray-400">
            <h2 class="text-[22px] font-medium leading-[110%]">{{dataPanel.title}}</h2>
            <img @click="isOpenSidePanel = false" class="cursor-pointer w-6 h-6" src="/assets/icons/1.TH.CLOSE.svg" alt="">
        </div>
        <!-- content info -->
        <div class="px-6 pt-6 pb-8 overflow-y-auto" :class="{'h-[79vh]':existingChanges,'h-[91vh]':!existingChanges}">
            <p class="text-sm leading-[140%]">{{dataPanel.description}}</p>
            <div class="mt-6">
                <p class="text-sm font-semibold leading-[120%]">Disparador</p>
                <p class="text-sm leading-[140%] mt-2">{{dataPanel.trigger}}</p>
            </div>
            <div class="mt-6">
                <p class="text-sm font-semibold leading-[120%]">Canal</p>
                <div class="h-10 w-10 bg-[#F3F3F3] rounded-full mt-2 py-2">
                    <img class="w-6 h-6 m-auto" src="/assets/icons/material-symbols-light_mail-outline.svg" alt="">
                </div>
                <p class="text-sm mt-1 leading-[140%]">Email</p>
            </div>
            <div class="mt-6">
                <p class="text-sm font-semibold leading-[120%]">Asunto</p>
                <p class="text-sm leading-[140%] mt-2">{{dataPanel.issue}}</p>
            </div>
            <div class="mt-6">
                <p class="text-sm font-semibold leading-[120%]">Cuerpo</p>
                <p class="text-sm leading-[140%] mt-2">Puede visualizar el texto del email en la derecha</p>
            </div>

            <div class="border-b hborder-gray-400 my-8"></div>

            <h2 class="text-sm font-medium leading-[140%] mb-2">Correo electrónico para el envío</h2>
            <BaseEmailField
                placeholder="Escribe direccion de correo electronico"
                v-model="email"
                @handleError="EmailFieldError = $event"    
            />
            <div v-if="maskEmail && !email" class="flex items-center gap-2 mt-2">
                <img class="w-4 h-4" src="/assets/icons/1.TH.WARNING-RED.svg" alt="">
                <p class="text-xs leading-[90%] htext-alert-negative">Es esencial disponer de una dirección de correo electrónico.</p>
            </div>
            <p class="text-sm leading-[140%] mt-2 text-[#858181]">NOTA: Este es el email de envío por defecto para todas las comunicaciones.</p>
        </div>
        <!-- changes bar -->
        <div class="mt-auto" v-if="existingChanges">
            <ChangesBar 
                :existingChanges="true"
                :validChanges="true"
                @cancel="cancelChanges" 
                @submit="submit"
            />
        </div>
    </div>
</template>
<script setup>
import BaseEmailField from '@/components/Forms/BaseEmailField.vue';
import ChangesBar from '@/components/Forms/ChangesBar.vue'
import { ref, inject, computed, onMounted } from 'vue';
import { useHotelStore } from '@/stores/modules/hotel';
import { useToastAlert } from '@/composables/useToastAlert'

const toast = useToastAlert();
const hotelStorage = useHotelStore();

const isOpenSidePanel = inject('isOpenSidePanel');
const conceptPanel = inject('conceptPanel');
const maskEmail = inject('maskEmail');
const EmailFieldError = ref(false);
const email = ref(null);

onMounted(()=>{
    email.value = maskEmail.value;
    // console.log('maskEmail',maskEmail.value)
})

const cancelChanges = () =>{
    email.value = maskEmail.value;
    // isOpenSidePanel.value = false;
}

const submit = async () =>{
    maskEmail.value = email.value;
    let response = await hotelStorage.$updateSenderMailMask({ email : email.value});
    if(response.ok) {
        toast.warningToast('Correo de envío actualizado', 'top-right');
    }else{
        toast.errorToast('Error al actualizar correo', 'top-right');
    }
}

const existingChanges = computed(()=>{
    return !(maskEmail.value == email.value) && email.value && !EmailFieldError.value;
})

const dataPanel = computed(()=>{
    return values[conceptPanel.value];
})


const values = {
    'betweenGuests':{
        title: 'Invitación entre huéspedes',
        description: 'Tus huéspedes podrán invitarse entre ellos a tu WebApp. Desde aquí configura esa opción.',
        trigger: 'El huésped realiza el envío de una invitación desde la WebApp a otro huésped',
        issue: 'Échale un vistazo a la WebApp del alojamiento [nombre del alojamiento]'
    },
    'manualInvitation':{
        title: 'Invitación Manual',
        description: 'Invitación a tus huéspedes a tu WebApp desde un link o correro electrónico.',
        trigger: 'El hoster crea un huesped en la plataforma hoster',
        issue: 'Te invitamos a probar nuestra WebApp'
    },
    'welcomeMsg':{
        title: 'Mensaje de Bienvenida',
        description: 'El mensaje que recibirán tus huéspedes cuando accedan por primera vez a tu WebApp.',
        trigger: 'El huésped ingresa a la WebApp por primera vez',
        issue: 'Bienvenido a la WebApp'
    },
    'reminderChatMsg':{
        title: 'Mensaje de recordatorio chat',
        description: 'Si tus huéspedes no han leído un mensaje de respuesta en el chat después de 30 minutos, recibirán un correo de recordatorio.',
        trigger: 'Transcurridos los 30 minutos en que el huésped no haya leído tu mensaje respuesta en a WebApp.',
        issue: 'Tienes un chat pendiente en la WebApp'
    }
}

</script>