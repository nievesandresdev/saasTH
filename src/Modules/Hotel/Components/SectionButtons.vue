<template>
  <div class="flex flex-col gap-2">
   <span class="text-sm font-semibold">Botones visibles ({{ countButtons }})</span>
   
   <TransitionGroup 
     name="list" 
     tag="div" 
     ref="parent"
     class="grid grid-cols-4 3xl:grid-cols-6 3xl:w-[850px] 1x1:w-full gap-4 pr-[150px] 3xl:pr-0 max-w-[1920px]"
   >
     <div 
       v-for="(button, index) in visibleButtons" 
       :key="button.id"
       class="button-card bg-[#FFF] rounded-[10px] py-4 px-4 w-[128px] flex flex-col relative cursor-grab"
       :class="{
         'cursor-grabbing': dragStartIndex === index
       }"
       @mouseenter="button.hover = true"
       @mouseleave="button.hover = false"
     >
       <!-- Overlay negro en hover -->
       <div 
         v-if="button.hover && showOverlays" 
         class="overlay-drag absolute inset-0 bg-black bg-opacity-25 rounded-lg"
       >
         <div class="flex justify-end p-2">
           <div class="flex items-center bg-white p-1 rounded-[10px] z-20">
             <div class="mr-2 text-[#333] font-semibold text-[10px]">
                 Visible
             </div>
             <BaseSwichInput
               v-model="button.is_visible"
               :id="`swich-visible-button-${index}`"
               @change:value="updateButtonVisibility(button)"
               @click="handlerClickSwichVisibility"
             />
           </div>
         </div>
       </div>

       <div class="flex flex-col items-center justify-center h-full gap-2 relative z-10">
         <img 
           :src="`/assets/icons/${button.icon}`"
           :alt="button.name" 
           class="h-6 w-6" 
           :class="{'opacity-50': !button.is_visible}" 
         />
         <h3 
           :class="['text-sm font-medium text-center', { 'text-[#333]': button.is_visible, 'text-[#A0A0A0]': !button.is_visible }]"
         >
           {{ button.name }}
         </h3>
       </div>

       <!-- <button
         v-if="button.hover && button.is_visible && showDragButtons && !isDragging"
         class="buttom-drag p-1 shadow-md rounded-full hbg-white-100 absolute right-2 bottom-2 hover:bg-[#F3F3F3] cursor-grab z-10"
         :class="{'cursor-grabbing': dragStartIndex == index}"
         @mousedown="setDragStart(index)"
         :draggable="button.is_visible"
       >
         <img class="w-6 h-6" src="/assets/icons/TH.GRAD.svg" alt="grad">
       </button> -->
     </div>
     

   </TransitionGroup>
 </div>

 <div class="border-t border-[#E9E9E9] mt-4 mb-4"></div>

 <div class="flex flex-col gap-2">
   <span class="text-sm font-semibold">Botones ocultos ({{ countButtonsHidden }})</span>
   <TransitionGroup 
     name="list" 
     tag="div" 
     ref="parentHidden"
     id="no-drag"
     class="grid grid-cols-4 3xl:grid-cols-6 3xl:w-[850px] 1x1:w-full gap-4 pr-[150px] 3xl:pr-0 max-w-[1920px]"
   >
     <div 
       v-for="(button, index) in hiddenButtons" 
       :key="button.id"
       class="button-card bg-[#FAFAFA] rounded-[10px] py-4 px-4 w-[128px] flex flex-col relative cursor-pointer"
       @mouseenter="button.hover = true"
       @mouseleave="button.hover = false"
     >
       <!-- Overlay negro en hover con toggle -->
       <div 
         v-if="button.hover && showOverlays" 
         class="overlay-drag absolute inset-0 bg-black bg-opacity-25 rounded-lg"
       >
         <div class="flex justify-end p-2">
           <div class="flex items-center bg-white p-1 rounded-[10px] z-20">
             <div class="mr-2 text-[#333] font-semibold text-[10px]">
               Visible
             </div>
             <BaseTooltipResponsive 
               v-if="!checkConfig(button.name)" 
               size="s" 
               :top="-75" 
               :left="-70"
               :show="button.hover"
             >
               <template #button>
                 <div class="cursor-not-allowed">
                   <BaseSwichInput
                     v-model="button.is_visible"
                     :id="`swich-visible-button-${index}`"
                     @change:value="updateButtonVisibility(button)"
                     @mouseenter="checkConfig(button.name)"
                     :disabled="!checkConfig(button.name)"
                   />
                 </div>
               </template>
               <template #content>
                 <div class="text-sm leading-[150%] font-normal">
                   <span v-if="button.name === 'Normas del alojamiento'">
                     Registra las 
                     <a 
                       @click.prevent="goToConfig('PoliciesLegal')" 
                       class="text-sm font-semibold underline cursor-pointer"
                     >
                       Normas del alojamiento
                     </a> 
                     para mostrar este botón
                   </span>
                   <span v-else-if="button.name === 'Redes WiFi'">
                     Añade al menos una
                     <a 
                       @click.prevent="goToConfig('wifi')" 
                       class="text-sm font-semibold underline cursor-pointer"
                     >
                       Red de WiFi
                     </a> 
                     para mostrar este botón
                   </span>
                   <span v-else-if="button.name === 'Programa de referidos'">
                     Activa el 
                     <a 
                       @click.prevent="goToConfig('referrals')" 
                       class="text-sm font-semibold underline cursor-pointer"
                     >
                       Programa de referidos
                     </a> 
                     para mostrar este botón
                   </span>
                   <span v-else-if="button.name === 'Check-In'">
                     Activa 
                     <a 
                       @click.prevent="goToConfig('checkin')" 
                       class="text-sm font-semibold underline cursor-pointer"
                     >
                       Check-in
                     </a> 
                     para poder mostrar este botón
                   </span>
                   <span v-else-if="button.name === 'Reserva tu estancia'">
                     Indica una
                     <a 
                       @click.prevent="goToConfig('website')" 
                       class="text-sm font-semibold underline cursor-pointer"
                     >
                       URL de tu sitio web
                     </a>
                     para que tus huéspedes puedan reservar
                   </span>
                 </div>
               </template>
             </BaseTooltipResponsive>
             <BaseSwichInput
               v-else
               v-model="button.is_visible"
               :id="`swich-visible-button-${index}`"
               @change:value="updateButtonVisibility(button)"
             />
           </div>
         </div>
       </div>

       <div class="flex flex-col items-center justify-center h-full gap-2 relative z-10">
         <img 
           :src="`/assets/icons/${button.icon}`"
           :alt="button.name" 
           class="h-6 w-6" 
           :class="{'opacity-50': !button.is_visible}" 
         />
         <h3 
           class="text-sm font-medium text-center text-[#333]"
         >
           {{ button.name }}
         </h3>
       </div>

       <button
         v-if="button.hover && button.is_visible && showDragButtons && !isDragging"
         class="buttom-drag p-1 shadow-md rounded-full hbg-white-100 absolute right-2 bottom-2 hover:bg-[#F3F3F3] cursor-grab z-10"
         :class="{'cursor-grabbing': dragStartIndex == index}"
         @mousedown="setDragStart(index)"
         :draggable="button.is_visible"
       >
         <img class="w-6 h-6" src="/assets/icons/TH.GRAD.svg" alt="grad">
       </button>
     </div>

   </TransitionGroup>
 </div>

