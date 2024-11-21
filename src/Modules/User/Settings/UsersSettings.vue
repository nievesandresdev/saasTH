<template>
  <div class="px-6 bg-[#FAFAFA] flex flex-col min-h-screen overflow-hidden">
    <h1 class="text-[22px] font-medium leading-[110%] py-5 z-[600]">Equipo - Usuarios</h1>
    <hr class="bg-[#BFBFBF] z-[600]">
    <div class="flex justify-between items-center mt-6 z-[600]">
      <div class="relative flex w-1/3" ref="ref_dropdown_container" :class="{'mb-4':data_filter.search_terms}">
        <input
          type="text"
          class="pl-10 text-sm border border-[#BFBFBF] h-11 rounded w-full hover:border-[#34A98F] hover:placeholder:text-[#34A98F]"
          placeholder="Buscar por nombre o por puesto de trabajo"
          v-model="formFilter.search_terms"
          :class="{'border-dark':formFilter.search_terms}"
          @keypress.enter="submit_filters"
          @input="updateSearchTerms"
        >
        <div class="absolute inset-y-0 left-0 flex items-center pl-3">
          <img src="/assets/icons/1.TH.SEARCH.svg" class="w-6 h-6" alt="search icon">
        </div>
      </div>
      <div class="group flex items-center px-4 py-2 text-black border border-[#333333] rounded bg-white cursor-pointer hover:border-[#2A8873]" @click="createUser">
        <!-- <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none">
          <path d="M11.9898 4V12M11.9898 20V12M11.9898 12H20M11.9898 12H4" stroke="#333333" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" class="group-hover:stroke-[#2A8873]"/>
        </svg> -->
        <span class="font-medium text-sm group-hover:text-[#2A8873]">Crear usuario</span>
    </div>

    </div>
    <div class="flex gap-4 mb-4 z-[600]">
      <ButtonFilter @click="change_type(0)" :active="data_filter.type == 0">Todos</ButtonFilter>
      <ButtonFilter @click="change_type(1)" :active="data_filter.type == 1">Activos</ButtonFilter>
      <ButtonFilter @click="change_type(4)" :active="data_filter.type == 4">Inactivos</ButtonFilter>
    </div>
    <div class="flex-1 flex flex-col justify-between">
      <div>
        <span class="mb-4 text-sm font-normal">{{ totalUsers }} usuarios encontrados</span>
        <!-- <table class="w-full text-sm text-gray-500 rtl:text-right shadow-md mt-4 rounded-lg z-10" v-if="totalUsers > 0"> -->
        <table class="w-full text-sm text-gray-500 rtl:text-right shadow-md mt-4 rounded-lg z-10" v-if="totalUsers > 0">
          <thead class="text-sm font-semibold text-[#333] text-left border-b-2 h-1">
            <tr>
              <th scope="col" class="px-5 py-4 w-1/4">Nombre y Apellidos</th>
              <th scope="col" class="px-5 py-4 w-1/4">Puesto de Trabajo</th>
              <th scope="col" class="px-5 py-4 w-1/4">Antigüedad</th>
              <th scope="col" class="px-5 py-4 w-1/4">Estado</th>
              <th scope="col" class="px-5 py-4 w-1/4">Opciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in data"
              @mouseover="hoverTable(index)"
              @mouseleave="hoverTable(index)"
              :key="user.id"
              class="border-b hover:bg-[#F1F1F1]"
              :class="{
                'bg-[#ECF9F5]': selectedShow == user.id,
                'hover:bg-[#F1F1F1]': selectedUser?.id != user.id,
                'shadow-sm': hoverSelected == index
              }"
            >
              <th @click="showUser(user)" scope="row" class="text-left px-6 py-4 font-medium text-[#333333] whitespace-normal break-words w-1/4">
                {{ user.name }} {{ user.profile?.lastname }} 
              </th>
              <td @click="showUser(user)" class="px-6 py-4 font-medium text-sm text-[#333333] whitespace-normal break-words w-1/4">
                {{ user.work_position?.name ?? '-' }}
              </td>
              <td @click="showUser(user)" class="px-6 py-4 font-medium text-sm text-[#333333] whitespace-normal break-words w-1/4">
                {{ user.time }}
              </td>
              <td @click="showUser(user)" class="py-4 whitespace-normal break-words w-1/4" :class="{'px-[24px]' : user.del == 0, 'px-[20px]': user.del == 1}">
                <span v-if="user.status == 1" class="px-2 py-2 font-[600] text-[10px] text-[#0B6357] bg-[#ECF9F5] rounded-full">
                  Activo
                </span>
                <span v-else class="px-2 py-2 font-[600] text-[10px] text-[#C53030] bg-red-100 rounded-full">
                  Inactivo
                </span>
              </td>
              <td class="pl-[80px] py-4 whitespace-normal break-words w-1/4" @click="authStore.user.id == user.id ? showUser(user) : ''">
                
                <Toggle
                  :user="user"
                  :index="index"
                  :visibleDropdown="visibleDropdown"
                  @close="closeToggleDropdown"
                  @editUser="editUser"
                  @openModalDelete="openModalDelete"
                  @updateStatus="handleGetUsers"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <NoData v-else />
      </div>
      <div class="mt-4">
        <Pagination
          :current-page="currentPage"
          :total-pages="totalPages"
          :per-page="perPage"
          :total-data="totalUsers"
          @update:page="handlePageChange"
        />
      </div>
    </div>
  </div>

  <!-- Modal components -->
  <CreateUser 
    :modal-add="modalAdd" 
    @close="closeModal" 
    @store="handleConfirmCreateUser"
    @alert="confirmCreateUser" 
    :work-positions="workPositionsData" 
    @workPositionGet="workPositions"
    @deleteWP="isDeleteWorkPositions = true"
    @handleDeleteWP="getUserAndWP"
  />
  <EditUser 
    :modal-edit="modalEdit"
    @close="closeModalEdit" 
    @update="handleGetUsers" 
    :work-positions="workPositionsData" 
    :data-user="dataEdit"
    @workPositionGet="workPositions" 
    @handleDeleteWP="getUserAndWP"
  />
  <ShowUser 
    :modal-show="modalShow" 
    @close="modalShowClose" 
    :data-user="selectedUser" 
    @updateUser="editUser"
    @delete="openModalDelete"
    @updateStatus="handleGetUsers"
  />
  <ModalWindow width="344px" v-if="openConfirmCreateUser" :isVisible="openConfirmCreateUser" @close="closeConfirmCreateUser()" paddingBottom="8" paddingTop="4" paddingRight="4" paddingLeft="4">
    <template #content>
      <div class="flex justify-end w-full">
        <div @click="closeConfirmCreateUser">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      </div>
      <div class="flex flex-col items-center">
        <img src="/assets/icons/TH.CHECK.svg" alt="Check Icon" class="mb-4 w-[40px] h-[40px]" />
        <h2 class="text-xl font-semibold mb-2 text-center">¡Felicidades! Usuario creado correctamente</h2>
        <p class="text-center text-gray-600 text-sm font-normal">
          Se enviará un email de bienvenida con las credenciales a la dirección de correo designada.
        </p>
      </div>
    </template>
  </ModalWindow>
  <ModalWindow  :isVisible="deleteUser" @close="closeDeleteUser">
    <template #content>
      <div class="flex justify-end">
          <img
            src="/assets/icons/1.TH.CLOSE.svg"
            class="w-6 h-6 cursor-pointer"
            @click="closeDeleteUser"
          >
      </div>
      <div class="flex justify-center mb-4">
        <img
          src="/assets/icons/warning.svg"
          class="w-8 h-8"
        >
      </div>
      <p class="text-xl font-semibold mt-4 text-center mb-2">¿Desea eliminar al usuario<br> {{userData.name }} {{ userData.profile?.lastname }}?</p>
      <p class="text-sm font-normal text-left">Estás a punto de eliminar un usuario. Este proceso es irreversible y eliminará todos los datos asociados con el usuario. Si solo necesitas bloquear su acceso a un hotel, considera desvincularlo del mismo desde el menú editar usuario.</p>
      <div class="flex justify-between mt-4">
        <div @click="closeDeleteUser" class="hbtn-tertiary text-sm font-medium underline my-auto cursor-pointer">
          Cancelar
        </div>
        <div @click="submitDelete" class="hbtn-primary py-3 px-4 leading-4 cursor-pointer">
          Eliminar usuario
        </div>
      </div>
    </template>
  </ModalWindow>
  
