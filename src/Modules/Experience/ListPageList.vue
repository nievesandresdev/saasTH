<template>
    
    <p class="mt-4 text-sm font-medium mb-4"  v-if="!formFilter.search_terms" :class="{'hbg-gray-500 htext-gray-500 rounded-[6px] animate-pulse w-[400px]':firstLoad}">
        {{ textNumbersExperiencesVisiblesAndHidden }}
    </p>
    
    <template v-if="!firstLoad && !experiencesData.length">
        <div class="flex flex-col justify-center items-center space-y-4 mt-[85px]">
            <div>
                <img src="/assets/img/1.TH.NO.RECORDS.EXPERIENCES.png" alt="1.TH.NO.RECORDS">
            </div>
            <div class="text-center">
                <p class="text-base htext-gray-500">No se han encontrado experiencias.<br> Intenta con otra búsqueda o revisa los filtros.</p>
            </div>
        </div>
    </template>
    <div v-else id="list-experiences" class="flex flex-wrap gap-6 w-[789px] 3xl:w-[1216px]">
        
        <BaseCardCreate title="Crear servicio" @click="openEditHoster('ADD')" />

        <template v-for="(experience, index) in experiencesData">
            <!-- experiencesData[index-1]?.experience" -->
            <div
                v-if="(!formFilter.visibility || formFilter.visibility == 'recommendated') && !experience?.is_visible && experiencesData[index-1]?.is_visible && !isloadingForm"
                class="w-[789px] 3xl:w-[1216px] relative"
            >
                <div
                    class="z-50 flex items-center divider"
                    style="margin:0 !important; padding:0 !important; "
                >
                    <div class="flex-grow bg-gray-300 border-t"></div>
                    <p class="mx-6 w-[198px] text-center text-sm font-medium">
                        {{numberExperiencesHidden}}
                        {{numberExperiencesHidden > 1 ? 'experiencias ocultas':'experiencia oculta'}}

                    </p>
                    <div class="flex-grow bg-gray-300 border-t"></div>
                </div>
            </div>
            <div
                class="w-[224px] hbg-white-100 rounded-[10px] shadow-card cursor-pointer relative"
                @dragover="handlerDragOver"
                @drop="handlerDrop(index, experience)"
                :draggable="true"
                @dragstart="handlerDragStart(index, $event)"
                @dragend="handlerDragEnd"
                ref="draggableCard"
                :class="{'shadow-draginng border border-gray-300' : experience.id == selectedCard, 'shadow-draginng': dragStartIndex == index, 'shadow-card': dragStartIndex != index}"
                @mouseover="hoverItem = index"
                @mouseleave="hoverItem = null"
                @click="experience.name_api == 'viator' ? openEditViator(experience) : openEditHoster('EDIT', experience)"
            >
                <div class="w-[224px] rounded-t-[10px] relative">
                    <img
                        class="w-[224px] h-[148px] rounded-t-[10px]"
                        loading="lazy"
                        :src="experienceStore.formatImage(experience?.image)"
                    >
                    <div v-if="hoverItem == index" class="hover-swich hbg-gray-100 rounded-[6px] py-1 px-2 flex justify-center items-center space-x-1 inline-block absolute top-2 right-2 z-40">
                        <span class="text-[10px] font-semibold">{{experience.is_visible ? 'Visible' : 'Oculto'}}</span>
                        <BaseSwichInput
                            v-model="experience.is_visible"
                            :id="`swich-visible-facility-${index}`"
                            @change:value="updateVisible(experience)"
                            @click="handlerClickSwichVisibility"
                        />
                    </div>
                    <div
                        v-if="experience.featured || ((hoverItem == index) && experience.is_visible)"
                        class=" z-10 absolute left-0 bottom-0 rounded-tr-[8px] flex items-center space-x-[4px] p-[8px] z-40"
                        :class="experience.featured ? 'hbg-green-600' : 'hbg-white-100'"
                        @click="updateRecommendation($event, experience)"
                    >
                        <img
                            class=""
                            :src="`/assets/icons/1.TH.REVIEW.${experience.featured ? 'WHITE' : 'OUTLINE'}.svg`"
                            alt="1.TH.WHITE"
                        >
                        <span
                            class="text-[10px] font-semibold"
                            :class="experience.featured ? 'htext-white-100' : 'htext-black-100'"
                        >
                            {{ experience.featured ? 'Recomendado' : 'Recomendar' }}
                        </span>
                    </div>
                </div>
                <div
                    v-if="experience.is_visible == 0"
                    class="hidden-overlay h-full w-full absolute top-0 left-0 cursor-pointer z-10 rounded-[10px]"
                />
                <div class="p-2 truncate-2">
                    <!-- <div class="flex items-center space-x-[4px] h-[33px]">
                        <span class="text-[22px] font-medium htext-black-100">{{ experience.reviews?.combined_average_rating.toFixed(1) }}</span>
                        <div>
                            <div class="flex flec-col">
                                <img 
                                    v-for="star in Math.ceil(experience?.reviews?.combined_average_rating)"
                                    :key="star"
                                    class="w-[12px] h-[12px]" src="/assets/icons/1.TH.REVIEW.svg"
                                >
                            </div>
                            <p class="text-[10px] font-semibold htext-black-100">{{ experience.reviews?.total_reviews }} reseñas</p>
                        </div>
                    </div> -->
                    <h6 class="text-sm htext-black-100 font-medium truncate-2 h-[40px]">{{ experience.title }}</h6>
                    <div class="mt-[12px] flex items-center justify-between">
                        <span class="text-sm htext-black-100 font-semibold truncate-2">
                            <template v-if="experience.name_api == 'viator' || (experience.name_api == 'thehoster' && experience.type_price == 1)">
                                Desde {{ experience.from_price }}€
                            </template>
                            <template v-else-if="experience.type_price == 2">
                                {{ experience.from_price }}€
                            </template>
                            <template v-else="experience.type_price == 3">
                                Servicio gratuito 
                            </template>
                        </span>
                        <img v-if="experience.name_api === 'viator'" src="/assets/icons/TH.VIATOR.svg" alt="VIATOR">
                    </div>

                    <button
                        v-if="hoverItem == index && experience.is_visible"
                        class="buttom-drag p-1 shadow-md rounded-full hbg-white-100 absolute right-2 bottom-2 hover:bg-[#F3F3F3] cursor-grab z-10"
                        :class="{'cursor-grabbing ': dragStartIndex == index}"
                        @mousedown="setDragStart(index)"
                    >
                        <img class="w-6 h-6" src="/assets/icons/TH.GRAD.svg" alt="grad">
                    </button>
                </div>
            </div>
        </template>
        <SkeletonCard v-for="card in numberCardsToLoad" />
    </div>

