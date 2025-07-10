<template >
    <div class="relative"  @mouseenter="isHover = true" @mouseleave="isHover = false">
        <div class="pt-6 px-4 text-white bg-white">
            <div class="flex items-center justify-between">
                <h1 class="text-[30px] font-medium leading-[32px] max-w-[273px] roboto">{{ $formatTypeLodging(true) }}</h1>
                <!-- avatar -->
                <div 
                    class="border rounded-full z-50 flex items-center justify-center hshadow-button relative bg-[#333] border-white w-[46px] h-[46px]"
                    id="avatar-container"
                >
                    <img 
                        class="w-[32px] h-[32px] rounded-full"
                        src="/assets/icons/WA.user.svg"
                    >
                </div>
            </div>
        </div>
        <div
            class="absolute left-0 top-[48px] sp:top-[70px] h-[23px] sp:h-[46px] w-full z-10"
            :style="`background: linear-gradient(180deg, ${ '#fff'} 16%, rgba(51, 51, 51, 0.00) 100%)`"
        ></div>
        <div class="h-[260px] w-full">
            <div 
                class="bg-center bg-cover h-full w-full rounded-b-[20px] shadow-guest"  
                :style="`background-image: url('${$formatImage({ url: hotelStore.hotelData.image, type: getTypeImg(hotelStore.hotelData.image) })}');`"
            ></div>
        </div>
        <div class="absolute top-0 left-0 w-full h-full z-10 flex cursor-pointer" v-if="isHover">
            <div class="bg-white h-8 rounded-[6px] flex items-center gap-2 px-2 m-auto border hborder-black-100">
                <img src="/assets/icons/1.TH.IMAGES.svg" alt="images" class="w-4 h-4">
                <p class="text-[12px] font-medium leading-[90%]">
                    Cambiar imagen
                </p>
            </div>
        </div>
        <div 
            class="absolute z-50 top-0 left-0 w-full h-full border-4 rounded-[20px] cursor-pointer"
            :class="{
                'hborder-green-600': currentSection === 'heroSection',
                'border-transparent': currentSection !== 'heroSection',
            }"
        ></div>
    </div>
</template>
<script setup>
import { computed, ref, inject } from 'vue';
import { useHotelStore } from '@/stores/modules/hotel'
const hotelStore = useHotelStore()

const isHover = ref(false)
const currentSection = inject('currentSection')

function getTypeImg (url) {
    if (!url) return;
    let type = url?.includes('https://') ? 'CDN' : 'STORAGE'
    return type
}


const $formatImage = (payload) => {
    const URL_STORAGE = process.env.VUE_APP_STORAGE_URL;
    let { url, type, urlDefault } = payload;
    if (!url || !URL_STORAGE) return;
    if (urlDefault) return url;
    let type_d = url.includes('https://') ? 'CDN' : 'STORAGE';
    type = type ?? type_d;
    return type === 'CDN' || type === 'image-hotel-scraper' ? url : URL_STORAGE + url;
};
</script>
