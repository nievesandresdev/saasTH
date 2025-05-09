<template>
    <div class="notifications-container mt-6 mb-[160px]" :style="{ maxHeight: maxHeight + 'px'  }">
      <div class="space-y-6">
        <!-- Sección de Estancias - Chat -->
        <div class="flex gap-2 justify-start items-center">
          <strong class="text-[18px] font-medium">Notificaciones de la plataforma</strong>
          <BaseTooltipResponsive 
            size="s" 
            :key="dynamicTooltipTop"
            :top="dynamicTooltipTop" 
            :right="0" 
            @mouseover="calculateTooltipPosition"
          >
            <template v-slot:button>
              <img src="/assets/icons/info.blue.svg" class="w-5 h-5 ml-1" alt="icon_info">
            </template>
            <template v-slot:content>
             <div class="flex justify-between items-center">
              <div class="flex flex-col gap-1 items-center">
                <img src="/assets/icons/push.png" class="w-10 h-10" alt="icon_info">
                <span class="text-sm font-medium">Push</span>
              </div>
              <div class="flex flex-col gap-1 items-center">
                <img src="/assets/icons/1.TH.CHAT.png" class="w-11 h-11" alt="icon_info">
                <span class="text-sm font-medium">Plataforma</span>
              </div>
              <div class="flex flex-col gap-1 items-center">
                <img src="/assets/icons/1.TH.EMAIL.svg" class="w-12 h-12" alt="icon_info">
                <span class="text-sm font-medium">Email</span>
              </div>
             </div>
            </template>
          </BaseTooltipResponsive>
        </div>
        <!-- Notificaciones en plataforma Hoster -->
        <div :style="{  opacity: disabledGeneral ? 0.5 : 1,cursor: disabledGeneral ? 'not-allowed' : 'default'  }">
          <!-- estancias chat -->
          <div 
            class="flex flex-col"
            v-if="hotelStore.hotelData?.chat_service_enabled"
          >
            <div class="flex items-center justify-between">
              <span class="text-sm font-semibold">Estancias - Chat</span>
            </div>
            <div class="flex flex-col justify-end">
              <div class="flex justify-end gap-4">
                <span class="text-[10px] font-semibold">Push</span>
                <span class="text-[10px] font-semibold">Plat.</span>
                <span class="text-[10px] font-semibold">Email</span>
              </div>
              
            </div>
            <!-- nuevo chat -->
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm font-normal">Nuevo Chat</span>
              <div class="flex justify-center gap-4 mr-[8px]">
                <input type="checkbox" :disabled="disabledGeneral" v-model="notifications.push.newChat" @change="emitChanges"  class="hcheckbox h-5 w-5 text-[#34A98F] rounded focus:ring-[#34A98F] disabled:opacity-50">
                <input type="checkbox" v-model="notifications.platform.newChat" @change="emitChanges" :disabled="true" class="hcheckbox h-5 w-5 text-[#34A98F] rounded focus:ring-[#34A98F] disabled:opacity-50">
                <input type="checkbox" :disabled="disabledGeneral" v-model="notifications.email.newChat" @change="emitChanges"  class="hcheckbox h-5 w-5 text-[#34A98F] rounded focus:ring-[#34A98F] disabled:opacity-50">
              </div>
            </div>
            <!-- Chat pendiente 10 -->
            <div class="flex items-center justify-between mb-[6px]">
              <div class="flex gap-2 items-center justify-start">
              <p class="text-sm leading-[150%]">Chat pendiente tras</p>
              <div class="w-[38px]">
                <BaseTextField
                  v-model="periodicityChat.pendingChat10"
                  :classInput="'h-[20px] px-1 py-[7px] text-sm font-semibold leading-[120%] text-center'"
                  :type="'number'"
                  :errors="errors"
                  name="notifications"
                  :disabled="isDisabled || disabledGeneral"
                  @input="emitChanges"
                  @keypress="onlyNumbers"
                />
              </div>
              <p class="text-sm leading-[150%]">min</p>

            </div>
              <div class="flex justify-center gap-4 mr-[8px]">
                <input type="checkbox" :disabled="disabledGeneral" v-model="notifications.push.pendingChat10" @change="emitChanges"  class="hcheckbox h-5 w-5 text-[#34A98F] rounded focus:ring-[#34A98F] disabled:opacity-50">
                <input type="checkbox" v-model="notifications.platform.pendingChat10" @change="emitChanges" :disabled="true" class="hcheckbox h-5 w-5 text-[#34A98F] rounded focus:ring-[#34A98F] disabled:opacity-50">
                <input type="checkbox" :disabled="disabledGeneral" v-model="notifications.email.pendingChat10" @change="emitChanges"  class="hcheckbox h-5 w-5 text-[#34A98F] rounded focus:ring-[#34A98F] disabled:opacity-50">
              </div>
            </div>
            <!--chat poendiente 30-->
            <div class="flex items-center justify-between">
              <div class="flex gap-2 items-center justify-start">
              <p class="text-sm leading-[150%]">Chat pendiente tras</p>
              <div class="w-[38px]">
                <BaseTextField
                  v-model="periodicityChat.pendingChat30"
                  :classInput="'h-[20px] px-1 py-[7px] text-sm font-semibold leading-[120%] text-center'"
                  :type="'number'"
                  :errors="errors"
                  name="notifications"
                  :disabled="isDisabled || disabledGeneral"
                  @input="emitChanges"
                  @keypress="onlyNumbers"
                />
              </div>

              <p class="text-sm leading-[150%]">min</p>
            </div>
              <div class="flex justify-center gap-4 mr-[8px]">
                <input type="checkbox" :disabled="disabledGeneral" v-model="notifications.push.pendingChat30" @change="emitChanges"  class="hcheckbox h-5 w-5 text-[#34A98F] rounded focus:ring-[#34A98F] disabled:opacity-50">
                <input type="checkbox" v-model="notifications.platform.pendingChat30" @change="emitChanges" :disabled="true" class="hcheckbox h-5 w-5 text-[#34A98F] rounded focus:ring-[#34A98F] disabled:opacity-50">
                <input type="checkbox" :disabled="disabledGeneral" v-model="notifications.email.pendingChat30" @change="emitChanges"  class="hcheckbox h-5 w-5 text-[#34A98F] rounded focus:ring-[#34A98F] disabled:opacity-50">
              </div>
            </div>
          </div>

          <!-- estancias seguimeinto-->
          <div class="flex flex-col mt-4">
            <div class="flex items-center justify-between">
              <span class="text-sm font-semibold">Estancias - Seguimiento</span>
            </div>
            <div class="flex flex-col justify-end">
              <div class="flex justify-end gap-4">
                <span class="text-[10px] font-semibold">Push</span>
                <span class="text-[10px] font-semibold">Plat.</span>
                <span class="text-[10px] font-semibold">Email</span>
              </div>
              
            </div>
            <!-- nuevo feedback -->
            <div class="flex items-center justify-between mb-3">
              <span class="text-sm font-normal">Nuevo Feedback</span>
              <div class="flex justify-center gap-4 mr-[8px]">
                <input type="checkbox" :disabled="disabledGeneral" v-model="notifications.push.newFeedback" @change="emitChanges"  class="hcheckbox h-5 w-5 text-[#34A98F] rounded focus:ring-[#34A98F] disabled:opacity-50">
                <input type="checkbox" v-model="notifications.platform.newFeedback" @change="emitChanges" :disabled="true" class="hcheckbox h-5 w-5 text-[#34A98F] rounded focus:ring-[#34A98F] disabled:opacity-50">
                <input type="checkbox" :disabled="disabledGeneral" v-model="notifications.email.newFeedback" @change="emitChanges"  class="hcheckbox h-5 w-5 text-[#34A98F] rounded focus:ring-[#34A98F] disabled:opacity-50">
              </div>
            </div>
            <!-- Chat pendiente 10 -->
            <div class="flex items-center justify-between mb-[10px]">
              <div class="flex gap-2 items-center justify-start">
              <p class="text-sm leading-[150%]">Feedback pendiente tras</p>
              <div class="w-[38px]">
                <BaseTextField
                  v-model="periodicityStay.pendingFeedback30"
                  :classInput="'h-[20px] !px-0 !py-0 text-sm font-semibold leading-[120%] text-center'"
                  :type="'number'"
                  :errors="errors"
                  name="notifications"
                  :disabled="isDisabled || disabledGeneral"
                  @input="emitChanges"
                  @keypress="onlyNumbers"
                />
              </div>
              <p class="text-sm leading-[150%]">min</p>

            </div>
              <div class="flex justify-center gap-4 mr-[8px]">
                <input type="checkbox" :disabled="disabledGeneral" v-model="notifications.push.pendingFeedback30" @change="emitChanges"  class="hcheckbox h-5 w-5 text-[#34A98F] rounded focus:ring-[#34A98F] disabled:opacity-50">
                <input type="checkbox" v-model="notifications.platform.pendingFeedback30" @change="emitChanges" :disabled="true" class="hcheckbox h-5 w-5 text-[#34A98F] rounded focus:ring-[#34A98F] disabled:opacity-50">
                <input type="checkbox" :disabled="disabledGeneral" v-model="notifications.email.pendingFeedback30" @change="emitChanges" class="hcheckbox h-5 w-5 text-[#34A98F] rounded focus:ring-[#34A98F] disabled:opacity-50">
              </div>
            </div>
            <!--chat poendiente 30-->
            <div class="flex items-center justify-between">
              <div class="flex gap-2 items-center justify-start">
              <p class="text-sm leading-[150%]">Feedback pendiente tras</p>
              <div class="w-[38px]">
                <BaseTextField
                  v-model="periodicityStay.pendingFeedback60"
                  :classInput="'h-[20px] !px-0 !py-0 text-sm font-semibold leading-[120%] text-center'"
                  :type="'number'"
                  :errors="errors"
                  name="notifications"
                  :disabled="isDisabled || disabledGeneral"
                  @input="emitChanges"
                  @keypress="onlyNumbers"
                />
              </div>
              <p class="text-sm leading-[150%]">min</p>
            </div>
              <div class="flex justify-center gap-4 mr-[8px]">
                <input type="checkbox" :disabled="disabledGeneral" v-model="notifications.push.pendingFeedback60" @change="emitChanges" class="hcheckbox h-5 w-5 text-[#34A98F] rounded focus:ring-[#34A98F] disabled:opacity-50">
                <input type="checkbox" v-model="notifications.platform.pendingFeedback60" @change="emitChanges" :disabled="true" class="hcheckbox h-5 w-5 text-[#34A98F] rounded focus:ring-[#34A98F] disabled:opacity-50">
                <input type="checkbox" :disabled="disabledGeneral" v-model="notifications.email.pendingFeedback60" @change="emitChanges" class="hcheckbox h-5 w-5 text-[#34A98F] rounded focus:ring-[#34A98F] disabled:opacity-50">
              </div>
            </div>
          </div>

          <!-- informes seguimeinto-->
          <div class="flex flex-col mt-4">
            <div class="flex items-center justify-between">
              <span class="text-sm font-semibold">Informes - Seguimiento</span>
            </div>
            <div class="flex flex-col justify-end">
              <div class="flex justify-end gap-4">
                <span class="text-[10px] font-semibold">Push</span>
                <span class="text-[10px] font-semibold">Plat.</span>
                <span class="text-[10px] font-semibold">Email</span>
              </div>
              
            </div>

            <!--chat poendiente 30-->
            <div class="flex items-center justify-between">
              <div class="flex gap-2 items-center justify-start">
              <p class="text-sm leading-[150%]">Informe General</p>
              <div class="w-[88px]">
                <!-- <BaseTextField
                  v-model="periodicityStay.pendingFeedback60"
                  :classInput="'h-[20px] !px-0 !py-0 text-sm font-semibold leading-[120%] text-center'"
                  :type="'number'"
                  :errors="errors"
                  name="notifications"
                  :disabled="isDisabled || disabledGeneral"
                  @input="emitChanges"
                  @keypress="onlyNumbers"
                /> -->
                <BaseSelectField
                  v-model="props.informGeneral"
                  :options="optionsSelect"
                  :classInput="'h-[20px] w-[100px] !px-0 !py-0 text-sm font-semibold leading-[120%] text-center'"
                  :errors="errors"
                  :id="'periodicityStay'"
                  mandatory
                  compact
                />
                <!-- <pre>{{ props.informGeneral }}</pre> -->
              </div>
            </div>
              <div class="flex justify-center gap-4 mr-[8px]">
                <!-- <input type="checkbox" :disabled="disabledGeneral" v-model="notifications.push.pendingFeedback60" @change="emitChanges" class="hcheckbox h-5 w-5 text-[#34A98F] rounded focus:ring-[#34A98F] disabled:opacity-50">
                <input type="checkbox" v-model="notifications.platform.pendingFeedback60" @change="emitChanges" :disabled="true" class="hcheckbox h-5 w-5 text-[#34A98F] rounded focus:ring-[#34A98F] disabled:opacity-50"> -->
                <input type="checkbox" :disabled="disabledGeneral" v-model="notifications.email.pendingFeedback60" @change="emitChanges" class="hcheckbox h-5 w-5 text-[#34A98F] rounded focus:ring-[#34A98F] disabled:opacity-50">
              </div>
            </div>
          </div>

          <!--resenas-->
          <div 
            class="flex flex-col mt-4"
            v-if="hotelStore.hotelData?.reviews_service_enabled"
          >
            <div class="flex items-center justify-between">
              <span class="text-sm font-semibold">Reseñas</span>
            </div>
            <div class="flex flex-col justify-end">
              <div class="flex justify-end gap-4">
                <span class="text-[10px] font-semibold">Push</span>
                <span class="text-[10px] font-semibold">Plat.</span>
                <span class="text-[10px] font-semibold">Email</span>
              </div>
              
            </div>
            <!-- nuevo resenas -->
            <div class="flex items-center justify-between mb-3">
              <span class="text-sm font-normal">Nuevas reseñas no respondidas</span>
              <div class="flex justify-center gap-4 mr-[8px]">
                <input type="checkbox" :disabled="disabledGeneral" v-model="notifications.push.new_reviews" @change="emitChanges" class="hcheckbox h-5 w-5 text-[#34A98F] rounded focus:ring-[#34A98F] disabled:opacity-50">
                <input type="checkbox" v-model="notifications.platform.new_reviews" @change="emitChanges" :disabled="true" class="hcheckbox h-5 w-5 text-[#34A98F] rounded focus:ring-[#34A98F] disabled:opacity-50">
                <input type="checkbox" :disabled="disabledGeneral" v-model="notifications.email.new_reviews" @change="emitChanges" class="hcheckbox h-5 w-5 text-[#34A98F] rounded focus:ring-[#34A98F] disabled:opacity-50">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, defineProps, defineEmits,computed, watch } from 'vue';
  import BaseTooltipResponsive from '@/components/BaseTooltipResponsive.vue';
  import BaseTextField from '@/components/Forms/BaseTextField.vue';
  import BaseSelectField from "@/components/Forms/BaseSelectField.vue";
  //stores
  import { useHotelStore } from '@/stores/modules/hotel'; 
  const hotelStore = useHotelStore();

  const props = defineProps({
    periodicityChat: {
      type: Object,
      default: () => ({
        periodicityChat: 10,
        periodicityChat30: 30,
      }),
    },
    periodicityStay: {
      type: Object,
      default: () => ({
        periodicityFeedback30: 30,
        periodicityFeedback60: 60,
      }),
    },
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
    disabledGeneral: {
      type: Boolean,
      default: false,
    },
    informGeneral: {
      type: Number,
      default: 1,
    },
  });

  const emits = defineEmits([
    'update:periodicityChat',
    'update:periodicityStay',
    'update:notifications'
  ]);

  const isDisabled = computed(() => props.workPositionId !== null);
  
  const periodicityChat = ref({...props.periodicityChat});
  const periodicityStay = ref({...props.periodicityStay});
  const notifications = ref({ ...props.notifications });
  
  
  const emitChanges = () => {
    emits('update:periodicityChat', periodicityChat.value);
    emits('update:periodicityStay', periodicityStay.value);
    emits('update:notifications', notifications.value);
  };

  const onlyNumbers = (event) => {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  };

  const tooltipHeight=104;
  const footerHeight=88;
  const dynamicTooltipTop = ref(25);


  const calculateTooltipPosition = (event) => {
    const tooltipElement = event.target.closest('.notifications-container');
    const rect = tooltipElement?.getBoundingClientRect();

    if (!rect) return;

    const viewportHeight = window.innerHeight;
    const tooltipBottomOffset = viewportHeight - rect.bottom;

    const shouldAdjust = tooltipBottomOffset < footerHeight + tooltipHeight;
  
    dynamicTooltipTop.value = shouldAdjust ? -110 : 25;
  };

  watch(
    () => props.notifications,
    () => {
      notifications.value = { ...props.notifications };
      periodicityChat.value = { ...props.periodicityChat };
      periodicityStay.value = { ...props.periodicityStay };
    },
    { immediate: true }
  );

  const optionsSelect = ref([
    { label: 'Mensual', value: 1, disabled: false },
    { label: 'Semanal', value: 2, disabled: false },
  ]);

  </script>
  
  <style scoped>
  .notifications-container {
    max-height: 800px;
   /*  margin-bottom: 150px; */
    
  }
  
  .notifications-container::-webkit-scrollbar {
    width: 0; /* Oculta el scroll en Chrome, Safari y Opera */
  }
  </style>
  