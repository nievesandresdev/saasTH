<template>
  <transition>
    <div
      v-if="modalEdit"
      class="absolute bg-white shadow-xl add flex-column"
      :style="`top: ${containerTop}px; right: 0; min-height: calc(100vh - ${containerTop}px); height: calc(100vh - ${containerTop}px); z-index: 700;`"
      ref="ref_section_edit"
    >
      <div class="overflow-y-auto scrolling-sticky" style="height: calc(100% - 72px)">
        <div class="flex justify-between items-center px-6 py-5">
          <div class="text-center">
            <h1 class="font-[500] text-[22px]">Editar política</h1>
          </div>
          <div class="flex justify-end">
            <button @click="closeModal">
              <img src="/assets/icons/1.TH.CLOSE.svg" alt="icon_close" class="w-6 h-6">
            </button>
          </div>
        </div>
        <hr class="mb-1">
        <div class="py-3 px-6">
          <section class="mb-2">
            <label class="text-sm font-medium block">Título*</label>
            <BaseTextField 
              v-model="form.title" 
              :placeholder="errors.title ? 'Debes añadir un título' : 'Ejemplo: No salir sin camiseta'" 
              :error="errors.title" 
            />
            <div class="text-sm text-right">{{ form.title.length }}/50</div>
          </section>
          <section class="mb-4">
            <label class="text-sm font-medium mb-[6px] block">Descripción*</label>
            <BaseTextareaField
              v-model="form.description"
              :placeholder="errors.description ? 'Debes añadir una descripción' : 'Ejemplo: No se permite salir sin camiseta por los pasillos para evitar incomodar a los demás huéspedes'"
              class-content="flex-1"
              class-input="text-sm h-[100px] min-h-[64px] p-3"
              name="description"
              :error="errors.description"
            />
          </section>
          <section class="flex justify-between items-center mb-2">
            <label class="text-sm font-medium">Penalización</label>
            <div class="flex items-center gap-1">
              <span class="font-semibold text-[12px]">{{ form.penalization ? 'Si' : 'No' }}</span>
              <BaseSwitchInput v-model="form.penalization" />
            </div>
          </section>
          <section class="mb-4">
            <BaseTextareaField
              v-model="form.penalizationDetails"
              :disabled="!form.penalization"
              :placeholder="errors.penalizationDetails ? 'Debes añadir la penalización' : 'Ejemplo: Se penalizará con 30€ la primera vez y 100€ si la acción es repetida'"
              class-content="flex-1"
              class-input="text-sm h-[100px] min-h-[64px] p-3"
              name="penalizationDetails"
              :error="errors.penalizationDetails"
            />
          </section>
        </div>
      </div>
      <div 
        class="tertiary-black-200 py-6 px-6 flex items-center justify-between border-t border-gray z-[1000] bg-white w-full" 
        style="height: 72px;" 
      >
        <button class="underline font-medium text-sm p-4" @click="handleClose">
          Cancelar
        </button>
        <button
          class="hbtn-cta px-4 py-3 font-medium text-sm rounded-[6px] leading-[110%]"
          @click="submit"
          :disabled="errors.title || errors.description || errors.penalizationDetails || !changes"
        >
          Guardar
        </button>
      </div>
    </div>
  </transition>

  <ModalNoSave
    :id="'not-saved'"
    :open="showModalNoSave"
    text="Tienes cambios sin guardar. ¿Estás seguro de que quieres salir sin guardar?"
    textbtn="Guardar"
    @close="closeModalNoSave"
    @saveChanges="submit"
    :type="'alone_save'"
    :url="intendedRoute"
    @hidden="handleClose"
  />
</template>

<script setup>
import { ref, onMounted, defineEmits, defineProps, reactive, computed, watch } from 'vue';
import BaseTextField from '@/components/Forms/BaseTextField.vue';
import BaseSwitchInput from '@/components/Forms/BaseSwichInput.vue';
import BaseTextareaField from '@/components/Forms/BaseTextareaField.vue';
import ModalNoSave from '@/components/ModalNoSave.vue';
import { useRouter } from 'vue-router';

const emits = defineEmits(['close', 'store','ToFrom']);
const props = defineProps({
    modalEdit: Boolean,
    data: Object,
    from: Boolean
});

const form = reactive({
    id: props.data.id || null,
    title: props.data.title || '',
    description: props.data.description || '',
    penalization: props.data.penalization || false,
    penalizationDetails: props.data.penalization_details || ''
});

const initialFormState = ref({ ...form });

const errors = reactive({
    title: false,
    description: false,
    penalizationDetails: false
});

const showModalNoSave = ref(false);
const intendedRoute = ref(null);

