<template>
    <p class="mt-4 text-sm font-medium mb-4"  v-if="!formFilter.search_terms">
        {{ textNumbersPlacesVisiblesAndHidden }}
    </p>
    <template v-if="placesData.length > 0">
        <div id="list-places" class="flex flex-wrap gap-6 w-[789px] 3xl:w-[1216px]">
            <template v-for="(place, index) in placesData">
                <div
                    v-if="(!formFilter.visibility || formFilter.visibility == 'recommendated') && !place?.is_visible && placesData[index-1]?.is_visible"
                    class="w-[789px] 3xl:w-[1216px] relative"
                >
                    <div
                        class="z-50 flex items-center divider"
                        style="margin:0 !important; padding:0 !important; "
                    >
                        <div class="flex-grow bg-gray-300 border-t"></div>
                        <p class="mx-6 w-[198px] text-center text-sm font-medium">
                            {{numberPlacesHidden}}
                            {{numberPlacesHidden > 1 ? 'lugares ocultos':'lugar oculto'}}

                        </p>
                        <div class="flex-grow bg-gray-300 border-t"></div>
                    </div>
                </div>
                <div
                    class="w-[224px] hbg-white-100 rounded-[10px] shadow-card cursor-pointer relative"
                    @dragover="handlerDragOver"
                    @drop="handlerDrop(index, item)"
                    :draggable="true"
                    @dragstart="handlerDragStart(index, $event)"
                    @dragend="handlerDragEnd"
                    ref="draggableCard"
                    :class="{'shadow-draginng border border-gray-300' : place.id == selectedCard, 'shadow-draginng': dragStartIndex == index, 'shadow-card': dragStartIndex != index}"
                    @mouseover="hoverItem = index"
                    @mouseleave="hoverItem = null"
                    @click="editPlace(place)"
                >
                    <div class="w-[224px] h-[148px] rounded-t-[10px] relative">
                        <img
                            class="w-[224px] h-[148px] rounded-t-[10px]"
                            loading="lazy"
                            :src="placeStore.formatImage(place.place_images?.[0])"
                        >
                        <div v-if="hoverItem == index" class="hover-swich hbg-gray-100 rounded-[6px] py-1 px-2 flex justify-center items-center space-x-1 inline-block absolute top-2 right-2 z-40">
                            <span class="text-[10px] font-semibold">{{place.is_visible ? 'Visible' : 'Oculto'}}</span>
                            <BaseSwichInput
                                v-model="place.is_visible"
                                :id="`swich-visible-facility-${index}`"
                                @change:value="updateVisible(place)"
                                @click="handlerClickSwichVisibility"
                            />
                        </div>
                        <div
                            v-if="place.featured || ((hoverItem == index) && place.is_visible)"
                            class=" z-10 absolute left-0 bottom-0 rounded-tr-[8px] flex items-center space-x-[4px] p-[8px] z-[100]"
                            :class="place.featured ? 'hbg-green-600' : 'hbg-white-100'"
                            @click.prevent="updateRecommendation($event, place)"
                        >
                            <img
                                class=""
                                :src="`/assets/icons/1.TH.REVIEW.${place.featured ? 'WHITE' : 'OUTLINE'}.svg`"
                                alt="1.TH.WHITE"
                            >
                            <span
                                class="text-[10px] font-semibold"
                                :class="place.featured ? 'htext-white-100' : 'htext-black-100'"
                            >
                                Recomendar
                            </span>
                        </div>
                    </div>
                    <div
                        v-if="place.is_visible == 0"
                        class="hidden-overlay h-full w-full absolute top-0 left-0 cursor-pointer z-10"
                    />
                    <div class="pt-2 px-2 pb-4 truncate-2 space-y-[8px]">
                        <div class="flex items-center space-x-[4px] pb-[7px]">
                            <span class="text-[22px] font-medium htext-black-100">{{converStar(place.num_stars).toFixed(1)}}</span>
                            <div>
                                <div class="flex flec-col">
                                    <img 
                                        v-for="star in Math.round(converStar(place.num_stars))"
                                        :key="star"
                                        class="w-[12px] h-[12px]" src="/assets/icons/1.TH.REVIEW.svg"
                                    >
                                </div>
                                <p class="text-[10px] font-semibold htext-black-100">{{ place.num_reviews }} reviews</p>
                            </div>
                        </div>
                        <h6 class="text-sm htext-black-100 font-medium truncate-2 h-[40px]">{{ place.title }} {{ place.id }}</h6>
                        <div class="flex space-x-1">
                            <img class="" src="/assets/icons/1.TH.LOCATION.svg" alt="1.TH.LOCATION">
                            <p class="text-[10px] font-semibold htext-black-100">{{ place.city }}</p>
                        </div>
                        <div v-if="place.distance" class="flex space-x-1">
                            <img class="" src="/assets/icons/1.TH.FOOTSTEP.svg" alt="1.TH.FOOTSTEP">
                            <p class="text-[10px] font-semibold htext-black-100">{{ `a ${place.distance}Km`}}</p>
                        </div>
                        <button
                            v-if="hoverItem == index && place.is_visible"
                            class="buttom-drag p-1 shadow-md rounded-full hbg-white-100 absolute right-2 bottom-2 hover:bg-[#F3F3F3] cursor-grab z-10"
                            :class="{'cursor-grabbing ': dragStartIndex == index}"
                            @mousedown="setDragStart(index)"
                        >
                            <img class="w-6 h-6" src="/assets/icons/TH.GRAD.svg" alt="grad">
                        </button>
                    </div>
                </div>
            </template>
            <!-- <PanelEdit
                ref="panelEditRef"
                @load:resetPageData="resetPageData()"
            /> -->
        </div>
    </template>
    <template v-else>
        <div class="flex flex-col justify-center items-center space-y-4 mt-[85px]">
            <div>
                <img src="/assets/img/1.TH.NO.RECORDS.png" alt="1.TH.NO.RECORDS">
            </div>
            <div>
                <p class="text-base htext-gray-500">No se han encontrado lugares.</p>
            </div>
        </div>
    </template>
    <div v-if="(placesData.length > 0) && (placesData.length < paginateData?.total)" class="w-[789px] 3xl:w-[1216px] text-center mt-[32px]">
        <button
            v-if="!isloadingForm"
            class="text-sm font-medium text-center rounded-lg py-[13px] px-[16px] border border-black htext-black-100"
            @click="loadMore({ showLoadingMore: true })"
        >
            Cargar más
        </button>
        <div
            v-else
            class="w-full flex justify-center"
        >
            <div
                class="spinner-container mx-auto mt-auto"
            >
                <svg class="spinner" viewBox="0 0 50 50">
                    <defs>
                        <linearGradient id="spinnerGradient" x1="100%" y1="0%" x2="0%" y2="0%">
                            <stop offset="60%" stop-color="#34A98F" stop-opacity="0.3" />
                            <stop offset="100%" stop-color="#34A98F" stop-opacity="1" />
                        </linearGradient>
                    </defs>
                    <circle ref="circle" cx="25" cy="25" r="20" fill="none" stroke="url(#spinnerGradient)" stroke-width="2.5" stroke-dasharray="125.6" stroke-dashoffset="125.6" class="circle"></circle>
                </svg>
                <img class="spinner-icon  w-[40px] h-[40px]" src="/assets/icons/hotel-bell-svgrepo-com.svg" alt="">
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, provide, computed, nextTick, inject } from 'vue';

