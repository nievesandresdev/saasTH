<template>
<div class="h-screen bg-[#FAFAFA] flex flex-col ">
    <div class="px-[24px]">
        <div class="py-[20px] border-b border-[#BFBFBF]">
            <h1 class="text-[22px] font-medium">
                Ajustes - General
            </h1>
        </div>
    </div>

    <div
        v-if="typeChain.CHAIN === hotelData.chain.type"
        class="py-[12px] text-center bg-[--h-tag-blue]"
    >
        <p class="text-sm font-medium ">Los cambios en la url de la cadena <span class="font-bold">afectarán a todos los alojamientos de la cuenta.</span></p>
    </div>
    <div class="mt-6 space-y-6 flex-1 px-[24px]">
        <div class="px-4 py-6 rounded-[10px] hbg-white-100 card-form space-y-4">
            <h5 class="text-base font-semibold">Enlaces de acceso a la WebApp</h5>
            <div class="space-y-1">
                <h6 class="text-sm font-semibold">Cadena</h6>
                <div class="w-[530px] 3xl:w-[530px]">
                    <div class="flex items-start w-full">
                        <div class="flex items-start w-full">
                            <div class="h-[40px] flex items-center">
                                <span class="text-sm font-medium inline-block">https://</span>
                            </div>
                            <BaseTextField
                                v-model="form.subdomain_chain"
                                placeholder="Subdominio..."
                                class-content="flex-1 mx-2"
                                :max="'20'"
                                :min="'12'"
                                name="subdomain_chain"
                                :errors="errors"
                                @blur:validate="validate('subdomain_chain')"
                            />
                            <div class="h-[40px] flex items-center">
                                <span class="text-sm font-medium inline-block">.thehoster.io</span>
                            </div>
                        </div>
                        <div class="h-[40px] flex items-center">
                            <BaseTooltipResponsive
                                size="l"
                                :top="25"
                                :right="0"
                            >
                                <template v-slot:button>
                                    <img
                                        src="/assets/icons/info.blue.svg"
                                        class="w-5 h-5 ml-1"
                                        alt="icon_info"
                                    >
                                </template>
                                <template v-slot:content>
                                    <p class="text-sm font-normal mb-4">Para usar tu propio subdominio, por favor solicítalo contactando a atención al cliente.</p>
                                    <p class="text-sm font-normal mb-4">Puedes contactarnos en el +34 624 149 605 o vía email a la dirección de correo info@thehoster.es</p>
                                    <p class="text-sm font-normal">Nuestro horario de atención es de lunes a jueves de 8:30 a 18:30 y los viernes de 8:30 a 14:30.</p>
                                </template>
                            </BaseTooltipResponsive>
                        </div>
                    </div>
                </div>
            </div>
            <div
                class="space-y-1"
            >
                <h6 class="text-sm font-semibold">Alojamiento</h6>
                <div class="w-[638px] 3xl:w-[638px]">
                    <div class="flex items-start w-full">
                        <div class="flex items-start w-full">
                            <div class="h-[40px] flex items-center">
                                <span class="text-sm font-medium inline-block">{{ `https://${hotelData.chain.subdomain}.thehoster.io/` }}</span>
                            </div>
                            <BaseTextField
                                v-model="form.slug_hotel"
                                placeholder="Slug..."
                                class-content="flex-1 mx-2"
                                :max="'50'"
                                :min="'12'"
                                name="slug_hotel"
                                :errors="errors"
                                @blur:validate="validate('slug_hotel')"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="px-4 py-6 rounded-[10px] hbg-white-100 card-form">
            <div class="space-y-2">
                <h2 class="text-base font-medium">Idioma de la WebApp</h2>
                <p class="text-sm">El huésped utilizará la WebApp en el idioma por defecto de su navegador, siempre que estén dentro de los 6 idiomas con los que contamos.</p>
                <p class="text-sm mt-0.5">Si el idioma de su navegador no es uno de los 6 idiomas con los que contamos, elige el idioma por defecto:</p>
            </div>
            <div class="form-input space-y-2 mt-4">
                <div class="w-[200px]">
                    <BaseSelectField
                        :id="'type_lodging'"
                        :textLabel="'Idioma'"
                        v-model="form.language_default_webapp"
                        :options="OPTIONS_LANGUAGES"
                        :icon_left="`/assets/icons/flags/${form.language_default_webapp}.svg`"
                        mandatory
                        :error="false"
                    />
                </div>
            </div>
        </div>
    </div>

    <div class="border-t hbg-white-100 p-6 sticky bottom-0 flex justify-between z-10">
        <button
            class="hbtn-tertiary text-sm underline"
            :disabled="!isChanged || isloadingForm"
            @click="cancelChanges"
        >
            Cancelar
        </button>
        <button
            class="px-4 text-sm font-medium h-11 hbtn-cta"
            :disabled="isloadingForm || formInvalid || !isChanged"
            @click="submit"
        >
            Guardar
        </button>
    </div>
