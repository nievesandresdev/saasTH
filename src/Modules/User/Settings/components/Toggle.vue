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
        style="z-index: 1000000;"
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
        <div
        v-if="user.status == 1"
          @click="disabled"
          class="px-4 flex items-center justify-left py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
        >
        <img
            src="/assets/icons/1.TH.PAUSE.svg"
            class="w-6 h-6 mr-2 "
            alt="icon_disable"
          />
          <span class="font-normal text-sm">Inactivar</span>
        </div>
        <div
          v-else
          @click="enabled"
          class="px-4 flex items-center justify-left py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
        >
        <img
            src="/assets/icons/octicon_play-16.svg"
            class="w-6 h-6 mr-2 "
            alt="icon_disable"
          />
          <span class="font-normal text-sm">Activar</span>
        </div>
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
  import { disableUser,enableUser } from '@/api/services/users/userSettings.service';
  import { useToastAlert } from '@/composables/useToastAlert'

  const toast = useToastAlert();
  
  const emits = defineEmits(['editUser', 'openModalDelete', 'close' , 'updateStatus']);
  const props = defineProps({
    user: Object,
    index: Number,
    visibleDropdown: Number,
    isAdmin: Boolean,
    isOperator: Boolean,
  });

  const enabled = async() => {
      visible.value = false;

      const params = {
        user_id: props.user.id,
      }

      const response = await enableUser(params);

      if (response.ok) {
        toast.warningToast('Usuario activado con éxito','top-right')
        emits('updateStatus',response.data.user)
      }else{
        toast.errorToast('Error al activar el usuario','top-right')
      }
      
    }
    
    const disabled = async() => {
      visible.value = false;
      
      const params = {
        user_id: props.user.id,
      }
      const response = await disableUser(params);

      if (response.ok) {
        toast.warningToast('Usuario inactivado','top-right')
        emits('updateStatus',response.data.user)
      }else{
        toast.errorToast('Error al inactivar el usuario','top-right')
      }
      
    }
  
  const visible = ref(false);
  
  const isOwnerAccount = computed(() => {
    return props.user.role.name === 'Associate' && (props.isAdmin || props.isOperator);
  });
  
  const toggleDropdown = () => {
  if (props.user.role?.name === 'Associate') {
    return; // No abrir el dropdown si el rol es "Associate"
  }

  const toggleRect = ref_section_toggle.value.getBoundingClientRect();
  const dropdownHeight = 150; // Aproximación de la altura del dropdown

  if (window.innerHeight - toggleRect.bottom < dropdownHeight) {
    dropdownPosition.value = 'bottom-full mb-1'; // Mostrar hacia arriba si no hay espacio suficiente
  } else {
    dropdownPosition.value = 'top-full mt-1'; // Mostrar hacia abajo
  }

  visible.value = !visible.value;
};
  
  const editUser = (user) => {
    visible.value = false;
    emits('editUser', user);
  };
  
  const openModalDelete = (user) => {
    visible.value = false;
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
  