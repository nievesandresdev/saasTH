<template>
    <aside class="w-full h-full flex flex-col bg-white shadow-hoster">
        
        <button class="py-[23px] px-4 block">
            <h5 class="text-base font-semibold leading-[120%] text-left">Estancias</h5>
        </button>

        <!-- filters -->
        <div class="px-4  border-b hborder-gray-400">

            <!-- input y button -->
            <div class="flex items-center gap-1">
                <div class="relative">
                    <BaseTextField 
                        v-model="search" 
                        searchInList
                        :classInput="`py-2 px-3 h-10 ${ !search ? 'border-search-stay' : ''}`" 
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
                    <h2 class="text-xs font-semibold leading-[130%]">{{totalCounts}} estancia{{ totalCounts==1 ?'':'s' }}</h2>
                    <button 
                        v-if="filtersActive" 
                        class="text-xs font-semibold leading-130% underline ml-auto"
                        @click="resetFilters"
                    >
                        Quitar filtros
                    </button>
                </div>
                <div class="mt-2 flex items-center gap-1">
                    <div 
                        class="flex items-center gap-1" v-for="period  in allFilters.periods"
                    >
                        <h2 v-if="countsByPeriod" class="text-xs font-semibold leading-[130%]">{{ countsByPeriod[period] ?? 0 }}</h2>
                        <span
                            class="px-3 py-1 rounded-full text-[10px] font-semibold leading-[130%] uppercase"
                            :class="bgPeriod[period]"
                        >
                            {{translatePeriod[period]}}
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <div
            class="overflow-y-auto custom-scrollbar"
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
        </div>

        <FiltersModal ref="filtersModal" @submit="submit" />
    </aside>
</template>
<script setup>
import { onMounted, ref, provide, computed } from 'vue'
import CardtayList from './CardtayList.vue'
import FiltersModal from './FiltersModal.vue'
import BaseTextField from '@/components/Forms/BaseTextField.vue';
import HoveredIcon from '@/components/Buttons/HoveredIcon.vue'

import { useStayStore } from '@/stores/modules/stay/stay';
import { useRouter, useRoute } from 'vue-router';
//composable
import { useToastAlert } from '@/composables/useToastAlert'

const toast = useToastAlert();
const router = useRouter();
const route = useRoute();


const stayStore = useStayStore();
const list = ref(null)
const data = ref(null)
const search = ref(null)
const countsByPeriod = ref(null)
const totalCounts = ref(0)
const pendingCount = ref(0)
const filtersModal = ref(null);
const allFilters = ref({
    search: null,
    periods: ['pre-stay','in-stay','post-stay'],
    pendings:  'all'
})
const openFiltersModal = ref(false)

onMounted( async() => {
    loadData();
})

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
    if(search.value.length >= 3){
        allFilters.value = {
            search: search.value,
            periods: allFilters.value.periods,
            pendings:  allFilters.value.pendings
        }
        loadData();
    }
}

async function loadData(){
    data.value = await stayStore.$getAllByHotel(allFilters.value);
    list.value = data.value.stays;
    countsByPeriod.value = data.value.counts_by_period;
    totalCounts.value = data.value.total_counts;
    totalCounts.value = data.value.total_counts;
    pendingCount.value = data.value.pending_counts;
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
    if(route.params.stayId){
        router.push({
            name: 'StayDetailPage',
            params: { id: route.params.stayId }
        });
    }
    loadData();
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
provide('totalCounts',totalCounts)
provide('pendingCount',pendingCount)

</script>
<style>
.border-search-stay{
    border: 1px solid #bfbfbf !important;
}
.border-search-stay:hover {
    border: 1px solid #34A98F;
}
</style>