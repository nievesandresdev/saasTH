<template>
    <div class="px-6"> 
        <!-- head -->
        <section class="pt-5 border-b hborder-gray-400 pb-[18px]">
            <div class="flex items-center gap-2">
                <router-link to="/comunicaciones">
                    <img class="w-6 h-6" src="/assets/icons/1.TH.ARROW.LEFT.svg" alt="">
                </router-link>
                <h1 class="text-[24px] font-medium leading-[110%]">Desde tu PMS</h1>
            </div>
        </section>

        <!-- instructions -->
        <section class="mt-6 rounded-[20px] py-6 px-4 bg-white shadow-hoster">
            <div class="flex gap-[48px] items-start">
                <div class="">
                    <p class="text-base font-semibold leading-[120%]">Instrucciones Generales:</p>
                    <p class="text-sm leading-[140%] mt-2">Para editar un mensaje en tu PMS, primero accede al módulo correspondiente donde gestionas las comunicaciones con tus huéspedes. Desde allí, busca el mensaje específico que deseas modificar en la lista de mensajes o en el historial de comunicaciones.</p><br>
                    <p class="text-sm font-semibold leading-[120%]">¿Cómo hacer las modificaciones?</p>
                    <p class="text-sm leading-[140%]">Una vez localizado el mensaje, edita el texto asegurándote de que sea claro, profesional y alineado con la imagen de tu establecimiento. Luego, guarda los cambios realizados para que el nuevo mensaje quede disponible para su uso futuro.</p><br>
                    <p class="text-sm leading-[140%]">Finalmente, revisa que la actualización se haya efectuado correctamente y que el mensaje esté listo para ser enviado a los huéspedes cuando sea necesario.</p>
                </div>
                <img class="w-[404px] h-[352px]" src="/assets/img/communications/from-pms.png" alt="">
            </div>
        </section>
        <!-- tools -->
        <section class="mt-6 mb-20 rounded-[20px] shadow-hoster py-6 px-4 bg-white max-w-[1092px]">
            <h1 class="text-base font-semibold leading-[120%]">Caja de herramientas:</h1>
            <p class="mt-2 text-sm leading-[120%]">Aquí encontrarás todo lo necesario (mensaje, enlace y QR) listo para copiar y pegar en tu mensaje de reserva de la OTA.</p>
            <div class="mt-4 flex justify-between items-start">
                <CopyInfoCard />
                <QRCardUrl/>
            </div>
            <div class="mt-8">
                <CopyUrlCard />
            </div>
        </section>
    </div>
</template>
<script setup>
import CopyInfoCard from './components/CopyInfoCard.vue';
import QRCardUrl from './components/QRCardUlr.vue'
import CopyUrlCard from './components/CopyUrlCard.vue'
</script>