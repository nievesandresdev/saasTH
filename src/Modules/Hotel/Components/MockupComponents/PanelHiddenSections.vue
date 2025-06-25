<template>
<div class="w-[500px] h-screen bg-white fixed top-0 right-0 z-10 shadow-hoster2 overflow-y-auto">
    <section class="px-4 py-6 border-b hborder-gray-400">
        <h1 class="text-[22px] font-medium leading-[72%]">Módulos ocultos</h1>
    </section>
    <section class="px-4 py-6">
        <p class="text-base leading-[140%]">Estos son los módulos que no estás mostrando a tus huéspedes. Actívalos si deseas mostrarlos.</p>
        <div class="mt-[76px]" v-if="!hiddenKeys.length">
            <p class="text-center text-base font-medium leading-[120%] text-[#a0a0a0]">Enhorabuena!</p>
            <p class="text-center text-base font-medium leading-[120%] text-[#a0a0a0]">No tienes módulos ocultos</p>
            <img src="/assets/img/undraw_hiddensections.svg" alt="check" class="mt-6 mx-auto">
        </div>

        <div class="mt-6 flex flex-col gap-6" v-if="rawSections && hiddenKeys.length">
            <template v-for="name in hiddenKeys" :key="name">
                <component
                    :is="componentMap[name]"
                    @updateOrderSections="updateOrderSectionsLocal"
                    @mouseup="() => onMouseUp(String(name))"
                />
            </template>
        </div>
    </section>
</div>
</template>
<script setup>
import { ref, inject, watch } from 'vue'
import buttonsSection from './PanelCards/ButtonsCard.vue';
import servicesSection from './PanelCards/ServicesCard.vue';
import facilitiesSection from './PanelCards/FacilitiesCard.vue';
import placesExploreSection from './PanelCards/PlacesExploreCard.vue';
import placesRecommendationSection from './PanelCards/PlacesRecommendationCard.vue';
import activitiesSection from './PanelCards/ActivitiesCard.vue';
import socialNetworksSection from './PanelCards/SocialNetworksSectionCard.vue';

const rawSections = inject('rawSections')
const hiddenKeys = inject('hiddenKeys')
const emit = defineEmits(['updateOrderSections','onMouseUp'])

// watch(hiddenKeys, (newVal) => {
//     console.log('test hiddenKeys',newVal)
// }, { deep: true })

const componentMap = {
  buttonsSection,
  facilitiesSection,
  placesRecommendationSection,
  placesExploreSection,
  servicesSection,
  activitiesSection,
  socialNetworksSection
};

const updateOrderSectionsLocal = (newOrder) => {
    emit('updateOrderSections', newOrder)
}

function onMouseUp(name) {
  emit('onMouseUp', name)
}
</script>