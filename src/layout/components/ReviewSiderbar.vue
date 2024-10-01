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
            <p class="text-xs font-semibold">{{ dataPagination.total }} {{ dataPagination.total === 1 ? 'Reseña' : 'Reseñas' }}</p>
            
            <button
                v-if="!emptyFilters"
                class="underline text-xs font-semibold"
                @click="resetFilter()"
            >
                Quitar filtros
            </button>
        </div>
        {{ numberOfskeletonCards }}
        {{ reviews.length }}
        {{ reviewsEmptyLoaded }}
    </div>
    <div
        id="container-list"
        ref="containerListRef"
        class="list-reviews flex-1 border-t hborder-top-gray-400 overflow-auto"
    >
        <template v-if="!(loadingList && currentPage === 1)">
            <template v-if="otasWithUrls.length > 0">
                <template v-if="paginatedItems.length > 0">
                    <div
                        v-for="(review, index) in reviews"
                        :key="index"
                        class="px-4 py-[12px] h-[72px] border-b hborder-bottom-gray-400 relative cursor-pointer"
                        :class="{'selected-hover': idOtaParamRoute === review.dataFull.id, 'hover:bg-[#F1F1F1]': idOtaParamRoute != review.dataFull.id}"
                        @click="goReviewDetail(review)"
                    >
                        <div v-if="!review.detail.isAttended" class="w-[4px] h-[68px] hbg-yellow-cta  absolute right-[4px] top-[2px]" />
                        <div class="flex justify-between items-center mb-[4px]">
                            <div class="flex items-center truncate-1">
                                <img class="w-6 h-6" :src="`/assets/icons/otas/${$titleCase(review.detail.otaOrigin)}.svg`" alt="Booking">
                                <h6 class="text-xs font-semibold truncate-1">{{ review.dataFull?.name }}</h6>
                            </div>
                            <span class="text-xs font-semibold">{{ $formatTimestampDate(review.dataFull?.publishedAtDate, 'dd/MM/yy') }}</span>
                        </div>
                        <div class="flex items-center justify-between">
                            <div class="space-x-2 flex">
                                <img class="w-4 h-4" src="/assets/icons/1.TH.REVIEW.svg" alt="1.TH.REVIEW">
                                <p class="text-[10px] font-semibold w-[30px]"><span class="text-sm" :class="review.increasesAverageRating ? 'text-[#16a34a]' : 'text-[#FF6666]'">{{ Number(review.detail.rating) }}</span>/{{ reviewStore.scaleRating[review.detail.otaOrigin] }}</p>
                            </div>
                            <img class="w-[20px] h-[20px]" :src="`/assets/icons/1.TH.${getNameIconAnswer(review)}.svg`" alt="1.TH.ANSWER.REVIEW">
                        </div>
                    </div>
                    <!-- loading skeleton -->
                    <template v-if="numberOfskeletonCards > 0 && !reviewsEmptyLoaded">
                        <CardSkeleton v-for="item in numberOfskeletonCards" />
                    </template>
                    <div v-else-if="dataPagination.total == paginatedItems.length" class="h-[72px] w-full flex justify-center items-center text-center">
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
})
const dataPagination = reactive({...dataPaginationDefault.value})

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

const currentPage = ref(0);
const paginatedItems = ref([]);
const loadingPagination = ref(false);
const loadingList = ref(false);
const currentPositionScroll = ref(null);
const reviewsEmptyLoaded = ref(false);
const debounce = ref(null);

// COMPUTED
const numberOfskeletonCards = computed(() => {
    if (loadingList.value && paginatedItems.value?.length <= 0) return LIMIT_ITEMS;
    if(paginatedItems.value.length > 0){//si ya hay reviews cargadas
        let remainingCards = dataPagination.total - paginatedItems.value.length;//obtener reviews que faltan por cargar
        //si el restante es mayor al limite entonces solo mostrara el limite de reviews a cargar
        remainingCards >= LIMIT_ITEMS ? remainingCards = LIMIT_ITEMS : 0;
        if (remainingCards < 0) return 0;
        //sino entonces mostrara mostrara la cantidad de cards que faltan por cargar
        return remainingCards;
    }
    return LIMIT_ITEMS;
});

