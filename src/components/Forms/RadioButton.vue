<template>
    <div class="radio-container flex items-center">
      <label class="radio-label-button inline-flex items-center cursor-pointer relative mb-0">
        <input type="radio" 
               :value="value"
               :checked="modelValue === value"
               @change="onChange"
               class="radio-input"
               @focus="focused = true" 
               @blur="focused = false"
               @mouseover="hovered = true" 
               @mouseleave="hovered = false"/>
        <span class="radio-icon w-4 h-4 relative rounded-full flex justify-center items-center">
          <span 
            class="radio-inner-icon hbg-green-600 w-[7px] h-[7px] rounded-full" 
            v-show="modelValue === value"
        ></span>
        </span>
      </label>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const props = defineProps({
    modelValue: [String, Number],
    value: [String, Number]
  });
  
  const emit = defineEmits(['update:modelValue']);
  const focused = ref(false);
  const hovered = ref(false);
  
  function onChange(event) {
    emit('update:modelValue', event.target.value);
  }
  </script>
  
  <style scoped>
  .radio-input {
    opacity: 0;
    position: absolute;
  }
  
  .radio-icon {
    border: 1px solid #000;
    transition: all 0.2s ease;
  }
  
  .radio-inner-icon {
    display: none;
  }
  
  .radio-input:checked + .radio-icon .radio-inner-icon {
    display: block;
  }
  
  .radio-icon:hover {
    border-color: #333;
  }

  .radio-icon:hover {
    background-color: #EBF9F0;
  }
  
  .radio-icon:focus-within {
    box-shadow: 0 0 0 2px #EBF9F0; /* Light teal focus ring */
  }
  </style>
  