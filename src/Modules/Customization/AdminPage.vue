<template>
<div class="h-screen bg-[#FAFAFA] flex flex-col ">
    <div class="flex-1 px-[24px]">
        <div class="py-[20px]">
            <h1 class="text-[22px] font-medium">
                Personalización
            </h1>
        </div>
        <BaseTab v-model="tabCurrent" :items="ITEMS_TABS" />
        <template v-if="tabCurrent === GENERAL">
            <AdminPageFormInformation />
        </template>
        <template v-if="tabCurrent === DESIGN">
            <AdminPageFormImages />
        </template>

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
<ModalNoSave
    :id="'not-saved'"
    :open="isChanged"
    text="Tienes cambios sin guardar. Para aplicar los cambios realizados debes guardar."
    textbtn="Guardar"
    @saveChanges="submit"
    type="save_changes"
/>
</template>

<script setup>
import { ref, provide, reactive, onMounted, computed, inject } from 'vue';
import { $urlBaseWebapp } from '@/utils/helpers';

import ModalNoSave from '@/components/ModalNoSave.vue';

// STATE
//
import { useGalleryStore } from '@/stores/modules/gallery';
const galleryStore = useGalleryStore();
provide('galleryStore', galleryStore);
import { useHotelStore } from '@/stores/modules/hotel';
const hotelStore = useHotelStore();
provide('hotelStore', hotelStore);
import { useMockupStore } from '@/stores/modules/mockup';
const mockupStore = useMockupStore();
// COMPOSABLES
import { useToastAlert } from '@/composables/useToastAlert'
const toast = useToastAlert();

import { useFormValidation } from '@/composables/useFormValidation'
import * as rules from '@/utils/rules';

// COMPONENTS
import BaseTab from '@/components/BaseTab';
import BaseTextField from '@/components/Forms/BaseTextField';

import AdminPageFormInformation from './AdminPageFormInformation';
import AdminPageFormImages from './AdminPageFormImages';

const urlBaseWebapp = $urlBaseWebapp();
const bgDefault = {url: '/storage/gallery/general-1.jpg', type: 'STORAGE', default: true}
const faviconDefault = {url: '/vendor_asset/img/hoster/icons/1.TH.icon.instalaciones.svg', type:'STORAGE', default: true}
const hotelData = ref(hotelStore.hotelData);
const { logo: logoHotel, favicon: faviconhotel, image: imageHotel } = hotelData.value;

const containerImages = ref([]);
 const imgSelectedLogo = ref({});
 const imgSelectedFav = ref({});
const imgSelectedBg = ref({});

 const imgSelectedLogoDefault = ref({});
 const imgSelectedFavDefault = ref({});
const imgSelectedBgDefault = ref({});

const GENERAL = 'GENERAL';
const DESIGN = 'DESIGN';
const ITEMS_TABS = [{name: 'General', value: GENERAL}, {name: 'Diseño', value: DESIGN}];

// DATA
const tabCurrent = ref(GENERAL);

const form = reactive({
    subdomain: '',
    language_default_webapp: null,
    images_files: null,
    img_selected_logo: null,
    img_selected_fav: null,
    img_selected_bg: null,
});

const formDefault = reactive({
    subdomain: '',
    language_default_webapp: null,
    images_files: null,
    img_selected_logo: null,
    img_selected_fav: null,
    img_selected_bg: null,
});

const  loadingVerifySubdomain = ref(null);
const isValidFavicon = ref(true);
const changesPending = ref(false);
const isloadingForm = ref(false);

const formRules = {
    subdomain: [rules.required, rules.subdomain, rules.maxLength(50), rules.minLength(12)],
};

const { errors, validateField, formInvalid } = useFormValidation(form, formRules);