import BaseSwichInput from "@/components/Forms/BaseSwichInput.vue";
import PanelEdit from "./components/PanelEdit.vue";

const emits = defineEmits(['reloadPlaces', 'edit']);

const hotelStore = inject('hotelStore');
const placeStore = inject('placeStore');
const hotelData = inject('hotelData');
const categoriplaces = inject('categoriplaces');
const typeplaces = inject('typeplaces');
const placesData = inject('placesData');
const formFilter = inject('formFilter');
const paginateData = inject('paginateData');
const page = inject('page');
const numberPlacesVisible = inject('numberPlacesVisible');
const numberPlacesHidden = inject('numberPlacesHidden');
const changePendingInForm = inject('changePendingInForm');
const modalChangePendinginForm = inject('modalChangePendinginForm');

const toast = inject('toast');
const mockupStore = inject('mockupStore');

// DATA
const selectedCard = ref(null);
const dragStartIndex = ref(null);
const draggedItem = ref(null);
const hoverItem = ref(null);
const isloadingForm = ref(false);

// REFS
const draggableCard = ref(null);

const textNumbersPlacesVisiblesAndHidden = computed(() => {
    let text = null;
    let visiblesText = 'lugares visibles';
    let hiddensText = 'lugares ocultos';
    let hidden = 'ocultos';
    //singular
    numberPlacesVisible.value == 1 ? visiblesText = "lugar visible": '';
    numberPlacesHidden.value == 1 ? hiddensText = "lugar oculto": '';
    numberPlacesHidden.value == 1 ? hidden = "oculto": '';
    //
    if(!formFilter.visibility){
        text = ` ${numberPlacesVisible.value} ${visiblesText} y ${numberPlacesHidden.value} ${hidden}`
    }
    if(formFilter.visibility){
        if(formFilter.visibility.includes('visible')){
            text =` ${numberPlacesVisible.value} ${visiblesText}`
        }
        if(formFilter.visibility.includes('recommendated')){
            text =` ${numberPlacesVisible.value} ${visiblesText}`
        }
        if(formFilter.visibility.includes('hidden')){
            text =` ${numberPlacesHidden.value} ${hiddensText}`
        }

    }
    text = `${text} en ${!formFilter.all_cities ? hotelData.zone : 'España'}`
    return text;
});


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
    const droppedItem = placesData.value.splice(draggedIndex, 1)[0];
    placesData.value.splice(index, 0, droppedItem);
    updatePosition();
  }
  draggedItem.value = null;
  dragStartIndex.value = null;
};

