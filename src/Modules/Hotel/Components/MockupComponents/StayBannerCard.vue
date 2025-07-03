<template>
    <section class="relative z-[100]">
        <div class="px-4 mt-[-24px]">
            <div 
            class="flex flex-col p-4 gap-2 w-full rounded-[20px] border border-[#E9E9E9] bg-gradient-to-r from-[#F3F3F3] to-[#FAFAFA] relative shadow-hoster cursor-not-allowed"
            >
                <p class="text-base font-bold lato leading-[20px] text-[#333333]">{{ hotelStore.hotelData.name }}</p>
                <div class="flex mt-3">
                    <div>
                        <div class="flex items-center text-[14px] font-bold text-[#333333]">
                            <img src="/assets/icons/WA.pointer.svg" class="w-4 h-4 mr-1" alt="Location Icon" />
                            <span class="lato text-sm font-bold leading-[16px]">{{ hotelStore.hotelData.zone ?? '-'}}</span>
                        </div>
                        <div class="flex items-center mt-2">
                            <img src="/assets/icons/WA.calendar.svg" class="w-4 h-4 mr-1" alt="Calendar Icon" />
                            <span class="lato text-sm font-bold leading-[16px]">## Mmm-## Mmm </span>
                        </div>
                        <div class="flex items-center text-[14px] font-bold text-[#333333] space-x-2 mt-2">
                            <div class="flex items-center">
                                <img src="/assets/icons/WA.bed.svg" class="w-4 h-4 mr-1" alt="Bed Icon" />
                                <span class="lato text-sm font-bold leading-[16px]">#</span>
                            </div>
                            <div class="flex items-center">
                                <img src="/assets/icons/WA.huespedes.svg" class="w-4 h-4 mr-1" alt="Guests Icon" />
                                <span class="lato text-sm font-bold leading-[16px]">##</span>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="flex flex-col items-end"> -->
                        <!-- Botón con icono -->
                    <span class="flex items-center p-1 sp:p-2 gap-1 sp:gap-2 border border-white bg-gradient-h shadow-md rounded-full ml-auto mt-auto">
                        <img src="/assets/icons/WA.share.svg" class="w-6 h-6" alt="Icon" />
                    </span>
                        <!-- <p class="mt-[4px] sp:mt-2 text-[8px] sp:text-[12px] font-bold text-[#333] lato text-center sp:max-w-[40px] sp:max-w-[80px]">Compartir</p> -->
                    <!-- </div> -->
                </div>       
            </div>
        </div>
        <div class="mt-8 px-4">
            <div class="flex justify-between items-center p-1 sp:p-4 w-full rounded-[10px] border shadow-guest relative border-[#333] bg-[#fafafa] cursor-not-allowed">
                <!-- left container  -->
                <div class="">
                    <div class="flex items-center">
                        <img class="w-[20px] h-[20px] mr-1" src="/assets/icons/WA.checkin.user.svg" alt="">
                        <p class="text-[16px] font-bold lato leading-[20px] text-[#333333]">
                            Check-in disponible
                        </p>
                    </div>
                    <p class="text-[14px] font-medium lato leading-[16px] text-[#333333]">Optimiza tu tiempo, realiza tu check-in ahora!</p>
                </div>
                <!-- icon right  -->
                <img class="w-[24px] h-[24px]" src="/assets/icons/WA.chevron.svg" alt="">
            </div>
        </div>
    </section>
</template>
<script setup>
import { useHotelStore } from '@/stores/modules/hotel';
const hotelStore = useHotelStore();
</script>
<style scoped>
.bg-gradient-h {
    background: linear-gradient(180deg, #F3F3F3 0%, #FAFAFA 100%);
}
</style>
