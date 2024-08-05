<template>
    <div class="w-[354px] flex-shrink-0 bg-white shadow-hoster sticky top-0 right-0 h-full z-[100]">
        <div class="px-12">
            <h1 class="text-base font-semibold leading-[120%] text-center py-[22px]">
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
            <div class="mt-4 space-y-4">
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
                        class="flex gap-2 items-center"
                    >
                        <img class="w-4 h-4" src="/assets/icons/1.TH.QuestionBubble.svg">
                        <p class="text-xs font-semibold leading-[130%]">
                            Si no te gusta el resultado ponte en contacto con nosotros
                        </p>
                    </div>
                    <div 
                        class="flex gap-2 items-center"
                    >
                        <img class="w-4 h-4" src="/assets/icons/1.TH.COMPUTER.svg">
                        <p class="text-xs font-semibold leading-[130%]">
                            Abre tu webapp para visualizar el favicon
                        </p>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useMockupStore } from '@/stores/modules/mockup';

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
