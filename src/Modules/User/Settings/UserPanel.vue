<template>
    <div class="px-6">
        <h1 class="text-[22px] font-medium leading-[110%] py-5">Ajustes de cuenta</h1>
        <div class="border-b border-[#BFBFBF] mb-5"></div>

        <div class="flex items-center font-montserrat">
            <div class="hidden lg:flex w-full h-min">
                <div class="w-1/2">
                    <div class="form-card bg-white shadow-md rounded-2xl hp-4 lg:px-6 lg:pt-6 lg:pb-8 mx-auto">
                        <form @submit.prevent="handleLogin">
                            <h1 class="text-lg font-semibold text-center flex mb-6">Información de perfil</h1>
                            <div class="hmb-4 mb-6 flex flex-col">
                                <label class="font-medium text-sm mb-1">Nombre y Apellidos</label>
                                <input 
                                    type="text"
                                    class="w-100 rounded h-11  py-1 text-sm border placeholder-gray-400 text-black border-[#BFBFBF] focus:border-black" 
                                    :placeholder="placeholderEmail" 
                                    autocomplete="on" 
                                    v-model="form.name" 
                                    :class="{'border-red-400 text-red-400 placeholder-red-400' : authStore.errorLogin}"
                                    required
                                >
                            </div>
                            <div class="hmb-4 mb-6 flex flex-col">
                                <label class="font-medium text-sm mb-1">Correo electrónico</label>
                                <input 
                                    type="email"
                                    class="w-100 rounded h-11  py-1 text-sm border placeholder-gray-400 text-black border-[#BFBFBF] focus:border-black" 
                                    :placeholder="placeholderEmail" 
                                    autocomplete="on" 
                                    v-model="form.email" 
                                    :class="{'border-red-400 text-red-400 placeholder-red-400' : authStore.errorLogin}"
                                    required
                                >
                            </div>
                            <div class="mb-6">
                                <label class="text-sm font-medium">Teléfono móvil</label>
                                <div class="flex rounded">
                                    <select v-model="form.prefix" :class="{'border-red-600': errorPrefix, 'focus:ring-blue-500 focus:border-blue-500': !errorPrefix}" class="bg-white w-2/5 rounded-l-lg border-r-[1px] border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-gray-700 font-medium text-sm px-4 py-2.5">
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
                            <div class="mb-2">
                                <div class="flex mb-1">
                                    <span class="font-medium text-sm">Contraseña</span>
                                    <span v-show="!changePassword" @click="showChangePass()" class="text-sm font-medium ml-auto cursor-pointer">Cambiar contraseña</span>
                                    <span v-show="changePassword" @click="showChangePass()" class="text-sm font-medium ml-auto cursor-pointer">Cancelar</span>
                                </div>
                                <div class="relative w-100 collaborator-box">
                                    <img v-if="changePassword && form.password !== '' && visible_pass.password" class="absolute cursor-pointer w-5 right-2.5 top-4 2xl:top-5" src="/assets/img/hoster/icons/showeye.svg" @click="toggleVisibility('password')">
                                    <img v-if="changePassword && form.password !== '' && !visible_pass.password" class="absolute cursor-pointer w-5 right-2.5 top-4 2xl:top-5" src="/assets/img/hoster/icons/disableeye.svg" @click="toggleVisibility('password')">
                                    <input 
                                        :type="visible_pass.password ? 'text' : 'password'"
                                        class="w-full rounded h-11  py-4 px-4 text-sm border placeholder-gray-400 text-black border-[#BFBFBF] focus:border-black" 
                                        id="password" 
                                        :placeholder="placeholderPassword"
                                        :class="{'border-red-400 text-red-400 placeholder-red-400' : authStore.errorLogin}"
                                        v-model="form.password"
                                        :disabled="!changePassword"
                                        required
                                    >
                                </div>
                            </div>
                            <section v-if="changePassword">
                                <div class="mb-2">
                                    <div class="flex mb-1">
                                        <span class="font-medium text-lg">Nueva contraseña</span>
                                    </div>
                                    <div class="relative w-100 collaborator-box">
                                        <img v-if="form.new_password === ''" class="absolute cursor-pointer w-5 right-2.5 top-4 2xl:top-6" src="/assets/img/hoster/icons/hideeye.svg">
                                        <img v-if="form.new_password !== '' && visible_pass.new_password" class="absolute cursor-pointer w-5 right-2.5 top-4 2xl:top-5" src="/assets/img/hoster/icons/showeye.svg" @click="toggleVisibility('new_password')">
                                        <img v-if="form.new_password !== '' && !visible_pass.new_password" class="absolute cursor-pointer w-5 right-2.5 top-4 2xl:top-5" src="/assets/img/hoster/icons/disableeye.svg" @click="toggleVisibility('new_password')">
                                        <input 
                                            :type="visible_pass.new_password ? 'text' : 'password'"
                                            class="w-full rounded h-11  py-4 px-4 text-sm border placeholder-gray-400 text-black border-[#BFBFBF] focus:border-black" 
                                            id="new_password" 
                                            :placeholder="placeholderPassword"
                                            :class="{'border-red-400 text-red-400 placeholder-red-400' : authStore.errorLogin}"
                                            v-model="form.new_password" required
                                        >
                                    </div>
                                </div>
                                <div class="mb-2">
                                    <div class="flex mb-1">
                                        <span class="font-medium text-lg">Confirmar nueva contraseña</span>
                                    </div>
                                    <div class="relative w-100 collaborator-box">
                                        <img v-if="form.confirm_new_password === ''" class="absolute cursor-pointer w-5 right-2.5 top-4 2xl:top-6" src="/assets/img/hoster/icons/hideeye.svg">
                                        <img v-if="form.confirm_new_password !== '' && visible_pass.confirm_new_password" class="absolute cursor-pointer w-5 right-2.5 top-4 2xl:top-5" src="/assets/img/hoster/icons/showeye.svg" @click="toggleVisibility('confirm_new_password')">
                                        <img v-if="form.confirm_new_password !== '' && !visible_pass.confirm_new_password" class="absolute cursor-pointer w-5 right-2.5 top-4 2xl:top-5" src="/assets/img/hoster/icons/disableeye.svg" @click="toggleVisibility('confirm_new_password')">
                                        <input 
                                            :type="visible_pass.confirm_new_password ? 'text' : 'password'"
                                            class="w-full rounded h-11  py-4 px-4 text-sm border placeholder-gray-400 text-black border-[#BFBFBF] focus:border-black" 
                                            id="confirm_new_password" 
                                            :placeholder="placeholderPassword"
                                            :class="{'border-red-400 text-red-400 placeholder-red-400' : authStore.errorLogin}"
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
import { ref, computed, watch } from 'vue';
import { useAuthStore } from '@/stores/modules/auth/login';

