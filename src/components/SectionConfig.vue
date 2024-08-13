<template>
    <section class="mt-6" :class="widht">
      <div class="bg-white py-6 px-4 rounded-[10px] shadow-hoster">
        <slot name="title"></slot>
        <slot name="content"></slot>
      </div>
    </section>
  </template>
  
  <script setup>

  import { ref } from 'vue'

  const props = defineProps({
    widht: {
      type: String,
      default: 'w-full'
    }
  })
  </script>
  
  <style scoped>
  </style>
  