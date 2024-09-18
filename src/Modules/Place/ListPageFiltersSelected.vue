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
        <template v-for="(distance, index) in distances">
            <div
                v-if="filtersSelected.distances.includes(index)"
                class="chip chip--green py-2 px-[12px] flex items-center cursor-pointer text-sm font-medium space-x-2"
            >
                <img src="/assets/icons/1.TH.PINPOINT.OUTLINE.svg" alt="1.TH.OUTLINE">
                <span>{{ distance.name  }}</span>
                <img
                    src="/assets/icons/1.TH.CLOSE.GREEN.svg"
                    alt="1.TH.CLOSE.GREEN"
                    @click="cleanFilter('distances', index)"
                >
            </div>
        </template>
        <template v-for="(score, index) in scores">
            <div
                v-if="filtersSelected.points.includes(index)"
                class="chip chip--green py-2 px-[12px] flex items-center cursor-pointer text-sm font-medium space-x-2"
            >
                <img src="/assets/icons/1.TH.REVIEW.svg" alt="1.TH.OUTLINE">
                <span>{{ score.name }}</span>
                <img
                    src="/assets/icons/1.TH.CLOSE.GREEN.svg"
                    alt="1.TH.CLOSE.GREEN"
                    @click="cleanFilter('points', index)"
                >
            </div>
        </template>
        <button
            v-if="filtersSelected.points?.length || filtersSelected.distances?.length || filtersSelected.all_cities"
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
const distances = ref({
    '1': {name:'0 a 1 km'},
    '2': {name:'1 a 2 km'},
    '3': {name:'2 a 5 km'},
    '4': {name:'5 a 10 km'},
    '5': {name:'10 a 20 km'},
});

// FUNCTION
function cleanFilter (field, value) {
    if (value === undefined) {
        filtersSelected[field] = filtersSelectedDefault[field];
        formFilter[field] = filtersSelectedDefault[field];
    }   else {
        let index = filtersSelected[field].findIndex(item => item === value);
        filtersSelected[field].splice(index, 1);
        formFilter[field] = filtersSelected[field];
    }
    emits('reloadPlaces');
}
// function cleanFilter (field, valueArray) {
//     filtersSelected[field] = filtersSelectedDefault[field];
//     formFilter[field] = filtersSelectedDefault[field];
//     emits('reloadPlaces');
// }

function deleteAllFilters () {
    emits('deleteAllFilters');
}


</script>