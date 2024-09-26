<template>
    <div class="px-6">
        <h1 class="text-[22px] font-medium leading-[110%] py-5">Ajustes de cuenta</h1>
        <div class="border-b border-[#BFBFBF] mb-5"></div>

        <div class="flex items-center font-montserrat">
            <div class="hidden lg:flex w-full h-min">
                <div class="w-1/2">
                    <div class="form-card bg-white shadow-md rounded-2xl hp-4 lg:px-6 lg:pt-6 lg:pb-8 mx-auto mb-12">
                        <form @submit.prevent="handleUpdateProfile"  autocomplete="off">
                            <h1 class="text-lg font-semibold text-center flex mb-6">Información de perfil</h1>
                            <div class="mb-4 flex flex-col">
                                <label class="font-medium text-sm mb-1">Nombre</label>
                                <BaseTextField
                                    placeholder="Introduce el nombre"
                                    v-model="form.name" 
                                    :error="!form.name && attemptedSending"
                                    @input:typing="attemptedSending = false"
                                />
                            </div>
                            <div class="mb-4 flex flex-col">
                                <label class="font-medium text-sm mb-1">Apellidos</label>
                                <BaseTextField
                                    placeholder="Introduce apellidos"
                                    v-model="form.lastname" 
                                    :error="!form.lastname && attemptedSending"
                                    @input:typing="attemptedSending = false"
                                />
                            </div>
                            <!-- email -->
                            <div class="mb-4 flex flex-col">
                                <label class="font-medium text-sm mb-1">Correo electrónico</label>
                                <BaseEmailField
                                    placeholder="Introduce una dirección de correo electrónico"
                                    v-model="form.email"
                                    @handleError="EmailFieldError = $event"    
                                    @input:typing="attemptedSending = false"
                                    :activeError="!form.email && attemptedSending"
                                />
                            </div>
                            <!-- phone -->
                            <div class="mb-4">
                                <label class="text-sm font-medium mb-1">Teléfono móvil </label>
                                <BasePhoneField
                                    v-model="form.phone"
                                    name="phone"
                                    placeholderPhone="Introduce número de teléfono"
                                    @handlePhoneError="errorPhone = $event"
                                    mandatory
                                    :error="!form.phone.trim() && attemptedSending"
                                />
                            </div>
                            <!-- password -->
                            <div class="mb-4">
                                <div class="flex mb-1">
                                    <span class="font-medium text-sm">Contraseña Actual</span>
                                    <span v-show="!changePassword" @click="showChangePass()" class="text-sm font-medium ml-auto cursor-pointer">Cambiar contraseña</span>
                                    <span v-show="changePassword" @click="showChangePass()" class="text-sm font-medium ml-auto cursor-pointer">Cancelar</span>
                                </div>
                                <div class="relative w-100 collaborator-box">
                                    <img v-if="changePassword && form.current_password !== '' && visible_pass.current_password" class="absolute cursor-pointer w-5 right-2.5 top-3 " src="/assets/img/hoster/icons/showeye.svg" @click="toggleVisibility('current_password')">
                                    <img v-if="changePassword && form.current_password !== '' && !visible_pass.current_password" class="absolute cursor-pointer w-5 right-2.5 top-3 " src="/assets/img/hoster/icons/disableeye.svg" @click="toggleVisibility('current_password')">
                                    <input 
                                        :type="visible_pass.current_password ? 'text' : 'password'"
                                        class="w-full rounded h-10 py-4 px-4 text-sm border" 
                                        :class="{
                                            'hborder-black-100':form.current_password,
                                            'hborder-gray-400':!form.current_password.trim(),
                                            'hborder-alert-negative htext-alert-negative': !form.current_password && attemptedSending || passError,
                                        }"
                                        :placeholder="placeholderPassword"
                                        v-model="form.current_password"
                                        :disabled="!changePassword"
                                        name="new-password"
                                        autocomplete="new-password"
                                    />
                                </div>
                                <div v-if="passError" class="mt-2">
                                    <p class="text-xs flex items-center htext-alert-negative">
                                        <img class="inline w-4 h-4 mr-2" src="/assets/icons/1.TH.WARNING.RED.svg">
                                        {{passError}}
                                    </p>
                                </div>
                            </div>
                            <section v-if="changePassword">
                                <div class="mb-4">
                                    <div class="flex mb-1">
                                        <span class="font-medium text-sm">Nueva contraseña</span>
                                    </div>
                                    <div class="relative w-100 collaborator-box">
                                        <img v-if="form.new_password === ''" class="absolute cursor-pointer w-5 right-2.5 top-3 " src="/assets/img/hoster/icons/hideeye.svg">
                                        <img v-if="form.new_password !== '' && visible_pass.new_password" class="absolute cursor-pointer w-5 right-2.5 top-3 " src="/assets/img/hoster/icons/showeye.svg" @click="toggleVisibility('new_password')">
                                        <img v-if="form.new_password !== '' && !visible_pass.new_password" class="absolute cursor-pointer w-5 right-2.5 top-3 " src="/assets/img/hoster/icons/disableeye.svg" @click="toggleVisibility('new_password')">
                                        <input 
                                            :type="visible_pass.new_password ? 'text' : 'password'"
                                            class="w-full rounded h-10 py-4 px-4 text-sm border" 
                                            :class="{
                                                'hborder-black-100':form.new_password,
                                                'hborder-gray-400':!form.new_password.trim(),
                                                'hborder-alert-negative htext-alert-negative': form.confirm_new_password && !confirmPassword || !form.new_password && attemptedSending,
                                            }"
                                            id="new_password" 
                                            :placeholder="placeholderPassword"
                                            v-model="form.new_password"
                                        >
                                    </div>

                                </div>
                                <div class="mb-4">
                                    <div class="flex mb-1">
                                        <span class="font-medium text-sm">Confirmar nueva contraseña</span>
                                    </div>
                                    <div class="relative w-100 collaborator-box">
                                        <img v-if="form.confirm_new_password === ''" class="absolute cursor-pointer w-5 right-2.5 top-3 " src="/assets/img/hoster/icons/hideeye.svg">
                                        <img v-if="form.confirm_new_password !== '' && visible_pass.confirm_new_password" class="absolute cursor-pointer w-5 right-2.5 top-3 " src="/assets/img/hoster/icons/showeye.svg" @click="toggleVisibility('confirm_new_password')">
                                        <img v-if="form.confirm_new_password !== '' && !visible_pass.confirm_new_password" class="absolute cursor-pointer w-5 right-2.5 top-3 " src="/assets/img/hoster/icons/disableeye.svg" @click="toggleVisibility('confirm_new_password')">
                                        <input 
                                            :type="visible_pass.confirm_new_password ? 'text' : 'password'"
                                            class="w-full rounded h-10 py-4 px-4 text-sm border" 
                                            :class="{
                                                'hborder-black-100':form.confirm_new_password,
                                                'hborder-gray-400':!form.confirm_new_password.trim(),
                                                'hborder-alert-negative htext-alert-negative': form.confirm_new_password && !confirmPassword  || !form.confirm_new_password && attemptedSending,
                                            }"
                                            id="confirm_new_password" 
                                            :placeholder="placeholderPassword"
                                            v-model="form.confirm_new_password"
                                        >
                                    </div>
                                </div>
                            </section>
                            <div class="flex justify-end items-center mt-8">
                                <button 
                                    type="submit" 
                                    class="hbtn-cta w-1/4 h-14 rounded-lg text-base font-medium" 
                                    :class="{'cta-disabled':!valid}"
                                    :disabled="!valid"
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
import { ref, computed, watch, onMounted, reactive } from 'vue';
import { useAuthStore } from '@/stores/modules/auth/login';
import { useUserStore } from '@/stores/modules/users/users';
import { useToastAlert } from '@/composables/useToastAlert';
import BaseTextField from '@/components/Forms/BaseTextField';
import BaseEmailField from '@/components/Forms/BaseEmailField.vue';
import BasePhoneField from "@/components/Forms/BasePhoneField.vue";
import { useRouter } from 'vue-router';
import { $removeSpaces } from '@/utils/textWritingTypes'