const containerTop = ref(0);
const ref_section_edit = ref(null);

const router = useRouter();

onMounted(() => {
    const sectionExpElement = document.getElementById('layout-hoster');
    if (sectionExpElement) {
        containerTop.value = sectionExpElement.offsetTop;
    }
    // Guardar el estado inicial del formulario
    initialFormState.value = { ...form };
});

const changes = computed(() => {
    return JSON.stringify(form) !== JSON.stringify(initialFormState.value);
});

router.beforeEach((to, from, next) => {
    if (to.fullPath !== from.fullPath && props.modalEdit) {
        showModalNoSave.value = true;
        intendedRoute.value = to.fullPath;
    } else {
        next();
    }
});

const closeModal = () => {
    if (changes.value) {
        showModalNoSave.value = true;
    } else {
        resetForm();
        emits('close');
    }
};

const onlyCloseModal = () => {
    resetForm();
    emits('close');
};

const closeModalNoSave = () => {
    showModalNoSave.value = false;
    location.reload();
};

const handleClose = () => {
    if(props.from && !changes.value) {
        emits('ToFrom',props.data);
    }else{
        closeModal();
    }

    if (changes.value) {
        showModalNoSave.value = true;
    } else {
        closeModal();
    }
};

const submit = () => {
    validateForm();
    if (!errors.title && !errors.description && !errors.penalizationDetails) {
        emits('store', form);
        onlyCloseModal();
    }
};

const validateForm = () => {
    errors.title = !form.title.trim() ? 'Es necesario llenar este campo' : (form.title.length > 50 ? 'Te has pasado el límite de caracteres' : false);
    errors.description = !form.description.trim() ? 'Es necesario llenar este campo' : false;
    errors.penalizationDetails = (form.penalization && !form.penalizationDetails.trim()) ? 'Es necesario llenar este campo' : false;
};

// Watchers para detectar cambios en el formulario y validar en tiempo real
watch(() => form.title, (newVal) => {
    if (newVal.trim()) {
        if (newVal.length <= 50) {
            errors.title = false;
        } else {
            errors.title = 'Te has pasado el límite de caracteres';
        }
    } else {
        errors.title = 'Es necesario llenar este campo';
    }
});

watch(() => form.description, (newVal) => {
    if (newVal.trim()) {
        errors.description = false;
    } else {
        errors.description = 'Es necesario llenar este campo';
    }
});

watch(() => form.penalizationDetails, (newVal) => {
    if (!form.penalization || (form.penalization && newVal.trim())) {
        errors.penalizationDetails = false;
    } else {
        errors.penalizationDetails = 'Es necesario llenar este campo';
    }
});

watch(() => form.penalization, () => {
    if (!form.penalization) {
        errors.penalizationDetails = false;
    } else if (!form.penalizationDetails.trim()) {
        errors.penalizationDetails = 'Es necesario llenar este campo';
    }
});

watch(() => props.modalEdit, (newVal) => {
    if (newVal) {
        form.title = props.data.title || '';
        form.description = props.data.description || '';
        form.penalization = props.data.penalization || false;
        form.penalizationDetails = props.data.penalization_details || '';
        form.id = props.data.id || null;

        initialFormState.value = { ...form }; // Actualiza el estado inicial
    }
});

function resetForm() {
    form.title = props.data.title || '';
    form.description = props.data.description || '';
    form.penalization = props.data.penalization || false;
    form.penalizationDetails = props.data.penalization_details || '';
    errors.title = false;
    errors.description = false;
    errors.penalizationDetails = false;
    showModalNoSave.value = false;
}
</script>


<style lang="scss">
.add {
    width: 500px;
    position: fixed;
}

.v-enter-active, .v-leave-active {
    transition: transform 0.5s ease;
}

.v-enter-from, .v-leave-to {
    transform: translateX(100%);
}

.scrolling-sticky {
    &::-webkit-scrollbar {
        -webkit-appearance: none;
    }
  
    &::-webkit-scrollbar:vertical {
        width: 16px;
    }
  
    &::-webkit-scrollbar-thumb {
        background-color: #BFBFBF;
        border-radius: 20px;
        border: 4px solid #fff;
    }
  
    &::-webkit-scrollbar-track {
        border-radius: 10px;
        background-color: #fff;
    }
  
    &::-webkit-scrollbar:horizontal {
        width: 0;
        height: 0;
    }
}

.modal-fade-enter-active, .modal-fade-leave-active {
    transition: opacity 0.4s ease;
}

.modal-fade-enter-from, .modal-fade-leave-to {
    opacity: 0;
}

.modal-fade-enter-to, .modal-fade-leave-from {
    opacity: 1;
}
</style>
