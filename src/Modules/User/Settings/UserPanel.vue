<template>
    <div class="px-6">
        <h1 class="text-[22px] font-medium leading-[110%] py-5">Ajustes de cuenta</h1>
        <div class="border-b border-[#BFBFBF] mb-5"></div>

        <div class="flex items-center font-montserrat">
            <div class="hidden lg:flex w-full h-min">
                <div class="w-1/2">
                    <div class="form-card bg-white shadow-md rounded-2xl hp-4 lg:px-6 lg:pt-6 lg:pb-8 mx-auto">
                        <form @submit.prevent="handleUpdateProfile">
                            <h1 class="text-lg font-semibold text-center flex mb-6">Información de perfil</h1>
                            <div class="hmb-4 mb-6 flex flex-col">
                                <label class="font-medium text-sm mb-1">Nombre</label>
                                <input 
                                    type="text"
                                    class="w-full h-10 p-3 text-sm font-medium border-solid border border-gray-300 rounded-6 hoverForm rounded-md" 
                                    autocomplete="on" 
                                    v-model="form.name" 
                                    required
                                >
                                <!-- <BaseTextField
                                    v-model="form.name"
                                    autocomplete="on"
                                    required
                                />
                                 -->
                            </div>
                            <div class="hmb-4 mb-6 flex flex-col">
                                <label class="font-medium text-sm mb-1">Apellidos</label>
                                <input 
                                    type="text"
                                    class="w-full h-10 p-3 text-sm font-medium border-solid border border-gray-300 rounded-6 hoverForm rounded-md" 
                                    autocomplete="on" 
                                    v-model="form.lastname" 
                                    required
                                >
                                <!-- <BaseTextField
                                    v-model="form.lastname"
                                    autocomplete="on"
                                    required
                                /> -->
                            </div>
                            <div class="hmb-4 mb-6 flex flex-col">
                                <label class="font-medium text-sm mb-1">Correo electrónico</label>
                                <input 
                                    type="email"
                                    class="w-full h-10 p-3 text-sm font-medium border-solid border border-gray-300 rounded-6 hoverForm rounded-md" 
                                    :placeholder="placeholderEmail" 
                                    autocomplete="on" 
                                    v-model="form.email" 
                                    required
                                >
                                <!-- <BaseEmailField
                                    v-model="form.email"
                                    required
                                    :placeholder="placeholderEmail"
                                    :showTextError="errorEmail"
                                    :textError="errorEmailText"
                                /> -->
                                <div class="flex mt-1 text-red-600 justify-left" v-if="errorEmail">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="mr-1 bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
                                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                                    </svg>
                                    <small v-text="errorEmailText"></small>
                                </div>
                            </div>
                            <div class="mb-6">
                                <label class="text-sm font-medium">Teléfono móvil</label>
                                <div class="flex rounded relative">
                                    <div class="relative w-2/5">
                                        <select v-model="form.prefix" :class="{'border-red-600': errorPrefix, '': !errorPrefix}" class="bg-white w-full rounded-l-lg border border-r-[1px] border-solid border-gray-300 text-gray-700 font-medium text-sm px-4 py-2.5 pr-10 appearance-none">
                                            <option v-for="prefix in prefixes" :key="prefix" :value="prefix">{{ prefix ?? 'Prefijo' }}</option>
                                        </select>
                                        <div class="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <path d="M3 7.5L11.9138 16.1516C12.112 16.344 12.4287 16.3392 12.621 16.1409L21 7.5" stroke="#333333" stroke-width="1.8" stroke-linecap="round"/>
                                            </svg>
                                        </div>
                                    </div>
                                    <input type="text"
                                        placeholder="Teléfono de contacto"
                                        class="p-2.5 block border border-gray-300 w-full text-sm text-gray-900 bg-white rounded-r-lg"
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
                            <div class="mb-2">
                                <div class="flex mb-1">
                                    <span class="font-medium text-sm">Contraseña Actual</span>
                                    <span v-show="!changePassword" @click="showChangePass()" class="text-sm font-medium ml-auto cursor-pointer">Cambiar contraseña</span>
                                    <span v-show="changePassword" @click="showChangePass()" class="text-sm font-medium ml-auto cursor-pointer">Cancelar</span>
                                </div>
                                <div class="relative w-100 collaborator-box">
                                    <img v-if="changePassword && form.current_password !== '' && visible_pass.current_password" class="absolute cursor-pointer w-5 right-2.5 top-4 2xl:top-5" src="/assets/img/hoster/icons/showeye.svg" @click="toggleVisibility('current_password')">
                                    <img v-if="changePassword && form.current_password !== '' && !visible_pass.current_password" class="absolute cursor-pointer w-5 right-2.5 top-4 2xl:top-5" src="/assets/img/hoster/icons/disableeye.svg" @click="toggleVisibility('current_password')">
                                    <input 
                                        :type="visible_pass.current_password ? 'text' : 'password'"
                                        class="w-full rounded h-11 py-4 px-4 text-sm border placeholder-gray-400 text-black border-[#BFBFBF] focus:border-black" 
                                        id="current_password" 
                                        :placeholder="placeholderPassword"
                                        v-model="form.current_password"
                                        :disabled="!changePassword"
                                        required
                                    >
                                </div>
                            </div>
                            <section v-if="changePassword">
                                <div class="mb-2">
                                    <div class="flex mb-1">
                                        <span class="font-medium text-sm">Nueva contraseña</span>
                                    </div>
                                    <div class="relative w-100 collaborator-box">
                                        <img v-if="form.new_password === ''" class="absolute cursor-pointer w-5 right-2.5 top-4 2xl:top-6" src="/assets/img/hoster/icons/hideeye.svg">
                                        <img v-if="form.new_password !== '' && visible_pass.new_password" class="absolute cursor-pointer w-5 right-2.5 top-4 2xl:top-5" src="/assets/img/hoster/icons/showeye.svg" @click="toggleVisibility('new_password')">
                                        <img v-if="form.new_password !== '' && !visible_pass.new_password" class="absolute cursor-pointer w-5 right-2.5 top-4 2xl:top-5" src="/assets/img/hoster/icons/disableeye.svg" @click="toggleVisibility('new_password')">
                                        <input 
                                            :type="visible_pass.new_password ? 'text' : 'password'"
                                            class="w-full rounded h-11 py-4 px-4 text-sm border placeholder-gray-400 text-black border-[#BFBFBF] focus:border-black" 
                                            id="new_password" 
                                            :placeholder="placeholderPassword"
                                            v-model="form.new_password" required
                                        >
                                    </div>
                                </div>
                                <div class="mb-2">
                                    <div class="flex mb-1">
                                        <span class="font-medium text-sm">Confirmar nueva contraseña</span>
                                    </div>
                                    <div class="relative w-100 collaborator-box">
                                        <img v-if="form.confirm_new_password === ''" class="absolute cursor-pointer w-5 right-2.5 top-4 2xl:top-6" src="/assets/img/hoster/icons/hideeye.svg">
                                        <img v-if="form.confirm_new_password !== '' && visible_pass.confirm_new_password" class="absolute cursor-pointer w-5 right-2.5 top-4 2xl:top-5" src="/assets/img/hoster/icons/showeye.svg" @click="toggleVisibility('confirm_new_password')">
                                        <img v-if="form.confirm_new_password !== '' && !visible_pass.confirm_new_password" class="absolute cursor-pointer w-5 right-2.5 top-4 2xl:top-5" src="/assets/img/hoster/icons/disableeye.svg" @click="toggleVisibility('confirm_new_password')">
                                        <input 
                                            :type="visible_pass.confirm_new_password ? 'text' : 'password'"
                                            class="w-full rounded h-11 py-4 px-4 text-sm border placeholder-gray-400 text-black border-[#BFBFBF] focus:border-black" 
                                            id="confirm_new_password" 
                                            :placeholder="placeholderPassword"
                                            v-model="form.confirm_new_password" required
                                        >
                                    </div>
                                </div>
                            </section>
                            <div class="flex justify-end items-center mt-8">
                                <button 
                                    type="submit" 
                                    class="hbtn-cta w-1/4 h-14 rounded-lg text-base font-medium" 
                                    :disabled="isSaveDisabled"
                                >
                                    Guardar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>  
    </div> 
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useAuthStore } from '@/stores/modules/auth/login';
import { useUserStore } from '@/stores/modules/users/users';
import { useToastAlert } from '@/composables/useToastAlert';
import BaseTextField from '@/components/Forms/BaseTextField';
import BaseEmailField from '@/components/Forms/BaseEmailField';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const userStore = useUserStore();
const toast = useToastAlert();
const router = useRouter();

