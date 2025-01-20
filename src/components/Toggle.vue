<template>
    <label class="relative cursor-pointer mb-0" :class="marginRight">
      <input
        :checked="modelValue"
        type="checkbox"
        class="sr-only"
        @change="toglestate"
        :disabled="toggleDisabled"
      />
      <div :class="['block w-[1.875rem] h-[1.125rem] rounded-full', modelValue ? 'bg-[#34A98F]' : 'bg-gray-400']"></div>
      <div :class="['dot absolute left-[0.125rem] top-[0.125rem] w-3.5 h-3.5 rounded-full transition', modelValue ? 'translate-x-[0.75rem] bg-white' : 'bg-white']"></div>
    </label>
  
    <BaseTooltipResponsive v-if="showTooltip" size="l" :top="35" :right="0">
      <template #button>
        <img class="w-[24px] h-[24px]" src="/assets/icons/TH.INFO.GREEN.svg" />
      </template>
      <template #content>
        <p class="text-sm leading-[150%] font-normal">
          Con el interruptor "Mostrar al huésped" controlas la visibilidad de cierta información para el huésped.
        </p>
        <p class="mt-2 text-sm leading-[150%] font-normal">
          Si está encendido, tu huésped podrá ver en la WebApp de tu alojamiento la información que añadas en esta vista.
        </p>
      </template>
    </BaseTooltipResponsive>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  import BaseTooltipResponsive from '@/components/BaseTooltipResponsive.vue';
  
  // Props
  const props = defineProps({
    modelValue: {
      type: Boolean,
      required: true
    },
    showTooltip: {
      type: Boolean,
      default: true
    },
    marginRight: {
      type: String,
      default: 'mr-4'
    },
    toggleDisabled: {
      type: Boolean,
      default: false
    }
    
  });
  
  // Emitir evento para actualizar el valor de modelValue
  const emit = defineEmits(['update:modelValue']);
  
  // Función para cambiar el estado del toggle
  const toglestate = () => {
    emit('update:modelValue', !props.modelValue); // Emitir el nuevo valor
  };
  </script>
  
  <style lang="scss">
  /* Estilos */
  </style>
  