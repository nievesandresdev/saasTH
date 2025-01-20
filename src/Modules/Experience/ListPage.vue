<template>
    <div class="h-[100%] bg-[#FAFAFA] relative">
        <div class="pb-[104px]">
            <ListPageHeader />
            <div
                v-if="!hotelStore.hotelData.show_experiences"
                class="w-full h-[48px] bg-[#FFF3CC] text-center py-[14px] htext-black-100 text-sm font-medium"
            >
                La sección <span class="font-semibold">Experiencias</span> está oculta y no es visible para tus huéspedes. Activa "Mostrar al huésped" para hacerla visible.
            </div>
            <div>
                <div class="pt-6">
                    <div class="flex justify-between items-center px-6">
                        <div class="flex space-x-4">
                            <InputSearch @reloadExperiences="reloadExperiences()" />
                            <button @click="openModalFilter()">
                                <img
                                    :src="`assets/icons/1.TH.${emptyFilters ? 'Filters' : 'Filters.active'}.svg`"
                                    alt="1.TH.Filters"
                                    class="w-6 h-6"
                                >
                            </button>
                        </div>
                    </div>
                    <ListPageFiltersSelected
                        class="px-6"
                        @reloadExperiences="reloadExperiences()"
                        @deleteAllFilters="deleteAllFilters()"
                    />
                    <ListPageTabs @reloadExperiences="reloadExperiences()" class="mt-6 px-6"/>
                </div>
                <div class="px-6 mt-4">
                    <ListPageList
                        ref="listPageListRef"
                        class="px-6 mt-4"
                        @reload-experiences="reloadExperiences()"
                        @edit-hoster="openEditByHoster"
                        @edit-viator="openEditByViator"
                    />
                </div>
            </div>
        </div>
        <ModalFilter @reloadExperiences="reloadExperiences()" />
        
        <PanelEdit
            ref="panelEditRef"
            @load:resetPageData="reloadExperiences()"
        />
        <PanelEditHoster
            ref="panelEditHosterRef"
            @load:resetPageData="reloadExperiences()"
        />
    </div>

</template>

<script setup>
import { ref, reactive, onMounted, provide, computed, inject, watch, watchEffect,toRefs, nextTick } from 'vue';

import ListPageHeader from './ListPageHeader.vue';
import ListPageTabs from './ListPageTabs.vue';
import ListPageList from './ListPageList.vue';
import ListPageFiltersSelected from './ListPageFiltersSelected.vue';
import InputSearch from './components/InputSearch.vue';
import ModalFilter from './components/ModalFilter.vue';
import PanelEdit from './components/PanelEdit.vue';
import PanelEditHoster from './components/PanelEditHoster.vue';

import { useRouter } from 'vue-router';
const route = useRouter();

// PROPS
const props = defineProps({
    queryRouter: {
        type: Object,
        default: () => ({})
    }
})
const { queryRouter } = toRefs(props);

import { useMockupStore } from '@/stores/modules/mockup';
const mockupStore = useMockupStore();

import { useHotelStore } from '@/stores/modules/hotel';
const hotelStore = useHotelStore();

import { useExperienceStore } from '@/stores/modules/experience';
const experienceStore = useExperienceStore();

// COMPOSABLES
import { useToastAlert } from '@/composables/useToastAlert'
const toast = useToastAlert();

// DATA
const { hotelData } = hotelStore;
const experiencesData = ref([]);
const formFilter = reactive({
    one_exp_id: null,
    visibility: null,
    city: null,
    search: null,
    //
    all_cities: false,
    free_cancelation: false,
    duration: [],
    score: [],
    price_min: null,
    price_max: null,
});
const formFilterDefault = reactive({
    one_exp_id: null,
    visibility: null,
    city: null,
    search: null,
    //
    all_cities: false,
    free_cancelation: false,
    duration: [],
    score: [],
    price_min: null,
    price_max: null,
});
const filtersSelected = reactive({
    all_cities: false,
    free_cancelation: false,
    duration: [],
    score: [],
    price_min: null,
    price_max: null,
});
const filtersSelectedDefault = reactive({
    all_cities: false,
    free_cancelation: false,
    duration: [],
    score: [],
    price_min: null,
    price_max: null,
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
    free_cancelation: 0,
    city: 0,
    score: [],
    duration: [],
});

