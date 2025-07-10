<template>
    <div class="w-[375px] bg-white shadow-hoster border border-[#BFBFBF] rounded-[20px] mx-6 overflow-hidden pb-6">
        <!-- no draggables -->
        <HeroSection @click="panelSelected = 'heroSection'"/>
        <StayBannerCard />
        <buttonsSection  v-if="visibleKeys.length && rawSections.buttonsSection.visibility" @updateOrderSections="updatehiddenSections"/>
        <!-- end no draggables -->  
        <!-- draggables -->
        <div  ref="container" id="mockupHome" class="flex flex-col gap-6 px-2 pb-4 mt-8" v-if="visibleKeys.length">
          <template v-for="name in items" :key="name">
            <component
                v-show="name !== 'buttonsSection'"
                :is="componentMap[name]"
                @updateOrderSections="updatehiddenSections"
                @mouseup="() => onMouseUp(String(name))"
            />
          </template>
        </div>
        <CoverImageSlide />
        <PlaceRecStylesSlide @updateStyle="updateOrderSectionsApi" v-if="rawSections.placesRecommendationSection"/>
        <PlaceExpStylesSlide @updateStyle="updateOrderSectionsApi" v-if="rawSections.placesExploreSection"/>
        <ServicesStylesSlide @updateStyle="updateOrderSectionsApi" v-if="rawSections.servicesSection"/>
        <SectionButtonsSlide />
    </div>
    <PanelHiddenSections @updateOrderSections="updateVisiblesSections" @onMouseUp="onMouseUp"/>
</template>
<script setup>
import { ref, reactive, provide, onMounted, watch } from 'vue'
// COMPONENTS
import HeroSection from './MockupComponents/HeroSection.vue';
import StayBannerCard from './MockupComponents/StayBannerCard.vue';
import buttonsSection from './MockupComponents/ButtonsSection.vue';
import facilitiesSection from './MockupComponents/FacilitiesSection.vue';
import placesRecommendationSection from './MockupComponents/PlacesRecSection.vue';
import placesExploreSection from './MockupComponents/PlacesExpSection.vue';
import servicesSection from './MockupComponents/ServicesSection.vue';
import activitiesSection from './MockupComponents/ActivitiesSection.vue';
import socialNetworksSection from './MockupComponents/SocialNetworksSection.vue';
// PANELS
import PanelHiddenSections from './MockupComponents/PanelHiddenSections.vue';
import PlaceRecStylesSlide from './MockupComponents/Panels/PlaceRecStylesSlide.vue';
import PlaceExpStylesSlide from './MockupComponents/Panels/PlaceExpStylesSlide.vue';
import ServicesStylesSlide from './MockupComponents/Panels/ServicesStylesSlide.vue';
import CoverImageSlide from './MockupComponents/Panels/CoverImageSlide.vue';
import SectionButtonsSlide from './MockupComponents/Panels/SectionButtonsSlide.vue';
// drag and drop

import { useDragAndDrop } from '@formkit/drag-and-drop/vue'
import { state } from "@formkit/drag-and-drop";
import { animations } from '@formkit/drag-and-drop'
//
import { useHotelStore } from '@/stores/modules/hotel'
const hotelStore = useHotelStore()
import { useToastAlert } from '@/composables/useToastAlert'
const toast = useToastAlert();

const componentMap = {
  buttonsSection,
  facilitiesSection,
  placesRecommendationSection,
  placesExploreSection,
  servicesSection,
  activitiesSection,
  socialNetworksSection
};

const rawSections = ref([])
const visibleKeys = ref([])
const hiddenKeys = ref([])
const currentSection = ref(null)
const panelSelected = ref(null)

onMounted(async () => {
  const { data, ok } = await hotelStore.$getOrderSections()
  rawSections.value = ok ? data : null
  visibleKeys.value = ok ? rawSections.value.visibleOrder : []
  hiddenKeys.value = ok ? rawSections.value.hiddenOrder : []
})

const [container, items] = useDragAndDrop(visibleKeys, {
  plugins: [animations()],
})

state.on('dragStarted', () => {
  let idSection = state.initialParent.el.id
  if(idSection === 'mockupHome'){
    const index = state.targetIndex
    const name = visibleKeys.value[index]
    currentSection.value = name
  }
});

state.on('dragEnded', async () => {
  let idSection = state.initialParent.el.id
  if(idSection === 'mockupHome'){
    rawSections.value.visibleOrder = visibleKeys.value;
    updateOrderSectionsApi()
  }
});


function onMouseUp(index) {
  currentSection.value = null
  panelSelected.value = index
}

function updatehiddenSections(hiddenSection) {
  visibleKeys.value = rawSections.value.visibleOrder.filter(key => {
    return rawSections.value[key]?.visibility !== false;
  });
  rawSections.value.visibleOrder = visibleKeys.value
  //añadir a hiddenKeys y actualizar rawSections.value.hiddenOrder
  hiddenKeys.value.unshift(String(hiddenSection))
  rawSections.value.hiddenOrder = hiddenKeys.value
  updateOrderSectionsApi()
}

function updateVisiblesSections(newVisibleSection) {
  hiddenKeys.value = hiddenKeys.value.filter(key => key !== String(newVisibleSection))
  rawSections.value.hiddenOrder = hiddenKeys.value
  visibleKeys.value.unshift(String(newVisibleSection))
  rawSections.value.visibleOrder = visibleKeys.value
  updateOrderSectionsApi()
}

async function updateOrderSectionsApi() {
  
  const response = await hotelStore.$updateOrderSections({orderSections : rawSections.value})
  if(response.ok){
    toast.warningToast('Actualizado!','top-right');
  } else {
    toast.errorToast('Error al actualizar', 'top-right');
  }
}

provide('rawSections', rawSections)
provide('hiddenKeys', hiddenKeys)
provide('currentSection', currentSection)
provide('panelSelected', panelSelected)
</script>