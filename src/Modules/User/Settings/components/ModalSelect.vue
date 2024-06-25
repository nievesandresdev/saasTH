<template>
    <div :class="`absolute left-0  w-${props.widthMenu} mt-${props.mt} bg-white rounded-md shadow-md z-10`" v-show="props.open">
      <div
        v-for="option in options"
        :key="option.id"
        @click="selectOption(option)"
        class="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
       <div class="flex flex-col">
        <span class="font-medium text-sm">{{ option.name }}</span>
        <span class="text-sm font-normal">{{ option.description }}</span>
       </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits} from 'vue';
  
  const props = defineProps({
    options: Array,
    mt : {
      type: String,
      default: '0',
    },
    width : {
      type: String,
      default: 'full',
    },
    open: Boolean,

  });
  
  const emit = defineEmits(['close', 'select']);
  
  const selectOption = (option) => {
    emit('select', option);
  };

 /*  const handleClickOutside = (event) => {
    console.log(event.target.closest('.modal-select'), props.open)
  if (!event.target.closest('.modal-select') && props.open) {
    
    closeModal()
  }
};

    onMounted(() => {
    document.addEventListener('click', handleClickOutside);
    });

    onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
    }); */
  
  const closeModal = () => {
    emit('close');
  };
  </script>
  