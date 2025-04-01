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
                <img class="h-10 w-10 inline-block" src="/assets/img/hoster/linkedin_black.svg" alt="">
              </a>
            </div>
          </div>
        </div>
        <div class="login-form-collaborator">
          <div class="form-card bg-white shadow rounded-2xl hp-4 lg:px-6 lg:pt-6 lg:pb-8 mx-auto">
            <form @submit.prevent="handleLogin">
              <h1 class="text-xl lg:text-22xl hmb-4 lg:mb-6 font-medium text-center">¡Bienvenid@ a TheHoster!</h1>
              <div class="hmb-4 lg:mb-6 flex flex-col">
                <label class="font-medium text-sm mb-1">Correo electrónico</label>
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
                <label class="font-medium text-sm mb-1">Contraseña</label>
                <div class="relative w-100 collaborator-box">
                  <!-- <img v-if="form.password == ''" class="absolute cursor-pointer w-5 right-2.5 top-4 2xl:top-6" src="/assets/img/hoster/icons/hideeye.svg">
                  <img v-if="form.password !== '' && visible_pass" class="absolute cursor-pointer w-5 right-2.5 top-4 2xl:top-5" src="/assets/img/hoster/icons/showeye.svg" @click="showPass('password',false)">
                  <img v-if="form.password !== '' && !visible_pass" class="absolute cursor-pointer w-5 right-2.5 top-4 2xl:top-5" src="/assets/img/hoster/icons/disableeye.svg" @click="showPass('password',true)"> -->
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

              <div class="flex justify-between mt-[6px]">
                <div class="flex items-center">
                  <input type="checkbox" v-model="form.remember" class="border hcheckbox mr-2 h-5 w-5 rounded">
                  <p class="text-sm font-normal">Recordar contraseña</p>
                </div>
                <div class="pt-1">
                  <a class="text-sm font-medium cursor-pointer underline" @click="openForgotPasswordModal">He olvidado mi contraseña</a>
                </div>
              </div>

              <div class="mt-6 lg:mt-8 text-center">
                <button 
                  type="submit" 
                  class="hbtn-cta w-full lg:w-8/12 h-[44px] rounded-lg text-base font-medium disabled:opacity-50" 
                  :disabled="authStore.loading || form.email === 'admin@email.com'  || form.email === '' || form.password === ''"
                >
                  Iniciar sesión
                </button>
              </div>
            </form>
          </div>
          
          <!-- Enlace a políticas y términos -->
          <div class="mt-6 text-center">
            <p class="text-xs">
              <a href="https://thehoster.io/privacidad" target="_blank" class="text-blue-600 hover:underline">Políticas de Privacidad</a> -
              <a href="https://thehoster.io/terminos-y-condiciones" target="_blank" class="text-blue-600 hover:underline">Términos y Condiciones</a>.
            </p>
          </div>
        </div>
      </div>
    </div>  
    <ModalWindow :isVisible="showModal" @close="closeModalPass" :width="'500px'" :paddingContent="'p-4'">
      <template #content>
        <div class="flex justify-end mb-4">
            <button @click="closeModalPass">
                <img src="/assets/icons/1.TH.CLOSE.svg" alt="1.TH.CLOSE" class="h-6 w-6">
            </button>
        </div>
        <form @submit.prevent="forgotPass">
          <div class="mb-4 flex flex-col">
            <h1 class="text-[22px] font-medium text-center mb-2">Restablece tu contraseña</h1>
            <p class="text-center text-sm mb-4">
              Introduce tu correo electrónico asociado a tu cuenta, y te enviaremos un enlace para restablecer tu contraseña. Si no recibes el correo en unos minutos, revisa tu carpeta de spam o inténtalo nuevamente.
            </p>
            <div class="flex flex-col">
              <label for="correo" class="font-medium text-sm mb-2">Correo electrónico</label>
              <BaseTextField
                v-model="forgot.email"
                type="email"
                :error="forgot.errors?.email"
                placeholder="Correo electrónico asociado a la cuenta"
                required
                autofocus
                autocomplete="forgot"
              />            
            </div>
            <div v-if="forgot.error" class="text-center text-red-600 mt-2">{{ forgot.error }}</div>
          </div>
          <div class=" flex w-full">
            <button 
              type="submit" 
              class="hbtn-cta w-full h-10 rounded-lg text-base font-medium disabled:bg-[#DADADA]" 
              :disabled="!isEmailValid"
              :class="{ 'opacity-25': forgot.processing }"
            >
              Enviar
            </button>
          </div>
        </form>
      </template>
    </ModalWindow>

    <!-- modal alert -->
    <ModalWindow v-if="showAlertModal" :isVisible="showAlertModal" @close="closeAlertModal()" :width="'330px'" :paddingContent="'p-4'">
      <template #content>
        <div class="flex flex-col items-center justify-center" v-if="route.query.tokenExpired">
          <h2 class="text-[22px] font-medium flex justify-center">Oh, lo siento</h2>
          <p class="text-center text-sm mt-2">Este enlace ha expirado, vuelva a solicitar otro.</p>
          <div class="flex justify-center mt-4 w-full">
              <button 
                type="button" 
                class="hbtn-cta w-full h-10 rounded-lg text-base font-medium" 
                @click="closeAlertModal()"
              >
                Cerrar
              </button>
            </div>
        </div>
        <div class="flex flex-col items-center justify-center" v-else-if="route.query.changePassword">
            <h2 class="text-[22px] font-medium flex justify-center">¡Contraseña actualizada!</h2>
            <p class="text-center text-sm mt-2">Se ha cambiado la contraseña exitosamente</p>
            <div class="flex justify-center mt-4 w-full">
              <button 
                type="button" 
                class="hbtn-cta w-full h-10 rounded-lg text-base font-medium" 
                @click="closeAlertModal()"
              >
                Cerrar
              </button>
            </div>
          </div>

        <div class="flex flex-col items-center justify-center" v-else-if="forgot.success">
          <h2 class="text-[22px] font-medium flex justify-center w-full mb-2">{{ forgot.title }}</h2>
          <p class="text-center text-sm mt-2">{{ forgot.msg }}</p>
          <div class="flex justify-center mt-4 w-full">
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
import { ref, onMounted,computed } from 'vue';
import { useAuthStore } from '@/stores/modules/auth/login';
import LoadingAuth from './Components/LoadingAuth.vue';
import { useUserStore } from '@/stores/modules/users/users'
import ModalWindow from '@/components/ModalWindow.vue'; 
import { resetPassword } from '@/api/services/auth';
import BaseTextField from '@/components/Forms/BaseTextField';
import { useRoute, useRouter } from 'vue-router';

