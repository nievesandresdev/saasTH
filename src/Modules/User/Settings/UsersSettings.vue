<template>
    <div class="px-6 bg-[#FAFAFA]
    ">
        <h1 class="text-[22px] font-medium leading-[110%] py-5">Equipo - Usuarios</h1>
        <hr class="bg-[#BFBFBF]">
        <!-- <MenuSettings /> -->
        <div class="flex justify-between items-center mt-6">
            <div class="relative flex w-1/3" ref="ref_dropdown_container" :class="{'mb-4':data_filter.search_terms}">
                <input
                    type="text"
                    class="pl-10 text-sm border border-[#BFBFBF] h-11 rounded w-full"
                    placeholder="Buscar por nombre o por puesto"
                    v-model="formFilter.search_terms"
                    :class="{'border-dark':formFilter.search_terms}"
                    @keyup.prevent="filter_search()"
                    @keypress.enter="submit_filters"
                    @input="updateSearchTerms"
                >
                <div class="absolute inset-y-0 left-0 flex items-center pl-3">
                    <img src="/assets/icons/1.TH.SEARCH.svg" class="w-6 h-6" alt="search icon">
                </div>
            </div>
            <button class="flex items-center px-4 py-2 text-black border border-[#333333] rounded hover:bg-gray-100" @click="createUser">
                <img src="/assets/icons/1.TH.PLUS.svg" class="w-6 h-6 mr-2" alt="plus icon">
                Crear usuario
            </button>
        </div>
        <div class="flex gap-4 mb-4">
            <ButtonFilter
                @click="change_type(0)"
                :class="{ 'border-green-700 hbg-green-200 htext-green-600': data_filter.type == 0,'border border-black': data_filter.type != 0 }"
            >
                Todos
            </ButtonFilter>

            <ButtonFilter
                @click="change_type(1)"
                :class="{ 'border-green-700 hbg-green-200 htext-green-600': data_filter.type == 1,'border border-black': data_filter.type != 1 }"
            >
                Propietarios
            </ButtonFilter>

            <ButtonFilter
                @click="change_type(2)"
                :class="{ 'border-green-700 hbg-green-200 htext-green-600': data_filter.type == 2,'border border-black': data_filter.type != 2 }"
            >
                Administradores
            </ButtonFilter>

            <ButtonFilter
                @click="change_type(3)"
                :class="{ 'border-green-700 hbg-green-200 htext-green-600': data_filter.type == 3,'border border-black': data_filter.type != 3 }"
                >
                Operadores
            </ButtonFilter>

            <ButtonFilter
                @click="change_type(4)"
                :class="{ 'border-green-700 hbg-green-200 htext-green-600': data_filter.type == 4,'border border-black': data_filter.type != 4 }"
            >
                Inactivos
            </ButtonFilter>
        </div>
        
        <div class="relative mt-5">
            <span class="mb-4 text-sm font-normal">[{{ totalUsers }}] usuarios encontrados</span>
            <table class="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400 shadow-md mt-4">
                <thead class="text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">Nombre</th>
                        <th scope="col" class="px-6 py-3">Tipo</th>
                        <th scope="col" class="px-6 py-3">Puesto</th>
                        <th scope="col" class="px-6 py-3">Estado</th>
                        <th scope="col" class="px-6 py-3">Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(user,index) in data"
                        @mouseover="hoverTable(index)"
                        @mouseleave="hoverTable(index)"
                        :key="user.id"
                        class=" border-b dark:bg-gray-800 dark:border-gray-700 bg-white hover:bg-[#F9FFFD]"
                        :class="{'bg-[#ECF9F5]': selectedShow == user.id, 'shadow-sm': hoverSelected == index}"
                    >
                        <th @click="showUser(user)" scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {{ user.name }}
                        </th>
                        <td @click="showUser(user)" class="px-6 py-4">
                            {{ $getRoleName(user.role.name) }}
                        </td>
                        <td @click="showUser(user)" class="px-6 py-4">
                            {{ user.work_position }}
                        </td>
                        <td @click="showUser(user)" class="px-6 py-4">
                            <span v-if="user.del == 0" class="px-4 py-2 font-[600] text-[10px] text-[#0B6357] bg-green-100 rounded-full">
                                Activo
                            </span>
                            <span v-else class="px-4 py-2 font-[600] text-[10px] text-[#C53030] bg-red-100 rounded-full">
                                Inactivo
                            </span>
                        </td>
                        <td class="px-6 py-4 relative" >
                            <svg @click="toggleDropdown(index,user)" v-show="!ownerAccount(user)" class="cursor-pointer" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="2" fill="currentColor"/>
                                <circle cx="19" cy="12" r="2" fill="currentColor"/>
                                <circle cx="5" cy="12" r="2" fill="currentColor"/>
                            </svg>
                            <div v-if="visibleDropdown === index"  class="absolute left-0 w-48 bg-white rounded-md shadow-md py-1 z-50">
                                <a href="#" @click="editUser(user)" class=" px-4 flex items-center justify-left py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil mr-2" viewBox="0 0 16 16">
                                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                                    </svg>
                                    Editar usuario
                                </a>
                                <hr class="my-1">
                                <a href="#" @click="openModalDelete(user)" class="flex items-center justify-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3 mr-2" viewBox="0 0 16 16">
                                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                                    </svg>
                                    Eliminar usuario
                                </a>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <Pagination
            :current-page="currentPage"
            :total-pages="totalPages"
            :per-page="totalUsers"
            @update:page="handlePageChange"
        />
    </div>

    <CreateUser 
        :modal-add="modalAdd" 
        @close="closeModal" 
        @store="handleGetUsers"
        @alert="confirmCreateUser" 
        :work-positions="workPositionsData" 
    />

    <EditUser 
        :modal-edit="modalEdit"
        @close="closeModalEdit" 
        @update="handleGetUsers" 
        :work-positions="workPositionsData" 
        :data-user="dataEdit" 
     />

    <ShowUser 
        :modal-show="modalShow" 
        @close="modalShow = false" 
        :data-user="selectedUser" 
        @update="editUser"
        @delete="openModalDelete"
    />

     <ModalWindow v-if="openConfirmCreateUser" :isVisible="openConfirmCreateUser" @close="closeConfirmCreateUser()">
        <template #content>
            <div class="flex justify-end w-full">
            <button @click="closeConfirmCreateUser">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            </div>
            <div class="flex flex-col items-center p-4">
                <img src="/assets/icons/TH.CHECK.svg" alt="Check Icon" class="mb-4 w-8 h-8" />
                <h2 class="text-xl font-semibold mb-2 text-center">¡Felicidades! Usuario creado correctamente</h2>
                <p class="text-center text-gray-600">
                Se enviará un email de bienvenida con las credenciales a la dirección de correo designada.
                </p>
            </div>
        </template>
    </ModalWindow>

    <ModalWindow v-if="deleteUser" :isVisible="deleteUser" @close="closeDeleteUser">
        <template #content>
            <div class="flex justify-start">
                <button @click="closeDeleteUser">
                    <img
                        src="/assets/icons/1.TH.CLOSE.svg"
                        class="w-6 h-6"
                    >
                </button>
            </div>
            <div class="flex justify-center">
                <img
                    src="/assets/icons/warning.svg"
                    class="w-8 h-8"
                >
            </div>
            <p class="text-lg font-bold mt-4 text-center mb-2">¿Desea eliminar al usuario<br> {{userData.name }} {{ userData.profile?.lastname }}?</p>
            <p class="text-sm text-center">Estás a punto de eliminar un usuario. Este proceso es irreversible y eliminará todos los datos asociados con el usuario. Si solo necesitas bloquear su acceso a un hotel, considera desvincularlo del mismo desde el menú editar usuario.</p>
            <div class="flex justify-between mt-4">
                <button @click="closeDeleteUser" class="hbtn-tertiary text-sm font-medium underline my-auto">
                    Cancelar
                </button>
                <button @click="submitDelete" class="hbtn-primary py-3 px-4 leading-4">
                    Eliminar usuario
                </button>
            </div>
        </template>
    </ModalWindow>
     
