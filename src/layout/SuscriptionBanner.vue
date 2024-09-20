<template>
    <div
        class="px-3.5 md:px-6 h-10 w-full hbg-green-600 flex justify-between items-center"
        :class="(true) ? 'hbg-green-600' : 'hbg-alert-negative'"
    >
        <div class="flex items-center">
            <span v-if="true" class="text-sm font-medium hbg-green-800 rounded-full text-white flex items-center justify-center mr-2 h-6 w-6">{{ remaining_days }}</span>
            <img
            v-else
            src="/vendor_asset/img/partner/icons/warning.svg" alt="warning icon"
            class="w-6 h-6 mr-2"
            >
            <p

            class="text-sm font-medium text-white mr-6"
            >
            <template v-if="true">
                Días restantes para finalizar tu prueba gratuita
            </template>
            <template v-else-if="false">
                Tu prueba gratuita ha finalizado
            </template>
            <template v-else-if="false">
                Tu suscripción a The Hoster ha expirado
            </template>
            </p>
            <button
                class="hbtn-cta py-1.5 px-2 text-sm font-medium"
            >
            {{ false ? 'Renovar suscripción' : 'Suscríbete ya' }}
            </button>
        </div>
        <span
            class="icon relative cursor-pointer hidden"
        >
            <button class="btn-tol text-sm font-medium underline">
                Contacta con nosotros
            </button>
            <div class="tooltipp rounded-6 shadow p-4">
                <h5 class="text-sm font-medium mb-4">
                    ¿Necesitas ayuda?
                </h5>
                <p class="text-sm mb-4">
                    Encontrarás atención personalizada llamando al teléfono +34 624 149 605 o a la dirección de correo electrónico info@thehoster.io
                </p>
                <p class="text-sm">
                    Nuestro horario de atención es de lunes a jueves de 8:30 a 18:30 y los viernes de 8:30 a 14:30. Estaremos encantados de poder ayudarte.
                </p>
            </div>
        </span>
    </div>    
</template>