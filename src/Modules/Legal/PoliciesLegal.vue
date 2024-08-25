<template>
    <div class="h-screen flex flex-col bg-gray-50">
      <div class="px-6 flex-grow">
        <HeadLegal />
        <TabLegal />
        <span class="font-normal text-sm">{{ totalPolicies }} Políticas</span>
        <div class="grid grid-cols-4 1xl:grid-cols-3 1xl:w-full 3xl:grid-cols-4 3xl:w-full 3xl:gap-4 1xl:gap-4 mt-2">
          <!-- Botón para añadir política -->
          <div
            class="bg-white border rounded-lg shadow-hoster flex items-center justify-center p-4 h-[175px] w-[344px] cursor-pointer"
            @click="openModalCreatePolicies"
          >
            <div class="flex flex-col items-center space-x-2">
              <img src="/assets/icons/1.TH.PLUS.svg" alt="Add" class="h-5 w-5" />
              <h3 class="text-base font-medium">Añadir política</h3>
            </div>
          </div>
          <!-- Divs de políticas existentes -->
          <div
            v-for="policy in policies"
            :key="policy.id"
            class="bg-white border rounded-lg shadow-hoster flex flex-col justify-between p-4 h-[175px] w-[344px] cursor-pointer"
          >
            <div @click="showPolicy(policy)">
              <h3 class="text-base font-medium mb-4 break-words whitespace-normal">{{ truncateText(policy.title, 40) }}</h3>

              <div class="flex justify-start gap-4">
                <p class="text-base font-medium">Penalización: </p>
                <p class="text-[10px] font-semibold bg-[#DADADA] rounded-full py-1 px-4">
                  {{ policy.penalization ? 'Sí' : 'No' }}
                </p>
              </div>
            </div>
            <div class="flex justify-end">
              <DropdownMenu :user="policy.user" @edit="showEditPolicy(policy)" @delete="openDeletePolicy(policy)" />
            </div>
          </div>
        </div>
      </div>
      <div class="mt-4 px-6"> <!-- Ajuste aquí -->
        <Pagination
          :current-page="currentPage"
          :total-pages="totalPages"
          :per-page="perPage"
          :total-data="totalUsers"
          @update:page="handlePageChange"
        />
      </div>
    </div>
  
    <!-- Modales y otros componentes -->
    <CreatePoliciesLegal :modal-add="modalCreatePolicies" @close="closeModalCreatePolicies" @store="handleCreatePolicies" />
    <EditPolicy :modal-edit="modalEditPolicies" @close="closeModalEditPolicies" :data="policy" @store="handleUpdatePolicies" />
    <ShowPolicy :modal-show="showSidePolicy" @close="closeSidePolicy" :data="policy" @edit="showEditPolicy" @delete="openDeletePolicy" />
    <ModalWindow :isVisible="deletePolicy" @close="closedeletePolicy" :width="'384px'">
      <template #content>
        <div class="flex justify-end">
          <img src="/assets/icons/1.TH.CLOSE.svg" class="w-6 h-6 cursor-pointer" @click="closedeletePolicy" />
        </div>
        <div class="flex justify-center mb-4">
          <img src="/assets/icons/warning-red.svg" class="w-8 h-8" />
        </div>
        <p class="text-xl font-semibold mt-4 text-center mb-2">¿Quieres eliminar la política?</p>
        <p class="text-sm font-normal text-center">Esta acción es irreversible, pero siempre tendrás la opción de crear una nueva política o norma en cualquier momento.</p>
        <div class="flex justify-between mt-4">
          <div @click="closedeletePolicy" class="hbtn-tertiary text-sm font-medium underline my-auto cursor-pointer">
            Cancelar
          </div>
          <div @click="submitDelete(policy.id)" class="hbtn-primary py-3 px-4 leading-4 cursor-pointer">
            Eliminar
          </div>
        </div>
      </template>
    </ModalWindow>
  </template>
  
  
<script setup>
import HeadLegal from './components/HeadLegal.vue';
import TabLegal from './components/TabLegal.vue';
import DropdownMenu from './components/DropdownMenu.vue';
import Pagination from './components/Pagination.vue';
import CreatePoliciesLegal from './components/Side/CreatePoliciesLegal.vue';
import EditPolicy from './components/Side/EditPolicy.vue';
import ShowPolicy from './components/Side/ShowPolicy.vue';
import { storePoliciesLegal, getPoliciesLegal,updatePoliciesLegal,apiDeletePolicy } from '@/api/services/legal/legal.services';
import { ref,onMounted } from 'vue';
import { useToastAlert } from '@/composables/useToastAlert'
import ModalWindow from '@/components/ModalWindow.vue';

const modalCreatePolicies = ref(false);
const modalEditPolicies = ref(false);
const deletePolicy = ref(false);
const toast = useToastAlert();

onMounted(() => {
    getPolicies();
});

const policies = ref([]);

const showSidePolicy = ref(false);
const policy = ref({});

const showPolicy = (data) => {
    showSidePolicy.value = true;
    modalCreatePolicies.value = false;
    policy.value = data;
}

const showEditPolicy = (data) => {
    modalEditPolicies.value = true;
    policy.value = data;

    modalCreatePolicies.value = false;
}

const closedeletePolicy = () => {
    deletePolicy.value = false;
}

const openDeletePolicy = (data) => {
    deletePolicy.value = true;
    policy.value = data;
}

const closeSidePolicy = () => {
    showSidePolicy.value = false;
}

const closeModalEditPolicies = () => {
    modalEditPolicies.value = false;
}

// Función para truncar texto
function truncateText(text, length) {
  return text.length > length ? `${text.substr(0, length)}...` : text;
}

const openModalCreatePolicies = () => {
    modalCreatePolicies.value = true;
    showSidePolicy.value = false;

    modalEditPolicies.value = false;
}

const closeModalCreatePolicies = () => {
    modalCreatePolicies.value = false;
}

const handleUpdatePolicies = async(form) => {
    const response = await updatePoliciesLegal(form);

    if(response.ok){
        toast.warningToast('Cambios guardados con éxito','top-right')
        getPolicies();
    } else {
        toast.errorToast('Ha ocurrido un error al guardar los cambios','top-right')
    }
}

const handleCreatePolicies = async(form) => {

    const response = await storePoliciesLegal(form);

    if(response.ok){
        toast.warningToast('Política creada con éxito','top-right')
        getPolicies();
    } else {
        toast.errorToast('Ha ocurrido un error al guardar los cambios','top-right')
    }
}

const submitDelete = async(id) => {
    let params = {
        id: id
    }
    const response = await apiDeletePolicy(params);

    if(response.ok){
        toast.warningToast('Política/norma eliminada','top-right')
        getPolicies();
        deletePolicy.value = false;
    } else {
        toast.errorToast('Ha ocurrido un error al eliminar la política','top-right')
    }
}

const totalPolicies = ref(0);
const totalUsers = ref(0);
const perPage = ref(0);
const currentPage = ref(1);
const totalPages = ref(0);

const handlePageChange = (page) => {
  currentPage.value = page;
  getPolicies();
};

const getPolicies = async() => {
    let params = {
        per_page: 29,
        page : currentPage.value
    };
    const response = await getPoliciesLegal(params);

    if(response.ok){
        policies.value = response.data.policies;
        totalPolicies.value = response.data.total

        //pagination
        totalUsers.value = response.data.total;
        perPage.value = response.data.per_page;
        currentPage.value = response.data.current_page;
        totalPages.value = response.data.last_page;
    } else {
        toast.errorToast('Ha ocurrido un error al cargar las políticas','top-right')
    }

}


</script>
  