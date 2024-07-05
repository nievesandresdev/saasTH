<template>
    <div class="flex flex-col border border-[#BFBFBF] rounded-lg p-4">
        <div class="flex flex-col">
            <span class="text-[#0B6357] text-xs font-semibold mb-2">CUSTOMER EXPERIENCE</span>
            <div class="flex gap-4 justify-between">
                <span class="font-semibold text-sm flex gap-4">
                Estancias activas en tu WebApp
                <Tooltip size="l" :top="25" :left="5">
                    <template v-slot:button>
                    <img class="w-6 h-6" src="/assets/icons/info.blue.svg">
                    </template>
                    <template v-slot:content>
                    <p class="text-sm">Tooltip Text</p>
                    </template>
                </Tooltip>
                </span>
                <span class="font-semibold text-sm">Idiomas más utilizados por tus huéspedes</span>
            </div>
        </div>
        <!-- contenido -->
        <div class="grid grid-cols-4 gap-4 mt-4">
            <div class="bg-white border-2 rounded-lg overflow-hidden">
                <div class="bg-[#D9E8F2] py-2 px-3 flex items-center gap-3">
                    <span class="text-sm font-semibold">PRE-STAY</span>
                    <Tooltip  :top="25" :left="5" size="xs" :class="'z-[600]'">
                        <template v-slot:button>
                        <img class="w-6 h-6" src="/assets/icons/info.blue.svg">
                        </template>
                        <template v-slot:content>
                        <p class="text-sm">Tooltip Text</p>
                        </template>
                    </Tooltip>
                </div>
                <div class="p-4">
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
            <div class="bg-white border-2 rounded-lg overflow-hidden">
                <div class="bg-[#D9F2E9] py-2 px-3 flex items-center gap-3">
                    <span class="text-sm font-semibold">STAY</span>
                    <Tooltip  :top="25" :left="5" size="xs" :class="'z-[600]'">
                        <template v-slot:button>
                        <img class="w-6 h-6" src="/assets/icons/info.blue.svg">
                        </template>
                        <template v-slot:content>
                        <p class="text-sm">Tooltip Text</p>
                        </template>
                    </Tooltip>
                </div>
                <div class="p-4">
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
            <div class="bg-white border-2 rounded-lg overflow-hidden">
                <div class="bg-[#F2F2F2] py-2 px-3 flex items-center gap-3">
                    <span class="text-sm font-semibold">POST-STAY</span>
                    <Tooltip  :top="25" :left="5" size="xs" :class="'z-[600]'">
                        <template v-slot:button>
                        <img class="w-6 h-6" src="/assets/icons/info.blue.svg">
                        </template>
                        <template v-slot:content>
                        <p class="text-sm">Tooltip Text</p>
                        </template>
                    </Tooltip>
                </div>
                <div class="p-4">
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
            <div class="bg-white border-2 rounded-lg overflow-hidden">
                <div class="p-4 mt-4">
                    <div v-for="(lang,index) in languages" :key="index" class="flex items-center gap-2">
                        <img :src="`/assets/icons/flags/${index}.svg`" class="w-4 h-4">
                        <span class="text-base font-semibold">{{ lang.percentaje }}%</span><span class="text-sm font-medium"> - {{ $nameLanguage(lang.name) }}</span>
                    </div> 
                    <!-- <div class="flex items-center gap-2 mt-1">
                        <img src="/assets/icons/dashboard/flags/France.svg" class="w-4 h-4">
                        <span class="text-sm font-medium">- Frances</span>
                    </div>
                    <div class="flex items-center gap-2 mt-1">
                        <img src="/assets/icons/dashboard/flags/England.svg" class="w-4 h-4">
                        <span class="text-sm font-medium">- Inglés</span>
                    </div> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Tooltip from '@/components/Tooltip.vue'
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/modules/users/users'
import { dataCustomerExperience } from '@/api/services/dashboard/dashboard.services';
import { useToastAlert } from '@/composables/useToastAlert'

const userStore = useUserStore();
const toast = useToastAlert();

const countPreStay = ref(0);
const countStay = ref(0);
const countPostStay = ref(0);
const guestsPreStay = ref(0);
const guestsStay = ref(0);
const guestsPostStay = ref(0);

const languages = ref([]);

onMounted(async () => {
   await handleData(); 
})

const handleData = async () => {
    const params = {
        hotel: userStore.$getDataHotel(['id'])
    }
    const response = await dataCustomerExperience(params);
    if(response.ok){
        countPreStay.value = response.data.preStay;
        countStay.value = response.data.inStay;
        countPostStay.value = response.data.postStay;

        // Assuming you get the total guests count by period
        guestsPreStay.value = response.data.guestsPreStay;
        guestsStay.value = response.data.guestsStay;
        guestsPostStay.value = response.data.guestsPostStay;

        languages.value = response.data.languages;
    }else{
        toast.errorToast(response.data.message, 'top-right')
    }
}

</script>