</template>

<script setup>
import { ref, nextTick, watch, computed, defineProps, defineEmits } from 'vue';
import BaseSwichInput from "@/components/Forms/BaseSwichInput.vue";
import { useToastAlert } from '@/composables/useToastAlert';
import { useHotelButtonsStore } from '@/stores/modules/hotelButtons';
import { state } from "@formkit/drag-and-drop";
import { useHotelStore } from '@/stores/modules/hotel';
import { useDragAndDrop } from "@formkit/drag-and-drop/vue";
import BaseTooltipResponsive from '@/components/BaseTooltipResponsive.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const hotelStorage = useHotelStore();
const { hotelData } = hotelStorage;

const toast = useToastAlert();
const hotelButtonsStore = useHotelButtonsStore();

const props = defineProps({
 buttons: {
   type: Array,
   required: true
 },
 buttonsHidden: {
   type: Array,
   required: true
 },
 countButtons: {
   type: Number,
   required: true
 },
 countButtonsHidden: {
   type: Number,
   required: true
 }
});

const emit = defineEmits(['updateButtons', 'getButtons']);

// Variables de estado
const showOverlays = ref(true);
const showDragButtons = ref(true);
const isDragging = ref(false);
const dragStartIndex = ref(null);

// Estado local unificado - copia profunda para evitar mutaciones de props
const localButtons = ref([]);

// Computed properties reactivos
const visibleButtons = computed(() => 
  localButtons.value.filter(button => button.is_visible)
);

const hiddenButtons = computed(() => 
  localButtons.value.filter(button => !button.is_visible)
);

// Inicializar drag and drop con array vacío
const [parent, dragButtons] = useDragAndDrop([], {
  draggable: (el) => {
    return !el.closest('#no-drag') && el.id !== 'no-drag';
  }
});

// Función para inicializar el estado local
const initializeLocalState = () => {
  // Crear copia profunda de todos los botones
  const allButtons = [
    ...props.buttons.map(btn => ({ ...btn, hover: false })),
    ...props.buttonsHidden.map(btn => ({ ...btn, hover: false }))
  ];
  
  localButtons.value = allButtons;
  
  // Inicializar drag and drop solo con botones visibles
  const visibleOnly = allButtons.filter(button => button.is_visible);
  dragButtons.value = visibleOnly;
};

