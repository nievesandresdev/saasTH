<template>
    <section class="sticky top-0 hbg-white-100 z-[40]  w-full hbg-gray-100">
        <div class="flex justify-between py-[20px] border-b border-[#BFBFBF] mx-[24px]">
            <div class="space-x-2 flex">
                <h1 class="font-medium text-[22px]">Servicios - Actividades turísticas</h1>
            </div>
            <SwichShowTypeExperience />
        </div>
    </section>
</template>

<script setup>
    import { ref, reactive, onMounted, provide, computed, inject, watch } from 'vue';
    import { $capitalizeFirstLetter } from '@/utils/textWritingTypes';
    //COMPONENTS
    import BaseTooltipResponsive from '@/components/BaseTooltipResponsive.vue';
    import BaseSwichInput from "@/components/Forms/BaseSwichInput.vue";
    import SwichShowTypeExperience from "./components/SwichShowTypeExperience.vue";
    //

    const emits = defineEmits(['changeCategory']);

    // STORE
    
    //
    // const hotelStore = inject('hotelStore');
    // const mockupStore = inject('mockupStore');
    // const toast = inject('toast');
    // const hotelData = inject('hotelData');
    // const formFilter = inject('formFilter');
    // //
    // const categoriplaces = inject('categoriplaces');
    // const categoryCurrent = inject('categoryCurrent');
    // const typePlaceCurrent = inject('typePlaceCurrent');
    // const visibilityTypePlace = inject('visibilityTypePlace');

    // DATA


    
    // FUNCTION

</script>