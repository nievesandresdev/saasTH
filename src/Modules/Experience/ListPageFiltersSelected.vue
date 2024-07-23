<template>
    <div
        v-if="!emptyFilters"
        class="mt-4 flex gap-4 flex-wrap"
    >
        <div v-if="filtersSelected.all_cities"  class="chip chip--green py-2 px-[12px] flex items-center cursor-pointer text-sm font-medium space-x-2">
            <img src="/assets/icons/1.TH.PINPOINT.OUTLINE.svg" alt="1.TH.OUTLINE">
            <span>España</span>
            <img
                src="/assets/icons/1.TH.CLOSE.GREEN.svg"
                alt="1.TH.CLOSE.GREEN"
                @click="cleanFilter('all_cities')"
            >
        </div>
        <template v-for="(duration, index) in durations">
            <div
                v-if="filtersSelected.duration.includes(index)"
                class="chip chip--green py-2 px-[12px] flex items-center cursor-pointer text-sm font-medium space-x-2"
            >
                <img src="/assets/icons/1.TH.PINPOINT.OUTLINE.svg" alt="1.TH.OUTLINE">
                <span>{{ duration.name  }}</span>
                <img
                    src="/assets/icons/1.TH.CLOSE.GREEN.svg"
                    alt="1.TH.CLOSE.GREEN"
                    @click="cleanFilter('duration', index)"
                >
            </div>
        </template>
        <template v-for="(score, index) in scores">
            <div
                v-if="filtersSelected.score.includes(index)"
                class="chip chip--green py-2 px-[12px] flex items-center cursor-pointer text-sm font-medium space-x-2"
            >
                <img src="/assets/icons/1.TH.CLOCK.OUTLINE.svg" alt="1.TH.OUTLINE">
                <span>{{ score.name }}</span>
                <img
                    src="/assets/icons/1.TH.CLOSE.GREEN.svg"
                    alt="1.TH.CLOSE.GREEN"
                    @click="cleanFilter('score', index)"
                >
            </div>
        </template>
        <div v-if="filtersSelected.price_min || filtersSelected.price_max"  class="chip chip--green py-2 px-[12px] flex items-center cursor-pointer text-sm font-medium space-x-2">
            <span>€</span>
            <span>{{ filtersSelected.price_min ?? 0 }} - {{ filtersSelected.price_max ?? 0 }}</span>
            <img
                src="/assets/icons/1.TH.CLOSE.GREEN.svg"
                alt="1.TH.CLOSE.GREEN"
                @click="cleanFilter('price_max')"
            >
        </div>
        <div v-if="filtersSelected.free_cancelation"  class="chip chip--green py-2 px-[12px] flex items-center cursor-pointer text-sm font-medium space-x-2">
            <span>€</span>
            <span>Cancelación gratuita</span>
            <img
                src="/assets/icons/1.TH.CLOSE.GREEN.svg"
                alt="1.TH.CLOSE.GREEN"
                @click="cleanFilter('price_max')"
            >
        </div>
        <button
            v-if="!emptyFilters"
            class="text-sm font-medium underline"
            @click="deleteAllFilters()"
        >
            Quitar filtros
        </button>
    </div>
</template>

<script setup>

import { ref, inject, defineEmits, reactive, watch, computed } from 'vue';

const emits = defineEmits(['reloadPlaces', 'deleteAllFilters']);

const formFilter = inject('formFilter');
const filtersSelected = inject('filtersSelected');
const filtersSelectedDefault = inject('filtersSelectedDefault');
const emptyFilters = inject('emptyFilters');

const scores = ref({
    '1': {name:'1 estrella'},
    '2': {name:'2 estrellas'},
    '3': {name:'3 estrellas'},
    '4': {name:'4 estrellas'},
    '5': {name:'5 estrellas'},
});
const durations = ref({
    '1': {name: 'Hasta una hora'},
    '2': {name: 'Entre 1 y 3 horas'},
    '3': {name: 'Medio día'},
    '4': {name: 'Día completo'},
});

// FUNCTION
function cleanFilter (field) {
    filtersSelected[field] = filtersSelectedDefault[field];
    formFilter[field] = filtersSelectedDefault[field];
    if(fiel === 'price_max') {
        formFilter['price_min'] = filtersSelectedDefault['price_min'];
    }
    emits('reloadExperiences');
}

function deleteAllFilters () {
    emits('deleteAllFilters');
}


</script>