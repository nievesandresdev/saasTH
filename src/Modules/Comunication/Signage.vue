<template>
    <div class="px-6">
        <!-- title section -->
        <section class="border-b hborder-gray-400 ">
            <div class="pt-5 pb-[18px] flex items-center gap-2">
                <router-link to="/webapp/promociona-webapp">
                    <img class="w-6 h-6" src="/assets/icons/1.TH.ARROW.LEFT.svg" alt="">
                </router-link>
                <h1 class="text-[24px] font-medium leading-[110%]">Señalética</h1>
                <BaseTooltipResponsive
                    size="l"
                    :top="30"
                    :left="0"
                >
                    <template #button>
                        <img class="w-5 h-5" src="/assets/icons/TH.INFO.GREEN.svg">
                    </template>
                    <template #content>
                        <p class="text-sm leading-[150%] font-normal">
                            -
                        </p>
                    </template>
                </BaseTooltipResponsive>
            </div>
        </section>
        <section class="mt-6 rounded-[20px] p-6 bg-white shadow-hoster">
            <h1 class="text-base font-semibold leading-[120%]">Instrucciones Generales:</h1>
            <p class="mt-2 text-base leading-[140%]">Te sugerimos diferentes formas de promocionar e incentivar a tus huéspedes a acceder a tu WebApp. Puedes instertar el código QR de acceso en diferentes medios físicos:</p>
            <!-- cards -->
            <div class="flex">
                <div class="mt-4 grid grid-cols-2 3xl:grid-cols-4 gap-6">
                    <!-- card -->
                    <div class="bg-white w-[363px]" v-for="(card, index) in signageCards1" :key="card">
                        <h3 class="text-base font-medium leading-[140%]">{{ card.title }}</h3>
                        <p class="text-sm leading-[140%] h-10 mt-2">{{ card.text }}</p>
                        <img class="shadow-hoster w-full h-[357px] mt-4" :src="`/assets/img/communications/signage/signage-${index+1}.svg`" alt="">
                    </div>
                </div>
            </div>

            <h4 class="mt-6 text-base font-semibold leading-[120%]">¿Dónde colocarlos?</h4>
            <p class="mt-2 text-sm leading-[140%]">Recuerda colocarlos en un lugar visible y donde pasen tus huéspedes a menudo, como sugerencias te recomendamos los siguientes lugares:</p>
            
            <div class="flex">
                <div class="mt-6 grid grid-cols-2 3xl:grid-cols-4 gap-x-6 gap-y-8">
                    <!-- card -->
                    <div class="bg-white w-[363px]" v-for="(card, index) in signageCards2" :key="card">
                        <img class="w-full h-[208px]" :src="`/assets/img/communications/signage/signage-2-${index+1}.svg`" alt="">
                        <h3 class="text-base font-medium leading-[140%] text-center mt-4">{{card.title}}</h3>
                    </div>
                </div>
            </div>
        </section>

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
import BaseTooltipResponsive from "@/components/BaseTooltipResponsive.vue";
import QRCardUrl from './components/QRCardUlr.vue'

const signageCards1 = [
    {title:'Displays Físicos',text:'Promociona tu WebApp a través de displays físicos en tu hotel.'},
    {title:'Pegatinas',text:'Coloca el código QR a pegatinas corporativas'},
    {title:'Colgadores',text:'Coloca el código QR a colgadores en la puertas de las habitaciones'},
    {title:'Expositores',text:'Coloca el código QR en los expositores'},
]

const signageCards2 = [
    {title:'Recepción'},
    {title:'Lobby'},
    {title:'Lugares recreativos'},
    {title:'Habitaciones'},
]
</script>
