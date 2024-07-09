<template>
    <Modal :isVisible="openFiltersModal" width="341px" footer>
        <template #content>
            <div class="flex items-center justify-between">
                <h1 class="text-lg font-medium leading-[110%]">Filtros</h1>
                <button @click="openFiltersModal = false">
                    <img class="w-5 h-5" src="/assets/icons/1.TH.CLOSE.svg" alt="">
                </button>
            </div>
            <!-- dropdown filter -->
            <div class="mt-4">
                <p class="text-sm font-medium leading-[110%] mb-2">Estado de la estancia</p>
                <BaseSelectField
                    id="stay-status"
                    :textLabel="'Elige categoría'"
                    v-model="dropdownFilter"
                    :options="allFilterOptions"
                    mandatory
                />
            </div>
            <!-- checkbox list filters -->
            <div class="mt-6">
                <p class="text-base font-medium leading-[110%]">Momento</p>
                <div class="mt-2 flex justify-between items-center">
                    <p class="text-sm font-medium leading-[140%]">Todas</p>
                    <Checkbox v-model="allChecked" @change="handleAllChecked"/>
                </div>
                <div class="pl-4">
                    <div class="mt-2 flex justify-between items-center" v-for="period in  ['pre-stay','in-stay','post-stay']">
                        <span 
                            class="p-2 h-6 rounded-full text-[10px] font-semibold leading-[100%] uppercase"
                            :class="bgPeriod[period]"
                        >
                            {{ period }}
                        </span>
                        <Checkbox v-model="filters[period]"/>
                    </div>
                </div>
            </div>
        </template>
        <template #footer>
            <div class="border-t hborder-gray-400 py-4 px-6 flex items-center justify-between">
                <button 
                    class="text-sm font-medium leading-[110%] underline"
                    @click="resetFilters"
                    :class="{'opacity-50':!toReset}"
                    :disabled="!toReset"
                >
                Restablecer
                </button>

                <button 
                    class="px-4 py-3 text-sm font-medium leading-[110%] hbtn-primary"
                    @click="submit"
                    :class="{'opacity-50':allFiltersDeselected || !changes}"
                    :disabled="allFiltersDeselected || !changes"
                >
                    Aplicar filtros
                </button>
            </div>
        </template>
    </Modal>
</template>
<script setup>
import { computed, ref, watch, inject, defineExpose } from 'vue'
import Modal from '@/components/ModalWindow.vue'
import BaseSelectField from '@/components/Forms/BaseSelectField.vue';
import Checkbox from '@/components/Forms/Checkbox.vue';

const emit = defineEmits(['submit']);

const openFiltersModal = inject('openFiltersModal');
const bgPeriod = inject('bgPeriod');
const totalCounts = inject('totalCounts');
const pendingCount = inject('pendingCount');
const activeFilters = ref([])
const dropdownFilter = ref('all')
const dropdownFilterApplied = ref('all')
const allChecked = ref(true); // Asume que inicialmente todos los checkboxes están seleccionados
const filters = ref({
    'pre-stay': true,
    'in-stay': true,
    'post-stay': true,
});
const appliedFilters = ref({
    'pre-stay': true,
    'in-stay': true,
    'post-stay': true,
});

function handleAllChecked(){
    if (allChecked.value) {
        for (let period in filters.value) {
            filters.value[period] = true;
        }
    } else {
        for (let period in filters.value) {
            filters.value[period] = false;
        }
    }
}

watch(filters, (newFilters) => {
    allChecked.value = Object.values(newFilters).every(Boolean);
}, { deep: true });

function applyFilters() {
    updateFiltersBasedOnCheckboxStates();
}

function updateFiltersBasedOnCheckboxStates() {
    for (const [filterName, isActive] of Object.entries(filters.value)) {
        updateFilter(filterName, isActive);
    }
}

function updateFilter(filterName, isActive) {
    const index = activeFilters.value.indexOf(filterName);
    if (isActive && index === -1) {
        activeFilters.value.push(filterName);
    } else if (!isActive && index !== -1) {
        activeFilters.value.splice(index, 1);
    }
}

function submit() {
    activeFilters.value = [];
    applyFilters();
    appliedFilters.value = JSON.parse(JSON.stringify(filters.value))
    dropdownFilterApplied.value = dropdownFilter.value;
    emit('submit', [activeFilters.value, dropdownFilter.value]);
}

function resetFilters() {
    allChecked.value = true;
    dropdownFilter.value = 'all';
    handleAllChecked();
    submit();
}
const allFilterOptions = computed(() => {
    let options = [
        { value: 'all', label: `Todas (${totalCounts.value})` },
        { value: 'pending', label: `Pendientes (${pendingCount.value})` }
    ];
    return options;
});

const allFiltersDeselected = computed(() => {
    // Comprueba si todos los valores de los filtros son falsos
    return Object.values(filters.value).every(value => value === false);
});

const changes = computed(() => {
    let chgs = JSON.stringify(filters.value) !== JSON.stringify(appliedFilters.value) || dropdownFilter.value !== dropdownFilterApplied.value;
    return chgs;
});

const toReset = computed(() => {
    let treset = !allChecked.value || dropdownFilter.value !== 'all';
    console.log('treset',treset)
    return treset;
});

defineExpose({
  resetFilters
});
</script>

