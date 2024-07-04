<template>
    <div class="h-screen bg-[#FAFAFA]">
        <div class="pb-[104px]">
            <ListPageHeader />
            <ListPageBannerShowToGuest />
            <div class="mt-[24px] px-[24px]">
                <ListPageTabs class="mb-4"/>
                <p class="text-sm font-medium">{{ visibleFacilities.length }} instalaciones visibles y {{ hiddenFacilities.length }} ocultas</p>
                <ListPageListVisible @update:reloadItems="loadFacilities()" />
                <p class="text-sm font-medium my-6 text-center w-full xl:max-w-[639px] 3xl:max-w-[1083px]">{{ hiddenFacilities.length }} instalaciones ocultas</p>
                <ListPageListHidden @update:reloadItems="loadFacilities()" />
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

    // ONMOUNTED
    onMounted(() => {
        loadFacilities();
    });

    // COMPUTED

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