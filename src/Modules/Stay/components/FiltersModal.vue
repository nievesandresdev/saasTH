<template>
    <Modal :isVisible="true" width="341px" footer>
        <template #content>
            <div class="flex items-center justify-between">
                <h1 class="text-lg font-medium leading-[110%]">Filtros</h1>
                <button>
                    <img class="w-5 h-5" src="/assets/icons/1.TH.CLOSE.svg" alt="">
                </button>
            </div>
            <!-- dropdown filter -->
            <div class="mt-4">
                <p class="text-sm font-medium leading-[110%] mb-2">Estado de la estancia</p>
                <BaseSelectField
                    id="stay-status"
                    :textLabel="'Elige categoría'"
                    v-model="allFilter"
                    :options="allFilterOptions"
                    mandatory
                />
            </div>
            <!-- checkbox list filters -->
            <div class="mt-6">
                <p class="text-base font-medium leading-[110%]">Momento</p>
                <div class="mt-2 flex justify-between items-center">
                    <p class="text-sm font-medium leading-[140%]">Todas</p>
                    <Checkbox v-model="anyField"/>
                </div>
                <div class="pl-4">
                    <div class="mt-2 flex justify-between items-center" v-for="period in  ['pre-stay','stay','post-stay']">
                        <span 
                            class="p-2 h-6 rounded-full text-[10px] font-semibold leading-[100%] uppercase"
                            :class="bgPeriod[period]"
                        >
                            {{ period }}
                        </span>
                        <Checkbox v-model="anyField"/>
                    </div>
                </div>
            </div>
        </template>
        <template #footer>
            <div class="border-t hborder-gray-400 py-4 px-6 flex items-center justify-between">
                <p class="text-sm font-medium leading-[110%] underline cursor-pointer">Restablecer</p>
                <button class="px-4 py-3 text-sm font-medium leading-[110%] hbtn-primary">
                    Aplicar filtros
                </button>
            </div>
        </template>
    </Modal>
</template>
<script setup>
import { computed, ref } from 'vue'
import Modal from '@/components/ModalWindow.vue'
import BaseSelectField from '@/components/Forms/BaseSelectField.vue';
import Checkbox from '@/components/Forms/Checkbox.vue';

const allFilter = ref('all')
const anyField = ref(false)
const bgPeriod = {
    'pre-stay':'bg-[#D9E8F2]',
    'stay':'bg-[#D9F2E9]',
    'post-stay':'bg-[#F2F2F2]',
} 

const allFilterOptions = computed(()=>{
    let options = [
        { value: 'all', label: "Todas" },
        { value: 'pendings', label: "Pendientes" }
    ];
    return options;
});
</script>