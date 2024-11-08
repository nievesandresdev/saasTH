<template>
    <div class="notifications-container" :style="{ maxHeight: maxHeight + 'px' }">
      <div class="space-y-6">
        <!-- Sección de Estancias - Chat -->
        <div class="flex gap-2 justify-start items-center">
          <strong class="text-[18px] font-medium">Estancias - Chat</strong>
          <BaseTooltipResponsive size="s" :top="25" :right="-155">
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
                <img src="/assets/icons/info.blue.svg" class="w-6 h-6 ml-1 mb-2" alt="icon_info">
              </template>
              <template v-slot:content>
                <p class="text-sm font-normal">Puedes permitir o bloquear accesos a la plataforma eligiendo un puesto de trabajo con accesos predeterminados o desde esta sección.</p>
              </template>
            </BaseTooltipResponsive>
          </div>
          <div class="flex flex-col w-full mb-6">
            <span class="text-sm font-[400]">Notificación emergente del navegador para el aviso de un chat pendiente.</span>
            <div class="flex gap-2 items-center justify-start mt-2">
              <p class="text-sm leading-[150%]">Periocidad:</p>
              <div class="w-[38px]">
                <BaseTextField
                  v-model="periodicityChat"
                  classInput="h-[32px] px-1 py-[7px] text-sm font-semibold leading-[120%] text-center"
                  :type="'number'"
                  :errors="errors"
                  name="notifications"
                  :disabled="isDisabled"
                  @input="emitChanges"
                />
              </div>
              <p class="text-sm leading-[150%]">min</p>
            </div>
          </div>
  
          <!-- Emails de Recordatorio -->
          <div class="flex items-center justify-start mb-4 w-3/4">
            <span class="text-sm font-[600]">Emails de recordatorio</span>
          </div>
          <div class="flex justify-between items-center mb-2">
            <span class="text-sm font-[400]">1. Nuevo chat</span>
            <input type="checkbox" v-model="notifications.newChat" @change="emitChanges" :disabled="isDisabled" class="hcheckbox h-5 w-5 text-[#34A98F] rounded focus:ring-[#34A98F] disabled:opacity-50">
          </div>
          <div class="flex justify-between items-center mb-2">
            <span class="text-sm font-[400]">2. Chat pendiente hace 10 minutos</span>
            <input type="checkbox" v-model="notifications.PendingChat10" @change="emitChanges" :disabled="isDisabled" class="hcheckbox h-5 w-5 text-[#34A98F] rounded focus:ring-[#34A98F] disabled:opacity-50">
          </div>
          <div class="flex justify-between items-center mb-8">
            <span class="text-sm font-[400]">3. Chat pendiente hace 30 minutos</span>
            <input type="checkbox" v-model="notifications.pendingChat30" @change="emitChanges" :disabled="isDisabled" class="hcheckbox h-5 w-5 text-[#34A98F] rounded focus:ring-[#34A98F] disabled:opacity-50">
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
            <div class="flex gap-2 items-center justify-start mt-2">
              <p class="text-sm leading-[150%]">Periocidad:</p>
              <div class="w-[38px]">
                <BaseTextField
                  v-model="periodicityStay"
                  classInput="h-[32px] px-1 py-[7px] text-sm font-semibold leading-[120%] text-center"
                  :type="'number'"
                  :errors="errors"
                  :disabled="isDisabled"
                  name="notifications"
                  @input="emitChanges"
                />
              </div>
              <p class="text-sm leading-[150%]">min</p>
            </div>
          </div>
          <!-- Emails de Recordatorio -->
          <div class="flex items-center justify-start mb-4 w-3/4">
            <span class="text-sm font-[600]">Emails</span>
          </div>
          <div class="flex justify-between items-center mb-2">
            <span class="text-sm font-[400]">1. Nuevo feedback</span>
            <input type="checkbox" v-model="notifications.newFeedback" @change="emitChanges" :disabled="isDisabled" class="hcheckbox h-5 w-5 text-[#34A98F] rounded focus:ring-[#34A98F] disabled:opacity-50">
          </div>
          <div class="flex justify-between items-center mb-2">
            <span class="text-sm font-[400]">2. Feedback pendiente hace 10 min</span>
            <input type="checkbox" v-model="notifications.pendingFeedback10" @change="emitChanges" :disabled="isDisabled" class="hcheckbox h-5 w-5 text-[#34A98F] rounded focus:ring-[#34A98F] disabled:opacity-50">
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, defineProps, defineEmits,computed } from 'vue';
  import BaseTooltipResponsive from '@/components/BaseTooltipResponsive.vue';
  import BaseTextField from '@/components/Forms/BaseTextField.vue';
  
  const props = defineProps({
    periodicityChat: String,
    periodicityStay: String,
    notifications: {
      type: Object,
      default: () => ({
        newChat: false,
        PendingChat10: false,
        pendingChat30: false,
        newFeedback: false,
        pendingFeedback10: false,
      }),
    },
    maxHeight: {
      type: Number,
      default: 270, // Altura máxima predeterminada
    },
    workPositionId: {
      type: [Number, String],
      default: null,
    },
  });

const emits = defineEmits([
  'update:periodicityChat',
  'update:periodicityStay',
  'update:notifications'
]);

const isDisabled = computed(() => props.workPositionId !== null);
  
  const periodicityChat = ref(props.periodicityChat);
  const periodicityStay = ref(props.periodicityStay);
  const notifications = ref({ ...props.notifications });
  
  const emitChanges = () => {
    emits('update:periodicityChat', periodicityChat.value);
    emits('update:periodicityStay', periodicityStay.value);
    emits('update:notifications', notifications.value);

    /* console.log('Emit changes:', {
      periodicityChat: periodicityChat.value,
      periodicityStay: periodicityStay.value,
      notifications: notifications.value,
    }); */
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
  