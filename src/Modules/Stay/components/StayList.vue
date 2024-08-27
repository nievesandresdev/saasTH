<template>
    <aside class="w-full h-full flex flex-col bg-white shadow-hoster">
        
        <router-link 
            class="py-[23px] px-4 block group"
            :to="{ name : 'StayHomePage'}"
        >
            <h5 
                class="text-base font-semibold leading-[120%] text-left group-hover:text-[#000]"
            >Estancias {{ numberOfskeletonCards }}  list: {{ list.length }}</h5>
        </router-link>

        <!-- filters -->
        <div class="pl-4 border-b hborder-gray-400">

            <!-- input y button -->
            <div class="flex items-center pr-3">
                <div class="relative w-[240px] flex-shrink-0">
                    <!-- :classInput="`py-2 px-3 h-10 text-sm ${ !search ? 'border-search-stay' : ''}`"  -->
                    <BaseTextField 
                        v-model="search" 
                        searchInList
                        prependInnerIcon="/assets/icons/1.TH.SEARCH.svg"
                        placeholder="Nombre del huésped"
                        @input:typing="searchInList"
                    />
                    <img 
                        class="w-6 h-6 absolute right-3 top-2.5 cursor-pointer" 
                        src="/assets/icons/1.TH.CLOSE.svg"
                        @click="cleanSearch"
                        v-if="search"
                    >
                </div>
                <!-- :container_classes="{'absolute top-[-10px] left-[-6px]':true}" -->
                <div class="relative h-8 ml-1">
                    <span 
                        v-if="filtersActive"
                        class="w-4 h-4 rounded-full hbg-green-600 absolute right-[-4px] top-[-4px] text-xs border border-white text-white text-center leading-[115%]"
                    >{{filtersActiveNumber}}</span>
                    <HoveredIcon 
                        :src="`/assets/icons/${ filtersActive ? '1.TH.Filters.active' : '1.TH.Filters'}.svg`"
                        :height_icon="'24px'"
                        :width_icon="'24px'"
                        :padding_container="'4px'"
                        style="--background-color: #f3f3f3;"
                        @click="openFiltersModal = true"
                    />
                </div>
            </div>

            <!-- counters -->
            <div class="mt-4 pb-2 pr-4">
                <div class="flex items-center">
                    <h2 class="text-xs font-semibold leading-[130%]">{{totalValidCount}} estancia{{ totalCounts==1 ?'':'s' }}</h2>
                    <button 
                        v-if="filtersActive" 
                        class="text-xs font-semibold leading-130% underline ml-auto"
                        @click="resetFilters"
                    >
                        Quitar filtros
                    </button>
                </div>
                <div class="mt-2 flex items-center gap-1">
                    <template v-for="period  in allFilters.periods">
                        <div 
                            class="flex items-center gap-1" 
                            v-if="period !== 'post-stay'"
                        >
                            <h2 v-if="countsByPeriod" class="text-xs font-semibold leading-[130%]">{{ countsByPeriod[period] ?? 0 }}</h2>
                            <span
                                class="px-3 py-1 rounded-full text-[10px] font-semibold leading-[130%] uppercase"
                                :class="bgPeriod[period]"
                            >
                                {{translatePeriod[period]}}
                            </span>
                        </div>
                    </template>
                </div>
            </div>
        </div>

        <div
            id="container-list"
            class="overflow-y-auto custom-scrollbar pb-4"
        >
            <template v-for="stay in list" :key="stay.id">
                <CardtayList :stay="stay" :search="search"/>
            </template>
            <!-- loading skeleton -->
            <template v-if="numberOfskeletonCards > 0 && !staysNull">
                <CardSkeleton v-for="card in numberOfskeletonCards" />
            </template>
            <div v-if="totalCounts == 0 && filtersActive && !search" class="mt-6 px-4">
                <p class="text-center text-sm font-medium leading-[140%]">No se han encontrado estancias que coincidan con tus criterios de búsqueda. Prueba a modificar los filtros.</p>
                <div class="mt-6 text-center">
                    <button class="hbtn-primary py-3 px-2 text-xs font-medium leading-[90%]" @click="openFiltersModal = true">
                        Modificar filtros
                    </button>
                </div>
            </div>

            <div v-if="totalCounts == 0 && search" class="mt-6 px-4">
                <p class="text-center text-sm font-medium leading-[140%]">No se han encontrado estancias que coincidan con tus criterios de búsqueda. Prueba a modificar la búsqueda.</p>
            </div>

            <!-- load icon -->
            <!-- <div class="mt-4" v-if="totalCounts > 0 && list.length < totalCounts">  
                <MiniSpinner />
            </div> -->
            <div class="pt-4 pb-2" v-if="totalCounts > 0 && totalCounts == list.length && list.length > 6">
                <p class="text-xs font-semibold leading-[150%] htext-gray-500 text-center">No hay más estancias</p>
            </div>
        </div>

        <FiltersModal ref="filtersModal" @submit="submit" />
    </aside>
