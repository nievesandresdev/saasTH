<template>
    <transition>
      <div
        v-if="modalAdd"
        class="absolute bg-white shadow-xl add flex flex-col"
        :class="userStore.showSuscriptionBanner ? 'top-with-banner h-with-banner' : 'h-without-banner top-0'"
        :style="`right: 0; z-index: 2000`"
        ref="ref_section_add"
        @mousedown="handleMouseDown"
        @mouseleave="handleMouseLeave"
      >
            <div class="overflow-y-auto scrolling-sticky" style="height: calc(100% - 72px)">
              <div class="flex justify-between items-center px-6 py-[20px] h-[64px]">
                
                <div class="flex-1 text-left">
                  <h1 class="font-medium text-[22px]">Crear usuario</h1>
                </div>
                <div class="flex justify-end">
                  <button class="" @click="closeModal">
                    <img src="/assets/icons/1.TH.CLOSE.svg" alt="icon_close" class="w-8 h-8 hover:bg-[#F3F3F3] rounded-[100px] p-1">
                  </button>
                </div>
              </div>
      
              <div class="p-4">
                <div class="flex items-center justify-between mb-5">
                  <div v-for="(step, index) in steps" :key="step.number" class="relative flex flex-col items-center w-[25%]">
                    <div :class="[
                      'w-10 h-10 rounded-full flex items-center justify-center text-lg font-semibold z-10',
                      currentStep >= step.number ? 'bg-[#34A98F] text-white' : 'bg-white text-black border border-black'
                    ]">
                      {{ step.number }}
                    </div>
                    <div :class="[
                      'text-sm mt-2 text-center break-words font-semibold',
                      currentStep >= step.number ? 'text-[#333333]' : 'text-[#333333]'
                    ]" 
                        class="min-h-[3rem] flex items-center justify-center">
                      {{ step.label }}
                    </div>
                    <!-- Línea de conexión entre pasos -->
                    <div v-if="index !== steps.length - 1" 
                        :class="[
                          'absolute h-0 border top-5',
                          currentStep >= (step.number + 1) ? 'border-[#34A98F]' : 'border-gray-300'
                        ]" 
                        :style="{ width: '150px', left: '80px' }">
                    </div>
                  </div>
                </div>
                <hr class="mb-[22px]">
                <div v-if="currentStep === 1">
                  <!-- <div class="relative mt-4">
                    <div class="flex justify-between text-black">
                      <span class="text-sm font-medium mb-1">Puesto de Trabajo</span>
                      <BaseTooltipResponsive
                            size="s"
                            :top="25"
                            :right="0"
                        >
                            <template v-slot:button>
                                <img
                                    src="/assets/icons/info.blue.svg"
                                    class="w-5 h-5 ml-1"
                                    alt="icon_info"
                                >
                            </template>
                            <template v-slot:content>
                                <p class="text-sm font-normal">Los puestos tienen una configuración prestablecida de accesos y notificaciones.</p>
                            </template>
                        </BaseTooltipResponsive>
                    </div>
                    <div class="relative w-full">
                      <input
                          type="text"
                          id="workPositionInput"
                          @click.stop="toggleModalWorkPosition"
                          readonly
                          class="bg-white w-full rounded-md  border  text-black font-medium text-sm px-4 py-2.5 cursor-pointer placeholder:font-normal hinput-green"
                          :class="{
                            'placeholder:text-black border-black': selectedWorkPositionName != 'Elige el puesto de trabajo',
                            'placeholder:text-[#A0A0A0]  border-gray-300': selectedWorkPositionName == 'Elige el puesto de trabajo'
                          }"
                          :placeholder="selectedWorkPositionName ?? 'Selecciona un puesto de trabajo'"
                        />
                      <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <img src="/assets/icons/1.TH.I.dropdownBig.svg">
                      </div>
                    </div>
                    <transition name="modal-fade">
                      <div id="modalWorkPosition">
                        <ModalCrud
                          ref="ref_modal_crud"
                          :data="workPositions"
                          :open="isModalCrudOpen"
                          @close="closeModalWorkPosition"
                          @select="selectWorkPosition"
                          @deleteWP="deleteWorkPosition"
                        />
                      </div>
                    </transition>
                  </div> -->

                  <span class="text-[18px] font-medium">Datos del usuario</span>
                  <div class="mt-[10px]">
                        <label class="text-sm font-medium">Nombre *</label>
                        <div class="relative">
                            <input
                                v-model="form.name"
                                type="text"
                                class="w-full h-10 p-3 text-sm border rounded-6 hoverForm rounded-md hinput-green mt-1"
                                placeholder="Nombre"
                                :class="
                                {
                                  'hborder-black-100 htext-black-100 font-medium': form.name,
                                  'hborder-gray-400 htext-gray-500': !form.name
                                }"
                            />
                        </div>
                  </div>
                  <div class="mt-4">
                      <label class="text-sm font-medium">Apellidos *</label>
                      <div class="relative">
                          <input
                              v-model="form.lastname"
                              type="text"
                              class="w-full h-10 p-3 text-sm border rounded-6 hoverForm rounded-md hinput-green mt-1"
                              :class="
                                {
                                  'hborder-black-100 htext-black-100 font-medium': form.lastname,
                                  'hborder-gray-400 htext-gray-500': !form.lastname
                                }"
                              placeholder="Apellidos"
                          />
                      </div>
                  </div>
                  <div class="mt-4 flex flex-col gap-[7px]">
                    <label class="text-sm font-medium">Teléfono móvil </label>
                    <BasePhoneField
                          v-model="form.phone"
                          name="phone"
                          @handlePhoneError="errorPhone = $event"
                      />
                      <div class="flex justify-start w-full mt-1 htext-alert-negative" v-if="errorPhone">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="mr-2 w-4 h-4 bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
                            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                          </svg>
                          <p class="text-xs htext-alert-negative">Introduce solo números en el campo de teléfono</p>
                      </div>
                  </div>
                  <div class="mt-4 flex flex-col gap-[7px]">
                      <label class="text-sm font-medium">Correo electrónico *</label>
                      <div class="relative">
                          <BaseEmailFieldLive
                              placeholder="Correo con el que iniciará sesión"
                              v-model="form.email"
                              :enableLiveCheck="true"
                              @errorMessage="errorEmailText = $event"
                              @handleError="errorEmail = $event"    
                          />
                          <div class="flex mt-2 htext-alert-negative justify-left" v-if="errorEmail">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="mr-2 bi bi-exclamation-triangle-fill w-4 h-4" viewBox="0 0 16 16">
                                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                              </svg>
                              <p class="text-xs htext-alert-negative" v-text="errorEmailText"></p>
                          </div>
                      </div>
                  </div>
                  <div class="mt-4">
                      <label class="text-sm font-medium">Contraseña *</label>
                      <div class="relative">
                          <input
                              v-model="form.password"
                              type="password"
                              class="w-full h-10 p-3 mt-1 text-sm font-medium  border rounded-6 hoverForm rounded-md "
                              :class="{
                                'hborder-black-100 htext-black-100 font-medium': form.password && !errorPassword,
                                'hborder-gray-400 htext-gray-500 ': !form.password || errorPassword,
                                'hborder-negative placeholder:text-[#FF6666]' : errorPassword,
                                'hinput-green' : !errorPassword
                              }"
                              placeholder="Clave de acceso al sistema"
                              autocomplete="nope"
                          />
                          <div class="flex mt-2 htext-alert-negative justify-left" v-if="errorPassword">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="mr-2 bi bi-exclamation-triangle-fill w-4 h-4" viewBox="0 0 16 16">
                                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                              </svg>
                              <p class="text-xs htext-alert-negative">Debe tener minimo 8 caracteres</p>
                          </div>
                      </div>
                  </div>
                  <div class="mt-4">
                      <label class="text-sm font-medium">Confirmar contraseña *</label>
                      <div class="relative">
                          <input
                              v-model="form.password_confirmation"
                              type="password"
                              class="w-full h-10 mt-1 p-3 text-sm font-medium  border rounded-6 hoverForm rounded-md"
                              :class="{
                                'hborder-black-100 htext-black-100 font-medium': form.password_confirmation && !errorPasswordMatch,
                                'hborder-gray-400 htext-gray-500': !form.password_confirmation || errorPasswordMatch,
                                'hborder-negative placeholder:text-[#FF6666]' : errorPasswordMatch,
                                'hinput-green' : !errorPasswordMatch
                              }"
                              placeholder="Repite la clave"
                              autocomplete="nope"
                          />
                          <div class="flex mt-2 htext-alert-negative justify-left" v-if="errorPasswordMatch">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="mr-2 bi bi-exclamation-triangle-fill w-4 h-4" viewBox="0 0 16 16">
                              <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                              </svg>
                              <p class="text-xs htext-alert-negative">Debe tener minimo 8 caracteres</p>
                          </div>
                      </div>
                  </div>
                </div> <!-- fin step 1-->
                <div v-if="currentStep === 2">
                    <div class="flex justify-between items-center mb-4 text-left">
                        <strong class="text-[18px] font-medium">Alojamientos</strong>
                        <div class="flex items-center gap-1">
                          <span class="text-sm font-semibold">Todos</span>
                          <BaseSwichInput
                              v-model="selectAllHotels"
                              id="swich-visible-experience"
                              @change:value="handleSelectAll(selectAllHotels)"
                          />
                        </div>
                    </div>
                    <div>
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
                          :disabled="handleChecked"
                        />
                      </div>
                  </div>
                </div>

                <div v-if="currentStep === 3">
                    <div class="relative mt-4">
                    <div class="flex justify-between text-black">
                      <span class="text-sm font-medium mb-1">Puesto de Trabajo</span>
                    </div>
                    <div class="relative w-full">
                      <input
                          type="text"
                          id="workPositionInput"
                          @click.stop="toggleModalWorkPosition"
                          readonly
                          class="bg-white w-full rounded-md  border  text-black font-medium text-sm px-4 py-2.5 cursor-pointer placeholder:font-normal hinput-green"
                          :class="{
                            'placeholder:text-black border-black': selectedWorkPositionName != 'Elige el puesto de trabajo',
                            'placeholder:text-[#A0A0A0]  border-gray-300': selectedWorkPositionName == 'Elige el puesto de trabajo'
                          }"
                          :placeholder="selectedWorkPositionName ?? 'Selecciona un puesto de trabajo'"
                        />
                      <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <img src="/assets/icons/1.TH.I.dropdownBig.svg">
                      </div>
                    </div>
                    <transition name="modal-fade">
                      <div id="modalWorkPosition">
                        <ModalCrud
                          ref="ref_modal_crud"
                          :data="workPositions"
                          :open="isModalCrudOpen"
                          @close="closeModalWorkPosition"
                          @select="selectWorkPosition"
                          @deleteWP="deleteWorkPosition"
                        />
                      </div>
                    </transition>
                  </div>
                </div>
                
              </div>
            </div>
    
            <div class="py-6 px-6 w-full flex  border-t border-gray z-[1000] bg-white" style="height: 88px;" :class="{'justify-between' : currentStep > 1 , 'justify-end' : currentStep <= 1}">
              <button  
                class="hbtn-tertiary text-sm font-medium underline my-auto px-4"
                @click.prevent="prevStep()"
                v-if="currentStep > 1"
              >
                  Atras
              </button>
              <button
                class="px-4 py-2 font-medium rounded text-black"
                @click="currentStep === 4 ? handleStoreUser() : nextStep()"
                :disabled="isFormIncomplete"
                :class="isFormIncomplete ? 'bg-gray-300 text-gray-400' : 'hbtn-cta text-black '"
              >
                {{ currentStep === 4 ? 'Crear Usuario' : 'Siguiente' }}
              </button>
            </div>
            <ModalNoSave
              :id="'not-saved'"
              :open="showModalNoSave"
              text="Tienes cambios sin guardar. ¿Estás seguro de que quieres salir sin guardar?"
              textbtn="Guardar"
              @close="closeModalSaveCreate"
              @saveChanges="handleStoreUser"
              :type="'alone_exit'"
              :url="intendedRoute"
              @hidden="handleCloseModal"
            />

            <ModalDeleteWork :isDeleteWorkPositions="isDeleteWorkPositions" @close="closeDeleteWorkPositions" :id="IdDeleteWP" @delete="getWorkPositions"  />
      </div>
    </transition>

    
  </template>
  
  <script setup>
  import { ref, onMounted,onUnmounted, nextTick, defineEmits,computed,watch,onBeforeUnmount } from 'vue';
  import ModalSelect from './ModalSelect.vue';
  import ModalCrud from './ModalCrud.vue';
  import { useUserStore } from '@/stores/modules/users/users'
  import { useToastAlert } from '@/composables/useToastAlert'
  import { useMouseHandle } from '@/composables/useMouseHandle';
  import BaseTooltipResponsive from '@/components/BaseTooltipResponsive.vue';
  import Notifications from './Notifications.vue';
  import ModalWindow from '@/components/ModalWindow.vue';
  import ModalDeleteWork from './ModalDeleteWork.vue';
  import BasePhoneField from "@/components/Forms/BasePhoneField.vue";
  import BaseEmailFieldLive from '@/components/Forms/BaseEmailFieldLive.vue';
  import BaseSwichInput from "@/components/Forms/BaseSwichInput.vue";


  import ModalNoSave from '@/components/ModalNoSave.vue';
  import { useRoute, useRouter } from 'vue-router';

  const router = useRouter();
  const intendedRoute = ref(null);
  const userStore = useUserStore();
  const selectAll = ref(false);
  const PhoneFieldError = ref(false);
  //const authStore = useAuthStore();
  const toast = useToastAlert();
  const { mouseDownInside, handleMouseDown, handleMouseLeave } = useMouseHandle();

  const emits = defineEmits(['close','store','alert','workPositionGet','deleteWP','handleDeleteWP']);
  
  const props = defineProps({
    modalAdd: Boolean,
    workPositions: Array
  });

