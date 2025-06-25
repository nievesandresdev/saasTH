<template>
    <!-- panelSelected === 'servicesSection' -->
    <SlidePanel :isOpen="panelSelected === 'servicesSection'" @closePanel="closePanel" :right="0">
        <!-- content -->
        <div>
            <!-- head panel -->
            <section class="px-4 py-6 border-b hborder-gray-400 flex items-center justify-between">
                <h1 class="text-[22px] font-medium leading-[72%]">Editar módulo</h1>
                <button @click="closePanel">
                    <img src="/assets/icons/1.TH.CLOSE.svg" alt="close" class="w-6 h-6">
                </button>
            </section>
            <WarningHiddenSection v-if="rawSections.servicesSection.visibility === false" />

            <section class="px-4 mt-6 pb-6 h-[calc(100vh-185px)] overflow-y-auto">
                <!-- card -->
                <div>
                    <div class="flex items-center gap-1">
                        <RadioButton value="1" v-model="option"/>
                        <span class="text-base font-medium leading-[140%]">Opción A</span>
                    </div>
                    <div class="p-4 border hborder-gray-400 rounded-[10px] mt-4 w-[375px]">
                        <div class="flex items-center gap-2">
                            <img src="/assets/icons/WA.servicios.svg" class="w-6 h-6">
                            <h2 class="lato text-[20px] font-bold leading-[18px]">Servicios</h2>
                        </div>
                        <div class="mt-4 flex items-center gap-2">
                            <div class="">
                                <h2 class="lato text-base font-bold leading-[20px]">Tu experiencia, al siguiente nivel</h2>
                                <p class="lato text-sm leading-[16px] mt-2 text-[#777777]">
                                    Relájate y aprovecha al máximo cada servicio pensado para ti.
                                </p>
                                <div class="mt-4">
                                    <p class="lato text-sm font-bold leading-[16px]">Descubrir servicios</p>
                                </div>
                            </div>
                            <img src="/assets/img/servicesslide1.svg" class="w-[115px]">
                        </div>
                    </div>
                </div>
                <!-- card -->
                <div class="mt-6">
                    <div class="flex items-center gap-1">
                        <RadioButton value="2" v-model="option"/>
                        <span class="text-base font-medium leading-[140%]">Opción B</span>
                    </div>
                    <div class="p-4 border hborder-gray-400 rounded-[10px] mt-4 w-[375px]">
                        <div class="flex items-center gap-2">
                            <img src="/assets/icons/WA.servicios.svg" class="w-6 h-6">
                            <h2 class="lato text-[20px] font-bold leading-[18px]">Servicios</h2>
                        </div>
                        <div 
                            class="mt-4 rounded-[10px] w-[343px] h-[238px] relative bg-center shadow-hoster" 
                            style="background-image: url('/assets/img/servicesslide2.svg');"
                        >    
                        </div>
                    </div>
                </div>
            </section>
            
        </div>
        <ChangesBar 
            :existingChanges="changesExist"
            :validChanges="changesExist"
            @cancel="closePanel" 
            @submit="changeOption"
        />
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
    option.value = String(rawSections.value.servicesSection.style);
})

const closePanel = () => {
    panelSelected.value = null;
    option.value = String(rawSections.value.servicesSection.style);
}

const changeOption = () => {
    rawSections.value.servicesSection.style = Number(option.value);
    emit('updateStyle');
    closePanel();
}


const changesExist = computed(() => {
    return rawSections.value.servicesSection.style !== Number(option.value);
})
</script>