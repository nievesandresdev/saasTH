<template>
    <div class="flex items-center">
        <div class="mr-2 text-gray-700 font-semibold text-sm">Mostrar al huésped</div>
            <BaseSwichInput
                v-model="hotelData.show_experiences"
                id="swich-visible-experience"
                class="mr-4"
                @change:value="updateVisivilityExperiences()"
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
    <!-- {{ hotelData.hidden_type_places }} -->
</template>

<script setup>
    import { ref, reactive, onMounted, provide, computed, inject, watch, watchEffect } from 'vue';
    //COMPONENTS
    import BaseTooltipResponsive from '@/components/BaseTooltipResponsive.vue';
    import BaseSwichInput from "@/components/Forms/BaseSwichInput.vue";

    // STORE
    const mockupStore = inject('mockupStore');
    const toast = inject('toast');
    const hotelStore = inject('hotelStore');

    const hotelData = inject('hotelData');


    // FUNCTIONS
    async function updateVisivilityExperiences () {
        const response = await hotelStore.$updateVisivilityExperiences();
        const { ok, data } = response;
        await hotelStore.reloadHotel();
        if (ok) {
            toast.warningToast('Cambios guardados con éxito','top-right');
        } else {
            toast.warningToast(data?.message,'top-right');
        }
        mockupStore.$reloadIframe();
    }
</script>