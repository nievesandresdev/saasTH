<template>
    <ListPageHeader />
    <BannerShow :show="hotelData.show_referrals" :chain="chainHotel" v-if="loadBannerShow"/>
    <!-- section  Beneficios para el referido -->
    <div class="px-6 pb-[134px]">
        <SectionConfig :marginTop="'24px'">
            <template #title>
                <h1 class="text-base font-semibold mb-2">Beneficios para el referido</h1>
            </template>
            <template #content>
                <p class="text-sm font-normal mb-4">
                    Ofrece a los referidos beneficios exclusivos para incitarlos a contratar. Refuerza el atractivo de tu oferta destacando las ventajas que solo los referidos pueden conseguir.
                </p>
                <SectionGift 
                    :benefitSReferrals="benefitSReferrals"
                    @editGift="editGift"
                    :type="'referred'"
                    v-if="!isObjectEmpty(benefitSReferrals)"
                />
                <div class="flex gap-2" v-if="isObjectEmpty(benefitSReferrals)">
                    <span class="font-medium text-sm">
                        Aún no tienes regalos creados, ¡crea uno ahora! 
                    </span>
                    <span class="font-medium text-sm underline cursor-pointer" @click="openModal('referred')" >
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
                        <div class="mr-1 text-gray-700 font-semibold text-sm" :class="{ 'opacity-25' : isObjectEmpty(benefitReferent) || !benefitReferent.used }">Ofrecer beneficios</div>
                            <BaseSwichInput
                                v-model="hotelData.offer_benefits"
                                class="mr-4"
                                :id="'offer_benefits'"
                                :disabled="!offerBenefits || !benefitReferent.used"
                                @change:value="updateVisivilityBenefits()"
                            />
                            
                        <BaseTooltipResponsive
                            size="m"
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

                <SectionGift 
                    :benefitSReferrals="benefitReferent"
                    :type="'referent'"
                    @editGift="editGift"
                     v-if="!isObjectEmpty(benefitReferent)"
                />
                
                <div class="flex gap-2" v-if="isObjectEmpty(benefitReferent)">
                    <span class="font-medium text-sm">
                        Aún no tienes regalos creados, ¡crea uno ahora! 
                    </span>
                    <span class="font-medium text-sm underline cursor-pointer" @click="openModal('referent')" >
                        Crear regalo
                    </span>
                </div>
                <hr class="my-4" v-if="!isObjectEmpty(benefitReferent)">
                <Integration :referent="benefitReferent" v-if="!isObjectEmpty(benefitReferent)" />
            </template>
        </SectionConfig>
        
    </div>
    <ChangesBar 
        :existingChanges="changes"
        :validChanges="changes"
        @cancel="cancelChange" 
        @submit="handlesubmitData"
        :forceBottom="true"
    />

    
    <Create :modal-add="isOpenSidePanel" @close="closeModalAdd" @handle-referrals="dataReferrals" @typePeople="checkTypePeople"/>
    <Edit
        :initial-data="selectedGiftData"
        @updateGift="updateGift"
    />

    <!-- modal no save principal -->
    <ModalNoSave
        :id="'not-saved'"
        :open="changes"
        text="Tienes cambios sin guardar. Para aplicar los cambios realizados debes guardar."
        textbtn="Guardar"
        @saveChanges="handlesubmitData"
        type="save_changes"
    />
</template>
<script setup>
import { ref,provide,onMounted,watch } from 'vue';
import ListPageHeader from './Components/ListPageHeader.vue';
import BannerShow from './Components/BannerShow.vue';
import SectionConfig from '@/components/SectionConfig.vue'
import Integration from './Components/Integration.vue';
import SectionGift from './Components/SectionGift.vue';


import ModalNoSave from '@/components/ModalNoSave.vue';
import ChangesBar from '@/components/Forms/ChangesBar.vue'
import BaseTooltipResponsive from '@/components/BaseTooltipResponsive.vue';
import BaseSwichInput from "@/components/Forms/BaseSwichInput.vue";
import { isEqual } from 'lodash';


import Create from './Components/Create.vue';
import Edit from './Components/Edit.vue';


import { useHotelStore } from '@/stores/modules/hotel';
const hotelStore = useHotelStore();
provide('hotelStore', hotelStore);

import { useRewardStore } from '@/stores/modules/rewards/rewards';
const rewardStore = useRewardStore();

import { useChainStore } from '@/stores/modules/chain';
const chainStore = useChainStore();


import { useMockupStore } from '@/stores/modules/mockup';
const mockupStore = useMockupStore();
provide('mockupStore', mockupStore);

import { useToastAlert } from '@/composables/useToastAlert';
const toast = useToastAlert();
provide('toast', toast);

const { hotelData } = hotelStore;


const isOpenSidePanel = ref(false);
const isOpenEditPanel = ref(false);

