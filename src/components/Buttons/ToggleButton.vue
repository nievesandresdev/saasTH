<template>
    <div class="relative cursor-pointer" :class="{ 'opacity-50 cursor-not-allowed': disabled }">
      <input
        type="checkbox"
        class="sr-only"
        :id="id"
        v-model="internalValue"
        :disabled="disabled"
        @change="toggle"
      />
      <label :for="id">
        <!-- :class="`bg-[${internalValue ? enableColor : disabledColor}]`" -->
        <div
            :style="{ backgroundColor: internalValue ? enableColor : disabledColor }"
          class="w-[1.875rem] h-[1.125rem] rounded-full transition-colors"
        ></div>
        <div
          :style="{ transform: internalValue ? 'translateX(80%)' : 'translateX(0)' }"
          class="dot absolute top-[0.125rem] left-[0.125rem] w-3.5 h-3.5 rounded-full bg-white transition-transform"
        ></div>
      </label>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, computed } from 'vue'
  
  const props = defineProps({
    modelValue: Boolean,
    id: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    enableColor: {
      type: String,
      default: '#34A98F'  // Verde
    },
    disabledColor: {
      type: String,
      default: '#BFBFBF'  // Gris
    }
  })
  
  const emit = defineEmits(['update:modelValue', 'change'])
  const internalValue = ref(props.modelValue)
  
  // watch(() => internalValue.value, (newVal) => {
  //   toggle();
  // })

  watch(() => props.modelValue, (newVal) => {
    internalValue.value = newVal;
  })

  const toggle = () => {
    if (props.disabled) return
    emit('update:modelValue', internalValue.value)
    emit('change', internalValue.value)
  }
  
  const id = computed(() => props.id || `toggle-${Math.random().toString(36).substr(2, 9)}`)
  </script>
  
  <style scoped>
  .dot {
    transition: transform 0.3s ease;
  }
  </style>
  