<template>
    <!-- <div class="w-[354px] flex-shrink-0 bg-white shadow-hoster sticky top-0 right-0 h-full z-[100]  overflow-y-auto"> version anterior, quite el overflow-y-auto por que chocaba con el tooltip de idiomas del mockup -->
    <div class="w-[354px] flex-shrink-0 bg-white shadow-hoster sticky top-0 right-0 h-full z-[700]">
        <div class="px-12 py-[22px]">
            <h1 class="text-base font-semibold leading-[120%] text-center mb-[22px]">
                Visualiza tu webapp
            </h1>
            
            <!-- mockup -->
            <div id="mockup" class="relative h-[520px] w-[258px]">
                <div id="content-mockup" class="hbg-gray-100 absolute z-[100] top-11 left-5 overflow-hidden">
                    <iframe class="w-full h-full" :src="store.iframeUrl"></iframe>
                </div>
                <img class="w-full absolute left-0 top-0 h-full z-50" src="/assets/img/1.TH.DEV.MOCKUPTRANSPARENTE.svg" alt="">
            </div>

            <!-- container info text's -->
            <div class="mt-4">
                <div class="flex items-center gap-2 mb-4" v-if="store.setLanguage">
                    <TooltipLanguages
                        size="l"
                        :top="20"
                        :right="0"
                    >
                        <template #button>
                            <img class="w-[16px] h-[16px]" src="/assets/icons/TH.INFO.GREEN.svg">
                        </template>
                    </TooltipLanguages>
                    <span class="font-semibold text-[12px]"> Idiomas</span>
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
                <template v-if="$route.name === 'Customization'">
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
                </template>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useMockupStore } from '@/stores/modules/mockup';
import TooltipLanguages from "@/components/TooltipLanguages.vue";

const store = useMockupStore();
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
