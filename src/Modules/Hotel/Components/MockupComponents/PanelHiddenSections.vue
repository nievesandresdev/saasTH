<template>
<div class="w-[500px] h-screen bg-white fixed top-0 right-0 z-10 shadow-hoster2 overflow-y-auto">
    <section class="px-4 py-6 border-b hborder-gray-400">
        <h1 class="text-[22px] font-medium leading-[72%]">Módulos ocultos</h1>
    </section>
    <section class="px-4 py-6">
        <p class="text-base leading-[140%]">Estos son los módulos que no estás mostrando a tus huéspedes. Actívalos si deseas mostrarlos.</p>
        <div class="mt-[76px]" v-if="false">
            <p class="text-center text-base font-medium leading-[120%] text-[#a0a0a0]">Enhorabuena!</p>
            <p class="text-center text-base font-medium leading-[120%] text-[#a0a0a0]">No tienes módulos ocultos</p>
            <img src="/assets/img/undraw_hiddensections.svg" alt="check" class="mt-6 mx-auto">
        </div>

        <div class="mt-6 flex flex-col gap-6" v-if="rawSections && true">
            <ButtonsCard />
            <ServicesCard />
            <FacilitiesCard />
            <PlacesExploreCard />
            <PlacesRecommendationCard />
            <ActivitiesCard />
            <SocialNetworksSectionCard />
        </div>
    </section>
</div>
</template>
<script setup>
import ButtonsCard from './PanelCards/ButtonsCard.vue';
import ServicesCard from './PanelCards/ServicesCard.vue';
import FacilitiesCard from './PanelCards/FacilitiesCard.vue';
import PlacesExploreCard from './PanelCards/PlacesExploreCard.vue';
import PlacesRecommendationCard from './PanelCards/PlacesRecommendationCard.vue';
import ActivitiesCard from './PanelCards/ActivitiesCard.vue';
import SocialNetworksSectionCard from './PanelCards/SocialNetworksSectionCard.vue';
import { ref, inject } from 'vue'
const rawSections = inject('rawSections')
</script>