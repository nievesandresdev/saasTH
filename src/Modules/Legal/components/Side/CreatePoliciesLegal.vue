<template>
  <transition>
    <div
      v-if="modalAdd"
      class="absolute bg-white shadow-xl add flex-column"
      :style="`top: ${containerTop}px; right: 0; min-height: calc(100vh - ${containerTop}px); height: calc(100vh - ${containerTop}px); z-index: 700;`"
      ref="ref_section_add"
    >
      <div class="overflow-y-auto scrolling-sticky" style="height: calc(100% - 72px)">
        <div class="flex justify-between items-center px-6 py-5">
          <div class="text-center">
            <h1 class="font-[500] text-[22px]">Crear norma</h1>
          </div>
          <div class="flex justify-end">
            <button @click="handleClose">
              <img src="/assets/icons/1.TH.CLOSE.svg" alt="icon_close" class="w-6 h-6 hover:bg-[#F3F3F3] rounded-full p-1">
            </button>
          </div>
        </div>
        <hr class="mb-1">
        <div class="py-3 px-6">
          <!-- Contenido del formulario -->
          <section class="mb-2">
            <label class="text-sm font-medium block">Título*</label>
            <BaseTextField 
              v-model="form.title" 
              :placeholder="errors.title && attemptedSending ? 'Debes añadir un título' : 'Ejemplo: No salir sin camiseta'" 
              :error="errors.title && attemptedSending" 
              @input="handleInput"
              max="100"
            />
            <!-- <div v-if="errors.title === 'Te has pasado el límite de caracteres'" class="flex mt-1 text-[#FF6666] justify-left">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="mr-1 bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
              </svg>
              <small>{{ errors.title }}</small>
            </div> -->
            <!-- <div class="text-sm text-right">{{ form.title.length }}/100</div> -->
          </section>
          <section class="mb-4">
            <label class="text-sm font-medium mb-[6px] block">Descripción*</label>
            <BaseTextareaField
              v-model="form.description"
              :placeholder="errors.description && attemptedSending ? 'Debes añadir una descripción' : 'Ejemplo: No se permite salir sin camiseta por los pasillos para evitar incomodar a los demás huéspedes'"
              class-content="flex-1"
              class-input="text-sm h-[140px] min-h-[64px] p-3"
              name="description"
              :error="errors.description && attemptedSending"
            />
            <!-- <div v-if="errors.description != null" class="flex mt-1 text-[#FF6666] justify-left">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="mr-1 bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
              </svg>
              <small>{{ errors.description }}</small>
            </div> -->
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
              :placeholder="errors.penalizationDetails && attemptedSending ? 'Debes añadir la penalización' : 'Ejemplo: Se penalizará con 30€ la primera vez y 100€ si la acción es repetida'"
              class-content="flex-1"
              class-input="text-sm h-[140px] min-h-[64px] p-3"
              name="penalizationDetails"
              :error="errors.penalizationDetails && attemptedSending"
            />
            <!-- <div v-if="errors.penalizationDetails" class="flex mt-1 text-[#FF6666] justify-left">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="mr-1 bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
              </svg>
              <small>{{ errors.penalizationDetails }}</small>
            </div> -->
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
        <!-- <button
          class="hbtn-cta px-4 py-3 font-medium rounded-[6px] leading-[110%] text-sm"
          @click="submit"
          :disabled="errors.title || errors.description || errors.penalizationDetails"
        >
          Crear
        </button> -->
        <!-- <p>{{String(changes)}} - {{String(valid)}}</p> -->
        <button
            class="px-4 py-3 font-medium rounded-[6px] leading-[110%] text-sm"
            :class="{ 
                'hbtn-cta-disabled': !changes || !valid,
                'hbtn-cta': changes && valid
            }"
            @click="submit"
        >
            Guardar
        </button>
      </div>
    </div>
  </transition>
  <!-- <ModalNoSave
    :id="'not-saved'"
    :open="showModalNoSave"
    text="Tienes cambios sin guardar. Para aplicar los cambios realizados debes guardar."
    textbtn="Guardar"
    @saveChanges="submit"
    @close="closeModalNoSave"
    type="alone_exit_save"
  /> -->

  <ModalNoSave
    :id="'not-saved'"
    :open="showModalNoSave"
    :forceOpen="showModalNoSave"
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
import { ref, onMounted, defineEmits, defineProps, reactive, watch, computed } from 'vue';
import BaseTextField from '@/components/Forms/BaseTextField.vue';
import BaseSwitchInput from '@/components/Forms/BaseSwichInput.vue';
import BaseTextareaField from '@/components/Forms/BaseTextareaField.vue';
import ModalNoSave from '@/components/ModalNoSave.vue';
import { useRouter } from 'vue-router';

const emits = defineEmits(['close', 'store']);
const props = defineProps({
  modalAdd: Boolean,
});

const router = useRouter();

