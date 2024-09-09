<template>
  <section id="collaborator-login">
    <LoadingAuth :show="authStore.loading"/>
    <div class="flex items-center container-fluid-landing h-screen font-montserrat">
      <div class="hidden lg:flex justify-around w-full h-min">
        <div class="flex items-center login-hicitty w-max h-min">
          <div>
            <img class="hoster-logo mx-auto cursor-pointer" src="/assets/img/hoster/th_logo.png" alt="" @click="redirect">
            <div class="my-10 mx-auto" style="width: 300px;">
              <div class="p-6 text-center border border-gray-300 rounded-xl my-10 mx-auto">
                <h3 class="text-lg font-medium">¿Necesitas ayuda?</h3>
                <p class="text-sm mt-2">Encontrarás atención especializada enviando un whatsapp al siguiente teléfono:</p>
                <h3 class="text-base font-medium mt-2">(+34) 624 149 605</h3>
                <p class="text-sm mt-2">Horario de atención:</p>
                <p class="text-sm">8:30 - 14:30</p>
              </div>
            </div>
            <div class="w-full text-center">
              <a target="_blank" href="https://www.linkedin.com/company/hicitty/">
                <img class="h-8 w-8 inline-block" src="/assets/img/hoster/linkedin_black.svg" alt="">
              </a>
            </div>
          </div>
        </div>
        <div class="login-form-collaborator">
          <div class="form-card bg-white shadow rounded-2xl hp-4 lg:px-6 lg:pt-6 lg:pb-8 mx-auto">
            <form @submit.prevent="handleLogin">
              <h1 class="text-xl lg:text-22xl hmb-4 lg:mb-6 font-medium text-center">¡Bienvenid@ a TheHoster!</h1>
              <div class="hmb-4 lg:mb-6 flex flex-col">
                <label class="font-medium text-lg mb-1">Correo electrónico</label>
                <input 
                  type="email"
                  class="w-100 rounded h-11 lg:h-14 p-4 text-sm border placeholder-gray-400 text-black border-black focus:border-black" 
                  :placeholder="placeholderEmail" 
                  autocomplete="on" 
                  v-model="form.email" 
                  :class="{'border-red-400 text-red-400 placeholder-red-400' : authStore.errorLogin}"
                  required
                >
                <div v-show="authStore.errorLogin" class="flex justify-start gap-2 mt-[7.5px]">
                  <img class="w-4 h-4 cursor-pointer" src="/assets/icons/1.TH.WARNING.RED.svg" alt="">
                  <span class="text-[#FF6666] text-xs font-normal "> {{ authStore.errorLogin }}</span>
                </div>
                
              </div>
              <div class="mb-2">
                <label class="font-medium text-lg mb-1">Contraseña</label>
                <div class="relative w-100 collaborator-box">
                  <img v-if="form.password == ''" class="absolute cursor-pointer w-5 right-2.5 top-4 2xl:top-6" src="/assets/img/hoster/icons/hideeye.svg">
                  <img v-if="form.password !== '' && visible_pass" class="absolute cursor-pointer w-5 right-2.5 top-4 2xl:top-5" src="/assets/img/hoster/icons/showeye.svg" @click="showPass('password',false)">
                  <img v-if="form.password !== '' && !visible_pass" class="absolute cursor-pointer w-5 right-2.5 top-4 2xl:top-5" src="/assets/img/hoster/icons/disableeye.svg" @click="showPass('password',true)">
                  <input 
                    :type="visible_pass ? 'text' : 'password'"
                    class="w-full rounded h-11 lg:h-14 py-4 px-4 text-sm border placeholder-gray-400 text-black border-black focus:border-black" 
                    id="password" 
                    :placeholder="placeholderPassword"
                    :class="{'border-red-400 text-red-400 placeholder-red-400' : authStore.errorLogin}"
                    v-model="form.password" required
                  >
                </div>
              </div>
              <div class="flex justify-between">
                <div class="form-remember col-10 col-lg-4 text-left">
                  <input type="checkbox" v-model="form.remember" class="border hcheckbox mr-1 h-6 w-5 rounded">
                  <p class="inline text-sm">Recuérdame</p>
                </div>
                <div class="forgot-password text-left text-lg-right col-10 col-lg-6 pt-1">
                  <a href="javascript:void(0)" class="text-sm font-medium" @click="openForgotPasswordModal">He olvidado mi contraseña</a>
                </div>
              </div>
              <div class="mt-6 lg:mt-8 text-center">
                <button 
                  type="submit" 
                  class="hbtn-cta w-full lg:w-8/12 h-14 rounded-lg text-base font-medium" 
                  :disabled="authStore.loading"
                >
                  Iniciar sesión
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
  
      <!-- mobile msg -->
      <div class="my-auto w-full lg:hidden">
        <img class="w-[13.5rem] h-10 mx-auto" src="/assets/img/hoster/1.TH.logo.full.svg" alt="logo the hoster">
        <p class="text-lg font-medium mt-8 text-center">La visualización en dispositivos móviles no es posible.</p>
        <p class="text-lg font-medium mt-8 text-center">Abre esta página en el ordenador y disfruta la experiencia.</p>
      </div>
    </div>  
    <ModalWindow :isVisible="showModal" @close="closeModalPass" size="sm">
      <template #content>
        <form @submit.prevent="forgotPass">
          <div class="mb-4 flex flex-col">
            <h1 class="text-lg font-medium text-center mb-4">Reestablece tu contraseña</h1>
            <p class="text-center text-sm mb-4">
              ¿Ha olvidado su contraseña? No hay problema. Solo háganos saber su dirección de correo electrónico y le enviaremos un enlace para reestablecer su contraseña.
            </p>
            <div class="flex flex-col">
              <label for="correo" class="font-medium text-sm">Correo electrónico</label>
              <!-- <input
                v-model="forgot.email"
                type="email"
                class="rounded border-1 w-100 py-2 text-sm"
                :class="forgot.errors?.email ? 'border-red-400 text-red-400 placeholder-red-400' : 'border-green-600 text-green-600 placeholder-green-600'"
                placeholder="Correo Electrónico"
                required
                autofocus
                autocomplete="username"
              >     -->
              <BaseTextField
                v-model="forgot.email"
                type="email"
                :error="forgot.errors?.email"
                placeholder="Correo Electrónico"
                required
                autofocus
                autocomplete="username"
              />            
            </div>
            <div v-if="forgot.error" class="text-center text-red-600 mt-2">{{ forgot.error }}</div>
          </div>
          <div class="px-8 flex justify-center">
            <button 
              type="submit" 
              class="hbtn-cta w-full h-10 rounded-lg text-base font-medium" 
              :disabled="forgot.processing"
              :class="{ 'opacity-25': forgot.processing }"
            >
              Enviar
            </button>
          </div>
        </form>
      </template>
    </ModalWindow>

    <!-- modal alert -->
    <ModalWindow v-if="showAlertModal" :isVisible="showAlertModal" @close="closeAlertModal()" size="xs">
      <template #content>
        <div class="p-4" v-if="route.query.tokenExpired">
          <h2 class="text-lg font-medium">Oh lo siento</h2>
          <p>Este enlace ha expirado, vuelva a solicitar otro.</p>
          <div class="px-8 flex justify-center mt-7">
            <button 
              type="button" 
              class="hbtn-cta w-full h-10 rounded-lg text-base font-medium" 
              @click="closeAlertModal()"
            >
              Cerrar
            </button>
          </div>
        </div>
        <div class="p-4" v-else-if="route.query.changePassword">
          <h2 class="text-lg font-medium">¡Contraseña cambiada!</h2>
          <p>Se ha cambiado la contraseña exitosamente</p>
          <div class="px-8 flex justify-center mt-7">
            <button 
              type="button" 
              class="hbtn-cta w-full h-10 rounded-lg text-base font-medium" 
              @click="closeAlertModal()"
            >
              Cerrar
            </button>
          </div>
        </div>
        <div class="p-4" v-else-if="forgot.success">
          <h2 class="text-lg font-medium mt-3">{{ forgot.title }}</h2>
          <p>{{ forgot.msg }}</p>
          <div class="px-8 flex justify-center mt-7">
            <button 
              type="button" 
              class="hbtn-cta w-full h-10 rounded-lg text-base font-medium" 
              @click="closeAlertModal()"
            >
              Cerrar
            </button>
          </div>
        </div>
      </template>
    </ModalWindow>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/modules/auth/login';
