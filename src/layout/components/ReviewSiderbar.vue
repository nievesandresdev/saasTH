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
        <div class="px-4 flex justify-between items-center mt-4">
            <p class="text-xs font-semibold">{{ dataPagination.total }} {{ dataPagination.total === 1 ? 'Reseña' : 'Reseñas' }}</p>
            
            <button
                v-if="!emptyFilters"
                class="underline text-xs font-semibold"
                @click="resetFilter()"
            >
                Quitar filtros
            </button>
        </div>
        <!-- {{summaryAveragReview}} -->
        <div class="flex space-x-1 py-[8px] px-4">
            <div class="space-x-1 flex items-center">
                <span class="text-[12px] font-semibold leading-none">{{ summaryAveragReview.increment }}</span>
                <div class="rounded-full px-[8px] py-[1.5px] space-x-[2px] bg-[#D9F2E9] flex">
                    <span class="text-[10px] font-semibold">Nota media</span>
                    <img class="size-[12px]" src="/assets/icons/1.TH.ARROW.UP.svg" alt="1.TH.ARROW.UP">
                </div>
            </div>
            <div class="space-x-1 flex items-center">
                <span class="text-[12px] font-semibold leading-none">{{ summaryAveragReview.decrement }}</span>
                <div class="rounded-full px-[8px] py-[1.5px] space-x-[2px] bg-[#FEE2E2] flex">
                    <span class="text-[10px] font-semibold">Nota media</span>
                    <img class="size-[12px]" src="/assets/icons/1.TH.ARROW.DOWN.svg" alt="1.TH.ARROW.DOWN">
                </div>
            </div>
        </div>
    </div>
    
    <div
        id="container-list"
        ref="containerListRef"
        class="list-reviews flex-1 border-t hborder-top-gray-400 overflow-auto"
    >

        <div
            v-for="(review, index) in reviews"
            :id="review.dataFull.id"
            :ref="el => (reviewsListRefs[review.dataFull.id] = el)"
            :key="index"
            class="px-4 py-[12px] h-[72px] border-b hborder-bottom-gray-400 relative cursor-pointer"
            :class="{'selected-hover': idOtaParamRoute === review.dataFull.id, 'hover:bg-[#F1F1F1]': idOtaParamRoute != review.dataFull.id}"
            @click="goReviewDetail(review)"
        >
            <div v-if="!review.detail.isAttended" class="w-[4px] h-[68px] hbg-yellow-cta  absolute right-[4px] top-[2px]" />
            <div class="flex justify-between items-center mb-[4px]">
                <div class="flex items-center truncate-1">
                    <img class="w-6 h-6" :src="`/assets/icons/otas/${$titleCase(review.detail.otaOrigin)}.svg`" :alt="review.detail.otaOrigin">
                    <h6 class="text-xs font-semibold truncate-1">{{ review.dataFull?.name }}</h6>
                </div>
                <span class="text-xs font-semibold">{{ $formatTimestampDate(review.dataFull?.publishedAtDate, 'dd/MM/yy') }}</span>
            </div>
            <div class="flex items-center justify-between">
                <div class="space-x-2 flex">
                    <img class="w-4 h-4" src="/assets/icons/1.TH.REVIEW.svg" alt="1.TH.REVIEW">
                    <p class="text-[10px] font-semibold w-[30px]"><span class="text-sm" :class="review.increasesAverageRating ? 'text-[#16a34a]' : 'text-[#FF6666]'">{{ Number(review.detail.rating) }}</span>/{{ reviewStore.scaleRating[review.detail.otaOrigin] }}</p>
                </div>
                <img :class="review.detail.isAttended ? 'size-[20px]' : 'size-[24px]'" :src="`/assets/icons/1.TH.${getNameIconAnswer(review)}.svg`" alt="1.TH.ANSWER.REVIEW">
            </div>
        </div>
        <!-- loading skeleton -->
        <CardSkeleton v-for="(card, index) in ((numberCardsToLoad == 1 ? 2 : numberCardsToLoad) ?? 0)" />

        <template v-if="!(loadingList && currentPage === 1)">
            <template v-if="otasWithUrls.length > 0">
                <template v-if="reviews.length > 0">

                    <!-- /////// -->

                    <div v-if="dataPagination.total == reviews.length" class="h-[72px] w-full flex justify-center items-center text-center">
                        <p class="htext-gray-500 text-sm font-medium">No hay más reseñas</p>
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
            <CardSkeleton v-for="item in numberOfskeletonCards" />
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

