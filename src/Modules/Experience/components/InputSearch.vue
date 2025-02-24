<template>
    <div class="relative" v-click-away="handleClickOutsideDropDown">
        <BaseTextField
            v-model="formFilter.search"
            prepend-inner-icon="/assets/icons/1.TH.SEARCH.svg"
            placeholder="Buscar actividad..."
            class-content="w-[345px]"
            @click="onClick"
        ></BaseTextField>
        <div v-if="dropdownSearch" class="absolute left-0 py-6 bg-white top-11 rounded-[10px] z-50 " style="width: 519px;box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.15);">
            <div
                class="flex px-4 py-2 cursor-pointer"
                v-for="(p, i) in searchList" :key="i"
                @click="selectExperience(p.id)"
            >
                <img class="w-10 h-10 rounded-[10px]" :src="experienceStore.formatImage(p.image)">
                <div class="pb-2 ml-2 border-b grow">
                    <h5 class="text-sm font-medium leading-4 truncate">{{p.title}}</h5>
                    <p class="mt-2 text-xs text-ao">{{p.city_experince}}</p>
                </div>
            </div>
            <div v-if="searchList.length == 0" class="px-4 py-2" >
                <p class="text-xs text-ao">Sin resultados...</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, provide, computed, nextTick, inject, watch, defineEmits } from 'vue';

// COMPONENTS
import BaseTextField from '@/components/Forms/BaseTextField';

const emits = defineEmits(['reloadExperiences']);

// DATA

const dropdownSearch = ref(false);
const searchList = ref([]);

//
const experienceStore = inject('experienceStore');
const formFilter = inject('formFilter');
const isOpenModelFilter = inject('isOpenModelFilter');

watch(()=>formFilter.search, () => {
    submitSearch();
});

//  FUNCTIONS
function handleClickOutsideDropDown () {
    dropdownSearch.value = false;
}

function onClick () {
    dropdownSearch.value = true
}

function selectExperience (experienceId) {
    searchList.value = [];
    formFilter.search = null;
    dropdownSearch.value = null;
    formFilter.one_exp_id =  experienceId;
    emits('reloadExperiences');
}

async function submitSearch () {
    if (!formFilter.search_terms) {
        searchList.value = [];
    }
    formFilter.one_place_id = null;
    let data = {page: 1, limit: 10, ...formFilter}
    data.recommendated = false;
    data.featured = false;
    data.visibility = 'visible';
    data.points = [];
    const response = await experienceStore.$getAll(data);
    if (response.ok) {
        searchList.value = response.data.experiences.data;
    }
}

</script>