<template>
    <div>
        <div class="border hborder-gray-400 rounded-[10px] p-6 w-[228px] h-[250px] flex items-center justify-center">
            <BaseQrCode :url="urlBaseWebapp" ref="qrCodeRef" :width="150" :height="150"/>
        </div>
        <div class="mt-4">
            <a 
                href="javascript:void(0)"
                class="text-base font-medium leading-[140%] flex items-center justify-center gap-2"
                @click="downloadQR"
            >
                Descargar   
                <img class="w-6 h-6" src="/assets/icons/1.TH.DOWNLOAD.svg" alt="">
            </a>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import BaseQrCode from '@/components/BaseQrCode.vue';
import { $urlBaseWebapp } from '@/utils/helpers';

import { useHotelStore } from '@/stores/modules/hotel';
const hotelStore = useHotelStore();


let subdomainChain = hotelStore?.hotelData?.chain?.subdomain;
let slugHotel = hotelStore?.hotelData?.subdomain;

const urlBaseWebapp = $urlBaseWebapp(subdomainChain, slugHotel);
const qrCodeRef = ref(null)

const downloadQR = () => {
    qrCodeRef.value.downloadQr();
}
</script>