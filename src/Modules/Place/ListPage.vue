<template>
    <div class="h-[100%] bg-[#FAFAFA]">
        <div class="pb-[104px]">
            <ListPageHeader @changeCategory="changeCategory($event)" />
            <div
                v-if="!visibilityCategory"
                class="w-full h-[48px] bg-[#FFF3CC] text-center py-[14px] htext-black-100 text-sm font-medium"
            >
                La sección <span class="font-semibold">{{ categoryCurrent?.name }}</span> está oculta y no es visible para tus huéspedes. Activa "Mostrar al huésped" para hacerla visible.
            </div>
            <div>
                <div class="pt-6">
                    <div class="flex justify-between items-center px-6">
                        <div class="flex space-x-4">
                            <InputSearch @reloadPlaces="reloadPlaces()" />
                            <button @click="openModalFilter()">
                                <img
                                    :src="`assets/icons/1.TH.${emptyFilters ? 'Filters' : 'Filters.active'}.svg`"
                                    alt="1.TH.Filters"
                                    class="w-6 h-6"
                                >
                            </button>
                        </div>
                        <SwitchShowCategory />
                    </div>
                    <ListPageFiltersSelected
                        class="px-6"
                        @reloadPlaces="reloadPlaces()"
                        @deleteAllFilters="deleteAllFilters()"
                    />
                    <ListPageTabs @reloadPlaces="reloadPlaces()" class="mt-6 px-6"/>
                </div>
                <div class="px-6 mt-4">
                    <ListPageList ref="listPageListRef" class="px-6 mt-4" />
                </div>
            </div>
        </div>

    </div>
    <ModalFilter @reloadPlaces="reloadPlaces()" />
    
</template>

<script setup>
import { ref, reactive, onMounted, provide, computed, nextTick, toRefs } from 'vue';

import { useRouter } from 'vue-router';
const route = useRouter();

import ListPageHeader from './ListPageHeader.vue';
//
import InputSearch from './components/InputSearch';
import SwitchShowCategory from './components/SwitchShowCategory';
import ModalFilter from './components/ModalFilter';
import ListPageTabs from './ListPageTabs';
import ListPageList from './ListPageList';
import ListPageFiltersSelected from './ListPageFiltersSelected';

    // PROPS
const props = defineProps({
    queryRouter: {
        type: Object,
        default: () => ({})
    }
})
const { queryRouter } = toRefs(props);

// STATE
//
import { usePlaceStore } from '@/stores/modules/place';
const placeStore = usePlaceStore();
provide('placeStore', placeStore);
import { useHotelStore } from '@/stores/modules/hotel';
const hotelStore = useHotelStore();
provide('hotelStore', hotelStore);
import { useMockupStore } from '@/stores/modules/mockup';
const mockupStore = useMockupStore();
// COMPOSABLES
import { useToastAlert } from '@/composables/useToastAlert'
const toast = useToastAlert();

// DATA
 const { hotelData } = hotelStore;
//
const categoriplaces = ref([]);
const typeplaces = ref([]);
const placesData = ref([]);
const formFilter = reactive({
    selected_place: null,
    selected_subplace: null,
    points: [],
    city_latitude: null,
    city_longitude: null,
    one_place_id: null,
    featured: false,
    visibility: null,
    recommendated: false,
    search_terms: null,
    all_cities: false,
    current_city: null,
    distances: [],
});
const formFilterDefault = reactive({
    selected_place: null,
    selected_subplace: null,
    points: [],
    city_latitude: null,
    city_longitude: null,
    one_place_id: null,
    featured: false,
    visibility: null,
    recommendated: false,
    search_terms: null,
    all_cities: false,
    current_city: null,
    distances: [],
});
const filtersSelected = reactive({
    all_cities: false,
    distances: [],
    points: [],
});
const filtersSelectedDefault = reactive({
    all_cities: false,
    distances: [],
    points: [],
});
const paginateData = reactive({
    total: 0,
    current_page: 1,
    per_page: 1,
    last_page: 0,
    from_page: 0,
    to: 0,
});
const numbersByFilters = reactive({
    all_cities: 0,
    city: 0,
    scores: [],
    distances: [],
});
const page = ref(1);
const numberPlacesVisible = ref(0);
const numberPlacesHidden = ref(0);
const listPageListRef = ref(null);
const visibilityCategory = ref(false);
const visibilityTypePlace = ref(false);
const isOpenModelFilter = ref(false);

// PROVIDE
provide('hotelData', hotelData);
provide('categoriplaces', categoriplaces);
provide('visibilityCategory', visibilityCategory);
provide('visibilityTypePlace', visibilityTypePlace);

provide('typeplaces', typeplaces);
provide('placesData', placesData);
provide('formFilter', formFilter);
provide('paginateData', paginateData);
provide('page', page);
provide('numberPlacesVisible', numberPlacesVisible);
provide('numberPlacesHidden', numberPlacesHidden);
provide('numbersByFilters', numbersByFilters);
provide('isOpenModelFilter', isOpenModelFilter);
provide('filtersSelected', filtersSelected);
provide('filtersSelectedDefault', filtersSelectedDefault);

