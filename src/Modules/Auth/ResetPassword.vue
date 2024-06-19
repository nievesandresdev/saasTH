<template>
    <div>
      <form @submit.prevent="resetPassword">
        <div class="mb-4">
          <h1 class="text-lg font-medium text-center mb-4">Restablece tu contraseña</h1>
          <div v-if="message" class="text-center text-green-600 mt-2">{{ message }}</div>
          <div v-if="error" class="text-center text-red-600 mt-2">{{ error }}</div>
          <div class="flex flex-col mb-4">
            <label for="email" class="font-medium text-sm">Correo electrónico</label>
            <input
              v-model="email"
              type="email"
              class="rounded border-1 w-full py-2 text-sm"
              :class="errors.email ? 'border-red-400' : 'border-gray-400'"
              placeholder="Correo Electrónico"
              required
              autofocus
              autocomplete="username"
            >
          </div>
          <div class="flex flex-col mb-4">
            <label for="password" class="font-medium text-sm">Nueva Contraseña</label>
            <input
              v-model="password"
              type="password"
              class="rounded border-1 w-full py-2 text-sm"
              :class="errors.password ? 'border-red-400' : 'border-gray-400'"
              placeholder="Nueva Contraseña"
              required
              autocomplete="new-password"
            >
          </div>
          <div class="flex flex-col mb-4">
            <label for="password_confirmation" class="font-medium text-sm">Confirmar Contraseña</label>
            <input
              v-model="password_confirmation"
              type="password"
              class="rounded border-1 w-full py-2 text-sm"
              :class="errors.password_confirmation ? 'border-red-400' : 'border-gray-400'"
              placeholder="Confirmar Contraseña"
              required
              autocomplete="new-password"
            >
          </div>
          <div class="flex justify-center">
            <button 
              type="submit" 
              class="hbtn-cta w-full h-10 rounded-lg text-base font-medium" 
              :disabled="processing"
              :class="{ 'opacity-25': processing }"
            >
              Restablecer Contraseña
            </button>
          </div>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  //import { resetPassword, verifyToken } from '../api/services/auth';
  import { useRoute,useRouter } from 'vue-router';
  
  const route = useRoute();
  const router = useRouter();
  const token = ref(route.params.token);
  const email = ref(route.query.email);
  const password = ref('');
  const password_confirmation = ref('');
  const processing = ref(false);
  const message = ref('');
  const error = ref('');
  const errors = ref({});
  
  const checkTokenValidity = async () => {
  /* try {
    await verifyToken(token.value, email.value);
  } catch (err) {
    error.value = err.response?.data?.message || 'El token de restablecimiento de contraseña es inválido o ha expirado.';
    router.push({ name: 'LoginPage', query: { tokenExpired: true } });
  } */
 console.log('checkTokenValidity',token);
  //router.push({ name: 'LoginPage', query: { tokenExpired: true } });
};

onMounted(() => {
  checkTokenValidity();
});
  
  const resetPassword = async () => {

    alert('resetPassword');
    /* processing.value = true;
    message.value = '';
    error.value = '';
    errors.value = {};
  
    try {
      const response = await resetPassword({
        token: token.value,
        email: email.value,
        password: password.value,
        password_confirmation: password_confirmation.value
      });
      message.value = response.data.message;
    } catch (err) {
      error.value = err.response?.data?.message || 'Ha ocurrido un error';
      errors.value = err.response?.data?.errors || {};
    } finally {
      processing.value = false;
    } */
  };
  </script>
  
  <style scoped>
  /* Agrega tus estilos personalizados aquí */
  </style>
  