const page = ref(1);
const numberExperiencesVisible = ref(0);
const numberExperiencesHidden = ref(0);
const listPageListRef = ref(null);
const isOpenModelFilter = ref(false);
const changePendingInForm = ref(false);
const modalChangePendinginForm = ref(false);
const firstLoad = ref(true);
const emptyExperiences = ref(false);

const modelActive = ref(null);
const panelEditHosterActive = ref(null);
const panelEditRef = ref(null);
const panelEditHosterRef = ref(null);

// PROVIDE
provide('hotelData', hotelData);
//
provide('mockupStore', mockupStore);
provide('experienceStore', experienceStore);
provide('toast', toast);
provide('hotelStore', hotelStore);
provide('formFilter', formFilter);
provide('experiencesData', experiencesData);
provide('modelActive', modelActive);
provide('panelEditHosterActive', panelEditHosterActive);
provide('paginateData', paginateData);
provide('page', page);
provide('numberExperiencesVisible', numberExperiencesVisible);
provide('numberExperiencesHidden', numberExperiencesHidden);
provide('numbersByFilters', numbersByFilters);
provide('isOpenModelFilter', isOpenModelFilter);
provide('filtersSelected', filtersSelected);
provide('filtersSelectedDefault', filtersSelectedDefault);
provide('changePendingInForm', changePendingInForm);
provide('modalChangePendinginForm', modalChangePendinginForm);
provide('firstLoad', firstLoad);

watch(modelActive, (valNew, valOld) => {
    if (!valNew && !!valOld) {
        loadMockup();
    }
});

watch(panelEditHosterActive, (valNew, valOld) => {
    if (!valNew && !!valOld) {
        loadMockup();
    }
});

// ONMOUNTED
onMounted(async () => {
    loadQueryInFormFilter();
    loadExperiences();
});

// COMPUTED
const emptyFilters = computed(() => {
    return !filtersSelected.score?.length &&
        !filtersSelected.duration?.length &&
        !filtersSelected.all_cities &&
        !filtersSelected.free_cancelation &&
        !filtersSelected.price_min &&
        !filtersSelected.price_max;
});
provide('emptyFilters', emptyFilters);

// FUNCTIONS

function mergeDataFormInUrlMockup (stringQuery, dataForm) {
    if (dataForm.visility === 'recommendated') {
        stringQuery += '&featured=true';
    }
    Object.keys(dataForm).forEach(key => {
        let value = dataForm[key];
        
        if (Array.isArray(value)) {
            value.forEach(item => {
                stringQuery += `&${key}=${encodeURIComponent(item)}`;
            });
        } else if (value !== undefined && value !== null && value !== '') {
            stringQuery += `&${key}=${encodeURIComponent(value)}`;
        }
    });
    return stringQuery;
}

function loadMockup (experienceSlug = null) {
    let query = null;
    if (experienceSlug) {
        mockupStore.$setIframeUrl(`/experiencias/${experienceSlug}`);
    } else {
        let dataForm = {...filterNonNullAndNonEmpty(formFilter)};
        query = 'mobile=1';

        query = mergeDataFormInUrlMockup(query, dataForm);
        mockupStore.$setIframeUrl(`/experiencias`, query);
    }
    mockupStore.$setInfo1('Guarda para ver tus cambios en tiempo real', '/assets/icons/info.svg');
}

function loadDataFormFilter () {
    formFilter.city = hotelData.zone;
}

