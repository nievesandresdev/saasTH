<template>
    <div class="bg-[#FAFAFA]" :class="userStore.showSuscriptionBanner ? 'h-with-banner' : 'h-without-banner'">
        <!-- <h1 class="bg-red-100 p-4 fixed z-[33000] top-10 left-10">{{ String(filter) }}</h1> -->
        <div class="pb-[104px]">
            <ListPageHeader />
            <ListPageBannerShowToGuest v-if="!hotelData.show_facilities" />
            <div class="mt-[24px] px-[24px]">
                <ListPageTabs class="mb-4" @update:reloadItems="loadFacilities(true, true)"/>
                <p 
                    class="text-sm font-medium"
                    :class="{'w-[260px] hbg-gray-500 htext-gray-500 animate-pulse rounded-[6px]':firstLoading, 'hidden':!firstLoading && facilitiesEmpty}"
                >{{ searchText }}</p>
                <div class="space-y-[24px]">
                    <div class="list-component max-w-[720px] 3xl:max-w-[1218px] flex flex-wrap gap-6 mt-6">
                        <CardListVisible
                            v-if="filter !== 0"
                            @update:reloadItems="loadFacilities(true)"
                            @click:editFacility="editFacility"
                        />
                        <div v-if="hiddenFacilities.length && filter == null" class="flex items-center mt-6 w-full">
                            <div class="border-b border-gray-300 flex-grow"></div>
                            <p class="text-sm font-medium mx-6">
                                    {{ totalHiddenCount }}
                                    {{ totalHiddenCount > 1 ? 'instalaciones ocultas' : 'instalación oculta' }}
                            </p>
                            <div class="border-b border-gray-300 flex-grow"></div>
                        </div>
                        <CardListHidden
                            v-if="filter !== 1"
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
    import { useUserStore } from '@/stores/modules/users/users'
    const userStore = useUserStore();
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
    const numberCardsDefault = ref(10);
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
        if(window.screen.width > 1919){
            numberCardsDefault.value = 14
        }
        
        loadFacilities();
        loadMockup();
        initScrollListener();
    });

    // COMPUTED
    const facilitiesEmpty = computed(() => {
        return !visibleFacilities.value.length && !hiddenFacilities.value.length;
    });

    const skeletonCountByLoad = computed(() => {
        
        let numberDef = numberCardsDefault.value;
        if(!firstLoading.value && totalFacilitiesCount.value == 0) return 0;
        let totalLoad = visibleFacilities.value.length + hiddenFacilities.value.length;
        let remaining = totalFacilitiesCount.value - totalLoad;
        if(remaining < numberCardsDefault.value && totalFacilitiesCount.value > 0){
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

        if(filter.value !== 0){
            text += `${totalVisibleCount.value} ${textVisibles}`;
        }

        if(filter.value == null){
            text += ` y ${totalHiddenCount.value} ${singleHidden}`;
        }

        if(filter.value == 0){
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
        mockupStore.$setIframeUrl(`/alojamiento/instalaciones${path}`);
        mockupStore.$setInfo1('Guarda para ver tus cambios en tiempo real', '/assets/icons/info.svg');
        mockupStore.$setLanguageTooltip(true)
    }
    function loadMockupEdit (facilityId) {
        mockupStore.$setIframeUrl(`/ver-instalacion/${facilityId}`);
    }

    async function loadFacilities (reload = false,resetList = false) {
        loadingData.value = true;
        let totalLoad = visibleFacilities.value.length + hiddenFacilities.value.length;
        let offset = totalLoad;
        let limit = numberCardsDefault.value;
        if(reload){
            offset = 0;
            limit = totalLoad;
        }
        if(resetList){
            // firstLoading.value = true;
            visibleFacilities.value = [];
            hiddenFacilities.value = [];
            limit = numberCardsDefault.value;
        }
        let visible = filter.value;
        let params = { offset, limit, visible };
        // console.log('test params',params)
        const response = await facilityStore.$getAll(params);
        const { ok, data } = response;
        loadingData.value = false;
        firstLoading.value = false;
        // console.log('test data',data);
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
                loadMockupEdit(`${payload.facility.id}`);
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
        loadFacilities(true, true);
    }


</script>