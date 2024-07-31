<template>
    <div class="py-6 border-b hborder-gray-400">
      <p class="text-sm leading-[140%] htext-gray-500 text-right">
        {{$formatTimestampDate(data.created_at, 'dd/MM/yyyy')}}
      </p>
      <h3 class="text-sm font-medium leading-[140%] mt-2">{{ data.title }}</h3>
      <h5 class="text-sm font-medium leading-[140%] mt-2 htext-gray-500">{{ data.subtitle }}</h5>
      <p class="mt-4 text-sm font-medium leading-[140%]">
        {{ isExpanded ? data.description : truncatedDescription }}
      </p>
      <button v-if="showMoreButton" @click="toggleDescription" class="mt-2 text-sm font-medium leading-[110%] underline">
        {{ isExpanded ? 'Mostrar menos' : 'Mostrar más' }}
      </button>
      <button v-if="data.link" @click="openLink" class="mt-4 text-sm font-semibold leading-[120%] flex items-center ghost-green-600">
        Enlace detalle novedad
        <img class="ml-2 w-5 h-5 ghost-green-600-icon" src="/assets/icons/1.TH.NEXT.svg" alt="" />
      </button>
      <div class="mt-6">
        <EmojiFeedbackInput />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, provide, reactive } from 'vue'
  import EmojiFeedbackInput from '@/components/EmojiFeedbackInput.vue'
  
  const props = defineProps({
    data: Object
  })
  
  const isExpanded = ref(false)
  
  const truncatedDescription = computed(() => {
    return props.data.description.length > 240 
      ? props.data.description.slice(0, 240) + '...'
      : props.data.description
  })
  
  const showMoreButton = computed(() => {
    return props.data.description.length > 240
  })
  
  const toggleDescription = () => {
    isExpanded.value = !isExpanded.value
  }
  
  const openLink = () => {
    if (props.data.link) {
      window.open(props.data.link, '_blank')
    }
  }
  
  const form = reactive({
    type: null
  })
  
  provide('form', form)
  </script>
  