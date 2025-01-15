<template>
    <section class="flex justify-between py-[20px] border-b border-[#BFBFBF] mx-[24px] z-[100]">
        <div class="space-x-2 flex">
            <h1 class="font-medium text-[22px]">Programa de referidos</h1>
            <BaseTooltipResponsive
                size="l"
                :top="35"
                :left="-0"
            >
                <template #button>
                    <img class="w-[24px] h-[24px]" src="/assets/icons/TH.INFO.GREEN.svg">
                    </template>
                    <template #content>
                    <p class="text-sm leading-[150%] font-normal">
                        Incentiva a tus huéspedes actuales con beneficios para recomendar tu hotel, aumentando ingresos y fidelizando clientes. ¡Reduce costos de adquisición y maximiza reservas!
                    </p>
                </template>
            </BaseTooltipResponsive>
        </div>
        <div class="flex items-center">
            <div class="mr-2 text-gray-700 font-semibold text-sm">Mostrar en la WebApp</div>
                <BaseSwichInput
                    v-model="hotelData.show_facilities"
                    class="mr-4"
                    @change:value="updateVisivilityFacilities()"
                />
            <BaseTooltipResponsive
                size="l"
                :top="35"
                :right="0"
            >
                <template #button>
                    <img class="w-[24px] h-[24px]" src="/assets/icons/TH.INFO.GREEN.svg">
                    </template>
                    <template #content>
                    <p class="text-sm leading-[150%] font-normal">
                        Con el interruptor "Mostrar en la WebApp" activas el funcionamiento del programa de referidos.<strong> Deberás añadir el regalo al referido para poder activarlo.</strong>

                    </p>
                    <p class="mt-2 text-sm leading-[150%] font-normal">
                        Mientras se encuentre apagado, tus huéspedes dejarán de tener acceso al programa de referidos en la WebApp.
                    </p>
                </template>
            </BaseTooltipResponsive>
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

    async function updateVisivilityFacilities () {
        const response = await hotelStore.$updateVisivilityFacilities();
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