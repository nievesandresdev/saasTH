<template>
    <div class="space-y-[24px]">
        <div class="list-component max-w-[720px] 3xl:max-w-[1218px] flex flex-wrap gap-6 mt-6">
            <label 
                for="fileInput"
                class="relative w-[224px] rounded-[10px] border hborder-gray-400 cursor-pointer gallery-file flex justify-center items-center shadow-card h-[184px]"
                @click="addNewFacility"
            >   
                <h5 class="text-base font-medium text-center flex flex-col items-center justify-center">
                    <div class="icon w-[240px] inline-block mb-2 " />
                    Crear instalación
                </h5>
            </label>
            <div
                v-for="(item, index) in visibleFacilities"
                :key="index"
                @dragover="handlerDragOver"
                @drop="handlerDrop(index, item)"
                :draggable="true"
                @dragstart="handlerDragStart(index, $event)"
                @dragend="handlerDragEnd"
                ref="draggableCard"
                class="text-center rounded-[10px] cursor-pointer w-[224px] overflow-hidden relative hbg-white-100"
                :class="{'shadow-draginng border border-gray-300' : item.id == selectedCard, 'shadow-draginng': dragStartIndex == index, 'shadow-card': dragStartIndex != index}"
                @mouseover="hoverItem = index"
                @mouseleave="hoverItem = null"
                @click="editFacility(item)"
            >
                <div v-if="hoverItem == index" class="hover-swich hbg-gray-100 rounded-[6px] py-1 px-2 flex justify-center items-center space-x-1 inline-block absolute top-2 right-2 z-40">
                    <span class="text-[10px] font-semibold">Visible</span>
                    <BaseSwichInput
                        v-model="item.select"
                        :id="`swich-visible-facility-${index}`"
                        @change:value="updateVisible(item)"
                        @click="handlerClickSwichVisibility"
                    />
                </div>
                <div
                    v-if="item.select == 0"
                    class="hidden-overlay h-full w-full absolute top-0 left-0 cursor-pointer z-40"
                />
                <div class="w-full h-32 relative">
                    <img
                        class="w-full object-cover rounded-t-lg h-full"
                        :src="facilityStore.formatImage(item.image)"
                    />
                    <div v-if="item.ad_tag" class="absolute bottom-[-12px] right-[8px] h-6 flex items-center text-enter z-10 hbg-yellow-cta p-2 rounded-full py-[4px] px-[8px] text-[10px] font-semibold">{{ item.ad_tag }}</div>
                </div>
                <div class="py-[19px] text-center bg-white px-[12px] truncate-1">
                    <h5 class="text-base htext-black-100 truncate-1 leading-[110%]" v-html="item.title"></h5>
                    <!-- {{`1: ${dragStartIndex}`}}
                    {{`2: ${draggedItem}`}} -->
                </div>
                <button
                    v-if="hoverItem == index"
                    class="buttom-drag p-1 shadow-md rounded-full hbg-white-100 absolute right-2 bottom-2 hover:bg-[#F3F3F3] cursor-grab z-10"
                    :class="{'cursor-grabbing ': dragStartIndex == index}"
                    @mousedown="setDragStart(index)"
                >
                    <img class="w-6 h-6" src="/assets/icons/TH.GRAD.svg" alt="grad">
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, provide, computed, inject, nextTick } from 'vue';

// COMPONENTS
import BaseSwichInput from "@/components/Forms/BaseSwichInput.vue";
import ListPageListVisibleItem from "./ListPageListVisibleItem.vue";

const emit = defineEmits(['update:reloadItems', 'click:editFacility']);

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
const mockupStore = inject('mockupStore');
const visibleFacilities = inject('visibleFacilities');
const modalChangePendinginForm = inject('modalChangePendinginForm');
const changePendingInForm = inject('changePendingInForm');

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
  });
};

const handlerDragOver = (event) => {
  event.preventDefault();
};

const handlerDrop = (index, facility) => {
    if (changePendingInForm.value) {
        openModalChangeInForm();
        return;
    }
  const draggedIndex = parseInt(event.dataTransfer.getData('text/plain'));
  if (draggedIndex !== index) {
    const droppedItem = visibleFacilities.value.splice(draggedIndex, 1)[0];
    visibleFacilities.value.splice(index, 0, droppedItem);
    updateOrder();
  }
  draggedItem.value = null;
  dragStartIndex.value = null;
};

const handlerDragEnd = () => {
  draggedItem.value = null;
  dragStartIndex.value = null;

};

////

function handlerClickSwichVisibility (event) {
    event.stopPropagation();
}

async function updateVisible (facility) {
    if (changePendingInForm.value) {
        openModalChangeInForm();
        facility.select = !facility.select;
        return;
    }
    const data = {visible: facility.select, facility_hoster_id: facility.id}
    const response = await facilityStore.$updateVisible(data)
    mockupStore.$reloadIframe();
    emit('update:reloadItems')
}
async function updateOrder () {
    const idsFacities = visibleFacilities.value.map(item => item.id);
    const data = {order: idsFacities};
    const response = await facilityStore.$updateOrder(data);
    mockupStore.$reloadIframe();
}

function addNewFacility () {
    if (changePendingInForm.value) {
        openModalChangeInForm();
        return;
    }
    emit('click:editFacility', { action: 'ADD', facility: null});
}
function editFacility (facility) {
    emit('click:editFacility', { action: 'EDIT', facility});
}

function openModalChangeInForm () {
    modalChangePendinginForm.value = true;
    nextTick(() => {
        modalChangePendinginForm.value = false;
    });
}

</script>

<style lang="scss">
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
.hover-swich{
    box-shadow: 0px 3.5px 7px 0px rgba(0, 0, 0, 0.15);
}
.gallery-file {
    & .icon {
        width: 20px;
        height: 20px;
        background-image: url('/public/assets/icons/1.TH.PLUS.svg');
        background-size: cover;
    }
    &:hover {
        border-color: var(--h-green-600);

        & > h5 {
            color: var(--h-green-600);
        }

        & .icon {
            background-image: url('/public/assets/icons/1.TH.PLUS.GREEN.svg');
        }

    } 
}
</style>