<template>
    <ModalWindow :isVisible="isVisible" width="341px" footer :paddingTop="4" :paddingBottom="4" :paddingLeft="6" :paddingRight="6" :topOffset="'10%'" >
      <template #header>
        <div class="flex items-center justify-between py-4 px-6">
          <h1 class="text-lg font-medium leading-[110%]">Crear puesto de trabajo</h1>
          <button @click.prevent="closeModal">
            <img class="w-5 h-5" src="/assets/icons/1.TH.CLOSE.svg" alt="">
          </button>
        </div>
        <hr>
      </template>
  
      <template #content>
        <label class="text-sm font-semibold">Nombre del puesto de trabajo*</label>
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
            :isRoleAdmin="isRoleAdmin"
          />
        </div>
        <div v-if="currentStep === 2">
          <Notifications 
            v-model:periodicityChat="form.periodicityChat"
            v-model:periodicityStay="form.periodicityStay"
            v-model:newChat="form.newChat"
            v-model:PendingChat10="form.PendingChat10"
            v-model:pendingChat30="form.pendingChat30"
            :isRoleAdmin="isRoleAdmin"
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
            Crear
          </button>
        </div>
      </template>
    </ModalWindow>
  </template>
    
  <script setup>
  import { ref, reactive, defineEmits } from 'vue'
  import ModalWindow from '@/components/ModalWindow.vue'
  import BaseTextField from '@/components/Forms/BaseTextField.vue';
  import AccessPermissions from './AccessPermisions.vue';
  import Notifications from './Notifications.vue';
  
  const form = reactive({
    name: '',
    permissions: [],
    periodicityChat: 5, // Nuevo campo periodicityChat
    periodicityStay: 5, // Nuevo campo periodicityStay
    newChat: false, // Nuevo campo newChat
    PendingChat10: false, // Nuevo campo PendingChat10
    pendingChat30: false, // Nuevo campo pendingChat30
  });
  
  const currentStep = ref(1);
  const steps = [
    { number: 1, label: 'Accesos' },
    { number: 2, label: 'Notificaciones' },
  ];
  
  const isRoleAdmin = ref(false);
  
  const emit = defineEmits(['close']); // Emitir evento para cerrar el modal
  
  const submitForm = () => {
    console.log(form);
  }
  
  const cancel = () => {
    form.name = '';
    form.permissions = [];
    form.periodicityChat = 5;
    form.periodicityStay = '';
    form.newChat = '';
    form.PendingChat10 = '';
    form.pendingChat30 = '';
    currentStep.value = 1;
    closeModal(); // Cerrar el modal al cancelar
  }
  
  const closeModal = () => {
    emit('close'); // Emitir evento de cierre al padre
  }
  </script>
  