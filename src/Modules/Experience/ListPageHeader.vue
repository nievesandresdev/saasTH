<template>
    <section class="sticky top-0 hbg-white-100 z-[100]  w-full">
        <div class="flex justify-between py-[20px] border-b border-[#BFBFBF] mx-[24px]">
            <div class="space-x-2 flex">
                <h1 class="font-medium text-[22px]">Experiencias</h1>
                <BaseTooltipResponsive
                    size="l"
                    :top="55"
                    :left="-0"
                >
                    <template #button>
                        <img class="w-[24px] h-[24px]" src="/assets/icons/TH.INFO.GREEN.svg">
                        </template>
                        <template #content>
                        <p class="text-sm leading-[150%] font-normal">
                            Aquí podrás gestionar, recomendar y ofrecer la información esencial de las Experiencias que mostrarás a tus huéspedes en tu WebApp.
                        </p>
                    </template>
                </BaseTooltipResponsive>
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