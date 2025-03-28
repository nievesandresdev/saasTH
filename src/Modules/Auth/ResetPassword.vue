<template>
    <section class=" flex items-center container-fluid-landing h-screen"> 
        <div class="grid grid-cols-2 w-full h-min">
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
                  <form @submit.prevent="resetPassword">
                    <h1 class="text-xl lg:text-22xl  hmb-4 lg:mb-6 font-medium text-center">Restablecer contraseña</h1>
                    <div class="mb-[13px] flex flex-col gap-2">
                      <label class="text-sm font-medium leading-[140%] block mb-2">Correo electrónico</label>
                      <input 
                        type="text"
                        class="w-full th-Input" 
                        :placeholder="placeholderEmail" 
                        autocomplete="on" 
                        v-model="email"
                        readonly 
                        required
                      >
                    </div>
                    <div class="mb-[13px] flex flex-col gap-2">
                      <label class="font-medium text-[14px]">Contraseña</label>
                      <div class="relative w-100 collaborator-box">
                        <!-- <img v-if="form.password == ''" class="absolute cursor-pointer w-5 right-2.5 top-4 2xl:top-6" src="/assets/img/hoster/icons/hideeye.svg">
                        <img v-if="form.password !== '' && visible_pass" class="absolute cursor-pointer w-5 right-2.5 top-4 2xl:top-5" src="/assets/img/hoster/icons/showeye.svg" @click="showPass('password',false)">
                        <img v-if="form.password !== '' && !visible_pass" class="absolute cursor-pointer w-5 right-2.5 top-4 2xl:top-5" src="/assets/img/hoster/icons/disableeye.svg" @click="showPass('password',true)"> -->
                        <input 
                          :type="visible_pass ? 'text' : 'password'"
                          class="w-full th-Input" 
                          id="password" 
                          :class="{
                            'border-input-error' : errorPassword,
                          }"
                          placeholder="Contraseña"
                          v-model="form.password" required
                        >
                      </div>
                      <div v-if="errorPassword" class="flex items-center mt-1">
                          <img class="inline w-4 h-4 mr-2" src="/assets/icons/1.TH.WARNING.RED.svg">
                          <p class="text-xs leading-[90%] htext-alert-negative">{{ errorPasswordMessage }}</p>
                      </div>
                      <!-- <div class="flex htext-alert-negative justify-left" v-if="errorPassword">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="mr-2 bi bi-exclamation-triangle-fill w-4 h-4" viewBox="0 0 16 16">
                              <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                            </svg>
                            <p class="text-xs htext-alert-negative">{{ errorPasswordMessage }}</p>
                        </div> -->
                    </div>
                    <div class="mb-2 flex flex-col gap-2">
                      <label class="font-medium text-[14px]">Confirmar contraseña</label>
                      <div class="relative w-100 collaborator-box">
                        <!-- <img v-if="form.password_confirmation == ''" class="absolute cursor-pointer w-5 right-2.5 top-4 2xl:top-6" src="/assets/img/hoster/icons/hideeye.svg">
                        <img v-if="form.password_confirmation !== '' && visible_pass_confirm" class="absolute cursor-pointer w-5 right-2.5 top-4 2xl:top-5" src="/assets/img/hoster/icons/showeye.svg" @click="showPass('password_confirmation')">
                        <img v-if="form.password_confirmation !== '' && !visible_pass_confirm" class="absolute cursor-pointer w-5 right-2.5 top-4 2xl:top-5" src="/assets/img/hoster/icons/disableeye.svg" @click="showPass('password_confirmation')"> -->
                        <input 
                          :type="visible_pass_confirm ? 'text' : 'password'"
                          class="w-full th-Input" 
                          id="password_confirmation" 
                          :class="{
                            'border-input-error' : errorPasswordMatch,
                          }"
                          placeholder="Confirma tu contraseña"
                          v-model="form.password_confirmation" required
                        >
                      </div>
                      <div v-if="errorPasswordMatch" class="flex items-center mt-1">
                          <img class="inline w-4 h-4 mr-2" src="/assets/icons/1.TH.WARNING.RED.svg">
                          <p class="text-xs leading-[90%] htext-alert-negative">{{ errorPasswordMatchMessage }}</p>
                      </div>
                    </div>
                    <div class="mb-2 htext-alert-negative text-sm text-center">{{ error }}</div>
                    <div class="mt-6 lg:mt-8 text-center">
                      <button 
                        type="submit" 
                        class="hbtn-cta w-full lg:w-8/12 h-[44px] rounded-lg text-base font-medium disabled:bg-[#DADADA] disabled:cursor-not-allowed" 
                        :disabled="!isValidForm"
                      >
                        Restablecer contraseña
                      </button>
                    </div>
                  </form>
                </div>
            </div>
        </div>
    </section>
  </template>
  
  <script setup>
  import { ref, onMounted,computed, watch} from 'vue';
  import {  verifyToken,changePassword,checkCurrentPassword } from '@/api/services/auth';
  import { useRoute,useRouter } from 'vue-router';
  
  const route = useRoute();
  const router = useRouter();
  const token = ref(route.params.token);
  const email = ref(route.query.email);

  const error = ref('');

  const visible_pass = ref(false);
  const visible_pass_confirm = ref(false);

  const errorPassword = ref(false);
  const errorPasswordMatch = ref(false);

  const form = ref({
    email: '',
    password: '',
    password_confirmation: '',
    remember: false,
    processing: false,
  });

  const showPass = (id) => {
      if (id == 'password') {
          visible_pass.value = !visible_pass.value
      } else {
          visible_pass_confirm.value = !visible_pass_confirm.value
      }
        let x = document.getElementById(id);
        x.type = x.type == 'password' ? 'text' : 'password'; 
      
  };

  const isValidForm = computed(() => {
    return (
      email.value.trim() !== '' &&
      form.value.password.trim() !== '' &&
      form.value.password_confirmation.trim() !== '' &&
      form.value.password === form.value.password_confirmation &&
      errorPassword.value == false &&
      errorPasswordMatch.value == false
    );
  });
  
  const checkTokenValidity = async () => {
  try {
    const response = await verifyToken({ token: token.value, email: email.value });
    if(!response.ok){
      router.push({ name: 'LoginPage', query: { tokenExpired: true } });
    }
  } catch (err) {
    error.value = err.response?.data?.message || 'El token de restablecimiento de contraseña es inválido o ha expirado.';
  }
};

