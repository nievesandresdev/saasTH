<template>
    <div class="flex justify-left flex-col items-left mt-4">
      <span class="font-normal text-sm mb-2">
        {{ perPage }} usuarios por página
      </span>
    <!-- <div>
        <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <button @click="changePage(currentPage - 1)" :disabled="currentPage <= 1" class="relative inline-flex items-center rounded-l-md px-4 py-2 text-gray-400  ring-gray-300 hover:bg-gray-50">
                <span class="sr-only">Previous</span>
                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
                </svg>
            </button>
            
            <button v-for="page in totalPages" :key="page" @click="changePage(page)" 
                :class="{'relative z-10 inline-flex items-center bg-[#0B6357] px-4 py-2 text-sm font-semibold text-white': currentPage === page,
                        'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900  ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0': currentPage !== page}">
                {{ page }}
            </button>
            
            <button @click="changePage(currentPage + 1)" :disabled="currentPage >= totalPages" class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400  ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                <span class="sr-only">Next</span>
                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                </svg>
            </button>
        </nav>
    </div> -->
    <div>
      <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
        <a href="#" class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
          <span class="sr-only">Previous</span>
          <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
          </svg>
        </a>
        <a href="#" v-for="page in totalPages" :key="page" @click="changePage(page)" class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset  hover:bg-gray-50 focus:z-20 focus:outline-offset-0" 
        :class="{
            'bg-[#0B6357] text-white ring-[#0B6357]': currentPage == page,
            'ring-gray-300' : currentPage != page   
            }
        ">
            {{ page }}
        </a>
        <a href="#" class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
          <span class="sr-only">Next</span>
          <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
          </svg>
        </a>
      </nav>
    </div>
    </div>

    
</template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    currentPage: Number,
    totalPages: Number,
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
  