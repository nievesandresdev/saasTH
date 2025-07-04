<template>
    <SlidePanel :isOpen="panelSelected === 'placesExploreSection'" @closePanel="closePanel" :right="0">
        <!-- content -->
        <div class="h-full flex flex-col">
            <!-- head panel -->
            <section class="px-4 py-6 border-b hborder-gray-400 flex items-center justify-between">
                <h1 class="text-[22px] font-medium leading-[72%]">Editar módulo</h1>
                <button @click="closePanel">
                    <img src="/assets/icons/1.TH.CLOSE.svg" alt="close" class="w-6 h-6">
                </button>
            </section>
            <WarningHiddenSection v-if="rawSections.placesExploreSection.visibility === false" />

            <section class="px-4 mt-6 pb-6 overflow-y-auto flex-grow">
                <!-- card -->
                <div>
                    <div class="flex items-center gap-1">
                        <RadioButton value="1" v-model="option"/>
                        <span class="text-base font-medium leading-[140%]">Opción A</span>
                    </div>
                    <div class="p-4 border hborder-gray-400 rounded-[10px] mt-4 w-[408px]">
                        <div class="flex items-center gap-2">
                            <img src="/assets/icons/WA.star.svg" class="w-6 h-6">
                            <h2 class="lato text-[20px] font-bold leading-[18px]">Cerca tuyo</h2>
                        </div>
                        <div class="mt-4 rounded-[10px] overflow-hidden w-[376px] h-[133px]">
                            <img src="/assets/img/mapaExplPlaces.svg" class="w-full h-full">
                        </div>
                        <div class="bg-[#D9D9D9] rounded-[2px] w-[177px] h-[16px] mt-4"></div>
                        <div class="flex gap-2 mt-4 overflow-hidden">
                            <span class="border hborder-disabled-input rounded-[2px] p-1 flex items-center gap-1 flex-shrink-0">
                                <img src="/assets/icons/WA.monumentos.BLACK.svg" alt="" class="w-[16px] h-[16px]">
                                <p class="lato text-sm leading-[16px]">25 Monumentos</p>
                            </span>
                            <span class="border hborder-disabled-input rounded-[2px] p-1 flex items-center gap-1 flex-shrink-0">
                                <img src="/assets/icons/WA.restaurantes.svg" alt="" class="w-[16px] h-[16px]">
                                <p class="lato text-sm leading-[16px]">53 Restaurantes</p>
                            </span>
                            <span class="border hborder-disabled-input rounded-[2px] p-1 flex items-center gap-1 flex-shrink-0">
                                <img src="/assets/icons/WA.Museos.svg" alt="" class="w-[16px] h-[16px]">
                                <p class="lato text-sm leading-[16px]">18Museos</p>
                            </span>
                        </div>
                    </div>
                </div>
                <!-- card -->
                <div class="mt-6">
                    <div class="flex items-center gap-1">
                        <RadioButton value="2" v-model="option"/>
                        <span class="text-base font-medium leading-[140%]">Opción B</span>
                    </div>
                    <div class="p-4 border hborder-gray-400 rounded-[10px] mt-4 w-[468px]">
                        <div class="flex items-center gap-2">
                            <img src="/assets/icons/WA.star.svg" class="w-6 h-6">
                            <h2 class="lato text-[20px] font-bold leading-[18px]">Destino - Recomendados</h2>
                        </div>
                        <div class="mt-4 w-[436px] overflow-x-hidden">
                            <div class="flex gap-4">
                                <img v-for="i in 2" :key="i" src="/assets/img/cardExplPlaces.svg" class="w-[245px] h-[80px] flex-shrink-0">
                            </div>
                            <div class="flex gap-4 mt-2">
                                <img v-for="i in 2" :key="i" src="/assets/img/cardExplPlaces.svg" class="w-[245px] h-[80px] flex-shrink-0">
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <ChangesBar 
                :existingChanges="changesExist"
                :validChanges="changesExist"
                @cancel="closePanel" 
                @submit="changeOption"
            />
        </div>
    </SlidePanel>
</template>
<script setup>
import { inject, computed, ref, onMounted } from 'vue';
import SlidePanel from '@/components/SlidePanel.vue';
import RadioButton from '@/components/Forms/RadioButton.vue';
import ChangesBar from '@/components/Forms/ChangesBar.vue'
import WarningHiddenSection from '@/Modules/Hotel/Components/WarningHiddenSection.vue';
// STORES
import { useGalleryStore } from '@/stores/modules/gallery';
const galleryStore = useGalleryStore()
import { useToastAlert } from '@/composables/useToastAlert'
const toast = useToastAlert();
import { useHotelStore } from '@/stores/modules/hotel';
const hotelStore = useHotelStore()

const emit = defineEmits(['updateStyle']);
// DATA
const panelSelected = inject('panelSelected')
const rawSections = inject('rawSections')
const option = ref('1');

onMounted(() => {
    option.value = String(rawSections.value.placesExploreSection.style);
})

const closePanel = () => {
    panelSelected.value = null;
    option.value = String(rawSections.value.placesExploreSection.style);
}

const changeOption = () => {
    rawSections.value.placesExploreSection.style = Number(option.value);
    emit('updateStyle');
    closePanel();
}


const changesExist = computed(() => {
    return rawSections.value.placesExploreSection.style !== Number(option.value);
})
</script>