</template>

<script setup>
import { ref,onMounted } from 'vue';
import MenuSettings from './components/MenuSettings.vue';
import CreateUser from './components/CreateUser.vue';
import EditUser from './components/EditUser.vue';
import ShowUser from './components/ShowUser.vue';
import Pagination from './components/Pagination.vue';
import ButtonFilter from '@/components/Buttons/ButtonFilter.vue';
import { getWorkPosition  } from '@/api/services/users/userSettings.service';
import { useUserStore } from '@/stores/modules/users/users'
import ModalWindow from '@/components/ModalWindow.vue'
import { useToastAlert } from '@/composables/useToastAlert'
import { $isAdmin, $isOperator } from '@/utils/helpers';

const modalAdd = ref(false);
const modalEdit = ref(false);
const modalShow = ref(false);
const deleteUser = ref(false);
const visibleDropdown = ref(null);
const workPositionsData = ref([]);

const selectedUser = ref(null);
const userData = ref({})

const openConfirmCreateUser = ref(false);

const userStore = useUserStore();
const toast = useToastAlert();

const confirmCreateUser = () => {
    openConfirmCreateUser.value = true
}

const closeConfirmCreateUser = () => {
    openConfirmCreateUser.value = false
}

const closeDeleteUser = () => {
    deleteUser.value = false
}