const handlerDragEnd = () => {
  draggedItem.value = null;
  dragStartIndex.value = null;

};

///

function converStar(value){
    if(!value) return 0;
    return parseFloat(value.replace(",", "."));
}

function loadMore ({showLoadingMore}) {
    page.value += 1;
    
    loadPlaces({ showPageLoading: false, showLoadingMore  });
}

async function loadPlaces ({ showPageLoading, showLoadingMore }) {
    if (showLoadingMore) {
        isloadingForm.value=true;
    }
    // console.log(formFilter, 'form')
    const response = await placeStore.$getAll({page: page.value,...formFilter}, { showPreloader: showPageLoading });
    if (response.ok) {
        let paginate = {
            total: response.data.places.meta.total,
            current_page: response.data.places.meta.current_page,
            per_page: response.data.places.meta.per_page,
            last_page: response.data.places.meta.last_page,
            from_page: response.data.places.meta.from,
            to: response.data.places.meta.to,
        }
        Object.assign(paginateData, paginate);
        page.value = paginateData.current_page;
        placesData.value = [...placesData.value, ...response.data.places.data];
        numberPlacesVisible.value = response.data.countVisible;
        numberPlacesHidden.value = paginate.total - numberPlacesVisible.value;
    }
    isloadingForm.value=false;
}
defineExpose({ loadPlaces });

async function updatePosition () {
    const idsPlaces = placesData.value.filter(item => item.is_visible).map(item => item.toggle_place_id);
    const data = {
        position: idsPlaces,
        selected_place: formFilter.selected_place,
        selected_subplace: formFilter.selected_subplace,
    };

    const response = await placeStore.$updatePosition(data);
    const { ok } = response;
    if (ok) {
        toast.warningToast('Cambios guardados con éxito','top-right');
    } else {
        toast.warningToast(data?.message,'top-right');
    }
    mockupStore.$reloadIframe();
}
function handlerClickSwichVisibility (event) {
    event.stopPropagation();
}
async function updateVisible (place) {
    if (changePendingInForm.value) {
        openModalChangeInForm();
        place.select = !facility.select;
        return;
    }
    const data = {
        visivility: place.is_visible,
        place_id: place.id,
        selected_place: formFilter.selected_place,
        selected_subplace: formFilter.selected_subplace,
    }
    const response = await placeStore.$updateVisibility(data);
    const { ok } = response;
    if (ok) {
        toast.warningToast('Cambios guardados con éxito','top-right');
    } else {
        toast.warningToast(data?.message,'top-right');
    }
    mockupStore.$reloadIframe();
    emits('reloadPlaces');
}

async function updateRecommendation (event, place) {
    event.stopPropagation();
    if (changePendingInForm.value) {
        openModalChangeInForm();
        place.select = !facility.select;
        return;
    }
    const data = {
        recommedation: !place.featured,
        place_id: place.id,
    }
    const response = await placeStore.$updateRecommendation(data);
    const { ok } = response;
    if (ok) {
        toast.warningToast('Cambios guardados con éxito','top-right');
    } else {
        toast.warningToast(data?.message,'top-right');
    }
    mockupStore.$reloadIframe();
    emits('reloadPlaces');
}

function editPlace (place) {
 emits('edit', { action: 'EDIT', place});
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



    .spinner {
    width: 80px;
    height: 80px;
    animation: spin 1.5s linear infinite;
    position: relative;
    z-index: 1;
    }

    @keyframes spin {
    to {
        transform: rotate(1turn);
    }
    }

    .circle {
    stroke-dasharray: 125.6;
    stroke-dashoffset: 125.6;
    animation: dash 1.5s linear infinite;
    }

    @keyframes dash {
    to {
        stroke-dashoffset: 0;
    }
    }



    .spinner-container {
    position: relative;
    width: 80px; /* 81px icon + 2x 100px padding */
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    }
    .spinner-icon {
    position: absolute;
    top: 18px; /* Padding + spacing */
    left: 20px; /* Padding + spacing */
    z-index: 2;
    }
</style>