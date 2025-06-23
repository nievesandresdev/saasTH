<template>
<div class="space-y-[24px]">
    <div id="list-transport" class="list-component max-w-[720px] 3xl:max-w-[1218px] flex flex-wrap gap-6">
        <label
            v-if="!firstLoad"
            for="fileInput"
            class="relative w-[224px] rounded-[10px] border hborder-gray-400 cursor-pointer gallery-file flex justify-center items-center shadow-card h-[233px]"
            @click="addNewItem"
        >   
                <h5 class="text-base font-medium text-center flex flex-col items-center justify-center">
                    <div class="icon w-[240px] inline-block mb-2 " />
                    Crear servicio
                </h5>
        </label>
        <template
            v-for="(item, index) in transportsData"
            :key="index"
        >
            <div
                v-if="!item?.visible && transportsData[index-1]?.visible"
                class="w-[789px] 3xl:w-[1216px] relative"
            >
                <div
                    class="z-50 flex items-center divider"
                    style="margin:0 !important; padding:0 !important; "
                >
                    <div class="flex-grow bg-gray-300 border-t"></div>
                    <p class="mx-6 w-[210px] text-center text-sm font-medium">
                        {{numberHidden}}
                        {{numberHidden > 1 ? 'servicios de transporte ocultos':'servicio de transporte oculto'}}

                    </p>
                    <div class="flex-grow bg-gray-300 border-t"></div>
                </div>
            </div>
            <div
                @dragover="handlerDragOver"
                @drop="handlerDrop(index, item)"
                :draggable="true"
                @dragstart="handlerDragStart(index, $event)"
                @dragend="handlerDragEnd"
                ref="draggableCard"
                class="rounded-[10px] cursor-pointer w-[224px] overflow-hidden relative hbg-white-100"
                :class="{'shadow-draginng border border-gray-300' : item.id == selectedCard, 'shadow-draginng': dragStartIndex == index, 'shadow-card': dragStartIndex != index}"
                @mouseover="hoverItem = index"
                @mouseleave="hoverItem = null"
                @click="editItem(item)"
            >
                <div v-if="hoverItem == index" class="hbg-white-100 rounded-[6px] py-1 px-2 flex justify-center items-center space-x-1 inline-block absolute top-2 right-2 z-[100]">
                    <span class="text-[10px] font-semibold">
                        {{ item.visible == 1 ? 'Visible' : 'Oculto' }}
                    </span>
                    <BaseSwichInput
                        v-model="item.visible"
                        :id="`swich-visible-confort-${index}`"
                        @change:value="updateVisible(item)"
                        @click="handlerClickSwichVisibility"
                    />
                </div>
                <div
                    v-if="item.visible == 0"
                    class="hidden-overlay h-full w-full absolute top-0 left-0 cursor-pointer z-40"
                />
                <div class="w-full h-[148px] relative">
                    <img
                        v-if="item.images?.length > 0"
                        class="w-full object-cover rounded-t-lg h-full"
                        :src="transportStore.formatImage(item.images?.[0])"
                    />
                </div>
                <div class="py-[8px] px-[12px]">
                    <div class=" bg-white truncate-2 h-[40px]">
                        <h5 class="text-[14px] font-semibold htext-black-100 leading-[120%] truncate-2" v-html="item.name" />
                    </div>
                    <p class="text-[14px] font-semibold htext-black-100 leading-[120%] mt-[12px]">
                        {{ serviceStore.calPrice(item) }}
                    </p>
                </div>
                <button
                    v-if="hoverItem == index && item.visible"
                    class="buttom-drag p-1 shadow-md rounded-full hbg-white-100 absolute right-2 bottom-2 hover:bg-[#F3F3F3] cursor-grab z-10"
                    :class="{'cursor-grabbing ': dragStartIndex == index}"
                    @mousedown="setDragStart(index)"
                >
                    <img class="w-6 h-6" src="/assets/icons/TH.GRAD.svg" alt="grad">
                </button>
            </div>
        </template>
        <SkeletonCard v-for="card in numberCardsToLoad" />
    </div>
</div>
</template>

<script setup>
import { ref, reactive, onMounted, provide, computed, nextTick, inject } from 'vue';

import SkeletonCard from './components/SkeletonCard.vue';
import BaseSwichInput from '@/components/Forms/BaseSwichInput.vue';


const emit = defineEmits(["click:editItem", "click:editItem", "loadData", 'reloadData']);

// COMPOSABLE
import { usePaginationScrollInfinite } from '@/composables/usePaginationScrollInfinite';

// STORE
import { useMockupStore } from '@/stores/modules/mockup';
const mockupStore = useMockupStore();

// DATA
const draggedItem = ref(null);
const dragStartIndex = ref(null);
const hoverItem = ref(null);
const draggableCard = ref(null);

const defNumberCardsToLoad = ref(20);

// INJECT
const toast = inject('toast');
const transportsData = inject('transportsData');
const transportStore = inject('transportStore');
const serviceStore = inject('serviceStore');
const selectedCard = inject('selectedCard');
const paginateData = inject('paginateData');
const page = inject('page');
const firstLoad = inject('firstLoad');
const isloadingForm = inject('isloadingForm');
const numberHidden = inject('numberHidden');
const numberVisible = inject('numberVisible');

// COMPUTED

const numberItemsLoadCurrent = computed(() => {
    return transportsData.value.length;
});

onMounted(() => { 
})

// FUNCTION

//DRAG
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
  const draggedIndex = parseInt(event.dataTransfer.getData('text/plain'));
  if (draggedIndex !== index) {
    const droppedItem = transportsData.value.splice(draggedIndex, 1)[0];
    transportsData.value.splice(index, 0, droppedItem);
    updateOrder();
  }
  draggedItem.value = null;
  dragStartIndex.value = null;
};

const handlerDragEnd = () => {
  draggedItem.value = null;
  dragStartIndex.value = null;
};

// 

function loadMore () {
    page.value += 1;
    loadData();
}

async function updateOrder () {
    const idsConforts = transportsData.value.map(item => item.id);
    const data = {order: idsConforts};
    const response = await transportStore.$updateOrder(data);
    mockupStore.$reloadIframe();
}

function addNewItem () {
    emit('click:editItem', { action: 'ADD', item: null});
}
function editItem(item) {
    emit('click:editItem', { action: 'EDIT', item});
}

const { numberCardsToLoad } = usePaginationScrollInfinite(
    20,
    firstLoad,
    paginateData,
    numberItemsLoadCurrent,
    'main-content',
    'skeleton-transport-card',
    isloadingForm,
    loadMore
);

function handlerClickSwichVisibility (event) {
    event.stopPropagation();
}
async function updateVisible (transport) {
    isloadingForm.value = true;
    const data = {
        visible: transport.visible,
        id: transport.id,
    }
    const response = await transportStore.$updateVisible(data);
    const { ok } = response;
    if (ok) {
        toast.warningToast('Cambios guardados con éxito','top-right');
    } else {
        toast.warningToast(data?.message,'top-right');
    }
    emit('reloadData');
    await nextTick();
    mockupStore.$reloadIframe();
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