<template>
    <div class="flex items-center">
        <div class="mr-2 text-gray-700 font-semibold text-sm">Mostrar al huésped</div>
    
            <BaseSwichInput
                id="swich-visible-category"
                v-model="visibilityCategory"
                class="mr-4"
                @change:value="updateVisivilityCategory()"
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
                    Este toggle te permite mostrar u ocultar las subcategorías de esta sección. Por ejemplo: Puedes optar por ocultar “Museos” pero “Monumentos” y “Naturaleza” seguirán visibles para tus huéspedes en tu WebApp.
                </p>
            </template>
        </BaseTooltipResponsive>
    </div> 
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

    async function updateVisivilityCategory () {
        let body = {categori_places_id: formFilter.selected_subplace}
        const response = await hotelStore.$updateVisivilityCategory(body);
        const { ok, data } = response;
        await hotelStore.reloadHotel();
        if (ok) {
            visibilityCategory.value = !response.data.hidden_categories.includes(formFilter.selected_subplace);
            toast.warningToast('Cambios guardados con éxito','top-right');
        } else {
            toast.warningToast(data?.message,'top-right');
        }
        mockupStore.$reloadIframe();
    } 

    // FUNCTIONS
</script>