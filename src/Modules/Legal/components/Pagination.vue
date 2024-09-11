<template>
  <div v-show="totalData >= 29" class="flex justify-center items-left mt-3 mb-[48px]">
    <div class="flex flex-col">
      <span class="font-normal text-sm mb-2">
        {{ perPage }} por página
      </span>
      <div>
        <nav class="isolate border inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
          <a href="#" @click.prevent="changePage(currentPage - 1)" :disabled="currentPage <= 1" class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 border-r-2 focus:z-20 focus:outline-offset-0">
            <span class="sr-only">Previous</span>
            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
            </svg>
          </a>
          <a href="#" v-for="page in totalPages" :key="page" @click.prevent="changePage(page)" class="relative border-r-2 inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-inset  focus:z-20 focus:outline-offset-0" 
          :class="{
              'bg-[#0B6357] text-white ring-[#0B6357]': currentPage == page,
              '' : currentPage != page   
              }
          ">
              {{ page }}
          </a>
          <a href="#" @click.prevent="changePage(currentPage + 1)" :disabled="currentPage >= totalPages" class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 focus:z-20 focus:outline-offset-0">
            <span class="sr-only">Next</span>
            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
            </svg>
          </a>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  currentPage: Number,
  totalPages: Number,
  totalData: Number,
  perPage: Number
});

const emits = defineEmits(['update:page']);

const changePage = (page) => {
if (page >= 1 && page <= props.totalPages) {
  emits('update:page', page);
}
};
</script>

<style scoped>
button {
  padding: 8px 16px;
  border: 1px solid #ddd;
  margin: 0 2px;
  cursor: pointer;
}

button.bg-green-700 {
  background-color: #34A98F;
  color: white;
}
</style>
