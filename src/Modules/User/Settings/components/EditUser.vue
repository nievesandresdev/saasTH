<template>
    <transition>
      <div
        v-if="modalEdit"
        class="absolute bg-white shadow-xl add flex flex-col"
        :style="`top: 0; right: 0; height: 100vh; z-index: 3000;`"
        ref="ref_section_edit"
        @mousedown="handleMouseDown"
        @mouseleave="handleMouseLeave"
      >
     
        <div class="overflow-y-auto scrolling-sticky" style="height: calc(100% - 72px)">
          <div class="flex justify-between items-center px-6 py-[20px] mt-4">
            <div class="flex-1 text-left">
              <h1 class="font-medium text-[22px]">Editar usuario</h1>
            </div>
            <div class="flex justify-end">
              <button class="" @click="closeModal()">
                <img src="/assets/icons/1.TH.CLOSE.svg" alt="icon_close" class="w-8 h-8 hover:bg-[#F3F3F3] rounded-[100px] p-1">
              </button>
            </div>
          </div>
  
          <div class="pb-6 pr-6 pl-6">
            <div class="flex items-center w-full overflow-x-auto hide-scrollbar">
                <div
                  class="flex w-full"
                  style="scroll-snap-type: x mandatory; scroll-padding-right: 16px;"
                >
                  <h3
                    v-for="(step, index) in steps"
                    :key="step.number"
                    :class="[
                      'flex-1 text-center py-2 text-lg font-semibold cursor-pointer relative px-4',
                      currentStep === step.number
                        ? 'bg-[#ECF9F5] text-[#0B6357] rounded-t-lg rounded-bottom-border active-step'
                        : 'text-gray-300',
                    ]"
                    @click="scrollToStep(index)"
                    style="scroll-snap-align: start;"
                    :ref="el => stepRefs[index] = el"
                  >
                    {{ step.label }}
                  </h3>
                </div>
              </div>
            <hr class="mb-5 px-4">
            <div v-if="currentStep === 1">
              <div class="relative mt-4">
                <div class="flex flex-col text-black">
                  <span class="text-sm font-medium mb-1">Puesto de Trabajo</span>
                </div>
                <div class="relative w-full">
                  <input
                      type="text"
                      id="workPositionInput"
                      @click.stop="toggleModalWorkPosition"
                      :value="selectedWorkPositionName"
                      readonly
                      class="bg-white w-full rounded-md  border  text-black font-medium text-sm px-4 py-2.5 cursor-pointer placeholder:font-normal placeholder:text-[#A0A0A0] hinput-green"
                      :class="{
                        'placeholder:text-black border-black': selectedWorkPositionName != 'Elige el puesto de trabajo',
                      'placeholder:text-gray-400  border-gray-300': selectedWorkPositionName === 'Elige el puesto de trabajo' || selectedWorkPositionName === 'Puesto de Trabajo'
                      }"
                      :placeholder="selectedWorkPositionName ?? 'Elige el puesto de trabajo'"
                    />
                  <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <img src="/assets/icons/1.TH.I.dropdownBig.svg">
                  </div>
                </div>
                <transition name="modal-fade">
                  <div id="modalWorkPosition">
                    <ModalCrud
                      :data="workPositions"
                      :open="isModalCrudOpen"
                      @close="closeModalWorkPosition"
                      @select="selectWorkPosition"
                      @getWorkPositions="getWorkPositions"
                      @deleteWP="deleteWorkPosition"
                    />
                  </div>
                </transition>
              </div>

              <div class="mt-4">
                    <label class="text-sm font-medium">Nombre *</label>
                    <div class="relative">
                        <input
                            v-model="form.name"
                            type="text"
                            class="w-full h-10 p-3 text-sm font-medium  border  rounded-6 hoverForm rounded-md hinput-green"
                            :class="
                            {
                              'hborder-black-100 htext-black-100 font-medium': form.name,
                              'hborder-gray-400 htext-gray-500': !form.name
                            }"
                            placeholder="Nombre del usuario"
                        />
                    </div>
                </div>
                <div class="mt-4">
                    <label class="text-sm font-medium">Apelido *</label>
                    <div class="relative">
                        <input
                            v-model="form.lastname"
                            type="text"
                            class="w-full h-10 p-3 text-sm font-medium  border  rounded-6 hoverForm rounded-md hinput-green"
                            :class="
                            {
                              'hborder-black-100 htext-black-100 font-medium': form.lastname,
                              'hborder-gray-400 htext-gray-500': !form.lastname
                            }"
                            placeholder="Apellido del usuario"
                        />
                    </div>
                </div>
                <div class="mt-4">
                  <label class="text-sm font-medium">Teléfono móvil</label>
                  <BasePhoneField
                        v-model="form.phone"
                        name="phone"
                        @handlePhoneError="errorPhone = $event"
                    />
                    <!-- <div class="flex rounded">
                        <select v-model="form.prefix"
                          :class="{
                            'hborder-alert-negative': errorPrefix, '': !errorPrefix,
                            'hborder-black-100 htext-black-100 font-medium': form.prefix && form.phone,
                            'hborder-gray-400 htext-gray-500': !form.phone
                          }" 
                          class="bg-white w-[92px] rounded-l-lg border pr-1 text-gray-700 font-medium text-sm px-4 py-2.5 appearance-none bg-no-repeat bg-right"
                          style="background-image: url('/assets/icons/1.TH.I.dropdownBig.svg'); background-size: 24px 24px; background-position: right 8px center; padding-right: 4px;">
                          <option v-for="prefix in prefixes" :key="prefix" :value="prefix">{{ prefix ?? 'Prefijo' }}</option>
                        </select>
                            <input type="text"
                                placeholder="Teléfono de contacto"
                                class="p-2.5 block border w-full text-sm text-gray-900 bg-white rounded-r-lg focus:ring-blue-500 focus:border-blue-500"
                                :class="{
                                  'hborder-black-100 htext-black-100 font-medium': form.prefix && form.phone,
                                  'hborder-gray-400 htext-gray-500': !form.phone,
                                  'hborder-negative placeholder:text-[#FF6666]' : errorPhone
                                }"
                                v-model="form.phone"
                                @input="validatePhone"
                            >
                    </div> -->
                    <div class="flex justify-start mt-2 htext-alert-negative" v-if="errorPhone">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="mr-2 w-4 h-4 bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
                        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                        </svg>
                        <p class="text-xs htext-alert-negative">Introduce solo números en el campo de teléfono</p>
                    </div>
                </div>
                <div class="mt-4">
                    <label class="text-sm font-medium">Correo electrónico *</label>
                    <div class="relative">
                        <!-- <input
                            v-model="form.email"
                            type="email"
                            class="w-full h-10 p-3 text-sm font-medium  border rounded-6 hoverForm rounded-md"
                            :class="
                            {
                              'hborder-black-100 htext-black-100 font-medium': form.email && !errorEmail,
                              'hborder-gray-400 htext-gray-500': !form.email || errorEmail,
                              'hborder-negative placeholder:text-[#FF6666]' : errorEmail
                            }"
                            placeholder="Correo con el que iniciará sesión"
                        /> -->
                        <BaseEmailFieldLive
                            placeholder="Correo con el que iniciará sesión"
                            v-model="form.email"
                            :enableLiveCheck="true"
                            :userId="form.user_id"
                            @errorMessage="errorEmailText = $event"
                            @handleError="errorEmail = $event"    
                        />
                        <div class="flex mt-2 justify-left htext-alert-negative" v-if="errorEmail">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="mr-2 bi bi-exclamation-triangle-fill w-4 h-4" viewBox="0 0 16 16">
                            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                          </svg>
                            <p class="text-xs htext-alert-negative" v-text="errorEmailText"></p>
                        </div>
                    </div>
                </div>
            </div> <!-- fin step 1-->
            <div v-if="currentStep === 2">
                <div class="flex flex-col mb-8 text-left">
                    <strong class="mb-5 text-xl">Hoteles</strong>
                    <span class="font-normal">
                        Selecciona los alojamientos en donde se encontrará activo este usuario.
                    </span>
                </div>
                <div class="space-y-2">
                  <!-- Checkbox para "Todos los hoteles" -->
                  <div class="flex items-center justify-between mb-4 rounded-lg">
                    <span class="text-sm font-semibold">Todos los hoteles</span>
                    <input
                      type="checkbox"
                      v-model="selectAllHotels"
                      @change="handleSelectAll(selectAllHotels)"
                      class="hcheckbox w-[20px] h-[20px] rounded disabled:opacity-50"
                      :disabled="isRoleAdmin"
                    />
                  </div>

                  <!-- Checkboxes para los hoteles individuales -->
                  <div
                    v-for="hotel in userStore.$getHotels(['id', 'name'])"
                    :key="hotel.id"
                    class="flex items-center justify-between mb-4 rounded-lg"
                  >
                    <span class="text-sm font-[500]">{{ hotel.name }}</span>
                    <input
                      type="checkbox"
                      :value="hotel.id"
                      v-model="form.hotels" 
                      @change="handleSelection(hotel.id)"
                      class="hcheckbox h-5 w-5 rounded disabled:opacity-50"
                      :disabled="isRoleAdmin"
                    />
                  </div>
              </div>
            </div>

            <div v-if="currentStep === 3">
              <AccessPermissions
                v-model:permissions="form.permissions"
                :isRoleAdmin="isRoleAdmin"
                :workPositionId="form.work_position_id"
            />

            </div>
            <div v-if="currentStep === 4">
              <Notifications 
                v-model:periodicityChat="form.periodicityChat"
                v-model:periodicityStay="form.periodicityStay"
                v-model:notifications="form.notifications"
                :maxHeight="900"
                :workPositionId="form.work_position_id"
              />
            </div>
          </div>
        </div>
  
        <div class="py-6 px-6 w-full flex justify-between border-t border-gray z-[1000] bg-white" style="height: 88px;">
          <button  @click="closeModal" class="hbtn-tertiary text-sm font-medium underline my-auto">
              Cancelar
          </button>
          <button
            class="px-4 py-2 font-medium rounded text-black"
            @click="currentStep === 4 ? handleUpdateUser() : nextStep()"
            :disabled="isFormIncomplete"
            :class="isFormIncomplete ? 'bg-gray-300 text-gray-400' : 'hbtn-cta text-black '"
          >
            {{ currentStep === 4 ? 'Guardar' : 'Guardar' }}
          </button>
        </div>
        <ModalNoSave
          :id="'not-saved'"
          :open="showModalNoSave"
          text="Tienes cambios sin guardar. ¿Estás seguro de que quieres salir sin guardar?"
          textbtn="Guardar"
          :redirect="intendedRoute"
          @close="closeModalEditUser"
          @saveChanges="handleUpdateUser"
          type="alone_exit_save"
          :url="intendedRoute"
          @hidden="handleCloseModal"
        />
        <ModalDeleteWork :isDeleteWorkPositions="isDeleteWorkPositions" @close="closeDeleteWorkPositions" :id="IdDeleteWP" @delete="getWorkPositions"  />
      </div>
      
    </transition>
    
  </template>
  
  <script setup>
  import { ref, onMounted, nextTick, defineEmits,computed,watch,defineProps, onBeforeUnmount } from 'vue';
  import ModalSelect from './ModalSelect.vue';
  import ModalCrud from './ModalCrud.vue';
  import { useUserStore } from '@/stores/modules/users/users'
  import Checkbox from '@/components/Forms/Checkbox.vue';
  import { useToastAlert } from '@/composables/useToastAlert'
  import { useRoute, useRouter } from 'vue-router';
  import ModalNoSave from '@/components/ModalNoSave.vue';
  import { useMouseHandle } from '@/composables/useMouseHandle';
  import AccessPermissions from './AccessPermisions.vue';
  import BaseTooltipResponsive from '@/components/BaseTooltipResponsive.vue';
  import Notifications from './Notifications.vue';
  import ModalDeleteWork from './ModalDeleteWork.vue';
  import BasePhoneField from "@/components/Forms/BasePhoneField.vue";
  import BaseEmailFieldLive from '@/components/Forms/BaseEmailFieldLive.vue';
  
  const { mouseDownInside, handleMouseDown, handleMouseLeave } = useMouseHandle();

  
  const emits = defineEmits(['close','update','workPositionGet','handleDeleteWP']);

  const router = useRouter();
  const route = useRoute();


  const initPermissions = ref([])
  const PhoneFieldError = ref(false)
  
  const props = defineProps({
    modalEdit: Boolean,
    workPositions: Array,
    dataUser : Object
  });

  const getWorkPositions = () => {
    emits('workPositionGet');
    emits('handleDeleteWP');
  };

  const isDeleteWorkPositions = ref(false);
  const IdDeleteWP = ref({});

  const deleteWorkPosition = (option) => {
    //emits('deleteWP',option);
    isDeleteWorkPositions.value = true;
    IdDeleteWP.value = option;
  }

  const closeDeleteWorkPositions = () => {
    isDeleteWorkPositions.value = false;
  }



  watch(() => props.modalEdit, (newVal) => {
  if (newVal) {
    initializeForm();
    initialForm.value = JSON.stringify(form);
    initPermissions.value = JSON.stringify(jsonHotel.value);

  }
});

