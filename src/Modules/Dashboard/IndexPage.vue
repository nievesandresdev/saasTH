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

import { useChainStore } from '@/stores/modules/chain';
const chainStore = useChainStore();

import { useHotelStore } from '@/stores/modules/hotel'
const hotelStore = useHotelStore();
const { hotelData } = hotelStore;

const mockupStore = useMockupStore();
const authStore = useAuthStore();

const toast = useToastAlert();

const params = new URLSearchParams(window.location.search)

//computed current_hotel
const current_hotel = computed(() => authStore.current_hotel?.name)

onMounted(async ()=>{
    const emailURL = params.get('u')
    const passwordURL = params.get('p')
    //await chainStore.$getChainBySubdomain();
    mockupStore.$setIframeUrl('')
    // mockupStore.$setInfo1('Guarda para ver tus cambios en tiempo real', '/assets/icons/1.TH.EDIT.OUTLINED.svg')
    mockupStore.$setLanguageTooltip(true)

    if(emailURL && passwordURL){
        alert('email: '+emailURL+' password: '+passwordURL)
    }
    
})

/* function defineMockupData() {
    mockupStore.$setIframeUrl('/consultas/fakeLinkOtas')
    mockupStore.$setInfo1('Guarda', '/assets/icons/1.TH.EDIT.OUTLINED.svg')
    toast.warningToast('texto','top-right')
} */

</script>