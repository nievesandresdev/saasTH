<template>
    <transition name="modal-fade">
      <div v-if="isVisible" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50" @click.self="closeModal">
        <div class="bg-white rounded-lg shadow-xl max-w-md mx-auto transform transition-all">
          <div class="p-6">
            <slot name="content">
              <!-- Default content can go here -->
            </slot>
          </div>
        </div>
      </div>
    </transition>
  </template>
  
  <script setup>
  import { defineEmits, defineProps } from 'vue';
  
  const emit = defineEmits(['close']);
  const props = defineProps(['isVisible']);
  
  const closeModal = () => {
    emit('close');
  };
  </script>
  
  <style scoped>
  .modal-fade-enter-active, .modal-fade-leave-active {
    transition: opacity 0.5s ease;
  }
  .modal-fade-enter-from, .modal-fade-leave-to {
    opacity: 0;
  }
  .modal-fade-enter-to, .modal-fade-leave-from {
    opacity: 1;
  }
  </style>
  