<template>
  <ModalWindow
    :isVisible="isVisible"
    footer
    :paddingTop="4"
    :paddingBottom="4"
    :paddingLeft="6"
    :paddingRight="6"
    :topOffset="'10%'"
  >
  <template #header>
      <div class="flex items-center justify-between py-4 px-6">
        <!-- Asegura que el título tenga un tamaño consistente -->
        <h1 class="text-lg font-medium leading-[110%] fixed-title">
          Crear puesto de trabajo
        </h1>
        <button @click.stop.prevent="closeModal">
          <img class="w-5 h-5" src="/assets/icons/1.TH.CLOSE.svg" alt="" />
        </button>
      </div>
      <hr />
    </template>
    <template #content>
      <div class="max-h-[410px] overflow-y-auto scrollbar-none">
        <label class="text-sm font-semibold">Nombre del puesto de trabajo*</label>
        <BaseTextField
          v-model="form.name"
          placeholder="Ejemplo: Manager"
          classContent="mt-2"
          name="name"
          @input="validateName"
        />
       
        <hr class="mb-[15px] px-4" />
        <div v-if="currentStep === 1" class="mb-6">
          <AccessPermissions v-model:permissions="form.permissions"  toggleAllPermissions   />
          <Notifications
            v-model:periodicityChat="form.periodicityChat"
            v-model:periodicityStay="form.periodicityStay"
            v-model:notifications="form.notifications"
            v-model:informGeneral="form.informGeneral"
          />
        </div>
       
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
import { ref, reactive, computed, defineEmits, defineProps } from 'vue';
import ModalWindow from '@/components/ModalWindow.vue';
import BaseTextField from '@/components/Forms/BaseTextField.vue';
import AccessPermissions from './AccessPermisions.vue';
import Notifications from './Notifications.vue';
import { createWorkPosition } from '@/api/services/users/userSettings.service';
import { useToastAlert } from '@/composables/useToastAlert';


const toast = useToastAlert();

const emit = defineEmits(['storeWorkPosition', 'close']);

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false,
  },
});

const form = reactive({
  name: '',
  permissions: {},
  periodicityStay: {
    pendingFeedback30: 30,
    pendingFeedback60: 60,
  },
  periodicityChat : {
    pendingChat10: 10,
    pendingChat30: 30,
  },
  notifications: {
    push : {
      newChat: true,
      pendingChat10: true,
      pendingChat30: true,
      newFeedback: true,
      pendingFeedback30: true,
      pendingFeedback60: true,
      new_reviews: true,
    },
    platform: {
      newChat: true,
      pendingChat10: true,
      pendingChat30: true,
      newFeedback: true,
      pendingFeedback30: true,
      pendingFeedback60: true,
      new_reviews: true,
    },
    email : {
      newChat: false,
      pendingChat10: false,
      pendingChat30: true,
      newFeedback: false,
      pendingFeedback30: false,
      pendingFeedback60: false,
      new_reviews: false,
      informGeneral: true,
      informDiscontent: true,
    },
    informGeneral: {
      periodicity: 1,
    },


  },
});

const currentStep = ref(1);
const steps = [
  { number: 1, label: 'Accesos' },
  /* { number: 2, label: 'Notificaciones' }, */
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
  form.periodicityChat = {
    pendingChat10: 10,
    pendingChat30: 30,
  };
  form.periodicityStay = {
    pendingFeedback30: 30,
    pendingFeedback60: 60,
  };
  
  form.notifications = {
    newChat: false,
    pendingChat10: false,
    pendingChat30: false,
    newFeedback: false,
    pendingFeedback10: false,
    pendingFeedback30: false,
    new_reviews: false,
    platform: {
      newChat: false,
      pendingChat10: false,
      pendingChat30: false,
      newFeedback: false,
      pendingFeedback10: false,
      pendingFeedback30: false,
      new_reviews: false,
    },
    email: {
      newChat: false,
      pendingChat10: false,
      pendingChat30: false,
      newFeedback: false,
      pendingFeedback10: false,
      pendingFeedback30: false,
      new_reviews: false,
      informGeneral: true,
      informDiscontent: true,
    },
    push : {
      newChat: false,
      pendingChat10: false,
      pendingChat30: false,
      newFeedback: false,
      pendingFeedback10: false,
      pendingFeedback30: false,
      new_reviews: false,
    },
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

<style scoped>
  /* Asegura que los estilos del título sean consistentes */
  .fixed-title {
    font-size: 1.125rem; /* Text-lg */
    font-weight: 500; /* font-medium */
    line-height: 110%; /* Ajusta line-height */
  }

  /* Ocultar el scrollbar para navegadores compatibles */
  .scrollbar-none::-webkit-scrollbar {
    display: none;
  }

  .scrollbar-none {
    -ms-overflow-style: none; /* IE y Edge */
    scrollbar-width: none; /* Firefox */
  }
</style>
