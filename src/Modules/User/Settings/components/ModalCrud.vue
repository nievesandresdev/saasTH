<template>
  <div :class="`absolute left-0 w-${props.width} mt-${props.mt} bg-white rounded-md shadow-md z-10`" v-show="props.open">
    <div v-if="!isEditing">
      <div
        v-for="option in props.options"
        :key="option.id"
        class="flex justify-between items-center px-4 py-2 text-sm text-black hover:bg-gray-100 cursor-pointer"
      >
        <span class="m-2" @click="selectOption(option)">{{ option.name }}</span>
        <img src="/assets/icons/1.TH.EDIT.OUTLINEDbig.svg" class="h-5 w-5 cursor-pointer" @click="editWorkPosition(option)" />
      </div>
      <div @click="createWorkPosition" class="text-center px-4 py-2 mt-2 text-sm text-black border border-black m-3 rounded-md cursor-pointer hover:bg-gray-50">
        Crear puesto de trabajo
      </div>
    </div>
    <div v-else class="p-4">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-semibold">{{ editingWorkPosition.id ? 'Editar puesto' : 'Puesto de trabajo' }}</h3>
        <button @click="closeEdit" class="text-gray-500 hover:text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <label class="block text-sm font-medium text-gray-700 mb-2">Nombre del puesto</label>
      <input
        type="text"
        v-model="editingWorkPosition.name"
        placeholder="Escribe el nombre del puesto de trabajo"
        class="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
      <div class="flex justify-between items-center mt-4">
        <button v-if="editingWorkPosition.id" @click="deleteWorkPosition" class="px-4 py-2 border border-black rounded-md text-black hover:bg-gray-100">
          Eliminar
        </button>
        <button
          @click="saveWorkPosition"
          :disabled="!editingWorkPosition.name"
          :class="['hbtn-cta', 'px-4', 'py-2', 'text-white', 'font-semibold', 'rounded-md', { 'bg-gray-300': !editingWorkPosition.name, 'cursor-not-allowed': !editingWorkPosition.name }]"
        >
          {{ editingWorkPosition.id ? 'Guardar' : 'Crear' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  options: Array,
  mt: {
    type: String,
    default: '0',
  },
  width: {
    type: String,
    default: 'full',
  },
  open: Boolean,
});

const emit = defineEmits(['close', 'select']);

const isEditing = ref(false);
const editingWorkPosition = ref({ id: null, name: '' });

const selectOption = (option) => {
  emit('select', option);
};

const createWorkPosition = () => {
  editingWorkPosition.value = { id: null, name: '' };
  isEditing.value = true;
};

const editWorkPosition = (option) => {
  editingWorkPosition.value = { ...option };
  isEditing.value = true;
};

const saveWorkPosition = () => {
  console.log('Guardar puesto de trabajo:', editingWorkPosition.value);
  isEditing.value = false;
};

const deleteWorkPosition = () => {
  console.log('Eliminar puesto de trabajo:', editingWorkPosition.value);
  isEditing.value = false;
};

const closeEdit = () => {
  isEditing.value = false;
};

const closeModal = () => {
  emit('close');
};
</script>

<style scoped>

</style>
