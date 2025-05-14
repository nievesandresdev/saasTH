<template>
  <TransitionGroup 
    name="list" 
    tag="div" 
    class="grid grid-cols-3 3xl:w-3/5 1x1:w-full gap-4 auto-rows-[141px]"
  >
    <div 
      v-for="(button, index) in buttons" 
      :key="button.id"
      class="button-card bg-white rounded-lg shadow-md py-4 px-4 w-[128px] flex flex-col relative cursor-pointer"
      :class="{
        'shadow-draginng border border-gray-300': button.id == selectedCard,
        'shadow-draginng': dragStartIndex == index,
        'shadow-card': dragStartIndex != index,
        'is-dragging': dragStartIndex === index,
        'margin-left': isDragging && dragOverIndex > dragStartIndex && index > dragStartIndex && index <= dragOverIndex,
        'margin-right': isDragging && dragOverIndex < dragStartIndex && index < dragStartIndex && index >= dragOverIndex
      }"
      @dragover="handlerDragOver"
      @dragenter="handleDragEnter(index)"
      @drop="handlerDrop(index)"
      :draggable="button.is_visible"
      @dragstart="handlerDragStart(index, $event)"
      @dragend="handlerDragEnd"
      ref="draggableCard"
      @mouseenter="button.hover = true"
      @mouseleave="button.hover = false"
    >
      <!-- Overlay negro en hover con toggle -->
      <div 
        v-if="button.hover" 
        class="absolute inset-0 bg-black bg-opacity-25 rounded-lg"
      >
        <div class="flex justify-end p-2">
          <div class="flex items-center bg-white p-1 rounded-[10px]">
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

      <div class="flex flex-col items-center justify-center h-full gap-4 relative z-10">
        <img 
          :src="`/assets/icons/${button.icon}`"
          :alt="button.name" 
          class="h-6 w-6" 
          :class="{'opacity-50': !button.is_visible}" 
        />
        <h3 
          :class="['text-base font-medium text-center', { 'text-[#333]': button.is_visible, 'text-[#A0A0A0]': !button.is_visible }]"
        >
          {{ button.name }}
        </h3>
      </div>

      <button
        v-if="button.hover && button.is_visible"
        class="buttom-drag p-1 shadow-md rounded-full hbg-white-100 absolute right-2 bottom-2 hover:bg-[#F3F3F3] cursor-grab z-10"
        :class="{'cursor-grabbing': dragStartIndex == index}"
        @mousedown="setDragStart(index)"
      >
        <img class="w-6 h-6" src="/assets/icons/TH.GRAD.svg" alt="grad">
      </button>
    </div>
  </TransitionGroup>
</template>

<script setup>
import { ref } from 'vue';
import BaseSwichInput from "@/components/Forms/BaseSwichInput.vue";
import { useToastAlert } from '@/composables/useToastAlert';
import { useHotelButtonsStore } from '@/stores/modules/hotelButtons';

const toast = useToastAlert();
const hotelButtonsStore = useHotelButtonsStore();

const props = defineProps({
  buttons: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['update:buttons']);

const selectedCard = ref(null);
const isDragging = ref(false);
const dragOverIndex = ref(null);
const dragStartIndex = ref(null);
const draggedItem = ref(null);
const draggableCard = ref(null);

const setDragStart = (index) => {
  dragStartIndex.value = index;
};

const handlerDragStart = (index, event) => {
  console.log('DragStart:', index);
  isDragging.value = true;
  dragStartIndex.value = index;
  draggedItem.value = index;
  dragOverIndex.value = index;
  event.dataTransfer.effectAllowed = 'move';
};

const handlerDragOver = (event) => {
  event.preventDefault();
};

const handleDragEnter = (index) => {
  dragOverIndex.value = index;
};

const handlerDrop = (index) => {
  console.log('Drop:', { from: draggedItem.value, to: index });
  if (draggedItem.value !== index) {
    const updatedButtons = [...props.buttons];
    const [movedItem] = updatedButtons.splice(draggedItem.value, 1);
    updatedButtons.splice(index, 0, movedItem);
    emit('update:buttons', updatedButtons);
    updateButtonsOrder();
  }
  isDragging.value = false;
  draggedItem.value = null;
  dragStartIndex.value = null;
  dragOverIndex.value = null;
};

const handlerDragEnd = () => {
  isDragging.value = false;
  draggedItem.value = null;
  dragStartIndex.value = null;
  dragOverIndex.value = null;
};

const handlerClickSwichVisibility = (event) => {
  event.stopPropagation();
};

const updateButtonVisibility = async (button) => {
  try {
    const payload = {
      visible: props.buttons
        .filter(btn => btn.is_visible)
        .map(btn => ({ id: btn.id })),
      hidden: props.buttons
        .filter(btn => !btn.is_visible)
        .map(btn => ({ id: btn.id }))
    };
    
    await hotelButtonsStore.$updateOrderButtons(payload);
    toast.warningToast('Visibilidad actualizada con éxito', 'top-right');
  } catch (error) {
    console.error('Error updating button visibility:', error);
    button.is_visible = !button.is_visible;
    toast.warningToast('Error al actualizar la visibilidad', 'top-right');
  }
};

const updateButtonsOrder = async () => {
  try {
    console.log('updateButtonsOrder called');
    const payload = {
      visible: props.buttons
        .filter(button => button.is_visible)
        .map(button => ({ id: button.id })),
      hidden: props.buttons
        .filter(button => !button.is_visible)
        .map(button => ({ id: button.id }))
    };
    
    console.log('Sending payload:', payload);
    await hotelButtonsStore.$updateOrderButtons(payload);
    toast.warningToast('Orden actualizado con éxito', 'top-right');
  } catch (error) {
    console.error('Error updating buttons order:', error);
    toast.warningToast('Error al actualizar el orden', 'top-right');
  }
};
</script>

<style lang="scss" scoped>
.button-card {
  height: 141px;
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
