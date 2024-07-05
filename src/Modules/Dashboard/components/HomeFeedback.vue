<template>
    <div class="flex flex-col border border-[#BFBFBF] rounded-lg p-4 mt-7">
        <div class="grid grid-cols-3 gap-4 mt-4">
            <div class="flex flex-col items-start">
                <span class="text-[#0B6357] text-xs font-semibold mb-2">REPUTACIÓN ONLINE</span>
                <div class="flex gap-4">
                    <span class="font-semibold text-sm flex gap-4">
                        Feedback de tus huéspedes
                    </span>
                </div>
            </div>
            <div class="flex items-end">
                <div class="flex gap-4">
                    <span class="font-semibold text-sm flex gap-4">
                        Reseñas por OTAs
                    </span>
                </div>
            </div>
            <div class="flex items-end">
                <div class="flex gap-4">
                    <span class="font-semibold text-sm flex gap-4">
                        Promedio de tu hotel
                    </span>
                </div>
            </div>
        </div>
        <!-- contenido -->
        <div class="grid grid-cols-3 gap-4 mt-4">
            <div class="row-span-2 flex gap-2 flex-col">
                <div class="bg-white border border-[#BFBFBF] rounded-lg overflow-hidden">
                    <div class="py-2 px-3 flex items-center">
                        <span class="text-xs font-semibold">STAY</span>
                    </div>
                    <!--caritas STAY -->
                    <div class="grid grid-cols-5">
                        <div v-for="feeling in feelingsInStay" :key="feeling.name" class="w-full p-2 flex flex-col items-center">
                            <img :src="`/assets/icons/reviews/${feeling.name}.svg`" class="w-8 h-8">
                            <span class="text-sm font-medium">{{ feeling.percentage }}%</span>
                        </div>
                    </div>
                </div>
                <div class="bg-white border border-[#BFBFBF] rounded-lg overflow-hidden">
                    <div class="py-2 px-3 flex items-center">
                        <span class="text-xs font-semibold">POST-STAY</span>
                    </div>
                    <!--caritas POST-STAY -->
                    <div class="grid grid-cols-5">
                        <div v-for="feeling in feelingsPostStay" :key="feeling.name" class="w-full p-2 flex flex-col items-center">
                            <img :src="`/assets/icons/reviews/${feeling.name}.svg`" class="w-8 h-8">
                            <span class="text-sm font-medium">{{ feeling.percentage }}%</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div class="bg-white border-2 rounded-lg overflow-hidden row-span-2">
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
            <div class="bg-white border-2 rounded-lg overflow-hidden row-span-2">
                <div class="bg-[#D9F2E9] py-2 px-3 flex items-center gap-3">
                    <span class="text-sm font-semibold">TheHoster REVIEW INDEX™</span>
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
            </div> -->
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/modules/users/users'
import { dataFeedback } from '@/api/services/dashboard/dashboard.services';
import { useToastAlert } from '@/composables/useToastAlert'

const userStore = useUserStore();
const toast = useToastAlert();

const feelingsInStay = ref([
    { name: 'VERYGOOD', percentage: 0 },
    { name: 'GOOD', percentage: 0 },
    { name: 'NORMAL', percentage: 0 },
    { name: 'WRONG', percentage: 0 },
    { name: 'VERYWRONG', percentage: 0 },
]);

const feelingsPostStay = ref([
    { name: 'VERYGOOD', percentage: 0 },
    { name: 'GOOD', percentage: 0 },
    { name: 'NORMAL', percentage: 0 },
    { name: 'WRONG', percentage: 0 },
    { name: 'VERYWRONG', percentage: 0 },
]);

onMounted(async () => {
    await handleDataFeedback();
})

const handleDataFeedback = async () => {
    const params = {
        hotel: userStore.$getDataHotel(['id'])
    }
    const response = await dataFeedback(params);
    if(response.ok){
        const inStay = response.data.inStay;
        const postStay = response.data.postStay;
        
        feelingsInStay.value = feelingsInStay.value.map(feeling => ({
            name: feeling.name,
            percentage: inStay[feeling.name] || 0
        }));
        
        feelingsPostStay.value = feelingsPostStay.value.map(feeling => ({
            name: feeling.name,
            percentage: postStay[feeling.name] || 0
        }));
    } else {
        toast.errorToast(response.data.message, 'top-right')
    }
}
</script>
