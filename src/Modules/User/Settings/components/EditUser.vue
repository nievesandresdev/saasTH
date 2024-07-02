<template>
    <transition>
      <div
        v-if="modalEdit"
        class="absolute bg-white shadow-xl add flex-column"
        :style="`top: ${containerTop}px; right: 0; min-height: calc(100vh - ${containerTop}px); height: calc(100vh - ${containerTop}px); z-index: 10;`"
        ref="ref_section_add"
      >
        <div class="overflow-y-auto scrolling-sticky" style="height: calc(100% - 72px)">
          <div class="flex justify-between items-center px-6 py-4 mt-4">
            <div class="flex-1 text-center">
              <h1 class="font-[600] text-xl">Editar usuario</h1>
            </div>
            <div class="flex justify-end">
              <button class="" @click="closeModal">
                <img src="/assets/icons/1.TH.CLOSE.svg" alt="icon_close" class="w-5 h-5">
              </button>
            </div>
          </div>
  
          <div class="p-6">
            <hr class="mb-4">
            <div class="flex items-center justify-between px-4 mb-5">
              <div v-for="(step, index) in steps" :key="step.number" class="relative flex flex-col items-center">
                <div :class="['w-10 h-10 rounded-full flex items-center justify-center text-lg font-semibold z-10', currentStep >= step.number ? 'bg-[#34A98F] text-white' : 'bg-white text-black border border-black']">
                  {{ step.number }}
                </div>
                <div :class="['text-sm mt-2', currentStep >= step.number ? 'text-black' : 'text-gray-500']" class="font-semibold">
                  {{ step.label }}
                </div>
                <!-- border -->
                <div v-if="index !== steps.length - 1" :class="['absolute w-[170px] h-0 border top-5 left-3', currentStep >= (step.number + 1) ? 'border-[#34A98F]' : '']"></div>
              </div>
            </div>
            <hr class="mb-5">
            <div v-if="currentStep === 1">
              <div class="flex flex-col text-black">
                <span class="text-sm font-medium">Elige tu tipo de usuario</span>
                <span class="text-sm font-normal mt-2">Aquí podrás elegir el tipo de usuario que quieres crear.</span>
              </div>
              <div class="relative mt-2">
                <div class="relative w-full">
                  <input
                    type="text"
                    @click="toggleModalSelect"
                    :value="selectedRoleName"
                    readonly
                    class="bg-white w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-gray-400 font-medium text-sm px-4 py-2.5 cursor-pointer"
                    placeholder="Selecciona el tipo de usuario deseado..."
                  />
                  <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <img src="/assets/icons/1.TH.I.dropdownBig.svg">
                  </div>
                </div>
                <transition name="modal-fade">
                  <ModalSelect
                    :open="isModalOpen"
                    :options="seletedRoleUser"
                    @close="toggleModalSelect"
                    @select="selectRole"
                  />
                </transition>
                <div v-if="rolAlert == 1" class="flex items-center">
                  <img  src="/assets/icons/1.TH.WARNING.svg" alt="Warning" class="h-5 w-5 mr-2">
                  <span class="text-gray-600 text-sm">Este usuario tiene el rango más alto y acceso completo a todas las funciones.</span>
                </div>
                <div v-show="rolAlert == 2" class="flex items-center">
                  <img src="/assets/icons/1.TH.WARNING.svg" alt="Warning" class="h-5 w-5 mr-2">
                  <span class="text-gray-600 text-sm">Este usuario tiene permisos para crear administradores y usuarios operativos.</span>
                </div>
                <div v-show="rolAlert == 3" class="flex items-center">
                  <img src="/assets/icons/1.TH.WARNING.svg" alt="Warning" class="h-5 w-5 mr-2">
                  <span class="text-gray-600 text-sm">Este usuario tiene el nivel de acceso más bajo. No tendrá acceso a crear usuarios.</span>
                </div>

              </div>
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
                      class="bg-white w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-gray-400 font-medium text-sm px-4 py-2.5 cursor-pointer"
                      placeholder="Selecciona el tipo de usuario deseado..."
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
                            class="w-full h-10 p-3 text-sm font-medium border-gray-300 rounded-6 hoverForm"
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
                            class="w-full h-10 p-3 text-sm font-medium border-gray-300 rounded-6 hoverForm"
                            placeholder="Apellido del usuario"
                        />
                    </div>
                </div>
                <div class="mt-4">
                  <label class="text-sm font-medium">Teléfono móvil</label>
                    <div class="flex rounded">
                        <select v-model="form.prefix" :class="{'border-red-600': errorPrefix, 'focus:ring-blue-500 focus:border-blue-500': !errorPrefix}" class="bg-white w-2/5 rounded-l-lg border-r-[1px] border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-gray-700  font-medium text-sm px-4 py-2.5">
                            <option v-for="prefix in prefixes" :key="prefix" :value="prefix">{{ prefix ?? 'Prefijo' }}</option>
                        </select>
                            <input type="text"
                                placeholder="Número de teléfono"
                                class="p-2.5 block border border-gray-300 w-full text-sm text-gray-900 bg-white rounded-r-lg focus:ring-blue-500 focus:border-blue-500"
                                :class="errorPhone ? 'hover:border-red-600' : 'hoverForm'"
                                v-model="form.phone"
                                @input="validatePhone"
                            >
                    </div>
                    <div class="flex justify-end mt-1 text-red-600" v-if="errorPhone">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="mr-1 bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
                        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                        </svg>
                        <small> Introduce solo números en el campo de teléfono</small>
                    </div>
                </div>
                <div class="mt-4">
                    <label class="text-sm font-medium">Correo electrónico *</label>
                    <div class="relative">
                        <input
                            v-model="form.email"
                            type="email"
                            class="w-full h-10 p-3 text-sm font-medium border-gray-300 rounded-6 hoverForm"
                            placeholder="Correo con el que iniciara sesión"
                        />
                        <div class="flex mt-1 text-red-600 justify-left" v-if="errorEmail">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="mr-1 bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
                            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                            </svg>
                            <small v-text="errorEmailText"></small>
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
                        <span class="text-sm font-bold">Todos los hoteles</span>
                        <!-- <input type="checkbox" v-model="selectAllHotels" @change="handleSelectAll" class="form-checkbox h-5 w-5 text-[#34A98F] rounded focus:ring-[#34A98F]" :disabled="isRoleOne"> -->
                        <Checkbox v-model="selectAllHotels" :isDisabled="isRoleOne"  @change="handleSelectAll(true)" :sizeClasses="`h-5 w-5`"/>
                    </div>
                    <!-- Checkboxes para los hoteles individuales -->
                    <div v-for="hotel in userStore.$getHotels(['id','name'])" :key="hotel.id" class="flex items-center justify-between mb-4 rounded-lg">
                        <span class="text-sm font-[500]">{{ hotel.name }}</span>
                        <input type="checkbox" :value="hotel.id" v-model="form.hotels" :checked="handleChecked" @change="handleSelection(hotel.id)" class="form-checkbox disabled:opacity-50 h-5 w-5 text-[#34A98F] rounded focus:ring-[#34A98F]" :disabled="isRoleOne">
                        <!-- <Checkbox :value="hotel.id" v-model="form.hotels" :checked="handleChecked" @change="handleSelection(hotel.id)" class="form-checkbox h-5 w-5 text-[#34A98F] rounded focus:ring-[#34A98F]" :disabled="isRoleOne" :sizeClasses="`h-5 w-5`"/> -->
                    </div>
                </div>
            </div>

            <div v-if="currentStep === 3">
                <div class="flex flex-col mb-8 text-left">
                    <strong class="mb-5 text-xl">Accesos</strong>
                    <span class="font-normal">
                        Este usuario cuenta con permiso a todos los accesos del SAS en los hoteles designados.
                    </span>
                </div>
                <div class="space-y-6">
                    <!-- Sección de Operación -->
                    <div>
                        <span class="block mb-2 font-semibold text-lg">Operación</span>
                        <div class="space-y-2">
                            <div v-for="item in operationAccess" :key="item.name" class="flex items-center justify-between mb-4 rounded-lg">
                                <span class="text-sm font-[500]">{{ item.name }}</span>
                                <!-- <input type="checkbox" v-model="item.selected" class="form-checkbox h-5 w-5 text-[#34A98F] rounded focus:ring-[#34A98F]" :disabled="isRoleOne" @change="handleCheckPermission(item.value, item.selected)"> -->
                                <Checkbox v-model="item.selected" :isDisabled="isRoleOne" :sizeClasses="`h-5 w-5`" @change="handleCheckPermission(item.value, item.selected)"/>
                            </div>
                        </div>
                    </div>
                    <!-- Sección de Administración -->
                    <div>
                        <span class="block mb-2 font-semibold text-lg">Administración</span>
                        <div class="space-y-2">
                            <div v-for="item in adminAccess" :key="item.name" class="flex items-center justify-between mb-4 rounded-lg">
                                <span class="text-sm font-[500]">{{ item.name }}</span>
                                <!-- <input type="checkbox" v-model="item.selected" class="form-checkbox h-5 w-5 text-[#34A98F] rounded focus:ring-[#34A98F]" :disabled="isRoleOne" @change="handleCheckPermission(item.value, item.selected)"> -->
                                <Checkbox v-model="item.selected" :isDisabled="isRoleOne" :sizeClasses="`h-5 w-5`" @change="handleCheckPermission(item.value, item.selected)"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
  
        <div class="py-4 px-6 w-full flex justify-between border-t border-gray z-[1000] bg-white" style="height: 72px;">
          <button
            class="px-4 py-2.5 font-medium rounded w-full bg-hoster-gray text-black"
            @click="prevStep"
            v-if="currentStep > 1"
          >
            Anterior
          </button>
          <button
            class="px-4 py-2.5 font-medium rounded w-full text-black"
            @click="currentStep === 3 ? handleUpdateUser() : nextStep()"
            :disabled="isFormIncomplete"
            :class="isFormIncomplete ? 'bg-gray-300 text-gray-400' : 'hbtn-cta text-black '"
          >
            {{ currentStep === 3 ? 'Guardar Cambios' : 'Siguiente' }}
          </button>
          <!-- <button
            class="px-4 py-2.5 font-medium rounded w-full text-black hbtn-cta"
            @click="currentStep === 3 ? handleUpdateUser() : nextStep()"
          >
            {{ currentStep === 3 ? 'Crear Usuario' : 'Siguiente' }}
          </button> -->
        </div>
      </div>
    </transition>
  </template>
  
  <script setup>
  import { ref, onMounted, nextTick, defineEmits,computed,watch,defineProps } from 'vue';
  import ModalSelect from './ModalSelect.vue';
  import ModalCrud from './ModalCrud.vue';
  import { useUserStore } from '@/stores/modules/users/users'
  import Checkbox from '@/components/Forms/Checkbox.vue';
  import { useToastAlert } from '@/composables/useToastAlert'

  
  const emits = defineEmits(['close','update']);
  
  const props = defineProps({
    modalEdit: Boolean,
    workPositions: Array,
    dataUser : Object
  });


  watch(() => props.modalEdit, (newVal) => {
  if (newVal) {
    initializeForm();
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
  password: '',
  password_confirmation: '',
  hotels: [],
  access: []
});


  const userStore = useUserStore();
  const toast = useToastAlert();

  const errorPasswordMatch = ref(false);
  const errorPassword = ref(false);
  const errorEmail = ref(false);
  const isRoleOne = ref(false);


  
  const handleChecked = ref(false)
  const jsonHotel = ref([]) // este es el que valida si el hotel esta seleccionado

  const initializeForm = () => {
    if (props.dataUser) {
        form.value.user_id = props.dataUser.id || null;
        form.value.work_position_id = props.dataUser.work_position_id || null;
        form.value.role = props.dataUser.role.id || null;
        form.value.name = props.dataUser.name || '';
        form.value.lastname = props.dataUser.lastname || '';
        form.value.prefix = props.dataUser.prefix || null;
        form.value.phone = props.dataUser.phone || '';
        form.value.email = props.dataUser.email || '';
        form.value.hotels = props.dataUser.hotels || [];
        form.value.access = props.dataUser.hotelPermissions[0][props.dataUser?.hotels[0]] || [];

        selectedRoleName.value = 'Usuario '+props.dataUser.role.name
        selectedWorkPositionName.value = props.dataUser.work_position
       
        props.dataUser.hotels.forEach(hotel => {
            handleSelection(hotel);
            
        });

        // Función para actualizar accesos
        const updateAccess = () => {
            const permissions = form.value.access;

            console.log('permissions',permissions)

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

  
  const seletedRoleUser = ref([
    { id: 1, name: 'Usuario Propietario', description: 'Este tipo de usuario tiene permiso a todo, desde la creación de distintos tipos de usuario hasta poder ver la suscripción activa.' },
    { id: 2, name: 'Usuario Administrador', description: 'Este tipo de usuario tiene permiso a todo, desde la creación de distintos tipos de usuario hasta poder ver la suscripción activa.' },
    { id: 3, name: 'Usuario Operador', description: 'Este tipo de usuario tiene permiso a todo, desde la creación de distintos tipos de usuario hasta poder ver la suscripción activa.' }
  ]);
  const prefixes = ref([null,'+1', '+34', '+91'])
  
  const selectedRoleName = ref('Selecciona el tipo de usuario deseado');
  const selectedWorkPositionName = ref('Elige el puesto de trabajo');
  const isModalOpen = ref(false);
  const isModalCrudOpen = ref(false);
  const rolAlert = ref(0);

    const operationAccess = ref([
        { name: 'Estancias', selected: false , value : 'estancias' },
        { name: 'Reseñas', selected: false, value: 'resenas' },
        { name: 'Análisis', selected: false , value: 'analisis' },
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

  const selectRole = (rol) => {
    selectedRoleName.value = rol.name;
    form.value.role = rol.id;
    rolAlert.value = rol.id;
    if (rol.id === 1) {
        isRoleOne.value = true;
        
        //handleChecked.value = true;
    } else {
      //console.log('rol',rol.id);
        isRoleOne.value = false;
        handleChecked.value = false;
        selectAllHotels.value = false;
        handleSelectAll()
    }
    isModalOpen.value = false;

  };
  
  const selectWorkPosition = (position) => {
    selectedWorkPositionName.value = position.name;
    form.value.work_position_id = position.id;
    isModalCrudOpen.value = false;

  };
  
  function closeModal() {
    emits('close');
  }
  
  const isFormIncomplete = computed(() => {
      //email
      const isValidEmail = /^(([^<>()\[\]\\.,;:\s@\"]+(\.[^<>()\[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(form.email);

      //contrase;a

    if (currentStep.value === 1) {
        return !form.value.name || !form.value.lastname || !form.value.email ||  !form.value.phone || !form.value.prefix || !form.value.role || !form.value.work_position_id;
      } else if (currentStep.value === 2) {
          return !form.value.hotels.length;
      } else if (currentStep.value === 3) {
          return !form.value.access.length;
    }

});
  const errorPhone = ref(false);

  const errorPrefix = ref(false);

  const validatePhone = (event) => {
    const newValue = event.target.value.replace(/\D/g, ''); // Elimina cualquier carácter no numérico
    form.value.phone = newValue;
    errorPhone.value = newValue.length === 0;

    // Verifica el valor del prefijo
    if (newValue.length > 0 && !form.value.prefix) {
      errorPrefix.value = true;
    } else {
      errorPrefix.value = false;
    }
  };

  // Watch para validar el prefijo cuando cambia el teléfono
  watch(() => form.value.phone, (newVal) => {
    if (newVal.length > 0 && !form.value.prefix) {
      errorPrefix.value = true;
    } else {
      errorPrefix.value = false;
    }
  });

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
    if (newRole === 1) {
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
        
    }else{
        selectAllHotels.value = false;
        //handleSelectAll(true);
        //jsonHotel.value = [];
        handleChecked.value = false;
    }
}, { immediate: true });

const handleSelectAll = (initial = false) => {
    //const allSelected = selectAllHotels.value;
  //alert('handleSelectAll')
    handleChecked.value = initial;

    //if (allSelected || initial) {
    if (handleChecked.value) {
        // Seleccionar todos los hoteles
        const hotels = userStore.$getHotels(['id','name']);
        form.value.hotels = hotels.map(hotel => hotel.id);
        hotels.forEach(hotel => {
            handleSelection(hotel.id, true);
        });
    } else {
        // Deseleccionar todos los hoteles
        form.value.hotels = [];
        jsonHotel.value = [];
        operationAccess.value.forEach(access => {
            access.selected = false;
        });
        adminAccess.value.forEach(access => {
            access.selected = false;
        });
    }
};

const handleSelection = (hotelId, add = null) => {
    const index = jsonHotel.value.findIndex(item => item.hasOwnProperty(hotelId));
    //console.log('handleSelectionX',hotelId,add,index)

    //console.log('index', index,form.value.hotels,hotelId);

    if (add === null) {
        add = form.value.hotels.includes(hotelId);
    }

    if (add && index === -1) {
        const newHotel = { [hotelId]: {} };
       //void access newhotel
       newHotel[hotelId] = {};
        // Agregar permisos ya seleccionados
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
    } else if (!add && index !== -1) {
        jsonHotel.value.splice(index, 1);
    }

    //console.log(`Hotel seleccionado: ${hotelId}`);
    //console.log('jsonHotelhandleSelection', jsonHotel.value);
};

const handleCheckPermission = (permissionName, isSelected) => {
    //console.log(`Permiso seleccionado: ${permissionName}`);

    form.value.hotels.forEach(hotelId => {
        const index = jsonHotel.value.findIndex(hotel => hotel.hasOwnProperty(hotelId));
        
        console.log('indexXvX',jsonHotel.value)
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

if (form.value.role === 1) {
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
    { number: 3, label: 'Accesos' }
  ];
  
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
  closeModal();
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
    isRoleOne.value = false;
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
  
  onMounted(async () => {
    await nextTick();
    const sectionExpElement = document.getElementById('layout-hoster');
    if (sectionExpElement) {
      containerTop.value = sectionExpElement.offsetTop;
    }

    errorPassword.value = false;
    errorPasswordMatch.value = false;
    errorEmail.value = false;
    
  });

  onMounted(() => {
    initializeForm();
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
  