const ref_section_edit = ref(null);  // Declarar la referencia

// Método para cerrar el modal si se hace clic fuera de él
const handleClickOutside = (event) => {
  const addSection = ref_section_edit.value;
  if (addSection && !addSection.contains(event.target)) {
    //console.log('handleClickOutside',event.target)
    closeModal();
  }
};

watch(() => props.modalEdit, (newVal) => {
  if (newVal) {
    nextTick(() => {
      /* console.log('modalEditInit',props.modalEdit) */
        registerClickOutside();
    });
  } else {
    //console.log('modalEditClose',props.modalEdit)
    unregisterClickOutside();
  }
});

const registerClickOutside = () => {
  document.addEventListener('click', handleClickOutside);
};

// Remover el evento de clic en el documento
const unregisterClickOutside = () => {
  document.removeEventListener('click', handleClickOutside);
};

const handleCloseModal = () => {
    showModalNoSave.value = false;
}

const selectedText = ref(''); // variable que guardara texto seleccionado
window.addEventListener('mouseup', () => { // evento que se dispara al soltar el click
    if (window.getSelection().toString().length > 0) { // si hay texto seleccionado
      selectedText.value = window.getSelection().toString(); // guardamos el texto seleccionado
    } else {
      selectedText.value = ''; // si no hay texto seleccionado limpiamos la variable
    }
});


