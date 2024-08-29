<template>
    <div class="notifications-container">
      <div class="space-y-6">
        <!-- Sección de Estancias - Chat -->
        <div class="flex gap-2 justify-start items-center">
          <strong class="text-[18px] font-medium">Estancias - Chat</strong>
          <BaseTooltipResponsive size="s" :top="25" :right="-55">
            <template v-slot:button>
              <img src="/assets/icons/info.blue.svg" class="w-5 h-5 ml-1" alt="icon_info">
            </template>
            <template v-slot:content>
              <p class="text-sm font-normal">Puedes permitir o bloquear accesos a la plataforma eligiendo un puesto de trabajo con accesos predeterminados o desde esta sección.</p>
            </template>
          </BaseTooltipResponsive>
        </div>
  
        <!-- Notificaciones en plataforma Hoster -->
        <div>
          <div class="flex items-center justify-start mb-2 w-3/4">
            <span class="text-sm font-[600]">Notificaciones en plataforma Hoster</span>
            <BaseTooltipResponsive size="s" :top="25" :right="-55">
              <template v-slot:button>
                <img src="/assets/icons/info.blue.svg" class="w-6 h-6 ml-1 mb-4" alt="icon_info">
              </template>
              <template v-slot:content>
                <p class="text-sm font-normal">Puedes permitir o bloquear accesos a la plataforma eligiendo un puesto de trabajo con accesos predeterminados o desde esta sección.</p>
              </template>
            </BaseTooltipResponsive>
          </div>
          <div class="flex flex-col w-full mb-6">
            <span class="text-sm font-[400]">Notificación emergente del navegador para el aviso de un chat pendiente.</span>
            <div class="flex gap-2 items-center justify-start w-1/2">
              <span class="text-sm font-[400] mt-2">Periocidad:</span>
              <BaseTextField
                v-model="periodicityChat"
                placeholder="Ejemplo: 5 minutos"
                classContent="mt-2 w-[34px]"
                :type="'number'"
                :errors="errors"
                name="notifications"
                @input="emitChanges"
              />
              <span class="text-sm font-[400] mt-2">min</span>
            </div>
          </div>
  
          <!-- Emails de Recordatorio -->
          <div class="flex items-center justify-start mb-4 w-3/4">
            <span class="text-sm font-[600]">Emails de recordatorio</span>
          </div>
          <div class="flex justify-between items-center mb-2">
            <span class="text-sm font-[400]">1. Nuevo chat</span>
            <input type="checkbox" v-model="newChat" @change="emitChanges" class="hcheckbox h-5 w-5 text-[#34A98F] rounded focus:ring-[#34A98F]">
          </div>
          <div class="flex justify-between items-center mb-2">
            <span class="text-sm font-[400]">2. Chat pendiente hace 10 minutos</span>
            <input type="checkbox" v-model="PendingChat10" @change="emitChanges" class="hcheckbox h-5 w-5 text-[#34A98F] rounded focus:ring-[#34A98F]">
          </div>
          <div class="flex justify-between items-center mb-8">
            <span class="text-sm font-[400]">3. Chat pendiente hace 30 minutos</span>
            <input type="checkbox" v-model="pendingChat30" @change="emitChanges" class="hcheckbox h-5 w-5 text-[#34A98F] rounded focus:ring-[#34A98F]">
          </div>
  
          <!-- Sección de Estancias - Seguimiento -->
          <div class="flex gap-2 justify-start items-center mb-4">
            <strong class="text-[18px] font-medium">Estancias - Seguimiento</strong>
          </div>
          <div class="flex flex-col w-full mb-6">
            <div class="flex items-center justify-start mb-2 w-3/4">
              <span class="text-sm font-[600]">Notificaciones en plataforma Hoster</span>
            </div>
            <span class="text-sm font-[400]">Notificación emergente del navegador para el aviso de un feedback pendiente.</span>
            <div class="flex gap-2 items-center justify-start w-1/2">
              <span class="text-sm font-[400] mt-2">Periocidad:</span>
              <BaseTextField
                v-model="periodicityStay"
                placeholder="Ejemplo: 5 minutos"
                classContent="mt-2 w-[34px]"
                :type="'number'"
                :errors="errors"
                name="notifications"
                @input="emitChanges"
              />
              <span class="text-sm font-[400] mt-2">min</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, defineProps, defineEmits } from 'vue';
  import BaseTooltipResponsive from '@/components/BaseTooltipResponsive.vue';
  import BaseTextField from '@/components/Forms/BaseTextField.vue';
  
  const props = defineProps({
    periodicityChat: String,
    periodicityStay: String,
    newChat: Boolean,
    PendingChat10: Boolean,
    pendingChat30: Boolean,
  });
  
  const emits = defineEmits([
    'update:periodicityChat', 
    'update:periodicityStay', 
    'update:newChat', 
    'update:PendingChat10', 
    'update:pendingChat30'
  ]);
  
  const periodicityChat = ref(props.periodicityChat);
  const periodicityStay = ref(props.periodicityStay);
  const newChat = ref(props.newChat);
  const PendingChat10 = ref(props.PendingChat10);
  const pendingChat30 = ref(props.pendingChat30);
  
  const emitChanges = () => {
    emits('update:periodicityChat', periodicityChat.value);
    emits('update:newChat', newChat.value);
    emits('update:PendingChat10', PendingChat10.value);
    emits('update:pendingChat30', pendingChat30.value);
    emits('update:periodicityStay', periodicityStay.value);
  };
  </script>
  
  <style scoped>
  .notifications-container {
    max-height: 400px; /* Ajusta la altura máxima del contenedor */
    overflow-y: auto; /* Permite el desplazamiento vertical */
    scrollbar-width: none; /* Oculta el scroll en Firefox */
    -ms-overflow-style: none; /* Oculta el scroll en IE y Edge */
  }
  
  .notifications-container::-webkit-scrollbar {
    width: 0; /* Oculta el scroll en Chrome, Safari y Opera */
  }
  </style>
  