//
provide('mockupStore', mockupStore);
provide('toast', toast);

// ONMOUNTED
onMounted(async () => {
    await loadTypePlaces();
    loadCategoriPlaces();
    loadPlaces();
});

// COMPUTED
const categoryCurrent = computed(() => {
    let cat = categoriplaces.value.find(category => formFilter.selected_subplace === category.id);
    return cat;
});
provide('categoryCurrent', categoryCurrent);

const emptyFilters = computed(() => {
    return !filtersSelected.points?.length && !filtersSelected.distances?.length && !filtersSelected.all_cities;
});
provide('emptyFilters', emptyFilters);

// FUNCTION
function loadDataFormFilter () {
    formFilter.city_latitude = hotelData.latitude;
    formFilter.city_longitude = hotelData.longitude;
    formFilter.current_city = hotelData.zone;
}
function deleteAllFilters () {
    Object.assign(filtersSelected, filtersSelectedDefault);
    let { all_cities, distances, points } = formFilterDefault;
    Object.assign(formFilter, { all_cities, distances, points });
    reloadPlaces();
}
function resetFormFilter () {
    Object.assign(formFilter.value, formFilterDefault.value);
}
function changeCategory(cat){
    resetDataPage();
    changeFieldValueInFormFilter('selected_subplace', cat.id);
}
function changeFieldValueInFormFilter(field,value) {
    formFilter[field] = value;
    reloadPlaces();
}
async function loadTypePlaces () {
    const response = await placeStore.$getTypePlaces();
    if (response.ok) {
        
        typeplaces.value = response.data;
        // if (!formFilter.selected_place) {
            formFilter.selected_place = typeplaces.value?.[0].id;
            formFilterDefault.selected_place = typeplaces.value?.[0].id;
        // }
        // if (!formFilter.selected_subplace) {
            formFilter.selected_subplace = typeplaces.value?.[0].categori_places?.[0].id;
            formFilterDefault.selected_subplace = typeplaces.value?.[0].categori_places?.[0].id;
        // }
        loadQueryInFormFilter();
    }
}
async function loadDataUtil () {
    let body = {...formFilter}
    const response = await placeStore.$getDataUtil(body,  { showPreloader: false });
    if (response.ok) {
        numbersByFilters.scores = response.data.numbersPlacesByScore;
        numbersByFilters.distances = response.data.numbersPlacesBydistance;
        numbersByFilters.all_cities = response.data.countByAllCity;
        numbersByFilters.city = response.data.countByCityHotel;
        // numbersByFilters.
    }
}

async function loadCategoriPlaces () {
    const response = await placeStore.$getCategoriesByType();
    if (response.ok) {
        categoriplaces.value = response.data;
    }
}
function resetDataPage () {
    formFilter.points = [];
    formFilter.one_place_id = null;
    formFilter.featured = false;
    formFilter.visibility = null;
    formFilter.recommendated = false;
    formFilter.search_terms = null;
    formFilter.all_cities = false;
    formFilter.distances = [];
    page.value = 1;
    placesData.value = [];
    Object.assign(filtersSelected, {...filtersSelectedDefault});
}
function filterNonNullAndNonEmpty(obj) {
    const filteredObject = {}
    Object.keys(obj).forEach(key => {

        if (obj[key] !== null && obj[key] !== '') {
            if (Array.isArray(obj[key]) && obj[key].length > 0) {
                filteredObject[key] = obj[key]
            }
            else if (!Array.isArray(obj[key])) {
                filteredObject[key] = obj[key]
            }
        }
    })
    return filteredObject
}
function loadQueryInFormFilter () {
    for (const [key, value] of Object.entries(queryRouter.value || {})) {
        if (formFilter.hasOwnProperty(key)) {
            formFilter[key] = validValueQuery(key, value);
        }
    }
}
function validValueQuery (field, value) {

    if (['featured', 'recommendated', 'all_cities'].includes(field)) {
        if (value === 'false') return false;
        if (value === 'true') return true;
    }

    if (['selected_place', 'selected_subplace'].includes(field)) {
        return Number(value);
    }

    return value;
}
async function reloadPlaces () {
    loadDataFormFilter();
    page.value = 1;
    isOpenModelFilter.value = false;
    placesData.value = [];
    route.push({ name: 'Places', query: {...filterNonNullAndNonEmpty(formFilter)} });
    await Promise.all([loadDataUtil(), listPageListRef.value.loadPlaces(true)]);
}

async function loadPlaces () {
    loadDataFormFilter();
    page.value = 1;
    isOpenModelFilter.value = false;
    placesData.value = [];
    console.log(formFilter);
    await Promise.all([loadDataUtil(), listPageListRef.value.loadPlaces(true)]);
}

function resetDataPlaceAndReloadPlaces () {
    resetDataPage();
    reloadPlaces();
}

function openModalFilter () {
    isOpenModelFilter.value = true;
}

</script>

<style lang="scss">
    
</style>