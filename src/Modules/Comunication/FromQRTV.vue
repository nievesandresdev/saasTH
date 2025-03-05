<template>
    <div class="px-6">
        <!-- head -->
        <section class="pt-5 border-b hborder-gray-400 pb-[18px]">
            <div class="flex items-center gap-2">
                <router-link to="/promociona-webapp">
                    <img class="w-6 h-6" src="/assets/icons/1.TH.ARROW.LEFT.svg" alt="">
                </router-link>
                <h1 class="text-[24px] font-medium leading-[110%]">Códigos QR en TVs</h1>
            </div>
        </section>

        <!-- slider -->
        <section class="mt-6">
            <div class="rounded-[20px] shadow-hoster p-6 bg-white">
                <h1 class="text-base font-semibold leading-[120%]">Instrucciones Generales:</h1>
                <p class="mt-2 text-sm leading-[140%]">Con esto podrás facilitar a los huéspedes el acceso a la WebApp del hotel, donde podrán disfrutar de diversas ventajas y servicios, mediante la colocación de un código QR en la pantalla de la TV de sus habitaciones. </p>
                <h1 class="text-base font-semibold leading-[120%] mt-8">¿Cómo puedo agregar el código QR en la pantalla de la Smart TV?</h1>
                <div class="mt-4">
                    <Carousel    
                        concept="qrtv"
                        directoryImages="qrtv"
                        :numberPages="5"
                        :texts="textsCarousel"
                        heightDescriptionSlide="60px"
                        heightSlide="458px"
                    />
                </div>
            </div>
        </section>

        <!-- tools -->
        <section class="mt-6 mb-20 rounded-[20px] shadow-hoster p-6 bg-white max-w-[546px]">
            <h1 class="text-base font-semibold leading-[120%]">Caja de herramientas:</h1>
            <p class="mt-2 text-sm leading-[140%]">En esta sección encontrarás las herramientas necesarias para poder promocionar tu WebApp.</p>
            <div class="mt-4 w-[228px]">
                <QRCardUrl/>
            </div>
        </section>
    </div>

</template>
<script setup>
import CopyInfoCard from './components/CopyInfoCard.vue';
import Carousel from './components/CarouselCommunications.vue'
import QRCardUrl from './components/QRCardUlr.vue'
import CopyUrlCard from './components/CopyUrlCard.vue'

const textsCarousel = [
    '',
    '1.1 Si tiene una Smart TV con navegador web:. Guarde la imagen del código QR en una memoria USB.',
    '1.2 Inserte la memoria USB en la TV y acceda a la imagen a través del navegador de archivos de la TV. Luego en los ajustes de la TV inserte la imágen como salva pantalla.',
    '<p>2.1 Si usa un cable HDMI</p><p>2.2 Conecte su computadora o dispositivo móvil a la TV usando un cable HDMI envié la imagen a la TV .Luego en los ajustes de la TV inserte la imágen como salva pantalla.</p>',
    '<p>3.1 Si usa un dispositivo de streaming (Chromecast, Fire Stick, etc.):</p><p>3.2 Envíe la imagen del código QR desde su dispositivo móvil o computadora a la TV utilizando la función de duplicación de pantalla o casting. Luego en los ajustes de la TV inserte la imágen como salva pantalla.</p>',
    '4.  Finalmente, encienda la TV y asegúrese de que esté en el modo correcto (USB, HDMI, o entrada correspondiente al dispositivo de streaming) y compruebe la visualización de la imagen del código QR en la TV como salva pantalla.'
];

</script>