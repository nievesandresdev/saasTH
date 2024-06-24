<template>
    <div class="px-6">
        <h1 class="text-[22px] font-medium leading-[110%] py-5">Equipo</h1>
        <MenuSettings />
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
                >
                <div class="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg class="w-6 h-6 text-[#333333] dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
            </div>
            <button class="flex items-center px-4 py-2 text-black border border-[#333333] rounded hover:bg-gray-100" @click="createUser">
                <img src="/assets/icons/1.TH.PLUS.svg" class="w-4 h-4 mr-2" alt="plus icon">
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
        <div class="relative mt-6">
            <table class="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
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
                        class=" border-b dark:bg-gray-800 dark:border-gray-700 bg-white"
                        :class="{'bg-[#ECF9F5]': selectedShow == user.id, 'shadow-sm': hoverSelected == index}"
                    >
                        <th @click="openModalShow(user)" scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {{ user.name }}
                        </th>
                        <td @click="openModalShow(user)" class="px-6 py-4">
                            {{ getRoleName(user.role.name) }}
                        </td>
                        <td @click="openModalShow(user)" class="px-6 py-4">
                            {{ user.work_position }}
                        </td>
                        <td @click="openModalShow(user)" class="px-6 py-4">
                            <span class="px-4 py-2 font-[600] text-[12px] text-[#0B6357] bg-green-100 rounded-full">
                                Activo
                            </span>
                        </td>
                        <td class="px-6 py-4 relative" >
                            <svg @click="toggleDropdown(index)" class="cursor-pointer" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="2" fill="currentColor"/>
                                <circle cx="19" cy="12" r="2" fill="currentColor"/>
                                <circle cx="5" cy="12" r="2" fill="currentColor"/>
                            </svg>
                            <div v-if="visibleDropdown === index"  class="absolute left-0 w-48 bg-white rounded-md shadow-md py-1 z-50">
                                <a href="#" @click="openModalEdit(user)" class=" px-4 flex items-center justify-left py-2 text-sm text-gray-700 hover:bg-gray-100">
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
    </div>

    <CreateUser :modal_add="modal_add" @close="closeModal" />
</template>

<script setup>
import { ref } from 'vue';
import MenuSettings from './components/MenuSettings.vue';
import CreateUser from './components/CreateUser.vue';
import ButtonFilter from '@/components/Buttons/ButtonFilter.vue';

const modal_add = ref(false);
const visibleDropdown = ref(null);

const data_filter = ref ({
    search_terms: '',
    type : 0
});

const formFilter = ref({
    search_terms: ''
});

const data = ref([
    {
        id: 1,
        name: 'Juan Perez',
        role: {
            id: 1,
            name: 'Administrator'
        },
        work_position: 'Gerente'
    },
    {
        id: 2,
        name: 'Maria Lopez',
        role: {
            id: 2,
            name: 'Operator'
        },
        work_position: 'Operador'
    },
    {
        id: 3,
        name: 'Pedro Ramirez',
        role: {
            id: 3,
            name: 'Owner'
        },
        work_position: 'Dueño'
    },
    {
        id: 4,
        name: 'Josefa Martinez',
        role: {
            id: 4,
            name: 'Inactive'
        },
        work_position: 'Inactivo'
    }
]);

const filter_search = () => {
    console.log('filter_search',formFilter.value.search_terms);
}


const change_type = (type) => {
    console.log('change_type',type);
    data_filter.value.type = type
}

const submit_filters = () => {
    console.log('submit_filters');
}

const createUser = () => {
    modal_add.value = true
    visibleDropdown.value = null
    console.log('createUser',modal_add.value);
}

const closeModal = () => {
    modal_add.value = false
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

const toggleDropdown = (index) => {

    if (visibleDropdown.value === index) {
        visibleDropdown.value = null;
    } else {
        visibleDropdown.value = index;
    }
  /* const currentUserRole = user.role.name;
  const authRole = usePage().props.value.auth.role;
  const userId = user.id */

  /* if(usePage().props.value.auth.user.id == userId){
    console.log('Eres tu mismo')
    return
  }

  if (authRole === 'Administrator') {
    if (currentUserRole === 'Operator') {
      visibleDropdown.value = visibleDropdown.value === index ? null : index;
    } else {
      console.log('no');
    }
  } else if (authRole === 'Associate') {
    visibleDropdown.value = visibleDropdown.value === index ? null : index;
  } else {
    console.error('no es');
  } */
};

const openModalEdit = (data) => {
    console.log('openModalEdit',data);
    visibleDropdown.value = null
}

const modal_show_user = ref(false);
const selectedUser = ref(null);

const openModalShow = (data) => {
    modal_show_user.value = true
    selectedUser.value = data
    visibleDropdown.value = null
    selectedShow.value = data.id

}

const userData = ref({})
function openModalDelete(user){
    userData.value = user
    visibleDropdown.value = null
}

const getRoleName = (roleName) => {
  return roleName === 'Associate'
    ? 'Director'
    : roleName === 'Administrator'
    ? 'Administrador'
    : 'Operador';
};
</script>
