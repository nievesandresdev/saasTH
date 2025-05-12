<template>
    <!-- <div class="w-[354px] flex-shrink-0 bg-white shadow-hoster sticky top-0 right-0 h-full z-[100]  overflow-y-auto"> version anterior, quite el overflow-y-auto por que chocaba con el tooltip de idiomas del mockup -->
    <div class="w-[354px] flex-shrink-0 bg-white shadow-hoster sticky top-0 right-0 h-full z-[2001] overflow-y-auto">
        <div class="px-12 py-[22px]">
            <h1 class="text-base font-semibold leading-[120%] text-center mb-[22px]">
                Visualiza tu webapp
            </h1>
            
            <!-- mockup -->
            <div id="mockup" class="relative h-[520px] w-[258px]">
                <div id="content-mockup" class="hbg-gray-100 absolute z-[51] top-11 left-5">
                    <iframe class="w-full h-full" :src="store.iframeUrl"></iframe>
                </div>
                <img class="w-full absolute left-0 top-0 h-full z-50" src="/assets/img/1.TH.DEV.MOCKUPTRANSPARENTE.svg" alt="">
            </div>

            <!-- container info text's -->
            <div class="mt-4">
                <div class="flex items-center gap-2 mb-4 group" @click="openMockup" v-if="store.showGoWebapp">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" class="cursor-pointer">
                        <path d="M10 2H14V6" stroke="#333333" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round" class="group-hover:stroke-[#34A98F]"/>
                        <path d="M6.66675 9.33333L14.0001 2" stroke="#333333" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round" class="group-hover:stroke-[#34A98F]"/>
                        <path d="M12 8.66667V12.6667C12 13.0203 11.8595 13.3594 11.6095 13.6095C11.3594 13.8595 11.0203 14 10.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V5.33333C2 4.97971 2.14048 4.64057 2.39052 4.39052C2.64057 4.14048 2.97971 4 3.33333 4H7.33333" stroke="#333333" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round" class="group-hover:stroke-[#34A98F]"/>
                    </svg>
                    <p class="text-xs leading-[130%] font-semibold underline cursor-pointer group-hover:text-[#34A98F]" >Ir a la WebApp</p>
                </div>
                <div class="flex items-center gap-2 mb-4" v-if="store.setLanguage">
                    <TooltipLanguagesMini />
                    <p class="text-xs leading-[130%] font-semibold">Idiomas</p>
                </div>
                <!-- infoText1 -->
                <div 
                    class="flex gap-2 items-center"
                    v-if="store.infoText1"
                >
                    <img class="w-4 h-4" :src="store.infoTextIcon1">
                    <p class="text-xs font-semibold leading-[130%]">
                        {{ store.infoText1 }}
                    </p>
                </div>
                <!-- <template v-if="$route.name === 'Customization'">
                    <div 
                        class="flex gap-2 items-center mt-4"
                    >
                        <img class="w-4 h-4" src="/assets/icons/1.TH.QuestionBubble.svg">
                        <p class="text-xs font-semibold leading-[130%]">
                            Si no te gusta el resultado ponte en contacto con nosotros
                        </p>
                    </div>
                    <div 
                        class="flex gap-2 items-center mt-4"
                    >
                        <img class="w-4 h-4" src="/assets/icons/1.TH.COMPUTER.svg">
                        <p class="text-xs font-semibold leading-[130%]">
                            Abre tu webapp para visualizar el favicond
                        </p>
                    </div>
                </template> -->
            </div>
        </div>
    </div>
</template>

<script setup>
import { useMockupStore } from '@/stores/modules/mockup';
import { useHotelStore } from '@/stores/modules/hotel';
import TooltipLanguagesMini from "@/components/TooltipLanguagesMini.vue";
import { useRouter } from 'vue-router';

const router = useRouter();
const store = useMockupStore();
const hotelStore = useHotelStore();

const openMockup = () => {
    const route = router.resolve({ name: 'WebAppUsable', params: { subdomain: hotelStore.hotelData.subdomain } });
    window.open(route.href, '_blank');
}
</script>

<style scoped>
#mockup{
    cursor: inherit;
}
#content-mockup{
    border-radius: 0 0 8px 8px;
    height: 444px;
    width: 216px;
}
</style>
