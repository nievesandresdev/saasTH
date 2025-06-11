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
        <h1 class="text-lg font-medium leading-[110%]">Editar puesto de trabajo</h1>
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

        <hr class="mb-5 px-4" />
        <div v-if="currentStep === 1" class="mb-6">
          <AccessPermissions v-model:permissions="form.permissions" />
          <Notifications
            v-model:periodicityChat="form.periodicityChat"
            v-model:periodicityStay="form.periodicityStay"
            v-model:notifications="form.notifications"
          />
        </div>
        <div v-if="currentStep === 2">
          <Notifications
            v-model:periodicityChat="form.periodicityChat"
            v-model:periodicityStay="form.periodicityStay"
            v-model:notifications="form.notifications"
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
          Guardar
        </button>
      </div>
    </template>
  </ModalWindow>
</template>

<script setup>
import { ref, reactive, computed, defineEmits, defineProps, watch, onMounted } from 'vue';
import ModalWindow from '@/components/ModalWindow.vue';
import BaseTextField from '@/components/Forms/BaseTextField.vue';
import AccessPermissions from './AccessPermisions.vue';
import Notifications from './Notifications.vue';
import { updateWorkPosition } from '@/api/services/users/userSettings.service';
import { useToastAlert } from '@/composables/useToastAlert';

const toast = useToastAlert();

const emit = defineEmits(['storeWorkPosition', 'close']);

const props = defineProps({
  data: Object,
  isVisible: Boolean,
});

const form = reactive({
  id : props.data.id,
  name: props.data.name,
  permissions: JSON.parse(props.data.permissions) ?? {},
  periodicityStay: JSON.parse(props.data.periodicity_stay) ?? {
    pendingFeedback30: 30,
    pendingFeedback60: 60,
  },
  periodicityChat : JSON.parse(props.data.periodicity_chat) ?? {
    pendingChat10: 10,
    pendingChat30: 30,
  },
  notifications:JSON.parse(props.data.notifications) ?? {
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
      pendingChat30: false,
      newFeedback: false,
      pendingFeedback30: false,
      pendingFeedback60: false,
      new_reviews: false,
      informGeneral: true,
      informDiscontent: true,
    },
  },
  informGeneral: {
    periodicity: 1,
  },
});

const initializeForm = () => {
  if(props.data){
    form.name = props.data.name;
    form.permissions = JSON.parse(props.data.permissions);
  }
};


onMounted(() => {
  initializeForm();
});



const currentStep = ref(1);


const nameError = ref(false);

// Computed property to check if permissions object is empty
const isPermissionsEmpty = computed(() => {
  return Object.keys(form.permissions).length === 0;
});

// Computed property to check if the form has been modified
const isFormModified = computed(() => {
  return (
    form.name !== props.data.name ||
    JSON.stringify(form.permissions) !== JSON.stringify(JSON.parse(props.data.permissions)) ||
    JSON.stringify(form.periodicityStay) !== JSON.stringify(JSON.parse(props.data.periodicity_stay)) ||
    JSON.stringify(form.periodicityChat) !== JSON.stringify(JSON.parse(props.data.periodicity_chat)) ||
    JSON.stringify(form.notifications) !== JSON.stringify(JSON.parse(props.data.notifications))
  );
});

// Computed property to disable the submit button
const isSubmitDisabled = computed(() => {
  return !isFormModified.value || form.name.trim() === '' || isPermissionsEmpty.value;
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

  const response = await updateWorkPosition(form);

  if (response.ok) {
    toast.warningToast('Cambios guardados', 'top-right');
    resetForm();
    closeModal();
    emit('storeWorkPosition', response.data.wPosition);
  } else {
    toast.errorToast('Error al guardar los cambios', 'top-right');
  }
};

const resetForm = () => {
  form.name = props.data.name;
  form.permissions = JSON.parse(props.data.permissions);
  form.periodicityChat = props.data.periodicity_chat ?? 5;
  form.periodicityStay = props.data.periodicity_stay ?? 5;
  form.notifications = {
    newChat: JSON.parse(props.data.notifications || '{}').newChat ?? false,
    PendingChat10: JSON.parse(props.data.notifications || '{}').PendingChat10 ?? false,
    pendingChat30: JSON.parse(props.data.notifications || '{}').pendingChat30 ?? false,
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
