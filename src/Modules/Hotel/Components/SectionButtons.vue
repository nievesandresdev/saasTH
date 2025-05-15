<template>
   <div class="flex flex-col gap-2">
    <span class="text-sm font-semibold">Botones visibles (x)</span>
    <TransitionGroup 
      name="list" 
      tag="div" 
      ref="parent"
      class="grid grid-cols-4 3xl:grid-cols-6 3xl:w-[850px] 1x1:w-full gap-4 pr-[150px] 3xl:pr-0 max-w-[1920px]"
    >
      <div 
        v-for="(button, index) in buttons" 
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
                {{ button.is_visible ? 'Visible' : 'Oculto' }}
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
          v-if="button.hover && button.is_visible && showDragButtons"
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
    <span class="text-sm font-semibold">Botones ocultos (x)</span>
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
                {{ button.is_visible ? 'Visible' : 'Oculto' }}
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
          v-if="button.hover && button.is_visible && showDragButtons"
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

import { useDragAndDrop } from "@formkit/drag-and-drop/vue";

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

state.on('dragStarted', () => {
  console.log('dragStarted', props.buttons);
  showOverlays.value = false;
  showDragButtons.value = false;
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
    return;
  }

  console.log('dragEnded', props.buttons);
  // Wait for the next tick to ensure animations are complete
  await nextTick();
  
  showOverlays.value = true;
  showDragButtons.value = true;
  
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
</script>

<style lang="scss" scoped>
.button-card {
  height: 100px;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease;
  
  &.is-dragging {
    opacity: 0.5;
    transform: scale(1.05);
    cursor: grabbing;
    z-index: 10;
  }

  &.margin-left {
    margin-left: 128px;
  }
  
  &.margin-right {
    margin-right: 128px;
  }
}

.list-move {
  transition: transform 0.5s ease;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.shadow-card {
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.15);
}

.shadow-draginng {
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}

.buttom-drag {
  &:hover {
    background-color: #F3F3F3;
  }
}
</style>