const itemsPerPage = computed(() => {
    const containerElement = containerListRef.value;
    const { clientHeight } = containerElement;
    let totalPage = Math.ceil(clientHeight / 72);
    // console.log(totalPage);
    return totalPage;
});
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
    let r = paginatedItems.value.map(review => {
        return {
            ...review,
            increasesAverageRating: verifyIncreasesAverageRating(review),
        }
    });
    return r;
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

// FUNCTIONS

function initScrollListener() {
    const container = document.querySelector('#container-list');
    container.addEventListener('scroll', throttle(checkLoadMore, 300), true);
}
async function checkLoadMore() {
    const skeletons = document.querySelectorAll('.skeleton-review-card');
    for (let skeleton of skeletons) {
        if (isElementVisible(skeleton) && !loadingList.value && paginatedItems.value.length < dataPagination.total) {
            await nextTick();
            getByOtas();
        }
    }
    
}


function isElementVisible(el) {
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    return (
        rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom > 0 // Al menos parte del elemento está dentro del viewport
    );
}

function throttle(func, limit) {
    let lastFunc;
    let lastRan;
    return function() {
        const context = this;
        const args = arguments;
        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function() {
                if ((Date.now() - lastRan) >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    }
}

function scrollToPosition() {
    const container = document.getElementById('container-list');
    if (container) {
        container.scrollTop = currentPositionScroll.value
    }
}

function paginate () {
    // const start = (currentPage.value - 1) * itemsPerPage.value;
    // const end = start + itemsPerPage.value;
    reviewsData.value.forEach(item => {
        if (!paginatedItems.value.includes(item)) {
        // if (!paginatedItems.value.find(itemfind => itemfind._id ==  item._id)) {
            paginatedItems.value.push(item);
        }
    });
    // console.log(paginatedItems.value.length, 'paginatedItems');
}

async function nextPage() {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
        await getByOtas();
        await paginate();
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
    clearTimeout(debounce.value);
    debounce.value = setTimeout(() => {
        reviewsData.value = [];
        paginatedItems.value = [];
        currentPage.value = 0;
        reviewsEmptyLoaded.value = false;
        Object.assign(dataPagination, dataPaginationDefault);
        getByOtas();
    }, 500);
}

async function getByOtas (loadOtas = false) {

    const containerScroll = document.getElementById('container-list');
    currentPositionScroll.value = containerScroll.scrollTop;

    loadingList.value = true;
    reviewsEmptyLoaded.value = false;
    let params = formFilter;
    currentPage.value++;
    // console.log(currentPage.value);
    Object.assign(params, { page: currentPage.value, limit: LIMIT_ITEMS });
    // console.log(params, 'params');
    const response = await reviewStore.$getByOtas(params);
    const { ok, data } = response;
    if (ok) {
        // paginatedItems.value = [];
        reviewsData.value = data.reviews;
        // console.log(reviewsData.value.length, 'reviewsData.value');

        // console.log(reviewsData.value, reviewsData.value.length, 'reviewsData.value')
        paginate();
        loadingList.value = false;
        Object.assign(dataPagination, data.dataPagination);
        
        if (reviewsData.value.length == 0 && paginatedItems.value.length == dataPagination.total)  {
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


        // setTimeout(() => {
        //     // await nextTick();
        //     const skeletons = document.querySelectorAll('.skeleton-review-card');
        //         console.log(skeletons.length)
        //     for (let skeleton of skeletons) {
        //         console.log(isElementVisible(skeleton));
        //         if (isElementVisible(skeleton) && paginatedItems.value.length >= 10) {
        //             console.log('entro');
        //             scrollToPosition();
        //             break;
        //         }
        //     }
        //     checkLoadMore();
        // }, 700);

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
</style>