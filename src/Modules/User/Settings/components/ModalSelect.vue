<template>
    <div class="absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
      <div
        v-for="option in options"
        :key="option.id"
        @click="selectOption(option)"
        class="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
        {{ option.name }}
      </div>
      <div @click="closeModal" class="text-right px-4 py-2 cursor-pointer text-red-500">Close</div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    options: Array
  });
  
  const emit = defineEmits(['close', 'select']);
  
  const selectOption = (option) => {
    emit('select', option);
  };
  
  const closeModal = () => {
    emit('close');
  };
  </script>
  
  <style scoped>
  /* Add any required styles here */
  </style>
  