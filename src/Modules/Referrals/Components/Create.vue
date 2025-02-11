<template>
  <Transition>
    <div 
      v-if="isOpenSidePanel" 
      class="fixed z-[2000] bg-[#00000080] top-0 left-0 h-screen w-screen"
      @click="isClosePanel"
    ></div>
  </Transition>

  <Transition name="slide">
    <div v-if="showSlidePanel" class="w-[500px] h-full bg-white fixed top-0 z-[2000] right-[354px] flex flex-col">
      <!-- Header -->
      <div class="flex justify-between items-center px-6 py-[20px] h-[64px] border-b border-[#BFBFBF]">
        <div class="flex-1 text-left">
          <h1 class="font-medium text-[22px]">Nuevo regalo para el {{ typeModalTitle }}</h1>
        </div>
        <div class="flex justify-end">
          <button class="cursor-pointer" @click="isClosePanel">
            <img src="/assets/icons/1.TH.CLOSE.svg" alt="icon_close" class="w-8 h-8 hover:bg-[#F3F3F3] rounded-[100px] p-1">
          </button>
        </div>
      </div>

      <!-- Form -->
      <div class="flex-1 overflow-y-auto px-6 py-6  w-full">
        <!-- Valor y Unidad -->
        <div class="flex flex-col gap-2">
          <span class="text-sm font-medium">Indica el valor y la unidad</span>
          <div class="flex gap-4">
            <BaseTextField
              v-model="form.amount"
              :error="errors.amount"
              type="text"
              placeholder="Introduce el valor"
              required
              autofocus
              autocomplete="off"
              class="flex-1"
              @input="validateValue"
              @mouseleave="adjustValue"
            /> 
            <div class="flex gap-4 items-center">
              <div class="flex gap-2">
                <RadioButton id="color-1" :value="'percentage'" v-model="form.type_discount" :iconSize="'w-6 h-6'" :spanSize="'w-3 h-3'" @change="onTypeChange"/>
                <span class="text-base font-semibold">%</span>
              </div>
              <div class="flex gap-2">
                <RadioButton id="color-2" :value="'money'" v-model="form.type_discount" :iconSize="'w-6 h-6'" :spanSize="'w-3 h-3'" @change="onTypeChange"/>
                <span class="text-base font-semibold">€</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Código -->
        <div class="flex flex-col gap-2 mt-4">
          <span class="text-sm font-medium">Indica el código que deseas utilizar</span>
          <BaseTextField
            v-model="form.code"
            :error="errors.code"
            type="text"
            placeholder="Ej: HOTEL2425"
            required
            autocomplete="off"
            class="flex-1"
          /> 
        </div>

        <!-- Cómo canjearlo -->
        <div class="flex flex-col gap-2 mt-4">
          <span class="text-sm font-medium">Cómo canjearlo</span>
          <BaseTextareaField
            v-model="form.description"
            placeholder="Ej: Descuento aplicable para la contratación de cualquier servicio de nuestro hotel. Debe efectuarse la solicitud del servicio previamente en recepción. Mostrar este cupón para solicitar el beneficio."
            class-content="flex-1"
            class-input="text-sm h-[100px] min-h-[80px] p-3"
            name="description"
            :max="'500'"
          />
        </div>
        <!-- url -->
         <div class="flex flex-col gap-2 mt-4">
          <div class="flex justify-between">
            <div class="flex gap-2">
              <span class="text-sm font-medium">Enlace a la página web donde canjearlo</span>
              <BaseTooltipResponsive
                  size="m"
                  :top="35"
                  :right="-75"
              >
                  <template #button>
                      <img class="w-[16px] h-[16px]" src="/assets/icons/TH.INFO.GREEN.svg">
                      </template>
                      <template #content>
                          <p class="text-sm leading-[150%] font-normal">
                            Añade aquí el enlace para que los {{ typeModalTitle }}s accedan a la página donde canjear su regalo.
                          </p>
                  </template>
              </BaseTooltipResponsive>

            </div>
             <!--  <BaseSwichInput
                v-model="form.enabled_url"
                class="mr-4"
                :id="'url_switch'"
                @change="handleUrl"
              /> -->
          </div>
          <BaseTextField
            v-model="form.url"
            type="text"
            placeholder="https://..."
            class="flex-1"
            :error="errors.url"
          />
         </div>
      </div>

      <!-- Footer -->
      <div class="py-4 px-6 border-t border-gray-300 bg-white">
        <div class="flex justify-between">
          <button  
            class="hbtn-tertiary text-sm font-medium underline"
            @click="cancel"
          >
            Cancelar
          </button>
          <button
            class="px-4 py-2 font-medium rounded text-black"
            :disabled="isFormIncomplete"
            :class="isFormIncomplete ? 'bg-gray-300 text-gray-400' : 'hbtn-cta text-black'"
            @click="submit"
          >
            Crear
          </button>
        </div>
      </div>
    </div>
  </Transition>
  <ModalNoSave
      :id="'not-saved'"
      :open="openModalNoSave"
      text="Tienes cambios sin guardar. Para aplicar los cambios realizados debes guardar."
      textbtn="Guardar"
      @saveChanges="saveOnClose"
      :type="'exit_save'"
      @close="cancel"
  />
</template>

<script setup>
import { ref, computed, inject, watch,defineEmits } from 'vue';
import RadioButton from '@/components/Forms/RadioButton.vue';
import BaseTextField from '@/components/Forms/BaseTextField';
import BaseTextareaField from '@/components/Forms/BaseTextareaField.vue';
import ModalNoSave from '@/components/ModalNoSave.vue';
import BaseSwichInput from "@/components/Forms/BaseSwichInput.vue";
import BaseTooltipResponsive from '@/components/BaseTooltipResponsive.vue';

