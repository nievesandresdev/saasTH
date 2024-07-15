<template>
    <section class="sticky top-0 hbg-white-100 z-[100]">
        <div class="flex justify-between py-[20px] px-[24px]">
            <div class="space-x-2 flex">
                <h1 class="font-medium text-[22px]">Destino - {{ categoryCurrent?.name_type_place }}</h1>
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
                            Aquí podrás gestionar, recomendar y ofrecer la información esencial de los Destinos que mostrarás a tus huéspedes en tu WebApp.
                        </p>
                    </template>
                </BaseTooltipResponsive>
            </div>
            <SwichShowTypePlace />
        </div>
        <div
            v-if="!visibilityTypePlace"
            class="w-full h-[48px] bg-[#FFF3CC] text-center py-[14px] htext-black-100 text-sm font-medium"
        >
            La sección <span class="font-semibold">{{ categoryCurrent?.name_type_place }}</span> está oculta y no es visible para tus huéspedes. Activa "Mostrar al huésped" para hacerla visible.
        </div>
        <ul
            class="flex space-x-2 border-b border-[#BFBFBF] mx-[24px]"
        >
            <li
                v-for="(category ,index) in categoriplaces"
                :key="index"
                class="cursor-pointer px-4 pt-4 rounded-t-[10px] flex flex-col"
                :class="formFilter.selected_subplace === category.id ? 'hbg-green-200' : ''"
                @click="changeCategory(category)"
            >
                    <span
                    class="text-base font-semibold"
                    :class="formFilter.selected_subplace === category.id ? 'htext-green-800 pb-[8px]' : 'htext-black-100'"
                >
                        {{ $capitalizeFirstLetter(category.name) }}
                </span>
                <span class="w-full h-[3px] rounded-full" :class="formFilter.selected_subplace === category.id ? 'hbg-green-800' : 'bg-white'" />
            </li>
        </ul>
    </section>
</template>

<script setup>
    import { ref, reactive, onMounted, provide, computed, inject } from 'vue';
    import { $capitalizeFirstLetter } from '@/utils/textWritingTypes';
    //COMPONENTS
    import BaseTooltipResponsive from '@/components/BaseTooltipResponsive.vue';
    import BaseSwichInput from "@/components/Forms/BaseSwichInput.vue";
    import SwichShowTypePlace from "./components/SwichShowTypePlace.vue";
    //

    const emits = defineEmits(['changeCategory']);

    // STORE
    
    //
    const hotelStore = inject('hotelStore');
    const mockupStore = inject('mockupStore');
    const toast = inject('toast');
    const hotelData = inject('hotelData');
    const formFilter = inject('formFilter');
    //
    const categoriplaces = inject('categoriplaces');
    const categoryCurrent = inject('categoryCurrent');
    const visibilityTypePlace = inject('visibilityTypePlace');

    // DATA
    const tabs = ref([
        {name: 'monumentos'},
        {name: 'museos'},
        {name: 'naturaleza'},
    ]);
    const tabSelected = ref(0);

    // COMPUTED


    // FUNCTIONS
    function changeCategory (category) {
        emits('changeCategory', category);
    }
    async function updateVisivilityPlaces () {
        const response = await hotelStore.$updateVisivilityPlaces();
        // console.log(response, 'response');
        const { ok, data } = response;
        await hotelStore.reloadHotel();
        if (ok) {
            toast.warningToast('Cambios guardados con éxito','top-right');
        } else {
            toast.warningToast(data?.message,'top-right');
        }
        mockupStore.$reloadIframe();
    }
</script>