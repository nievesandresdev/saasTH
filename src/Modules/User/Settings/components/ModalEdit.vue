<template>
    <ModalWindow
      :isVisible="isVisible"
      @close="closeModal"
      :width="width"
    >
      <template #content>
        <p>Editar puesto de trabajo</p>
        <!-- Add form fields for editing an existing work position -->
      </template>
    </ModalWindow>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  import ModalWindow from '@/components/ModalWindow.vue' 
  
  const props = defineProps({
    isVisible: Boolean,
    width: {
      type: String,
      default: '400px',
    },
  });
  
  const emit = defineEmits(['close']);
  
  const closeModal = () => {
    emit('close');
  };
  </script>
  