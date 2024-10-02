<template>
    <div class="h-screen bg-[#FAFAFA]">
        <div class="pb-[104px]">
            <ListPageHeader />
            <ListPageBannerShowToGuest v-if="!hotelData.show_facilities" />
            <div class="mt-[24px] px-[24px]">
                <ListPageTabs class="mb-4"/>
                <p 
                    class="text-sm font-medium"
                    :class="{'w-[260px] hbg-gray-500 htext-gray-500 animate-pulse rounded-[6px]':firstLoading, 'hidden':!firstLoading && facilitiesEmpty}"
                >{{ searchText }}</p>
                <div class="space-y-[24px]">
                    <div class="list-component max-w-[720px] 3xl:max-w-[1218px] flex flex-wrap gap-6 mt-6">
                        <CardListVisible
                            v-if="filter !== 'hidden'"
                            @update:reloadItems="loadFacilities(true)"
                            @click:editFacility="editFacility"
                        />
                        <div v-if="totalHiddenCount && !filter" class="flex items-center mt-6 w-full">
                            <div class="border-b border-gray-300 flex-grow"></div>
                            <p class="text-sm font-medium mx-6">
                                    {{ totalHiddenCount }}
                                    {{ totalHiddenCount > 1 ? 'instalaciones ocultas' : 'instalación oculta' }}
                            </p>
                            <div class="border-b border-gray-300 flex-grow"></div>
                        </div>
                        <CardListHidden
                            v-if="filter !== 'visible'"
                            @update:reloadItems="loadFacilities(true)"
                            @click:editFacility="editFacility"
                        />
                        <CardFacilityListSkeleton 
                            v-for="skeletonCard in skeletonCountByLoad"
                        />
                    </div>
                </div>
            </div>
             
        </div>
        <PanelEdit
            ref="panelEditRef"
            @load:resetPageData="resetPageData()"
        />
    </div>
    
</template>