</template>

<script setup>
import { ref, reactive, onMounted, provide, computed, nextTick, inject } from 'vue';

import BaseSwichInput from "@/components/Forms/BaseSwichInput.vue";
import SkeletonCard from './components/SkeletonCard.vue';
import BaseCardCreate from '@/components/Card/BaseCardCreate.vue';
import { $throttle, $isElementVisible } from '@/utils/helpers';

const emits = defineEmits(['reloadExperiences', 'edit-viator', 'edit-hoster']);

const hotelStore = inject('hotelStore');
const experienceStore = inject('experienceStore');
const hotelData = inject('hotelData');
const experiencesData = inject('experiencesData');
const formFilter = inject('formFilter');
const paginateData = inject('paginateData');
const page = inject('page');
const numberExperiencesVisible = inject('numberExperiencesVisible');
const numberExperiencesHidden = inject('numberExperiencesHidden');
const changePendingInForm = inject('changePendingInForm');
const modalChangePendinginForm = inject('modalChangePendinginForm');

const toast = inject('toast');
const mockupStore = inject('mockupStore');
const firstLoad = inject('firstLoad');
// DATA
const selectedCard = ref(null);
const dragStartIndex = ref(null);
const draggedItem = ref(null);
const hoverItem = ref(null);
const isloadingForm = ref(false);


