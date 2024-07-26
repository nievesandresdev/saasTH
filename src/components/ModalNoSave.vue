<template>
  <transition name="fade">
    <div v-if="visitNow" class="fixed inset-0 z-[2000] flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-[#00000080]"></div>
      </div>
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      
      <div class="inline-block bg-white rounded-[10px] text-left overflow-hidden shadow-xl transform transition-all align-middle max-w-[344px] p-4">  
          <img class="h-6 w-6 cursor-pointer ml-auto" @click="visitNow = false" src="/assets/icons/1.TH.CLOSE.svg" alt="Close">

          <div class="text-center">
            <img class="mx-auto h-8 w-8" src="/assets/icons/warning.svg" alt="Warning">
            <h3 class="mt-4 text-[20px] font-semibold htext-black-100 leading-6">{{ title ?? '¿Estás seguro?'}}</h3>
            <p class="mt-2 text-sm leading-[150%] htext-black-100">{{ text }}</p>
          </div>
          <div class="mt-4 flex justify-between" v-if="type !== 'exit' && type !== 'exit_save' && type !== 'alone_exit'">
              <button @click.prevent="goLink" class="hbtn-tertiary text-sm font-medium underline my-auto">
                  Salir sin guardar
              </button>
              
              <button v-if="type == 'save_changes'" @click="saveChanges" class="hbtn-primary px-4 py-3 text-sm leading-[110%] font-medium">
                  {{ textbtn ?? 'Guardar cambios' }}
              </button>
              <button v-else @click="closeModal" class="hbtn-primary px-4 py-3 text-sm leading-[110%] font-medium">
                  {{ textbtn }}
              </button>
          </div>
          <div class="mt-4 flex justify-between" v-if="type === 'exit_save'">
              <button @click="closeModal" class="hbtn-tertiary text-sm font-medium underline my-auto">
                  Salir sin guardar
              </button>
              
              <button  @click="saveChanges" class="hbtn-primary px-4 py-3 text-sm leading-[110%] font-medium">
                  {{ textbtn ?? 'Guardar cambios' }}
              </button>
          </div>
          <div class="mt-4 flex justify-between" v-if="type == 'exit'">
              <button  @click="closeModal" class="hbtn-tertiary text-sm font-medium underline my-auto">
                  Cancelar
              </button>
              <button @click.prevent="goLink" class="hbtn-primary px-4 py-3 text-sm leading-[110%] font-medium">
                  Salir
              </button>
          </div>
          <div class="mt-4 flex justify-between" v-if="type == 'alone_exit'">
              <button  @click="closeModal" class="hbtn-tertiary text-sm font-medium underline my-auto">
                  Salir
              </button>
              <button @click="hiddenModal" class="hbtn-primary px-4 py-3 text-sm leading-[110%] font-medium border border-green-400 text-green-600">
                  Seguir
              </button>
          </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const props = defineProps({
  id: String,
  open: Boolean,
  text: String,
  title: String,
  textbtn: String,
  type: String,
  forceOpen: Boolean,
});

const emit = defineEmits(['saveChanges', 'close','hidden']);
const showModal = ref(false);
const visitNow = ref(false);
const intendedRoute = ref(null);  // Almacena la ruta intentada

watch(() => props.open, (newVal) => {
  showModal.value = newVal;
  if (!props.forceOpen) {
    if (props.type === 'exit_save' || props.type === 'alone_exit') {
      visitNow.value = newVal;
    } else {
      visitNow.value = false;
    }
  }
});

watch(() => props.forceOpen, (newVal, oldVal) => {
    if (!oldVal && newVal) {
      visitNow.value = true;
    }
});

const router = useRouter();

function closeModal() {
  visitNow.value = false;
  emit('close');
}

function hiddenModal() {
  visitNow.value = false;
  emit('hidden');
}

function saveChanges() {
  emit('saveChanges');
  closeModal();
}

function goLink() {
  if (intendedRoute.value) {
      showModal.value = false;
      closeModal()
      router.push(intendedRoute.value).catch(err => {
          console.error('Routing error:', err);
      });
  } else {
    closeModal();
  }
}

router.beforeEach((to, from, next) => {
  if (showModal.value && !visitNow.value) {
    intendedRoute.value = to.fullPath; // Guarda la ruta completa a la que se intentaba acceder
    visitNow.value = true;
    next(false); // Detiene la navegación actual
  } else {
    next();
  }
});
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
