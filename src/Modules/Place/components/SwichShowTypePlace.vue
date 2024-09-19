<template>
    <div class="flex items-center">
        <div class="mr-2 text-gray-700 font-semibold text-sm">Mostrar en la WebApp</div>
            <BaseSwichInput
                id="swich-visible-type-place"
                v-model="visibilityTypePlace"
                class="mr-4"
                @change:value="updateVisivilityTypePlace()"
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
                    Con el interruptor "Mostrar en la WebApp" puedes controlar la visibilidad de la información de esta sección.
                </p>
                <p class="mt-2 text-sm leading-[150%] font-normal">
                    Si está apagado, tus huéspedes no podrán ver este contenido en tu WebApp.
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
    //

    // STORE
    
    
    //
    const hotelStore = inject('hotelStore');
    const mockupStore = inject('mockupStore');
    const toast = inject('toast');
    const hotelData = inject('hotelData');
    const formFilter = inject('formFilter');
    const visibilityTypePlace = inject('visibilityTypePlace');
    const visibilityCategory = inject('visibilityCategory');

    // DATA
    
    
    onMounted(() => {
        visibilityTypePlace.value = !hotelStore.hotelData?.hidden_type_places?.includes(formFilter.selected_place);
        visibilityCategory.value = !hotelStore.hotelData.hidden_categories.includes(formFilter.selected_subplace);
    });

    watch (() => formFilter.selected_place, (valueNew) => {
        // if (valueNew) {
            visibilityTypePlace.value = !hotelStore.hotelData?.hidden_type_places?.includes(formFilter.selected_place);
            visibilityCategory.value = !hotelStore.hotelData.hidden_categories.includes(formFilter.selected_subplace);
        // }
    });
    watch (() => formFilter.selected_subplace, (valueNew) => {
        // if (valueNew) {
            visibilityTypePlace.value = !hotelStore.hotelData?.hidden_type_places?.includes(formFilter.selected_place);
            visibilityCategory.value = !hotelStore.hotelData.hidden_categories.includes(formFilter.selected_subplace);
        // }
    });

    async function updateVisivilityTypePlace () {
        let body = {type_places_id: formFilter.selected_place}
        const response = await hotelStore.$updateVisivilityTypePlace(body);
        const { ok, data } = response;
        await hotelStore.reloadHotel();
        if (ok) {
            // console.log(response.data?.hidden_type_places, 'response.data?.hidden_type_places');
            visibilityTypePlace.value = !response.data?.hidden_type_places?.includes(formFilter.selected_place);
            toast.warningToast('Cambios guardados con éxito','top-right');
        } else {
            toast.warningToast(data?.message,'top-right');
        }
        mockupStore.$reloadIframe();
    } 

    // FUNCTIONS
</script>