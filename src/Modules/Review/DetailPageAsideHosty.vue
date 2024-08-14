<template>
    <div class="aside h-[100%] fixed w-[354px] bg-white top-0">
        <div class="px-[24px] py-[18px] border-b-[2px] border-[#BFBFBF] flex space-x-4">
            <img class="w-[52px] h-[52px]" src="/assets/img/hosty.png" alt="hosty">
            <div class="">
                <h1 class="text-base font-semibold leading-[130%]">¡Hosty trabajará por ti! </h1>
                <p class="text-sm font-medium leading-[140%]">Genera, copia y responde</p>
            </div>
        </div>
        <div
            class="w-full flex h-full"
            :class="loadingHosty ? 'items-center justify-center' : 'pt-6 px-6 pb-[68px] flex-col'"
        >
            <!-- <div v-if="!loadingHosty" class="text-center">
                <button class="text-xs font-medium hbtn-primary py-[12px] px-[8px]">
                    Generar con Hosty
                    <img
                        src="/assets/icons/1.TH.IA.svg"
                        class="w-4 h-4 ml-1 inline-block"
                    >
                </button>
            </div>
            <BaseLoadingScroll class="w-[60px] h-[60px]" v-else /> -->
            <template v-if="!loadingHosty">
                <DetailPageAsideHostyResponseStreaming />
            </template>

        </div>
    </div>
</template>

<script setup>
import { ref, provide } from 'vue';

// COMPONENTS
import BaseLoadingScroll from '@/components/BaseLoadingScroll';
import DetailPageAsideHostyResponseStreaming from './DetailPageAsideHostyResponseStreaming';

// DATA
const loadingHosty = ref(false);
const streamingLiveData = ref(false);
const responseGenerated = ref(false);

// PROVIDE
provide('loadingHosty', loadingHosty);
provide('streamingLiveData', streamingLiveData);
provide('responseGenerated', responseGenerated);

</script>

<style lang="scss">
    .aside {
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.15);
    }

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>