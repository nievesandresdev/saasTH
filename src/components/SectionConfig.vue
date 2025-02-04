<template>
  <section
    :class="[baseClass, xlClass, xl3Class]"
   
    :style="{
      width: width,
      marginBottom: marginBottom,
      marginTop: marginTop,
      backgroundImage: iconBg ? `url(${srcBg})` : 'none',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: '25%',
    }"
  >
  <div :class="[bgClass, baseClass, xlClass, xl3Class, 'py-4 px-4 rounded-[10px] shadow-hoster']">
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
  },
  xlClass: {
    type: String,
    default: '1xl:w-full'
  },
  xl3Class: {
    type: String,
    default: '3xl:w-full'
  },
  iconBg: {
    type: Boolean,
    default: false
  },
  srcBg: {
    type: String,
    default: ''
  },
  bgClass: {
    type: String,
    default: 'bg-white'
  }
})

const baseClass = 'w-full'
</script>

<style scoped>
</style>
