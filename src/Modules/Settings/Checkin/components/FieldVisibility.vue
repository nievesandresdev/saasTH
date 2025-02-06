<!-- FieldVisibility.vue -->
<template>
    <div class="border hborder-gray-400 rounded-[10px] p-4 flex items-center h-[56px]">
        <!-- icon -->
        <img class="w-4 h-4" :src="'/assets/icons/'+icon+'.svg'">
        <!-- label -->
        <p class="text-sm font-medium leading-[140%] ml-2">{{ label }}</p>
        
        <div v-if="!withDependency" class="ml-auto flex gap-6 items-center">
            <!-- controls -->
            <div class="flex items-center gap-1">
                <span class="text-sm font-semibold leading-[120%]" :class="{'opacity-25':disabled}">Visible</span>
                <ToggleButton
                    v-model="localVisible"
                    :id="id"
                    :disabled="disabled"
                />
            </div>
            
            <div class="flex items-center gap-2">    
                <span class="text-sm font-semibold leading-[120%]" :class="{'opacity-25':disabled}">Obligatorio</span>
                <Checkbox sizeClasses="w-5 h-5" v-model="localRequired" :isDisabled="disabled"/>
            </div>
        </div>
        <!-- withDependency -->
        <div v-else class="flex gap-2 items-center ml-auto">
            <div class="rounded-full h-6 px-2 hbg-gray-200 py-[7px]">
                <p class="text-[10px] font-semibold leading-[90%]">Con dependencia</p>
            </div>
            <Tooltip
                size="l"
                :top="25"
                :right="0"
            >
                <template v-slot:button>
                    <img class="w-6 h-6" src="/assets/icons/info.blue.svg">
                </template>
                <template v-slot:content>
                    <p class="text-sm">
                        {{textTooltip}}
                    </p>
                </template>
            </Tooltip>
        </div>
    </div>
</template>
  
  <script setup>
  import { ref, watch, defineProps, defineEmits } from 'vue'
  import ToggleButton from '@/components/Buttons/ToggleButton.vue'
  import Checkbox from '@/components/Forms/Checkbox.vue'
  import Tooltip from '@/components/Tooltip.vue'
  // 1. Props con los nombres que usará el padre en los v-model
  const props = defineProps({
    label: {
        type: String,
        default: ''
    },
    visible: {
        type: Boolean,
        default: false
    },
    required: {
        type: Boolean,
        default: false
    },
    id: {
        type: String,
        default: '1'
    },
    icon: {
        type: String,
        default: '1.TH.USER'
    },
    disabled: {
        type: Boolean,
        default: false
    },
    withDependency: {
        type: Boolean,
        default: false
    },
    textTooltip: {
        type: String,
        default: ''
    },
  })
  
  // 2. Eventos que correspondan a 'v-model:visible' / 'v-model:required'
  const emits = defineEmits([
    'update:visible',
    'update:required'
  ])
  
  // 3. Variables reactivas locales
  const localVisible = ref(props.visible)
  const localRequired = ref(props.required)
  
  // 4. Cuando cambian las props desde el padre, sincronizamos
  watch(() => props.visible, (newVal) => {
    localVisible.value = newVal
  })
  watch(() => props.required, (newVal) => {
    localRequired.value = newVal
  })
  
  // 5. Cuando cambian las refs locales en el hijo, emitimos al padre
  watch(localVisible, (newVal) => {
    emits('update:visible', newVal)
  })
  watch(localRequired, (newVal) => {
    emits('update:required', newVal)
  })
  </script>
  
<style scoped>
  
</style>
  