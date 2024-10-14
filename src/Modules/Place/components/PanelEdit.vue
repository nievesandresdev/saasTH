<template>
    <div
        v-if="modelActive"
        class="w-full fixed top-0 left-0 z-[100]"
        :class="userStore.showSuscriptionBanner ? 'top-with-banner h-with-banner' : 'h-without-banner'"
        @click="closeModal"
    >
    </div>
    <transition name="slide">
        <div
            v-if="modelActive"
            class="shadow-xl bg-white flex flex-col justify-between z-[100] w-[500px] fixed"
            :style="`top: 0px; right: 353.5px; min-height: 100vh; height: 100vh;`"
            ref="refPanelEdit"
        >
            <div class="overflow-y-auto scrolling-sticky">
                <div class="px-6">
                    <div class="flex justify-between py-[20px]">
                        <h1 class="text-[22px] font-medium text-center">Editar lugar</h1>
                        <button @click="closeModal">
                            <img class="w-[24px] h-[24px]" src="/assets/icons/1.TH.CLOSE.svg">                            
                        </button>
                    </div>
                </div>
                <!-- tabs -->
                <ul
                    class="flex space-x-2 mx-[24px] border-b hborder-gray-400"
                >
                    <li
                        v-for="(item ,index) in tabs"
                        :key="index"
                        class="cursor-pointer px-4 pt-4 rounded-t-[10px] flex flex-col"
                        :class="tabSelected === index ? 'hbg-green-200' : ''"
                        @click="changeTab(index)"
                    >
                         <span
                            class="text-base font-semibold"
                            :class="tabSelected === index ? 'htext-green-800 pb-[8px]' : 'htext-black-100'"
                        >
                             {{ item }}
                        </span>
                        <span class="w-full h-[3px] rounded-full" :class="tabSelected === index ? 'hbg-green-800' : 'bg-white'" />
                    </li>
                </ul>   
                <div class="px-6 pt-[31px] pb-[35px] flex-1">
                    <template v-if="tabSelected === INFORMATION">
                        <PanelEditFormInformation />
                    </template>
                    <template v-else-if="tabSelected === GALLERY">
                        <PanelEditFormPhotos  @open:gallery="openGallery" />
                    </template>
                </div>
            </div>
             <!-- {{ form.place_id}} -->
            <div class="py-4 px-6 w-full flex justify-between  hborder-top-gray-400 z-[1000] hbg-white-100 w-full" style="height: 72px;">
                <template v-if="modelActive === 'EDIT'">
                    <button
                        class="py-3"
                        @click="changesform ? openModalCancelChange() : openModalDelete()"
                    >
                        <span class="underline font-medium">{{ changesform ? 'Cancelar' : 'Eliminar lugar' }}</span>
                    </button>
                    <button
                        class="hbtn-cta px-4 py-3 font-medium rounded-[6px] leading-[110%]"
                        :disabled="formInvalid || !changesform || isLoadingForm"
                        @click="submitSave"
                    >
                        Guardar
                    </button>
                </template>
                <template v-else>
                    <button
                        class="leading-[110%] underline text-sm font-medium"
                        @click="prevTab"
                    >
                        {{ tabSelected === INFORMATION ? 'Cancelar' : 'Volver a atrás' }}
                    </button>
                    <button
                        class="hbtn-cta px-4 py-3 font-medium rounded-[6px] leading-[110%]"
                        :diisabled="isLoadingForm"
                        @click="nextTab"
                    >
                        {{ tabSelected === GALLERY ? 'Crear' : 'Siguiente' }}
                        
                    </button>
                </template>
            </div>
        </div>
    </transition>
    <ModalGallery
        ref="modalGaleryRef"
        :id="'modal-gallery-id'"
        :name-image-new="'place'"
        multiple
        @update:img="addNewsImages($event)"
    />
    <BasePreviewImage 
        :url-image="previewUrl"
        :is-open="isPreviewOpen"
        @click:close="closePreviewImage"
    />
    <ModalCancelChangePlace
        ref="modalCancelChangeRef"
        @submit:saveChange="submitSave()"
        @submit:closeModal="closeModal"
    />
    <ModalDelete
        ref="modalDeleteRef"
        @submit="submitDelete()"
    />
    <template v-if="modelActive">
        <ModalNoSave
            :id="'not-saved'"
            :open="changesform"
            text="Tienes cambios sin guardar. Para aplicar los cambios realizados debes guardar."
            textbtn="Guardar"
            @saveChanges="submitSave"
            type="save_changes"
            :force-open="modalChangePendinginForm"
            @close="closeModalForce()"
        />
    </template>
</template>


<script setup>
import { ref, reactive, onMounted, provide, computed, toRefs, inject, nextTick } from 'vue';
import lodash from 'lodash';

