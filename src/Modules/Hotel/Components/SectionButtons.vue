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
        v-for="(button, index) in buttons" 
        :key="button.id"
        class="button-card bg-[#FFF] rounded-[10px] py-4 px-4 w-[128px] flex flex-col relative cursor-pointer"
        :class="{
        }"
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
                <!-- {{ button.is_visible ? 'Visible' : 'Oculto' }} -->
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
        v-for="(button, index) in buttonsHidden" 
        :key="button.id"
        class="button-card bg-[#FAFAFA] rounded-[10px] py-4 px-4 w-[128px] flex flex-col relative cursor-pointer"
        :class="{
        }"
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
                      @click="handlerClickSwichVisibility"
                      :disabled="!checkConfig(button.name)"
                    />
                  </div>
                </template>
                <template #content>
                  <div class="text-sm leading-[150%] font-normal">
                    <span v-if="button.name === 'Normas del alojamiento'">
                      Registra las 
                      <a 
                        @click.prevent="goToConfig('GeneralLegal')" 
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
                    <span v-else-if="button.name === 'Check-in'">
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
import { ref, nextTick, watch } from 'vue';
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

const [ parent, dragButtons ] = useDragAndDrop(props.buttons, {
  draggable: (el) => {
    // Solo permitir drag en elementos que no estén dentro del contenedor de botones ocultos
    return !el.closest('#no-drag') && el.id !== 'no-drag';
  }
});

const showOverlays = ref(true);
const showDragButtons = ref(true);
const isDragging = ref(false);

state.on('dragStarted', () => {
  console.log('dragStarted', props.buttons);
  showOverlays.value = false;
  showDragButtons.value = false;
  isDragging.value = true;
  // Disable hover and hide overlay for all buttons during drag
  props.buttons.forEach(button => {
    button.hover = false;
  });
});

state.on('dragEnded', async () => {
  // Verificar si el elemento arrastrado está dentro de la zona de no-drag
  const elements = document.elementsFromPoint(event.clientX, event.clientY);
  const isInNoDragZone = elements.some(el => el.closest('#no-drag'));
  
  if (isInNoDragZone) {
    // Si está en la zona de no-drag, solo actualizamos la UI sin hacer la petición
    showOverlays.value = true;
    showDragButtons.value = true;
    isDragging.value = false;
    return;
  }

  console.log('dragEnded', props.buttons);
  // Wait for the next tick to ensure animations are complete
  await nextTick();
  
  showOverlays.value = true;
  showDragButtons.value = true;
  isDragging.value = false;
  
  // Reset hover states and trigger hover for the current element
  const updatedButtons = props.buttons.map(button => ({
    ...button,
    hover: false
  }));
  
  // Find the element under the cursor and trigger its hover
  const buttonCard = elements.find(el => el.classList.contains('button-card'));
  if (buttonCard) {
    const index = Array.from(buttonCard.parentNode.children).indexOf(buttonCard);
    if (index !== -1 && updatedButtons[index]) {
      updatedButtons[index].hover = true;
    }
  }
  
  // Actualizamos el estado local primero
  emit('updateButtons', updatedButtons);
  
  // Luego actualizamos la base de datos
  try {
    const payload = {
      visible: updatedButtons
        .filter(button => button.is_visible)
        .map(button => ({ id: button.id })),
      hidden: updatedButtons
        .filter(button => !button.is_visible)
        .map(button => ({ id: button.id }))
    };
    
    console.log('Enviando payload al servidor:', payload);
    await hotelButtonsStore.$updateOrderButtons(payload);
    //console.log('Actualización completada exitosamente');
    //toast.warningToast('Orden actualizado con éxito', 'top-right');
    emit('getButtons');
  } catch (error) {
    console.error('Error en la actualización:', error);
    // Si falla la actualización, revertimos el estado local
    const revertedButtons = [...props.buttons];
    emit('updateButtons', revertedButtons);
    toast.warningToast('Error al actualizar el orden', 'top-right');
  }
});

// Sincronizar los botones del drag and drop con los props
watch(() => props.buttons, (newButtons) => {
  dragButtons.value = [...newButtons];
}, { deep: true });

// Sincronizar los cambios del drag and drop con el componente padre
watch(() => dragButtons.value, (newButtons) => {
  emit('updateButtons', newButtons);
}, { deep: true });

const dragStartIndex = ref(null);


const setDragStart = (index) => {
  dragStartIndex.value = index;
};
    
const handlerClickSwichVisibility = (event) => {
  event.stopPropagation();
};

const updateButtonVisibility = async (button) => {
  try {
    const payload = {
      id: button.id,
    };
    await hotelButtonsStore.$updateButtonVisibility(payload);
    //toast.warningToast('Visibilidad actualizada con éxito', 'top-right');
    emit('getButtons');
  } catch (error) {
    console.error('Error updating button visibility:', error);
    button.is_visible = !button.is_visible;
    toast.warningToast('Error al actualizar la visibilidad', 'top-right');
  }
};


const checkConfig = (name) => {
  if (!hotelData) return false;
  
  switch(name) {
    case 'Normas del alojamiento':
      return hotelData.policies && hotelData.policies.length > 0;
    case 'Redes WiFi':
      return hotelData.with_wifi;
    case 'Programa de referidos':
      return hotelData.show_referrals;
    case 'Check-in':
      return hotelData.show_checkin_stay;
    case 'Reserva tu estancia':
      return hotelData.website_google;
    default:
      return true;
  }
};

const goToConfig = (name) => {
  //el redirect es con el name de la ruta
  switch(name) {
    case 'GeneralLegal':
      router.push({ name: 'GeneralLegal' });
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