const form = reactive({
  title: '',
  description: '',
  penalization: false,
  penalizationDetails: ''
});

const errors = reactive({
  title: false, // Inicialmente en true para mostrar el error
  description: false, // Inicialmente en true para mostrar el error
  penalizationDetails: false // Inicialmente en false, solo si penalization es true se muestra
});

const intendedRoute = ref(null);
const attemptedSending = ref(false);

router.beforeEach((to, from, next) => {
  
  if(to.fullPath !== from.fullPath && props.modalAdd) {
    showModalNoSave.value = true
    intendedRoute.value = to.fullPath;
  }else{
    /* window.location.href = intendedRoute.value; */
    next();
  }

});

const handleInput = (event) => {
  if (event.target.value.length > 100) {
    form.title = event.target.value.slice(0, 100); // Recorta el texto al límite de 100 caracteres
    event.target.value = form.title;
  }
};

const containerTop = ref(0);
const ref_section_add = ref(null);

const showModalNoSave = ref(false);

onMounted(() => {
  const sectionExpElement = document.getElementById('layout-hoster');
  if (sectionExpElement) {
      containerTop.value = sectionExpElement.offsetTop;
  }
});

const handleClose = () => {
  showModalNoSave.value = false;
  console.log('test handleClose ', changes.value)
  if (changes.value) {
    console.log('test entro ')
    // Mostrar ModalNoSave si hay cambios
    showModalNoSave.value = true;
  } else {
    closeModal();
  }
};

const closeModal = () => {
  showModalNoSave.value = false;
  resetForm();
  console.log('test closeModal')
  emits('close');
};

const closeModalNoSave = () => {
  showModalNoSave.value = false;
  location.reload();
};

const submit = () => {
  attemptedSending.value = true;
  validateForm();
  if (valid.value) {
      attemptedSending.value = false;
      emits('store', form);
      closeModal();
  }
};

const validateForm = () => {
  // errors.title = !form.title.trim() ? 'Es necesario llenar este campo' : (form.title.length > 100 ? 'Te has pasado el límite de caracteres' : false);
  errors.title = !form.title.trim();
  // errors.description = !form.description.trim() ? 'Es necesario llenar este campo' : false;
  errors.description = !form.description.trim();
  // errors.penalizationDetails = (form.penalization && !form.penalizationDetails.trim()) ? 'Es necesario llenar este campo' : false;
  errors.penalizationDetails = (form.penalization && !form.penalizationDetails.trim());
};

// Watchers para detectar cambios en el formulario y quitar el error cuando empiecen a escribir
watch(() => form.title, (newVal) => {
  errors.title = false;
  attemptedSending.value = false;
  console.log('test form.title', newVal)
  if (newVal.trim()) {
    if (newVal.length <= 100) {
      // errors.title = false;
    } else {
      errors.title = true;
      // errors.title = 'Te has pasado el límite de caracteres';
    }
  } else {
    errors.title = true;
    // errors.title = 'Es necesario llenar este campo';
  }
});

watch(() => form.description, (newVal) => {
  errors.description = false;
  attemptedSending.value = false;
  if (newVal.trim()) {
      // errors.description = false;
  } else {
      // errors.description = 'Es necesario llenar este campo';
      errors.description = true;
  }
});

watch(() => form.penalizationDetails, (newVal) => {
  errors.penalizationDetails = false;
  attemptedSending.value = false;
  if (!form.penalization || (form.penalization && newVal.trim())) {
      errors.penalizationDetails = false;
  } else {
    errors.penalizationDetails = true;
      // errors.penalizationDetails = 'Es necesario llenar este campo';
  }
});

watch(() => form.penalization, () => {
  attemptedSending.value = false;
  errors.penalizationDetails = null;
  if (!form.penalization) {
      errors.penalizationDetails = false;
  } /* else if (!form.penalizationDetails.trim()) {
      errors.penalizationDetails = 'Es necesario llenar este campo';
  } */
});

function resetForm() {
  form.title = '';
  form.description = '';
  form.penalization = false;
  form.penalizationDetails = '';
  errors.title = false;
  errors.description = false;
  errors.penalizationDetails = false;
  showModalNoSave.value = false;
}

const valid = computed(()=>{
  if(form.penalization){
    return !errors.title && !errors.description && !errors.penalizationDetails &&
          Boolean(form.title.trim() && form.description.trim() && form.penalizationDetails.trim());
  }else{
    return !errors.title && !errors.description &&
            Boolean(form.title.trim() && form.description.trim());
  }
});

const changes = computed(()=>{
  if(form.penalization){
    return Boolean(form.title.trim() || form.description.trim() || form.penalizationDetails.trim());
  }else{
    return Boolean(form.title.trim() || form.description.trim());
  }
});
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

.hbtn-cta-disabled{
    background-color: #DADADA !important;
    border-radius: 6px;
    color:  #A0A0A0;
}
</style>
