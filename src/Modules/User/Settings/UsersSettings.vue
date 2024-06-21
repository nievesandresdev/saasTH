<template>
    <div class="px-6">
        <h1 class="text-[22px] font-medium leading-[110%] py-5">Equipo</h1>
        <MenuSettings />
        <div class="flex justify-between items-center mt-6">
            <div class="relative flex w-1/3" ref="ref_dropdown_container" :class="{'mb-4':data_filter.search_terms}">
                <input
                    type="text"
                    class="pl-10 text-sm border border-[#BFBFBF] h-11 rounded w-full"
                    placeholder="Buscar por nombre o por puesto"
                    v-model="formFilter.search_terms"
                    :class="{'border-dark':formFilter.search_terms}"
                    @keyup.prevent="filter_search()"
                    @keypress.enter="submit_filters"
                >
                <div class="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg class="w-6 h-6 text-[#333333] dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
            </div>
            <button class="flex items-center px-4 py-2 text-black border border-[#333333] rounded hover:bg-gray-100" @click="createUser">
                <img src="/assets/icons/1.TH.PLUS.svg" class="w-4 h-4 mr-2" alt="plus icon">
                Crear usuario
            </button>
        </div>
    </div>

    <CreateUser :modal_add="modal_add" @close="closeModal" />
</template>

<script setup>
import { ref } from 'vue';
import MenuSettings from './components/MenuSettings.vue';
import CreateUser from './components/CreateUser.vue';

const modal_add = ref(false);
const visibleDropdown = ref(null);

const data_filter = ref ({
    search_terms: ''
});

const formFilter = ref({
    search_terms: ''
});

const submit_filters = () => {
    console.log('submit_filters');
}

const createUser = () => {
    modal_add.value = true
    visibleDropdown.value = null
    console.log('createUser',modal_add.value);
}

const closeModal = () => {
    modal_add.value = false
}
</script>