</div>
</template>

<script setup>

import { ref, provide, reactive, onMounted, computed, inject, watch } from 'vue';
import { $urlBaseWebapp } from '@/utils/helpers';
import { typeChain } from '@/utils/enums';
import { cloneDeep } from 'lodash';

// COMPONENTS
import BaseSelectField from '@/components/Forms/BaseSelectField.vue';
import BaseTextField from '@/components/Forms/BaseTextField';
import BaseTooltipResponsive from '@/components/BaseTooltipResponsive.vue';
import ModalNoSave from '@/components/ModalNoSave.vue';

// STATE
import { useChainStore } from '@/stores/modules/chain';
const chainStore = useChainStore();
import { useHotelStore } from '@/stores/modules/hotel';
const hotelStore = useHotelStore();
import { useMockupStore } from '@/stores/modules/mockup';
const mockupStore = useMockupStore();
// COMPOSABLES
import { useToastAlert } from '@/composables/useToastAlert'
const toast = useToastAlert();

import { useFormValidation } from '@/composables/useFormValidation'
import * as rules from '@/utils/rules';

const hotelData = ref(hotelStore.hotelData);
const dataFormDefault ={
    subdomain_chain: '',
    slug_hotel: '',
    language_default_webapp: null,
};


const OPTIONS_LANGUAGES = [
    { value: 'es', label: 'Español', img: '/assets/icons/flags/es.svg' },
    { value: 'en', label: 'Inglés', img: '/assets/icons/flags/en.svg' },
    { value: 'fr', label: 'Francés', img: '/assets/icons/flags/fr.svg' },
    { value: 'pt', label: 'Portugués', img: '/assets/icons/flags/pt.svg' },
    { value: 'it', label: 'Italiano', img: '/assets/icons/flags/it.svg' },
    { value: 'de', label: 'Alemán', img: '/assets/icons/flags/de.svg' },
    // { value: 'd', label: 'Italiano', img: '/assets/icons/flags/it.svg' },
]

const formDefault = reactive(cloneDeep(dataFormDefault));
const form = reactive(cloneDeep(dataFormDefault));

const  loadingVerifySubdomain = ref(null);
const  loadingVerifySlugHotel = ref(null);
const changesPending = ref(false);
const isloadingForm = ref(false);

const formRules = {
    subdomain_chain: [rules.required, rules.subdomain, rules.maxLength(50), rules.minLength(12)],
    slug_hotel: [rules.required, rules.subdomain, rules.maxLength(50), rules.minLength(12)],
};

const { errors, validateField, formInvalid } = useFormValidation(form, formRules);

// computed
const isChanged = computed(() => {
    changesPending.value = false;
    let { subdomain: slug_hotel, language_default_webapp, chain } = hotelStore.hotelData;

    changesPending.value = (form.subdomain_chain !== chain.subdomain) ||
                            (form.slug_hotel !== slug_hotel) ||
                            (form.language_default_webapp !== language_default_webapp)
    return changesPending.value;
});