function resetDataPage () {

    // formFilter.one_exp_id = null;
    // formFilter.visibility = null;
    // formFilter.recommendated = false;
    // formFilter.search = null;
    // //
    // formFilter.all_cities = false;
    // formFilter.free_cancelation = false;
    // formFilter.duration = [];
    // formFilter.score = [];
    // formFilter.price_min = null;
    // formFilter.price_max = null;

    page.value = 1;
    experiencesData.value = [];
    Object.assign(formFilter, {...formFilterDefault});
    Object.assign(filtersSelected, {...filtersSelectedDefault});
}

function openModalFilter () {
    if (changePendingInForm.value) {
        openModalChangeInForm();
        return;
    }
    isOpenModelFilter.value = true;
}

function deleteAllFilters () {
    Object.assign(filtersSelected, filtersSelectedDefault);
    let { all_cities, free_cancelation, duration, score, price_min, price_max } = formFilterDefault;
    Object.assign(formFilter, { all_cities, free_cancelation, duration, score, price_min, price_max });
    reloadExperiences();
}

function filterNonNullAndNonEmpty(obj) {
    const filteredObject = {}
    Object.keys(obj).forEach(key => {

        if (obj[key] !== null && obj[key] !== '') {
            if (Array.isArray(obj[key]) && obj[key].length > 0) {
                filteredObject[key] = obj[key];
            }
            else if (!Array.isArray(obj[key])) {
                filteredObject[key] = obj[key];
            }
        }
    })
    return filteredObject
}

function loadQueryInFormFilter () {
    for (const [key, value] of Object.entries(queryRouter.value || {})) {
        if (formFilter.hasOwnProperty(key)) {
            if (['duration', 'score'].includes(key)) {
                if (typeof value === 'string') {
                    formFilter[key].push(value);
                    filtersSelected[key].push(value);
                } else {
                    formFilter[key] = value;
                    filtersSelected[key] = value;
                }
            }else {
                formFilter[key] = validValueQuery(key, value);
                filtersSelected[key] = validValueQuery(key, value);
            }
        }
    }
    // console.log(formFilter, 'filtersSelected');
}

function validValueQuery (field, value) {

        if (value === 'false') return false;
        if (value === 'true') return true;

    return value;
}

async function loadDataUtil () {
    let body = {...formFilter}
    const response = await experienceStore.$getNumbersByFilters(body,  { showPreloader: false });
    // console.log(response, 'response');
    if (response.ok) {
        numbersByFilters.score = response.data.score;
        numbersByFilters.duration = response.data.duration;
        numbersByFilters.all_cities = response.data.allCities;
        numbersByFilters.city = response.data.city;
        numbersByFilters.free_cancelation = response.data.freeCancelation;
        // numbersByFilters.
    }
}

function resetDataAndReload () {
    resetDataPage();
    reloadExperiences();
}

async function reloadExperiences () {
    firstLoad.value = true;
    loadDataFormFilter();
    page.value = 1;
    isOpenModelFilter.value = false;
    experiencesData.value = [];
    let query = {...filterNonNullAndNonEmpty(formFilter)};
    // console.log(query, 'query');
    route.push({ name: 'Experiences', query });
    loadMockup();
    await Promise.all([loadDataUtil(), listPageListRef.value.loadExperiences(false)]);
}

async function loadExperiences () {
    
    loadDataFormFilter();
    page.value = 1;
    isOpenModelFilter.value = false;
    experiencesData.value = [];
    loadMockup();
    await Promise.all([loadDataUtil(), listPageListRef.value.loadExperiences(false)]);
}

function openModalChangeInForm () {
    modalChangePendinginForm.value = true;
    nextTick(() => {
        modalChangePendinginForm.value = false;
    });
}


function openEditByViator (payload) {
    modelActive.value = payload.action;
    nextTick(() => {
        if (payload.action === 'EDIT') {
            loadMockup(payload.experience.slug);
        } else {
        }
        panelEditRef.value.edit(payload);
    });
}

function openEditByHoster (payload) {
    panelEditHosterActive.value = payload.action;
    panelEditHosterRef.value.edit(payload);
}


</script>