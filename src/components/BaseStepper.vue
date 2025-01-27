<template>
    <div class="flex items-center justify-between relative">
        <div 
            v-for="(step, index) in steps" 
            :key="index" 
            class="relative flex flex-col items-center w-[25%]"
        >
            <!-- Número del paso -->
            <div
                class="cursor-pointer"
                :class="['w-10 h-10 rounded-full flex items-center justify-center text-lg font-semibold z-10',
                modelValue == index ? 'bg-[#34A98F] text-white' : 'bg-white text-black border border-gray-300'
                
                ]"
                @click="value = index"
            >
            {{ index+1 }}
            </div>

            <!-- Etiqueta del paso -->
            <span 
            :class="[
                'text-sm text-center font-semibold mt-1',
                modelValue >= index ? 'text-[#333333]' : 'text-[#333333]'
            ]"
            >
            {{ step.name ?? step }}
            </span>

            <!-- Línea de conexión entre pasos -->
        </div>
        <div 
            v-if="index !== steps.length - 1"
            class="border-gray-300"
            :class="[ 
                'absolute h-0 border top-5',
            ]"
            :style="{ width: 'calc(100% - 150px)', left: '80px' }"
        ></div>
    </div>
</template>

<script setup>
import { ref, computed, toRefs } from 'vue';

const emit = defineEmits(['update:modelValue']);

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false,
    },
    steps: {
        type: Array,
        default: () => ([])
    }
});
const { steps , modelValue } = toRefs(props);

const value = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val),
});

  
const nextStep = () => {
    if (modelValue.value < steps.length) {
        modelValue.value++;
    }
};

const prevStep = () => {
  if (modelValue.value > 1) {
    modelValue.value--;
  }
};

</script>