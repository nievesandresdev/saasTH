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
                <SectionConfig :marginTop="'24px'" :width="'460px'" icon-bg :src-bg="'/assets/icons/1.TH.EDIT.OUTLINED.svg'">
                    <template #title>
                        <div class="flex justify-between">
                            <h1 class="text-base font-semibold mb-2">Código: {{ benefitSReferrals.code }}</h1>
                            <img class="w-[24px] h-[24px] cursor-pointer" src="/assets/icons/1.TH.EDIT.OUTLINED.svg" @click="editGift">
                            
                        </div>
                        <div class="flex justify-between">
                            <h1 class="text-base font-semibold mb-2">Regalo: {{ valueReferrals }}</h1>
                        </div>
                    </template>
                    <template #content>
                        <p class="text-sm font-normal mb-4">
                            {{ benefitSReferrals.how_redeem }}
                        </p>
                    </template>
                </SectionConfig>
                <div class="flex gap-2" v-show="isObjectEmpty(benefitSReferrals)">
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
    <Create :modal-add="isOpenSidePanel" @close="closeModalAdd" @handle-referrals="dataReferrals"/>
</template>
<script setup>
import { ref,provide,onMounted,watch, computed } from 'vue';
import ListPageHeader from './Components/ListPageHeader.vue';
import BannerShow from './Components/BannerShow.vue';
import SectionConfig from '@/components/SectionConfig.vue'
import ChangesBar from '@/components/Forms/ChangesBar.vue'
import BaseTooltipResponsive from '@/components/BaseTooltipResponsive.vue';
import BaseSwichInput from "@/components/Forms/BaseSwichInput.vue";
import { isEqual } from 'lodash';

import Create from './Components/Create.vue';


import { useHotelStore } from '@/stores/modules/hotel';
const hotelStore = useHotelStore();
provide('hotelStore', hotelStore);


import { useMockupStore } from '@/stores/modules/mockup';
const mockupStore = useMockupStore();

const { hotelData } = hotelStore;

const isOpenSidePanel = ref(false);
const benefitSReferrals = ref({});
const initialBenefitSReferrals = ref({});


// PROVIDE
provide('hotelData', hotelData);
provide('isOpenSidePanel', isOpenSidePanel);


// Estado inicial
const initialOfferBenefits = ref(hotelData.offer_benefits);

// Cambios pendientes
const changes = ref(false);

// Comparar cambios
/* const checkChanges = () => {
    //const hasOfferBenefitsChanged = !isEqual(hotelData.offer_benefits, initialOfferBenefits.value);
    const hasBenefitSReferralsChanged = !isEqual(benefitSReferrals.value, initialBenefitSReferrals.value);
    const hasOfferBenefitsChanged = hotelData.offer_benefits !== initialOfferBenefits.value;

    console.log('hasOfferBenefitsChanged', hasOfferBenefitsChanged)
    console.log('hasBenefitSReferralsChanged', hasBenefitSReferralsChanged)
    changes.value = hasOfferBenefitsChanged || hasBenefitSReferralsChanged;
}; */

const checkChanges = () => {
    const hasOfferBenefitsChanged = hotelData.offer_benefits !== initialOfferBenefits.value;
    const hasBenefitSReferralsChanged = !isEqual(JSON.stringify(benefitSReferrals.value), JSON.stringify(initialBenefitSReferrals.value));

    console.log({
        'initialBenefitSReferrals': initialBenefitSReferrals,
        'benefitSReferrals': JSON.stringify(benefitSReferrals.value),
        'diffrent' : hasBenefitSReferralsChanged

    })

    changes.value = hasOfferBenefitsChanged || hasBenefitSReferralsChanged;
};

// Watcher para detectar cambios en `hotelData.offer_benefits`
watch(
    () => hotelData.offer_benefits,
    () => {
        checkChanges();
    }
);

const dataReferrals = (data) => {
    
    //console.log('data referrals',data)
    setTimeout(()=>
    {
        benefitSReferrals.value = data;
        checkChanges();
    }, 900)
    //checkChanges();
}

const isObjectEmpty = (obj) => {
    return !obj || Object.keys(obj).length === 0;
};

const valueReferrals = computed(() => {
    if(benefitSReferrals?.value.type === 'percentage') {
        return benefitSReferrals?.value.value + '%'
    } else {
        return benefitSReferrals?.value.value + '€'
    }
});

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