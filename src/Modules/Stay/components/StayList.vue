<template>
    <aside class="w-full h-full flex flex-col bg-white shadow-hoster">
        
        <router-link 
            class="py-[23px] px-4 block group"
            :to="{ name : 'StayHomePage'}"
        >
            <h5 
                class="text-base font-semibold leading-[120%] text-left group-hover:text-[#000]"
            >Estancias</h5>
        </router-link>

        <!-- filters -->
        <div class="px-4  border-b hborder-gray-400">

            <!-- input y button -->
            <div class="flex items-center gap-1">
                <div class="relative">
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
                <div class="relative h-8">
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
            <div class="mt-4 pb-2">
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
            <div class="mt-4" v-if="totalCounts > 0 && list.length < totalCounts">  
                <MiniSpinner />
            </div>
            <div class="pt-4 pb-2" v-if="totalCounts > 0 && totalCounts == list.length && list.length > 6">
                <p class="text-xs font-semibold leading-[150%] htext-gray-500 text-center">No hay más estancias</p>
            </div>
            <div ref="loaderRef" class="loader-element"></div>
        </div>

        <FiltersModal ref="filtersModal" @submit="submit" />
    </aside>
</template>
<script setup>
import { onMounted, ref, provide, computed, onUnmounted, nextTick } from 'vue'
import CardtayList from './CardtayList.vue'
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
})
const openFiltersModal = ref(false)
//pusher
// const channelChat = ref(null);
const channelQuery = ref(null);
const channelUpdate = ref(null);
const pusher = ref(null);
const observer = ref(null);
const loaderRef = ref(null);
const loading = ref(false);

onMounted(async () => {
    await loadData();
    connectPusher();

    nextTick(() => {
        observer.value = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                if(totalCounts.value > 0 && list.value.length < totalCounts.value && !loading.value){
                    loadData(false, false);
                }
            }
        }, {
            root: document.querySelector('#container-list'),
            rootMargin: '0px',
            threshold: 1.0  // Ajusta según la sensibilidad deseada
        });

        if (loaderRef.value) {
            observer.value.observe(loaderRef.value);
        }
    });
});

onUnmounted(() => {
    // if (channelChat.value) {
    //     channelChat.value.unbind('App\\Events\\NotifyStayHotelEvent');
    //     pusher.value.unsubscribe(channelChat.value);
    // }
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

async function submit(data){
    openFiltersModal.value = false;
    allFilters.value = {
        search: search.value,
        periods: data[0],
        pendings: data[1]
    }
    loadData();
    toast.warningToast('Filtros aplicados con éxito','top-right');
}

async function searchInList(){
    if(search.value?.length == 0){
        loadSearch(null);
    }
    if(search.value?.length >= 3){
        loadSearch(search.value);
    }
}

async function loadSearch(search){
    allFilters.value.search = search;
    loadData(true, false);
}

async function loadData(resetList = false, showLoadPage = true){
    if(resetList){
        allFilters.value.offset = 0;
        allFilters.value.limit = list.value.length;
    }else{
        allFilters.value.limit = 10;
        allFilters.value.offset = list.value.length;    
    }
    
    loading.value = true;
    data.value = await stayStore.$getAllByHotel(allFilters.value, showLoadPage);
    countsByPeriod.value = data.value.counts_by_period;
    totalCounts.value = data.value.total_count;
    totalValidCount.value = data.value.total_valid_count;
    countsGeneralByPeriod.value = data.value.counts_general_by_period;
    pendingCountsByPeriod.value = data.value.pending_counts_by_period;
    if(resetList){
        list.value = data.value.stays;
    }else{
        list.value = [...list.value, ...data.value.stays];
    }
    
    loading.value = false;
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
    console.log('channelUpdate.value',channelUpdate.value)
    channelUpdate.value = pusher.value.subscribe(channelUpdate.value);
    channelUpdate.value.bind('App\\Events\\UpdateStayListEvent', (data) => {
        console.log('UpdateStayListEvent staylist',data)
        let showLoadPage = data.showLoadPage ?? true;
        loadData(true, showLoadPage);
    });

    channelQuery.value = 'notify-send-query.' + hotelStore.hotelData.id;
    channelQuery.value = pusher.value.subscribe(channelQuery.value);
    channelQuery.value.bind('App\\Events\\NotifySendQueryEvent', (data) => {
        let showLoadPage = data.showLoadPage ?? true;
        loadData(true, showLoadPage);
    });
}

function resetFilters(){
    if (filtersModal.value) {
        filtersModal.value.resetFilters();
    }
}

function cleanSearch(){
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
    list.value = [];
    loadData(false);
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