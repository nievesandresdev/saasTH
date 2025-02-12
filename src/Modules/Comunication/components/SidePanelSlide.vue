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
                <p class="text-sm font-semibold leading-[120%]">Contenido el mensaje</p>
                <p class="text-sm leading-[140%] mt-2">{{dataPanel.descriptionContent}}</p>
                <ul class="mt-4 list-disc pl-5">
                    <li  
                        class="text-sm leading-[140%] font-normal " 
                        v-for="item in dataPanel.itemsContent"
                    >{{ item }}</li>
                </ul>
            </div>

            <div class="mt-6">
                <p class="text-sm font-semibold leading-[120%]">Canal</p>
                <div class="flex items-center gap-6">
                    <div
                        v-for="channel in dataPanel.channels"
                    >
                        <div class="h-10 w-10 bg-[#F3F3F3] rounded-full mt-2 py-2 mx-auto">
                            <img 
                                class="w-6 h-6 m-auto" 
                                :src="`/assets/icons/comunications/${channel.icon}.svg`">
                        </div>
                        <p class="text-sm mt-1 leading-[140%] text-center">{{ channel.title }}</p>  
                    </div>
                </div>
            </div>

            <div class="mt-6">
                <p class="text-sm font-semibold leading-[120%]">Asunto</p>
                <p class="text-sm leading-[140%] mt-2">{{dataPanel.issue}}</p>
            </div>

            <div class="border-b hborder-gray-400 my-4"></div>

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
    console.log('conceptPanel',conceptPanel.value)
    return values[conceptPanel.value];
})


