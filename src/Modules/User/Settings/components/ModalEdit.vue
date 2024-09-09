<template>
  <ModalWindow :isVisible="isVisible" width="341px" footer :paddingTop="4" :paddingBottom="4" :paddingLeft="6" :paddingRight="6" :topOffset="'10%'" >
    <template #header>
      <div class="flex items-center justify-between py-4 px-6">
        <h1 class="text-lg font-medium leading-[110%]">Editar puesto de trabajo</h1>
        <button @click.prevent="closeModal">
          <img class="w-5 h-5" src="/assets/icons/1.TH.CLOSE.svg" alt="">
        </button>
      </div>
      <hr>
    </template>
    <template #content>
      <label class="text-sm font-semibold">Nombre del puesto de trabajosss*</label>
      <BaseTextField
        v-model="form.name"
        placeholder="Ejemplo: Manager"
        classContent="mt-2"
        :errors="errors"
        name="name"
        @input:typing="validate"
      />

      <div class="flex justify-start w-full mt-4">
        <h3
          class="flex-1 text-center py-2 text-base font-semibold cursor-pointer relative"
          v-for="(step, index) in steps"
          :key="step.number"
          :class="{
            'bg-[#ECF9F5] text-[#0B6357] rounded-t-lg rounded-bottom-border active-step': currentStep === step.number,
            'text-gray-300': currentStep !== step.number
          }"
          @click="currentStep = step.number"
        >
          {{ step.label }}
        </h3>
      </div>
      <hr class="mb-5 px-4">
      <div v-if="currentStep === 1" class="mb-6">
        <AccessPermissions
          v-model:permissions="form.permissions"
        />
      </div>
      <div v-if="currentStep === 2">
        <Notifications 
          v-model:periodicityChat="form.periodicityChat"
          v-model:periodicityStay="form.periodicityStay"
          v-model:notifications="form.notifications"
        />

      </div>
    </template>

    <template #footer>
      <div class="border-t hborder-gray-400 py-4 px-6 flex items-center justify-between">
        <button 
          @click="cancel"
          class="text-sm font-medium leading-[110%] underline"
        >
        Cancelar
        </button>

        <button 
          @click="submitForm"
          class="px-4 py-3 text-sm font-medium leading-[110%] hbtn-cta"
        >
          Guardar
        </button>
      </div>
    </template>
  </ModalWindow>
</template>
  
<script setup>
import { ref, reactive,defineEmits,defineProps,watch } from 'vue';
import ModalWindow from '@/components/ModalWindow.vue';
import BaseTextField from '@/components/Forms/BaseTextField.vue';
import AccessPermissions from './AccessPermisions.vue';
import Notifications from './Notifications.vue';
import { updateWorkPosition } from '@/api/services/users/userSettings.service';
import { useToastAlert } from '@/composables/useToastAlert'
import { nextTick } from 'vue';

const toast = useToastAlert();

const emit = defineEmits(['storeWorkPosition','close']);

const props = defineProps({
  data: Object,
});


const form = reactive({
  id: props.data.id,
  name: props.data.name,
  permissions: JSON.parse(props.data.permissions),
  periodicityChat: props.data.periodicity_chat ?? 5,
  periodicityStay: props.data.periodicity_stay ?? 5,
  notifications: {
    newChat: JSON.parse(props.data.notifications || '{}').newChat ?? false,
    PendingChat10: JSON.parse(props.data.notifications || '{}').PendingChat10 ?? false,
    pendingChat30: JSON.parse(props.data.notifications || '{}').pendingChat30 ?? false,
  },
});



/* watch(() => form.permissions, (newValue) => {
  console.log('form.permissionsnew',newValue)
}) */

const currentStep = ref(1);
const steps = [
  { number: 1, label: 'Accesos' },
  { number: 2, label: 'Notificaciones' },
];



const submitForm = async () => {
  await nextTick();
  //console.log('Submitting form:', form);

  const response = await updateWorkPosition(form);

  if (response.ok) {
    toast.warningToast('Cambios guardados con éxito', 'top-right');
    cancel();
    emit('storeWorkPosition', response.data.wPosition);
  }
};


/* watch(() => form, (newForm) => {
  console.log('Form updated:', newForm);
}, { deep: true }); */


const cancel = () => {
  form.name = '';
  form.permissions = {};
  form.periodicityChat = 5;
  form.periodicityStay = 5;
  form.notifications = {
    newChat: false,
    PendingChat10: false,
    pendingChat30: false,
  };
  currentStep.value = 1;
  closeModal();
}

const closeModal = () => {
  emit('close');
}
</script>
