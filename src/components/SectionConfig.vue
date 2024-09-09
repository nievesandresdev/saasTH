<template>
  <section :style="{ width: width, marginBottom: marginBottom , marginTop: marginTop}">
    <div class="bg-white py-6 px-4 rounded-[10px] shadow-hoster">
      <slot name="title"></slot>
      <slot name="content"></slot>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  width: {
    type: String,
    default: '100%'
  },
  marginBottom: {
    type: String,
    default: '0'
  },
  marginTop: {
    type: String,
    default: '0'
  }
})
</script>

<style scoped>
</style>
