<template>
<ModalWindow v-if="isOpenModelFilter" :isVisible="isOpenModelFilter"  :width="'344px'" padding-content="" footer="true">
    <template #content>
        <div class="">
            <div class="p-4 flex justify-between border-b hborder-gray-400">
                <h2 class="text-[18px] font-medium">Filtros</h2>
                <button @click="closeModalFilter">
                    <img src="/assets/icons/1.TH.CLOSE.svg" alt="1.TH.CLOSE">
                </button>
            </div>
            <div class="space-y-4 p-4 w-full overflow-scroll overflow-x-hidden" style="max-height:27rem">
                <div class="">
                    <label class="mb-2 text-base font-medium block htext-black-100">
                        Estado de la reseña
                    </label>
                    <BaseSelectField
                        v-model="formModalFilter.statusResponse"
                        :id="'statusResponse'"
                        :textLabel="'Elige estatus'"
                        :options="statusResponse"
                        mandatory
                        :error="false"
                        focusedAlweys
                    />
                </div>
                <div class="">
                    <label class="mb-2 text-base font-medium block htext-black-100">
                        Puntuaciones
                    </label>
                    <BaseSelectField
                        v-model="formModalFilter.scoreRange"
                        :id="'scoreRange'"
                        :textLabel="'Elige puntuación'"
                        :options="scoreRanges"
                        mandatory
                        :error="false"
                        focusedAlweys
                    />
                </div>
                <div class="">
                    <label class="mb-2 text-base font-medium block htext-black-100">
                        Idioma original de la reseña
                    </label>
                    <BaseSelectField
                        v-model="formModalFilter.language"
                        :id="'scoreRange'"
                        :textLabel="'Elige idioma'"
                        :options="languages"
                        mandatory
                        :error="false"
                        focusedAlweys
                    />
                </div>
                <div class="">
                    <label class="mb-2 text-base font-medium block htext-black-100">
                        Plataformas externas
                    </label>
                    <div class="space-y-2">
                        <div  class="flex justify-between items-center">
                            <span class="text-sm font-medium">Todas</span>
                            <input
                                :checked="(formModalFilter.otas.length == reviewStore.numbersOtasWithUrls) && (formModalFilter.otas.length == reviewStore.otas.length)"
                                :disabled="formModalFilter.otas.length != reviewStore.otas.length"
                                type="checkbox"
                                class="w-5 h-5 rounded mr-2 hcheckbox"
                                @change="selectedAllOtas"
                            >
                        </div>
                        <div
                            v-for="(ota, index) in reviewStore.otas"
                            class=""
                        >
                            <div class="flex justify-between items-center">
                                <div class="flex items-center space-x-[4px]">
                                    <div class="flex items-center space-x-[4px]" :class="{'opacity-30': !reviewStore.otasWithUrls.includes(ota)}">
                                        <img class="w-4 h-4" :src="`/assets/icons/otas/${$titleCase(ota)}.svg`">
                                        <span class="text-sm font-medium">{{  ota === 'tripadvisor' ? 'TripAdvisor' : $titleCase(ota) }}</span>
                                    </div>
                                    <template v-if="!reviewStore.otasWithUrls.includes(ota)">
                                        <BaseTooltipResponsive
                                            size="xs"
                                            :top="-130"
                                            :left="0"
                                        >
                                            <template #button>
                                                <img class="w-[24px] h-[24px]" src="/assets/icons/TH.INFO.GREEN.svg">
                                            </template>
                                            <template #content>
                                                <p class="text-xs leading-[150%] font-normal">
                                                    Actualmente no tienes enlazado el perfil de tu hotel en Tripadvisor. Añádelo ahora
                                                </p>
                                                <p class="text-xs leading-[150%] font-normal mt-[2px] underline">
                                                    Administración > Plataformas Externas > Tripadvisor
                                                </p>
                                            </template>
                                        </BaseTooltipResponsive>
                                    </template>
                                </div>
                                <input
                                    v-model="formModalFilter.otas"
                                    :value="ota"
                                    :disabled="!reviewStore.otasWithUrls.includes(ota)"
                                    :checked="formModalFilter.otas.includes(ota)"
                                    type="checkbox"
                                    class="w-5 h-5 rounded mr-2 hcheckbox"
                                >
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div class="p-4 border-t hborder-gray-400 flex justify-between">
                <button
                    class="underline font-medium text-xs my-auto"
                    :class="{'opacity-25': numbersFiltersApplied <= 0}"
                    :disabled="numbersFiltersApplied <= 0"
                    @click="resetFormFilter"
                >
                    Restablecer
                </button>
                <button 
                    class="hbtn-primary font-medium text-sm h-10"
                    style="width:126px;"
                    :disabled="emptyformModalFilter"
                    @click="submitFilter()"
                >
                    Aplicar filtros
                </button>
            </div>
        </div>
    </template>
</ModalWindow>
</template>

<script setup>
import { ref, inject, defineEmits, reactive, watch, computed, defineProps, toRefs } from 'vue';

import { $titleCase } from '@/utils/textWritingTypes';

import ModalWindow from '@/components/ModalWindow';
import BaseTextField from '@/components/Forms/BaseTextField';
import BaseSelectField from "@/components/Forms/BaseSelectField.vue";
import BaseTooltipResponsive from '@/components/BaseTooltipResponsive.vue';

const { numbersFiltersApplied } = defineProps({
    numbersFiltersApplied: Number 
});

 //composable
