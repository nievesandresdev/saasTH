<template>
    <div
      class="cursor-pointer relative px-4 pt-4 pb-2 text-base font-semibold leading-[120%] rounded-t-[10px] hover-green-200"
      :class="{
        'hbg-green-200 htext-green-800': selected,
        'opacity-50': disabled,
      }"
      @click="navigate"
    >
        {{ label }}
        <img v-if="notify" class="absolute top-4 right-[6px] w-2.5 h-2.5" src="/assets/icons/EllipseWarning.svg" alt="">
        <div v-if="selected" class="hbg-green-800 w-full h-1 rounded-full bottom-[-10px] relative left-0"></div>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  
  const props = defineProps({
    label: String,
    viewName: String,
    params: {
      type: Object,
      default: () => ({})
    },
    query: {
      type: Object,
      default: () => ({})
    },
    notify: Boolean,
    selected: Boolean,
    disabled: Boolean
  });
  
  const router = useRouter();
  
  const navigate = () => {
    router.push({ name: props.viewName, params: props.params, query: props.query });
  }
  </script>
  