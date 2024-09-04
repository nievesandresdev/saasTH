<template>
  <nav class="h-full w-full bg-white shadow-menu flex flex-col shadow-md">
    <div>
        <div class="py-[22px] px-[16px] flex justify-between items-center">
            <router-link :to="{ name: 'Reviews' }">
                <h4 class="text-base font-semibold">Reseñas</h4>
            </router-link>
            <p class="text-xs font-semibold">Últimos 30 días</p>
        </div>
        <div class="px-4 flex items-center space-x-2">
            <BaseTextField
                v-model="searchFilter"
                prepend-inner-icon="/assets/icons/1.TH.SEARCH.svg"
                placeholder="Escribe algo"
                class-content="w-[240px]"
                :append-inner-icon="{icon: '/assets/icons/1.TH.CLOSE.svg', type: 'BUTTON', show: formFilter.search?.length >= 3 }"
                @enter:search="handleSearchFilter"
                @input:typing="handleSearchFilter"
                @click:appendInner="resetFilter()"
            ></BaseTextField>
            <button
                class="relative rounded-full hover:bg-[#F1F1F1] p-[4px]"
                @click="isOpenModelFilter = true"
            >
                <div
                    v-if="!emptyFilters"
                    class="w-4 bg-white flex items-center justify-center p-[1px] absolute top-[-8px] right-[-6px] rounded-full w-[16px] h-[16px] z-10"
                >
                    <div class="bg-green-600 w-full h-full rounded-full flex items-center justify-center">
                        <span class="text-xs font-normal text-white">{{ numbersFiltersApplied.length }}</span>
                    </div>
                </div>
                <img
                    :src="`/assets/icons/1.TH.${emptyFilters ? 'Filters' : 'Filters.active'}.svg`"
                    alt="1.TH.Filters"
                    class="w-6 h-6"
                >
            </button>
        </div>
        <div class="px-4 flex justify-between items-center mt-4 mb-2">
            <p class="text-xs font-semibold">{{ reviewsData.length }} {{ reviewsData.length === 1 ? 'Reseña' : 'Reseñas' }}</p>
            <button
                v-if="!emptyFilters"
                class="underline text-xs font-semibold"
                @click="resetFilter()"
            >
                Quitar filtros
            </button>
        </div>
    </div>
    <div
        ref="containerListRef"
        class="list-reviews flex-1 border-t hborder-top-gray-400 overflow-auto"
         @scroll="onScroll"
    >
        <template v-if="!loadingList">
            <template v-if="otasWithUrls.length > 0">
                <template v-if="reviewsData.length > 0">
                    <div
                        v-for="(review, index) in reviews"
                        :key="index"
                        class="px-4 py-[12px] h-[72px] border-b hborder-bottom-gray-400 relative cursor-pointer"
                        :class="{'selected-hover': idOtaParamRoute === review.dataFull.id, 'hover:bg-[#F1F1F1]': idOtaParamRoute != review.dataFull.id}"
                        @click="$router.push({name: 'ReviewDetail', params: { ota: review.detail.otaOrigin.toLowerCase(), id: review.dataFull.id }})"
                    >
                        <div v-if="!review.detail.isAttended" class="w-[4px] h-[68px] hbg-yellow-cta  absolute right-[4px] top-[2px]" />
                        <div class="flex justify-between items-center mb-[4px]">
                            <div class="flex items-center truncate-1">
                                <img class="w-6 h-6" :src="`/assets/icons/otas/${$capitalize(review.detail.otaOrigin)}.svg`" alt="Booking">
                                <h6 class="text-xs font-semibold truncate-1">{{ review.dataFull?.name }}</h6>
                            </div>
                            <span class="text-xs font-semibold">{{ $formatTimestampDate(review.dataFull?.publishedAtDate, 'dd/MM/yy') }}</span>
                        </div>
                        <div class="flex items-center justify-between">
                            <div class="space-x-2 flex">
                                <img class="w-4 h-4" src="/assets/icons/1.TH.REVIEW.svg" alt="1.TH.REVIEW">
                                <p class="text-[10px] font-semibold w-[30px]"><span class="text-sm">{{ Number(review.detail.rating) }}</span>/{{ reviewStore.scaleRating[review.detail.otaOrigin] }}</p>
                                <div
                                    class="rounded-full h-[20px] px-[8px] text-[10px] font-semibold w-[91px] text-white flex justify-between items-center"
                                    :class="review.increasesAverageRating ? 'bg-green-600' : 'bg-[#FF6666]'"
                                >
                                    Nota media
                                    <img class="w-[12px] h-[12px]" :src="`/assets/icons/1.TH.ARROW.${review.increasesAverageRating ? 'TOP' : 'BOTTOM'}.svg`" alt="1.TH.ARROW.TOP">
                                </div>
                            </div>
                            <img class="w-[20px] h-[20px]" :src="`/assets/icons/1.TH.${getNameIconAnswer(review)}.svg`" alt="1.TH.ANSWER.REVIEW">
                        </div>
                    </div>
                    <div class="h-[72px] w-full flex justify-center items-center text-center">
                        <template v-if="loadingPagination">
                        <BaseLoadingScroll />
                        </template>
                        <template v-else>
                            <p class="htext-gray-500 text-sm font-medium">No hay más reseñas</p>
                        </template>
                    </div>
                </template>
                <p v-else-if="!emptyFilters || !!formFilter.search?.length" class="text-sm font-medium text-center mt-6 px-4">No se han encontrado reseñas que coincidan con tus criterios de búsqueda. Prueba a modificar la búsqueda.</p>
                <p v-else class="text-sm font-medium text-center mt-6 px-4">Aún no tienes reseñas en las distintas plataformas externas..</p>
            </template>
            <div v-else class="text-center px-4">
                <p class="text-sm font-medium text-center mt-6">Aún no has añadido los enlaces de tu alojamiento en las distintas plataformas externas. Añádelos ahora y empieza a operar todas las reseñas de tu alojamiento.</p>
                <button
                    class="hbtn-primary py-[12px] px-2 mt-6 text-xs font-medium"
                    @click="$router.push({name: 'ExternalPlatforms'})"
                >
                    Añadir enlaces
                </button>
            </div>
        </template>
        <template v-else>
            <div class="h-[72px] w-full flex justify-center items-center text-center">
                <BaseLoadingScroll />
            </div>
        </template>
    </div>
  </nav>
  <ReviewSiderbarModalFilter
        ref="reviewSiderbarModalFilter"
        :numbers-filters-applied="numbersFiltersApplied.length"
        @reloadReviews="reloadReviews()"
  />
