<template>
    <div class="space-y-[24px]">
        <div id="list-confort" class="max-w-[720px] 3xl:max-w-[1218px] flex flex-wrap gap-6">
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
                v-for="(item, index) in confortsData"
                :key="index"
            >
                <!-- v-if="(!formFilter.visibility || formFilter.visibility == 'recommendated') && !place?.is_visible && placesData[index-1]?.is_visible && !isloadingForm" -->
                <div
                    v-if="!item?.visible && confortsData[index-1]?.visible"
                    class="w-[789px] 3xl:w-[1216px] relative"
                >
                    <div
                        class="z-50 flex items-center divider"
                        style="margin:0 !important; padding:0 !important; "
                    >
                        <div class="flex-grow bg-gray-300 border-t"></div>
                        <p class="mx-6 w-[210px] text-center text-sm font-medium">
                            {{numberHidden}}
                            {{numberHidden > 1 ? 'servicios de confort ocultos':'servicio de confort oculto'}}

                        </p>
                        <div class="flex-grow bg-gray-300 border-t"></div>
                    </div>
                </div>
                <div
                    ref="draggableCard"
                    class="rounded-[10px] cursor-pointer w-[224px] overflow-hidden relative hbg-white-100"
                    :class="{'shadow-draginng border border-gray-300' : item.id == selectedCard, 'shadow-draginng': dragStartIndex == index, 'shadow-card': dragStartIndex != index}"
                    :draggable="true"
                    @dragover="handlerDragOver"
                    @drop="handlerDrop(index, item)"
                    @dragstart="handlerDragStart(index, $event)"
                    @dragend="handlerDragEnd"
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
                            :src="confortStore.formatImage(item.images?.[0])"
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
import { ref, onMounted, computed, nextTick, inject } from 'vue';

import SkeletonCard from './components/SkeletonCard.vue';
import BaseSwichInput from '@/components/Forms/BaseSwichInput.vue';

import { $throttle, $isElementVisible } from '@/utils/helpers';

const toast = inject('toast');

// COMPOSABLE
import { usePaginationScrollInfinite } from '@/composables/usePaginationScrollInfinite';

const emit = defineEmits(["click:editItem", "click:editItem", "loadData", "reloadData"]);

// DATA
const draggedItem = ref(null);
const dragStartIndex = ref(null);
const hoverItem = ref(null);
const draggableCard = ref(null);

const defNumberCardsToLoad = ref(20);


// INJECT
const serviceStore = inject('serviceStore');
const mockupStore = inject('mockupStore');
const confortStore = inject('confortStore');

const confortsData = inject('confortsData');
const selectedCard = inject('selectedCard');
const page = inject('page');
const paginateData = inject('paginateData');
const firstLoad = inject('firstLoad');
const isloadingForm = inject('isloadingForm');
const numberHidden = inject('numberHidden');

// COMPUTED
// const numberCardsToLoad = computed(() => {

//     if(firstLoad?.value) return defNumberCardsToLoad.value;
//     if(!firstLoad?.value && paginateData.total == 0) return 0;
//     let remaining = paginateData.total - confortsData.value.length;
//     if(remaining < defNumberCardsToLoad.value && paginateData.total > 0){
//         return remaining;
//     }
//     return defNumberCardsToLoad.value;
// });

const numberItemsLoadCurrent = computed(() => {
    return confortsData.value.length;
});

onMounted(() => {
    // initScrollListener();  
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
    const droppedItem = confortsData.value.splice(draggedIndex, 1)[0];
    confortsData.value.splice(index, 0, droppedItem);
    updateOrder();
  }
  draggedItem.value = null;
  dragStartIndex.value = null;
};

const handlerDragEnd = () => {
  draggedItem.value = null;
  dragStartIndex.value = null;
};

// PAGINATION
// function initScrollListener() {
//     const container = document.querySelector('#list-confort');
//     container.addEventListener('scroll', $throttle(checkLoadMore, 300), true);
// }

// function checkLoadMore () {
//     const skeletons = document.querySelectorAll('.skeleton-confort-card');
//     for (let skeleton of skeletons) {
//         if ($isElementVisible(skeleton) && !isloadingForm.value) {
//             loadMore();
//             break;
//         }
//     }
    
// }

function loadMore () {
    page.value += 1;
    emit('loadData');
}

//

async function updateOrder () {
    const idsConforts = confortsData.value.map(item => item.id);
    const data = {order: idsConforts};
    const response = await confortStore.$updateOrder(data);
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
    'skeleton-confort-card',
    isloadingForm,
    loadMore
);

function handlerClickSwichVisibility (event) {
    event.stopPropagation();
}
async function updateVisible (confort) {
    isloadingForm.value=true;
    const data = {
        visible: confort.visible,
        id: confort.id,
    }
    const response = await confortStore.$updateVisibility(data);
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