onMounted(() => {
    handleGetUsers();
     //handleTestMail(); 
});

const data_filter = ref ({
    search_terms: '',
    type : 0
});

const formFilter = ref({
    search_terms: ''
});

const data = ref([]);
const dataEdit = ref(null);
const currentPage = ref(1);
const totalPages = ref(1);
const totalUsers = ref(1);

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
  totalPages.value = Math.ceil(response.data.total / response.data.per_page);
};

/* const handleTestMail = async () => {
    const response = await userStore.$testMail();
}; */

/* const handleUpdateUsers = async () => {
  console.log('handleUpdateUsers');
}; */

const handlePageChange = (page) => {
  currentPage.value = page;
  handleGetUsers();
};

const updateSearchTerms = () => {
  data_filter.value.search_terms = formFilter.value.search_terms;
  handleGetUsers();
}

const filter_search = () => {
    console.log('filter_search',formFilter.value.search_terms);
}


const change_type = (type) => {
  data_filter.value.type = type;
  handleGetUsers();
};

const submit_filters = () => {
    console.log('submit_filters');
}

const createUser = () => {
    modalAdd.value = true
    visibleDropdown.value = null
    workPositions();
}

const editUser = (data) => {
    dataEdit.value = data;
    modalEdit.value = true
    visibleDropdown.value = null
    workPositions();
}

const showUser = (data) => {
    selectedUser.value = data
    modalShow.value = true
    visibleDropdown.value = null

}

//const getWorkposition async
const workPositions = async () => {
    const response = await getWorkPosition();
    workPositionsData.value = response.data.work_positions;
}

const closeModal = () => {
    modalAdd.value = false
}

const closeModalEdit = () => {
    modalEdit.value = false
}

let selectedShow = ref(null);
const hoverSelected = ref(null);

const hoverTable = (index) => {
    //visibleDropdown.value = null;
    if (hoverSelected.value === index) {
        hoverSelected.value = null;
    }else{
        hoverSelected.value = index;
    }
};

const ownerAccount = (user) => { //funcion que ve que es el duse;o o primer usuario de una cuenta
    return user.role.name == 'Associate' && ($isAdmin() || $isOperator())
}

const toggleDropdown = (index,user) => {

    if (user.role.name == 'Associate' && ($isAdmin() || $isOperator())) {
        console.log('no se puede editar');
        visibleDropdown.value = null;
    }else{
        if (visibleDropdown.value === index || user.del == 1) {
            visibleDropdown.value = null;
        } else {
            visibleDropdown.value = index;
        }
    }
};


function openModalDelete(user){
    userData.value = user
    visibleDropdown.value = null
    deleteUser.value = true
}

const submitDelete = async () => {
    const params = {
        user_id: userData.value.id
    }
    const response = await userStore.$deleteUser(params);

    if(response.ok){
        handleGetUsers();
        deleteUser.value = false
        toast.warningToast(response.data.message,'top-right');
    }else{
        toast.errorToast(response.data.message,'top-right');
    }
}
</script>