import { $capitalize, $titleCase } from '@/utils/textWritingTypes';

import { $throttle, $isElementVisible } from '@/utils/helpers';

import { useRouter } from 'vue-router';
const route = useRouter();

// COMPOSABLES
import { useEventBus } from '@/composables/eventBus';
const { onEvent } = useEventBus();    

// COMPONENTS
import BaseTextField from '@/components/Forms/BaseTextField';
import ReviewSiderbarModalFilter from './ReviewSiderbarModalFilter';
import BaseLoadingScroll from '@/components/BaseLoadingScroll';
import CardSkeleton from '@/Modules/Review/components/CardSkeleton';

import { useReviewStore } from '@/stores/modules/review';
const reviewStore = useReviewStore();

const baseFilters = {
    search: null,
    otas: [],
    statusResponse: null,
    scoreRange: null,
    language: null,
};
const LIMIT_ITEMS = 10;
const dataPaginationDefault = reactive({
    page: 0,
    total: 0,
    limit: 0,
    skip: 0,
    from: 0,
    to: 0,
    totalPages: 0
});
const dataPagination = reactive({...dataPaginationDefault.value});


// DATA
const searchFilter = ref(null);
const formFilter = reactive({...baseFilters});
const filtersSelected = reactive({...baseFilters});
const filtersDefault = reactive({...baseFilters});
const reviewsData = ref([]);
const isOpenModelFilter = ref(false);
const otasWithUrls = ref([]);
const summaryReviewOtas = ref([]);

const currentPage = ref(0);
const loadingPagination = ref(false);
const loadingList = ref(false);
const currentPositionScroll = ref(null);
const reviewsEmptyLoaded = ref(false);
const debounce = ref(null);

const summaryAveragReview = reactive({
    decrement: 0,
    increment: 0,
});

const reviewsListRefs = reactive({});
const containerListRef = ref(null);

 const numberCardsToLoadDefault = ref(20);
 const firstLoad = ref(true);
 const limitItemsPerPage = ref(LIMIT_ITEMS);

// COMPUTED

const otaParamRoute = computed(() => {
    	return route?.currentRoute?.value?.params?.ota?.toUpperCase();
});
const idOtaParamRoute = computed(() => {
    	return route?.currentRoute?.value?.params?.id;
});

// const totalPages = computed(() => Math.ceil(reviewsData.value.length / itemsPerPage.value));
const totalPages = computed(() => dataPagination.total);

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
    let r = reviewsData.value.map(review => {
        return {
            ...review,
            increasesAverageRating: verifyIncreasesAverageRating(review),
        }
    });
    return r;
});

const numberCardsToLoad = computed(() => {
    if(firstLoad.value) return numberCardsToLoadDefault.value;
    if(!firstLoad.value && dataPagination.total == 0) return 0;
    let remaining = dataPagination.total - reviews.value.length;
    remaining = remaining < 0 ? 0 : remaining;
    if(remaining < numberCardsToLoadDefault.value && dataPagination.total > 0){
        return remaining ;
    }
    return numberCardsToLoadDefault.value;
});

// WATCH

onMounted(async () => {
    initScrollListener(); 
    await getByOtas(true);
});

provide('formFilter', formFilter);
provide('filtersSelected', filtersSelected);
provide('filtersDefault', filtersDefault);
provide('emptyFilters', emptyFilters);
provide('isOpenModelFilter', isOpenModelFilter);
provide('reviewStore', reviewStore);

onEvent('get-reviews', reloadReviewsAndUpdatedScroll);

// FUNCTIONS

async function reloadReviewsAndUpdatedScroll (payload) {
    let { reviewId } = payload;
    limitItemsPerPage.value = 20000;
    await reloadReviews();
    nextTick(() => {
        focusCard(reviewId);
    });
}

