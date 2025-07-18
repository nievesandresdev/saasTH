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
            class="shadow-xl bg-white flex flex-col justify-between z-[50] w-[500px] fixed bg-white"
            :class="userStore.showSuscriptionBanner ? 'top-with-banner h-with-banner' : 'h-without-banner top-0'"
            :style="`right: 353.5px;`"
            
            ref="ref
            PanelEdit"
        >
            <div
                class=""
                :class="{'mx-6': modelActive === 'ADD', 'border-b hborder-bottom-gray-400 pb-4': modelActive === 'ADD'}"
            >
                <div class="px-6">
                    <div class="flex justify-between py-[20px]">
                        <h1 class="text-[22px] font-medium text-center">{{ modelActive === 'EDIT' ? 'Editar servicio' : 'Crea tu servicio'}}</h1>
                        <button @click="closeModal">
                            <img class="w-[24px] h-[24px]" src="/assets/icons/1.TH.CLOSE.svg">                            
                        </button>
                    </div>
                </div>
                <!-- tabs -->
                <template v-if="modelActive === 'ADD'">
                    <BaseStepper v-model="stepCurrent"  :steps="steps" />
                </template>
                <template v-else>
                    <BaseTab v-model="stepCurrent" class="px-[24px]" :items="steps" />
                </template>
            </div>
            <div class="pb-6" style="height: calc(100% - 72px); overflow: auto;">
                <div class="px-6 mt-[24px] mt-3">
                    <template v-if="stepCurrent === 0">
                        <PanelEditFormInformation />
                    </template>
                    <template v-else-if="stepCurrent === 1">
                        <PanelEditFormCharacteristics />
                    </template>
                    <template v-else="stepCurrent === 2">
                        <PanelEditFormPhotos @open:gallery="openGallery" />
                    </template>
                </div>
            </div>
            <!-- {{form}}
            {{formDefault}} -->
            <div class="py-4 px-6 flex justify-between  hborder-top-gray-400 z-[1000] hbg-white-100 w-full" style="height: 72px;">
                <template v-if="modelActive === 'EDIT'">
                    <button
                        class="py-3"
                        @click="changesform ? openModalChangeInForm() : openModalDelete()"
                    >
                        <span class="underline font-medium">{{ changesform ? 'Cancelar' : 'Eliminar servicio' }}</span>
                    </button>
                    <button
                        class="hbtn-cta px-4 py-3 font-medium rounded-[6px] leading-[110%]"
                        :disabled="formInvalid || !changesform || isLoadingForm || !formIsFull || form.images.length <= 0 || (form.type == 2 && subservicesData.length <= 0) || (form.type == 1 && validCharacteristics(form))"
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
                        {{ stepCurrent === 0 ? 'Cancelar' : 'Atrás' }}
                    </button>
                    <button
                        class="hbtn-cta px-4 py-3 font-medium rounded-[6px] leading-[110%]"
                        :disabled="formInvalid || !changesform || isLoadingForm || !formIsFull || (form.images.length <= 0 && stepCurrent == 2) || (stepCurrent == 1 && form.type == 2 && subservicesData.length <= 0) || (stepCurrent == 1 && form.type == 1 && validCharacteristics(form))"
                        @click="nextTab"
                    >
                        {{ stepCurrent < 2 ? 'Siguiente' : 'Crear' }}
                    </button>
                </template>
            </div>
        </div>
    </transition>
    <ModalGallery
        ref="modalGaleryRef"
        :id="'modal-gallery'"
        :name-image-new="hotelStore?.hotelData?.name"
        multiple
        @update:img="addNewsImages($event)"
    />
    <BasePreviewImage 
        :url-image="previewUrl"
        :is-open="isPreviewOpen"
        @click:close="closePreviewImage"
    />
    <ModalCancelChange 
        ref="modalCancelChangeRef"
        @submit:saveChange="submitSave()"
        @submit:closeModal="closeModalForce"
    />
    <ModalDelete
        ref="modalDeleteRef"
        @submit:delete="submitDelete()"
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

import { useFormValidation } from '@/composables/useFormValidation'
import * as rules from '@/utils/rules';

// COMPONENTS
import BasePreviewImage from "@/components/BasePreviewImage.vue";
import ModalGallery from "@/components/ModalGallery.vue";
import BaseStepper from '@/components/BaseStepper.vue';
import PanelEditFormInformation from './PanelEditFormInformation.vue';
import PanelEditFormCharacteristics from './PanelEditFormCharacteristics.vue';
import PanelEditFormPhotos from './PanelEditFormPhotos.vue';
import ModalCancelChange from './ModalCancelChange.vue';
import ModalDelete from './ModalDelete.vue';
import ModalNoSave from '@/components/ModalNoSave.vue';
import BaseTab from '@/components/BaseTab.vue';

const emit = defineEmits(['load:resetPageData']);

import { ServiceTypeEnum } from "@/shared/enums/ServiceTypeEnum";

// STORE
import { useUserStore } from '@/stores/modules/users/users'
const userStore = useUserStore();

import { useServiceStore } from '@/stores/modules/service'
const serviceStore = useServiceStore();
const { form, itemSelected, formDefault } = serviceStore;