const defNumberCardsToLoad = ref(20);

// REFS
const draggableCard = ref(null);

onMounted(() => {
    initScrollListener();  
})

const textNumbersExperiencesVisiblesAndHidden = computed(() => {
    let text = null;
    let visiblesText = 'experiencias visibles';
    let hiddensText = 'experiencias ocultos';
    let hidden = 'ocultos';
    //singular
    numberExperiencesVisible.value == 1 ? visiblesText = "experiencia visible": '';
    numberExperiencesHidden.value == 1 ? hiddensText = "experiencia oculto": '';
    numberExperiencesHidden.value == 1 ? hidden = "oculto": '';
    //
    if(!formFilter.visibility){
        text = ` ${numberExperiencesVisible.value} ${visiblesText} y ${numberExperiencesHidden.value} ${hidden}`
    }
    if(formFilter.visibility){
        if(formFilter.visibility.includes('visible')){
            text =` ${numberExperiencesVisible.value} ${visiblesText}`
        }
        if(formFilter.visibility.includes('recommendated')){
            text =` ${numberExperiencesVisible.value} ${visiblesText}`
        }
        if(formFilter.visibility.includes('hidden')){
            text =` ${numberExperiencesHidden.value} ${hiddensText}`
        }

    }
    text = `${text} en ${!formFilter.all_cities ? hotelData.zone : 'España'}`
    return text;
});

const idsToggleExperienciesVisibles = computed(() => {
    const idsExperiences = experiencesData.value.filter(item => item.is_visible).map(item => item.toggle_product_id);
    return idsExperiences;
});

const totalExperiences = computed(() => {
    return numberExperiencesVisible.value + numberExperiencesHidden.value;
});

const numberCardsToLoad = computed(() => {
    if(firstLoad.value) return defNumberCardsToLoad.value;
    if(!firstLoad.value && totalExperiences.value == 0) return 0;
    let remaining = totalExperiences.value - experiencesData.value.length;
    if(remaining < defNumberCardsToLoad.value && totalExperiences.value > 0){
        return remaining;
    } 
    return defNumberCardsToLoad.value;
});

// FUNCTIONS
function initScrollListener() {
    const container = document.querySelector('#main-content');
    container.addEventListener('scroll', $throttle(checkLoadMore, 300), true);
}

function checkLoadMore() {
    const skeletons = document.querySelectorAll('.skeleton-exp-card');
    for (let skeleton of skeletons) {
        if ($isElementVisible(skeleton) && !isloadingForm.value) {
            loadMore();
            break;
        }
    }
    
}

const formatDuration = (duration) => {
    if (!duration) null
    let hours = Math.floor(duration / 60);
    let minutes = duration % 60;
    let m = {
        hours,
        minutes,
    }
    return m;
}

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

const findFirstNonFeaturedPosition = () => {
    return experiencesData.value.findIndex(item => item.featured === false);
}
const findLastFeaturedPosition = () => {
    return experiencesData.value
            .map(item => item.featured)
            .lastIndexOf(true);
}


const handlerDrop = (index, experience) => {
    if (changePendingInForm.value) {
        openModalChangeInForm();
        return;
    }
  const draggedIndex = parseInt(event.dataTransfer.getData('text/plain'));
  if (draggedIndex !== index) {
    const droppedItem = experiencesData.value[draggedIndex];

    // Verifica si el elemento arrastrado tiene featured: false
    if (!droppedItem.featured) {
        // Encuentra la primera posición con featured: false
        const firstNonFeaturedPosition = findFirstNonFeaturedPosition();
        // Si el índice de destino está entre elementos con featured: true
        if (index < firstNonFeaturedPosition) {
            index = firstNonFeaturedPosition;
        }
    } else {
        // Encuentra la última posición con featured: true
        const lastFeaturedPosition = findLastFeaturedPosition();

        // Si el índice de destino está en una posición con featured: false
        if (index > lastFeaturedPosition) {
            index = lastFeaturedPosition;
        }
    }

    // Realiza el movimiento
    experiencesData.value.splice(draggedIndex, 1);
    experiencesData.value.splice(index, 0, droppedItem);
    updatePosition();
  }
  draggedItem.value = null;
  dragStartIndex.value = null;
};

