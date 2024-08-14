<template>
    <div class="mt-4 flex gap-6" v-if="images?.imgs.length > 0">
        <div 
            class="relative overflow-hidden rounded-[6px] h-[100px] w-[101px]" 
            v-for="( img, index ) in images?.imgs" :key="index"
            @click="setPreviewIndex(index)"
        >
            <img
                class="h-[100px] w-[101px] object-cover cursor-pointer"
                :src="img"
            />
            <div 
                v-if="(index+1 == images?.imgs.length && images?.showSurplus)"
                class="w-full h-full bg-overlay absolute z-10 top-0 left-0 cursor-pointer"
            >
                <span class="absolute inset-0 m-auto w-5 h-6 text-base font-semibold text-white z-20">
                    +{{images?.surplus}}
                </span>
            </div>
        </div>
    </div>
    <BasePreviewImageCarousel 
        v-if="reviewData?.images"
        :images="reviewData?.images"
        :initialIndex="initialPreviewIndex"
        @update:isPreviewOpen="isPreviewOpen = false"
        :isPreviewOpen="isPreviewOpen"
    />
</template>

<script setup>
import { computed, inject, ref } from 'vue';

import BasePreviewImageCarousel from '@/components/BasePreviewImageCarousel';

// DATA
const isPreviewOpen = ref(false);
const initialPreviewIndex = ref(null);

//INJECT
const reviewData = inject('reviewData');

// COMPUTED
const images = computed(() => {
    if (!reviewData.value?.images) return 
    let imgs = [...reviewData.value?.images];
    if(!imgs) return [];

    let numShow = 0;
    let showSurplus = false;
    let surplus = 0;

    if(screen.width < 1440 && imgs.length > 5){
        numShow = 6;
    }else if(screen.width > 1439 && screen.width < 1920 && imgs.length > 6){
        numShow = 7;
    }else if(screen.width > 1919 && imgs.length > 9){
        numShow = 9;
        showSurplus = true;
    }
    if(numShow > 0){
        surplus = imgs.length - numShow;
        imgs = imgs.slice(0, numShow);
        showSurplus = true;
    }
    return { imgs, showSurplus, surplus }
});

// FUNCTION
function setPreviewIndex (index) {
    isPreviewOpen.value = true
    initialPreviewIndex.value = index
}
</script>