import LoadingAuth from './Components/LoadingAuth.vue';
import { useUserStore } from '@/stores/modules/users/users'
import ModalWindow from '@/components/ModalWindow.vue'; 
import { resetPassword } from '@/api/services/auth';
import BaseTextField from '@/components/Forms/BaseTextField';
import { useRoute, useRouter } from 'vue-router';

const authStore = useAuthStore();
const form = ref({
  email: localStorage.getItem("user_email_form") ? localStorage.getItem("user_email_form") : '',
  password: localStorage.getItem("pass_email_form") ? localStorage.getItem("pass_email_form") : '',
  remember: localStorage.getItem("remember_form") ? (localStorage.getItem("remember_form") === 'true') : false
});

const placeholderEmail = ref('Introduce tu email');
const placeholderPassword = ref('********');

const visiblePass = ref(false);
const showModal = ref(false);

const showAlertModal = ref(false);
const route = useRoute();
const router = useRouter();

const user = useUserStore();

const forgot = ref({
  email: '',
  processing: false,
  success: false,
  msg : '',
  error: '',
  errors: null,
  title: ''
});

onMounted(() => {
  if (route.query.tokenExpired || route.query.changePassword) {
    showAlertModal.value = true;
  }
});

onMounted(async() => {
  // Capturar parámetros de la URL
  const token = route.query.token;


  if (token) {
    // Almacenar en sessionStorage
    sessionStorage.setItem('token', token);

    const params = {
      token: sessionStorage.setItem('token', token)
    }
    
     await authStore.loginAdmin(params);

    
    setTimeout(() => {
      router.push('/dashboard');
    }, 1000);
    //router.push('/dashboard');
  }
});

