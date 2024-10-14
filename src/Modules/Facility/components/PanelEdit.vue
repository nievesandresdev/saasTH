<template>
    <div
        v-if="modelActive"
        class="w-full fixed top-0 left-0 z-[40]"
        :class="userStore.showSuscriptionBanner ? 'top-with-banner h-with-banner' : 'h-without-banner'"
        @click="closeModal"
    ></div>
    <transition name="slide">
        <div
            v-if="modelActive"
            class="shadow-xl bg-white flex flex-col justify-between z-[50] w-[500px] fixed"
            :class="userStore.showSuscriptionBanner ? 'top-with-banner h-with-banner' : 'h-without-banner top-0'"
            :style="`right: 353.5px;`"
            
            ref="refPanelEdit"
        >
            <div class="overflow-y-auto scrolling-sticky" style="height:100%">
                <div class="px-6">
                    <div class="flex justify-between py-[20px]">
                        <h1 class="text-[22px] font-medium text-center">{{ modelActive === 'EDIT' ? 'Editar instalación' : 'Crea tu instalación'}}</h1>
                        <button @click="closeModal">
                            <img class="w-[24px] h-[24px]" src="/assets/icons/1.TH.CLOSE.svg">                            
                        </button>
                    </div>
                </div>
                <!-- tabs -->
                <ul
                    class="flex space-x-2 mx-[24px]  border-b hborder-gray-400"
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
                <div class="px-6 mt-[24px]">
                    <template v-if="tabSelected === INFORMATION">
                        <PanelEditFormInformation />
                    </template>
                    <template v-else-if="tabSelected === SCHEDULE">
                        <PanelEditFormSchedule />
                    </template>
                    <template v-else-if="tabSelected === GALLERY">
                    <PanelEditFormPhotos @open:gallery="openGallery" />
                    </template>
                </div>    
            </div>
            <div class="py-4 px-6 flex justify-between  hborder-top-gray-400 z-[1000] hbg-white-100 w-full" style="height: 72px;">
                <template v-if="modelActive === 'EDIT'">
                    <button
                        class="py-3"
                        @click="changesform ? openModalCancel() : openModalDeleteFacility()"
                    >
                        <span class="underline font-medium">{{ changesform ? 'Cancelar' : 'Eliminar instalación' }}</span>
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
        :id="'modal-gallery'"
        :name-image-new="hotelStore.hotelData.name"
        multiple
        @update:img="addNewsImages($event)"
    />
    <BasePreviewImage 
        :url-image="previewUrl"
        :is-open="isPreviewOpen"
        @click:close="closePreviewImage"
    />
    <ModalDeleteFacility
        ref="modalDeleteFacilityRef"
        @submit:delete="submitDeleteFacility()"
    />
    <ModalCancelChangeFacility
        ref="modalCancelChangeFacilityRef"
        @submit:saveChange="submitSave()"
        @submit:closeModal="closeModal"
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
import PanelEditFormSchedule from './PanelEditFormSchedule.vue';
import PanelEditFormPhotos from './PanelEditFormPhotos.vue';
import ModalDeleteFacility from './ModalDeleteFacility.vue';
import ModalCancelChangeFacility from './ModalCancelChangeFacility.vue';
import ModalNoSave from '@/components/ModalNoSave.vue';
import ModalGallery from "@/components/ModalGallery.vue";


import { useFormValidation } from '@/composables/useFormValidation'
import * as rules from '@/utils/rules';

import { useUserStore } from '@/stores/modules/users/users'
const userStore = useUserStore();

const emit = defineEmits(['load:resetPageData']);

// DATA STATIC
const  INFORMATION = 'INFORMATION';
const  SCHEDULE = 'SCHEDULE';
const  GALLERY = 'GALLERY';
const tabs = {
    [INFORMATION]: 'Información',
    [SCHEDULE]: 'Horarios',
    [GALLERY]: 'Galería',
}
const schedulesDefault = [
        {
            name: 'Lunes',
            active: false,
            times: [
                {start: '00:00', end: '23:59'},
            ],
        },
        {
            name: 'Martes',
            active: false,
            times: [
                {start: '00:00', end: '23:59'},
            ],
        },
        {
            name: 'Miércoles',
            active: false,
            times: [
                {start: '00:00', end: '23:59'},
            ],
        },
        {
            name: 'Jueves',
            active: false,
            times: [
                {start: '00:00', end: '23:59'},
            ],
        },
        {
            name: 'Viernes',
            active: false,
            times: [
                {start: '00:00', end: '23:59'},
            ],
        },
        {
            name: 'Sábado',
            active: false,
            times: [
                {start: '00:00', end: '23:59'},
            ],
        },
        {
            name: 'Domingo',
            active: false,
            times: [
                {start: '00:00', end: '23:59'},
            ],
        },
];
// DATA
const tabSelected = ref(INFORMATION);
const modalGaleryRef = ref(null);

const changePendingInForm = inject('changePendingInForm');
const modalChangePendinginForm = inject('modalChangePendinginForm');
const modelActive = inject('modelActive');
const hotelStore = inject('hotelStore');
const facilityStore = inject('facilityStore');
const mockupStore = inject('mockupStore');
const toast = inject('toast');
const hotelData = inject('hotelData');