const errorPasswordMessage = ref('');
const errorPasswordMatchMessage = ref('');
watch([() => form.value.password], async ([newPassword]) => {

      errorPassword.value = !(newPassword.length >= 8);
      
      errorPasswordMessage.value = errorPassword.value ? 'Debe tener minimo 8 caracteres' : '';


      if (newPassword.length >= 8) {
          const response = await checkCurrentPassword({ email: email.value, password: newPassword });
          if (response.ok) {
            errorPassword.value = !response.data.valid;
            errorPasswordMessage.value = errorPassword.value ? response.data.message : '';
          } else {
            errorPassword.value = false;
            errorPasswordMessage.value = '';
          }
      }
});

watch([() => form.value.password_confirmation], ([newPasswordConfirmation]) => {
  if(newPasswordConfirmation.length < 8 ){
    errorPasswordMatch.value = true;
    errorPasswordMatchMessage.value = 'Debe tener minimo 8 caracteres';
  }else if(newPasswordConfirmation !== form.value.password){
    errorPasswordMatch.value = true;
    errorPasswordMatchMessage.value = 'Las contraseñas no coinciden';
  }else{
    errorPasswordMatch.value = false;
    errorPasswordMatchMessage.value = '';
  }


  errorPasswordMatch.value = !(newPasswordConfirmation === form.value.password) || newPasswordConfirmation.length > 12;
});


onMounted(() => {
  checkTokenValidity();
});
  
  const resetPassword = async () => {

    try {
      const response = await changePassword({
        token: token.value,
        email: email.value,
        password: form.value.password,
        password_confirmation: form.value.password_confirmation,
      });
      if (response.ok) {
        router.push({ name: 'LoginPage', query: { changePassword: true } });
      }

      if(response.code == 422){
        error.value = response.data.message;
      }
      
    } catch (err) {
      error.value = err.response?.data?.message || 'Ha ocurrido un error';
    } finally {
      //form.value.processing.value = false;
    }
  };
  </script>
  
  <style scoped>
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
  