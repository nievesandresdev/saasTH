<template>
  <section id="collaborator-login">
    <!-- <notify v-if="$page.props.flash" :key="$page.props.flash.id"/> -->
    <LoadingAuth :show="false"/>
    <div class="flex items-center container-fluid-landing h-screen">
      <div class="hidden lg:flex justify-around w-full h-min">
        <div class="flex items-center login-hicitty w-max h-min">
          <div>
            <img class="hoster-logo mx-auto cursor-pointer" src="/assets/img/hoster/th_logo.png" alt="" @click="redirect">
            <div class="my-10  mx-auto" style="width: 300px;">
              <div class="p-6 text-center border border-gray-300 rounded-xl my-10  mx-auto">
                <h3 class="text-lg font-light">¿Necesitas ayuda?</h3>
                <p class="text-sm mt-2">Encontrarás atención especializada enviando un whatsapp al siguiente teléfono:</p>
                <h3 class="text-base font-normal mt-2">(+34) 624 149 605</h3>
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
            <form @submit.prevent="submit">
              <h1 class="text-xl lg:text-22xl  hmb-4 lg:mb-6 font-medium text-center">¡Bienvenid@ a TheHoster!</h1>
              <div class="hmb-4 lg:mb-6 flex flex-col">
                <label class="font-medium text-lg mb-1">Correo electrónico</label>
                <input 
                  type="text"
                  class="w-100 rounded h-11 lg:h-14 py-1 text-sm border placeholder-gray-300  text-black border-black focus:border-black" 
                  :placeholder="placeholderEmail" 
                  autocomplete="on" 
                  v-model="form.email" 
                  required
                >
              </div>
              <div class="mb-2">
                <label class="font-medium text-lg mb-1">Contraseña</label>
                <div class="relative w-100 collaborator-box">
                  <img v-if="form.password == ''" class="absolute cursor-pointer w-5 right-2.5 top-4 2xl:top-6" src="/assets/img/hoster/icons/hideeye.svg">
                  <img v-if="form.password !== '' && visible_pass" class="absolute cursor-pointer w-5 right-2.5 top-4 2xl:top-5" src="/assets/img/hoster/icons/showeye.svg" @click="showPass('password',false)">
                  <img v-if="form.password !== '' && !visible_pass" class="absolute cursor-pointer w-5 right-2.5 top-4 2xl:top-5" src="/assets/img/hoster/icons/disableeye.svg" @click="showPass('password',true)">
                  <input 
                    :type="visible_pass ? 'text' : 'password'"
                    class="w-full rounded h-11 lg:h-14 py-4 px-4 text-sm border placeholder-gray-300 text-black border-black focus:border-black" 
                    id="password" 
                    :placeholder="placeholderPassword"
                    v-model="form.password" required
                  >
                </div>
              </div>
              <div class="row justify-content-lg-between">
                <div class="form-remember col-10 col-lg-4 text-left">
                  <input type="checkbox" v-model="form.remember" class="border mr-1 h-6 w-5 rounded">
                  <p class="inline text-sm">Recuérdame</p>
                </div>
                <div class="forgot-password text-left text-lg-right  col-10 col-lg-6 pt-1">
                  <a href="javascript:void(0)" class="text-sm font-medium" @click="openForgotPasswordModal">He olvidado mi contraseña</a>
                </div>
              </div>
              <div class="mt-6 lg:mt-8 text-center">
                <button 
                  type="submit" 
                  class="hbtn-cta w-full lg:w-8/12 h-14 rounded-lg text-base font-medium" 
                  :disabled="form.processing"
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
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
//import { usePage, useForm } from '@inertiajs/inertia-vue3';
import LoadingAuth from './Components/LoadingAuth.vue';

const form = ref({
  email: localStorage.getItem("user_email_form") ? localStorage.getItem("user_email_form") : '',
  password: localStorage.getItem("pass_email_form") ? localStorage.getItem("pass_email_form") : '',
  remember: localStorage.getItem("remember_form") ? (localStorage.getItem("remember_form") === 'true') : false
});

const placeholderEmail = ref('Introduce tu email');
const placeholderPassword = ref('********');
const showValidation = ref(true);
/* const forgot = ref({ email: '' });
const errorsKey = ref([]); */
const visiblePass = ref(false);

onMounted(() => {
  console.log(localStorage.getItem("pass_email_form"));
});



const showPass = (id, bool) => {
  visiblePass.value = bool;
  const input = document.getElementById(id);
  input.type = input.type === 'password' ? 'text' : 'password';
};


const openForgotPasswordModal = () => {
  showValidation.value = false;
};


</script>
<style scoped>

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
</style>
