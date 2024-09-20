<template>
    <section class="flex justify-between py-[20px] border-b border-[#BFBFBF] mx-[24px] z-[100]">
        <div class="space-x-2 flex">
            <h1 class="font-medium text-[22px]">Instalaciones</h1>
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
                        Aquí podrás gestionar las instalaciones que forman parte de tu alojamiento y ofrecer su información esencial. Ésta será la información que verán tus huéspedes en tu WebApp.
                    </p>
                </template>
            </BaseTooltipResponsive>
        </div>
        <div class="flex items-center">
            <div class="mr-2 text-gray-700 font-semibold text-sm">Mostrar al huésped</div>
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
                        Con el interruptor "Mostrar al huésped" controlas la visibilidad de cierta información para el huésped.
                    </p>
                    <p class="mt-2 text-sm leading-[150%] font-normal">
                        Mientras se encuentre apagado, tus huéspedes dejarán de ver el contenido de esta sección en tu WebApp.
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