const authStore = useAuthStore();

const form = ref({
    name: `${authStore.user.name} ${authStore.user.lastname}`,
    email: authStore.user.email,
    password: '',
    new_password: '',
    confirm_new_password: '',
    prefix: authStore.user.prefix,
    phone: authStore.user.phone,
    remember: false,
});

const visible_pass = ref({
    password: false,
    new_password: false,
    confirm_new_password: false,
});

const changePassword = ref(false);
const errorPrefix = ref(false);
const errorPhone = ref(false);
const prefixes = ref(['+34', '+1', '+91']); 

const formInitialState = JSON.stringify(form.value);

const toggleVisibility = (field) => {
    visible_pass.value[field] = !visible_pass.value[field];
};

const showChangePass = () => {
    if (changePassword.value) {
        form.value.new_password = '';
        form.value.confirm_new_password = '';
        form.value.password = '';
        visible_pass.value.new_password = false;
        visible_pass.value.confirm_new_password = false;
        visible_pass.value.password = false;
    }
    changePassword.value = !changePassword.value;
};

const validatePhone = () => {
    const phoneRegex = /^[0-9]*$/;
    errorPhone.value = !phoneRegex.test(form.value.phone);
};

const handleLogin = () => {
    console.log('Login');
};

const isSaveDisabled = ref(true);

watch(form, (newVal, oldVal) => {
    const currentState = JSON.stringify(newVal);
    isSaveDisabled.value = currentState === formInitialState || !isFormValid();
}, { deep: true });

const isFormValid = () => {
    const fieldsFilled = form.value.name && form.value.email && form.value.prefix && form.value.phone;
    const passwordValid = !changePassword.value || (form.value.password && form.value.new_password && form.value.confirm_new_password && form.value.new_password === form.value.confirm_new_password);
    return fieldsFilled && !errorPhone.value && passwordValid;
};

</script>