const form = ref({
  user_id: null,
  work_position_id: null,
  role: null,
  name: '',
  lastname: '',
  prefix: null,
  phone: '',
  email: '',
 /*  password: '',
  password_confirmation: '', */
  hotels: [],
  access: [],
  permissions: {},
  periodicityChat: 5, 
  periodicityStay: 5,
  notifications: {
    newChat: false,
    PendingChat10: false,
    pendingChat30: false,
    newFeedback: false,
    pendingFeedback10: false,
  },
});


  const userStore = useUserStore();
  const toast = useToastAlert();

  const errorPasswordMatch = ref(false);
  const errorPassword = ref(false);
  const errorEmail = ref(false);
  const isRoleAdmin = ref(false);


  
  const handleChecked = ref(false)
  const jsonHotel = ref([]) // este es el que valida si el hotel esta seleccionado
  

  const initializeForm = () => {
    if (props.dataUser) {
        form.value.user_id = props.dataUser.id || null;
        form.value.work_position_id = props.dataUser.work_position_id || null;
        form.value.role = props.dataUser.role?.id || null;
        form.value.name = props.dataUser.name || '';
        form.value.lastname = props.dataUser.lastname || '';
        // form.value.prefix = props.dataUser.prefix || null;
        form.value.phone = props.dataUser.phone ?? '';
        // console.log('test data prefix',props.dataUser.prefix)
        form.value.email = props.dataUser.email || '';
        form.value.hotels = props.dataUser.hotels || [];
        form.value.access = props.dataUser.hotelPermissions[0][props.dataUser?.hotels[0]] || [];
        form.value.permissions = props.dataUser.permissions || [];
        form.value.notifications = props.dataUser.notifications || [];
        form.value.periodicityChat = props.dataUser.periodicity_chat || 5;
        form.value.periodicityStay = props.dataUser.periodicity_stay || 5;

        /* const firstHotel = computed(() => {
            if (props.dataUser?.hotels && props.dataUser.hotels.length > 0) {
              const hotel = props.dataUser.hotels[0]
              const hotelId = Object.keys(hotel)[0]
              return { id: hotelId, data: hotel[hotelId] }
            }
            return null
          }) */

        selectedRoleName.value = 'Usuario '+props.dataUser.role?.name
        selectedWorkPositionName.value = props.dataUser.work_position
       
        props.dataUser.hotels.forEach(hotel => {
            handleSelection(hotel);
            
        });

        // Función para actualizar accesos
        const updateAccess = () => {
            const permissions = form.value.permissions;

            console.log('permissiosssns',permissions)

            /* console.log('permissions',permissions,firstHotel.value) */

            // Validar y actualizar operationAccess
            operationAccess.value.forEach(item => {
                if (permissions[item.value] && permissions[item.value].status) {
                    item.selected = true;
                    handleCheckPermission(item.value, item.selected);
                }
            });

            // Validar y actualizar adminAccess (ejemplo adicional, modificar según tus datos)
            adminAccess.value.forEach(item => {
                if (permissions[item.value] && permissions[item.value].status) {
                    item.selected = true;
                    handleCheckPermission(item.value, item.selected);
                }
            });

            
        };

        // Llamar a la función para actualizar el acceso
        updateAccess();
        jsonHotel.value = props.dataUser.hotelPermissions;

        
    }else{
        console.log('no dataUser');
    }

};
  
  const selectedRoleName = ref('Selecciona el tipo de usuario deseado');
  const selectedWorkPositionName = ref('Elige el puesto de trabajo');
  const isModalOpen = ref(false);
  const isModalCrudOpen = ref(false);
  const rolAlert = ref(0);

    const operationAccess = ref([
        { name: 'Estancias', selected: false , value : 'estancias' },
        { name: 'Reseñas', selected: false, value: 'resenas' },
        /* { name: 'Análisis', selected: false , value: 'analisis' }, */
    ]);

    const adminAccess = ref([
        { name: 'WebApp', selected: false , value: 'webapp' },
        { name: 'Comunicaciones', selected: false , value: 'comunicaciones' },
        { name: 'Plataformas externas', selected: false , value: 'plataformas_externas' },
        { name: 'Datos', selected: false , value: 'datos' },
        { name: 'Equipo', selected: false , value: 'equipo' },
    ]);
  
  const toggleModalSelect = () => {
    isModalOpen.value = !isModalOpen.value;
  };
  
  const toggleModalWorkPosition = () => {
    isModalCrudOpen.value = !isModalCrudOpen.value;
  };

  const closeModalWorkPosition = () => {
    isModalCrudOpen.value = false;
  }

  /* const selectRole = (rol) => {
    selectedRoleName.value = rol.name;
    form.value.role = rol.id;
    rolAlert.value = rol.id;
    if (rol.id === 1) {
        isRoleAdmin.value = true;
        
        //handleChecked.value = true;
    } else {
      //console.log('rol',rol.id);
        isRoleAdmin.value = false;
        handleChecked.value = false;
        selectAllHotels.value = false;
        handleSelectAll()
    }
    isModalOpen.value = false;

  }; */

  const selectRole = (rol) => {
    selectedRoleName.value = rol.name;
    form.value.role = rol.id;
    rolAlert.value = rol.id;
    if (rol.id === 1 || rol.id === 2) {
        isRoleAdmin.value = true;
        
        //handleChecked.value = true;
    } else {
      //console.log('rol',rol.id);
        isRoleAdmin.value = false;
        handleChecked.value = false;
        selectAllHotels.value = false;
        //handleSelectAll(true)
    }
    isModalOpen.value = false;

  };
  
  const selectWorkPosition = (position) => {
  selectedWorkPositionName.value = position.name;
  form.value.work_position_id = position.id;
  isModalCrudOpen.value = false;

  let permissions = JSON.parse(position.permissions);
  let notifications = JSON.parse(position.notifications);
  let periodicity_chat = position.periodicity_chat;
  let periodicity_stay = position.periodicity_stay;

  form.value.notifications = notifications;
  form.value.periodicityChat = periodicity_chat;
  form.value.periodicityStay = periodicity_stay;

  const updateCheckboxesAndPermissions = (accessList, permissions) => {
    accessList.forEach((accessItem) => {
      /* console.log('permissionKeyStatus',permissionKey,permissions[permissionKey],permissions[permissionKey].status) */
      const permissionKey = accessItem.value;
      
      const isSelected = permissions[permissionKey] && permissions[permissionKey]?.status;
      
      accessItem.selected = isSelected;
      accessItem.disabled = isSelected;

      handleCheckPermission(permissionKey, isSelected);
    });
  };

  updateCheckboxesAndPermissions(operationAccess.value, permissions);
  updateCheckboxesAndPermissions(adminAccess.value, permissions);

  form.value.permissions = permissions;
};

  

  
  const isFormIncomplete = computed(() => {
      //email
      const isValidEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(form.value.email);

      return !form.value.name || !form.value.lastname || !form.value.email || !isValidEmail || errorEmail.value || !form.value.hotels.length || !form.value.access.length;

    /* if (currentStep.value === 1) {
        return !form.value.name || !form.value.lastname || !form.value.email || !isValidEmail || errorEmail.value;
      } else if (currentStep.value === 2) {
          return !form.value.hotels.length;
      } else if (currentStep.value === 3) {
          return !form.value.access.length;
    } */

});


  const errorPhone = ref(false);

  const errorPrefix = ref(false);

  // const validatePhone = (event) => {
  //   const newValue = event.target.value.replace(/\D/g, ''); // Elimina cualquier carácter no numérico
  //   form.value.phone = newValue;
  //   errorPhone.value = newValue.length === 0;

  //   // Verifica el valor del prefijo
  //   if (newValue.length > 0 && !form.value.prefix) {
  //     errorPrefix.value = true;
  //   } else {
  //     errorPrefix.value = false;
  //   }
  // };

  // Watch para validar el prefijo cuando cambia el teléfono
  // watch(() => form.value.phone, (newVal) => {
  //   if (newVal.length > 0 && !form.value.prefix) {
  //     errorPrefix.value = true;
  //   } else {
  //     errorPrefix.value = false;
  //   }
  // });

  // Watch para verificar si se seleccionó un prefijo
  watch(() => form.value.prefix, (newVal) => {
    if (newVal) {
      errorPrefix.value = false;
    }
  });

  watch([() => form.value.password, () => form.value.password_confirmation], ([newPassword, newPasswordConfirmation]) => {
      errorPassword.value = !(newPassword.length >= 8 && newPassword.length <= 12);
      errorPasswordMatch.value = !(newPassword === newPasswordConfirmation);
  });

  const errorEmailText = ref(false);

  watch(() => form.value.email, (newVal) => {
      const emailRegex = /^(([^<>()\[\]\\.,;:\s@\"]+(\.[^<>()\[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      errorEmail.value = !emailRegex.test(newVal);
      errorEmailText.value = 'Introduce un email correcto';
  });




  const selectAllHotels = ref(false);
  
  watch(() => form.value.role, (newRole) => {
    if (newRole === 1 || newRole === 2) {
        selectAllHotels.value = true;
        handleSelectAll(true);

        //operation access
        operationAccess.value.forEach(access => {
            access.selected = true;
            handleCheckPermission(access.value, true);
        });

        //admin access
        adminAccess.value.forEach(access => {
            access.selected = true;
            handleCheckPermission(access.value, true);
        });
        
    }else{ // eso es si quita el rol de admin devuelve al estado original con initPermissions
        selectAllHotels.value = false;
        
        jsonHotel.value = JSON.parse(initPermissions.value);
        handleChecked.value = false;

        //jsonhotel values each selected acces
        jsonHotel.value.forEach(hotel => {
            const hotelId = Object.keys(hotel)[0];
            const permissions = hotel[hotelId];
            
            operationAccess.value.forEach(access => {
                if (permissions[access.value] && permissions[access.value].status) {
                    access.selected = true;
                }else{
                    access.selected = false;
                }
            });
            adminAccess.value.forEach(access => {
                if (permissions[access.value] && permissions[access.value].status) {
                    access.selected = true;
                }else{
                    access.selected = false;
                }
            });
        });
        
    }
});

const handleSelectAll = (initial = false) => {
    handleChecked.value = initial;

    if (handleChecked.value) {
        // Seleccionar todos los hoteles
        const hotels = userStore.$getHotels(['id','name']);
        form.value.hotels = hotels.map(hotel => hotel.id); // Actualizar el estado de hoteles seleccionados
        hotels.forEach(hotel => {
            handleSelection(hotel.id, true);
        });
    } else {
        // Deseleccionar todos los hoteles
        form.value.hotels = []; // Vaciar el estado de hoteles seleccionados
        jsonHotel.value = [];
        operationAccess.value.forEach(access => {
            access.selected = false;
        });
        adminAccess.value.forEach(access => {
            access.selected = false;
        });
    }
};

// Método de selección individual
const handleSelection = (hotelId, add = null) => {
    const index = jsonHotel.value.findIndex(item => item.hasOwnProperty(hotelId));

    // Si add es null, verificamos si el hotel está seleccionado
    if (add === null) {
        add = form.value.hotels.includes(hotelId);
    }

    // Agregar el hotel seleccionado
    if (add && index === -1) {
        const newHotel = { [hotelId]: {} };
        operationAccess.value.forEach(access => {
            if (access.selected) {
                newHotel[hotelId][access.value] = {
                    status: true,
                    can: {}
                };
            }
        });
        adminAccess.value.forEach(access => {
            if (access.selected) {
                newHotel[hotelId][access.value] = {
                    status: true,
                    can: {}
                };
            }
        });
        jsonHotel.value.push(newHotel);
    } 
    // Eliminar el hotel si está deseleccionado
    else if (!add && index !== -1) {
        jsonHotel.value.splice(index, 1);
    }

    // Lógica para desmarcar "Todos los alojamientos" si no están seleccionados todos
    const totalHotels = userStore.$getHotels(['id', 'name']).length;
    if (form.value.hotels.length < totalHotels) {
        selectAllHotels.value = false;  // Desmarcar el checkbox de "Todos los alojamientos"
    } else if (form.value.hotels.length === totalHotels) {
        selectAllHotels.value = true;  // Marcar "Todos los alojamientos" si están seleccionados todos
    }
};




const handleCheckPermissionOLD = (permissionName, isSelected) => {
    //console.log(`Permiso seleccionado: ${permissionName}`);

    form.value.hotels.forEach(hotelId => {
        const index = jsonHotel.value.findIndex(hotel => hotel.hasOwnProperty(hotelId));
        
        //console.log('indexXvX',jsonHotel.value)
        if (index !== -1) { // Si existe el hotel
            if (!isSelected) {
                // eliminar de jsonhotel
                delete jsonHotel.value[index][hotelId][permissionName];
            } else {
                // actualizar el objeto
                if (!jsonHotel.value[index][hotelId]) {
                    jsonHotel.value[index][hotelId] = {};
                }
                jsonHotel.value[index][hotelId][permissionName] = {
                    status: true,
                    can: {}
                };
            }
        } else { // Si no existe el hotel
            const newHotel = { [hotelId]: {} };
            newHotel[hotelId][permissionName] = {
                status: true,
                can: {}
            };
            jsonHotel.value.push(newHotel);
        }
    });

    form.value.access = jsonHotel.value;
    //console.log('jsonHotelhandleCheckPermission', jsonHotel.value);
};

const handleCheckPermission = (permissionName, isSelected ) => {
    form.value.hotels.forEach(hotelId => {
        const index = jsonHotel.value.findIndex(hotel => hotel.hasOwnProperty(hotelId));
        
        if (index !== -1) { // Si existe el hotel
            if (!isSelected) {
                // Eliminar de jsonHotel
                delete jsonHotel.value[index][hotelId][permissionName];
                if (Object.keys(jsonHotel.value[index][hotelId]).length === 0) {
                    jsonHotel.value.splice(index, 1);
                }
            } else {
                // Actualizar el objeto
                if (!jsonHotel.value[index][hotelId]) {
                    jsonHotel.value[index][hotelId] = {};
                }
                jsonHotel.value[index][hotelId][permissionName] = {
                    can: {},
                    status: true
                };
            }
        } else { // Si no existe el hotel
            const newHotel = { [hotelId]: {} };
            newHotel[hotelId][permissionName] = {
                can: {}
            };
            jsonHotel.value.push(newHotel);
        }
    });

    if (isSelected) {
        // Crear el JSON en form.value.permissions
        form.value.permissions[permissionName] = {
            can: {},
            status: true
        };
    } else {
        // Eliminar del JSON en form.value.permissions
        delete form.value.permissions[permissionName];
    }

    form.value.access = jsonHotel.value;
};

const handleUpdateAllPermissions = (add) => {
    const permissions = [...operationAccess.value, ...adminAccess.value].map(access => access.value);

    permissions.forEach(permissionName => {
        form.value.hotels.forEach(hotelId => {
            const index = jsonHotel.value.findIndex(hotel => hotel.hasOwnProperty(hotelId));

            if (index !== -1) { // Si existe el hotel
                if (!add) {
                    // eliminar de jsonhotel
                    delete jsonHotel.value[index][hotelId][permissionName];
                } else {
                    // actualizar el objeto
                    if (!jsonHotel.value[index][hotelId]) {
                        jsonHotel.value[index][hotelId] = {};
                    }
                    jsonHotel.value[index][hotelId][permissionName] = {
                        status: true,
                        can: {}
                    };
                }
            } else { // Si no existe el hotel
                const newHotel = { [hotelId]: {} };
                newHotel[hotelId][permissionName] = {
                    status: true,
                    can: {}
                };
                jsonHotel.value.push(newHotel);
            }
        });
    });

    form.value.access = jsonHotel.value;
};

if (form.value.role === 1 || form.value.role === 2) {
    // Seleccionar todos los hoteles y permisos inicialmente
    handleSelectAll(true);
    operationAccess.value.forEach(access => {
        access.selected = true;
    });
    adminAccess.value.forEach(access => {
        access.selected = true;
    });
    handleUpdateAllPermissions(true);
}
  
  const currentStep = ref(1);
  const steps = [
    { number: 1, label: 'Usuario' },
    { number: 2, label: 'Hoteles' },
    { number: 3, label: 'Accesos' },
    { number: 4, label: 'Notificaciones'}
  ];

  const stepRefs = ref([]);

const addToStepRefs = (el) => {
  if (el) {
    stepRefs.value.push(el);
  }
};

const scrollToStep = (index) => {
  const stepElement = stepRefs.value[index];

  const options = { behavior: 'smooth', inline: 'start' };

  if (index === steps.length - 1) {
    // Si es la última pestaña
    options.inline = 'end';
  }

  stepElement.scrollIntoView(options);
  currentStep.value = steps[index].number;
};
  
  const nextStep = () => {
    if (currentStep.value < steps.length) currentStep.value++;

  };
  
  const prevStep = () => {
    if (currentStep.value > 1) currentStep.value--;
  };

  const handleUpdateUser = async () => {
   form.value.access = jsonHotel.value;
  let store = await userStore.$updateUser(form.value);

  if (store.ok) {
    clearForm()
    toast.warningToast('Usuario editado correctamente','top-right')
    emits('update');


  } else {
    toast.errorToast(store.data.methodException,'top-right')
    currentStep.value = 1;
  }
 
};

const clearForm = () => {
    closeModal(true);
    currentStep.value = 1;
    errorEmailText.value = '';
    errorPassword.value = false;
    errorPasswordMatch.value = false;

    form.value = {
      work_position_id: null,
      role: null,
      name: '',
      lastname: '',
      prefix: null,
      phone: '',
      email: '',
      password: '',
      password_confirmation: '',
      hotels: [],
      access: []
    };
    selectedRoleName.value = 'Selecciona el tipo de usuario deseado';
    selectedWorkPositionName.value = 'Elige el puesto de trabajo';
    isRoleAdmin.value = false;
    errorPhone.value = false;
    errorPrefix.value = false;
    errorEmail.value = false;
    selectAllHotels.value = false;
    //handleSelectAll();
    jsonHotel.value = [];
    operationAccess.value.forEach(access => {
      access.selected = false;
    });
    adminAccess.value.forEach(access => {
      access.selected = false;
    });
};
  
const containerTop = ref(0);

const initialForm = ref(null);
const showModalNoSave = ref(false);
const intendedRoute = ref(null);

const changes = computed(() => {
  return JSON.stringify(form) !== initialForm.value;
});

/* router.beforeEach((to, from, next) => {
  

  if(to.fullPath !== from.fullPath){
    showModalNoSave.value = false
    intendedRoute.value = to.fullPath;
  }

  
}); */
router.beforeEach((to, from, next) => {
  if(to.fullPath !== from.fullPath && props.modalEdit) {
    showModalNoSave.value = false
    intendedRoute.value = to.fullPath;
  }else{
    next()
  }

});

const closeModalEditUser = () => {
    showModalNoSave.value = false;
    window.location.reload();
    //redirect

    /* if (intendedRoute.value && intendedRoute.value !== route.fullPath) {
      console.log('Intended Route:', intendedRoute.value);  // Para depuración
      router.push({name: 'UserNotificationsSettings', params: { }})
        .then(() => {
          console.log('Redirigido con éxito a:', intendedRoute.value);
        })
        .catch(err => {
          console.error('Error al redireccionar:', err);
        });
    } else {
      window.location.reload();
    } */
  };


/* onMounted(async() => {
    initializeForm();
    await nextTick();
    initialForm.value = JSON.stringify(form);

    console.log('dataUser',form.value)
  }); */

  onMounted(() => {
    initialForm.value = JSON.stringify(form);
  });
  

function closeModal(complete = false) {
    if(!complete){
      //alert('complete')
        if (changes.value == true) {
            if (!selectedText.value) { //validar que no haya texto seleccionado, para que salga el alert de cambios sin guardar
              showModalNoSave.value = true;
            }else{
              showModalNoSave.value = false;
            }
        } else if(!mouseDownInside.value) { // Si no hay cambios y el click fue fuera, cerrar el modal
          currentStep.value = 1;
          emits('close');
        }
    }else{
        emits('close');
        currentStep.value = 1;
    }


    /* emits('close');
    currentStep.value = 1; */

}

  
  onMounted(async () => {
    await nextTick();
    const sectionExpElement = document.getElementById('layout-hoster');
    if (sectionExpElement) {
      containerTop.value = sectionExpElement.offsetTop;
    }
    registerClickOutside();
    errorPassword.value = false;
    errorPasswordMatch.value = false;
    errorEmail.value = false;
    
  });

  onBeforeUnmount(() => {
    unregisterClickOutside();  // Remover el listener de clic fuera
  });


  </script>
  
  <style lang="scss">
  .add {
    width: 500px;
    position: fixed;
  }
  
  .v-enter-active,
  .v-leave-active {
    transition: transform 0.5s ease;
  }
  
  .v-enter-from,
  .v-leave-to {
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
  
  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity 0.4s ease;
  }
  
  .modal-fade-enter-from,
  .modal-fade-leave-to {
    opacity: 0;
  }
  
  .modal-fade-enter-to,
  .modal-fade-leave-from {
    opacity: 1;
  }

.rounded-bottom-border {
  position: relative;
}

.rounded-bottom-border::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 105px;
  height: 3px;
  background-color: #0B6357;
  border-radius: 10px 10px 0 0;
}
/* 
.active-step {
  margin-left: -0.5rem; 
  padding-right: 0.5rem; 
} */

/* Ocultar scrollbar en Chrome, Safari y Opera */
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Ocultar scrollbar en IE, Edge y Firefox */
.hide-scrollbar {
  -ms-overflow-style: none; /* IE y Edge */
  scrollbar-width: none; /* Firefox */
}


</style>
  