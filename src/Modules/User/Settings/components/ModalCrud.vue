<template>
  <div ref="modalContainerRef" :class="`absolute modalContainerRef left-0 w-${props.width} mt-${props.mt} bg-white rounded-md shadow-md z-10`" v-show="props.open" @click.stop>
    <div v-if="!isEditing && !isCreating">
      <div
        v-for="option in props.data"
        :key="option.id"
        class="flex justify-between items-center px-4 py-2 text-sm text-black hover:bg-gray-100 cursor-pointer"
        @click="selectOption(option)"
      >
        <span class="m-2">{{ option.name }}</span>
        <div class="flex gap-2">
          <img src="/assets/icons/1.TH.EDIT.OUTLINEDbig.svg" class="h-4 w-4 cursor-pointer" @click.stop="openEditModal(option)" />
          <img
            src="/assets/icons/1.TH.DELETE.OUTLINE.svg"
            class="w-4 h-4 mr-2"
            alt="icon_trash"
            @click.stop="openEditDelete(option.id)"
          />
        </div>
        <!-- <img src="/assets/icons/1.TH.EDIT.OUTLINEDbig.svg" class="h-4 w-4 cursor-pointer" @click.stop="openEditModal(option)" />
        <img
            src="/assets/icons/1.TH.DELETE.OUTLINE.svg"
            class="w-4 h-4 mr-2"
            alt="icon_trash"
          /> -->
      </div>
      <div @click="openCreateModal" class="text-center px-4 py-2 mt-2 text-sm text-black border border-black m-3 rounded-md cursor-pointer hover:bg-gray-50">
        Crear puesto de trabajo
      </div>
    </div>
  </div>
  
  <!-- ModalCreate component -->
  <ModalCreate
    v-if="isCreating"
    :isVisible="isCreating"
    @close="closeCreateModal"
    @storeWorkPosition="pushData"
    :width="'400px'"
  />

  <!-- ModalEdit component -->
  <ModalEdit
    v-if="isEditing"
    :isVisible="isEditing"
    @close="closeEditModal"
    :data="dataEdit"
    @storeWorkPosition="getWorkPositions"
    :width="'400px'"
  />
</template>

<script setup>
import { ref } from 'vue';
import { defineProps, defineEmits } from 'vue';
import ModalCreate from './ModalCreate.vue'; 
import ModalEdit from './ModalEdit.vue';

const props = defineProps({
  data: Array,
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

const emit = defineEmits(['close', 'select','getWorkPositions','deleteWP']);

const isEditing = ref(false);
const isCreating = ref(false);

const dataEdit = ref({});

const pushData  = (data) => {
  emit('getWorkPositions');
  props.data.push(data);
};

const selectOption = (option) => {
  emit('select', option);
};

const getWorkPositions = () => {
  emit('getWorkPositions');
};

const openCreateModal = () => {
  isCreating.value = true;
  isEditing.value = false;
};

const openEditModal = (option) => {
  isCreating.value = false;
  isEditing.value = true;
  dataEdit.value = option;
  
};

const openEditDelete = (option) => {
  emit('deleteWP', option);
};

const closeCreateModal = () => {
  isCreating.value = false;
  return false;
};

const closeEditModal = () => {
  isEditing.value = false;
};
</script>