</template>
<script setup>
import { onMounted, ref, provide, computed, onUnmounted, nextTick } from 'vue'
import CardtayList from './CardtayList.vue'
import CardSkeleton from './CardStayListSkeleton.vue'
import FiltersModal from './FiltersModal.vue'
import BaseTextField from '@/components/Forms/BaseTextField.vue';
import HoveredIcon from '@/components/Buttons/HoveredIcon.vue'
import MiniSpinner from './MiniSpinner.vue'

import { getPusherInstance } from '@/utils/pusherSingleton'
import { useStayStore } from '@/stores/modules/stay/stay';
import { useHotelStore } from '@/stores/modules/hotel'
import { useRouter, useRoute } from 'vue-router';
//composable
import { useToastAlert } from '@/composables/useToastAlert'

const toast = useToastAlert();
const router = useRouter();
const route = useRoute();

const hotelStore = useHotelStore()
const stayStore = useStayStore();

const list = ref([])
const data = ref(null)
const search = ref(null)
const countsByPeriod = ref(null)
const totalCounts = ref(0)
const totalValidCount = ref(0)
const countsGeneralByPeriod = ref(0)
const pendingCountsByPeriod = ref(0)
const filtersModal = ref(null);
const allFilters = ref({
    search: null,
    periods: ['pre-stay','in-stay','post-stay'],
    pendings:  'all',
    offset : 0,
    limit: 10,
    page : 0
})
const openFiltersModal = ref(false)
const staysNull = ref(false)
//pusher
// const channelChat = ref(null);
const channelQuery = ref(null);
const channelUpdate = ref(null);
const pusher = ref(null);
const observer = ref(null);
const loading = ref(false);
const isSearch = ref(false);
const currentPositionScroll = ref(0);

onMounted(async () => {
    initScrollListener();
    await loadMore();
    connectPusher();
});

onUnmounted(() => {
    if (observer.value) {
        observer.value.disconnect();
    }
    
    if (channelQuery.value) {
        channelQuery.value.unbind('App\\Events\\NotifySendQueryEvent');
        pusher.value.unsubscribe(channelQuery.value);
    }

    if (channelUpdate.value) {
        channelUpdate.value.unbind('App\\Events\\UpdateStayListEvent');
        pusher.value.unsubscribe(channelUpdate.value);
    }
});

function initScrollListener() {
    const container = document.querySelector('#container-list');
    container.addEventListener('scroll', throttle(checkLoadMore, 300), true);
}