// Sincronizar cuando cambian los props (solo si no estamos arrastrando)
watch(() => [props.buttons, props.buttonsHidden], () => {
  if (!isDragging.value) {
    initializeLocalState();
  }
}, { deep: true, immediate: true });

// Sincronizar drag and drop con estado local durante el arrastre
watch(() => dragButtons.value, (newDragButtons) => {
  if (isDragging.value) {
    // Solo actualizar el orden de los botones visibles
    const hiddenButtonsArray = localButtons.value.filter(button => !button.is_visible);
    
    // Mantener las propiedades originales pero con el nuevo orden
    const reorderedVisible = newDragButtons.map(dragBtn => {
      const originalBtn = localButtons.value.find(btn => btn.id === dragBtn.id);
      return { ...originalBtn };
    });
    
    localButtons.value = [...reorderedVisible, ...hiddenButtonsArray];
  }
}, { deep: true });

// Eventos de drag and drop
state.on('dragStarted', () => {
  showOverlays.value = false;
  showDragButtons.value = false;
  isDragging.value = true;
  localButtons.value.forEach(button => {
    button.hover = false;
  });
});

state.on('dragEnded', async () => {
  const elements = document.elementsFromPoint(event.clientX, event.clientY);
  const isInNoDragZone = elements.some(el => el.closest('#no-drag'));
  
  await nextTick();
  
  showOverlays.value = true;
  showDragButtons.value = true;
  isDragging.value = false;
  
  if (isInNoDragZone) {
    return;
  }
  
  // Actualizar orden en segundo plano sin bloquear la UI
  updateOrderInBackground();
});

// actualizar el orden en segundo plano
const updateOrderInBackground = async () => {
  try {
    // Preparar payload solo con los IDs y su estado de visibilidad actual
    const payload = localButtons.value.map(button => ({
      id: button.id,
      is_visible: button.is_visible
    }));
    
    await hotelButtonsStore.$updateOrderButtons(payload);
    
    // Opcional: refrescar datos del servidor para sincronizar
    // emit('getButtons');
  } catch (error) {
    console.error('Error actualizando orden:', error);
    toast.warningToast('Error al actualizar el orden', 'top-right');
    
    // En caso de error, revertir al estado del servidor
    initializeLocalState();
  }
};

const setDragStart = (index) => {
 dragStartIndex.value = index;
};
   
const handlerClickSwichVisibility = (event) => {
 event.stopPropagation();
};

const updateButtonVisibility = async (button) => {
  const originalVisibility = button.is_visible;
  
  // Actualizar inmediatamente la UI (reactividad local)
  button.is_visible = !button.is_visible;
  
  // Reorganizar localmente
  const visibleButtonsArray = localButtons.value.filter(b => b.is_visible);
  const hiddenButtonsArray = localButtons.value.filter(b => !b.is_visible);
  localButtons.value = [...visibleButtonsArray, ...hiddenButtonsArray];
  
  // Actualizar drag and drop
  dragButtons.value = visibleButtonsArray;
  
  //  segundo plano
  try {
    const payload = { id: button.id };
    await hotelButtonsStore.$updateButtonVisibility(payload);
    
    // sincronizar con el servidor
    emit('getButtons');
  } catch (error) {
    console.error('Error updating button visibility:', error);
    
    // Revertir cambios si hay error
    button.is_visible = originalVisibility;
    
    // Reorganizar de nuevo
    const revertedVisible = localButtons.value.filter(b => b.is_visible);
    const revertedHidden = localButtons.value.filter(b => !b.is_visible);
    localButtons.value = [...revertedVisible, ...revertedHidden];
    dragButtons.value = revertedVisible;
    
    toast.warningToast('Error al actualizar la visibilidad', 'top-right');
  }
};

const checkConfig = (name) => {
 if (!hotelData) return false;
 
 switch(name) {
   case 'Normas del alojamiento':
     return hotelData.policies_count && hotelData.policies_count > 0;
   case 'Redes WiFi':
     return hotelData.with_wifi && hotelData.wifi_count > 0;
   case 'Programa de referidos':
     return hotelData.show_referrals;
   case 'Check-In':
     return hotelData.show_checkin_stay;
   case 'Reserva tu estancia':
     return hotelData.website_google;
   default:
     return true;
 }
};

const goToConfig = (name) => {
 switch(name) {
   case 'PoliciesLegal':
     router.push({ name: 'PoliciesLegal' });
     break;
   case 'wifi':
     router.push('/alojamiento/perfil#checkin-checkout-section');
     break;
   case 'referrals':
     router.push('/webapp/referidos');
     break;
   case 'checkin':
     router.push({ name: 'CheckinGeneral' });
     break;
   case 'website':
     router.push('/alojamiento/perfil#email-section');
     break;
 }
};
</script>

<style lang="scss" scoped>
.button-card {
 height: 100px;
 box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.15);
 transition: all 0.2s ease;
}


.buttom-drag {
 &:hover {
   background-color: #F3F3F3;
 }
}
</style>