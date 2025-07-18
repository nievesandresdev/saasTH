<template>
  <transition name="fade">
    <div v-if="visitNow" class="fixed inset-0 z-[99999] flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute w-full inset-0 bg-[#00000080]"></div>
      </div>
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      
      <div class="inline-block bg-white rounded-[10px] text-left overflow-hidden shadow-xl transform transition-all align-middle max-w-[344px] p-4">  
          <img class="h-8 w-8 cursor-pointer ml-auto hover:bg-[#F3F3F3] rounded-full p-1" @click="type == 'alone_exit' ? hiddenModal() : visitNow = false" src="/assets/icons/1.TH.CLOSE.svg" alt="Close">

          <div class="text-center">
            <img class="mx-auto h-8 w-8" src="/assets/icons/warning.svg" alt="Warning">
            <h3 class="mt-4 text-[20px] font-semibold htext-black-100 leading-6">{{ title ?? '¿Estás seguro?'}}</h3>
            <p class="mt-2 text-sm leading-[150%] htext-black-100">{{ text }}</p>
          </div>
          <div class="mt-4 flex justify-between" v-if="type !== 'exit' && type !== 'exit_save' && type !== 'alone_exit' && type !== 'alone_exit_save' && type !== 'alone_save' ">
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
              <button @click.stop="closeModal" class="hbtn-tertiary text-sm font-medium underline my-auto">
                  Descartar
              </button>
              
              <button  @click.stop="saveChanges" class="hbtn-primary px-4 py-3 text-sm leading-[110%] font-medium">
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
              <button  @click.prevent="goLinkUrl" class="hbtn-tertiary text-sm font-medium underline my-auto">
                  Salir sin guardar
              </button>
              <button @click="hiddenModal" class="hbtn-primary px-4 py-3 text-sm leading-[110%] font-medium border">
                {{ textbtn ?? 'Seguir' }}
              </button>
          </div>
          <div class="mt-4 flex justify-between" v-if="type == 'alone_save'">
              <button  @click.prevent="goLinkUrl" class="hbtn-tertiary text-sm font-medium underline my-auto">
                  Salir sin guardar
              </button>
              <button @click="onlySaveChanges" class="hbtn-primary px-4 py-3 text-sm leading-[110%] font-medium border">
                {{ textbtn ?? 'Seguir' }}
              </button>
          </div>
          <div class="mt-4 flex justify-between" v-if="type == 'alone_exit_save'">
              <button  @click.prevent="goLinkUrl" class="hbtn-tertiary text-sm font-medium underline my-auto">
                  Salir sin guardar
              </button>
              <button @click="onlySaveChanges" class="hbtn-primary px-4 py-3 text-sm leading-[110%] font-medium border">
                {{ textbtn ?? 'Seguir' }}
              </button>
          </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUtilStore } from '@/stores/modules/util';

const utilStore = useUtilStore();

const props = defineProps({
  id: String,
  open: Boolean,
  text: String,
  title: String,
  textbtn: String,
  type: String,
  forceOpen: Boolean,
  redirect : String,
  url: String
});

const emit = defineEmits(['saveChanges', 'close','hidden']);
const showModal = ref(false);
const visitNow = ref(false);
const intendedRoute = ref(null);


watch(() => props.open, (newVal) => {
  showModal.value = newVal;
  utilStore.$setHasUnsavedChanges(newVal)
  if (!props.forceOpen) {
    if (props.type === 'exit_save' || props.type === 'alone_exit' || props.type === 'alone_exit_save' || props.type === 'alone_save') {
      visitNow.value = newVal;
      showModal.value = true;
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

function onlySaveChanges() {
  emit('saveChanges');
  onlyCloseModal();
}

function onlyCloseModal() {
  visitNow.value = false;
  //emit('close');
}

function hiddenModal() {
  showModal.value = false;
  emit('hidden');
}

function saveChanges() {
  emit('saveChanges');
  onlyCloseModal();
}

const goLinkUrl = () => {
  if(props.url){
    window.location.href = props.url;
    onlyCloseModal();
  }else{
    closeModal();
  }

 
}

function goLink() {
  if (intendedRoute.value) {
      showModal.value = false;
      closeModal();
      router.push(intendedRoute.value).catch(err => {
          console.error('Routing error:', err);
      });
  } else {
    closeModal();
  }
}

router.beforeEach((to, from, next) => {
    //intendedRoute.value = to.fullPath
    
  if (showModal.value && !visitNow.value) {
    intendedRoute.value = to.fullPath;
    visitNow.value = true;
    next(false);
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
