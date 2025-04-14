<template>
    <div
        v-if="modelSubserviceActive"
        class="w-full fixed top-0 left-0 z-[40]"
        :class="userStore.showSuscriptionBanner ? 'top-with-banner h-with-banner' : 'h-without-banner'"
        @click="closeModal"
    ></div>
    <transition name="slide">
        <div
            v-if="modelSubserviceActive"
            class="shadow-xl bg-white flex flex-col justify-between z-[50] w-[500px] fixed bg-white"
            :class="userStore.showSuscriptionBanner ? 'top-with-banner h-with-banner' : 'h-without-banner top-0'"
            :style="`right: 353.5px;`"
            
            ref="ref
            PanelEdit"
        >
            <div
                class=""
                :class="{'mx-6': modelSubserviceActive === 'ADD', 'border-b hborder-bottom-gray-400 pb-4': modelSubserviceActive === 'ADD'}"
            >
                <div class="px-6">
                    <div class="flex justify-between py-[20px]">
                        <h1 class="text-[22px] font-medium text-center">{{ modelSubserviceActive === 'EDIT' ? 'Editar subservicio' : 'Crea tu subservicio'}}</h1>
                        <button @click="closeModal">
                            <img class="w-[24px] h-[24px]" src="/assets/icons/1.TH.CLOSE.svg">                            
                        </button>
                    </div>
                </div>
                <!-- tabs -->
                <template v-if="modelSubserviceActive === 'ADD'">
                    <BaseStepper v-model="stepCurrent"  :steps="steps" />
                </template>
                <template v-else>
                    <BaseTab v-model="stepCurrent" class="px-[24px]" :items="steps" />
                </template>
            </div>
            <div class="pb-6" style="height: calc(100% - 72px); overflow: auto;">
                <div class="px-6 mt-[24px] mt-3">
                    <template v-if="stepCurrent === 0">
                        <PanelEditSubserviceFormInformation @open:gallery="openGallery" />
                    </template>
                    <template v-else-if="stepCurrent === 1">
                        <PanelEditSubserviceFormCharacteristics />
                    </template>
                </div>    
            </div>
            <div class="py-4 px-6 flex justify-between  hborder-top-gray-400 z-[1000] hbg-white-100 w-full" style="height: 72px;">
                <template v-if="modelSubserviceActive === 'EDIT'">
                    <button
                        class="py-3"
                        @click="openModalChangeInForm()"
                        :disabled="formInvalid || !changesform || isLoadingForm || !formIsFull || !form.image"
                    >
                        <span class="underline font-medium">Cancelar</span>
                    </button>
                    <button
                        class="hbtn-cta px-4 py-3 font-medium rounded-[6px] leading-[110%]"
                        :disabled="formInvalid || !changesform || isLoadingForm || !formIsFull || !form.image || validCharacteristics(form)"
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
                        :disabled="formInvalid || !changesform || isLoadingForm || !formIsFull || (!form.image && stepCurrent == 0) || (stepCurrent == 1 && validCharacteristics(form))"
                        @click="nextTab"
                    >
                        {{ stepCurrent === 0 ? 'Siguiente' : 'Crear' }}
                    </button>
                </template>
            </div>
        </div>
    </transition>
    <ModalGallery
        ref="modalGaleryRef"
        :id="'modal-gallery-subservice'"
        :name-image-new="hotelStore?.hotelData?.name"
        @update:img="addNewsImages($event)"
    />
    <ModalCancelChange 
        ref="modalCancelChangeRef"
        @submit:saveChange="submitSave()"
        @submit:closeModal="closeModalForce"
    />
    <template v-if="modelSubserviceActive">
        <ModalNoSave
            :id="'not-saved'"
            :open="changesform"
            text="Tienes cambios sin guardar. Para aplicar los cambios realizados debes guardar."
            textbtn="Guardar"
            @saveChanges="submitSave"
            type="save_changes"
            :force-open="modalChangePendinginFormService"
            @close="closeModalForce()"
        />
    </template>
    <ModalDeleteSubservice
        ref="modalDeleteSubserviceRef"
        @submit:delete="submitDeleteSubservice()"
    />
</template>

