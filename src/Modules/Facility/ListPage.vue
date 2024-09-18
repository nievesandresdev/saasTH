<template>
    <div class="h-screen bg-[#FAFAFA]">
        <div class="pb-[104px]">
            <ListPageHeader />
            <ListPageBannerShowToGuest v-if="!hotelData.show_facilities" />
            <div class="mt-[24px] px-[24px]">
                <ListPageTabs class="mb-4"/>
                <p v-if="!facilitiesEmpty" class="text-sm font-medium">{{ searchText }}</p>
                <!-- <p class="text-sm font-medium">{{ visibleFacilities.length }} instalaciones visibles y {{ hiddenFacilities.length }} ocultas</p> -->
                <ListPageListVisible
                    v-if="filter !== 'hidden'"
                    @update:reloadItems="loadFacilities"
                    @click:editFacility="editFacility"
                />
                <!-- <p class="text-sm font-medium my-6 text-center max-w-[720px] 3xl:max-w-[1218px]">{{ hiddenFacilities.length }} instalaciones ocultas</p> -->
                <div v-if="hiddenFacilities.length && !filter" class="flex items-center mt-6 w-full">
                    <div class="border-b border-gray-300 flex-grow"></div>
                    <p class="text-sm font-medium mx-6">
                            {{ hiddenFacilities.length }}
                            {{ hiddenFacilities.length > 1 ? 'instalaciones ocultas' : 'instalación oculta' }}
                    </p>
                    <div class="border-b border-gray-300 flex-grow"></div>
                </div>
                <ListPageListHidden
                    v-if="filter !== 'visible'"
                    @update:reloadItems="loadFacilities()"
                    @click:editFacility="editFacility"
                />
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
    //COMPONENTS
    import BaseTooltipResponsive from '@/components/BaseTooltipResponsive.vue';
    //
    import ListPageBannerShowToGuest from './ListPageBannerShowToGuest.vue';
    import ListPageHeader from './ListPageHeader.vue';
    import ListPageTabs from './ListPageTabs.vue';
    import ListPageListVisible from './ListPageListVisible.vue';
    import ListPageListHidden from './ListPageListHidden.vue';
    import PanelEdit from './components/PanelEdit.vue';
    import ModalDeleteFacility from './components/ModalDeleteFacility.vue';

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
    const changePendingInForm = ref(false);
    const selectedCard = ref(null);
    const filter = ref(null);
    const newItem = ref({});
    const itemSelected = ref({});
    const modelActive = ref(null);
    const panelEditRef = ref(null);
    const { hotelData } = hotelStore;

    // PROVIDE
    provide('hotelData', hotelData);
    provide('filter', filter);
    provide('modalChangePendinginForm', modalChangePendinginForm);
    provide('changePendingInForm', changePendingInForm);
    
    provide('selectedCard', selectedCard);
    provide('facilitiesEmpty', selectedCard);
    //
    provide('facilityStore', facilityStore);
    provide('mockupStore', mockupStore);
    provide('toast', toast);

    // ONMOUNTED
    onMounted(() => {
        loadFacilities();
        loadMockup();
    });

    // COMPUTED
    const facilitiesEmpty = computed(() => {
        return !visibleFacilities.value.length && !hiddenFacilities.value.length;
    });

    const searchText = computed(() => {
        let text = "";
        let textVisibles = 'instalaciones visibles';
        let textHiddens = 'instalaciones ocultas';
        let singleHidden = 'ocultas';

        visibleFacilities.value.length == 1 ? textVisibles = 'instalacion visible': '';
        hiddenFacilities.value.length == 1 ? textHiddens = 'instalación oculta': '';
        hiddenFacilities.value.length == 1 ? singleHidden = 'oculta': '';

        if(filter.value !== 'hidden'){
            text += `${visibleFacilities.value.length} ${textVisibles}`;
        }

        if(!filter.value && filter.value !== 'visible'){
            text += ` y ${hiddenFacilities.value.length} ${singleHidden}`;
        }

        if(filter.value && filter.value !== 'visible'){
            text += `${hiddenFacilities.value.length} ${textHiddens}`;
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

    function loadMockup (path = '/') {
        mockupStore.$setIframeUrl(`/instalaciones${path}`);
        mockupStore.$setInfo1('Guarda para ver tus cambios en tiempo real', '/assets/icons/info.svg');
        mockupStore.$setLanguageTooltip(true)
    }
    function loadMockupEdit (facilityId) {
        mockupStore.$setIframeUrl(`/instalaciones/${facilityId}`);
    }

    async function loadFacilities () {
        const response = await facilityStore.$getAll();
        const { ok, data } = response;
        visibleFacilities.value = data.filter(filtervisibleFacility);
        hiddenFacilities.value = data.filter(filterhiddenFacility);
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
        // console.log(panelEditRef.value, 'panelEditlRef');
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
        loadFacilities();
        filter.value = null;

    }


</script>