// COMPONENTS
import BasePreviewImage from "@/components/BasePreviewImage.vue";
import PanelEditFormInformation from './PanelEditFormInformation.vue';
import PanelEditFormPhotos from './PanelEditFormPhotos.vue';
import ModalCancelChangePlace from './ModalCancelChangePlace.vue';
import ModalDelete from './ModalDelete.vue';
// import ModalCancelChangeFacility from './ModalCancelChangeFacility.vue';
import ModalNoSave from '@/components/ModalNoSave.vue';
import ModalGallery from '@/components/ModalGallery.vue';

import { useUserStore } from '@/stores/modules/users/users'
const userStore = useUserStore();

import { useFormValidation } from '@/composables/useFormValidation'
import * as rules from '@/utils/rules';

const emit = defineEmits(['load:resetPageData']);

// DATA STATIC
const  INFORMATION = 'INFORMATION';
const  GALLERY = 'GALLERY';
const tabs = {
    [INFORMATION]: 'Información',
    [GALLERY]: 'Galería',
}
// DATA
const tabSelected = ref(INFORMATION);

const changePendingInForm = inject('changePendingInForm');
const modalChangePendinginForm = inject('modalChangePendinginForm');
const modelActive = inject('modelActive');
const hotelStore = inject('hotelStore');
const facilityStore = inject('facilityStore');
const placeStore = inject('placeStore');
const mockupStore = inject('mockupStore');
const toast = inject('toast');
const hotelData = inject('hotelData');
const formFilter = inject('formFilter');

const form = reactive({
    place_id: null,
    featured: false,
    recommendation: null,
    address: null,
    title: null,
    description: null,
    phone: null,
    email: null,
    url_web: null,
    images: [],
    delete_place_images: [],
    delete_hotel_images: [],
    new_images: [],
});
const itemSelected = reactive({
    place_id: null,
    featured: false,
    recommendation: null,
    address: null,
    title: null,
    description: null,
    phone: null,
    email: null,
    url_web: null,
    images: [],
    delete_place_images: [],
    delete_hotel_images: [],
    new_images: [],
});
const formDefault = reactive({
    place_id: null,
    featured: false,
    recommendation: null,
    address: null,
    title: null,
    description: null,
    phone: null,
    email: null,
    url_web: null,
    images: [],
    delete_place_images: [],
    delete_hotel_images: [],
    new_images: [],
});
const formRules = {
    // title: [value => value.trim() ? true : 'Introduce '],
};
const modalGaleryRef = ref(null);

const { errors, validateField, formInvalid } = useFormValidation(form, formRules);

const isLoadingForm = ref(false);
const urlsimages = ref([]);
const modalDeleteRef = ref(null);
const modalCancelChangeRef = ref(null);

const previewUrl = ref(null);
const isPreviewOpen = ref(false);
//
provide('form', form);
provide('itemSelected', itemSelected);
provide('errors', errors);
provide('urlsimages', urlsimages);
provide('validateField', validateField);
provide('previewUrl', previewUrl);
provide('isPreviewOpen', isPreviewOpen);
provide('changePendingInForm', changePendingInForm);


//
// provide('schedulesDefault', {...schedulesDefault});

