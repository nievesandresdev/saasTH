<template>
    <div class="px-6"> 
        <!-- head -->
        <section class="pt-5 border-b hborder-gray-400 pb-[18px]">
            <div class="flex items-center gap-2">
                <router-link to="/comunicaciones">
                    <img class="w-6 h-6" src="/assets/icons/1.TH.ARROW.LEFT.svg" alt="">
                </router-link>
                <h1 class="text-[24px] font-medium leading-[110%]">Desde tu Web</h1>
            </div>
        </section>

        <!-- instructions -->
        <section class="mt-6 rounded-[20px] py-6 px-4 bg-white shadow-hoster">
            <div class="flex gap-[48px] items-start">
                <div class="">
                    <p class="text-base font-semibold leading-[120%]">Instrucciones Generales:</p>
                    <p class="text-sm leading-[140%] mt-2">Puedes añadir un enlace o imagen en tu sitio web para ofrecer a tus huéspedes un acceso directo a la WebApp. Esto permitirá que tus huéspedes encuentren fácilmente toda la información relevante sobre su estancia, incluyendo detalles sobre las instalaciones, servicios, y recomendaciones locales.</p>
                    
                    <p class="text-base font-semibold leading-[120%] mt-6">¿Donde colocarlo en tu web?</p>
                    <p class="text-sm leading-[140%] mt-2">Puedes incorporarlo en el sistema de usuarios o incluirlo en el resumen de confirmación de la reserva de tu alojamiento.</p> <br>
                    <p class="text-sm leading-[140%]">También puedes crear banners para ello puedes usar programas de diseño como Canva, Adobe Spark o cualquier otro software de diseño que prefieras.</p>
                </div>
                <img class="w-[404px] h-[352px]" src="/assets/img/communications/your-web.svg" alt="">
            </div>
        </section>
        <!-- tools -->
        <section class="mt-6 mb-20 rounded-[20px] shadow-hoster py-6 px-4 bg-white max-w-[1092px]">
            <h1 class="text-base font-semibold leading-[120%]">Caja de herramientas:</h1>
            <p class="mt-2 text-sm leading-[120%]">Aquí encontrarás todo lo necesario (mensaje, enlace y QR) listo para copiar y pegar en tu sitio Web.</p>
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