// PROVIDE
provide('isValidFavicon', isValidFavicon);
provide('formRules', formRules);
provide('form', form);
provide('formDefault', formDefault);
provide('errors', errors);
provide('validateField', validateField);
provide('urlBaseWebapp', urlBaseWebapp);
provide('loadingVerifySubdomain', loadingVerifySubdomain);
provide('changesPending', changesPending);
//
provide('containerImages', containerImages);
provide('faviconDefault', faviconDefault);
provide('imgSelectedLogo', imgSelectedLogo);
provide('imgSelectedFav', imgSelectedFav);
provide('imgSelectedBg', imgSelectedBg);
provide('bgDefault', bgDefault);
provide('imgSelectedLogoDefault', imgSelectedLogoDefault);
provide('imgSelectedFavDefault', imgSelectedFavDefault);
provide('imgSelectedBgDefault', imgSelectedBgDefault);

function getTypeImg (url) {
    if (!url) return;
    let type = url?.includes('https://') ? 'CDN' : 'STORAGE'
    return type
}

onMounted(() => {
    reloadHotel();
    loadMockup();
});

// computed
const isChanged = computed(() => {
    if(!isValidFavicon.value){
        return false;
    }
    changesPending.value = false;
    let { image: bgImage, logo: logoImage, favicon: faviconImage, subdomain, language_default_webapp } = hotelStore.hotelData;

    changesPending.value = (form.subdomain !== subdomain) ||
                            (form.language_default_webapp !== language_default_webapp) ||
                            (imgSelectedBg.value?.url !== bgImage && imgSelectedBg.value?.url !== bgDefault.url) ||
                            (imgSelectedLogo.value.url !== logoImage) ||
                            (imgSelectedFav.value.url !== faviconImage);
                
    return changesPending.value
});

// FUNCTIONS
function loadMockup () {
    mockupStore.$setIframeUrl('/')
    mockupStore.$setInfo1('Guarda para ver tus cambios en tiempo real', '/assets/icons/info.svg')
}
async function reloadHotel () {
    const hotel = await hotelStore.reloadHotel();
    tabCurrent.value = GENERAL;
    Object.assign(hotelData.value, hotel);
    initializeForm(hotel);
    
}

function initializeForm(hotel) {
    imgSelectedLogo.value = { url: hotelData.value.logo, type: getTypeImg(hotelData.value.logo) };
    imgSelectedFav.value = { url:hotelData.value.favicon, type: getTypeImg( hotelData.value.favicon) };
    imgSelectedBg.value = hotelData.value.image ? { url: hotelData.value.image, type: getTypeImg(hotelData.value.image) } : bgDefault;

    imgSelectedLogoDefault.value = { url: hotelData.value.logo, type: getTypeImg(hotelData.value.logo) };
    imgSelectedFavDefault.value = { url: hotelData.value.favicon, type: getTypeImg( hotelData.value.favicon) };
    imgSelectedBgDefault.value = hotelData.value.image ? { url: hotelData.value.image, type: getTypeImg(hotelData.value.image) } : bgDefault;

    form.hotel_id = hotelStore.hotelData.id || null;
    form.subdomain = hotelStore.hotelData.subdomain || null;
    form.language_default_webapp = hotelStore.hotelData.language_default_webapp || null;
    form.images_files = hotelStore.hotelData.images_files || null;
    form.img_selected_logo = imgSelectedLogo.value || null;
    form.img_selected_fav = imgSelectedFav.value || null;
    form.img_selected_bg = imgSelectedBg.value || null;
    Object.assign(formDefault, form);

}
function reloadDataComponent () {
    Object.assign(form, formDefault);
    Object.assign(imgSelectedLogo.value, imgSelectedLogoDefault.value);
    Object.assign(imgSelectedFav.value, imgSelectedFavDefault.value);
    Object.assign(imgSelectedBg.value, imgSelectedBgDefault.value);
}
function cancelChanges () {
    reloadDataComponent();
    errors.value = {}
}
async function submit () {
    isloadingForm.value = false
    let bodyRequest = {
        ...form,
    }
    const response = await hotelStore.$updateCustomization(bodyRequest);
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