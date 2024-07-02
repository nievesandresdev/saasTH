<template>
    <label :for="id" class="relative cursor-pointer mb-0 mr-4">
        <input
            :checked="modelValue"
            type="checkbox"
            class="sr-only"
            :id="id"
            @change="updateValue($event)"
            :disabled="disabled"
        />
        <div
        :class="['block w-[1.875rem] h-[1.125rem] rounded-full', modelValue ? 'bg-[#34A98F]' : 'bg-gray-400']"
        ></div>
        <div
        :class="['dot absolute left-[0.125rem] top-[0.125rem] w-3.5 h-3.5 rounded-full transition', modelValue ? 'transform translate-x-full bg-white' : 'bg-white']"
        ></div>
    </label>
</template>
<script setup>
import { ref, computed, onMounted,watch, inject } from 'vue';

// EMITS
const emit = defineEmits(['update:modelValue'])

//DATA PROPS
const props = defineProps({
  disabled: Boolean,
  modelValue: Boolean,
  id: {
      type: String,
      default: 'toggle',
  },
})

const value = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
});

function updateValue(val) {
  value.value = !value.value
}

</script>

<style lang="scss">
</style>