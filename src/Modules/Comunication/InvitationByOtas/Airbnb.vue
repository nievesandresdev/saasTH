<template>
    <HeadSection />
    <!-- slider -->
    <section class="px-6 mt-6">
        <div class="rounded-[20px] shadow-hoster p-6 bg-white">
            <h1 class="text-base font-semibold leading-[120%]">Instrucciones de configuración de Airbnb</h1>
            <p class="mt-2 text-sm leading-[140%]">Te ofrecemos una explicación detallada de la configuración del mensaje de reserva en Airbnb, paso a paso.</p>
            <p class="mt-4 text-sm font-semibold leading-[120%]">
                Primero ingresa a Airbnb: 
                <a 
                    href="https://www.airbnb.es/hosting" 
                    target="_blank" 
                    class="text-base htext-green-800 underline hover:underline font-normal"
                >
                    https://www.airbnb.es/hosting
                </a>
            </p>
            <div class="mt-2">
                <Carousel    
                    concept="airbnb"
                    :texts="textsCarousel"
                    :numberPages="5"
                />
            </div>
        </div>
    </section>

    <!-- tools -->
    <section class="px-6 mt-6 mb-20">
        <div class="rounded-[20px] shadow-hoster p-6 bg-white max-w-[1092px]">
            <h1 class="text-base font-semibold leading-[120%]">Caja de herramientas:</h1>
            <p class="mt-2 text-sm leading-[120%]">Aquí encontrarás todo lo necesario (mensaje, enlace y QR) listo para copiar y pegar en tu mensaje de reserva de la OTA.</p>
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
    '1. Dirígete a mensajes',
    '2. Haz click en el ícono de ajustes de mensajes',
    '3. Haz clic en <strong>Mensajes programados</strong>',
    '4. <strong>Selecciona la plantilla</strong> del mensaje de reserva del alojamiento.',
    '4. <strong>Copia y pega</strong> de tu sección de herramientas (más abajo) el mensaje que vas a colocar en tu OTA ',
];

</script>