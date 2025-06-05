<template>
    <div class="bg-white flex flex-col border border-[#BFBFBF] rounded-[10px] py-6 px-4">
        <div class="flex flex-col">
            <span class="htext-green-800 text-[10px] font-semibold mb-2 leading-[130%]">ESTANCIAS</span>
            <div class="flex gap-4 items-center">
                <span class="font-semibold text-sm leading-[120%] flex gap-2 items-center">
                    Activas en tu WebApp
                    <Tooltip size="l" :top="25" :left="5">
                        <template v-slot:button>
                            <img class="w-4 h-4" src="/assets/icons/info.blue.svg">
                        </template>
                        <template v-slot:content>
                            <p class="text-sm font-normal">Aquí verás las estancias de aquellos huéspedes que hayan accedido a tu <strong>WebApp</strong> y cargado sus datos.</p>
                        </template>
                    </Tooltip>
                </span>
                <!-- <div class="flex-1"></div> -->
                <span class="font-semibold text-sm leading-[120%] text-left ml-auto w-[23.5%] 3xl:w-[24%]">Idiomas más utilizados</span>
            </div>
        </div>
        <!-- contenido -->
        <div class="grid grid-cols-4 gap-4 mt-4">
            <div class="bg-white border border-[#BFBFBF] rounded-[10px]  relative">
                <div class="bg-[#D9E8F2] py-2 px-3 flex items-center gap-3 rounded-t-[10px]">
                    <span class="text-sm font-semibold">PRE-STAY</span>
                    <Tooltip :top="16" :left="5" size="l" >
                        <template v-slot:button>
                            <img class="w-4 h-4" src="/assets/icons/info.blue.svg">
                        </template>
                        <template v-slot:content>
                            <p class="text-sm leading-[150%]">Las estancias que utilicen tu WebApp antes del check-in se clasificarán como Pre-Stay. Alcanzada la hora mínima de llegada el día del check-in, la estancia se actualizará a la categoría Stay.</p>
                            <span 
                                class="text-sm leading-[150%] block mt-2 underline cursor-pointer"
                                @click="goProfile"
                            >Alojamiento > Perfil > Horario Check-in / Check-out</span>
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
            <div class="bg-white border border-[#BFBFBF] rounded-[10px] ">
                <div class="bg-[#D9F2E9] py-2 px-3 flex items-center gap-3 rounded-t-[10px]">
                    <span class="text-sm font-semibold">STAY</span>
                    <Tooltip :top="16" :left="5" size="l">
                        <template v-slot:button>
                            <img class="w-4 h-4" src="/assets/icons/info.blue.svg">
                        </template>
                        <template v-slot:content>
                            <p class="text-sm leading-[150%]">Las estancias que utilicen tu WebApp entre el check-in y el check-out se clasificarán como Stay. Una vez pasada la hora máxima de salida el día del check-out, la estancia se actualizará a Post-Stay.</p>
                            <span 
                                class="text-sm leading-[150%] block mt-2 underline cursor-pointer"
                                @click="goProfile"
                            >Alojamiento > Perfil > Horario Check-in / Check-out</span>
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
            <div class="bg-white border border-[#BFBFBF] rounded-[10px] ">
                <div class="bg-[#F2F2F2] py-2 px-3 flex items-center gap-3 rounded-t-[10px]">
                    <span class="text-sm font-semibold">POST-STAY</span>
                    <Tooltip :top="16" :right="0" size="l">
                        <template v-slot:button>
                            <img class="w-4 h-4" src="/assets/icons/info.blue.svg">
                        </template>
                        <template v-slot:content>
                            <p class="text-sm leading-[150%]">Las estancias que utilicen tu WebApp después de la hora máxima de check-out se clasificarán como Post-Stay.</p>
                            <span 
                                class="text-sm leading-[150%] block mt-2 underline cursor-pointer"
                                @click="goProfile"
                            >Alojamiento > Perfil > Horario Check-in / Check-out</span>
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
                <div class="bg-white border border-[#BFBFBF] rounded-[10px] overflow-hidden flex-1">
                    <div class="p-4 h-full flex flex-col items-start justify-center">
                        <div v-for="lang in processedLanguages" :key="lang.name" class="flex items-center gap-2">
                            <img :src="lang.icon" class="w-6 h-6">
                            <span class="text-base font-semibold">{{ lang.percentaje }}%</span>
                            <span class="text-sm font-medium">{{ lang.name ? $nameLanguage(lang.name) : '-' }}</span>
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
import { useRouter } from 'vue-router';

const toast = useToastAlert();
const router = useRouter();

const countPreStay = ref(0);
const countStay = ref(0);
const countPostStay = ref(0);
const guestsPreStay = ref(0);
const guestsStay = ref(0);
const guestsPostStay = ref(0);

const languages = ref({});

// Define todos los idiomas posibles aquí
const allLanguages = ["es", "en", "others"];

// Computed property to process languages and fill in missing ones
const processedLanguages = computed(() => {

    //sumar porcentajes de los idiomas que no están en allLanguages
    const othersPercentage = Object.entries(languages.value)
        .filter(([key]) => !allLanguages.includes(key))
        .reduce((sum, [, data]) => sum + (data.percentaje || 0), 0);

    return allLanguages.map(lang => {
        if (languages.value[lang]) {
            return {
                name: languages.value[lang].name,
                percentaje: languages.value[lang].percentaje,
                icon: `/assets/icons/flags/${lang}.svg`
            };
        } else {
            return {
                name: othersPercentage ? 'others' : null,
                percentaje: othersPercentage || '--',
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

const goProfile = async () => {
    router.push('/alojamiento/perfil#checkin-checkout')
}
</script>
