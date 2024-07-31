<template>
  <transition name="modal-fade">
    <div
      v-if="isVisible"
      class="fixed inset-0 flex items-center justify-center bg-[#00000088] z-[10000]"
      @click.self="closeModal"
    >
      <div :style="{ width: modalWidth }" class="bg-white rounded-[10px] shadow mx-auto transform transition-all">
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
  width: {
    type: String,
    default: '400px', // Default width in pixels
  },
  paddingContent: {
    type: String,
    default: 'p-6'
  },
  footer: {
    type: Boolean,
    default: false,
  },
});

const closeModal = () => {
  emit('close');
};

const modalWidth = computed(() => {
  return props.width;
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
