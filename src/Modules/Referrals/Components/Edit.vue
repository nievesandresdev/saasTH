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
                            Añade aquí el enlace para que los referidos accedan a la página donde canjear su regalo.
                          </p>
                  </template>
              </BaseTooltipResponsive>

            </div>
              <!-- <BaseSwichInput
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
              Guardar
            </button>
          </div>
        </div>
      </div>
    </Transition>
    <template v-if="showSlidePanel">
      <ModalNoSave
        :id="'not-saved'"
        :open="openModalNoSave"
        text="Tienes cambios sin guardar. Para aplicar los cambios realizados debes guardar."
        textbtn="Guardar"
        @saveChanges="submit"
        @close="cancel"
        type="exit_save"
      />
    </template>

  </template>
  
  <script setup>
  import { ref, computed, inject, watch,defineEmits,defineProps, onMounted } from 'vue';
  import RadioButton from '@/components/Forms/RadioButton.vue';
  import BaseTextField from '@/components/Forms/BaseTextField';
  import BaseTextareaField from '@/components/Forms/BaseTextareaField.vue';
  import BaseSwichInput from "@/components/Forms/BaseSwichInput.vue";
  import BaseTooltipResponsive from '@/components/BaseTooltipResponsive.vue';

  import ModalNoSave from '@/components/ModalNoSave.vue';


  import { useToastAlert } from '@/composables/useToastAlert';
  const toast = useToastAlert();
  

  const emit = defineEmits(['updateGift']);
  
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

  const openModalNoSave = ref(false)
  
  // Datos del formulario inicializados con los datos precargados
  const form = ref({
    amount: props?.initialData?.amount,
    type_discount: props?.initialData?.type_discount,
    code: props?.initialData?.code,
    description: props?.initialData?.description,
    enabled_url: true,
    url: props?.initialData?.url,
  });

  const errors = ref({
    amount: false,
    code: false,
    description: false,
    url: false,
  });

  const normalizedInitialData = ref({})

  const hasFormChanged = computed(() => {
    return (
      isInitialized.value &&
      JSON.stringify(form.value) !== JSON.stringify(normalizedInitialData.value)
    );
  });
  
  const isFormIncomplete = computed(() => {
    return (
      !form.value.amount ||
      !form.value.code ||
      !form.value.description ||
      (!form.value.url || errors.value.url) ||
      errors.value.amount ||
      errors.value.code ||
      errors.value.description ||
      !hasFormChanged.value
    );
  });



  const handleUrl = (event) => {
    form.value.enabled_url = event.target.checked;
  };

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
    const inputValue = event.target.value.replace(/[^0-9.]/g, '').replace(',', '.');
    form.value.amount = inputValue;
  
    if (form.value.type_discount === 'percentage' && parseFloat(inputValue) > 100) {
      errors.value.amount = true;
    } else {
      errors.value.amount = false;
    }
  };
  
  const adjustValue = () => {
    const numericValue = parseFloat(form?.value?.amount);
    const numericInitialData = parseFloat(normalizedInitialData?.value?.amount);
  
    if (isNaN(numericValue) || form.value.amount === '') {
      form.value.amount = '';
      return;
    }
  
    if (form.value.type_discount === 'money') {
      form.value.amount = numericValue.toFixed(2).replace('.', ',');
      normalizedInitialData.value.amount = numericInitialData.toFixed(2).replace('.', ',');
    } else if (form.value.type_discount === 'percentage') {
      form.value.amount = numericValue > 100 ? '100' : numericValue.toString().replace('.', ',');
      normalizedInitialData.value.amount = numericInitialData > 100 ? '100' : numericInitialData.toString().replace('.', ',');
    }
    errors.value.amount = false;
  };
  
  const onTypeChange = () => {
    const numericValue = parseFloat(form?.value?.amount);
    console.log(numericValue,form.value.type_discount)
  
    if (form.value.type_discount === 'money') {
      form.value.amount = numericValue ? numericValue : '';
    } else if (form.value.type_discount === 'percentage') {
      //form.value.amount = numericValue > 100 ? '100' : numericValue.toString().replace('.', ',');
      if (!numericValue || isNaN(numericValue)) {
        form.value.amount = '';
      } else {
        form.value.amount = numericValue > 100 ? '100' : numericValue.toString().replace('.', ',');
      }
    }

    adjustValue();
  };

  const isClosePanel = () => {
    if(!isFormIncomplete.value){
      openModalNoSave.value = true
    }else{
      isOpenEditPanel.value = false;
      openModalNoSave.value = false;
    }
  };
  
  const cancel = () => {
    isOpenEditPanel.value = false;
    openModalNoSave.value = false;
  };
  
  const submit = () => {
    if (!isFormIncomplete.value) {
      toast.warningToast('Regalo modificado', 'top-right');
      emit('updateGift', form.value, typeModal.value);
      cancel();
    }
  };

  const isInitialized = ref(false);

  
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
            enabled_url: true,
            url: props?.initialData?.url,
            used: props?.initialData?.used,
          };

          isInitialized.value = true;
          normalizedInitialData.value = {
            amount: props?.initialData?.amount,
            type_discount: props?.initialData?.type_discount,
            code: props?.initialData?.code,
            description: props?.initialData?.description,
            enabled_url: true,
            url: props?.initialData?.url,
            used: props?.initialData?.used,
          };

          adjustValue();
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
  