<script setup>
    import { ref, reactive, onMounted, provide, computed, nextTick, watch } from 'vue';
    import { $throttle, $isElementVisible } from '@/utils/helpers'
    //COMPONENTS
    import BaseTooltipResponsive from '@/components/BaseTooltipResponsive.vue';
    //
    import ListPageBannerShowToGuest from './ListPageBannerShowToGuest.vue';
    import ListPageHeader from './ListPageHeader.vue';
    import ListPageTabs from './ListPageTabs.vue';
    import CardListVisible from './CardListVisible.vue';
    import CardListHidden from './CardListHidden.vue';
    import PanelEdit from './components/PanelEdit.vue';
    import ModalDeleteFacility from './components/ModalDeleteFacility.vue';
    import CardFacilityListSkeleton from "./components/CardFacilityListSkeleton.vue";

    // STATE
    import { useFacilityStore } from '@/stores/modules/facility';
    const facilityStore = useFacilityStore();
    provide('facilityStore', facilityStore);
    //
    import { useHotelStore } from '@/stores/modules/hotel';
    const hotelStore = useHotelStore();
    provide('hotelStore', hotelStore);
    import { useMockupStore } from '@/stores/modules/mockup';
    const mockupStore = useMockupStore();
    // COMPOSABLES
    import { useToastAlert } from '@/composables/useToastAlert'
    const toast = useToastAlert();

    // DATA
    const visibleFacilities = ref([]);
    const hiddenFacilities = ref([]);
    const modalChangePendinginForm = ref(false);
    const totalFacilitiesCount = ref(false);
    const changePendingInForm = ref(false);
    const selectedCard = ref(null);
    const filter = ref(null);
    const newItem = ref({});
    const itemSelected = ref({});
    const modelActive = ref(null);
    const panelEditRef = ref(null);

    const firstLoading = ref(true);
    const loadingData = ref(false);
    const totalVisibleCount = ref(0);
    const totalHiddenCount = ref(0);
    
    const { hotelData } = hotelStore;

    // PROVIDE
    provide('hotelData', hotelData);
    provide('filter', filter);
    provide('modalChangePendinginForm', modalChangePendinginForm);
    provide('changePendingInForm', changePendingInForm);
    
    provide('selectedCard', selectedCard);
    provide('facilitiesEmpty', selectedCard);
    provide('firstLoading', firstLoading);
    //
    provide('facilityStore', facilityStore);
    provide('mockupStore', mockupStore);
    provide('toast', toast);

    // ONMOUNTED
    onMounted(() => {
        loadFacilities();
        loadMockup();
        initScrollListener();
    });

    // COMPUTED
    const facilitiesEmpty = computed(() => {
        return !visibleFacilities.value.length && !hiddenFacilities.value.length;
    });

    const skeletonCountByLoad = computed(() => {
        
        let numberDef = 10;
        if(!firstLoading.value && totalFacilitiesCount.value == 0) return 0;
        let totalLoad = visibleFacilities.value.length + hiddenFacilities.value.length;
        let remaining = totalFacilitiesCount.value - totalLoad;
        if(remaining < 10 && totalFacilitiesCount.value > 0){
            return remaining;
        } 
        return numberDef;
    });

    const searchText = computed(() => {
        let text = "";
        let textVisibles = 'instalaciones visibles';
        let textHiddens = 'instalaciones ocultas';
        let singleHidden = 'ocultas';
        
    
        totalVisibleCount.value == 1 ? textVisibles = 'instalacion visible': '';
        totalHiddenCount.value == 1 ? textHiddens = 'instalación oculta': '';
        totalHiddenCount.value == 1 ? singleHidden = 'oculta': '';

        if(filter.value !== 'hidden'){
            text += `${totalVisibleCount.value} ${textVisibles}`;
        }

        if(!filter.value && filter.value !== 'visible'){
            text += ` y ${totalHiddenCount.value} ${singleHidden}`;
        }

        if(filter.value && filter.value !== 'visible'){
            text += `${totalHiddenCount.value} ${textHiddens}`;
        }

        return text;
    });

    // PROVIDE
    provide('visibleFacilities', visibleFacilities);
    provide('hiddenFacilities', hiddenFacilities);
    provide('modelActive', modelActive);

    watch(modelActive, (valNew, valOld) => {
        if (!valNew && valOld) {
            loadMockup();
        }
    });

    // FUNCTIONS
    function initScrollListener() {
        const container = document.querySelector('#main-content');
        container.addEventListener('scroll', $throttle(checkLoadMore, 300), true);
    }

    function checkLoadMore() {
        const skeletons = document.querySelectorAll('.skeleton-stay-card');
        for (let skeleton of skeletons) {
            if ($isElementVisible(skeleton) && !loadingData.value) {
                loadFacilities()
                break;
            }
        }
        
    }

    function loadMockup (path = '/') {
        mockupStore.$setIframeUrl(`/instalaciones${path}`);
        mockupStore.$setInfo1('Guarda para ver tus cambios en tiempo real', '/assets/icons/info.svg');
        mockupStore.$setLanguageTooltip(true)
    }
    function loadMockupEdit (facilityId) {
        mockupStore.$setIframeUrl(`/instalaciones/${facilityId}`);
    }

    async function loadFacilities (reload = false) {
        loadingData.value = true;
        let totalLoad = visibleFacilities.value.length + hiddenFacilities.value.length;
        let offset = totalLoad;
        let limit = 10;
        if(reload){
            offset = 0;
            limit = totalLoad;
        }
        
        const response = await facilityStore.$getAll({ offset, limit });
        const { ok, data } = response;
        loadingData.value = false;
        firstLoading.value = false;
        console.log('test data',data);
        if(!reload){
            visibleFacilities.value = [...visibleFacilities.value,...data.facilities.filter(filtervisibleFacility)];
            hiddenFacilities.value = [...hiddenFacilities.value,...data.facilities.filter(filterhiddenFacility)];
        }else{
            visibleFacilities.value = data.facilities.filter(filtervisibleFacility);
            hiddenFacilities.value = data.facilities.filter(filterhiddenFacility);
        }
        totalFacilitiesCount.value = data.totalCount;
        totalVisibleCount.value = data.totalVisibleCount;
        totalHiddenCount.value = data.totalHiddenCount;
    }

    function filtervisibleFacility (facility) {
        return facility.select === 1;
    }

    function filterhiddenFacility (facility) {
        return facility.select === 0;
    }

    function editFacility (payload) {
        if (changePendingInForm.value) {
            openModalChangeInForm();
            return;
        }
        modelActive.value = payload.action;
        nextTick(() => {
            if (payload.action === 'EDIT') {
                loadMockup(`/${payload.facility.id}`);
            } else {
                loadMockup('/fakedetail');
            }
            panelEditRef.value.editFacility(payload);
        });
    }

    function openModalChangeInForm () {
        modalChangePendinginForm.value = true;
        nextTick(() => {
            modalChangePendinginForm.value = false;
        });
    }

    function resetPageData () {
        changePendingInForm.value = false;
        //mockupStore.$reloadIframe();
        loadMockup();
        loadFacilities(true);
        filter.value = null;

    }


</script>