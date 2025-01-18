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
          <button class="">
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
              v-model="form.value"
              :error="errors.value"
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
                <RadioButton id="color-1" :value="'percentage'" v-model="form.type" :iconSize="'w-6 h-6'" :spanSize="'w-3 h-3'" @change="onTypeChange"/>
                <span class="text-base font-semibold">%</span>
              </div>
              <div class="flex gap-2">
                <RadioButton id="color-2" :value="'money'" v-model="form.type" :iconSize="'w-6 h-6'" :spanSize="'w-3 h-3'" @change="onTypeChange"/>
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
            v-model="form.how_redeem"
            placeholder="Ej: Descuento aplicable para la contratación de cualquier servicio de nuestro hotel. Debe efectuarse la solicitud del servicio previamente en recepción. Mostrar este cupón para solicitar el beneficio."
            class-content="flex-1"
            class-input="text-sm h-[100px] min-h-[80px] p-3"
            name="how_redeem"
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
</template>

<script setup>
import { ref, computed, inject, watch } from 'vue';
import RadioButton from '@/components/Forms/RadioButton.vue';
import BaseTextField from '@/components/Forms/BaseTextField';
import BaseTextareaField from '@/components/Forms/BaseTextareaField.vue';
import { useToastAlert } from '@/composables/useToastAlert';
const toast = useToastAlert();

const emit = defineEmits(['handleReferrals','typePeople']);

const showPanel = ref(false);
const showSlidePanel = ref(false);
const isOpenSidePanel = inject('isOpenSidePanel');
const typeModal = inject('typeModal');

const form = ref({
    value: '', 
    type: 'percentage', // Tipo (porcentaje o dinero)
    code: '', 
    how_redeem: '',
});

const errors = ref({
  value: false,
  code: false,
  how_redeem: false
});

const isFormIncomplete = computed(() => {

  return (
    !form.value.value ||
    !form.value.code ||
    !form.value.how_redeem ||
    errors.value.value ||
    errors.value.code ||
    errors.value.how_redeem
  );
});


const typeModalTitle = computed(() => {
  return typeModal.value === 'referent' ? 'referente' : 'referido';
});

const validateValue = (event) => {
  //console.log(event.target.value)
  const inputValue = event.target.value.replace(/[^0-9.]/g, '').replace(',', '.');
  form.value.value = inputValue;
 // Convertimos a string para asegurar que replace funcione
 

  if (form.value.type === 'percentage' && parseFloat(inputValue) > 100) {
    errors.value.value = true;
  } else {
    errors.value.value = false;
  }
};

const adjustValue = () => {
  const numericValue = parseFloat(form.value.value.replace(',', '.'));

  if (isNaN(numericValue) || form.value.value === '') {
    //errors.value.value = true;
    form.value.value = '';
    return;
  }

  if (form.value.type === 'money') {
    form.value.value = numericValue.toFixed(2).replace('.', ',');
  } else if (form.value.type === 'percentage') {
    if (numericValue > 100) {
      form.value.value = '100';
    } else {
      form.value.value = numericValue.toString().replace('.', ',');
    }
  }
  errors.value.value = false;
};

const onTypeChange = () => {
  const numericValue = parseFloat(form.value.value.replace(',', '.'));

  if (form.value.type === 'money') {
    form.value.value = numericValue.toFixed(2).replace('.', ',');
  } else if (form.value.type === 'percentage') {
    form.value.value = numericValue > 100 ? '100' : numericValue.toString().replace('.', ',');
  }
};

const isClosePanel = () => {
  isOpenSidePanel.value = false;
  //reset form
  form.value = {
    value: '',
    type: 'percentage',
    code: '',
    how_redeem: ''
  };
};


const cancel = () => {
  isOpenSidePanel.value = false;
};

const submit = () => {
  if (!isFormIncomplete.value) {
    //console.log('Formulario enviado:', form.value);
    toast.warningToast('Regalo añadido','top-right')
    emit('handleReferrals', form.value);
    emit('typePeople', typeModal.value);
    isClosePanel();

  }
};

watch(
  () => isOpenSidePanel.value,
  (newVal) => {
    if (newVal) {
      setTimeout(() => {
        showPanel.value = isOpenSidePanel.value;
      }, 200);
      setTimeout(() => {
        showSlidePanel.value = isOpenSidePanel.value;
      }, 400);
    } else {
      setTimeout(() => {
        showSlidePanel.value = isOpenSidePanel.value;
      }, 200);
      setTimeout(() => {
        showPanel.value = isOpenSidePanel.value;
      }, 400);
    }
  }
);
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