router.beforeEach((to, from, next) => {
  if(to.fullPath !== from.fullPath && props.modalAdd) {
    showModalNoSave.value = false
    intendedRoute.value = to.fullPath;
  }else{
    next()
  }

});

const isDeleteWorkPositions = ref(false);
const IdDeleteWP = ref({});

const deleteWorkPosition = (option) => {
  //emits('deleteWP',option);
  isDeleteWorkPositions.value = true;
  IdDeleteWP.value = option;
}

const getWorkPositions = (option) => {
  emits('handleDeleteWP',option);
}

const closeDeleteWorkPositions = () => {
  isDeleteWorkPositions.value = false;
}

  
  

const handleCloseModal = () => {
  showModalNoSave.value = false;
  emits('close');
}

const closeModalSaveCreate = () => {
  showModalNoSave.value = false;
  window.location.reload();
}

// Añadir los event listeners cuando el componente se monte
onMounted(() => {
  window.addEventListener('mousedown', handleMouseDown);
  //window.addEventListener('mouseup', handleMouseUp);
});

// Eliminar los event listeners cuando el componente se desmonte
onUnmounted(() => {
  window.removeEventListener('mousedown', handleMouseDown);
  //window.removeEventListener('mouseup', handleMouseUp);
});
  

const selectedText = ref(''); // variable que guardara texto seleccionado
window.addEventListener('mouseup', () => { // evento que se dispara al soltar el click
    if (window.getSelection().toString().length > 0) { // si hay texto seleccionado
      selectedText.value = window.getSelection().toString(); // guardamos el texto seleccionado
    } else {
      selectedText.value = ''; // si no hay texto seleccionado limpiamos la variable
    }
});


  const errorPasswordMatch = ref(false);
  const errorPassword = ref(false);
  const errorEmail = ref(false);
  const isRoleAdmin = ref(false);

  const form = ref({
    /* work_position_id: null, */
    role : null,
    name: '',
    lastname: '',
    prefix: '+34',
    phone: '',
    email: '',
    password: '',
    password_confirmation: '',
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
      pendingFeedback10 : false,
    },
  });

  const selectedRoleName = ref('Selecciona el tipo de usuario deseado');
  const selectedWorkPositionName = ref('Elige el puesto de trabajo');
  const isModalCrudOpen = ref(false);
  const rolAlert = ref(0);

