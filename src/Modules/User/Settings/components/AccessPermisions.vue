<template>
  <div>
    <div class="space-y-6">
      <!-- Sección de Operación -->
      <div class="flex gap-2 justify-start items-center">
        <strong class="text-[18px] font-medium">Accesos a la plataforma</strong>
        <BaseTooltipResponsive
          size="s"
          :top="25"
          :right="-55"
        >
          <template v-slot:button>
            <img
              src="/assets/icons/info.blue.svg"
              class="w-5 h-5"
              alt="icon_info"
            >
          </template>
          <template v-slot:content>
            <p class="text-sm font-normal">Puedes permitir o bloquear accesos a la plataforma eligiendo un puesto de trabajo con accesos predeterminados o desde esta sección.</p>
          </template>
        </BaseTooltipResponsive>
      </div>
      <div>
        <div class="flex items-center justify-between mb-4">
          <span class="text-sm font-semibold">Todos los accesos</span> 
          <input type="checkbox" v-model="selectAll" @change="toggleAllPermissions" :disabled="isDisabled" class="hcheckbox h-5 w-5 text-[#34A98F] rounded focus:ring-[#34A98F] disabled:opacity-50">
        </div>
        <span class="block mb-2 font-semibold text-sm">Operación</span>
        <div class="space-y-2 ml-2">
          <div v-for="item in operationAccess" :key="item.name" class="flex items-center justify-between rounded-lg">
            <span class="text-sm font-[500]">{{ item.name }}</span>
            <input type="checkbox" 
                   :checked="item.selected" 
                   @change="togglePermission(item)"
                   class="hcheckbox h-5 w-5 text-[#34A98F] rounded focus:ring-[#34A98F] disabled:opacity-50" 
                   :disabled="isDisabled || item.disabled">
          </div>
        </div>
      </div>
      <!-- Sección de Administración -->
      <div>
        <span class="block mb-2 font-semibold text-sm">Administración</span>
        <div class="space-y-2 ml-2">
          <div v-for="item in adminAccess" :key="item.name" class="flex items-center justify-between rounded-lg">
            <span class="text-sm font-[500]">{{ item.name }}</span>
            <input type="checkbox" 
                   :checked="item.selected" 
                   @change="togglePermission(item)"
                   class="hcheckbox h-5 w-5 text-[#34A98F] rounded focus:ring-[#34A98F] disabled:opacity-50" 
                   :disabled="isDisabled || item.disabled">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, computed } from 'vue';
import BaseTooltipResponsive from '@/components/BaseTooltipResponsive.vue';

const props = defineProps({
  permissions: {
    type: Object,
    default: () => ({})
  },
  workPositionId: {
    type: [Number, String],
    default: null,
  },
});

const emits = defineEmits(['update:permissions']);

const selectAll = ref(false);

const formPermissions = ref({ ...props.permissions });


const isDisabled = computed(() => props.workPositionId !== null);

const operationAccess = ref([
  { name: 'Estancias', selected: false, value: 'estancias', disabled: false },
  { name: 'Reseñas', selected: false, value: 'resenas', disabled: false },
]);

const adminAccess = ref([
  { name: 'WebApp', selected: false, value: 'webapp', disabled: false },
  { name: 'Hoster', selected: false, value: 'hoster', disabled: false },
]);

// Inicializa los permisos basados en props
const initializePermissions = () => {
  Object.keys(formPermissions.value).forEach(key => {
    if (formPermissions.value[key]?.status) {
      const opItem = operationAccess.value.find(item => item.value === key);
      const adminItem = adminAccess.value.find(item => item.value === key);
      
      if (opItem) {
        opItem.selected = true;
      }
      
      if (adminItem) {
        adminItem.selected = true;
      }
    }
  });
};

initializePermissions(); // Llama a la función al cargar el componente

const toggleAllPermissions = () => {
  const isSelected = selectAll.value;

  operationAccess.value.forEach(item => {
    item.selected = isSelected;
    item.disabled = isSelected || isDisabled.value; // Deshabilita todos si selecciona "Todos los accesos" o si workPositionId no es null
    if (isSelected) {
      formPermissions.value[item.value] = { can: {}, status: true };
    } else {
      delete formPermissions.value[item.value];
    }
  });

  adminAccess.value.forEach(item => {
    item.selected = isSelected;
    item.disabled = isSelected || isDisabled.value; // Deshabilita todos si selecciona "Todos los accesos" o si workPositionId no es null
    if (isSelected) {
      formPermissions.value[item.value] = { can: {}, status: true };
    } else {
      delete formPermissions.value[item.value];
    }
  });

  emits('update:permissions', formPermissions.value);
};



const togglePermission = (item) => {
  item.selected = !item.selected;

  if (item.selected) {
    formPermissions.value[item.value] = { can: {}, status: true };
  } else {
    delete formPermissions.value[item.value];
  }
  emits('update:permissions', formPermissions.value);
};
</script>

