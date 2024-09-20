<template>
    <HeadSection />
    <!-- slider -->
    <section class="px-6 mt-6">
        <div class="rounded-[20px] shadow-hoster p-6 bg-white">
            <h1 class="text-base font-semibold leading-[120%]">Instrucciones de configuración para mensaje en Booking</h1>
            <p class="mt-2 text-sm leading-[140%]">Aquí te ofrecemos una guía detallada paso a paso para personalizar tu mensaje de confirmación de reserva en Booking</p>
            <p class="mt-4 text-sm font-semibold leading-[120%]">
                Para editar el mensaje, debes ingersar en la extranet de Booking: 
                <a 
                    href="https://admin.booking.com/" 
                    target="_blank" 
                    class="text-base htext-green-800 underline hover:underline font-normal"
                >
                    https://admin.booking.com/
                </a>
            </p>
            <div class="mt-2">
                <Carousel    
                    concept="booking"
                    :texts="textsCarousel"
                />
            </div>
        </div>
    </section>

    <!-- tools -->
    <section class="px-6 mt-6 mb-20">
        <div class="rounded-[20px] shadow-hoster p-6 bg-white max-w-[1092px]">
            <h1 class="text-base font-semibold leading-[120%]">Caja de herramientas:</h1>
            <p class="mt-2 text-sm leading-[120%]">Aquí encontrarás el contenido necesario para copiar y pegar en tu mensaje de confirmación de reserva de la OTA.</p>
            <div class="mt-4 flex justify-between items-start">
                <CopyInfoCard />
                <QRCardUrl/>
            </div>
            <div class="mt-8">
                <CopyUrlCard />
            </div>
        </div>
    </section>

</template>
<script setup>
import HeadSection from './HeadSection.vue';
import CopyInfoCard from '../components/CopyInfoCard.vue';
import Carousel from '../components/CarouselCommunications.vue'
import QRCardUrl from '../components/QRCardUlr.vue'
import CopyUrlCard from '../components/CopyUrlCard.vue'

const textsCarousel = [
    '',
    '1. En la extranet, haz clic en <strong>Establecimiento</strong> y luego selecciona <strong>Preferencias de mensajes</strong>.',
    '2. Haz clic en <strong>Editar</strong> en la <strong>plantilla de reserva</strong> del alojamiento que hayas seleccionado.',
    '3. <strong>Copia y pega</strong> de tu sección de herramientas (más abajo) el mensaje que vas a colocar en tu OTA ',
    '4. <strong>Guarda</strong> los cambios realizados en la plantilla.',
];


</script>