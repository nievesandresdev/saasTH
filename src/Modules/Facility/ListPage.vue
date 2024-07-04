<template>
    <div class="h-screen bg-[#FAFAFA]">
        <div class="pb-[104px]">
            <ListPageHeader />
            <ListPageBannerShowToGuest />
            <div class="mt-[24px] px-[24px]">
                <ListPageTabs class="mb-4"/>
                <p v-if="!facilitiesEmpty" class="text-sm font-medium">{{ searchText }}</p>
                <!-- <p class="text-sm font-medium">{{ visibleFacilities.length }} instalaciones visibles y {{ hiddenFacilities.length }} ocultas</p> -->
                <ListPageListVisible v-if="filter !== 'hidden'" @update:reloadItems="loadFacilities()" />
                <!-- <p class="text-sm font-medium my-6 text-center max-w-[720px] 3xl:max-w-[1218px]">{{ hiddenFacilities.length }} instalaciones ocultas</p> -->
                <div v-if="hiddenFacilities.length && !filter" class="flex items-center mt-6 w-full">
                    <div class="border-b border-gray-300 flex-grow"></div>
                    <p class="text-sm font-medium mx-6">
                            {{ hiddenFacilities.length }}
                            {{ hiddenFacilities.length > 1 ? 'instalaciones ocultas' : 'instalacion oculta' }}
                    </p>
                    <div class="border-b border-gray-300 flex-grow"></div>
                </div>
                <ListPageListHidden v-if="filter !== 'visible'" @update:reloadItems="loadFacilities()" />
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, reactive, onMounted, provide, computed } from 'vue';
    //COMPONENTS
    import BaseTooltipResponsive from '@/components/BaseTooltipResponsive.vue';
    //
    import ListPageBannerShowToGuest from './ListPageBannerShowToGuest.vue';
    import ListPageHeader from './ListPageHeader.vue';
    import ListPageTabs from './ListPageTabs.vue';
    import ListPageListVisible from './ListPageListVisible.vue';
    import ListPageListHidden from './ListPageListHidden.vue';

    // STATE
    import { useFacilityStore } from '@/stores/modules/facility';
    const facilityStore = useFacilityStore();
    provide('facilityStore', facilityStore);

    // DATA
    const visibleFacilities = ref([]);
    const hiddenFacilities = ref([]);
    const changePending = ref(false);
    const modalAdd = ref(false);
    const selectedCard = ref(null);
    const filter = ref(null);

    // PROVIDE
    provide('filter', filter);
    provide('changePending', changePending);
    provide('modalAdd', modalAdd);
    provide('selectedCard', selectedCard);
    provide('facilitiesEmpty', selectedCard);

    // ONMOUNTED
    onMounted(() => {
        loadFacilities();
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
        hiddenFacilities.value.length == 1 ? textHiddens = 'instalacion oculta': '';
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

    // FUNCTIONS
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

</script>