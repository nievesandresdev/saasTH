<template>
    <div class="flex flex-col border border-[#BFBFBF] rounded-lg p-4">
        <div class="flex flex-col">
            <span class="text-[#0B6357] text-xs font-semibold mb-2">CUSTOMER EXPERIENCE</span>
            <div class="grid grid-cols-4 gap-4 items-center">
                <span class="font-semibold text-sm flex gap-2 items-center col-span-1">
                    Estancias activas en tu WebApp
                    <Tooltip size="l" :top="25" :left="5">
                        <template v-slot:button>
                            <img class="w-4 h-4" src="/assets/icons/info.blue.svg">
                        </template>
                        <template v-slot:content>
                            <p class="text-sm font-normal">Aquí verás las estancias de aquellos huéspedes que hayan accedido a tu <strong>WebApp</strong> y cargado sus datos.</p>
                        </template>
                    </Tooltip>
                </span>
                <div class="col-span-2"></div> <!-- Espacio en blanco para alineación -->
                <span class="font-semibold text-sm text-left col-span-1">Idiomas más utilizados por tus huéspedes</span>
            </div>
        </div>
        <!-- contenido -->
        <div class="grid grid-cols-4 gap-4 mt-4">
            <div class="bg-white border border-[#BFBFBF] rounded-lg  relative">
                <div class="bg-[#D9E8F2] py-2 px-3 flex items-center gap-3">
                    <span class="text-sm font-semibold">PRE-STAY</span>
                    <Tooltip :top="25" :left="5" size="m" :class="'z-[800]'">
                        <template v-slot:button>
                            <img class="w-4 h-4" src="/assets/icons/info.blue.svg">
                        </template>
                        <template v-slot:content>
                            <p class="text-sm">Se consideran en <strong>PRE-STAY</strong> todas las estancias de huéspedes que utilicen tu <strong>WebApp</strong> y aún no hayan llegado a su fecha de <strong>Check-In</strong></p>
                        </template>
                    </Tooltip>
                </div>
                <div class="p-4 h-full">
                    <div class="flex items-center gap-2">
                        <img src="/assets/icons/dashboard/door_tag-hotel-heart-love-valentine.svg" class="w-4 h-4">
                        <span class="text-sm font-medium">{{ countPreStay }} Estancias</span>
                    </div>
                    <div class="flex items-center gap-2 mt-1">
                        <img src="/assets/icons/dashboard/1.TH.HUESPEDES.svg" class="w-4 h-4">
                        <span class="text-sm font-medium">{{ guestsPreStay }} Huéspedes</span>
                    </div>
                </div>
            </div>
            <div class="bg-white border border-[#BFBFBF] rounded-lg ">
                <div class="bg-[#D9F2E9] py-2 px-3 flex items-center gap-3">
                    <span class="text-sm font-semibold">STAY</span>
                    <Tooltip :top="25" :left="5" size="m" :class="'z-[600]'">
                        <template v-slot:button>
                            <img class="w-4 h-4" src="/assets/icons/info.blue.svg">
                        </template>
                        <template v-slot:content>
                            <p class="text-sm">
                                Se consideran en <strong>STAY</strong> todas las estancias de huéspedes que utilicen tu <strong>WebApp</strong> luego de su fecha de <strong>Check-in</strong> y antes de su <strong>Check-out</strong>
                            </p>
                        </template>
                    </Tooltip>
                </div>
                <div class="p-4 h-full">
                    <div class="flex items-center gap-2">
                        <img src="/assets/icons/dashboard/door_tag-hotel-heart-love-valentine.svg" class="w-4 h-4">
                        <span class="text-sm font-medium">{{ countStay }} Estancias</span>
                    </div>
                    <div class="flex items-center gap-2 mt-1">
                        <img src="/assets/icons/dashboard/1.TH.HUESPEDES.svg" class="w-4 h-4">
                        <span class="text-sm font-medium">{{ guestsStay }} Huéspedes</span>
                    </div>
                </div>
            </div>
            <div class="bg-white border border-[#BFBFBF] rounded-lg ">
                <div class="bg-[#F2F2F2] py-2 px-3 flex items-center gap-3">
                    <span class="text-sm font-semibold">POST-STAY</span>
                    <Tooltip :top="25" :left="5" size="m" :class="'z-[600]'">
                        <template v-slot:button>
                            <img class="w-4 h-4" src="/assets/icons/info.blue.svg">
                        </template>
                        <template v-slot:content>
                            <p class="text-sm">Se consideran en <strong>POST-STAY</strong> todas las estancias de huéspedes que utilicen tu <strong>WebApp</strong> luego de haber realizado su <strong>Check-out</strong></p>
                        </template>
                    </Tooltip>
                </div>
                <div class="p-4 h-full">
                    <div class="flex items-center gap-2">
                        <img src="/assets/icons/dashboard/door_tag-hotel-heart-love-valentine.svg" class="w-4 h-4">
                        <span class="text-sm font-medium">{{ countPostStay }} Estancias</span>
                    </div>
                    <div class="flex items-center gap-2 mt-1">
                        <img src="/assets/icons/dashboard/1.TH.HUESPEDES.svg" class="w-4 h-4">
                        <span class="text-sm font-medium">{{ guestsPostStay }} Huéspedes</span>
                    </div>
                </div>
            </div>
            <div class="flex flex-col h-full">
                <!-- <span class="font-semibold text-sm text-left block mb-2">Idiomas más utilizados por tus huéspedes</span> -->
                <div class="bg-white border border-[#BFBFBF] rounded-lg overflow-hidden flex-1">
                    <div class="p-4 h-full flex flex-col items-start justify-center">
                        <div v-for="lang in processedLanguages" :key="lang.name" class="flex items-center gap-2">
                            <img :src="lang.icon" class="w-6 h-6">
                            <span class="text-base font-semibold">{{ lang.percentaje }}%</span>
                            <span class="text-sm font-medium">{{ $nameLanguage(lang.name) }}</span>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Tooltip from '@/components/Tooltip.vue'
import { onMounted, ref, computed } from 'vue'
import { dataCustomerExperience } from '@/api/services/dashboard/dashboard.services';
import { useToastAlert } from '@/composables/useToastAlert'

const toast = useToastAlert();

const countPreStay = ref(0);
const countStay = ref(0);
const countPostStay = ref(0);
const guestsPreStay = ref(0);
const guestsStay = ref(0);
const guestsPostStay = ref(0);

const languages = ref({});

// Define todos los idiomas posibles aquí
const allLanguages = ["es", "en", "fr"];

// Computed property to process languages and fill in missing ones
const processedLanguages = computed(() => {
    return allLanguages.map(lang => {
        if (languages.value[lang]) {
            return {
                name: languages.value[lang].name,
                percentaje: languages.value[lang].percentaje,
                icon: `/assets/icons/flags/${lang}.svg`
            };
        } else {
            return {
                name: '',
                percentaje: "--",
                icon: `/assets/icons/flags/1.TH.SINIDIOMA.svg`
            };
        }
    });
});

onMounted(async () => {
   await handleData(); 
})

const handleData = async () => {
    const response = await dataCustomerExperience();
    if(response.ok){
        countPreStay.value = response.data.preStay;
        countStay.value = response.data.inStay;
        countPostStay.value = response.data.postStay;

        guestsPreStay.value = response.data.guestsPreStay;
        guestsStay.value = response.data.guestsStay;
        guestsPostStay.value = response.data.guestsPostStay;

        languages.value = response.data.languages;
    }else{
        toast.errorToast(response.data.message, 'top-right')
    }
}
</script>