// WATCH
watch(()=>form.subdomain, (subdomainCurrent) => {
    form.subdomain = subdomainCurrent.trim().replace(/\s+/g, '');
});

const validate = (field) => {
  validateField(field);
  if (field === 'subdomain_chain') {
      verifySubdomainExistInChain();
  }
  if (field === 'slug_hotel') {
      verifySlugExistInHotel();
  }
}

onMounted(() => {
    reloadHotel();
    loadMockup();
});

function loadMockup () {
    mockupStore.$setIframeUrl('/','test=x',hotelStore.hotelData.language_default_webapp)
    mockupStore.$setInfo1('Guarda para ver tus cambios en tiempo real', '/assets/icons/info.svg')
}

async function reloadHotel () {
    const hotel = await hotelStore.reloadHotel();
    console.log('hotel', hotel);
    Object.assign(hotelData.value, hotel);
    initializeForm(hotel);
}

function initializeForm(hotel) {

    form.hotel_id = hotelStore.hotelData.id || null;
    form.subdomain_chain = hotelStore.hotelData.chain.subdomain || null;
    form.slug_hotel = hotelStore.hotelData.subdomain || null;
    form.language_default_webapp = hotelStore.hotelData.language_default_webapp || null;
    Object.assign(formDefault, form);
    mockupStore.$setIframeUrl('/','test=x',hotelStore.hotelData.language_default_webapp)

}

async function verifySubdomainExistInChain () {
     loadingVerifySubdomain.value = true;
     if (!form.subdomain_chain || (typeof errors.value?.['subdomain_chain'] === 'string')) return;
     let queryRequest = {
        subdomain: form.subdomain_chain,
     }
    const response = await chainStore.$verifySubdomainExistPerChain(queryRequest);
    const  { ok, data } = response;
    console.log(data, 'data');
    if (ok) {
        if (data.exist === true && (typeof errors.value?.subdomain_chain != 'string')) {
            errors.value['subdomain_chain'] = 'Este subdominio ya está siendo usado'
            return;
            // console.log(errors.value, 'errors.value')
        }
        if (!data?.exist || (typeof errors.value?.subdomain_chain != 'string')) {
            errors.value['subdomain_chain'] = true
        }
    }
    loadingVerifySubdomain.value = false;
 }

async function verifySlugExistInHotel () {
     loadingVerifySubdomain.value = true;
     if (!form.subdomain_chain || (typeof errors.value?.['subdomain_chain'] === 'string')) return;
     let queryRequest = {
        subdomain: form.subdomain_chain,
     }
    const response = await chainStore.$verifySubdomainExistPerChain(queryRequest);
    const  { ok, data } = response;
    console.log(data, 'data');
    if (ok) {
        if (data.exist === true && (typeof errors.value?.subdomain_chain != 'string')) {
            errors.value['subdomain_chain'] = 'Este subdominio ya está siendo usado'
            return;
            // console.log(errors.value, 'errors.value')
        }
        if (!data?.exist || (typeof errors.value?.subdomain_chain != 'string')) {
            errors.value['subdomain_chain'] = true
        }
    }
    loadingVerifySubdomain.value = false;
 }

function cancelChanges () {

}

async function submit () {
    isloadingForm.value = false
    let bodyRequest = {
        ...form,
    }
    const response = await chainStore.$updateConfigGeneral(bodyRequest);
    const { ok, data } = response;
    await reloadHotel();
    if (ok) {
        toast.warningToast('Cambios guardados con éxito','top-right');
    } else {
        toast.warningToast(data?.message,'top-right');
    }
    mockupStore.$reloadIframe();
    isloadingForm.value = false;
}

</script>

<style lang="scss">
.card-form {
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.15);
}
</style>