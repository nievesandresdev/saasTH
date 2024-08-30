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
              class="w-5 h-5 ml-1"
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
          <span class="text-sm font-semibold">Todos</span>
          <input type="checkbox" v-model="selectAll" @change="toggleAllPermissions" class="hcheckbox h-5 w-5 text-[#34A98F] rounded focus:ring-[#34A98F]" :disabled="isRoleAdmin">
        </div>
        <span class="block mb-2 font-semibold text-sm">Operación</span>
        <div class="space-y-2 ml-2">
          <div v-for="item in operationAccess" :key="item.name" class="flex items-center justify-between rounded-lg">
            <span class="text-sm font-[500]">{{ item.name }}</span>
            <input type="checkbox" :checked="formPermissions[item.value]?.status" @change="togglePermission(item)" class="hcheckbox h-5 w-5 text-[#34A98F] rounded focus:ring-[#34A98F]" :disabled="isRoleAdmin">
          </div>
        </div>
      </div>
      <!-- Sección de Administración -->
      <div>
        <span class="block mb-2 font-semibold text-sm">Administración</span>
        <div class="space-y-2 ml-2">
          <div v-for="item in adminAccess" :key="item.name" class="flex items-center justify-between rounded-lg">
            <span class="text-sm font-[500]">{{ item.name }}</span>
            <input type="checkbox" :checked="formPermissions[item.value]?.status" @change="togglePermission(item)" class="hcheckbox h-5 w-5 text-[#34A98F] rounded focus:ring-[#34A98F]" :disabled="isRoleAdmin">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue';
import BaseTooltipResponsive from '@/components/BaseTooltipResponsive.vue';

const props = defineProps({
  permissions: {
    type: Object,
    default: () => ({})
  },
  isRoleAdmin: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(['update:permissions']);

const selectAll = ref(false);

const formPermissions = ref({ ...props.permissions });

const operationAccess = ref([
  { name: 'Estancias', selected: false, value: 'estancias' },
  { name: 'Reseñas', selected: false, value: 'resenas' },
  { name: 'Análisis', selected: false, value: 'analisis' },
]);

const adminAccess = ref([
  { name: 'WebApp', selected: false, value: 'webapp' },
  { name: 'Comunicaciones', selected: false, value: 'comunicaciones' },
  { name: 'Hoster', selected: false, value: 'hoster' },
]);

watch([operationAccess, adminAccess], () => {
  checkSelectAll();
});

const togglePermission = (item) => {
  if (formPermissions.value[item.value]) {
    delete formPermissions.value[item.value];
  } else {
    formPermissions.value[item.value] = {
      can: [],
      status: true
    };
  }
  emits('update:permissions', formPermissions.value);
  checkSelectAll();
};

const toggleAllPermissions = () => {
  const isSelected = selectAll.value;
  operationAccess.value.forEach(item => {
    formPermissions.value[item.value] = isSelected
      ? { can: [], status: true }
      : undefined;
  });
  adminAccess.value.forEach(item => {
    formPermissions.value[item.value] = isSelected
      ? { can: [], status: true }
      : undefined;
  });
  emits('update:permissions', formPermissions.value);
  checkSelectAll();
};

const checkSelectAll = () => {
  selectAll.value = operationAccess.value.every(item => formPermissions.value[item.value]?.status) &&
                    adminAccess.value.every(item => formPermissions.value[item.value]?.status);
};
</script>
