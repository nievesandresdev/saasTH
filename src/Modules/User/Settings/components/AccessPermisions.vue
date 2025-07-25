<template>
  <div>
    <div class="space-y-2">
      <!-- Sección de Operación -->
      <div class="flex gap-2 justify-start items-center">
      </div>
        <div class="flex justify-between items-center text-left">
          <span class="text-[18px] font-medium text-[#333]">Permisos de la plataforma</span>
          <div class="flex items-center gap-1" :style="{ opacity: disabledGeneral ? 0.5 : 1, cursor: disabledGeneral ? 'not-allowed' : 'default' }">
            <span class="text-sm font-semibold">Todos {{ props.openComponent }}</span>
            <BaseSwichInput
              v-model="selectAll"
              id="swich-visible-experience"
              @change:value="toggleAllPermissions"
              :disabled="disabledGeneral"
            />
          </div>
        </div>
        <div :style="{ opacity: disabledGeneral ? 0.5 : 1, cursor: disabledGeneral ? 'not-allowed' : 'default' }">
          <span class="block mb-2 font-semibold text-sm mt-4">Operación</span>
          <div class="space-y-2 ml-2">
            <template v-for="item in operationAccess" :key="item.name">
              <div
                  class="flex items-center justify-between rounded-lg"
                  :class="{ 'hidden': item.name == 'Reseñas' && !hotelStore.hotelData?.reviews_service_enabled}"
                >
                <span class="text-sm font-[500]">{{ item.name }}</span>
                <input
                  type="checkbox"
                  :checked="item.selected"
                  @change="togglePermission(item)"
                  class="hcheckbox h-5 w-5 text-[#34A98F] rounded focus:ring-[#34A98F] disabled:opacity-50"
                  :disabled="disabledGeneral || isDisabled || item.disabled"
                >
              </div>
            </template>
          </div>
        </div>
      <!-- Sección de Administración -->
      <div :style="{ opacity: disabledGeneral ? 0.5 : 1, cursor: disabledGeneral ? 'not-allowed' : 'default' }">
        <span class="block mb-2 font-semibold text-sm">Administración</span>
        <div class="space-y-2 ml-2">
          <div
            v-for="item in adminAccess"
            :key="item.name"
            class="flex items-center justify-between rounded-lg"
          >
            <span class="text-sm font-[500]">{{ item.name }}</span>
            <input
              type="checkbox"
              :checked="item.selected"
              @change="togglePermission(item)"
              class="hcheckbox h-5 w-5 text-[#34A98F] rounded focus:ring-[#34A98F] disabled:opacity-50"
              :disabled="disabledGeneral || isDisabled || item.disabled"
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps, defineEmits, computed,watch } from 'vue';
import BaseTooltipResponsive from '@/components/BaseTooltipResponsive.vue';
import BaseSwichInput from "@/components/Forms/BaseSwichInput.vue";
import { useHotelStore } from '@/stores/modules/hotel';
const hotelStore = useHotelStore();

const props = defineProps({
  permissions: {
    type: Object,
    default: () => ({})
  },
  workPositionId: {
    type: [Number, String],
    default: null,
  },
  disabledGeneral: {
    type: Boolean,
    default: false,
  },
  toggleAllPermissions: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(['update:permissions']);

const selectAll = ref(true);

//const formPermissions = ref({ ...props.permissions });


const isDisabled = computed(() => props.workPositionId !== null);

onMounted(() => {
  if (selectAll.value && !isDisabled.value) {
    toggleAllPermissions();
  }

  if(props.toggleAllPermissions){
    selectAll.value = true;
    toggleAllPermissions();
  }
});


const operationAccess = ref([
  { name: 'Estancias', selected: false, value: 'estancias', disabled: false },
  { name: 'Reseñas', selected: false, value: 'resenas', disabled: false },
]);

const adminAccess = ref([
  { name: 'WebApp', selected: false, value: 'webapp', disabled: false },
  { name: 'Hoster', selected: false, value: 'hoster', disabled: false },
]);

const formPermissions = computed(() => props.permissions);

const initializePermissions = () => {
  
  // Reinicia los valores `selected` y `disabled` para todos los accesos
  operationAccess.value.forEach((item) => {
    item.selected = false;
    item.disabled = false;
  });

  adminAccess.value.forEach((item) => {
    item.selected = false;
    item.disabled = false;
  });
  Object.keys(formPermissions.value).forEach((key) => {
  if (formPermissions.value[key]?.status) {
    const opItem = operationAccess.value.find((item) => item.value === key);
    const adminItem = adminAccess.value.find((item) => item.value === key);

    if (opItem) {
      opItem.selected = true;
    }

    if (adminItem) {
      adminItem.selected = true;
    }
  }
});

// Después de iterar, valida si todos los permisos están seleccionados
const allSelected =
  operationAccess.value.every((item) => item.selected) &&
  adminAccess.value.every((item) => item.selected);

selectAll.value = allSelected; // Actualiza el estado del switch "Todos"

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

watch(
  () => props.permissions,
  () => {
    initializePermissions();
  },
  { immediate: true }
);



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

