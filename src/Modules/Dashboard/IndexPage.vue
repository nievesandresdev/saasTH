<template>
    <div class="px-6">
        <div class="border-b border-[#BFBFBF] py-5">
            <h1 class="text-[22px] font-medium leading-[110%]">Dashboard {{ hotelData.name }}</h1>
        </div>
        <div class="mt-6">
            <CustomerExperience />
            <HomeFeedback />
        </div>
    </div>
    
</template>
<script setup>
import { onMounted,computed } from 'vue'
import { useToastAlert } from '@/composables/useToastAlert'
import { useMockupStore } from '@/stores/modules/mockup'
import { useAuthStore } from '@/stores/modules/auth/login';
import CustomerExperience from './components/CustomerExperience.vue'
import HomeFeedback from './components/HomeFeedback.vue'
import { useRouter } from 'vue-router'

import { useChainStore } from '@/stores/modules/chain';
const chainStore = useChainStore();

import { useHotelStore } from '@/stores/modules/hotel'
const hotelStore = useHotelStore();
const { hotelData } = hotelStore;

const mockupStore = useMockupStore();
const authStore = useAuthStore();
const router = useRouter();
const toast = useToastAlert();

const params = new URLSearchParams(window.location.search)

//computed current_hotel
const current_hotel = computed(() => authStore.current_hotel?.name)
const dossierHotelId = process.env.VUE_APP_DOSSIER_HOTEL_ID //dossier 

const dossierHotelId = process.env.VUE_APP_DOSSIER_HOTEL_ID //dossier 
onMounted(async ()=>{
    //await chainStore.$getChainBySubdomain();
    mockupStore.$setIframeUrl('')
    // mockupStore.$setInfo1('Guarda para ver tus cambios en tiempo real', '/assets/icons/1.TH.EDIT.OUTLINED.svg')
    mockupStore.$setLanguageTooltip(true) 
    if (params.get('dossier') === 'true' && !localStorage.getItem('dossierReloaded')) {
        
        localStorage.setItem('dossierReloaded', 'true'); 
        setTimeout(() => {
            alert('settimeout '+dossierHotelId)
            if(hotelData.id !== dossierHotelId){
                //alert('settimeout '+hotelData.name)
                location.reload();
            }
        }, 1150);
    }

    window.addEventListener("message", async (event) => { //captura el mensaje del loginPage y cerrar sesion , esto es funcionalidad para DOSSIER
        if (event.data === "clearStorage") {
            if(hotelData.id != dossierHotelId){
                alert('clearStorage '+hotelData.id)
                alert('clearStorage2 '+dossierHotelId)
                localStorage.removeItem('token')
                localStorage.removeItem('user')
                localStorage.removeItem('current_hotel')
                localStorage.removeItem('current_subdomain')
                localStorage.removeItem('loginTime')
                localStorage.removeItem('redirectTo')
                localStorage.removeItem('dossierReloaded')
                // Confirmación opcional
                event.source?.postMessage("storageCleared", event.origin);
                await authStore.logout()
                alert('listenerLogin '+hotelData.id)
                alert('listenerLogin2 '+dossierHotelId)
                // Redirigir con parámetros
                router.push({
                    name: 'LoginPage',
                    query: {
                        u: process.env.VUE_APP_LOGIN_DOSSIER_EMAIL,
                        p: process.env.VUE_APP_LOGIN_DOSSIER_PASSWORD
                    }
                })

                // mockupStore.$reloadIframe()
                mockupStore.$setIframeUrl('')
                //location.reload()
            }
        }
    }); //fin de la funcionalidad para DOSSIER
})


/* function defineMockupData() {
    mockupStore.$setIframeUrl('/consultas/fakeLinkOtas')
    mockupStore.$setInfo1('Guarda', '/assets/icons/1.TH.EDIT.OUTLINED.svg')
    toast.warningToast('texto','top-right')
} */

</script>