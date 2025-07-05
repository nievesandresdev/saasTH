<template>
    <div class="flex mt-4">
        <div
         
            class="px-4 py-2 text-sm font-medium leading-[110%] rounded-[6px] cursor-pointer flex items-center"
            :class="{'border hborder-green-700 hbg-green-200 htext-green-600' : formFilter.visibility === 'own', 'border htext-black-100 hborder-black-100 htext-gray-500 bg-white' : formFilter.visibility !== 'own'}"
            @click="changeVisibility('own')"
        >
            Propias
        </div>
        <div
         
            class="px-4 py-2 text-sm font-medium leading-[110%] rounded-[6px] ml-4 cursor-pointer flex items-center"
            :class="{'border hborder-green-700 hbg-green-200 htext-green-600' : formFilter.visibility === 'viator', 'border htext-black-100 hborder-black-100 htext-gray-500 bg-white' : formFilter.visibility !== 'viator'}"
            @click="changeVisibility('viator')"
        >
            <img class="h-4 w-4 mr-2" src="/assets/icons/1.TH.VIATOR.LOGO.svg" alt="Warning">
            Viator
        </div>
        <div
         
            class="px-4 py-2 text-sm font-medium leading-[110%] rounded-[6px] ml-4 cursor-pointer"
            :class="{'border hborder-green-700 hbg-green-200 htext-green-600' : formFilter.visibility === 'visible', 'border htext-black-100 hborder-black-100 htext-gray-500 bg-white' : formFilter.visibility !== 'visible'}"
            @click="changeVisibility('visible')"
        >
            Visibles
        </div>
        <div 
            class=" px-4 py-2 text-sm font-medium leading-[110%] rounded-[6px] ml-4 cursor-pointer"
            :class="{'border hborder-green-700 hbg-green-200 htext-green-600' : formFilter.visibility === 'hidden', 'border htext-black-100 hborder-black-100 htext-gray-500 bg-white' : formFilter.visibility !== 'hidden'}"
            @click="changeVisibility('hidden')"
        >
            Ocultas
        </div>
        <div 
            class=" px-4 py-2 text-sm font-medium leading-[110%] rounded-[6px] ml-4 cursor-pointer"
            :class="{'border hborder-green-700 hbg-green-200 htext-green-600' : formFilter.visibility === 'recommendated', 'border htext-black-100 hborder-black-100 htext-gray-500 bg-white' : formFilter.visibility !== 'recommendated'}"
            @click="changeVisibility('recommendated')"
        >
            Recomendados
        </div>
    </div>
</template>

<script setup>
    import { ref, reactive, onMounted, provide, computed, inject, nextTick } from 'vue';

    const emits = defineEmits(['reloadExperiences']);

    // DATA
    

    // INJECT
    const filter = inject('filter');
    const changePending = inject('changePending');
    const modalAdd = inject('modalAdd');
    const selectedCard = inject('selectedCard');
    const facilitiesEmpty = inject('facilitiesEmpty');
    const modalChangePendinginForm = inject('modalChangePendinginForm');
    const changePendingInForm = inject('changePendingInForm');
    const formFilter = inject('formFilter');
    //
    const hotelStore = inject('hotelStore');

    // FUNCTIONS

    

    function changeVisibility (visibility) {
        if (changePendingInForm.value) {
            openModalChangeInForm();
            return;
        }
        if(formFilter.visibility?.includes(visibility)){
            formFilter.visibility = null
        }else{
            formFilter.visibility = visibility;
        }
        emits('reloadExperiences');
    }

    function changeRecommented () {
        formFilter.recommendated = !formFilter.recommendated;
        emits('reloadExperiences');
    }

    function openModalChangeInForm () {
        modalChangePendinginForm.value = true;
        nextTick(() => {
            modalChangePendinginForm.value = false;
        });
    }


    

</script>

<style lang="scss" scoped>

</style>