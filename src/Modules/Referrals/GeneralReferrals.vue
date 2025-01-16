<template>
    <ListPageHeader />
    <BannerShow />

    <!-- section  Beneficios para el referido -->
    <div class="p-6 min-h-screen">
        <SectionConfig :marginTop="'24px'">
            <template #title>
                <h1 class="text-base font-semibold mb-2">Beneficios para el referido</h1>
            </template>
            <template #content>
                <p class="text-sm font-normal mb-4">
                    Ofrece a los referidos beneficios exclusivos para incitarlos a contratar. Refuerza el atractivo de tu oferta destacando las ventajas que solo los referidos pueden conseguir.
                </p>
                <SectionConfig :marginTop="'24px'" :width="'460px'">
                    <template #title>
                        <div class="flex justify-between">
                            <h1 class="text-base font-semibold mb-2">Código: HOTELRIU25</h1>
                            <img class="w-[24px] h-[24px] cursor-pointer" src="/assets/icons/1.TH.EDIT.OUTLINED.svg" @click="editGift">
                            
                        </div>
                        <div class="flex justify-between">
                            <h1 class="text-base font-semibold mb-2">Regalo: 20,00€</h1>
                        </div>
                    </template>
                    <template #content>
                        <p class="text-sm font-normal mb-4">
                            Descuento aplicable para la contratación de cualquier servicio de la cadena Riu Hotels. Debe efectuarse el proceso de compra, y antes de finalizar, añadir el código promocional en la parte habilitada.
                        </p>
                    </template>
                </SectionConfig>
                <div class="flex gap-2">
                    <span class="font-medium text-sm">
                        Aún no tienes regalos creados, ¡crea uno ahora! 
                    </span>
                    <span class="font-medium text-sm underline cursor-pointer" @click="openModal">
                        Crear regalo
                    </span>
                </div>
            </template>
        </SectionConfig>
        <SectionConfig :marginTop="'24px'">
            <template #title>
                <div class="flex justify-between">
                    <h1 class="text-base font-semibold mb-2">Beneficios para el referente</h1>
                    <div class="flex items-center">
                        <div class="mr-1 text-gray-700 font-semibold text-sm">Ofrecer beneficios</div>
                            <BaseSwichInput
                                v-model="hotelData.offer_benefits"
                                class="mr-4"
                                :id="'offer_benefits'"
                                @change:value="updateVisivilityBenefits()"
                            />
                        <BaseTooltipResponsive
                            size="l"
                            :top="35"
                            :right="0"
                        >
                            <template #button>
                                <img class="w-[24px] h-[24px]" src="/assets/icons/TH.INFO.GREEN.svg">
                                </template>
                                <template #content>
                                    <p class="text-sm leading-[150%] font-normal">
                                        Configura si los referentes también recibirán beneficios con el programa de referidos. Para activarlo, <strong>debes añadir primero el regalo al referente.</strong>
                                    </p>
                            </template>
                        </BaseTooltipResponsive>
                    </div>
                </div>
            </template>
            <template #content>
                <p class="text-sm font-normal mb-4">
                    Recompensa a los referentes con beneficios únicos que maximicen su motivación para referir a nuevos huéspedes a contratar, fortaleciendo así el impulso del programa de referidos.
                </p>
                
                <div class="flex gap-2">
                    <span class="font-medium text-sm">
                        Aún no tienes regalos creados, ¡crea uno ahora! 
                    </span>
                    <span class="font-medium text-sm underline cursor-pointer" @click="openModal">
                        Crear regalo
                    </span>
                </div>
            </template>
        </SectionConfig>
    </div>

   
    <ChangesBar 
        :existingChanges="changes"
        :validChanges="changes"
        @cancel="cancelChange" 
        @submit="submit"
    />
    <Create :modal-add="isOpenSidePanel" @close="closeModalAdd"/>
</template>
<script setup>
import { ref,provide,onMounted,watch } from 'vue';
import ListPageHeader from './Components/ListPageHeader.vue';
import BannerShow from './Components/BannerShow.vue';
import SectionConfig from '@/components/SectionConfig.vue'
import ChangesBar from '@/components/Forms/ChangesBar.vue'
import BaseTooltipResponsive from '@/components/BaseTooltipResponsive.vue';
import BaseSwichInput from "@/components/Forms/BaseSwichInput.vue";

import Create from './Components/Create.vue';


import { useHotelStore } from '@/stores/modules/hotel';
const hotelStore = useHotelStore();
provide('hotelStore', hotelStore);


import { useMockupStore } from '@/stores/modules/mockup';
const mockupStore = useMockupStore();

const { hotelData } = hotelStore;

const isOpenSidePanel = ref(false);


// PROVIDE
provide('hotelData', hotelData);
provide('isOpenSidePanel', isOpenSidePanel);


// Estado inicial
const initialOfferBenefits = ref(hotelData.offer_benefits);

// Cambios pendientes
const changes = ref(false);

// Comparar cambios
const checkChanges = () => {
    console.log(initialOfferBenefits.value, hotelData.offer_benefits)
    changes.value = hotelData.offer_benefits !== initialOfferBenefits.value;
};

// Watcher para detectar cambios en `hotelData.offer_benefits`
watch(
    () => hotelData.offer_benefits,
    () => {
        checkChanges();
    }
);


function loadMockup () {
    mockupStore.$setIframeUrl('/alojamiento');
    mockupStore.$setInfo1('Guarda para ver tus cambios en tiempo real', '/assets/icons/info.svg')
    mockupStore.$setLanguageTooltip(true)
}


const openModal = () => {
    isOpenSidePanel.value = true;
}

const closeModalAdd = () => {
    isOpenSidePanel.value = false;
}

const editGift = () => {
    alert('edit gift')
}

const updateVisivilityBenefits = () => {
    console.log('update visibility benefits')
    checkChanges();
}


//mounted
onMounted(() => {
    loadMockup();
});

</script>