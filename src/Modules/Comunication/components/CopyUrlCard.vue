<template>
    <div>
        <div class="border hborder-gray-400 rounded-[6px] px-3 py-2.5 w-full">
            <p class="text-sm font-medium leading-[140%]">{{ urlBaseWebapp }}</p>
        </div>
        <div class="text-right mt-8">
            <a @click="copyLinkToClipboard" href="javascript:void(0)" class="hbtn-primary cursor-pointer px-4 py-3 h-10 text-sm leading-[100%] inline-block">
                Copiar enlace {{ hotelType }}
            </a>
        </div>
    </div>
</template>
<script setup>
import { $urlBaseWebapp } from '@/utils/helpers';
import { useToastAlert } from '@/composables/useToastAlert'
import { useHotelStore } from '@/stores/modules/hotel';
import { typeChain } from '@/utils/enums';
const hotelStore = useHotelStore();


let subdomainChain = hotelStore?.hotelData?.chain?.subdomain;
let slugHotel = hotelStore?.hotelData?.subdomain;
let hotelType = hotelStore?.hotelData?.chain?.type;

const urlBaseWebapp = $urlBaseWebapp(subdomainChain, slugHotel, hotelType);
const toast = useToastAlert();

const copyLinkToClipboard = async () => {
    try {
        await navigator.clipboard.writeText(urlBaseWebapp);
        toast.warningToast('Copiado con éxito', 'top-right');
    } catch (err) {
        console.error('Error al copiar la url: ', err);
        toast.errorToast('Error al copiar la url', 'top-right');
    }
}
</script>