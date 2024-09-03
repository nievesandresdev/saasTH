<template>
    <HeadSection />
    <!-- slider -->
    <section class="px-6 mt-6">
        <div class="rounded-[20px] shadow-hoster p-6 bg-white">
            <h1 class="text-base font-semibold leading-[120%]">Instrucciones de configuración de Booking</h1>
            <p class="mt-2 text-sm leading-[140%]">Te ofrecemos una explicación detallada de la configuración del mensaje de reserva en Booking, paso a paso.</p>
            <p class="mt-4 text-sm font-semibold leading-[120%]">
                Primero ingresa a la extranet de booking:
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
        <div class="rounded-[20px] shadow-hoster p-6 bg-white">
            <h1 class="text-base font-semibold leading-[120%]">Caja de herramientas:</h1>
            <p class="mt-2 text-sm leading-[120%]">Aquí encontrarás todo lo necesario (mensaje, enlace y QR) listo para copiar y pegar en tu mensaje de reserva de la OTA.</p>
            <div class="mt-4 flex justify-between items-start">
                <CopyInfoCard :text="copyTextInfo"/>
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
import { $urlBaseWebapp } from '@/utils/helpers';

const urlBase = $urlBaseWebapp();

const textsCarousel = [
    '',
    '1. En la extranet, haz clic en <strong>Establecimiento</strong> y luego selecciona <strong>Preferencias de mensajes</strong>.',
    '2. Haz clic en <strong>Editar</strong> en la <strong>plantilla de reserva</strong> del alojamiento que hayas seleccionado.',
    '3. <strong>Copia y pega</strong> de tu sección de herramientas (más abajo) el mensaje que vas a colocar en tu OTA ',
    '4. <strong>Guarda</strong> los cambios realizados en la plantilla.',
];

const copyTextInfo = `
    <p style="font-size:14px;font-weight: 500;line-height: 140%;">
        Estimado huésped,<br/>
        Deseamos que su estancia sea cómoda y placentera. Nuestro equipo está a su disposición para cualquier necesidad que pueda surgir.<br/><br/><br/>
        Te invitamos a explorar nuestra WebApp, donde encontrarás la información sobre nuestras instalaciones y servicios. Además, descubre nuestras recomendaciones de experiencias y restaurantes seleccionados. Lo mejor de la ciudad, sin necesidad de descargar nada.<br/>
        Prueba nuestra WebApp click <a href="${urlBase}" style="text-decoration: underline;color:#0B6357;">aquí</a>.<br/>
        ${urlBase}
    </p>
`
</script>