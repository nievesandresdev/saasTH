<template>
    <section class="flex justify-between py-[20px] border-b border-[#BFBFBF] mx-[24px] z-[100]">
        <div class="space-x-2 flex">
            <h1 class="font-medium text-[22px]">Servicios - Confort</h1>
        </div>
        <div class="flex items-center">
            <div class="mr-2 text-gray-700 font-semibold text-sm">Mostrar en la WebApp</div>
                <BaseSwichInput
                    v-model="hotelData.show_confort"
                    class="mr-4"
                    @click="updateVisivilityService"
                />
        </div>
    </section>
</template>

<script setup>
    import { ref, reactive, onMounted, provide, computed, inject } from 'vue';
    //COMPONENTS
    import BaseTooltipResponsive from '@/components/BaseTooltipResponsive.vue';
    import BaseSwichInput from "@/components/Forms/BaseSwichInput.vue";



    // STORE
    
    //
    const hotelStore = inject('hotelStore');
    const mockupStore = inject('mockupStore');
    const toast = inject('toast');
    const hotelData = inject('hotelData');

    // DATA

    async function updateVisivilityService () {
        let bodyRequest = {
            service: "confort"
        }
        const response = await hotelStore.$updateVisivilityService(bodyRequest);
        const { ok, data } = response;
        await hotelStore.reloadHotel();
        if (ok) {
            toast.warningToast('Cambios guardados con éxito','top-right');
        } else {
            toast.warningToast(data?.message,'top-right');
        }
        mockupStore.$setIframeUrl('/');
        mockupStore.$reloadIframe();
    }
</script>