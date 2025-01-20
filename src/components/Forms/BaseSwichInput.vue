<template>
    <label :for="id" class="relative cursor-pointer">
        <input
            :checked="modelValue"
            type="checkbox"
            class="sr-only w-10"
            :id="id"
            @change="updateValue($event)"
            :disabled="disabled"
            @click="handleCLick"
        />
        <div
        :class="['block w-[1.875rem] h-[1.125rem] rounded-full', modelValue ? 'bg-[#34A98F]' : `${colorDisabled}`]"
        ></div>
        <div  
          :class="['dot absolute left-[0.125rem] top-[0.125rem] w-3.5 h-3.5 rounded-full transition ', modelValue ? 'translate-x-[0.75rem] bg-white' : 'bg-white']"
        ></div>
        <!-- :class="['dot absolute top-[0.125rem] w-[1rem] h-[1rem] rounded-full transition transform', modelValue ? 'translate-x-[0.75rem] bg-white' : 'bg-white left-[0.125rem]']" -->
    </label>
</template>
<script setup>
import { ref, computed, onMounted,watch, inject } from 'vue';

// EMITS
const emit = defineEmits(['update:modelValue', 'change:value'])

//DATA PROPS
const props = defineProps({
  disabled: Boolean,
  modelValue: null,
  id: {
      type: String,
      default: 'toggle',
  },
  colorDisabled: {
      type: String,
      default: 'bg-[#BFBFBF]'
  }
})

const value = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
});

function updateValue(val) {
  value.value = !value.value
  emit('change:value')
}

function handleCLick (event) {
  event.stopPropagation();
}

</script>

<style lang="scss">
  
</style>