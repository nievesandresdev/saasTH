<template>
    <div class="flex items-center">
      <template v-for="i in 5">
        <img
          class="w-4 h-4 mx-1"
          :key="'filled-' + i"
          v-if="i <= filledIcons"
          :src="icon_full"
        />
        <img
          class="w-4 h-4 mx-1"
          :key="'empty-' + i"
          v-if="i > filledIcons"
          :src="icon_empty"
        />
      </template>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue';
  
  const props = defineProps({
    icon_full: {
      type: String,
      default: '/assets/icons/1.TH.REVIEW.YELLOW.svg',
    },
    icon_empty: {
      type: String,
      default: '/assets/icons/1.TH.REVIEW.OUTLINE.YELLOW.svg',
    },
    rating: {
      type: Number,
      required: true,
    },
    mode: {
      type: String,
      default: '5', // Default to 5-star mode, can also be '10'
    },
  });
  
  // Calcula el número de íconos llenos a mostrar
  const filledIcons = computed(() => {
    if (props.mode === '5') {
      return Math.floor(props.rating);
    } else if (props.mode === '10') {
      return Math.floor(props.rating / 2);
    }
    return 0;
  });
  </script>
  