<script setup>
import { ref, reactive, onMounted, provide, computed, toRefs, inject, nextTick, watch } from 'vue';
import lodash from 'lodash';

import { useFormValidation } from '@/composables/useFormValidation'
import * as rules from '@/utils/rules';

// COMPONENTS
import BasePreviewImage from "@/components/BasePreviewImage.vue";
import ModalGallery from "@/components/ModalGallery.vue";
import BaseStepper from '@/components/BaseStepper.vue';
import PanelEditSubserviceFormInformation from './PanelEditSubserviceFormInformation.vue';
import PanelEditSubserviceFormCharacteristics from './PanelEditSubserviceFormCharacteristics.vue';
import ModalCancelChange from './ModalCancelChange.vue';
import ModalNoSave from '@/components/ModalNoSave.vue';
import BaseTab from '@/components/BaseTab.vue';
import ModalDeleteSubservice from './ModalDeleteSubservice.vue';

const emit = defineEmits(['load:resetPageData']);

import { ServiceTypeEnum } from "@/shared/enums/ServiceTypeEnum";

// STORE
import { useUserStore } from '@/stores/modules/users/users'
const userStore = useUserStore();
import { useSubserviceStore } from '@/stores/modules/subservice'
const subserviceStore = useSubserviceStore();

import { useServiceStore } from '@/stores/modules/service'
const serviceStore = useServiceStore();
const { form: formService, itemSelected: itemSelectedService, formDefault: formDefaultService } = serviceStore;

// COMPOSABLES
import { useToastAlert } from '@/composables/useToastAlert'
const toast = useToastAlert();
import { useEventBus } from '@/composables/eventBus';
const { onEvent, emitEvent } = useEventBus();

import { useService } from '@/composables/useService';
const { validCharacteristics } = useService();


// INJECT
const hotelStore = inject('hotelStore');
const confortStore = inject('confortStore');
const changePendingInFormService = inject('changePendingInFormService');
const modalChangePendinginFormService = inject('modalChangePendinginFormService');
const modelSubserviceActive = inject('modelSubserviceActive');
const serviceNameCurrent = inject('serviceNameCurrent');


// DATA
const stepCurrent = ref(0);
const modalGaleryRef  = ref(null);
const modalCancelChangeRef  = ref(null);
const modalDeleteSubserviceRef  = ref(null);
const modalDeleteRef  = ref(null);
const indexItemSelected = ref(null);

const valueFormDefault = {
    id: null,
    name: '',
    description: '',
    price: null,
    image: null,
    languages: [],
    fields_visibles: [],
    duration: null,
    availability: '',
    address: '',
    requeriment: '',
    order: null,
}

const form = reactive(JSON.parse(JSON.stringify(valueFormDefault)));
const itemSelected = reactive(JSON.parse(JSON.stringify(valueFormDefault)));
const formDefault = reactive(JSON.parse(JSON.stringify(valueFormDefault)));