// COMPOSABLES
import { useToastAlert } from '@/composables/useToastAlert'
const toast = useToastAlert();

import { useService } from '@/composables/useService';
const { validCharacteristics } = useService();

// INJECT
const hotelStore = inject('hotelStore');
const transportStore = inject('transportStore');
const changePendingInForm = inject('changePendingInForm');
const modalChangePendinginForm = inject('modalChangePendinginForm');
const modelActive = inject('modelActive');
const languagesData = inject('languagesData');

// DATA
const subservicesData = ref([]);
const stepCurrent = ref(0);
const modalGaleryRef  = ref(null);
const modalCancelChangeRef  = ref(null);
const modalDeleteRef  = ref(null);

const formRules = reactive({
    link_url: [value => !value?.trim() || (!!value?.trim() && isValidURL(value))  ? true : 'El formato introducido es incorrecto'],
    name: [{
        required: true,
        validator: value => !!value,
        message: 'Este campo es obligatorio'
    }],
    hire: [{
        required: true,
        validator: value => !!value,
        message: 'Este campo es obligatorio'
    }],
    description: [{
        required: true,
        validator: value => !!value,
        message: 'Este campo es obligatorio'
    }],
});

function isValidURL(url) {
    const pattern = /^(https?:\/\/)?([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})(:[0-9]{1,5})?(\/.*)?$/;
    return pattern.test(url);
}

const {  errors, validateField, formInvalid, formIsFull, validateAllFields, isFormFull } = useFormValidation(form, formRules);

const isLoadingForm = ref(false);
const urlsimages = ref([]);

const previewUrl = ref(null);
const isPreviewOpen = ref(false);

// COMPUTED
const steps = computed(() => {
    return [
        {
            name: 'Información',
            value: 0,
            disabled: formInvalid.value || !changesform.value || isLoadingForm.value || !formIsFull.value
        },
        {
            name: 'Caracteristicas',
            value: 1,
            disabled: formInvalid.value || !changesform.value || isLoadingForm.value || !formIsFull.value
        },
        {
            name: 'Galeria',
            value: 2,
            disabled: formInvalid.value || !changesform.value || isLoadingForm.value || !formIsFull.value || (form.type == 2 && subservicesData.value.length <= 0) || (form.type == 1 && validCharacteristics(form))
        },
    ];
});
const changesform = computed(() => {
    // console.log(form.price, 'form');
    // console.log(itemSelected.price, 'itemSelected');
    let valid = (normalize(form.name) !== normalize(itemSelected.name)) ||
        (normalize(form.description) !== normalize(itemSelected.description)) ||
        (normalize(form.hire) !== normalize(itemSelected.hire)) ||
        (normalize(form.link_url) !== normalize(itemSelected.link_url)) ||
        //
        (normalize(form.type) !== normalize(itemSelected.type)) ||
        (normalize(form.price) !== normalize(itemSelected.price)) ||
        (normalize(form.duration) !== normalize(itemSelected.duration)) ||
        (normalize(form.address) !== normalize(itemSelected.address)) ||
        (normalize(form.availability) !== normalize(itemSelected.availability)) ||
        (normalize(form.requeriment) !== normalize(itemSelected.requeriment)) ||
        !fieldsVisiblesIsEqual(form.fields_visibles, itemSelected?.fields_visibles) ||
        !lodash.isEqual(form.languages, itemSelected?.languages) ||
        !lodash.isEqual(form.subservices, itemSelected?.subservices) ||
        !lodash.isEqual(form.images, itemSelected?.images)
        changePendingInForm.value = valid;
    return valid;
});

const fieldsVisiblesIsEqual = (array1, array2) => {
    let isEqual = true;
    for(let item of array1) {
        let exist = array2.includes(item);
        if (!exist) {
            isEqual = false;
        }
    }
    return array1.length === array2.length && isEqual;
}

const normalize = (value) => {
    return value === "" || value === null || value === undefined ? null : value;
}
// FUNCTION
function closePreviewImage () {
    isPreviewOpen.value = false;
}
function openModalDelete () {
    modalDeleteRef.value.openModal();
}

