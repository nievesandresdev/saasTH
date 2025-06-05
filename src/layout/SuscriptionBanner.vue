<template>
    <div
      class="px-3.5 md:px-6 h-10 w-full hbg-green-600 flex justify-between items-center"
      :class="data.status == 1 ? 'hbg-green-600' : 'hbg-alert-negative'"
    >
      <div class="flex items-center">
        <span v-if="data.status == 1" class="text-sm font-medium hbg-green-800 rounded-full text-white flex items-center justify-center mr-2 h-6 w-6">{{ data.remaining_days }}</span>
        <img
          v-else
          src="/assets/icons/1.TH.WARNING.svg" alt="warning icon"
          class="w-6 h-6 mr-2"
        >
        <p class="text-sm font-medium text-white mr-6">
          <template v-if="data.status == 1">
            Días restantes para finalizar tu prueba gratuita
          </template>
          <template v-else-if="data.status == 2">
            Tu prueba gratuita ha finalizado
          </template>
          <template v-else-if="data.status == 3">
            Tu suscripción a The Hoster ha expirado
          </template>
        </p>
        <span class="relative cursor-pointer">
          <button class="hbtn-cta py-1.5 px-2 text-sm font-medium">
            {{ data.status == 3 ? 'Renovar suscripción' : 'Suscríbete ya' }}
          </button>
          <!-- Tooltip personalizado para "Suscríbete ya" cuando data.status == 2 -->
          <div
            class="tooltip-subscribe rounded-6 shadow p-4"
            v-if="data.status == 2"
          >
            <h5 class="text-sm font-medium mb-4">
              No estás suscrito
            </h5>
            <p class="text-sm mb-4">
              Tú periodo de free trial ha concluido. Para tener acceso a la operación de tu alojamiento y poder seguir disfrutando de la experiencia TheHoster al completo contacta con nosotros y gestiona tu suscripción con nuestro comercial.
            </p>
            <p class="text-sm">
              Nuestro horario de atención es de lunes a jueves de 8:30 a 18:30 y los viernes de 8:30 a 14:30. Estaremos encantados de poder ayudarte.
            </p>
          </div>
        </span>
      </div>
      <span
        class="icon relative cursor-pointer"
        :class="data.status != 2 ? 'hidden' : ''"
      >
        <button class="btn-tol text-sm font-medium underline">
          Contacta con nosotros
        </button>
        <div class="tooltipp rounded-6 shadow p-4">
          <h5 class="text-sm font-medium mb-4">
            ¿Necesitas ayuda?
          </h5>
          <p class="text-sm mb-4">
            Encontrarás atención personalizada llamando al teléfono +34 644 237 564 o a la dirección de correo electrónico info@thehoster.io
          </p>
          <p class="text-sm">
            Nuestro horario de atención es de lunes a jueves de 8:30 a 18:30 y los viernes de 8:30 a 14:30. Estaremos encantados de poder ayudarte.
          </p>
        </div>
      </span>
    </div>
  </template>
  
  <script setup>
    import { ref, onMounted } from 'vue'
  
    const { data } = defineProps({
      data: {
        type: Object,
        default: () => ({})
      }
    })
  </script>
  
  <style scoped>
  /* Tooltip para "Suscríbete ya" */
  .tooltip-subscribe {
    position: absolute;
    background-color: #fff;
    z-index: 90000;
    color: #000;
    width: 290px;
    padding: 16px;
    text-align: left;
    min-height: 30px;
    right: -50px; /* Ajuste para que se alinee más a la derecha */
    top: 40px;
    display: none;
  }
  .relative:hover .tooltip-subscribe {
    display: block;
  }
  
  /* Tooltip para "Contacta con nosotros" */
  .tooltipp {
    position: absolute;
    background-color: #fff;
    z-index: 90000;
    color: #000;
    width: 290px;
    padding: 16px;
    text-align: left;
    min-height: 30px;
    right: 0px;
    top: 40px;
    display: none;
  }
  .icon:hover .tooltipp {
    display: block;
  }
  
  .btn-tol {
    color: #ffffff;
  }
  .btn-tol:hover {
    color: #333333;
  }
  </style>
  