const benefitSReferrals = ref({});
const benefitReferent = ref({});
const initialBenefitSReferrals = ref({});
const initialBenefitSReferent = ref({});
const selectedGiftData = ref({});

const typeModal = ref(null)
const typePeople = ref(null)

const chainHotel = ref({})
const loadBannerShow = ref(false);
/* const loadingSectionGift = ref(false); */


const dataReferralsApi = ref(false);

const cancelChange = () => {
    location.reload();
}



// PROVIDE
provide('hotelData', hotelData);
provide('isOpenSidePanel', isOpenSidePanel);
provide('isOpenEditPanel', isOpenEditPanel);

provide('typeModal', typeModal);
provide('dataReferralsApi', dataReferralsApi);


const initialOfferBenefits = ref(hotelData.offer_benefits);

// Cambios pendientes
const changes = ref(false);


const checkChanges = () => {
    // Detecta cambios en el switch
    const hasOfferBenefitsChanged = hotelData.offer_benefits !== initialOfferBenefits.value;

    // Detecta cambios en los JSON
    const hasBenefitSReferralsChanged = !isEqual(
        JSON.parse(JSON.stringify(benefitSReferrals.value)),
        JSON.parse(JSON.stringify(initialBenefitSReferrals.value))
    );

    const hasBenefitSReferentChanged = !isEqual(
        JSON.parse(JSON.stringify(benefitReferent.value)),
        JSON.parse(JSON.stringify(initialBenefitSReferent.value))
    );

    changes.value = hasOfferBenefitsChanged || hasBenefitSReferralsChanged || hasBenefitSReferentChanged;
};

watch(
    () => hotelData.offer_benefits,
    () => {
        checkChanges();
    }
);

const dataReferrals = (data) => {
    
    setTimeout(()=>
    {
        if(typePeople.value === 'referred') {
            benefitSReferrals.value = data;
        } else {
            benefitReferent.value = data;
        }
        checkChanges();
    }, 900)
}

const updateGift = (data,type) => {
    if(type === 'referred') {
        benefitSReferrals.value = data;
    } else {
        benefitReferent.value = data;
    }
    checkChanges();
}

const isObjectEmpty = (obj) => {
    return !obj || Object.keys(obj).length === 0;
};


function loadMockup () {
    if(hotelData.show_referrals == 0){
        mockupStore.$setIframeUrl('');
        mockupStore.$setInfo1('Para visualizar, activa la opción de mostrar en la WebApp', '/assets/icons/info.svg')
    }else if(hotelData.show_referrals == 1 && hotelData.offer_benefits == 0){
        mockupStore.$setIframeUrl('/perfil','referrals=true');
        mockupStore.$setInfo1('Edita y guarda para aplicar tus cambios', '/assets/icons/1.TH.EDIT.OUTLINED.svg')
    }else if(hotelData.show_referrals == 1 && hotelData.offer_benefits == 1){
        mockupStore.$setIframeUrl('/perfil','referent=true');
        mockupStore.$setInfo1('Edita y guarda para aplicar tus cambios', '/assets/icons/1.TH.EDIT.OUTLINED.svg')
    }
    
    
    mockupStore.$setLanguageTooltip(true)
}

const checkTypePeople = (type) => {
    typePeople.value = type;
}


const openModal = (type) => {
    isOpenSidePanel.value = true;
    typeModal.value = type;
}

const closeModalAdd = () => {
    isOpenSidePanel.value = false;
}

const editGift = (type,data) => {
    isOpenEditPanel.value = true;
    selectedGiftData.value = data;
    typeModal.value = type;

}

const updateVisivilityBenefits = () => {
    /* console.log('update visibility benefits') */
    checkChanges();
}

const handlesubmitData = async() => {
    let params = {
        offer_benefits: hotelData.offer_benefits,
        benefitSReferrals: benefitSReferrals.value,
        benefitReferent: benefitReferent.value
    }
    console.log('submit data',params)
    rewardStore.$storeRewards(params);
    toast.warningToast('Cambios guardados con éxito','top-right')
    changes.value = false;
    await hotelStore.reloadHotel();

    setTimeout(() => {
        location.reload();
    }, 450);
    
}

const offerBenefits = ref(null);
//mounted
onMounted(async () => {
    getChain();
    loadMockup();
    const response = await rewardStore.$getAllRewards();
    const {  data } = response;

    if(data) {
        benefitSReferrals.value = data?.benefitSReferrals ?? {};
        benefitReferent.value = data?.benefitReferent ?? {};
        offerBenefits.value = data?.benefitReferent ?? 0;
        
    }

    if(data?.benefitSReferrals) {
        dataReferralsApi.value = true;
    }

});

const getChain = async () => {
    const response = await chainStore.$getChainBySubdomain();
    chainHotel.value = response.data;
    loadBannerShow.value = true;
}

</script>