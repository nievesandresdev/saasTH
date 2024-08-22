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
                                <p class="inline text-sm htext-black-100">{{ formFilter.city }}</p>
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
                        Politica de cancelación
                    </label>
                    <div class="mt-2">
                        <div
                            class="flex items-center"
                        >
                            <div class="flex items-center">
                                <input
                                    v-model="formModalFilter.free_cancelation"
                                    :checked="formFilter.free_cancelation"
                                    type="checkbox"
                                    class="w-5 h-5 rounded mr-2"
                                >
                                <p class="inline text-sm htext-black-100">Cancelación gratuita</p>
                            </div>
                            <p class="font-medium text-sm ml-auto htext-black-100">
                                {{ numbersByFilters.free_cancelation }} 
                            </p>
                        </div>
                    </div>
                </div>
                <div class="">
                    <label class="mb-0 text-base font-medium block htext-black-100">
                        Duración
                    </label>
                    <div class="mt-2  space-y-2">
                        <div
                            v-for="(duration, index) in numbersByFilters.duration"
                            class="flex items-center"
                        >
                            <div class="flex items-center">
                                <input
                                    v-model="formModalFilter.duration"
                                    :value="index"
                                    :checked="formFilter.duration.includes(index)"
                                    type="checkbox"
                                    class="w-5 h-5 rounded mr-2"
                                >
                                <p class="inline text-sm htext-black-100">{{ duration.name }}</p>
                            </div>
                            <p class="font-medium text-sm ml-auto htext-black-100">
                                {{ duration.count }} 
                            </p>
                        </div>
                    </div>
                </div>
                <!-- {{formModalFilter}} -->
                <div class="">
                    <label class="mb-0 text-base font-medium block htext-black-100">
                        Valoraciones
                    </label>
                    <div class="mt-2 space-y-2">
                        <div
                            v-for="(score, index) in numbersByFilters.score"
                            class="flex items-center"
                        >
                            <div class="flex items-center">
                                <input
                                    v-model="formModalFilter.score"
                                    :value="index"
                                    :checked="formFilter.score.includes(index)"
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
                <div class="">
                    <label class="mb-0 text-base font-medium block htext-black-100">
                        Rango de precio
                    </label>
                    <div class="mt-2 flex items-center space-x-4">
                        <div class="flex flex-col">
                            <p class="text-[10px] font-semibold inline-block mb-1">Desde</p>
                            <BaseTextField
                                v-model="formModalFilter.price_min"
                                placeholder="€"
                                classInput="p-2 h-9 text-sm "
                                classContent="w-[64px]"
                            />
                        </div>
                        <div class="flex flex-col">
                            <p class="text-[10px] font-semibold inline-block mb-1">Hasta</p>
                            <BaseTextField
                                v-model="formModalFilter.price_max"
                                placeholder="€"
                                classInput="p-2 h-9 text-sm w-[64px]"
                                classContent="w-[64px]"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div class="p-4 border-t hborder-gray-400 flex justify-between">
                <a 
                    href="javascript:void(0)"
                    class="underline font-medium text-xs my-auto"
                >
                    Quitar filtros
                </a>
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
import BaseTextField from '@/components/Forms/BaseTextField';

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
    {name:'1 estrella'},
    {name:'2 estrellas'},
    {name:'3 estrellas'},
    {name:'4 estrellas'},
    {name:'5 estrellas'},
]);
const formModalFilter = reactive({
    all_cities: false,
    free_cancelation: false,
    duration: [],
    score: [],
    price_min: null,
    price_max: null,
});

watch(isOpenModelFilter, (valNew, valOld) => {
    if (!!valNew && !valOld) {
        let { all_cities, duration, score, price_max, price_min, free_cancelation } = formFilter;
        Object.assign(formModalFilter, { all_cities, duration, score, price_max, price_min, free_cancelation });
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
    emits('reloadExperiences');
    closeModalFilter();
}

</script>