function checkLoadMore() {
    const skeletons = document.querySelectorAll('.skeleton-stay-card');
    for (let skeleton of skeletons) {
        if (isElementVisible(skeleton) && !loading.value && list.value.length < totalCounts.value) {
            loadMore();
            // loadMore(null, 10);
            break; // Carga datos y detiene la iteración
        }
    }
    
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

function isElementVisible(el) {
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}


async function submit(data){
    openFiltersModal.value = false;
    allFilters.value = {
        search: search.value,
        periods: data[0],
        pendings: data[1]
    }
    reloadList();
    toast.warningToast('Filtros aplicados con éxito','top-right');
}

async function searchInList(){
    if(search.value?.length == 0){
        allFilters.value.search = null;
        isSearch.value = false;
        reloadList();
    }
    if(search.value?.length >= 3){
        isSearch.value = false;
        loadSearch(search.value);
    }
}


async function loadSearch(search){
    isSearch.value = true;
    allFilters.value.search = search;
    allFilters.value.offset = 0;
    // allFilters.value.page = 1;
    let data = await loadData();
    list.value = data;
}

async function loadMore(){
    //guardar actual posicion del scroll
    const containerScroll = document.getElementById('container-list');
    currentPositionScroll.value = containerScroll.scrollTop;
    //
    loading.value = true;
    // allFilters.value.page += 1;
    allFilters.value.offset = list.value.length;
    let data = await loadData();
    list.value = [...list.value, ...data];
    setTimeout(() => {
        loading.value = false;
        const skeletons = document.querySelectorAll('.skeleton-stay-card');
        for (let skeleton of skeletons) {
            if (isElementVisible(skeleton) && list.value.length >= 10) {
                scrollToPosition();
                break;
            }
        }
        checkLoadMore();
    }, 700);
}

async function loadData(showLoadPage = false){
    staysNull.value = false;
    data.value = await stayStore.$getAllByHotel(allFilters.value, showLoadPage);
    countsByPeriod.value = data.value.counts_by_period;
    totalCounts.value = data.value.total_count;
    // totalCounts.value = data.value.stays.total;
    totalValidCount.value = data.value.total_valid_count;
    countsGeneralByPeriod.value = data.value.counts_general_by_period;
    pendingCountsByPeriod.value = data.value.pending_counts_by_period;
    // allFilters.value.page = data.value.stays.current_page;
    // return data.value.stays.data;
    if(data.value.stays.length == 0){
        staysNull.value = true;
    } 
    return data.value.stays;
}

async function reloadList(lim = 10){
    allFilters.value.offset = 0;
    allFilters.value.limit = lim;
    list.value = [];
    totalCounts.value = 0;
    loadMore();
}

async function updateList(){
    loading.value = true;
    allFilters.value.offset = 0;
    allFilters.value.limit = list.value.length;
    let data = await loadData();
    list.value = data;
    //restaurar valores
    allFilters.value.offset = list.value.length;
    allFilters.value.limit = 10;
    setTimeout(() => {
        loading.value = false;
        const skeletons = document.querySelectorAll('.skeleton-stay-card');
        for (let skeleton of skeletons) {
            if (isElementVisible(skeleton) && list.value.length >= 10) {
                scrollToPosition();
                break;
            }
        }
        checkLoadMore();
    }, 700);
}

const connectPusher = () =>{
    /*
    //PUSHER
    */
    // channelChat.value = 'private-noti-hotel.' + hotelStore.hotelData.id;
    // Pusher.logToConsole = true;
    pusher.value = getPusherInstance();
    // channelChat.value = pusher.value.subscribe(channelChat.value);
    // channelChat.value.bind('App\\Events\\NotifyStayHotelEvent', (data) => {
    //     let showLoadPage = data.showLoadPage ?? true;
    //     loadData(showLoadPage);
    // });

    channelUpdate.value = 'private-update-stay-list-hotel.' + hotelStore.hotelData.id;
    channelUpdate.value = pusher.value.subscribe(channelUpdate.value);
    channelUpdate.value.bind('App\\Events\\UpdateStayListEvent', (data) => {
        // let showLoadPage = data.showLoadPage ?? true;
        updateList();
    });

    channelQuery.value = 'notify-send-query.' + hotelStore.hotelData.id;
    channelQuery.value = pusher.value.subscribe(channelQuery.value);
    channelQuery.value.bind('App\\Events\\NotifySendQueryEvent', (data) => {
        updateList();
    });
}

function resetFilters(){
    if (filtersModal.value) {
        filtersModal.value.resetFilters();
    }
}

function cleanSearch(){
    isSearch.value = false;
    search.value = null;
    allFilters.value = {
        search: search.value,
        periods: allFilters.value.periods,
        pendings:  allFilters.value.pendings
    }
    // if(route.params.stayId){
    //     router.push({
    //         name: 'StayDetailPage',
    //         params: { id: route.params.stayId }
    //     });
    // }
    reloadList();
}


const filtersActive = computed(() => {
    let filtersAct = allFilters.value.periods.length < 3 || allFilters.value.pendings == 'pending';
    return filtersAct;
});

const filtersActiveNumber = computed(() => {
    let acc = 0;
    allFilters.value.pendings == 'pending' ? acc++ : '';
    let filtersSus = 3 - allFilters.value.periods.length;
    acc += filtersSus;
    return acc;
});

const numberOfskeletonCards = computed(() => {
    if(isSearch.value) return 0;
    if(totalCounts.value > 0){//si ya hay estancias cargadas
        let remainingCards = totalCounts.value - list.value.length;//obtener estancias que faltan por cargar
        //si el restante es mayor al limite entonces solo mostrara el limite de estancias a cargar
        remainingCards >= allFilters.value.limit ? remainingCards = allFilters.value.limit : '';
        //sino entonces mostrara mostrara la cantidad de cards que faltan por cargar
        return remainingCards;
    }
    return allFilters.value.limit;
});

const translatePeriod = {
    "pre-stay": "PRE-STAY",
    "in-stay": "STAY",
    "post-stay": "POST-STAY",
    "invalid-stay": "POST-STAY",
};
const bgPeriod = {
    'pre-stay':'bg-[#D9E8F2]',
    'in-stay':'bg-[#D9F2E9]',
    'post-stay':'bg-[#F2F2F2]',
} 

provide('openFiltersModal',openFiltersModal)
provide('bgPeriod',bgPeriod)
provide('countsGeneralByPeriod',countsGeneralByPeriod)
provide('pendingCountsByPeriod',pendingCountsByPeriod)

</script>
<style>
.border-search-stay{
    border: 1px solid #bfbfbf !important;
}
.border-search-stay:hover {
    border: 1px solid #34A98F;
}
</style>