// CHANGE
const changesform = computed(() => {
    let valid = (normalize(form.title) !== normalize(itemSelected.title)) ||
        (normalize(form.description) !== normalize(itemSelected.description)) ||
        (normalize(form.recommendation) !== normalize(itemSelected.recommendation)) ||
        (normalize(form.address) !== normalize(itemSelected.address)) ||
        (normalize(form.phone) !== normalize(itemSelected.phone)) ||
        (normalize(form.email) !== normalize(itemSelected.email)) ||
        (normalize(form.url_web) !== normalize(itemSelected.url_web)) ||
        (Boolean(form.featured) !== Boolean(itemSelected?.featured)) ||
        // (form.images.length !== itemSelected?.images.length);
        !lodash.isEqual(form.images, itemSelected?.images)
        changePendingInForm.value = valid;
    return valid;
});
function toRawObject(obj) {
  return JSON.parse(JSON.stringify(obj));
}
function deepEqual(obj1, obj2) {
  if (obj1 === obj2) return true;

  if (typeof obj1 !== 'object' || obj1 === null ||
      typeof obj2 !== 'object' || obj2 === null) {
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (let key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
}

// FUNCTION
function prevTab () {
    if(tabSelected.value == GALLERY){
        tabSelected.value = SCHEDULE;
    }else if (tabSelected.value == SCHEDULE){
        tabSelected.value = INFORMATION;
    } else {
        modalCancelChangeRef();
    }
}

function nextTab () {
    if(tabSelected.value === GALLERY){
        submitSave();
    } else if (tabSelected.value === INFORMATION){
        tabSelected.value = SCHEDULE;
    } else if (tabSelected.value === SCHEDULE){
        tabSelected.value = GALLERY;
    }
}

function changeTab (val) {
    tabSelected.value = val
}

function edit ({action, place}) {
    urlsimages.value = [];
    if (action === 'EDIT') {
        let { id, title, description, featured, place_images, address, metting_point_latitude, metting_point_longitude, recomendations, web_link, phone_wheretoeat, email_wheretoeat } = place;
        let imagesForm = JSON.parse(JSON.stringify(place_images ?? []));
        let  formObject = { place_id: id, title, description, featured, images: imagesForm, address, metting_point_latitude, metting_point_longitude, recommendation: recomendations?.message, url_web: web_link, phone: phone_wheretoeat, email: email_wheretoeat };
        Object.assign(itemSelected, formObject);

        let imagesItemSelected = JSON.parse(JSON.stringify(place_images ?? []));
        let  itemSelectedObject = { place_id: id, title, description, featured, images: imagesItemSelected, address, metting_point_latitude, metting_point_longitude, recommendation: recomendations?.message, url_web: web_link, phone: phone_wheretoeat, email: email_wheretoeat };
        Object.assign(form, itemSelectedObject);

        imagesForm.forEach(img => {
            urlsimages.value.push(img);
        });
    }
}
defineExpose({ edit });
 

async function submitSave () {
    let body = { ...form };
    const response = await placeStore.$update(body);
    const { ok, data } = response;
    if (ok) {
        toast.warningToast('Cambios guardados con éxito','top-right');
            changePendingInForm.value = false;
            modelActive.value = null;
            tabSelected.value = INFORMATION;
            resetData();
        resetCompoent();
    } else {
        toast.warningToast(data?.message,'top-right');
    }
}
async function submitDelete () {
    const params = {
        visivility: false,
        place_id: itemSelected.place_id,
        selected_place: formFilter.selected_place,
        selected_subplace: formFilter.selected_subplace,
        is_deleted: true,
    }
    const response = await placeStore.$updateVisibility(params);
    const { ok, data } = response;
    if (ok) {
        toast.warningToast('Cambios guardados con éxito','top-right');
        resetCompoent();
    } else {
        toast.warningToast(data?.message,'top-right');
    }
}
function openModalCancelChange () {
    modalCancelChangeRef.value.openModal();
}
const normalize = (value) => {
    return value === "" || value === null || value === undefined ? null : value;
}
function resetCompoent () {
    resetPageData();
    closeModalForce();
}
function closeModal () {
    if (changePendingInForm.value) {
        openModalChangeInForm();
        return;
    }
    changePendingInForm.value = false;
    modelActive.value = null;
    tabSelected.value = INFORMATION;
    resetData();
}
function closeModalForce () {
    changePendingInForm.value = false;
    modelActive.value = null;
    tabSelected.value = INFORMATION;
    resetData();
}
function resetData () {
    Object.assign(form, {...formDefault});
    Object.assign(itemSelected, {...formDefault});
}
function resetPageData () {
    emit('load:resetPageData');
}
function openModalDelete () {
    modalDeleteRef.value.openModal();
}
function closePreviewImage() {
    isPreviewOpen.value = false;
}

function openModalDeletePlace () {

}

function openModalChangeInForm () {
    modalChangePendinginForm.value = true;
    nextTick(() => {
        modalChangePendinginForm.value = false;
    });
}

function openGallery () {
    modalGaleryRef.value.openModal();
}

function addNewsImages (images) {
    images.forEach(item => {
        let { url, name } = item;
        let type = "GALLERY";
        urlsimages.value.push({ url, name, type });
        form.images.push({ id:null, url, name, type, origin: 'HOSTER' });
        form.new_images.push({ id:null, url, name, type, origin: 'HOSTER' });
    });
}


</script>

<style lang="scss" scoped >
/* Define las transiciones para entrar y salir */
.slide-enter-active, .slide-leave-active {
  transition: transform 0.5s ease;
}

/* Estado inicial al entrar y estado final al salir */
.slide-enter-from, .slide-leave-to {
  transform: translateX(100%);
}

/* Estado final al entrar y estado inicial al salir */
.slide-enter-to, .slide-leave-from {
  transform: translateX(0);
}

.scrolling-sticky {
    &::-webkit-scrollbar {
    -webkit-appearance: none;
    }
    &::-webkit-scrollbar:vertical {
        width:16px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #BFBFBF;
        border-radius: 20px;
        border: 4px solid #fff;
    }
    &::-webkit-scrollbar-track {
        border-radius: 10px;
        background-color: #fff;
    }
    &::-webkit-scrollbar:horizontal{
        width:0;
        height: 0;
    }
}  
</style>