const focusCard = (id) => {
    const card = reviewsListRefs[id]; // Obtener la referencia del card
    if (card && containerListRef.value) {
        // Hacer scroll al card
        card.scrollIntoView({
        behavior: 'smooth', // Movimiento suave
        block: 'center',    // Alinear al centro del contenedor
        });
    }
};

function initScrollListener() {
    const container = document?.querySelector('#container-list');
    if (container) {
        container.addEventListener('scroll', $throttle(checkLoadMore, 300), true);
    }
}

function checkLoadMore () {
    const skeletons = document.querySelectorAll('.skeleton-review-card');
    for (let skeleton of skeletons) {
        if ($isElementVisible(skeleton) && !loadingList.value) {
            getByOtas();
            break;
        }
    }   
}


function verifyIncreasesAverageRating (review) {
    let { otaOrigin } = review.detail;
    let ratingAverageOta = summaryReviewOtas.value.find(item => item.ota === otaOrigin);
    return review.detail.rating >= ratingAverageOta.summaryReviewOta.reviewsRating;
} 
function getNameIconAnswer (review) {
    let { isAttended, isAnswered } = review.detail;
    if (!isAttended && isAnswered) {
        return 'REVIEW.ANSWERED.NOTIFICATION';
    }
    if (!isAttended && !isAnswered) {
        return 'REVIEW.NOT.ANSWERED.NOTIFICATION';
    }
    if (isAttended && isAnswered) {
        return 'REVIEW.ANSWERED';
    }
    if (isAttended && !isAnswered) {
        return 'REVIEW.NOT.ANSWERED';
    }
}

function handleSearchFilter (val) {

    clearTimeout(debounce.value);
    debounce.value = setTimeout(() => {

            formFilter.search = val;
            reloadReviews();

    }, 500);
}

function resetFilter () {
    Object.assign(formFilter, filtersDefault);
    Object.assign(filtersSelected, filtersDefault);
    searchFilter.value = null;
    reloadReviews();
}
async function reloadReviews () {
    // clearTimeout(debounce.value);
    // debounce.value = setTimeout(() => {
        firstLoad.value = true;
        reviewsData.value = [];
        currentPage.value = 0;
        reviewsEmptyLoaded.value = false;
        Object.assign(dataPagination, dataPaginationDefault);
        await getByOtas();
    // }, 500);
}

async function getByOtas (loadOtas = false) {

    loadingList.value = true;
    reviewsEmptyLoaded.value = false;
    let params = formFilter;
    currentPage.value++;
    // console.log(currentPage.value);
    Object.assign(params, { page: currentPage.value, limit: limitItemsPerPage.value });
    limitItemsPerPage.value = LIMIT_ITEMS;
    // console.log(params, 'params');
    const response = await reviewStore.$getByOtas(params);
    const { ok, data } = response;
    if (ok) {
        reviewsData.value = [...reviewsData.value, ...data.reviews];
        summaryAveragReview.decrement = data.otherData.decrementAverageRating;
        summaryAveragReview.increment = data.otherData.incrementAverageRating;

        loadingList.value = false;
        Object.assign(dataPagination, data.dataPagination);
        
        if (data.reviews.length == 0 && reviewsData.value.length == dataPagination.total)  {
            reviewsEmptyLoaded.value = true;
        }

        if ((reviewStore.otasWithUrls?.length <= 0 && reviewStore.otasWithUrls?.length != data.otasWithUrls.length) || loadOtas) {
            otasWithUrls.value = data.otasWithUrls;
            reviewStore.setOtasWithUrls(data?.otasWithUrls || []);
            formFilter.otas = data.otasWithUrls;
            filtersSelected.otas = data.otasWithUrls;
            filtersDefault.otas = data.otasWithUrls;
        }
        summaryReviewOtas.value = data.summaryReviewOtas;

    } else {

    }
    firstLoad.value = false;
    loadingList.value = false; 
}

function goReviewDetail (review) {
    let routeData = {name: 'ReviewDetail', params: { ota: review.detail.otaOrigin.toLowerCase(), id: review.dataFull.id }};
    if (formFilter.search) {
        Object.assign(routeData, { query: { search: formFilter.search } });
    }
    route.push(routeData);
}

</script>

<style lang="scss">
    .selected-hover{
        background: #ECF9F5;
    }
</style>6