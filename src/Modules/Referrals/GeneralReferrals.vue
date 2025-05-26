<template>
    <ListPageHeader />
    <BannerShow :show="hotelData.show_referrals" :chain="hotelData.chain"/>
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
                    <h1 class="text-base font-semibold mb-2">Beneficios para el referente </h1>
                    <div class="flex items-center">
                        <div class="mr-1 text-gray-700 font-semibold text-sm" :class="{ 'opacity-25' : isObjectEmpty(benefitReferent) || !benefitReferent.used }">Ofrecer beneficios</div>
                            <BaseSwichInput
                                v-model="offerBenefitsModel"
                                class="mr-4"
                                :id="'offer_benefits'"
                                :disabled="isObjectEmpty(benefitReferent) || !benefitReferent.used"
                                
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
        :existingChanges="changes || changesOfferBenefits"
        :validChanges="changes || changesOfferBenefits"
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
import { ref,provide,onMounted,watch, computed } from 'vue';
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

import { useMockupStore } from '@/stores/modules/mockup';
const mockupStore = useMockupStore();
provide('mockupStore', mockupStore);

import { useToastAlert } from '@/composables/useToastAlert';
const toast = useToastAlert();
provide('toast', toast);

// Mantener la reactividad usando directamente hotelStore.hotelData en lugar de desestructurar
const hotelData = computed(() => hotelStore.hotelData);

// Computed property para manejar el v-model de offer_benefits
const offerBenefitsModel = computed({
    get() {
        return hotelData.value.offer_benefits;
    },
    set(value) {
        hotelStore.hotelData.offer_benefits = value;
    }
});

const isOpenSidePanel = ref(false);
const isOpenEditPanel = ref(false);

const benefitSReferrals = ref({});
const benefitReferent = ref({});
const initialBenefitSReferrals = ref({});
const initialBenefitSReferent = ref({});
const initialOfferBenefits = ref(null);
const selectedGiftData = ref({});

const typeModal = ref(null)
const typePeople = ref(null)

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




// Cambios pendientes
const changes = ref(false);
const changesOfferBenefits = ref(false);


const checkChanges = () => {
    // Detecta cambios en el switch
    const hasOfferBenefitsChanged = hotelData.value.offer_benefits !== initialOfferBenefits.value;
    
    // Detecta cambios en los JSON
    const hasBenefitSReferralsChanged = !isEqual(
        JSON.parse(JSON.stringify(benefitSReferrals.value)),
        JSON.parse(JSON.stringify(initialBenefitSReferrals.value))
    );

    const hasBenefitSReferentChanged = !isEqual(
        JSON.parse(JSON.stringify(benefitReferent.value)),
        JSON.parse(JSON.stringify(initialBenefitSReferent.value))
    );
    
    // Actualizar ambos estados
    changes.value = (hasBenefitSReferralsChanged || hasBenefitSReferentChanged);
    changesOfferBenefits.value = hasOfferBenefitsChanged;
};

// Watcher para detectar cambios en offer_benefits
watch(
    () => hotelData.value.offer_benefits,
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
    if(hotelData.value.show_referrals == 0){
        mockupStore.$setIframeUrl('');
        mockupStore.$setInfo1('Para visualizar, activa la opción de mostrar en la WebApp', '/assets/icons/info.svg')
    }else if(hotelData.value.show_referrals == 1 && hotelData.value.offer_benefits == 0){
        mockupStore.$setIframeUrl('/perfil','referrals=true');
        mockupStore.$setInfo1('Edita y guarda para aplicar tus cambios', '/assets/icons/1.TH.EDIT.OUTLINED.svg')
    }else if(hotelData.value.show_referrals == 1 && hotelData.value.offer_benefits == 1){
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

/* const updateVisivilityBenefits = () => {
    checkChanges();
} */

const handlesubmitData = async() => {
    let params = {
        offer_benefits: hotelData.value.offer_benefits,
        benefitSReferrals: benefitSReferrals.value,
        benefitReferent: benefitReferent.value
    }
    
    try {
        await rewardStore.$storeRewards(params);
        await hotelStore.reloadHotel();
        
        // Actualizar los valores iniciales después de guardar exitosamente
        initialOfferBenefits.value = hotelData.value.offer_benefits;
        initialBenefitSReferrals.value = JSON.parse(JSON.stringify(benefitSReferrals.value));
        initialBenefitSReferent.value = JSON.parse(JSON.stringify(benefitReferent.value));
        
        // Resetear ambos estados de cambios
        changes.value = false;
        changesOfferBenefits.value = false;
        
        toast.warningToast('Cambios guardados con éxito','top-right');
        
        // Actualizar mockup después de guardar
        loadMockup();
        
    } catch (error) {
        console.error('Error al guardar:', error);
        toast.errorToast('Error al guardar los cambios','top-right');
    }
}

//mounted
onMounted(async () => {
    loadMockup();
    const response = await rewardStore.$getAllRewards();
    await hotelStore.reloadHotel();
    
    // Establecer el valor inicial para detectar cambios
    initialOfferBenefits.value = hotelData.value.offer_benefits;
    
    const {  data } = response;

    if(data) {
        benefitSReferrals.value = data?.benefitSReferrals ?? {};
        benefitReferent.value = data?.benefitReferent ?? {};
        
        // Establecer valores iniciales para detectar cambios
        initialBenefitSReferrals.value = JSON.parse(JSON.stringify(data?.benefitSReferrals ?? {}));
        initialBenefitSReferent.value = JSON.parse(JSON.stringify(data?.benefitReferent ?? {}));
    }

    if(data?.benefitSReferrals) {
        dataReferralsApi.value = true;
    }

});


</script>