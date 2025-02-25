<template>
    <div class="relative" v-click-away="handleClickOutsideDropDown">
        <BaseTextField
            v-model="formFilter.search_terms"
            prepend-inner-icon="/assets/icons/1.TH.SEARCH.svg"
            placeholder="Buscar lugar..."
            class-content="w-[345px]"
            @click="onClick"
        ></BaseTextField>
        <div v-if="dropdownSearch" class="absolute left-0 py-6 bg-white top-11 rounded-[10px] z-[1000]" style="width: 519px;box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.15);">
            <div
                class="flex px-4 py-2 cursor-pointer"
                v-for="(p, i) in searchList" :key="i"
                @click="selectPlace(p.id)"
            >
                <img class="w-10 h-10 rounded-[10px]" :src="placeStore.formatImage(p.place_images?.[0])">
                <div class="pb-2 ml-2 border-b grow">
                    <h5 class="text-sm font-medium leading-4 truncate">{{p.title}}</h5>
                    <p class="mt-2 text-xs text-ao">{{p.city}}</p>
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

const emits = defineEmits(['reloadPlaces']);

// DATA

const debounce = ref(null);
const dropdownSearch = ref(false);
const searchList = ref([]);

//
const placeStore = inject('placeStore');
const formFilter = inject('formFilter');
const isOpenModelFilter = inject('isOpenModelFilter');

watch(()=>formFilter.search_terms, () => {
    submitSearch();
});

//  FUNCTIONS
function handleClickOutsideDropDown () {
    dropdownSearch.value = false;
}

function onClick () {
    
    dropdownSearch.value = true;
    // console.log(dropdownSearch.value);
}

function selectPlace (placeId) {
    searchList.value = [];
    formFilter.search_terms = null;
    dropdownSearch.value = null;
    formFilter.one_place_id =  placeId;
    emits('reloadPlaces');
}

async function submitSearch () {
    clearTimeout(debounce.value);
    debounce.value = setTimeout(async() => {
    if (!formFilter.search_terms) {
        searchList.value = [];
    }
    formFilter.one_place_id = null;
    let data = {page: 1, ...formFilter}
    data.recommendated = false;
    data.featured = false;
    data.visibility = 'visible';
    data.points = [];


    const response = await placeStore.$getAll(data);
    if (response.ok) {
        searchList.value = response.data.places.data;
    }

        }, 500);
}

</script>