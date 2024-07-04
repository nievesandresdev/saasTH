<template>
    <div
        @dragover="handlerDragOver"
        @drop="handlerDrop(index)"
        :draggable="true"
        @dragstart="handlerDragStart(index, $event)"
        @dragend="handlerDragEnd"
        ref="draggableCard"
        class="text-center rounded-[10px] shadow-card cursor-pointer w-[197px] overflow-hidden relative bg-white relative"
        :class="{'shadow-selected border border-gray-300' : facility.id == selectedCard, 'shadow-draginng bg-black-100': dragStartIndex == index}"
        @mouseover="hoverItem = index"
        @mouseleave="hoverItem = null"
    >
        <div v-if="hoverItem == index" class="hbg-white-100 rounded-[6px] py-1 px-2 flex justify-center items-center space-x-1 inline-block absolute top-2 right-2 z-40">
            <span class="text-[10px] font-semibold">Visible</span>
            <BaseSwichInput
                v-model="facility.select"
                :id="`swich-visible-facility-${index}`"
            />
        </div>
        <!-- hidden description -->
        <div
            v-if="facility.select == 0"
            class="hidden-overlay h-full w-full absolute top-0 left-0 cursor-pointer z-40"
        />
        <!-- <div v-if="item.select == 0" class="bg-white absolute top-2 right-2 rounded-full z-50 p-2 text-[10px] font-medium leading-[90%]">Oculto</div> -->

        <div class="w-full h-32 relative">
            <img
                class="w-full object-cover rounded-t-lg h-full"
                :src="facilityStore.formatImage(facility.image)"
            />
        </div>
        <div class="py-4 text-center bg-white">
            <h5 class="text-base htext-black-100 px-[20px]" v-html="facility.title"></h5>
            
        </div>
        <button
            class="buttom-drag p-1 shadow-md rounded-full hbg-white-500 absolute right-2 bottom-2 hover:bg-[#F3F3F3] cursor-grab"
            :class="{'cursor-grabbing': dragStartIndex == index}"
            @mousedown="setDragStart(index)"         
        >
            <img class="w-6 h-6" src="/assets/icons/TH.GRAD.svg" alt="grad">
        </button>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, provide, computed, inject, nextTick } from 'vue';

// COMPONENTS
import BaseSwichInput from "@/components/Forms/BaseSwichInput.vue";

// PROPS
const props = defineProps({
    facility: {
        type: Object,
        default: () => ({}),
    },
    index: {
        type: Number,
        default: null,
    },
});

// DATA
const selectedCard = ref(null);
//
const draggedItem = ref(null);
const dragStartIndex = ref(null);
const hoverItem = ref(null);
// REFS
const draggableCard = ref(null);

//INJECT
const facilityStore = inject('facilityStore');
const visibleFacilities = inject('visibleFacilities');
const hiddenFacilities = inject('hiddenFacilities');

// FUNCTIONS
const setDragStart = (index) => {
  dragStartIndex.value = index;
};

const handlerDragStart = (index, event) => {
  if (dragStartIndex.value !== index) {
    event.preventDefault();
    return;
  }
  draggedItem.value = index;
  event.dataTransfer.effectAllowed = 'move';
  event.dataTransfer.setData('text/plain', index);
  nextTick(() => {
      event.dataTransfer.setDragImage(draggableCard.value[index], 0, 0);
    //   draggableCard.value[index].classList.add('cursor-grabbing');
  });
};

const handlerDragOver = (event) => {
  event.preventDefault();
};

const handlerDrop = (index) => {
  const draggedIndex = parseInt(event.dataTransfer.getData('text/plain'));
  if (draggedIndex !== index) {
    const droppedItem = visibleFacilities.value.splice(draggedIndex, 1)[0];
    visibleFacilities.value.splice(index, 0, droppedItem);
  }
  draggedItem.value = null;
  dragStartIndex.value = null;
};

const handlerDragEnd = () => {
//  if (draggedItem.value !== null && draggableCard.value[draggedItem.value]) {
//     draggableCard.value[draggedItem.value].classList.remove('cursor-grabbing');
//   }
  draggedItem.value = null;
  dragStartIndex.value = null;
};

</script>

<style scoped>
.shadow-card{
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.15);
}

.shadow-selected,
.shadow-card:hover{
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.15);
}


.hidden-overlay{
    background: rgba(0, 0, 0, 0.30)
}
.shadow-draginng {
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}
</style>