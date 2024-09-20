<template>
  <div :class="`absolute left-0 w-${props.widthMenu} mt-${props.mt} bg-white rounded-md shadow-md z-10`" v-show="props.open">
    <div
      v-for="option in props.options"
      :key="option.id"
      :class="{'cursor-pointer': !($isAdmin() && option.id === 1), 'cursor-not-allowed opacity-50': $isAdmin() && option.id === 1}"
      @click="!($isAdmin() && option.id === 1) && selectOption(option)"
      class="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
      <div class="flex flex-col">
        <span :class="{'text-gray-500': $isAdmin() && option.id === 1, 'font-medium': true, 'text-sm': true}">{{ option.name }}</span>
        <span :class="{'text-gray-500': $isAdmin() && option.id === 1, 'font-normal': true, 'text-sm': true}">{{ option.description }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  options: Array,
  mt: {
    type: String,
    default: '0',
  },
  widthMenu: {
    type: String,
    default: 'full',
  },
  open: Boolean,
});

const emit = defineEmits(['close', 'select']);

const selectOption = (option) => {
  emit('select', option);
};


</script>