const authStore = useAuthStore();

const params = new URLSearchParams(window.location.search)

const form = ref({
  email: localStorage.getItem("user_email_form") ? localStorage.getItem("user_email_form") : '',
  password: localStorage.getItem("pass_email_form") ? localStorage.getItem("pass_email_form") : '',
  remember: localStorage.getItem("remember_form") ? (localStorage.getItem("remember_form") === 'true') : false
});

const placeholderEmail = ref('Escribe texto');
const placeholderPassword = ref('Contraseña');

const visiblePass = ref(false);
const showModal = ref(false);

const showAlertModal = ref(false);
const route = useRoute();
const router = useRouter();

const user = useUserStore();

// Computed property to check if the email is valid
const isEmailValid = computed(() => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailPattern.test(forgot.value.email)
})

const forgot = ref({
  email: '',
  processing: false,
  success: false,
  msg : '',
  error: '',
  errors: null,
  title: ''
});

onMounted(async () => {
  if (route.query.tokenExpired || route.query.changePassword) {
    showAlertModal.value = true;
  }

  const emailURL = params.get('u')
  const passwordURL = params.get('p')

  if (emailURL) {
    form.value.email = emailURL
    localStorage.setItem("user_email_form", emailURL)
  }
  if (passwordURL) {
    form.value.password = passwordURL
    localStorage.setItem("pass_email_form", passwordURL)
  }
  
  if(emailURL && passwordURL){
    //alert('holaMountedLoginPage')
    await authStore.logout()
    if (emailURL && passwordURL) {
      await authStore.logout();
      form.value.email = emailURL
      form.value.password = passwordURL
      await authStore.login({
        email: form.value.email,
        password: form.value.password
      });
      const loginButton = document.querySelector('button[type="submit"]');
      if (loginButton && !loginButton.disabled) {
        loginButton.click(); 
      }
    }
  }

  
});

onMounted(async() => {
  // Capturar parámetros de la URL
  const token = route.query.token;


  if (token) {
    // Primero, cerrar cualquier sesión existente
    await authStore.logout();
    // Almacenar en localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('login_from', 'admin');

    

    const params = {
      token: token
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
    localStorage.setItem("user_email_form", form.value.email);
    localStorage.setItem("pass_email_form", form.value.password);
    localStorage.setItem("remember_form", form.value.remember);
  } else {
    localStorage.removeItem("user_email_form");
    localStorage.removeItem("pass_email_form");
    localStorage.removeItem("remember_form");
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
