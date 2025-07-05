<template>
    <div class="flex mt-4">
        <div
         
            class="px-4 py-2 text-sm font-medium leading-[110%] rounded-[6px] cursor-pointer"
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
    </div>
</template>

<script setup>
    import { ref, reactive, onMounted, provide, computed, inject, nextTick } from 'vue';

    const emits = defineEmits(['reloadData']);

    // DATA
    

    // INJECT
    const modalChangePendinginForm = inject('modalChangePendinginForm');
    const changePendingInForm = inject('changePendingInForm');
    const formFilter = inject('formFilter');

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
        emits('reloadData');
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