const operationAccess = ref([
    { name: 'Estancias', selected: false , value : 'estancias' },
    { name: 'Reseñas', selected: false, value: 'resenas' },
]);

const adminAccess = ref([
    { name: 'WebApp', selected: false , value: 'webapp' },
    { name: 'Hoster', selected: false , value: 'hoster' },
]);
  
  
  const toggleModalWorkPosition = () => {
    isModalCrudOpen.value = !isModalCrudOpen.value;
  };

  const closeModalWorkPosition = () => {
    isModalCrudOpen.value = false;
  }

  
  const selectWorkPosition = (position) => {
    selectedWorkPositionName.value = position.name;
    form.value.work_position_id = position.id;
    isModalCrudOpen.value = false;

    // Parseamos el JSON de permisos
    let permissions = JSON.parse(position.permissions);
    let notifications = JSON.parse(position.notifications);
    let periodicity_chat = position.periodicity_chat;
    let periodicity_stay = position.periodicity_stay;

    form.value.notifications = notifications;
    form.value.periodicityChat = periodicity_chat;
    form.value.periodicityStay = periodicity_stay;

    // Función para actualizar los checkboxes y el objeto permissions
    const updateCheckboxesAndPermissions = (accessList, permissions) => {
        accessList.forEach((accessItem) => {
            const permissionKey = accessItem.value;
            const isSelected = permissions[permissionKey] && permissions[permissionKey].status;
            
            // Marca o desmarca el checkbox y lo deshabilita si está seleccionado
            accessItem.selected = isSelected;
            accessItem.disabled = isSelected;

            // Llama a handleCheckPermission para actualizar form.value.access
            handleCheckPermission(permissionKey, isSelected);
        });
    };

    // Actualizamos los checkboxes de operación y administración
    updateCheckboxesAndPermissions(operationAccess.value, permissions);
    updateCheckboxesAndPermissions(adminAccess.value, permissions);

    // Actualiza form.value.permissions con el nuevo objeto permissions
    form.value.permissions = permissions;
};



