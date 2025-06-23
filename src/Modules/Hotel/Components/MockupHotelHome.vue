<template>
    <div class="w-[375px] bg-white shadow-hoster border border-[#BFBFBF] rounded-[20px] mx-6 overflow-hidden pb-6 mb-6">
        <!-- no draggables -->
        <HeroSection @click="test = true"/>
        <StayBannerCard />
        <ButtonsSection  v-if="rawSections"/>
        <!-- end no draggables -->
        <!-- draggables -->
        <div ref="container" class="flex flex-col gap-6 px-2 pb-4 mt-8" v-if="rawSections">
          <template v-for="name in items" :key="name">
            <component
                :is="componentMap[name]"
                 @mouseup="() => onMouseUp(String(name))"
                 @updateOrderSections="updateOrderSectionsLocal"
            />
          </template>
        </div>

    </div>
    <PanelHiddenSections />
    <SlidePanel :isOpen="test" @closePanel="test = false">
        <!-- content -->
        <div>
            <!-- head panel -->
            <div class="py-5 px-6 flex justify-between items-center border-b hborder-gray-400">
                <h1 class="text-[22px] font-medium leading-[110%]">
                    red WiFi
                </h1>
                <button @click="test = false">
                    <img src="/assets/icons/1.TH.CLOSE.svg" alt="close" class="w-6 h-6">
                </button>
            </div>
            
        </div>
        
    </SlidePanel>
</template>
<script setup>
import { ref, reactive, provide, onMounted, watch } from 'vue'
import HeroSection from './MockupComponents/HeroSection.vue';
import StayBannerCard from './MockupComponents/StayBannerCard.vue';
import ButtonsSection from './MockupComponents/ButtonsSection.vue';
import facilitiesSection from './MockupComponents/FacilitiesSection.vue';
import placesRecommendationSection from './MockupComponents/PlacesRecSection.vue';
import placesExploreSection from './MockupComponents/PlacesExpSection.vue';
import servicesSection from './MockupComponents/ServicesSection.vue';
import activitiesSection from './MockupComponents/ActivitiesSection.vue';
import socialNetworksSection from './MockupComponents/SocialNetworksSection.vue';
import SlidePanel from '@/components/SlidePanel.vue';
import PanelHiddenSections from './MockupComponents/PanelHiddenSections.vue';
//
import { useDragAndDrop } from '@formkit/drag-and-drop/vue'
import { state } from "@formkit/drag-and-drop";
import { animations } from '@formkit/drag-and-drop'
//
import { useHotelStore } from '@/stores/modules/hotel'
const hotelStore = useHotelStore()

const componentMap = {
  facilitiesSection,
  placesRecommendationSection,
  placesExploreSection,
  servicesSection,
  activitiesSection,
  socialNetworksSection
};

const rawSections = ref(null)
const visibleKeys = ref(null)
const currentSection = ref(null)
const test = ref(false)
onMounted(async () => {
  const { data, ok } = await hotelStore.$getOrderSections()
  rawSections.value = ok ? data : null
  visibleKeys.value = ok ? rawSections.value.order : null
})

const [container, items] = useDragAndDrop(visibleKeys, {
  plugins: [animations()],
})

state.on('dragStarted', () => {
    const index = state.targetIndex
    const name = visibleKeys.value[index]
    // console.log('🔹 Sección arrastrada:', name)
    currentSection.value = name
});

state.on('dragEnded', async () => {
  rawSections.value.order = visibleKeys.value;
  updateOrderSectionsApi()
});


function onMouseUp(index) {
  currentSection.value = index
}

function updateOrderSectionsLocal() {
  visibleKeys.value = rawSections.value.order.filter(key => {
    return rawSections.value[key]?.visibility !== false;
  });
  rawSections.value.order = visibleKeys.value
  updateOrderSectionsApi()
}

async function updateOrderSectionsApi() {
  // const { data, ok } = await hotelStore.$updateOrderSections({orderSections : rawSections.value})
}

provide('rawSections', rawSections)
provide('currentSection', currentSection)
</script>