const form = ref({
    name: authStore.user?.name || '',
    lastname: authStore.user?.lastname || '',
    email: authStore.user?.email || '',
    current_password: '',
    password: '',
    new_password: '',
    confirm_new_password: '',
    prefix: authStore.user?.prefix || '',
    phone: authStore.user?.phone || '',
});


const visible_pass = ref({
    current_password: false,
    password: false,
    new_password: false,
    confirm_new_password: false,
});

const changePassword = ref(false);
const errorPrefix = ref(false);
const errorPhone = ref(false);
const errorEmail = ref(false);
const prefixes = ref(['+34', '+1', '+91']);

let formInitialState = JSON.stringify(form.value);

const toggleVisibility = (field) => {
    visible_pass.value[field] = !visible_pass.value[field];
};

const showChangePass = () => {
    if (changePassword.value) {
        form.value.new_password = '';
        form.value.confirm_new_password = '';
        form.value.current_password = '';
        visible_pass.value.new_password = false;
        visible_pass.value.confirm_new_password = false;
        visible_pass.value.current_password = false;
    }
    changePassword.value = !changePassword.value;
};

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

const errorEmailText = ref(false);

  watch(() => form.value.email, (newVal) => {
      const emailRegex = /^(([^<>()\[\]\\.,;:\s@\"]+(\.[^<>()\[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      errorEmail.value = !emailRegex.test(newVal);
      errorEmailText.value = 'Introduce un email correcto';
  });

const handleUpdateProfile = async () => {
    const response = await userStore.$updateProfile(form.value);
    if (response.ok) {
        authStore.$setUser(response.data.user);
        toast.warningToast(response.data.message, 'top-right');
        
        // Restablecer el estado inicial del formulario
        formInitialState = JSON.stringify(form.value);
        isSaveDisabled.value = true;
        changePassword.value = false;
        form.value.current_password = '';
        form.value.new_password = '';
        form.value.confirm_new_password = '';
        
    } else {
        toast.errorToast(response.data.methodException, 'top-right');
    }
};

const isSaveDisabled = ref(true);

watch(form, (newVal, oldVal) => {
    const currentState = JSON.stringify(newVal);
    isSaveDisabled.value = currentState === formInitialState || !isFormValid();
}, { deep: true });

const isFormValid = () => {
    const fieldsFilled = form.value.name && form.value.email && form.value.prefix && form.value.phone;
    const passwordValid = !changePassword.value || (form.value.current_password && form.value.new_password && form.value.confirm_new_password && form.value.new_password === form.value.confirm_new_password);
    return fieldsFilled && !errorPhone.value && passwordValid;
};
</script>
<style scoped>
/* Ensure the select element has a right padding to make room for the SVG icon */
select.appearance-none {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
}

/* Hide the default dropdown arrow */
select::-ms-expand {
    display: none;
}
</style>