const isFormIncomplete = computed(() => {
    // Email
    const isValidEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(form.value.email);

    // Contraseña
    const isValidPassword = form.value.password && form.value.password.length >= 8 && form.value.password === form.value.password_confirmation;

    if (currentStep.value === 1) {
      return !form.value.name || !form.value.lastname || !form.value.email || !form.value.password ||
        !form.value.password_confirmation || !isValidPassword || !isValidEmail || errorEmail.value;
    } else if (currentStep.value === 2) {
      return !form.value.hotels.length;
    } else if (currentStep.value === 3) {
      return !form.value.access.length;
    }
});


  const errorPhone = ref(false);

  const errorPrefix = ref(false);


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

  const handleChecked = ref(false)
  const jsonHotel = ref([]) // este es el que valida si el hotel esta seleccionado

  const selectAllHotels = ref(false);
  
  /* watch(() => form.value.role, (newRole) => { 
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
        
    }else if(newRole === 3){
        selectAllHotels.value = false;
        jsonHotel.value = [];
        handleChecked.value = false;
        handleSelectAll();
    }
      
}, { immediate: true }); */


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

const handleCheckPermission = (permissionName, isSelected) => {
    form.value.hotels.forEach(hotelId => {
        const index = jsonHotel.value.findIndex(hotel => hotel.hasOwnProperty(hotelId));
        
        if (index !== -1) { 
            if (!isSelected) {
                // Eliminar de jsonHotel
                delete jsonHotel.value[index][hotelId][permissionName];
                if (Object.keys(jsonHotel.value[index][hotelId]).length === 0) {
                    jsonHotel.value.splice(index, 1);
                }
            } else {
                if (!jsonHotel.value[index][hotelId]) {
                    jsonHotel.value[index][hotelId] = {};
                }
                jsonHotel.value[index][hotelId][permissionName] = {
                    can: {},
                    status: true
                };
            }
        } else { 
            const newHotel = { [hotelId]: {} };
            newHotel[hotelId][permissionName] = {
                can: {}
            };
            jsonHotel.value.push(newHotel);
        }
    });

    if (isSelected) {
        form.value.permissions[permissionName] = {
            can: {},
            status: true
        };
    } else {
        delete form.value.permissions[permissionName];
    }

    form.value.access = jsonHotel.value;
};


