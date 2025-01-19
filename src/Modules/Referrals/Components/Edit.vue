<template>
    <Transition>
      <div 
        v-if="isOpenEditPanel" 
        class="fixed z-[2000] bg-[#00000080] top-0 left-0 h-screen w-screen"
        @click="isClosePanel"
      ></div>
    </Transition>
  
    <Transition name="slide">
      <div v-if="showSlidePanel" class="w-[500px] h-full bg-white fixed top-0 z-[2000] right-[354px] flex flex-col">
        <!-- Header -->
        <div class="flex justify-between items-center px-6 py-[20px] h-[64px] border-b border-[#BFBFBF]">
          <div class="flex-1 text-left">
            <h1 class="font-medium text-[22px]">Editar regalo para el {{ typeModalTitle }}</h1>
          </div>
          <div class="flex justify-end" @click="isClosePanel">
            <button class="">
              <img src="/assets/icons/1.TH.CLOSE.svg" alt="icon_close" class="w-8 h-8 hover:bg-[#F3F3F3] rounded-[100px] p-1">
            </button>
          </div>
        </div>
  
        <!-- Form -->
        <div class="flex-1 overflow-y-auto px-6 py-6 w-full">
          <!-- Valor y Unidad -->
          <div class="flex flex-col gap-2">
            <span class="text-sm font-medium">Edita el valor y la unidad</span>
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
                  <RadioButton id="color-1" :value="'percentage'" v-model="form.type_discount" :iconSize="'w-6 h-6'" :spanSize="'w-3 h-3'" @change="onTypeChange" />
                  <span class="text-base font-semibold">%</span>
                </div>
                <div class="flex gap-2">
                  <RadioButton id="color-2" :value="'money'" v-model="form.type_discount" :iconSize="'w-6 h-6'" :spanSize="'w-3 h-3'" @change="onTypeChange" />
                  <span class="text-base font-semibold">€</span>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Código -->
          <div class="flex flex-col gap-2 mt-4">
            <span class="text-sm font-medium">Edita el código</span>
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
            <span class="text-sm font-medium">Edita cómo canjearlo</span>
            <BaseTextareaField
              v-model="form.description"
              placeholder="Ej: Descuento aplicable para la contratación de cualquier servicio de nuestro hotel. Debe efectuarse la solicitud del servicio previamente en recepción. Mostrar este cupón para solicitar el beneficio."
              class-content="flex-1"
              class-input="text-sm h-[100px] min-h-[80px] p-3"
              name="description"
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
              Guardar
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
  
  const emit = defineEmits(['updateGift', 'typePeople']);
  
  // Props para recibir datos precargados
  const props = defineProps({
    initialData: {
      type: Object,
      required: true,
    },
  });
  
  const showPanel = ref(false);
  const showSlidePanel = ref(false);
  const isOpenEditPanel = inject('isOpenEditPanel');
  const typeModal = inject('typeModal');
  
  // Datos del formulario inicializados con los datos precargados
  const form = ref({
    amount: props?.initialData?.amount,
    type_discount: props?.initialData?.type_discount,
    code: props?.initialData?.code,
    description: props?.initialData?.description,
  });
  
  const errors = ref({
    amount: false,
    code: false,
    description: false,
  });
  
  const isFormIncomplete = computed(() => {
    return (
      !form.value.amount ||
      !form.value.code ||
      !form.value.description ||
      errors.value.amount ||
      errors.value.code ||
      errors.value.description
    );
  });
  
  const typeModalTitle = computed(() => {
    return typeModal.value === 'referent' ? 'referente' : 'referido';
  });
  
  const validateValue = (event) => {
    const inputValue = event.target.value.replace(/[^0-9.]/g, '').replace(',', '.');
    form.value.amount = inputValue;
  
    if (form.value.type_discount === 'percentage' && parseFloat(inputValue) > 100) {
      errors.value.amount = true;
    } else {
      errors.value.amount = false;
    }
  };
  
  const adjustValue = () => {
    const numericValue = parseFloat(form.value.amount.replace(',', '.'));
  
    if (isNaN(numericValue) || form.value.amount === '') {
      form.value.amount = '';
      return;
    }
  
    if (form.value.type_discount === 'money') {
      form.value.amount = numericValue.toFixed(2).replace('.', ',');
    } else if (form.value.type_discount === 'percentage') {
      form.value.amount = numericValue > 100 ? '100' : numericValue.toString().replace('.', ',');
    }
    errors.value.amount = false;
  };
  
  const onTypeChange = () => {
    const numericValue = parseFloat(form.value.amount.replace(',', '.'));
  
    if (form.value.type_discount === 'money') {
      form.value.amount = numericValue.toFixed(2).replace('.', ',');
    } else if (form.value.type_discount === 'percentage') {
      form.value.amount = numericValue > 100 ? '100' : numericValue.toString().replace('.', ',');
    }
  };
  
  const isClosePanel = () => {
    isOpenEditPanel.value = false;
  };
  
  const cancel = () => {
    isOpenEditPanel.value = false;
  };
  
  const submit = () => {
    if (!isFormIncomplete.value) {
      toast.warningToast('Regalo modificado', 'top-right');
      emit('updateGift', form.value);
      isClosePanel();
    }
  };
  
  watch(
    () => isOpenEditPanel.value,
    (newVal) => {
      if (newVal) {
        setTimeout(() => {
          showPanel.value = isOpenEditPanel.value;
          form.value = {
            amount: props?.initialData?.amount,
            type_discount: props?.initialData?.type_discount,
            code: props?.initialData?.code,
            description: props?.initialData?.description,
          };
        }, 200);
        setTimeout(() => {
          showSlidePanel.value = isOpenEditPanel.value;
        }, 400);
      } else {
        setTimeout(() => {
          showSlidePanel.value = isOpenEditPanel.value;
        }, 200);
        setTimeout(() => {
          showPanel.value = isOpenEditPanel.value;
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
  