</template>

<script setup>

import { ref, reactive, onMounted, provide, computed, nextTick, inject, watch } from 'vue';

import { $capitalize } from '@/utils/textWritingTypes';

import { useRouter } from 'vue-router';
const route = useRouter();

// COMPOSABLES
import { useEventBus } from '@/composables/eventBus';
const { onEvent } = useEventBus();    

// COMPONENTS
import BaseTextField from '@/components/Forms/BaseTextField';
import ReviewSiderbarModalFilter from './ReviewSiderbarModalFilter';
import BaseLoadingScroll from '@/components/BaseLoadingScroll';

import { useReviewStore } from '@/stores/modules/review';
const reviewStore = useReviewStore();

const baseFilters = {
    search: null,
    otas: [],
    statusResponse: null,
    scoreRange: null,
    language: null,
};

// DATA
const searchFilter = ref(null);
const formFilter = reactive({...baseFilters});
const filtersSelected = reactive({...baseFilters});
const filtersDefault = reactive({...baseFilters});
const reviewsData = ref([]);
const isOpenModelFilter = ref(false);
const otasWithUrls = ref([]);
const summaryReviewOtas = ref([]);
const containerListRef = ref(null);

const itemsPerPage = 12;
const currentPage = ref(1);
const paginatedItems = ref([]);
const loadingPagination = ref(false);
const loadingList = ref(false);

// COMPUTED
const otaParamRoute = computed(() => {
    	return route?.params?.ota?.toUpperCase();
});
const idOtaParamRoute = computed(() => {
    	return route?.params?.id;
});

const totalPages = computed(() => Math.ceil(reviewsData.value.length / itemsPerPage));

