<template>
    <!-- <Head /> -->
    <section class="mt-6 px-6">
        <GuestTabs view="checkin"/>
    </section>

    <section class="mx-6 py-6 mb-10 shadow-hoster rounded-b-[10px] bg-white">
        <div class="px-6">
            <h1 class="text-base font-semibold leading-[120%]">Check-in</h1>
            <p class="mt-2 text-sm leading-[140%]">Los datos de Check-in no son editables, solo están disponibles para su visualización y descarga.</p>
            <h4 class="mt-4 text-sm font-semibold leading-[120%]">Datos personales</h4>
        </div>
        <div class="grid grid-cols-2 3xl:grid-cols-3 gap-4 px-6 mt-4">
            <Input 
                :content="guest?.name"
                label="Nombre"
                :disabled="!settings?.first_step?.name?.visible"
            />
            <Input 
                :content="guest?.lastname"
                label="Primer apellido"
                :disabled="!settings?.first_step?.lastname?.visible"
            />
            <Input 
                :content="guest?.second_lastname"
                label="Segundo apellido"
            />
            <Input 
                :content="guest?.birthdate"
                label="Fecha de nacimiento"
                :disabled="!settings?.first_step?.birthdate?.visible"
            />
            <Input 
                :content="guest?.sex"
                label="Sexo"
                :disabled="!settings?.first_step?.gender?.visible"
            />
            <Input 
                :content="guest?.phone"
                label="Teléfono"
                :disabled="!settings?.first_step?.phone?.visible"
            />
            <Input 
                :content="guest?.checkin_email"
                label="Correo electrónico"
                :disabled="!settings?.first_step?.email?.visible"
            />
            <Input 
                :content="guest?.responsible_adult"
                label="Adulto responsable"
            />
            
        </div>
        <div class="px-6 mt-4">
            <h4 class="text-sm font-semibold leading-[120%]">Datos de identificación</h4>
        </div>
        <div class="grid grid-cols-2 3xl:grid-cols-3 gap-4 px-6 mt-4">
            <Input 
                :content="guest?.kinship_relationship"
                label="Relación de parentesco"
            />
            <Input 
                :content="guest?.nationality"
                label="Nacionalidad"
                :disabled="!settings?.second_step?.nationality?.visible"
            />
            <Input 
                :content="guest?.doc_type"
                label="Tipo de documento"
                :disabled="!settings?.second_step?.docType?.visible"    
            />
            <Input 
                :content="guest?.doc_num"
                label="Número de documento"
                :disabled="!settings?.second_step?.docNumber?.visible"
            />
            <Input 
                :content="guest?.doc_support_number"
                label="Número de soporte de documento"
            />
            <Input 
                :content="guest?.country_address"
                label="País de residencia"
                :disabled="!settings?.second_step?.countryResidence?.visible"
            />
            <Input 
                :content="guest?.postal_code"
                label="Código Postal"
                :disabled="!settings?.second_step?.postalCode?.visible"
            />
            <Input 
                :content="guest?.municipality"
                label="Municipio"
                :disabled="!settings?.second_step?.municipality?.visible"
            />
            <Input 
                :content="guest?.address"
                label="Domicilio"
                :disabled="!settings?.second_step?.addressResidence?.visible"
            />
        </div>
        
    </section>
</template>
<script setup>
import { ref, onMounted, watch, provide, onBeforeUnmount, inject } from 'vue';
import { useRoute, onBeforeRouteLeave } from 'vue-router';
import GuestTabs from '../Queries/components/GuestTabs.vue'
import Input from './InputForm.vue'
//store
import { useStayStore } from '@/stores/modules/stay/stay';
const stayStore = useStayStore();
import { useGuestStore } from '@/stores/modules/guest/guest';
const guestStore = useGuestStore();
import { useStaySessionsStore } from '@/stores/modules/stay/staySessions';
const staySessionsStore = useStaySessionsStore();
import { useCheckinStore } from '@/stores/modules/stay/checkin';
const checkinStore = useCheckinStore();

const route = useRoute();

const stayId = ref(route.params.stayId);
const guestId = ref(route.query.g);
const data = ref({guests:[]});
const guest = ref(null);
const guestsInTabs = ref(null);
const session = ref(null);
const settings = ref(null);

onMounted(async() => {
    data.value.guests = await checkinStore.$getGuestsForTabsCheckinStay(route.params.stayId);
    settings.value = await checkinStore.$getFormSettings();
})

const guestList = inject('guestList');

onBeforeRouteLeave((to, from, next) => {
    if (
        !['StayDetailPage', 'StayQueryDetail', 'StayChatRoom'].includes(to.name) || 
        to.params.stayId !== from.params.stayId && to.name == 'StayDetailPage' 
    ) {
        // Ejecutar `deleteSession`  si la ruta de destino no está en el array allowedRoutes
        // o ejecutar deleteSession si esta ingresando a otra estancia
        deleteSession();
    }
    next();
});

watch(() => route.query.g, async (newData) => {
    guest.value = await guestStore.$findById({id:route.query.g});
}, { immediate: true });  


const deleteSession = async () => {
    let user = JSON.parse(localStorage.getItem('user'));
    await staySessionsStore.$deleteSession(route.params.stayId ,'sessions', user.email);
}

provide('data',data)
provide('session',session) // se define para porder ser usada en la cabecera
</script>
