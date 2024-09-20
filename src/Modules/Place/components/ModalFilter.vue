<template>
<ModalWindow v-if="isOpenModelFilter" :isVisible="isOpenModelFilter"  :width="'344px'" padding-content="" footer="true">
    <template #content>
        <div class="">
            <div class="p-4 flex justify-between border-b hborder-gray-400">
                <h2 class="text-[18px] font-medium">Filtrar por</h2>
                <button @click="closeModalFilter">
                    <img src="/assets/icons/1.TH.CLOSE.svg" alt="1.TH.CLOSE">
                </button>
            </div>
            <div class="space-y-4 p-4 w-full overflow-y-auto" style="max-height:27rem">
                <div class="">
                    <label class="mb-0 text-base font-medium block htext-black-100">
                        Tu región
                    </label>
                    <div class="mt-2 space-y-2">
                        <div
                            class="flex items-center"
                        >
                            <div class="flex items-center">
                                <input
                                    v-model="formModalFilter.all_cities"
                                    :value="false"
                                    name="city"
                                    type="radio" 
                                    class="w-5 h-5 rounded mr-2"
                                >
                                <p class="inline text-sm htext-black-100">{{ formFilter.current_city }}</p>
                            </div>
                            <p class="font-medium text-sm ml-auto htext-black-100">
                            {{ numbersByFilters.city }}
                            </p>
                        </div>
                        <div
                            class="flex items-center"
                        >
                            <div class="flex items-center">
                                <input
                                    v-model="formModalFilter.all_cities"
                                    :value="true"
                                    name="city"
                                    type="radio"
                                    class="w-5 h-5 rounded mr-2"
                                >
                                <p class="inline text-sm htext-black-100">España</p>
                            </div>
                            <p class="font-medium text-sm ml-auto htext-black-100">
                            {{ numbersByFilters.all_cities }}
                            </p>
                        </div>
                    </div>
                </div>
                <div class="">
                    <label class="mb-0 text-base font-medium block htext-black-100">
                        Distancia del alojamiento
                    </label>
                    <div class="mt-2 space-y-2">
                        <div
                            v-for="(distance, index) in numbersByFilters.distances"
                            class="flex items-center"
                        >
                            <div class="flex items-center">
                                <input
                                    v-model="formModalFilter.distances"
                                    :value="index"
                                    :checked="formFilter.distances.includes(index)"
                                    type="checkbox"
                                    class="w-5 h-5 rounded mr-2"
                                >
                                <p class="inline text-sm htext-black-100">{{ distance.name }}</p>
                            </div>
                            <p class="font-medium text-sm ml-auto htext-black-100">
                                {{ distance.count }} 
                            </p>
                        </div>
                    </div>
                </div>
                <div class="">
                    <label class="mb-0 text-base font-medium block htext-black-100">
                        Valoraciones
                    </label>
                    <div class="mt-2 space-y-2">
                        <div
                            v-for="(score, index) in numbersByFilters.scores"
                            class="flex items-center"
                        >
                            <div class="flex items-center">
                                <input
                                    v-model="formModalFilter.points"
                                    :value="index"
                                    :checked="formFilter.points.includes(index)"
                                    type="checkbox" 
                                    class="w-5 h-5 rounded mr-2"
                                >
                                <p class="inline text-sm htext-black-100">{{ score.name }}</p>
                            </div>
                            <p class="font-medium text-sm ml-auto htext-black-100">
                                {{ score.count }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="p-4 border-t hborder-gray-400 flex justify-end">
                <!-- <a 
                    href="javascript:void(0)"
                    class="underline font-medium text-xs my-auto"
                >
                    Quitar filtros
                </a> -->
                <button 
                    class="hbtn-primary font-medium text-sm h-10"
                    style="width:126px;"
                    @click="submitFilter()"
                >
                    Aplicar filtros
                </button>
            </div>
        </div>
    </template>
</ModalWindow>
</template>

<script setup>
import { ref, inject, defineEmits, reactive, watch } from 'vue';

import ModalWindow from '@/components/ModalWindow';

const emits = defineEmits(['reloadPlaces']);


const formFilter = inject('formFilter');
const isOpenModelFilter = inject('isOpenModelFilter');
const emptyFilters = inject('emptyFilters');

const scores = ref([
    {name:'1 estrella'},
    {name:'2 estrellas'},
    {name:'3 estrellas'},
    {name:'4 estrellas'},
    {name:'5 estrellas'},
]);
const distances = ref([
    {name:'0 a 1 km'},
    {name:'1 a 2 km'},
    {name:'2 a 5 km'},
    {name:'5 a 10 km'},
    {name:'10 a 20 km'},
]);
const formModalFilter = reactive({
    all_cities: false,
    distances: [],
    points: [],
});

watch(isOpenModelFilter, (valNew, valOld) => {
    if (!!valNew && !valOld) {
        let { all_cities, distances, points } = formFilter;
        Object.assign(formModalFilter, { all_cities, distances, points });
    }
});

//INJECT
const numbersByFilters = inject('numbersByFilters');
const filtersSelected = inject('filtersSelected');

// FUNCTIONS    

function closeModalFilter () {
    isOpenModelFilter.value = false;
}


function submitFilter () {
    Object.assign(filtersSelected, formModalFilter);
    Object.assign(formFilter, formModalFilter);
    emits('reloadPlaces');
    closeModalFilter();
}

</script>