const numbersFiltersApplied = computed(() => {
    let filters = [];
    filtersSelected.search ? filters.push('search') : '';
    filtersSelected.otas.length != reviewStore.numbersOtasWithUrls ? filters.push('otas') : '';
    filtersSelected.statusResponse ? filters.push('statusResponse') : '';
    filtersSelected.scoreRange ? filters.push('scoreRange') : '';
    filtersSelected.language ? filters.push('language') : '';
    return filters;
});
const emptyFilters = computed(() => {
    return numbersFiltersApplied.value.length == 0;
});
const reviews = computed(() => {
    let reviews = paginatedItems.value.map(review => {
        return {
            ...review,
            increasesAverageRating: verifyIncreasesAverageRating(review),
        }
    });
    return reviews;
});

// WATCH

onMounted(async () => {
    await getByOtas();
});

provide('formFilter', formFilter);
provide('filtersSelected', filtersSelected);
provide('filtersDefault', filtersDefault);
provide('emptyFilters', emptyFilters);
provide('isOpenModelFilter', isOpenModelFilter);
provide('reviewStore', reviewStore);

// FUNCTIONS

function paginate () {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    let items = reviewsData.value.slice(start, end);
    items.forEach(item => {
        paginatedItems.value.push(item);
    });
}

async function nextPage() {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
  }
    await paginate();
}


function verifyIncreasesAverageRating (review) {
    let { otaOrigin } = review.detail;
    let ratingAverageOta = summaryReviewOtas.value.find(item => item.ota === otaOrigin);
    return review.detail.rating > ratingAverageOta.summaryReviewOta.reviewsRating;
} 
function getNameIconAnswer (review) {
    let { isAttended, isAnswered } = review.detail;
    if (!isAttended && isAnswered) {
        return 'ANSWER.REVIEW.NOTIFICATION';
    }
    if (!isAttended && !isAnswered) {
        return 'NOTANSWER.REVIEW.NOTIFICATION';
    }
    if (isAttended && isAnswered) {
        return 'ANSWER.REVIEW';
    }
    if (isAttended && !isAnswered) {
        return 'NOTANSWER.REVIEW';
    }
}

function handleSearchFilter (val) {
    val = val ?? searchFilter;
    if(val?.length == 0){
        formFilter.search = null;
        reloadReviews();
    }
    if(val?.length >= 3){
        formFilter.search = val;
        reloadReviews();
    }
}

function resetFilter () {
    Object.assign(formFilter, filtersDefault);
    Object.assign(filtersSelected, filtersDefault);
    searchFilter.value = null;
    reloadReviews();
}
function reloadReviews () {
    reviewsData.value = [];
    paginatedItems.value = [];
    currentPage.value = 1;
    getByOtas();
}

async function getByOtas () {
    loadingList.value = true; 
    let params = formFilter;
    const response = await reviewStore.$getByOtas(params);
    const { ok, data } = response;
    if (ok) {
        reviewsData.value = data.reviews;
        paginate(); 
        if (reviewStore.otasWithUrls?.length <= 0 && reviewStore.otasWithUrls?.length != data.otasWithUrls.length) {
            otasWithUrls.value = data.otasWithUrls;
            reviewStore.setOtasWithUrls(data?.otasWithUrls || []);
            formFilter.otas = data.otasWithUrls;
            filtersSelected.otas = data.otasWithUrls;
            filtersDefault.otas = data.otasWithUrls;
        }
        summaryReviewOtas.value = data.summaryReviewOtas;
    } else {

    }
    loadingList.value = false; 
}
onEvent('get-reviews', reloadReviews);

function onScroll () {
    if (currentPage.value < totalPages.value) {
        const containerElement = containerListRef.value;
        const { scrollTop, scrollHeight, clientHeight } = containerElement;

        if (scrollTop + clientHeight >= scrollHeight - 50 ) {
                loadingPagination.value = true;
        }
        setTimeout(async () => {
            const containerElement = containerListRef.value;
            const { scrollTop, scrollHeight, clientHeight } = containerElement;

            if (scrollTop + clientHeight >= scrollHeight - 50 ) {
                    await nextPage();
                    loadingPagination.value = false;
            }
        }, 2000);
    }
}
</script>

<style lang="scss">
    .selected-hover{
        background: #ECF9F5;
    }
</style>