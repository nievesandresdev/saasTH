<template>
  <ModalWindow
    :isVisible="isVisible"
    width="341px"
    footer
    :paddingTop="4"
    :paddingBottom="4"
    :paddingLeft="6"
    :paddingRight="6"
    :topOffset="'10%'"
  >
    <template #header>
      <div class="flex items-center justify-between py-4 px-6">
        <h1 class="text-lg font-medium leading-[110%]">Crear puesto de trabajo</h1>
        <button @click.stop.prevent="closeModal">
          <img class="w-5 h-5" src="/assets/icons/1.TH.CLOSE.svg" alt="" />
        </button>
      </div>
      <hr />
    </template>

    <template #content>
      <label class="text-sm font-semibold">Nombre del puesto de trabajo*</label>
      <BaseTextField
        v-model="form.name"
        placeholder="Ejemplo: Manager"
        classContent="mt-2"
        :error="nameError"
        name="name"
        @input="validateName"
      />

      <!-- Mensaje de error debajo del campo de nombre -->
      <div class="flex mt-2 htext-alert-negative justify-left" v-if="nameError">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="mr-2 bi bi-exclamation-triangle-fill w-4 h-4"
          viewBox="0 0 16 16"
        >
          <path
            d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165
            13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0
            1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35
            3.507a.552.552 0 0 1-1.1 0L7.1
            5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0
            0 1 0-2"
          />
        </svg>
        <p class="text-xs htext-alert-negative">
          Es necesario otorgar un nombre a este puesto
        </p>
      </div>

      <div class="flex justify-start w-full mt-4">
        <h3
          class="flex-1 text-center py-2 text-base font-semibold cursor-pointer relative"
          v-for="(step, index) in steps"
          :key="step.number"
          :class="{
            'bg-[#ECF9F5] text-[#0B6357] rounded-t-lg rounded-bottom-border active-step':
              currentStep === step.number,
            'text-[#333333]': currentStep !== step.number,
          }"
          @click="currentStep = step.number"
        >
          {{ step.label }}
        </h3>
      </div>
      <hr class="mb-5 px-4" />
      <div v-if="currentStep === 1" class="mb-6">
        <AccessPermissions v-model:permissions="form.permissions" />
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
      <div class="border-t hborder-gray-400 py-6 px-6 flex items-center justify-between h-[88px]">
        <button @click="cancel" class="text-sm font-medium leading-[110%] underline px-4">
          Cancelar
        </button>

        <button
          @click="submitForm"
          :disabled="isSubmitDisabled"
          :class="[
            'px-4 py-3 text-sm font-medium leading-[110%] hbtn-cta h-10',
            { 'opacity-50 cursor-not-allowed': isSubmitDisabled },
          ]"
        >
          Crear
        </button>
      </div>
    </template>
  </ModalWindow>
</template>

<script setup>
import { ref, reactive, computed, defineEmits } from 'vue';
import ModalWindow from '@/components/ModalWindow.vue';
import BaseTextField from '@/components/Forms/BaseTextField.vue';
import AccessPermissions from './AccessPermisions.vue';
import Notifications from './Notifications.vue';
import { createWorkPosition } from '@/api/services/users/userSettings.service';
import { useToastAlert } from '@/composables/useToastAlert';

const toast = useToastAlert();

const emit = defineEmits(['storeWorkPosition', 'close']);

const form = reactive({
  name: '',
  permissions: {},
  periodicityChat: 5,
  periodicityStay: 5,
  notifications: {
    newChat: false,
    PendingChat10: false,
    pendingChat30: false,
    newFeedback: false,
    pendingFeedback10: false,

  },
});

const currentStep = ref(1);
const steps = [
  { number: 1, label: 'Accesos' },
  { number: 2, label: 'Notificaciones' },
];

const nameError = ref(false);

// Computed property to check if permissions object is empty
const isPermissionsEmpty = computed(() => {
  return Object.keys(form.permissions).length === 0;
});

// Computed property to disable the submit button
const isSubmitDisabled = computed(() => {
  return form.name.trim() === '' || isPermissionsEmpty.value;
});

const validateName = () => {
  if (form.name.trim() === '') {
    nameError.value = true;
  } else {
    nameError.value = false;
  }
};

const submitForm = async () => {
  validateName();

  if (nameError.value || isPermissionsEmpty.value) {
    toast.errorToast('Por favor, completa todos los campos requeridos.', 'top-right');
    return;
  }

  const response = await createWorkPosition(form);

  if (response.ok) {
    toast.warningToast('Puesto creado con éxito', 'top-right');
    resetForm();
    closeModal();
    emit('storeWorkPosition', response.data.wPosition);
  } else {
    toast.errorToast('Error al crear el puesto', 'top-right');
  }
};

const resetForm = () => {
  form.name = '';
  form.permissions = {};
  form.periodicityChat = 5;
  form.periodicityStay = 5;
  form.notifications = {
    newChat: false,
    PendingChat10: false,
    pendingChat30: false,
    newFeedback: false,
    pendingFeedback10: false,
  };
  currentStep.value = 1;
  nameError.value = false;
};

const cancel = () => {
  resetForm();
  closeModal();
};

const closeModal = () => {
  resetForm();
  emit('close');
};
</script>
