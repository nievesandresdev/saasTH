<template>
    <transition>
      <div
        v-if="modalEdit"
        class="absolute bg-white shadow-xl add flex-column"
        :style="`top: ${containerTop}px; right: 0; min-height: calc(100vh - ${containerTop}px); height: calc(100vh - ${containerTop}px); z-index: 700;`"
        ref="ref_section_edit"
      >
        <div class="overflow-y-auto scrolling-sticky" style="height: calc(100% - 72px)">
          <div class="flex justify-between items-center px-6 py-5">
            <div class="text-center">
              <h1 class="font-[500] text-[22px]">Editar política</h1>
            </div>
            <div class="flex justify-end">
              <button @click="closeModal">
                <img src="/assets/icons/1.TH.CLOSE.svg" alt="icon_close" class="w-6 h-6">
              </button>
            </div>
          </div>
          <hr class="mb-1">
          <div class="py-3 px-6">
            <section class="mb-2">
              <label class="text-sm font-medium block">Título*</label>
              <span class="mt-2 font-normal text-sm mb-[8px] text-black" v-if="errors.title">Nombra directamente la política, como "No salir sin camiseta", para mayor claridad.</span>
              <BaseTextField v-model="form.title" placeholder="Ejemplo: No salir sin camiseta" :error="errors.title" />
              <div v-if="errors.title" class="flex mt-1 text-[#FF6666] justify-left">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="mr-1 bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
                  <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                </svg>
                <small>{{ errors.title }}</small>
              </div>
              <div class="text-sm text-right">{{ form.title.length }}/50</div>
            </section>
            <section class="mb-4">
              <label class="text-sm font-medium mb-[6px] block">Descripción*</label>
              <BaseTextareaField
                v-model="form.description"
                placeholder="Ejemplo: No se permite salir sin camiseta por los pasillos para evitar incomodar a los demás huéspedes"
                class-content="flex-1"
                class-input="text-sm h-[100px] min-h-[64px] p-3"
                name="description"
                :error="errors.description"
              />
              <div v-if="errors.description" class="flex mt-1 text-[#FF6666] justify-left">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="mr-1 bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
                  <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                </svg>
                <small>{{ errors.description }}</small>
              </div>
            </section>
            <section class="flex justify-between items-center mb-2">
              <label class="text-sm font-medium">Penalización</label>
              <div class="flex items-center gap-1">
                <span class="font-medium text-[10px]">No</span>
                <BaseSwitchInput v-model="form.penalization" />
              </div>
            </section>
            <section class="mb-4">
              <BaseTextareaField
                v-model="form.penalizationDetails"
                :disabled="!form.penalization"
                placeholder="Ejemplo: Se penalizará con 30€ la primera vez y 100€ si la acción es repetida"
                class-content="flex-1"
                class-input="text-sm h-[100px] min-h-[64px] p-3"
                name="penalizationDetails"
                :error="errors.penalizationDetails"
              />
              <div v-if="errors.penalizationDetails" class="flex mt-1 text-[#FF6666] justify-left">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="mr-1 bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
                  <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                </svg>
                <small>{{ errors.penalizationDetails }}</small>
              </div>
            </section>
          </div>
        </div>
        <div 
          class="tertiary-black-200 py-4 px-6 flex items-center justify-between border-t border-gray z-[1000] bg-white w-full" 
          style="height: 72px;" 
        >
          <button class="underline font-medium" @click="closeModal">
            Cancelar
          </button>
          <button
            class="hbtn-cta px-4 py-3 font-medium rounded-[6px] leading-[110%]"
            @click="submit"
          >
            Guardar
          </button>
        </div>
      </div>
    </transition>
  </template>
  
  <script setup>
import { ref, onMounted, defineEmits, defineProps, reactive, watch } from 'vue';
import BaseTextField from '@/components/Forms/BaseTextField.vue';
import BaseSwitchInput from '@/components/Forms/BaseSwichInput.vue';
import BaseTextareaField from '@/components/Forms/BaseTextareaField.vue';

const emits = defineEmits(['close', 'store']);
const props = defineProps({
    modalEdit: Boolean,
    data : Object
});

const form = reactive({
    title: props.data.title || '',
    description: props.data.description || '',
    penalization: props.data.penalization || false,
    penalizationDetails: props.data.penalization_details || ''
});

const errors = reactive({
    title: false,
    description: false,
    penalizationDetails: false
});

const containerTop = ref(0);
const ref_section_edit = ref(null);

onMounted(() => {
    const sectionExpElement = document.getElementById('layout-hoster');
    if (sectionExpElement) {
        containerTop.value = sectionExpElement.offsetTop;
    }
    
});

const closeModal = () => {
    resetForm();
    emits('close');
};

const submit = () => {
    validateForm();
    if (!errors.title && !errors.description && !errors.penalizationDetails) {
        emits('store', form);
        closeModal()
        emits('close');
    }
};

const validateForm = () => {
    errors.title = !form.title.trim() ? 'Es necesario llenar este campo' : (form.title.length > 50 ? 'Te has pasado el límite de caracteres' : false);
    errors.description = !form.description.trim() ? 'Es necesario llenar este campo' : false;
    errors.penalizationDetails = (form.penalization && !form.penalizationDetails.trim()) ? 'Es necesario llenar este campo' : false;
};

watch(() => props.modalEdit, (newVal) => {
    if (newVal) {
        form.title = props.data.title || '';
        form.description = props.data.description || '';
        form.penalization = props.data.penalization || false;
        form.penalizationDetails = props.data.penalization_details || '';
        form.id = props.data.id;
    }
});

// Watchers to reset error states
watch(() => form.title, (newVal) => {
    if (newVal.trim() && newVal.length <= 50) {
        errors.title = false;
    }
});

watch(() => form.description, (newVal) => {
    if (newVal.trim()) {
        errors.description = false;
    }
});

watch(() => form.penalizationDetails, (newVal) => {
    if (!form.penalization || (form.penalization && newVal.trim())) {
        errors.penalizationDetails = false;
    }
});

/* watch(() => form.penalization, (newVal) => {
    if (!newVal) {
        form.penalizationDetails = '';
        errors.penalizationDetails = false;
    }
}); */

function resetForm() {
    form.title = '';
    form.description = '';
    form.penalization = false;
    form.penalizationDetails = '';
    errors.title = false;
    errors.description = false;
    errors.penalizationDetails = false;
}
</script>

  
  
  
  
  
<style lang="scss">
  .add {
      width: 500px;
      position: fixed;
  }
  
  .v-enter-active, .v-leave-active {
      transition: transform 0.5s ease;
  }
  
  .v-enter-from, .v-leave-to {
      transform: translateX(100%);
  }
  
  .scrolling-sticky {
      &::-webkit-scrollbar {
          -webkit-appearance: none;
      }
    
      &::-webkit-scrollbar:vertical {
          width: 16px;
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
    
      &::-webkit-scrollbar:horizontal {
          width: 0;
          height: 0;
      }
  }
  
  .modal-fade-enter-active, .modal-fade-leave-active {
      transition: opacity 0.4s ease;
  }
  
  .modal-fade-enter-from, .modal-fade-leave-to {
      opacity: 0;
  }
  
  .modal-fade-enter-to, .modal-fade-leave-from {
      opacity: 1;
  }
</style>
  