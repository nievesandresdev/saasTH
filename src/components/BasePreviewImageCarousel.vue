<template>
  <div
    v-if="isPreviewOpen"
    class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[20000]"
    @click="closePreview"
  >
    <div class="relative m-auto" @click.stop>
      <div class="relative flex justify-center items-center w-[800px] h-[500px] overflow-hidden rounded-[6px]">
        <img
          :src="images[currentSlide]"
          class="w-[800px] h-[500px] object-cover"
          :key="currentSlide"
        />
        <button
          @click="closePreview"
          class="absolute top-4 left-4 z-50 p-2 bg-[#d9d9d9] rounded-full"
        >
          <img class="w-6 h-6" src="/assets/icons/1.TH.CLOSE.svg">
        </button>
        <button
          v-if="images.length > 1"
          @click="prevSlide"
          class="absolute top-1/2 left-4 z-50 p-2 bg-[#d9d9d9] rounded-full"
        >
          <img class="w-6 h-6" src="/assets/icons/1.TH.BACK.svg">
        </button>
        <button
          v-if="images.length > 1"
          @click="nextSlide"
          class="absolute top-1/2 right-4 z-50 p-2 bg-[#d9d9d9] rounded-full rotate-full"
        >
          <img class="w-6 h-6" src="/assets/icons/1.TH.BACK.svg">
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue';

const props = defineProps({
  images: Array,
  initialIndex: Number,
  isPreviewOpen: Boolean,
});

const emit = defineEmits('update:isPreviewOpen');

const currentSlide = ref(props.initialIndex);

const closePreview = () => {
  emit('update:isPreviewOpen', false);
};

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + props.images.length) % props.images.length;
};

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % props.images.length;
};

watch(
  () => props.isPreviewOpen,
  async (isOpen) => {
    if (isOpen) {
      await nextTick();
      currentSlide.value = props.initialIndex;
    }
  },
  { immediate: true }
);
</script>
<style scoped>
.rotate-full{
    transform: rotate(180deg);
}
</style>
