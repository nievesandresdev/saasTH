<template>
    <div class="relative" ref="ref_section_toggle">
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
      <div
        v-if="visible"
        class="absolute w-48 bg-white rounded-md shadow-md py-1 z-50 right-3"
      >
        <a
          href="#"
          @click="editUser(user)"
          class="px-4 flex items-center justify-left py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          <img
            src="/assets/icons/1.TH.EDIT.OUTLINED.svg"
            class="w-6 h-6 mr-2"
            alt="icon_edit"
          />
          <span class="font-normal text-sm">Editar</span>
        </a>
        <a
          href="#"
          @click="editUser(user)"
          class="px-4 flex items-center justify-left py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
        <img
            src="/assets/icons/1.TH.PAUSE.svg"
            class="w-6 h-6 mr-2"
            alt="icon_disable"
          />
          <span class="font-normal text-sm">Inactivar</span>
        </a>
        <hr class="my-1" />
        <a
          href="#"
          @click="openModalDelete(user)"
          class="flex items-center justify-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          <img
            src="/assets/icons/1.TH.DELETE.OUTLINE.svg"
            class="w-6 h-6 mr-2"
            alt="icon_trash"
          />
          <span class="font-normal text-sm">Eliminar</span>
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
    if (visible.value || props.user.del === 1) {
        visible.value = false;
      } else {
        visible.value = true;
      }
  };
  
  const editUser = (user) => {
    visible.value = false;
    console.log('dddd',user);
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

  const dropdownPosition = computed(() => {
    return window.innerWidth <= 1440 ? 'right-2' : 'left-1';
  });
  </script>
  