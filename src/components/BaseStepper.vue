<template>
    <div id="steps" ref="stepContainerRef" class="flex items-center justify-between relative">
        <div 
            v-for="(step, index) in steps" 
            :key="index"
            :id="`step-${index}`" 
            class=" relative flex flex-col items-center w-[25%]"
        >
            <!-- Número del paso -->
            <div
                class="cursor-pointer"
                :class="['w-10 h-10 rounded-full flex items-center justify-center text-lg font-semibold z-10', (modelValue >= index)  ? 'bg-[#34A98F] text-white' : 'bg-white text-black border border-gray-300']"
                @click="nextStep(index)"
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
            <!-- <div
                class="absolute h-1 border top-0 right-[20px]"
                :id="`step-line-${index}`"
                :class="modelValue >= steps.length - 1 ? 'border-[#34A98F]' : 'border-grey-300'"
                :style="{ width: 'calc(100% - 150px)' }"
            /> -->
            <div 
                v-if="index !== steps.length - 1" 
                :id="`step-line-${index}`"
                class="absolute h-0 border top-5"
                :class="index + 1 <= modelValue ? 'border-[#34A98F]' : 'border-grey-300'"
                :style="{ width: `calc(${widthContainerSteps}px / ${steps.length} )`, left: '77px' }"
            ></div>
        </div>
        <!-- :class="[ 
            'absolute h-0 border top-5',
            currentStep >= (step.number + 1) ? 'border-[#34A98F]' : 'border-gray-300'
        ]"  -->
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
const stepContainerRef = ref(null);
const { steps , modelValue } = toRefs(props);

const value = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val),
});

const widthContainerSteps = computed(() => {
    let width = steps.value.length <= 2 ? 200 : 0;
    if (stepContainerRef.value) {
        width += stepContainerRef.value.offsetWidth;
        return width;
    }
    return width;
});
  
const nextStep = (i) => {
    if (steps.value[i].disabled) {
        return;
    }
    value.value = i;
};

const prevStep = () => {
  if (modelValue.value > 1) {
    modelValue.value--;
  }
};

</script>