const authStore = useAuthStore();
const userStore = useUserStore();
const toast = useToastAlert();
const router = useRouter();

const form = reactive({
    name: authStore.user?.name || '',
    lastname: authStore.user?.lastname || '',
    email: authStore.user?.email || '',
    current_password: '',
    password: '',
    new_password: '',
    confirm_new_password: '',
    phone: authStore.user?.phone ?? '',
});

// onMounted(()=>{
//     console.log('test user',authStore.user)
// })


const visible_pass = ref({
    current_password: false,
    password: false,
    new_password: false,
    confirm_new_password: false,
});

const changePassword = ref(false);
const errorPhone = ref(false);
const EmailFieldError = ref(false);
const attemptedSending  = ref(false);
const passError  = ref(null);

let formInitialState = JSON.stringify(form.value);

const toggleVisibility = (field) => {
    visible_pass.value[field] = !visible_pass.value[field];
};

const showChangePass = () => {
    if (changePassword.value) {
        form.new_password = '';
        form.confirm_new_password = '';
        form.current_password = '';
        visible_pass.value.new_password = false;
        visible_pass.value.confirm_new_password = false;
        visible_pass.value.current_password = false;
    }
    changePassword.value = !changePassword.value;
};

const handleUpdateProfile = async () => {
    attemptedSending.value = true;
    if(changes.value && valid.value){
        const response = await userStore.$updateProfile(form);
        console.log('test response', response);
        if (response.ok) {
            authStore.$setUser(response.data.user);
            toast.warningToast(response.data.message, 'top-right');
            // Restablecer el estado inicial del formulario
            formInitialState = JSON.stringify(form.value);
            changePassword.value = false;
            form.current_password = '';
            form.new_password = '';
            form.confirm_new_password = '';
            passError.value = null;
        } else {
            if(changePassword.value){
                passError.value = response.data.methodException;
            }else{
                toast.errorToast(response.data.methodException, 'top-right');
            }
        }
    }
};

