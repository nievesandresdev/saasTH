<template>
    <div class="flex mt-4">
        <div
            class="px-4 py-2 text-sm font-medium leading-[110%] rounded-[6px] cursor-pointer"
            :class="{
                'htext-gray-500':facilitiesEmpty && !firstLoading, 
                'border hborder-green-700 hbg-green-200 htext-green-600' : filter === 1 && !firstLoading, 
                'border htext-black-100 hborder-gray-400 htext-gray-500' : filter !== 1 && !firstLoading,
                'hbg-gray-500 htext-gray-500 animate-pulse' : firstLoading,
            }"
            @click="changeVisibility(1)"
            :disabled="facilitiesEmpty"
        >
            Visibles
        </div>
        <div 
            class=" px-4 py-2 text-sm font-medium leading-[110%] rounded-[6px] ml-4 cursor-pointer"
            :class="{
                'htext-gray-500':facilitiesEmpty, 
                'border hborder-green-700 hbg-green-200 htext-green-600' : filter === 0 && !firstLoading, 
                'border htext-black-100 hborder-gray-400 htext-gray-500' : filter !== 0 && !firstLoading,
                'hbg-gray-500 htext-gray-500 animate-pulse' : firstLoading,
            }"
            @click="changeVisibility(0)"
            :disabled="facilitiesEmpty"
        >
            Ocultas
        </div>
    </div>
</template>

<script setup>
    import { ref, reactive, onMounted, provide, computed, inject, nextTick } from 'vue';

    const emit = defineEmits(['update:reloadItems']);

    // INJECT
    const filter = inject('filter');
    const changePending = inject('changePending');
    const modalAdd = inject('modalAdd');
    const selectedCard = inject('selectedCard');
    const facilitiesEmpty = inject('facilitiesEmpty');
    const modalChangePendinginForm = inject('modalChangePendinginForm');
    const changePendingInForm = inject('changePendingInForm');
    //
    const hotelStore = inject('hotelStore');
    const firstLoading = inject('firstLoading');

    // FUNCTIONS

    function changeVisibility (visibility) {
        if (changePendingInForm.value) {
            openModalChangeInForm();
            return;
        }
        // modalAdd.value =false;
        selectedCard.value = null;
        if(filter.value === visibility){
            filter.value = null;
        }else{
            filter.value = visibility;    
        }
        emit('update:reloadItems')
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