</template>

<script setup>
import { ref, onMounted } from 'vue';
import CreateUser from './components/CreateUser.vue';
import Toggle from './components/Toggle.vue';
import EditUser from './components/EditUser.vue';
import ShowUser from './components/ShowUser.vue';
import NoData from './components/NoData.vue';
import Pagination from './components/Pagination.vue';
import ButtonFilter from '@/components/Buttons/ButtonFilter.vue';
import { getWorkPosition } from '@/api/services/users/userSettings.service';
import { useUserStore } from '@/stores/modules/users/users';
import ModalWindow from '@/components/ModalWindow.vue';
import { useToastAlert } from '@/composables/useToastAlert';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/modules/auth/login';

const modalAdd = ref(false);
const workPositionsData = ref([]);

const authStore = useAuthStore();

const modalEdit = ref(false);
const modalShow = ref(false);
const deleteUser = ref(false);
const visibleDropdown = ref(null);

const route = useRoute()

const selectedUser = ref(null);
const userData = ref({});

const isDeleteWorkPositions = ref(false);

const openConfirmCreateUser = ref(false);

const userStore = useUserStore();
const toast = useToastAlert();

const confirmCreateUser = () => {
  openConfirmCreateUser.value = true;
};

const closeConfirmCreateUser = () => {
  openConfirmCreateUser.value = false;
  location.reload();
};

