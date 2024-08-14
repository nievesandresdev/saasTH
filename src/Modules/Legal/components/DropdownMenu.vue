<template>
    <div class="relative" ref="dropdownRef">
      <svg
        @click="toggleDropdown"
        class="cursor-pointer"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="2" fill="currentColor" />
        <circle cx="19" cy="12" r="2" fill="currentColor" />
        <circle cx="5" cy="12" r="2" fill="currentColor" />
      </svg>
      <div v-if="visible" class="absolute w-40 bg-white rounded-md shadow-md z-50 right-0">
        <a class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
          <img src="/assets/icons/1.TH.EDIT.OUTLINED.svg" alt="Edit" class="h-6 w-6 mr-2">
          Editar
        </a>
        <hr class="border-t mx-4" style="border-color: #BFBFBF;"> <!-- Línea separadora ajustada -->
        <a class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
          <img src="/assets/icons/1.TH.DELETE.OUTLINE.svg" alt="Delete" class="h-6 w-6 mr-2">
          Eliminar
        </a>
      </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const dropdownRef = ref(null);
const visible = ref(false);

const toggleDropdown = () => {
    visible.value = !visible.value;
};

onMounted(() => {
    document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside);
});

const handleClickOutside = event => {
    if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
      visible.value = false;
    }
};
</script>
