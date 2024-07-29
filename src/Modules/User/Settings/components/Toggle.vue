<template>
    <div class="relative" ref="ref_section_toggle">
      <svg
        @click="toggleDropdown"
        v-show="!isOwnerAccount"
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
      <div
        v-if="visible"
        class="absolute left-0 w-48 bg-white rounded-md shadow-md py-1 z-50"
      >
        <a
          href="#"
          @click="editUser(user)"
          class="px-4 flex items-center justify-left py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-pencil mr-2"
            viewBox="0 0 16 16"
          >
            <path
              d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"
            />
          </svg>
          Editar usuario
        </a>
        <hr class="my-1" />
        <a
          href="#"
          @click="openModalDelete(user)"
          class="flex items-center justify-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-trash3 mr-2"
            viewBox="0 0 16 16"
          >
            <path
              d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"
            />
          </svg>
          Eliminar usuario
        </a>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onBeforeUnmount, nextTick,computed } from 'vue';
  import { defineProps, defineEmits } from 'vue';
  
  const emits = defineEmits(['editUser', 'openModalDelete', 'close']);
  const props = defineProps({
    user: Object,
    index: Number,
    visibleDropdown: Number,
    isAdmin: Boolean,
    isOperator: Boolean,
  });
  
  const visible = ref(false);
  
  const isOwnerAccount = computed(() => {
    return props.user.role.name === 'Associate' && (props.isAdmin || props.isOperator);
  });
  
  const toggleDropdown = () => {
    if (props.user.role.name === 'Associate' && (props.isAdmin || props.isOperator)) {
      console.log('no se puede editar');
      visible.value = false;
    } else {
      if (visible.value || props.user.del === 1) {
        visible.value = false;
      } else {
        visible.value = true;
      }
    }
  };
  
  const editUser = (user) => {
    visible.value = false;
    emits('editUser', user);
  };
  
  const openModalDelete = (user) => {
    emits('openModalDelete', user);
  };
  
  onMounted(async () => {
    await nextTick();
    document.addEventListener('click', handleClickOutside);
  });
  
  onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside);
  });
  
  const ref_section_toggle = ref(null);
  
  const handleClickOutside = (event) => {
    const addSection = ref_section_toggle.value;
    if (addSection && !addSection.contains(event.target)) {
      visible.value = false;
      emits('close');
    }
  };
  </script>
  