const changes = computed(() => {
    attemptedSending.value = false;
    let ch = form.name !== authStore.user?.name || form.lastname !== authStore.user?.lastname || 
             form.email !== authStore.user?.email || $removeSpaces(form.phone) !== $removeSpaces(authStore.user?.phone);

    if (changePassword.value) {
        ch = ch || (form.current_password.trim() && form.new_password.trim() && confirmPassword.value);
    }

    console.log('test ch', ch);
    return ch;
});


const valid = computed(()=>{
    
    let val = changes.value && form.name.trim() && form.lastname.trim() && form.email.trim() && form.phone.trim() && 
                !errorPhone.value && !EmailFieldError.value;
    
    if(changePassword.value){
        val = val && (form.current_password.trim() && form.new_password.trim() && confirmPassword.value);
    }
    console.log('test val', val);
    return val;
})

const confirmPassword = computed(() => {
    passError.value = null;
    if(changePassword.value){
        return form.new_password.trim() &&  form.confirm_new_password.trim() 
        && (form.new_password.trim() === form.confirm_new_password.trim());
    }
    return false;
});

// const isSaveDisabled = ref(true);

// watch(form, (newVal, oldVal) => {
//     const currentState = JSON.stringify(newVal);
//     isSaveDisabled.value = currentState === formInitialState || !isFormValid();
// }, { deep: true });

// const isFormValid = () => {
//     const fieldsFilled = form.value.name && form.value.email && form.value.prefix && form.value.phone;
//     const passwordValid = !changePassword.value || (form.value.current_password && form.value.new_password && form.value.confirm_new_password && form.value.new_password === form.value.confirm_new_password);
//     return fieldsFilled && !errorPhone.value && passwordValid;
// };
</script>
<style scoped>
input::placeholder{
    color: var(--h-gray-400);
}
</style>