const toggleAllPermissions = () => {
    const isSelected = selectAll.value;

    // Actualizar todos los permisos de operación
    operationAccess.value.forEach(item => {
        item.selected = isSelected;
        item.disabled = isSelected;
        handleCheckPermission(item.value, isSelected);
    });

    // Actualizar todos los permisos de administración
    adminAccess.value.forEach(item => {
        item.selected = isSelected;
        item.disabled = isSelected;
        handleCheckPermission(item.value, isSelected);
    });
};

  
  const currentStep = ref(3);
  const steps = [
    { number: 1, label: 'Usuario' },
    /* { number: 2, label: 'Alojamientos' }, */
    { number: 2, label: 'Accesos' },
    { number: 3, label: 'Permisos y notificaciones'}
  ];
  
  const nextStep = () => {
    if (currentStep.value < steps.length) {
      currentStep.value++;
    }
  };

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }

};


const handleStoreUser = async () => {

  let store = await userStore.$storeUser(form.value);

  if (store.ok) {
    clearForm()
    toast.warningToast('Usuario creado correctamente','top-right')
    emits('store');
    emits('alert');

  } else {
    toast.errorToast(store.data.methodException,'top-right')
    currentStep.value = 1;
  }
 
};

const clearForm = () => {
  //closeModal();
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
const ref_section_add = ref(null);  // Declarar la referencia
const ref_modal_crud = ref(null);




// Método para cerrar el modal si se hace clic fuera de él
const handleClickOutside = (event) => {
  const addSection = ref_section_add.value;
  //const modalCrud = ref_modal_crud.value ? ref_modal_crud.value.$el : null;

  if (
    addSection && !addSection.contains(event.target) &&
    !event.target.closest('.hbtn-tertiary') && // Asegúrate de no cerrar cuando el clic es en el botón "Atras"
    !event.target.closest('.modalContainerRef') // Asegúrate de no cerrar cuando el clic es en el botón "Siguiente"
  ) {
    closeModal();
  }
};
watch(() => props.modalAdd, (newVal) => {
  if (newVal) {
    nextTick(() => {
      //console.log('modalAddInit',props.modalAdd)
        registerClickOutside();
    });
  } else {
    //console.log('modalAddClose',props.modalAdd)
    unregisterClickOutside();
  }
});


 watch(() => props.modalAdd, (newVal) => {
  if (newVal) {
    nextTick(() => {
      if(newVal) {
        errorEmail.value = false;
        errorPassword.value = false;
        errorPasswordMatch.value = false;
        errorPhone.value = false;
        rolAlert.value = 0;
        
      }
    });
  }
});

const initialForm = ref(null);
const showModalNoSave = ref(false);

const changes = computed(() => {
  return JSON.stringify(form) !== initialForm.value;
});

onMounted(async () => {
  await nextTick();
  initialForm.value = JSON.stringify(form);
});


function closeModal() {
  if (changes.value) {
    if (!selectedText.value) { //validar que no haya texto seleccionado, para que salga el alert de cambios sin guardar
      showModalNoSave.value = true;
    } else { //si hay texto seleccionado, se cierra el modal sin alerta
      showModalNoSave.value = false;
    }
  } else if(!mouseDownInside.value) { // Si no hay cambios y el click fue fuera, cerrar el modal
    console.log('closeModal')
    emits('close');
    isModalCrudOpen.value = false;
  }
}

// Registrar el evento de clic en el documento con retraso
const registerClickOutside = () => {
  document.addEventListener('click', handleClickOutside);
};

// Remover el evento de clic en el documento
const unregisterClickOutside = () => {
  document.removeEventListener('click', handleClickOutside);
};
  
  const containerTop = ref(0);

  onMounted(async () => {
    await nextTick();
    const sectionExpElement = document.getElementById('layout-hoster');
    if (sectionExpElement) {
      containerTop.value = sectionExpElement.offsetTop;
    }


    registerClickOutside();  // Registrar el listener de clic fuera

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
  </style>
  