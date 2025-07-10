<template>
    <div class="flex flex-col h-full">
        <!-- head -->
        <div class="py-5 px-6 flex items-center justify-between border-b hborder-gray-400">
            <h2 class="text-[22px] font-medium leading-[110%]">{{ title }}</h2>
        </div>
        <!-- content info -->
        <div class="px-6 pt-6 pb-8 overflow-y-auto" :class="{'h-[79vh]':existingChanges,'h-[91vh]':!existingChanges}">
            <!-- Slot para el contenido personalizado -->
            <slot name="content">
                <!-- Contenido por defecto con elemento clickeable -->
                <div class="space-y-4">
                    <div 
                        @click="openConfigPanel(section)"
                        class="cursor-pointer group"
                        v-for="section in destacadoData.sections"
                        :key="section.id"
                    >
                        <div class="bg-white rounded-lg border border-gray-200 p-4 group-hover:border-gray-300 transition-all">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-3">
                                    <div class="w-12 h-12 bg-[#F3F3F3] rounded-lg flex items-center justify-center">
                                        <img src="/assets/icons/TH.INFO.GREEN.svg" class="w-6 h-6" alt="config">
                                    </div>
                                    <div>
                                        <h3 class="text-base font-medium">{{ section.title }}</h3>
                                        <p class="text-sm text-gray-500">{{ section.content }}</p>
                                    </div>
                                </div>
                                <img src="/assets/icons/TH.CHEVRON.RIGHT.svg" class="w-6 h-6" alt="arrow">
                            </div>
                        </div>
                    </div>
                </div>
            </slot>
        </div>
        <!-- changes bar -->
        <div class="mt-auto" v-if="existingChanges">
            <ChangesBar 
                :existingChanges="true"
                :validChanges="validChanges"
                @cancel="cancelChanges" 
                @submit="submit"
            />
        </div>
    </div>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits } from 'vue';
import ChangesBar from '@/components/Forms/ChangesBar.vue';
import { useToastAlert } from '@/composables/useToastAlert';

const emit = defineEmits(['openConfig']);

defineProps({
    title: {
        type: String,
        default: 'Destacado'
    },
    validChanges: {
        type: Boolean,
        default: true
    },
    destacadoData: {
        type: Object,
        required: true
    }
});

const toast = useToastAlert();

// Estado para controlar cambios
const hasChanges = ref(false);

const existingChanges = computed(() => {
    return hasChanges.value;
});

const cancelChanges = () => {
    hasChanges.value = false;
};

const submit = async () => {
    // Aquí irá la lógica de guardado
    toast.warningToast('Cambios guardados correctamente', 'top-right');
    hasChanges.value = false;
};

const openConfigPanel = (section) => {
    emit('openConfig', section);
};
</script> 