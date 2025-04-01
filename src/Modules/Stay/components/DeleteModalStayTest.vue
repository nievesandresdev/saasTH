<template>
    <ModalWindow :isVisible="showDeleteModal" @close="closeDeleteTestModal" footer paddingContent="p-4" width="344px" topOffset="34%">
      <template #header>
        <div class="pt-4 px-4">
            <img @click="closeDeleteTestModal" class="w-6 h-6 ml-auto block cursor-pointer" src="/assets/icons/1.TH.CLOSE.svg" alt="">
            <img class="h-8 w-8 mx-auto" src="/assets/icons/warning.svg" >
        </div>
      </template>
      <template #content>
        <div>
            <h2 class="text-center text-[20px] font-semibold">¿Estás seguro?</h2>
            <p class="mt-2 text-sm leading-[150%] text-center">Si eliminas las estancias de prueba no podrás deshacer la acción</p>
        </div>
      </template>
      <template #footer>
        <div class="px-4 pb-4 flex items-center justify-between w-full">
            <a @click="closeDeleteTestModal" href="javascript:void(0)" class="text-sm font-medium underline hover:underline leading-[110%] px-4">
                No, cancelar
            </a>
            <a 
              href="javascript:void(0)" class="text-sm font-medium hbtn-primary leading-[100%] h-10 py-3 px-4"
              @click="deleteTestStays"
            >
                Sí, eliminar
            </a>
        </div>
      </template>
    </ModalWindow>
</template>
<script setup>
import { inject } from 'vue'
import ModalWindow from '@/components/ModalWindow.vue'; 
import { useStayStore } from '@/stores/modules/stay/stay';
import { useRoute, useRouter } from 'vue-router'
import { useToastAlert } from '@/composables/useToastAlert'

const toast = useToastAlert();
const stayStore = useStayStore();
const route = useRoute();
const router = useRouter();

const showDeleteModal = inject('showDeleteModal')
function closeDeleteTestModal(){
    showDeleteModal.value = false;
}

async function deleteTestStays(){
  closeDeleteTestModal();
  let stayId = route.params.stayId;
  let currentStay = await stayStore.$findById(stayId);
  await stayStore.$deleteTestStays(stayId);
  toast.warningToast('Estancias de prueba eliminadas con éxito','top-right');
  // console.log('test currentStay',currentStay)
  if(currentStay && currentStay.trial){
    router.push({ name : 'StayHomePage'})
  }
}
</script>