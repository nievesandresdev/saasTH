<template>
    <div class="h-screen px-6 bg-gray-50">
      <HeadLegal />
      <TabLegal />
      <!-- <div class="grid grid-cols-5 gap-4 mt-4"> -->
        <div class="grid grid-cols-4 1xl:grid-cols-2 1xl:w-2/3 3xl:grid-cols-5 3xl:w-full 3xl:gap-4 1xl:gap-4 mt-4">
            <!-- Botón para añadir política -->
            <div class="bg-white border rounded-lg shadow flex items-center justify-center p-4 h-[175px] w-[344px] cursor-pointer">
                <div class="flex flex-col items-center space-x-2">
                    <img src="/assets/icons/1.TH.PLUS.svg" alt="Add" class="h-5 w-5">
                    <h3 class="text-base font-medium">Añadir política</h3>
                </div>
            </div>
            <!-- Divs de políticas existentes -->
            <div v-for="policy in policies" :key="policy.id" class="bg-white border rounded-lg shadow flex flex-col justify-between p-4 h-[175px] w-[344px]">
                <div>
                    <h3 class="text-base font-medium mb-4">{{ truncateText(policy.description, 45) }}</h3>
                    <div class="flex justify-start gap-4">
                        <p class="text-base font-medium">Penalización: </p> 
                        <p class="text-[10px] font-semibold bg-[#DADADA] rounded-full py-1 px-4">{{ policy.penalization ? 'Sí' : 'No' }}</p>
                    </div>
                </div>
                <div class="flex justify-end">
                    <DropdownMenu :user="policy.user" />
                </div>
            </div>
        </div>
    </div>
  </template>
  
  <script setup>
  import HeadLegal from './components/HeadLegal.vue';
  import TabLegal from './components/TabLegal.vue';
  import DropdownMenu from './components/DropdownMenu.vue';
  import { ref } from 'vue';
  
  const policies = ref([
    { id: 1, description: "Política de no consumir bebidas alcohólicas en los pasillos del hotel.", penalization: false, user: { id: 1, name: "John Doe" } },
    { id: 2, description: "Política de no consumir bebidas alcohólicas en los pasillos del hotel.", penalization: false, user: { id: 2, name: "Jane Smith" } },
    { id: 3, description: "Política de no consumir bebidas alcohólicas en los pasillos del hotel.", penalization: true, user: { id: 3, name: "Mike Brown" } },
    { id: 4, description: "Política de no consumir bebidas alcohólicas en los pasillos del hotel.", penalization: false, user: { id: 4, name: "Sarah Connor" } }
  ]);

  // Función para truncar texto
function truncateText(text, length) {
  return text.length > length ? `${text.substr(0, length)}...` : text;
}
  </script>
  