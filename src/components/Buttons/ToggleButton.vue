<template>
    <div class="relative" :class="{ 'opacity-50 cursor-not-allowed': disabled, 'cursor-pointer': !disabled }">
      <input
        type="checkbox"
        class="sr-only"
        :id="id"
        v-model="internalValue"
        :disabled="disabled"
        @change="toggle"
      />
      <label 
        :for="id" class="group"
        :class="{ 'opacity-50 cursor-not-allowed': disabled, 'cursor-pointer': !disabled }"
        @mouseover="isHover = true"
        @mouseout="isHover = false"
      >
        <!-- :class="`bg-[${internalValue ? enableColor : disabledColor}]`" -->
        <div
          class="w-[1.875rem] h-[1.125rem] rounded-full transition-colors"
          :style="{
            backgroundColor: internalValue
              ? (isHover && !disabled ? enableColorHover : enableColor)
              : (isHover && !disabled ? disabledColorHover : disabledColor)
          }"
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
    enableColorHover: {
      type: String,
      default: '#0B6357'  // Verde
    },
    disabledColor: {
      type: String,
      default: '#BFBFBF'  // Gris
    },
    disabledColorHover: {
      type: String,
      default: '#858181'  // Gris
    },
  })
  
  const emit = defineEmits(['update:modelValue', 'change'])
  const internalValue = ref(props.modelValue)
  const isHover = ref(false)
  
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
  