const formRules = reactive({
    name: [{
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

const { errors, validateField, formInvalid, formIsFull, validateAllFields, isFormFull } = useFormValidation(form, formRules);

const isLoadingForm = ref(false);
const urlsimages = ref([]);
const modalDeleteFacilityRef = ref(null);
const modalCancelChangeFacilityRef = ref(null);
const indexSubserviceDeleteId = ref(null);

const previewUrl = ref(null);
const isPreviewOpen = ref(false);

// EVENT
onEvent('open-modal-delete-item', openModalDeleteItem);

// ONMOUNTED
onMounted(() => {
});

// COMPUTED
const steps = computed(() => {
    return [
        {
            name: 'Información',
            value: 0,
            disabled: false
        },
        {
            name: 'Caracteristicas',
            value: 1,
            disabled:  formInvalid.value || !changesform.value || isLoadingForm.value || !formIsFull.value
        },
    ];
});
const changesform = computed(() => {
    let valid = (normalize(form.name) !== normalize(itemSelected.name)) ||
        (normalize(form.description) !== normalize(itemSelected.description)) ||
        !lodash.isEqual(form.image, itemSelected?.image) ||
        //
        (normalize(form.price) !== normalize(itemSelected.price)) ||
        (normalize(form.duration) !== normalize(itemSelected.duration)) ||
        (normalize(form.availability) !== normalize(itemSelected.availability)) ||
        (normalize(form.address) !== normalize(itemSelected.address)) ||
        (normalize(form.requeriment) !== normalize(itemSelected.requeriment)) ||
        !fieldsVisiblesIsEqual(form.fields_visibles, itemSelected?.fields_visibles) ||
        !lodash.isEqual(form.languages, itemSelected?.languages)
        changePendingInFormService.value = valid;
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

function prevTab () {
    if(stepCurrent.value === 1){
        stepCurrent.value--;
    } else {
        if (changePendingInFormService.value) {
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
    
    if (modelSubserviceActive.value === 'ADD') {
        formService.subservices.push({...form }); 
    } else {
        const index = formService.subservices.findIndex(item => item.id === form.id);
        if (index !== -1) {
            formService.subservices[index] = { ...form };
        }
    }

    resetCompoent();
    toast.warningToast('Cambios guardados con éxito','top-right');
    isLoadingForm.value = false;
}
async function submitDeleteSubservice () {
    let body = {service_id: form.id, services_type: serviceNameCurrent.value};
    formService.subservices.splice(indexSubserviceDeleteId.value, 1);
    emitEvent('load-subservices');
}
function resetCompoent () {
    closeModalForce();
    // resetPageData();
}
function resetPageData () {
    emit('load:resetPageData');
}
function closeModal () {
    if (changePendingInFormService.value) {
        openModalChangeInForm();
        return;
    }
    changePendingInFormService.value = false;
    modelSubserviceActive.value = null;
    stepCurrent.value = 0;
    resetData();
    openPanelEdit();
}
function closeModalForce () {
    changePendingInFormService.value = false;
    modelSubserviceActive.value = null;
    stepCurrent.value = 0;
    resetData();
    openPanelEdit();
}

function openPanelEdit () {
    emit('openPanelEdit');
}

function cancelChange () {
    resetData();
}

function resetData () {
    Object.assign(form, {...formDefault});
    
    // Vaciar el array de imágenes usando splice para mantener la reactividad
    form.image = null;
    
    Object.assign(itemSelected, {...formDefault});
    itemSelected.image = null; // Hacer lo mismo para itemSelected

}


function nextTab () {
    if (stepCurrent.value == 0) {
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
function addNewsImages (image) {
    let { url, name, type } = image;
    form.image = { id:null, url, name, type };
}
function openModalChangeInForm () {
    modalChangePendinginFormService.value = true;
    nextTick(() => {
        modalChangePendinginFormService.value = false;
    });
}

function openModalDeleteItem (payload) {
    let { indexSubserviceId } = payload;
    indexSubserviceDeleteId.value = indexSubserviceId;
    if (modalDeleteSubserviceRef.value) {
        modalDeleteSubserviceRef.value.openModal();
    }
}

function edit ({action, serviceId, subservice}) {
    if (action === 'EDIT') {
        let {
            id, name, description, price, image, languages, fields_visibles, duration, availability, address, requeriment, order
        } = subservice;
        let numPrice = price ? parseFloat(price) : null;
        if (numPrice && !isNaN(numPrice)) {
            numPrice = numPrice.toFixed(2);
        }

        let imageObject = {
            url: image?.url ?? image,
        }



        Object.assign(itemSelected, { id, name, description, price: numPrice, image: imageObject, languages: JSON.parse(JSON.stringify(languages)), fields_visibles: JSON.parse(JSON.stringify(fields_visibles)), duration, availability, address, requeriment, order });
        Object.assign(form, { id, name, description, price: numPrice, image: imageObject, languages: JSON.parse(JSON.stringify(languages)), fields_visibles: JSON.parse(JSON.stringify(fields_visibles)), duration, availability, address, requeriment, order });
    } else {
        Object.assign(itemSelected, {...formDefault});
        Object.assign(form, {...formDefault});
    }
}
defineExpose({ edit });


//
provide('confortStore', confortStore);
provide('form', form);
// provide('itemSelected', itemSelected);
provide('errors', errors);
provide('urlsimages', urlsimages);
provide('validateField', validateField);
provide('formRules', formRules);
provide('previewUrl', previewUrl);
provide('isPreviewOpen', isPreviewOpen);
provide('indexItemSelected', indexItemSelected);

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