const form = reactive({
    id: null,
    title: null,
    description: null,
    ad_tag: null,
    schedules: [...schedulesDefault],
    always_open: false,
    images: [],
});
const itemSelected = reactive({
    id: null,
    title: null,
    description: null,
    ad_tag: null,
    schedules: [...schedulesDefault],
    always_open: false,
    images: [],
});
const formDefault = reactive({
    id: null,
    title: null,
    description: null,
    ad_tag: null,
    schedules: [...schedulesDefault],
    always_open: false,
    images: [],
});
const formRules = {
    title: [value => !!value.trim() ? true : 'Introduce el nombre de tu instalación'],
};

const { errors, validateField, formInvalid } = useFormValidation(form, formRules);

const isLoadingForm = ref(false);
const urlsimages = ref([]);
const modalDeleteFacilityRef = ref(null);
const modalCancelChangeFacilityRef = ref(null);

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
    let schedulesNew = form.schedules;
    let schedulesOld = itemSelected?.schedules;
    let valid = (normalize(form.title) !== normalize(itemSelected.title)) ||
        (normalize(form.description) !== normalize(itemSelected.description)) ||
        (normalize(form.ad_tag) !== normalize(itemSelected.ad_tag)) ||
        (Boolean(form.always_open) !== Boolean(itemSelected.always_open)) ||
        // JSON.stringify(toRawObject(form.schedules)) !== JSON.stringify(toRawObject(itemSelected?.schedules)) ||
        !lodash.isEqual(form.schedules, itemSelected?.schedules) ||
        // !deepEqual(form.schedules, itemSelected?.schedules) ||
        // (form.images.length !== itemSelected?.images.length) ||
        !lodash.isEqual(form.images, itemSelected?.images)
        changePendingInForm.value = valid;
    return valid
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
        openModalCancel();
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

function editFacility ({action, facility}) {
    urlsimages.value = [];
    if (action === 'EDIT') {
        let { id, title, description, schedule, schedules, images, select, ad_tag, always_open } = facility;
        let schedulesNew = [];
        if (!!schedules) {
            let scheduleFormated = JSON.parse(schedules);
            if (scheduleFormated?.length != 7) {
                schedulesNew = [...schedulesDefault];
            } else {
                schedulesNew = [...scheduleFormated];
            }
        } else {
            schedulesNew = [...schedulesDefault];
        }
        let itemSelectedSchedules = JSON.parse(JSON.stringify(schedulesNew));
        let formSchedules = JSON.parse(JSON.stringify(schedulesNew));
        let itemSelectedImages = JSON.parse(JSON.stringify(images));
        let formImages = JSON.parse(JSON.stringify(images));
        Object.assign(itemSelected, { id, title, description, schedule,  schedules: itemSelectedSchedules, images: itemSelectedImages, select, ad_tag, always_open });
        Object.assign(form, { id, title, description, schedule, schedules: formSchedules, images: formImages, select, ad_tag, always_open });
        images.forEach(img => {
            urlsimages.value.push(img);
        });
    } else {
        Object.assign(itemSelected, {...formDefault});
        Object.assign(form, {...formDefault});
    }

}
defineExpose({ editFacility });
 

async function submitSave () {
    let body = { ...form };
    const response = await facilityStore.$storeOrUpdate(body);
    const { ok, data } = response;
    if (ok) {
        toast.warningToast('Cambios guardados con éxito','top-right');
        resetCompoent();
    } else {
        toast.warningToast(data?.message,'top-right');
    }
}
async function submitDeleteFacility () {
    const response = await facilityStore.$delete(form.id);
    const { ok, data } = response;
    if (ok) {
        toast.warningToast('Cambios guardados con éxito','top-right');
        resetCompoent();
    } else {
        toast.warningToast(data?.message,'top-right');
    }
}
function openModalCancel () {
    modalCancelChangeFacilityRef.value.openModal();
}
const normalize = (value) => {
    return value === "" || value === null || value === undefined ? null : value;
}
function resetCompoent () {
    closeModalForce();
    resetPageData();
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
    
    // Vaciar el array de imágenes usando splice para mantener la reactividad
    form.images.splice(0, form.images.length);
    
    Object.assign(itemSelected, {...formDefault});
    itemSelected.images.splice(0, itemSelected.images.length); // Hacer lo mismo para itemSelected

}


function resetPageData () {
    emit('load:resetPageData');
}
function openModalDeleteFacility () {
    modalDeleteFacilityRef.value.openModal();
}
function closePreviewImage() {
    isPreviewOpen.value = false;
}
function openGallery () {
    modalGaleryRef.value.openModal();
}

function addNewsImages (images) {
    images.forEach(item => {
        let { url, name, type } = item
        // urls_image.value.push({ url, name, type })
        form.images.push({ id:null, url, name, type })
    });
}

function openModalChangeInForm () {
    modalChangePendinginForm.value = true;
    nextTick(() => {
        modalChangePendinginForm.value = false;
    });
}
</script>

<style lang="scss" scoped>
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