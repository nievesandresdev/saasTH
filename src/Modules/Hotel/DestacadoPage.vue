<template>
<div class="min-h-screen flex flex-col justify-between bg-[#FAFAFA]">
    <div :class="{'pr-[400px]': isOpenSidePanel}" class="transition-all duration-300">
      <div class="px-[24px]">
        <section class="flex justify-between py-[20px] border-b border-[#BFBFBF] mb-6">
          <div class="space-x-2 flex">
            <h1 class="font-medium text-[22px]">Home</h1>
            <BaseTooltipResponsive size="l" :top="35" :left="-0">
              <template #button>
                <img class="w-[24px] h-[24px]" src="/assets/icons/TH.INFO.GREEN.svg" />
              </template>
              <template #content>
                <p class="text-sm leading-[150%] font-normal">
                  En esta sección podrás configurar algunos aspectos de la Home de la WebApp de tu alojamiento.
                </p>
              </template>
            </BaseTooltipResponsive>
          </div>
        </section>
        <div class="flex justify-center items-center">
          <div id="mockup" class="relative h-[820px] w-[358px] rounded-lg">
              <div id="content-mockup" class="absolute inset-0">
                  <iframe 
                      class="w-full h-full rounded-[33px]" 
                      :src="store.iframeUrl"
                      :key="store.iframeUrl"
                  ></iframe>
              </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Panel Fijo: Pasamos los datos mediante props -->
    <SidePanel 
      :destacadoData="destacadoData"
      @openConfig="handleOpenConfig"
    />
    
    <!-- Overlay -->
    <div 
      v-if="isConfigPanelOpen" 
      class="fixed inset-0 bg-black bg-opacity-50 z-[2000]"
      @click="closeConfigPanel"
    ></div>

    <!-- Panel Configurable -->
    <BaseSlidePanel :open="isConfigPanelOpen">
      <div class="flex flex-col h-full">
        <div class="py-5 px-6 flex items-center justify-between border-b hborder-gray-400">
          <h2 class="text-[22px] font-medium leading-[110%]">Destacado</h2>
          <img @click="closeConfigPanel" class="cursor-pointer w-6 h-6" src="/assets/icons/1.TH.CLOSE.svg" alt="">
        </div>
        <div class="px-6 pt-6 pb-8 overflow-y-auto" :class="{'h-[79vh]': configChanges, 'h-[91vh]': !configChanges}">
          <!-- Usamos el formulario de configuración -->
          <ConfigForm 
            v-if="selectedConfigData"
            :initial-data="selectedConfigData"
            @update:data="updateConfigData"
            @change="handleConfigChange"
          />
        </div>
        <!-- changes bar -->
        <div class="mt-auto" v-if="configChanges">
          <ChangesBar 
            :existingChanges="true"
            :validChanges="isFormValid"
            @cancel="cancelConfigChanges" 
            @submit="submitConfigChanges"
          />
        </div>
      </div>
    </BaseSlidePanel>

    <ModalNoSave
        :id="'not-saved'"
        :open="configChanges && !isConfigPanelOpen"
        title="¿Salir sin guardar?"
        text="Si sales sin guardar, los cambios que has realizado en esta sección se perderán."
        textbtn="Guardar"
        @saveChanges="handleSubmitData"
        type="save_changes"
    />
  </div>
</template>

<script setup>
import { ref, provide, onMounted, computed } from 'vue';
import BaseTooltipResponsive from '@/components/BaseTooltipResponsive.vue';
import { useMockupStore } from '@/stores/modules/mockup';
import SidePanel from './Components/SidePanel.vue';
import BaseSlidePanel from '@/components/BaseSlidePanel.vue';
import ModalNoSave from '@/components/ModalNoSave.vue';
import ChangesBar from '@/components/Forms/ChangesBar.vue';
import ConfigForm from './Components/ConfigForm.vue';

const store = useMockupStore();
const isOpenSidePanel = ref(true);
const isConfigPanelOpen = ref(false);
const configChanges = ref(false);

// Datos principales
const destacadoData = ref({
  sections: [
    { id: 1, title: 'Sección 1', content: 'Contenido 1' },
    { id: 2, title: 'Sección 2', content: 'Contenido 2' }
  ]
});

// Datos seleccionados para editar
const selectedConfigData = ref(null);

provide('isOpenSidePanel', isOpenSidePanel);

// Cuando se abre el panel de configuración desde el panel fijo
const handleOpenConfig = (sectionData) => {
    selectedConfigData.value = { ...sectionData }; // Clonamos los datos para editar
    isConfigPanelOpen.value = true;
};

const handleConfigChange = () => {
    configChanges.value = true;
};

const closeConfigPanel = () => {
    if (configChanges.value) {
        // Si hay cambios, mostrar modal de confirmación
        isConfigPanelOpen.value = false;
    } else {
        // Si no hay cambios, cerrar directamente
        isConfigPanelOpen.value = false;
        selectedConfigData.value = null;
    }
};

const cancelConfigChanges = () => {
    configChanges.value = false;
    selectedConfigData.value = null;
};

const submitConfigChanges = async () => {
    // Aquí actualizamos los datos principales con los cambios
    if (selectedConfigData.value) {
        const index = destacadoData.value.sections.findIndex(
            section => section.id === selectedConfigData.value.id
        );
        if (index !== -1) {
            destacadoData.value.sections[index] = { ...selectedConfigData.value };
        }
    }
    configChanges.value = false;
    isConfigPanelOpen.value = false;
    selectedConfigData.value = null;
};

const handleSubmitData = async () => {
    await submitConfigChanges();
    isConfigPanelOpen.value = true;
};

// Validación del formulario
const isFormValid = computed(() => {
    if (!selectedConfigData.value) return false;
    return selectedConfigData.value.title && selectedConfigData.value.content;
});

// Actualizar datos del formulario
const updateConfigData = (newData) => {
    selectedConfigData.value = { ...newData };
};

onMounted(async () => {
    store.$setIframeUrl('');
    isOpenSidePanel.value = true;
    // Aquí podrías cargar los datos iniciales
    // const response = await fetchDestacadoData();
    // destacadoData.value = response.data;
});
</script>

<style scoped>
#mockup {
    cursor: inherit;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
    border-radius: 33px;
}
#content-mockup {
    border-radius: 33px;
    overflow: hidden;
}
</style>