const closeAlertModal = () => {
  showAlertModal.value = false;
  router.replace({ query: { ...route.query, tokenExpired: undefined, changePassword: undefined } });
};

const showPass = (id, bool) => {
  visiblePass.value = bool;
  const input = document.getElementById(id);
  input.type = input.type === 'password' ? 'text' : 'password';
};

const openForgotPasswordModal = () => {
  showModal.value = true;
};

const closeModalPass = () => {
  showModal.value = false;
  forgot.value.email = '';
};

const forgotPass = async () => {
  forgot.value.processing = true;
  forgot.value.error = '';
  forgot.value.errors = null;

  try {
    const response = await resetPassword({ email: forgot.value.email });
    forgot.value.msg = response.data.message;
    if (response.ok) {
      forgot.value.title = '¡Correo enviado!';
    } else {
      forgot.value.title = '¡Error!';
    }
    forgot.value.success = true;
    showAlertModal.value = true;
    closeModalPass();
  } catch (error) {
    forgot.value.error = error.response?.data?.message || 'Ha ocurrido un error';
    forgot.value.errors = error.response?.data?.errors || null;
  } finally {
    forgot.value.processing = false;
  }
};

const handleLogin = async () => {
  await authStore.login({
    email: form.value.email,
    password: form.value.password
  });

  if (form.value.remember) {
    sessionStorage.setItem("user_email_form", form.value.email);
    sessionStorage.setItem("pass_email_form", form.value.password);
    sessionStorage.setItem("remember_form", form.value.remember);
  } else {
    sessionStorage.removeItem("user_email_form");
    sessionStorage.removeItem("pass_email_form");
    sessionStorage.removeItem("remember_form");
  }
}
</script>




<style scoped>
*> :not(i){
  font-family:Montserrat;
}

.login-form-collaborator .form-collaborator-text::after,
.login-form-collaborator .form-collaborator-text::before{
    content: '';
    width: 40%;
    height: 1px;
    position: absolute;
    top: 50%;
    background-color: black;
}

.hoster-logo {
    width: 502px;
    height: 96px;
}

.login-form-collaborator .form-collaborator-text::before{
    left:-50%;
}
.login-form-collaborator .form-collaborator-text::after{
    right:-50%;
}
@media (min-width: 1320px){
    .login-form-collaborator .form-card{
        width: 652px !important;
    }
    .login-hicitty .hoster-logo{
        width: 509px !important;
    }
}

@media (min-width: 1020px){
    .login-form-collaborator .form-card{
        width: 630px;
    }
}
@media (max-width: 767px){
    .login-form-collaborator .form-collaborator-text::after,
    .login-form-collaborator .form-collaborator-text::before{
        content: '';
        width: 4%;
        height: 1px;
        position: absolute;
        top: 50%;
        background-color: black;
    }

    .login-form-collaborator .form-collaborator-text::before{
        left:-5%;
    }
    .login-form-collaborator .form-collaborator-text::after{
        right:-5%;
    }
}

.container-fluid-landing {
  width: 100%;
  padding-left: 12px;
  padding-right: 12px;
}
@media (min-width:300px){
    .container-fluid-landing {
        padding-left: 16px !important;
        padding-right: 16px !important;
    }
}
@media (max-width:767px){
    .container-fluid {
        padding-left: 16px !important;
        padding-right: 16px !important;
    }
}
@media (min-width:768px) and (max-width:1440px){
    .container-fluid {
        padding-left: 80px;
        padding-right: 80px
    }
}
@media (min-width:768px) {
  .container-fluid-landing {
    width: 100%;
    padding-left: 24px !important;
    padding-right: 24px !important;
  }
}

@media (min-width:1280px) {
  .container-fluid{
      max-width: 1280px;
      padding-left: 0 !important;
      padding-right: 0 !important;
      margin: auto !important;
  }
  .container-fluid-landing{
    max-width: 100%;
    padding-left: 80px !important;
    padding-right: 80px !important;
  }
 
}
@media (min-width:1441px) {
  .container-fluid-landing{
      max-width: 1280px;
      padding-left: 0 !important;
      padding-right: 0 !important;
      margin: auto !important;
  }
}

</style>