function prevTab () {
    if(stepCurrent.value > 0){
        stepCurrent.value--;
    } else {
        if (changePendingInForm.value) {
            openModalCancel();
        } else {
            closeModalForce();
        }
    }
}
function openModalCancel () {
    modalCancelChangeRef.value.openModal();
}
function closeModalCancel () {
    modalCancelChangeRef.value.closeModal();
}
async function submitSave () {
    isLoadingForm.value =true;
    let body = { ...form };
    const response = await transportStore.$storeOrUpdate(body);
    const { ok, data } = response;
    if (ok) {
        toast.warningToast('Cambios guardados con éxito','top-right');
        resetCompoent();
        location.reload();
    } else {
        toast.warningToast(data?.message,'top-right');
    }
    isLoadingForm.value = false;
}
async function submitDelete () {
    isLoadingForm.value =true;
    const response = await transportStore.$delete(form.id);
    const { ok, data } = response;
    if (ok) {
        toast.warningToast('Cambios guardados con éxito','top-right');
        resetCompoent();
        location.reload();
    } else {
        toast.warningToast(data?.message,'top-right');
    }
    isLoadingForm.value = false;
}
function resetCompoent () {
    closeModalForce();
    resetPageData();
}
function resetPageData () {
    emit('load:resetPageData');
}
function closeModal () {
    if (changePendingInForm.value) {
        openModalChangeInForm();
        return;
    }
    changePendingInForm.value = false;
    modelActive.value = null;
    stepCurrent.value = 0;
    resetData();
}
function closeModalForce () {
    changePendingInForm.value = false;
    modelActive.value = null;
    stepCurrent.value = 0;
    resetData();
}
function cancelChange () {
    resetData();
}
function resetData () {
    Object.assign(form, {...formDefault});
    
    // Vaciar el array de imágenes usando splice para mantener la reactividad
    form.images.splice(0, form.images.length);
    
    Object.assign(itemSelected, {...formDefault});
    itemSelected.images.splice(0, itemSelected.images.length); // Hacer lo mismo para itemSelected

}


function nextTab () {
    if (stepCurrent.value < 2) {
        if (formInvalid.value || !changesform.value || isLoadingForm.value) {
            return;
        }
        stepCurrent.value++;   
    } else {
        submitSave();
    }
}
function openGallery () {
    modalGaleryRef.value.openModal();
}
function addNewsImages (images) {
    images.forEach(item => {
        let { url, name, type } = item;
        form.images.push({ id:null, url, name, type });
    });
}
function openModalChangeInForm () {
    modalChangePendinginForm.value = true;
    nextTick(() => {
        modalChangePendinginForm.value = false;
    });
}

async function edit ({action, item}) {
    if (action === 'EDIT') {
        let { id, name, description, type, hire, link_url, type_price, price, images, languages, fields_visibles, duration, availability, address, requeriment, subservices } = item;

        if (languages?.length) {
            let languagesArray = languagesData.value.map(item => {
                return {
                    id: null,
                    abbreviation: item.abbreviation,
                    name: item.name,
                }
            }).filter(item => {
                let language = languages.find(lagSub => lagSub === item.abbreviation );
                return language;
            });
            languages = languagesArray;
        }

        let numPrice = price ? parseFloat(price) : null;
        if (numPrice && !isNaN(numPrice)) {
            numPrice = numPrice.toFixed(2);
        }

        let itemSelectedImages = JSON.parse(JSON.stringify(images));
        let formImages = JSON.parse(JSON.stringify(images));
        Object.assign(itemSelected, {  id, name, description, type, hire, link_url, type_price, price: numPrice, images: itemSelectedImages, languages: JSON.parse(JSON.stringify(languages)), fields_visibles: JSON.parse(JSON.stringify(fields_visibles)), duration, availability, address, requeriment });
        Object.assign(form, {id, name, description, type, hire, link_url, type_price, price: numPrice, images: formImages, languages: JSON.parse(JSON.stringify(languages)), fields_visibles: JSON.parse(JSON.stringify(fields_visibles)), duration, availability, address, requeriment });
        images.forEach(img => {
            urlsimages.value.push(img);
        });
        await nextTick();
        itemSelected.description = form.description;

        let subservicesArray = subservices.map(subservice => {
            if (subservice.languages?.length) {
                let languagesArray = languagesData.value.map(item => {
                    return {
                        id: null,
                        abbreviation: item.abbreviation,
                        name: item.name,
                    }
                }).filter(item => {
                    let language = subservice.languages.find(lagSub => lagSub === item.abbreviation );
                    return language;
                });
                subservice.languages = languagesArray;
            }

            let numPrice = subservice.price ? parseFloat(subservice.price) : null;
            if (numPrice && !isNaN(numPrice)) {
                numPrice = numPrice.toFixed(2);
            }

            return {
                id: subservice.id,
                name: subservice.name || null,
                description: subservice.description || null,
                image: {url: subservice.image?.url ?? subservice.image},
                languages: JSON.parse(JSON.stringify(subservice.languages)),
                fields_visibles: JSON.parse(JSON.stringify(subservice.fields_visibles)),
                price: numPrice || null,
                duration: subservice.duration || null,
                address: subservice.address || null,
                availability: subservice.availability || null,
                requeriment: subservice.requeriment || null,
                order: subservice.order,
            }
        });
        form.subservices = JSON.parse(JSON.stringify([...subservicesArray]));
        subservicesData.value = JSON.parse(JSON.stringify([...subservicesArray]));
        itemSelected.subservices = JSON.parse(JSON.stringify([...subservicesArray]));
    } else {
        Object.assign(itemSelected, {...formDefault});
        Object.assign(form, {...formDefault});
    }
}

defineExpose({ edit });

//
provide('transportStore', transportStore);
provide('form', form);
provide('formRules', formRules);
// provide('itemSelected', itemSelected);
provide('errors', errors);
provide('urlsimages', urlsimages);
provide('validateField', validateField);
provide('previewUrl', previewUrl);
provide('isPreviewOpen', isPreviewOpen);
provide('subservicesData', subservicesData);

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