const handlerDropOld = (index, facility) => {
    if (changePendingInForm.value) {
        openModalChangeInForm();
        return;
    }
  const draggedIndex = parseInt(event.dataTransfer.getData('text/plain'));
  if (draggedIndex !== index) {
    const droppedItem = experiencesData.value.splice(draggedIndex, 1)[0];
    experiencesData.value.splice(index, 0, droppedItem);
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

function loadMore () {
    // console.log('test loadMore')
    page.value += 1;
    loadExperiences();
}

async function loadExperiences () {
    isloadingForm.value=true;
    
    const response = await experienceStore.$getAll({page: page.value,...formFilter});
    if (response.ok) {
        let paginate = {
            total: response.data.experiences.paginate.total,
            current_page: response.data.experiences.paginate.current_page,
            per_page: response.data.experiences.paginate.per_page,
            last_page: response.data.experiences.paginate.last_page,
            from_page: response.data.experiences.paginate.from,
            to: response.data.experiences.paginate.to,
        }
        Object.assign(paginateData, paginate);
        page.value = paginateData.current_page;
        experiencesData.value = [...experiencesData.value, ...response.data.experiences.data];
        numberExperiencesVisible.value = response.data.visibleNumbers;
        numberExperiencesHidden.value = response.data.hiddenNumbers;
    }
    firstLoad.value=false;
    isloadingForm.value=false;
}
defineExpose({ loadExperiences });

async function updatePosition () {
    const idsExperiences = idsToggleExperienciesVisibles.value;
    const data = {
        position: idsExperiences,
    };

    const response = await experienceStore.$updatePosition(data);
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
async function updateVisible (experience) {
    isloadingForm.value=true;
    if (changePendingInForm.value) {
        openModalChangeInForm();
        experience.is_visible = !experience.is_visible;
        return;
    }
    const data = {
        visivility: experience.is_visible,
        product_id: experience.id,
    }
    // console.log(data, 'data');
    const response = await experienceStore.$updateVisibility(data);
    const { ok } = response;
    if (ok) {
        toast.warningToast('Cambios guardados con éxito','top-right');
    } else {
        toast.warningToast(data?.message,'top-right');
    }
    emits('reloadExperiences');
    await nextTick();
    mockupStore.$reloadIframe();
}

async function updateRecommendation (event, experience) {
    event.stopPropagation();
    if (changePendingInForm.value) {
        openModalChangeInForm();
        experience.featured = !experience.featured;
        return;
    }
    const data = {
        recommedation: !experience.featured,
        product_id: experience.id,
    }
    const response = await experienceStore.$updateRecommendation(data);
    const { ok } = response;
    if (ok) {
        toast.warningToast('Cambios guardados con éxito','top-right');
    } else {
        toast.warningToast(data?.message,'top-right');
    }
    emits('reloadExperiences');
    await nextTick();
    mockupStore.$reloadIframe();
}

function openEditHoster (action, experience = null) {
    emits('edit-hoster', { action, experience});
}

function openEditViator (experience = null) {
    emits('edit-viator', { action: 'EDIT', experience});
} 

function openModalChangeInForm () {
    modalChangePendinginForm.value = true;
    nextTick(() => {
        modalChangePendinginForm.value = false;
    });
}
  

</script>

<style lang="scss" scoped>
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

    circle {
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