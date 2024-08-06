<template>
  <transition name="modal-fade">
    <div
      v-if="isVisible"
      class="fixed inset-0 flex items-center justify-center bg-[#00000088] z-[10000]"
      @click.self="closeModal"
    >
      <div :style="{ width: modalWidth }" class="bg-white rounded-[10px] shadow mx-auto transform transition-all overflow-hidden">
        <div :class="computedPaddingContent" class="">
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
    default: '400px',
  },
  paddingContent: {
    type: String,
    default: 'p-6'
  },
  paddingTop: {
    type: String,
    default: ''
  },
  paddingBottom: {
    type: String,
    default: ''
  },
  paddingLeft: {
    type: String,
    default: ''
  },
  paddingRight: {
    type: String,
    default: ''
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

const computedPaddingContent = computed(() => {
  const { paddingTop, paddingBottom, paddingLeft, paddingRight, paddingContent } = props;
  if (paddingTop || paddingBottom || paddingLeft || paddingRight) {
    return [
      paddingTop ? `pt-${paddingTop}` : '',
      paddingBottom ? `mb-${paddingBottom}` : '',
      paddingLeft ? `pl-${paddingLeft}` : '',
      paddingRight ? `pr-${paddingRight}` : ''
    ].join(' ').trim();
  }
  return paddingContent;
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
