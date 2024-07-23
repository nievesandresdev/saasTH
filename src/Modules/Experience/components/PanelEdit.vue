<template>
    <transition>
        <div
            v-if="modelActive"
            class="shadow-xl bg-white flex flex-col justify-between z-[100] w-[500px] fixed"
            :style="`top: 0px; right: 353.5px; min-height: 100vh; height: 100vh;`"
            ref="refPanelEdit"
        >
            <div class="overflow-y-auto scrolling-sticky">
                <div class="px-6">
                    <div class="flex justify-between py-[20px]">
                        <h1 class="text-[22px] font-medium text-center">Sobre la experiencia</h1>
                        <button @click="closeModal">
                            <img class="w-[24px] h-[24px]" src="/assets/icons/1.TH.CLOSE.svg">                            
                        </button>
                    </div>
                </div>

                <div class="px-6 pt-[32px] pb-[35px] flex-1">
                    <template v-if="tabSelected === INFORMATION">
                        <PanelEditFormInformation />
                    </template>
                </div>
            </div>
            <div class="py-4 px-6 w-full flex justify-between  hborder-top-gray-400 z-[1000] hbg-white-100 w-full" style="height: 72px;">
                <template v-if="modelActive === 'EDIT'">
                    <button
                        class="py-3"
                        @click="changesform ? openModalCancel() : openModalDelete()"
                    >
                        <span class="underline font-medium">{{ changesform ? 'Cancelar' : 'Eliminar experiencia' }}</span>
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
    <ModalCancelChange
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
            @close="closeModal()"
        />
    </template>
</template>


<script setup>
import { ref, reactive, onMounted, provide, computed, toRefs, inject, nextTick } from 'vue';
import lodash from 'lodash';

// COMPONENTS
import PanelEditFormInformation from './PanelEditFormInformation.vue';
import ModalCancelChange from './ModalCancelChange.vue';
import ModalDelete from './ModalDelete.vue';
// import ModalCancelChangeFacility from './ModalCancelChangeFacility.vue';
import ModalNoSave from '@/components/ModalNoSave.vue';


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
const experienceStore = inject('experienceStore');
const mockupStore = inject('mockupStore');
const toast = inject('toast');
const hotelData = inject('hotelData');

const form = reactive({
    product_id: null,
    featured: null,
    recommendation: null,
});
const itemSelected = reactive({
    product_id: null,
    featured: null,
    recommendation: null,
});
const formDefault = reactive({
    product_id: null,
    featured: null,
    recommendation: null,
});
const formRules = {
    // title: [value => value.trim() ? true : 'Introduce '],
};

const { errors, validateField, formInvalid } = useFormValidation(form, formRules);

const isLoadingForm = ref(false);
const modalDeleteRef = ref(null);
const modalCancelChangeRef = ref(null);
//
provide('form', form);
provide('itemSelected', itemSelected);
provide('errors', errors);
provide('validateField', validateField);
provide('changePendingInForm', changePendingInForm);


//
// provide('schedulesDefault', {...schedulesDefault});

// CHANGE
const changesform = computed(() => {
    let valid = (normalize(form.recommendation) !== normalize(itemSelected.recommendation)) ||
        (Boolean(form.featured) !== Boolean(itemSelected.featured));
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

function edit ({action, experience}) {
    if (action === 'EDIT') {
        let { id, featured, recomendations } = experience;
        let  formObject = { product_id: id, featured, recommendation: recomendations?.message };
        Object.assign(itemSelected, formObject);
        Object.assign(form, formObject);
    }
}
defineExpose({ edit });
 

async function submitSave () {
    let body = { ...form };
    const response = await experienceStore.$update(body);
    const { ok, data } = response;
    if (ok) {
        toast.warningToast('Cambios guardados con éxito','top-right');
        resetCompoent();
    } else {
        toast.warningToast(data?.message,'top-right');
    }
}
async function submitDelete () {
    let params = {
        product_id: itemSelected.product_id,
        visivility: false,
        is_deleted: true,
    }
    const response = await experienceStore.$updateVisibility(params);
    const { ok, data } = response;
    if (ok) {
        toast.warningToast('Cambios guardados con éxito','top-right');
        resetCompoent();
    } else {
        toast.warningToast(data?.message,'top-right');
    }
}
function openModalCancel () {
    modalCancelChangeRef.value.openModal();
}
const normalize = (value) => {
    return value === "" || value === null || value === undefined ? null : value;
}
function resetCompoent () {
    closeModal();
    resetPageData();
}
function closeModal () {
    // if (changePendingInForm.value) {
    //     openModalChangeInForm();
    //     return;
    // }
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

function openModalChangeInForm () {
    modalChangePendinginForm.value = true;
    nextTick(() => {
        modalChangePendinginForm.value = false;
    });
}



</script>

<style lang="scss">
.v-enter-active,
.v-leave-active {
    transition: transform 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    transform: translateX(100%);
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