import { useToastAlert } from '@/composables/useToastAlert';
const toast = useToastAlert();

const emit = defineEmits(['handleReferrals','typePeople']);

const showPanel = ref(false);
const showSlidePanel = ref(false);
const isOpenSidePanel = inject('isOpenSidePanel');
const typeModal = inject('typeModal');

const normalizedInitialData = ref({})
const isInitialized = ref(false);

const openModalNoSave = ref(false)

const form = ref({
    amount: '', 
    type_discount: 'percentage',
    code: '', 
    description: '',
    url: '',
    enabled_url: true
});


const errors = ref({
  amount: false,
  code: false,
  description: false,
  url: false
});


/* const handleUrl = (event) => {
  form.value.enabled_url = event.target.checked;
}; */


const isFormIncomplete = computed(() => {


  return (
    !form.value.amount ||
    !form.value.code ||
    !form.value.description ||
    (form.value.enabled_url && (!form.value.url || errors.value.url)) ||
    errors.value.value ||
    errors.value.code ||
    errors.value.description 


  );
});

const isValidUrl = (url) => {
  const urlPattern = /^https:\/\/([\w-]+\.)+[\w-]{2,}(\/\S*)?$/;
  return urlPattern.test(url);
};


watch(
  () => form.value.url,
  (newUrl) => {
    if (form.value.url !== '') {
      errors.value.url = newUrl && !isValidUrl(newUrl);
    } else {
      errors.value.url = false;
    }
  }

);

const typeModalTitle = computed(() => {
  return typeModal.value === 'referent' ? 'referente' : 'referido';
});

const validateValue = (event) => {
  //console.log(event.target.value)
  const inputValue = event.target.value.replace(/[^0-9.]/g, '').replace(',', '.');
  form.value.amount = inputValue;
 // Convertimos a string para asegurar que replace funcione
 

  if (form.value.type_discount === 'percentage' && parseFloat(inputValue) > 100) {
    errors.value.value = true;
  } else {
    errors.value.value = false;
  }
};

const adjustValue = () => {
  const numericValue = parseFloat(form.value.amount.replace(',', '.'));

  if (isNaN(numericValue) || form.value.amount === '') {
    //errors.value.value = true;
    form.value.amount = '';
    return;
  }

  if (form.value.type_discount === 'money') {
    form.value.amount = numericValue.toFixed(2).replace('.', ',');
  } else if (form.value.type_discount === 'percentage') {
    if (numericValue > 100) {
      form.value.amount = '100';
    } else {
      form.value.amount = numericValue.toString().replace('.', ',');
    }
  }
  errors.value.value = false;
};

const onTypeChange = () => {
  const numericValue = parseFloat(form.value.amount.replace(',', '.'));

  if (form.value.type_discount === 'money') {
    form.value.amount = numericValue ? numericValue.toFixed(2).replace('.', ',') : '';
  } else if (form.value.type_discount === 'percentage') {
    if (!numericValue || isNaN(numericValue)) {
      form.value.amount = '';
    } else {
      form.value.amount = numericValue > 100 ? '100' : numericValue.toString().replace('.', ',');
    }
  }
};


const isClosePanel = () => {
  console.log(hasChangeForm.value,form.value,normalizedInitialData.value)
  if (hasChangeForm.value) {
    openModalNoSave.value = true;
  } else {
    isOpenSidePanel.value = false;
    resetForm();
    
  }
};

const saveOnClose = () => {
  if(!isFormIncomplete.value){
    submit();
  }else{
    openModalNoSave.value = false;
  }
}

const cancel = () => {
  isOpenSidePanel.value = false;
  resetForm();
};

const resetForm = () => {
  form.value = {
    amount: '',
    type_discount: 'percentage',
    code: '',
    description: '',
    url: '',
    enabled_url: true
  };
  //normalizedInitialData.value = {};
}

const submit = () => {
  if (!isFormIncomplete.value) {
    toast.warningToast('Regalo añadido','top-right')
    emit('handleReferrals', form.value);
    emit('typePeople', typeModal.value);
    cancel();
    resetForm();

  }
};

watch(
  () => isOpenSidePanel.value,
  (newVal) => {
    if (newVal) {
      errors.value = {
        amount: false,
        code: false,
        description: false,
        url: false
      };

      normalizedInitialData.value = {
        amount: form.value.amount,
        type_discount: form.value.type_discount,
        code: form.value.code,
        description: form.value.description,
        url: form.value.url,
        enabled_url: true,
      }
      isInitialized.value = true;
      openModalNoSave.value = false;
      setTimeout(() => {
        showPanel.value = isOpenSidePanel.value;
      }, 120);

      setTimeout(() => {
        showSlidePanel.value = isOpenSidePanel.value;
      }, 250);
    } else {
      setTimeout(() => {
        showSlidePanel.value = isOpenSidePanel.value;
      }, 120);
      setTimeout(() => {
        showPanel.value = isOpenSidePanel.value;
      }, 300);
    }
  }
);


const hasChangeForm = computed(() => {
  return JSON.stringify(normalizedInitialData.value) !== JSON.stringify(form.value);
})
</script>

<style scoped>
  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.5s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }

  .v-enter-to, .v-leave-from {
    opacity: 1;
  }

  .slide-leave-active,
  .slide-enter-active {
    transition: all 0.3s ease-out;
  }

  .slide-enter-from,
  .slide-leave-to {
    transform: translateX(100%);
  }
</style>
