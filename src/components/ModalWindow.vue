<template>
    <transition name="modal-fade">
      <div v-if="isVisible" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-[600]" @click.self="closeModal">
        <div :class="modalSizeClass" class="bg-white rounded-lg shadow-xl mx-auto transform transition-all">
          <div :class="paddingContent">
            <slot name="content"></slot>
          </div>
            <slot v-if="footer" name="footer"></slot>
        </div>
      </div>
    </transition>
  </template>
  
  <script setup>
  import { computed, defineEmits, defineProps } from 'vue';
  
  const emit = defineEmits(['close']);
  const props = defineProps({
    isVisible: Boolean,
    size: {
      type: String,
      default: 'md',
    },
    paddingContent : {
      type: String,
      default: 'p-6'
    },
    footer: {
      type: String,
      default: null,
    },
  });
  
  const closeModal = () => {
    emit('close');
  };
  
  const modalSizeClass = computed(() => {
    switch (props.size) {
      case 'sm':
        return 'w-1/5';
      case 'lg':
        return 'w-1/2';
      case 'xs':
        return 'w-1/6';
      default:
        return 'w-1/4';
    }
  });
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
  