const values = {
    'prepareYourArrival':{
        title: 'Prepara tu llegada',
        description: 'Este es el mensaje que recibirán tus huéspedes faltando 2 días para su llegada a tu alojamiento.',
        trigger: 'Cuando falten 48hs para el comienzo de la estancia de tu huésped.',
        issue: `¿Todo listo [nombreHotel]?`,
        descriptionContent:'Este mensaje contendrá el bloque de motivación, los datos de la estancia y, dependiendo de tus configuraciones, las siguientes secciones:',
        itemsContent:['Check-in online','Consulta de Seguimiento','Destinos recomendados','Instalaciones de tu alojamiento','Invitación al Chat'],
        channels:[
            {title:'Email',icon:'material-symbols-light_mail-outline'},
        ]
    },
    'howGoing':{
        title: '¿Qué tal va todo?',
        description: 'Conocerás cómo se sienten tus huéspedes durante su estancia y les harás recomendaciones.',
        trigger: 'Tus huéspedes recibirán este mensaje pasadas las 24hs del comienzo de su estancia.',
        issue: `¿Qué tal va todo?`,
        descriptionContent:'Este mensaje contendrá el bloque de pregunta de Sentimiento y, dependiendo de tus configuraciones, las siguientes secciones: ',
        itemsContent:['Instalaciones de tu alojamiento','Destinos recomendados','Experiencias recomendadas','Invitación al Chat'],
        channels:[
            {title:'Email',icon:'material-symbols-light_mail-outline'}
        ]
    },
    'welcomeMsg':{
        title: 'Te damos la bienvenida',
        description: 'Cuando un huésped cree su estancia en un alojamiento de tu cuenta, recibirá este mensaje.',
        trigger: 'El huésped ingresa a la WebApp por primera vez',
        issue: `Te damos la bienvenida a la WebApp de [nombreHotel]`,
        descriptionContent:'',
        itemsContent:[],
        channels:[
            {title:'Email',icon:'material-symbols-light_mail-outline'}
        ]
    },
    'thankChoosing':{
        title: 'Gracias por elegirnos',
        description: 'Enviarás a tus huéspedes un cálido mensaje de despedida y agradecimiento por su estancia.',
        trigger: 'Cuando la estancia de tus huéspedes cambie a Post-stay (según tu horario de check-out), les enviaremos este mensaje.',
        issue: 'Gracias por elegirnos',
        descriptionContent:'Este mensaje contendrá el bloque de despedida y, dependiendo de tus configuraciones, las siguientes secciones:',
        itemsContent:['Consulta de seguimiento','Destinos recomendados','Experiencias recomendadas'],
        channels:[
            {title:'Email',icon:'material-symbols-light_mail-outline'}
        ]
    },
    'youBack':{
        title: 'Te esperamos de vuelta!',
        description: 'Recuerda a tus huéspedes de su experiencia y motívalos a regresar.',
        trigger: 'Pasadas 48hs de la finalización de su estancia, tus huéspedes recibirán este mensaje',
        issue: 'Te esperamos de vuelta!',
        descriptionContent:'Este mensaje incluirá un bloque diseñado para persuadir a tus huéspedes a regresar y, dependiendo de tus configuraciones, las siguientes secciones:',
        itemsContent:['Consulta de Seguimiento/Solicitud de reseña','Invitación a crear su próxima reserva','Destinos de su interés'],
        channels:[
            {title:'Email',icon:'material-symbols-light_mail-outline'}
        ]
    },
    'warningMsg':{
        title: 'Aviso de mensaje en chat',
        description: 'Se utiliza para avisarle al huésped que tiene un mensaje no leído.',
        trigger: 'Transcurridos los 30 minutos en que el huésped no haya leído tu mensaje respuesta en a WebApp.',
        issue: 'Tienes un chat pendiente en la WebApp',
        descriptionContent:'',
        itemsContent:[],
        channels:[
            {title:'Email',icon:'material-symbols-light_mail-outline'}
        ]
    },
    'checkInGuestGuest':{
        title: 'Check-in Huésped - Huésped',
        description: 'Tus huéspedes podrán invitarse entre sí a realizar su Check-in online en tu WebApp',
        trigger: 'Transcurridos los 30 minutos en que el huésped no haya leído tu mensaje respuesta en a WebApp.',
        issue: 'Tienes un chat pendiente en la WebApp',
        descriptionContent:'',
        itemsContent:[],
        channels:[
            {title:'Email',icon:'material-symbols-light_mail-outline'},
            {title:'SMS',icon:'Frame 2613489'},
            {title:'WhatsApp',icon:'Frame 2613488'},
            {title:'Telegram',icon:'Frame 2613557'},
        ]
    },
    "manualInvitation":{
        title: 'Invitar huésped a WebApp',
        description: 'Envía a tus huéspedes la invitación a tu WebApp a través de un correo electrónico.',
        trigger: 'Desde la sección "Estancias", envías manualmente una invitación a tu WebApp utilizando el botón "Invitar huésped".',
        issue: '¿Ya conoces la WebApp de [NombreHotel]?',
        descriptionContent:'Este mensaje contendrá las siguientes secciones, dependiendo de tus configuraciones:',
        itemsContent:['Destinos recomendados','Experiencias recomendadas','Instalaciones de tu alojamiento','Invitación al Chat'],
        channels:[
            {title:'Email',icon:'material-symbols-light_mail-outline'}
        ]
    },
    "betweenGuests": {
        title: 'Invitación entre huéspedes',
        description: 'Tus huéspedes podrán invitar a otros a tu WebApp de manera sencilla, enviando y recibiendo invitaciones directas a través de diversos canales de comunicación.',
        trigger: 'El huésped envía una invitación a través de uno de los canales disponibles, utilizando el botón "Compartir estancia".',
        issue: '¿Ya has visto la WebApp de [NombreHotel]?',
        descriptionContent:'Este mensaje contendrá las siguientes secciones, dependiendo de tus configuraciones:',
        itemsContent:['Destinos recomendados','Experiencias recomendadas','Instalaciones de tu alojamiento'],
        channels:[
            {title:'Email',icon:'material-symbols-light_mail-outline'},
            {title:'WhatsApp',icon:'Frame 2613488'},
            {title:'SMS',icon:'Frame 2613489'},
            {title:'Telegram',icon:'Frame 2613557'},
        ]
    },
    "referrals":{
        title: 'Programa de referidos',
        description: 'Tus huéspedes podrán participar de un programa de referidos, compartiendo sus códigos a través de diversos canales de comunicación.',
        trigger: 'El huésped envía una invitación a través de uno de los canales disponibles, utilizando el botón "Recomendar a un amigo ahora".',
        issue: 'Usa mi código de referido para obtener un descuento.',
        descriptionContent:'El mensaje incluirá un texto amigable para invitar e incentivar a los huéspedes a participar del programa de referidos y un enlace para hacerlo.',
        channels:[
            {title:'Email',icon:'material-symbols-light_mail-outline'},
            {title:'WhatsApp',icon:'Frame 2613488'},
            {title:'SMS',icon:'Frame 2613489'},
            {title:'Telegram',icon:'Frame 2613557'},
        ]
    },
    "referent":{
        title: 'Referente - Código de regalo',
        description: 'Este es el mensaje que recibirán tus huéspedes cuando uno de sus referidos utilice su código de referente. Este mensaje sólo se enviará si tienes activo el programa de referidos, y configurado el regalo para el Referente.',
        trigger: 'Cuando un referido redime el código compartido por un referente.',
        issue: '¡Enhorabuena! Has recibido un regalo',
        descriptionContent:'Avisará a tus huéspedes que tienen un regalo para canjear. Se mostrará el valor del regalo y las instrucciones que configures sobre “Cómo canjearlo”. Y dependiendo de tus configuraciones, también se incluirán las siguientes secciones:',
        itemsContent:['Invitación al Chat'],
        channels:[  
            {title:'Email',icon:'material-symbols-light_mail-outline'}
        ]


    }

}

</script>