import { useToastAlert } from '@/composables/useToastAlert'
const toast = useToastAlert();

const emits = defineEmits(['reloadReviews']);


//INJECT
const formFilter = inject('formFilter');
const filtersDefault = inject('filtersDefault');
const isOpenModelFilter = inject('isOpenModelFilter');
const reviewStore = inject('reviewStore');
const filtersSelected = inject('filtersSelected');
const emptyFilters = inject('emptyFilters');

// DATA

const formModalFilter = reactive({
    otas: [...reviewStore.otasWithUrls],
    statusResponse: null,
    scoreRange: null,
    language: null,
});
const formModalFilterDefault = reactive({
    otas: [...reviewStore.otasWithUrls],
    statusResponse: null,
    scoreRange: null,
    language: null,
});

const numbersFilters = ref({});

const statusResponse = computed(() => {
    let options = [
        { value: null, label: `Todas las reseñas (${numbersFilters.value?.total ?? 0})` },
        { value: 'NOT_ANSWERED', label: `No respondidas (${numbersFilters.value?.notResponded ?? 0})` },
        { value: 'ANSWERED', label: `Respondidas (${numbersFilters.value?.responded ?? 0})` },
    ];
    return options;
});
const scoreRanges = computed(() => {
    let options = [
        { value: null, label: `Todas las puntuaciones (${numbersFilters.value?.total ?? 0})` },
        { value: '1', label: `Muy bien: 9-10/10 | 5/5 (${numbersFilters.value?.scoreRanges?.[1] ?? 0})` },
        { value: '2', label: `Bien: 7-9/10 | 4/5 (${numbersFilters.value?.scoreRanges?.[2] ?? 0})` },
        { value: '3', label: `Aceptable: 5-7/10 | 3/5 (${numbersFilters.value?.scoreRanges?.[3] ?? 0})` },
        { value: '4', label: `Mal: 3-5/10 | 2/5 (${numbersFilters.value?.scoreRanges?.[4] ?? 0})` },
        { value: '5', label: `Muy mal: 3-5/10 | 2/5 (${numbersFilters.value?.scoreRanges?.[5] ?? 0})` },
    ];
    return options;
});
const languages = computed(() => {
    let options = [
        { value: null, label: `Todos los idiomas (${numbersFilters.value.total ?? 0})` },
        { value: 'de', label: `Alemán (${numbersFilters.value?.languages?.['de'] ?? 0})`, img: '/assets/icons/flags/de.svg' },
        { value: 'cn', label: `Chino (${numbersFilters.value?.languages?.['cn'] ?? 0})`, img: '/assets/icons/flags/cn.svg' },
        { value: 'en', label: `English (${numbersFilters.value?.languages?.['en'] ?? 0})`, img: '/assets/icons/flags/en.svg' },
        { value: 'es', label: `Español (${numbersFilters.value?.languages?.['es'] ?? 0})`, img: '/assets/icons/flags/es.svg' },
        { value: 'fr', label: `Français (${numbersFilters.value?.languages?.['fr'] ?? 0})`, img: '/assets/icons/flags/fr.svg' },
        { value: 'it', label: `Italiano (${numbersFilters.value?.languages?.['it'] ?? 0})`, img: '/assets/icons/flags/it.svg' },
        { value: 'pr', label: `Portugués (${numbersFilters.value?.languages?.['pr'] ?? 0})`, img: '/assets/icons/flags/pr.svg' },
    ];
    return options;
});

watch(isOpenModelFilter, (valNew, valOld) => {
    if (!!valNew && !valOld) {
        let { otas, statusResponse, scoreRange, language } = formFilter;
        Object.assign(formModalFilter, { otas, statusResponse, scoreRange, language });
        getNumbersDistributionByFilters();
    }
});

watch(formModalFilter, (valNew, valOld) => {
    getNumbersDistributionByFilters();
}, { deep: true } );

// COMPUTED

const emptyformModalFilter = computed(() => {
    return !formModalFilter.search &&
        formModalFilter.otas?.length === filtersSelected.otas.length &&
        !formModalFilter.statusResponse &&
        !formModalFilter.scoreRange &&
        !formModalFilter.language;
});

// FUNCTIONS    

function closeModalFilter () {
    isOpenModelFilter.value = false;
}

function selectedAllOtas () {
    formModalFilter.otas = [];
    formModalFilter.otas = reviewStore.otasWithUrls;
}

function resetFormFilter () {
    Object.assign(formModalFilter, filtersDefault);
    Object.assign(filtersSelected, formModalFilter);
    Object.assign(formFilter, formModalFilter);
    emits('reloadReviews');
    closeModalFilter();
}

function submitFilter () {
    Object.assign(filtersSelected, formModalFilter);
    Object.assign(formFilter, formModalFilter);
    emits('reloadReviews');
    closeModalFilter();
    toast.warningToast('Filtros aplicados con éxito','top-right');    
}

async function getNumbersDistributionByFilters () {
    let fromDataMerge = Object.assign(formFilter, formModalFilter);
    let bodyRequest = {
        ...fromDataMerge,
    }
    const response = await reviewStore.$getNumbersDistributionByFilters(bodyRequest);
    const { ok, data } = response;
    if (ok) {
        numbersFilters.value = data.summaryAllOtas;
        console.log(numbersFilters.value, 'numbersFilters.value')
    }
}

</script>