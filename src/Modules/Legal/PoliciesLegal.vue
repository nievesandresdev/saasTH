<template>
  <div class="h-screen flex flex-col bg-gray-50">
    <div class="px-6 flex-grow">
      <HeadLegal />
      <TabLegal />
      <span class="font-normal text-sm">{{ totalPolicies }} normas</span>
      <div class="grid grid-cols-4 1xl:grid-cols-3 1xl:w-5/6 3xl:grid-cols-5 3xl:w-full 3xl:gap-4 1xl:gap-4 mt-2">
        <!-- Botón para añadir política -->
        <div
          class="bg-white rounded-lg shadow-md flex items-center justify-center p-4 h-[162px] w-[295px] cursor-pointer hover:shadow-lg transition-shadow duration-200 ease-in-out"
          @click="openModalCreatePolicies"
          :class="{
            'border border-1': modalCreatePolicies
          }"
        >
          <div class="flex flex-col items-center space-x-2 gap-1">
            <img src="/assets/icons/1.TH.PLUS.svg" alt="Add" class="h-4 w-4" />
            <h3 class="text-base font-medium">Añadir norma</h3>
          </div>
        </div>
        <!-- Divs de políticas existentes -->
        <div
          v-for="policy in policies"
          :key="policy.id"
          :class="{
            'bg-white  rounded-lg shadow-md flex flex-col justify-between p-4 h-[162px] w-[295px] cursor-pointer hover:shadow-lg transition-shadow duration-200 ease-in-out': true,
            'shadow-lg border border-1 border-gray-300': selectedPolicyId === policy.id
          }"
          @click="showPolicy(policy)"
        >
          <div>
            <h3 class="text-base font-medium mb-4 break-words whitespace-normal">{{ truncateText(policy.title, 40) }}</h3>
            <div class="flex justify-start gap-4">
              <p class="text-base font-medium">Penalización: </p>
              <p class="text-[10px] font-semibold bg-[#DADADA] rounded-full py-1 px-2">
                {{ policy.penalization ? 'Sí' : 'No' }}
              </p>
            </div>
          </div>
          <div class="flex justify-end">
            <DropdownMenu 
              :user="policy.user" 
              @edit="showEditPolicy(policy)" 
              @delete="openDeletePolicy(policy)" 
              @click.stop
            />
          </div>
        </div>
      </div>
    </div>
    <div class="mt-4 px-6">
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
  <EditPolicy :modal-edit="modalEditPolicies" @close="closeModalEditPolicies" :data="policy" @store="handleUpdatePolicies" :from="typeFromEdit" @ToFrom="showPolicy"/>
  <ShowPolicy :modal-show="showSidePolicy" @close="closeSidePolicy" :data="policy" @edit="showEditPolicy" @delete="openDeletePolicy" @toEdit="showPolicy" />
  <ModalWindow :isVisible="deletePolicy" @close="closedeletePolicy" :width="'384px'">
    <template #content>
      <div class="flex justify-end">
        <img src="/assets/icons/1.TH.CLOSE.svg" class="w-8 h-8 cursor-pointer hover:bg-[#F3F3F3] rounded-full p-1" @click="closedeletePolicy" />
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
import { storePoliciesLegal, getPoliciesLegal, updatePoliciesLegal, apiDeletePolicy } from '@/api/services/legal/legal.services';
import { ref, onMounted } from 'vue';
import { useToastAlert } from '@/composables/useToastAlert';
import ModalWindow from '@/components/ModalWindow.vue';

const modalCreatePolicies = ref(false);
const modalEditPolicies = ref(false);
const deletePolicy = ref(false);
const toast = useToastAlert();
const policies = ref([]);
const showSidePolicy = ref(false);
const policy = ref({});
const selectedPolicyId = ref(null);


onMounted(() => {
  getPolicies();
});

const showPolicy = (data) => {
  selectedPolicyId.value = data.id;
  showSidePolicy.value = true;
  modalCreatePolicies.value = false;
  policy.value = data;
};

const typeFromEdit = ref(false);
const showEditPolicy = (data,type = false) => {
  modalEditPolicies.value = true;
  policy.value = data;
  modalCreatePolicies.value = false;
  console.log('secreto',type)
  if(type){
    typeFromEdit.value = true;
  }
};

const closedeletePolicy = () => {
  deletePolicy.value = false;
};

const openDeletePolicy = (data) => {
  deletePolicy.value = true;
  policy.value = data;
};

const closeSidePolicy = () => {
  showSidePolicy.value = false;

  selectedPolicyId.value = null;
};

const closeModalEditPolicies = () => {
  modalEditPolicies.value = false;

  selectedPolicyId.value = null;
};

function truncateText(text, length) {
  return text.length > length ? `${text.substr(0, length)}...` : text;
}

const openModalCreatePolicies = () => {
  modalCreatePolicies.value = true;
  showSidePolicy.value = false;
  modalEditPolicies.value = false;

  selectedPolicyId.value = null;
};

const closeModalCreatePolicies = () => {
  modalCreatePolicies.value = false;
};

const handleUpdatePolicies = async (form) => {
  const response = await updatePoliciesLegal(form);
  if (response.ok) {
    toast.warningToast('Cambios guardados con éxito', 'top-right');
    getPolicies();
  } else {
    toast.errorToast('Ha ocurrido un error al guardar los cambios', 'top-right');
  }
};

const handleCreatePolicies = async (form) => {
  const response = await storePoliciesLegal(form);
  if (response.ok) {
    toast.warningToast('Norma creada con éxito', 'top-right');
    getPolicies();
  } else {
    toast.errorToast('Ha ocurrido un error al guardar los cambios', 'top-right');
  }
};

const submitDelete = async (id) => {
  let params = { id: id };
  const response = await apiDeletePolicy(params);
  if (response.ok) {
    toast.warningToast('Norma eliminada', 'top-right');
    getPolicies();
    deletePolicy.value = false;
  } else {
    toast.errorToast('Ha ocurrido un error al eliminar la política', 'top-right');
  }
};

const totalPolicies = ref(0);
const totalUsers = ref(0);
const perPage = ref(0);
const currentPage = ref(1);
const totalPages = ref(0);

const handlePageChange = (page) => {
  currentPage.value = page;
  getPolicies();
};

const getPolicies = async () => {
  let params = {
    per_page: 29,
    page: currentPage.value
  };
  const response = await getPoliciesLegal(params);
  if (response.ok) {
    policies.value = response.data.policies;
    totalPolicies.value = response.data.total;
    // Pagination
    totalUsers.value = response.data.total;
    perPage.value = response.data.per_page;
    currentPage.value = response.data.current_page;
    totalPages.value = response.data.last_page;
  } else {
    toast.errorToast('Ha ocurrido un error al cargar las políticas', 'top-right');
  }
};
</script>