const closeDeleteUser = () => {
  deleteUser.value = false;
};

const closeDeleteWorkPositions = () => {
  isDeleteWorkPositions.value = false;
};

onMounted(() => {
  handleGetUsers();
  //handleTestMail();
  adjustBodyPadding(); // Ajustar el padding al cargar la página
  window.addEventListener('resize', adjustBodyPadding); // Ajustar el padding en cada resize


  const nParam = route.query.n
  if (nParam) {
    console.log(`El valor de n es: ${nParam}`)
    handleGetuserById(nParam)
  }
});

const  handleGetuserById = async (id) => {
  const response = await userStore.$getUserById(id);
  console.log('responsegetuserbyid', response);
  editUser(response.data.user);
};

const handleConfirmCreateUser = () => {
  handleGetUsers();
  closeModal();
};

const data_filter = ref({
  search_terms: '',
  type: 0,
});

const formFilter = ref({
  search_terms: '',
});

const data = ref([]);
const dataEdit = ref(null);
const currentPage = ref(1);
const totalPages = ref(1);
const totalUsers = ref(1);
const perPage = ref(1);

const handleGetUsers = async () => {
  let params = {
    search_terms: data_filter.value.search_terms,
    type: data_filter.value.type,
    page: currentPage.value,
    per_page: 20,
  };
  const response = await userStore.$getUsers(params);
  data.value = response.data.users;
  totalUsers.value = response.data.total;
  perPage.value = response.data.per_page;
  totalPages.value = Math.ceil(response.data.total / response.data.per_page);
};

const handleTestMail = async () => {
  const response = await userStore.$testMail();
  console.log('mailTesting',response);
};

const handlePageChange = (page) => {
  currentPage.value = page;
  handleGetUsers();
};

const updateSearchTerms = () => {
  data_filter.value.search_terms = formFilter.value.search_terms;
  handleGetUsers();
};

const change_type = (type) => {
  data_filter.value.type = type;
  handleGetUsers();
};

const submit_filters = () => {
  console.log('submit_filters');
};

const createUser = () => {
  workPositions('create');
};

const editUser = (data) => {
  dataEdit.value = data;
  modalEdit.value = true;
  visibleDropdown.value = null;
  workPositions('edit');
};

let selectedShow = ref(null);
const showUser = (data) => {

  console.log('dataSHOWUSER', data);
  if(modalAdd.value || modalEdit.value) return;
  setTimeout(() => {
    selectedUser.value = data;
    modalShow.value = true;
    visibleDropdown.value = null;
    selectedShow.value = data.id;
  }, 200);
};

const workPositions = async (module) => {
  const response = await getWorkPosition();
  workPositionsData.value = response.data.work_positions;

  if (module == 'create') {
    modalAdd.value = true;
  } else {
    modalEdit.value = true;
  }
  visibleDropdown.value = null;
};

const getUserAndWP = () => {
  workPositions('create');
  handleGetUsers();
};  

const closeModal = () => {
  modalAdd.value = false;
};

const modalShowClose = () => {
  modalShow.value = false;
  selectedShow.value = null;
};

const closeModalEdit = () => {
  modalEdit.value = false;
};

const hoverSelected = ref(null);

const hoverTable = (index) => {
  if (hoverSelected.value === index) {
    hoverSelected.value = null;
  } else {
    hoverSelected.value = index;
  }
};



const closeToggleDropdown = () => {
  visibleDropdown.value = null;
};

const openModalDelete = (user) => {
  userData.value = user;
  deleteUser.value = true;
  
};

const submitDelete = async () => {
  const params = {
    user_id: userData.value.id,
  };
  const response = await userStore.$deleteUser(params);

  if (response.ok) {
    handleGetUsers();
    deleteUser.value = false;
    toast.warningToast(response.data.message, 'top-right');
  } else {
    toast.errorToast(response.data.message, 'top-right');
  }
};

window.addEventListener('resize', function() {
  document.documentElement.style.marginRight = 
    window.innerWidth > document.documentElement.clientWidth ? 'calc(100vw - 100%)' : '';
});

// JavaScript to adjust body padding
const adjustBodyPadding = () => {
  const hasScrollbar = window.innerWidth > document.documentElement.clientWidth;
  document.body.style.paddingRight = hasScrollbar ? `${window.innerWidth - document.documentElement.clientWidth}px` : '';
};

</script>

<style scoped>
button {
  padding: 8px 16px;
  border: 1px solid #ddd;
  margin: 0 2px;
  cursor: pointer;
}

button.bg-green-700 {
  background-color: #34A98F;
  color: white;
}

table th {
  width: 25%;
  min-width: 150px;
  max-width: 200px;
}


table td {
  width: 25%;
  min-width: 150px;
  max-width: 200px;
}

.trtable{
  height: 58px; /* Define the fixed height for table rows */
}
table thead {
  height: 18px;
}
</style>
