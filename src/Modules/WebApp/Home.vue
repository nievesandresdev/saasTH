<template>
    <div class="h-screen px-[24px] bg-[#FAFAFA] overflow">
        <div class="pb-1">
            <section class="flex justify-between items-center py-[20px] border-b border-[#BFBFBF]">
                <div class="space-x-2 flex">
                    <h1 class="font-medium text-[22px]">WebApp</h1>
                    <BaseTooltipResponsive
                        size="l"
                        :top="30"
                        :left="0"
                    >
                        <template #button>
                            <img class="w-[24px] h-[24px]" src="/assets/icons/TH.INFO.GREEN.svg">
                        </template>
                        <template #content>
                            <p class="text-sm leading-[150%] font-normal">
                                Aquí encontrarás accesos directos a todas las secciones configurables de tu WebApp
                            </p>
                        </template>
                    </BaseTooltipResponsive>
                </div>
                <div class="space-x-2 flex">
                    <h1 class="font-semibold text-[14px]">Idiomas</h1>
                    <TooltipLanguages
                        size="l"
                        :top="30"
                        :right="0"
                    >
                        <template #button>
                            <img class="w-[24px] h-[24px]" src="/assets/icons/TH.INFO.GREEN.svg">
                        </template>
                    </TooltipLanguages>
                </div>
            </section>
        </div>
        <div class="h-screen mt-[31px] flex flex-col md:flex-row">
            <!-- mockup -->
            <div id="mockup" class="relative h-[520px] w-[265px]">
                <div id="content-mockup" class="bg-gray-100 absolute z-[100] top-11 left-5 overflow-hidden">
                    <iframe class="w-full h-full" :src="mockup.iframeUrl"></iframe>
                </div>
                <div class="fixed-size-container">
                    <img class="fixed-size-image left-0 top-0 h-full z-50 w-[520px]" src="/assets/img/1.TH.DEV.MOCKUPTRANSPARENTE.BIG.png" alt="">
                </div>
                <!-- <img class=" left-0 top-0 h-full z-50 w-[520px] fixed-size" src="/assets/img/1.TH.DEV.MOCKUPTRANSPARENTE.BIG.png" alt=""> -->
            </div>
            <!-- section -->
            <div class="w-full p-2 ml-[15px] flex-1 fixed-size-content">
                <!-- <div class="flex justify-start items-center m-4 pt-2">
                    <span class="text-[18px] font-medium mb-4">
                        Customer Experience + Reputación Online
                        <div class="h-1 z-10" style="width: 150%; margin-left: -50%; background: linear-gradient(to right, white 18%, rgb(52, 169, 143));"></div>
                    </span>
                </div> -->

                <div class="mb-4">
                    <div class="grid fixed-grid w-3/5">
                        <div class="fixed-card hover:shadow-outline-34A98F hover:rounded-md transition duration-200 group hover:bg-white mr-">
                            <router-link :to="{ path: '/alojamiento/configuracion' }" class="block p-3">
                                <div class="flex items-center">
                                    <img src="/assets/icons/1.TH.Home.svg" alt="icon" class="w-8 h-8 p-1 bg-[#34A98F] rounded-md">
                                    <div class="ml-2 h-[32px] items-center flex">
                                        <h3 class="text-[16px] font-medium group-hover:text-[#34A98F]">Home</h3>
                                    </div>
                                </div>
                                <div class="flex items-center mt-2 group-hover:text-red-200">
                                    <p class="text-sm">Configura el contenido que tus huéspedes verán en la Home de tu WebApp.</p>
                                </div>
                            </router-link>
                        </div>
                        <div class="fixed-card hover:shadow-outline-34A98F hover:rounded-md transition duration-200 group hover:bg-white mr-">
                            <router-link :to="{ path: '/alojamiento/perfil' }" class="block p-3">
                                <div class="flex items-center">
                                    <img src="/assets/icons/webapp/1.TH.icon.instalaciones.png" alt="icon" class="w-8 h-8">
                                    <div class="ml-2 h-[32px] items-center flex">
                                        <h3 class="text-[16px] font-medium group-hover:text-[#34A98F]">Alojamiento</h3>
                                    </div>
                                </div>
                                <div class="flex items-center mt-2 group-hover:text-red-200">
                                    <p class="text-sm">Presenta a tus huéspedes tu {{ $formatTypeLodging() }} y sus instalaciones</p>
                                </div>
                            </router-link>
                        </div>

                        <div class="fixed-card hover:shadow-outline-34A98F hover:rounded-md hover:border-[#34A98F] transition duration-200 hover:bg-white group">
                            <router-link :to="{ path: '/places',query: {selected_place: 5} }" class="block p-3">
                                <div class="flex items-center ">
                                    <img src="/assets/icons/webapp/1.TH.GUÍA CIUDAD.png" alt="icon" class="w-8 h-8">
                                    <div class="ml-2 h-[32px] items-center flex">
                                        <h3 class="text-[16px] font-medium group-hover:text-[#34A98F]">Destino</h3>
                                    </div>
                                </div>
                                <div class="flex items-center group mt-2 group-hover:text-[#FAFAFA]">
                                    <p class="text-sm">Ofrece a tus huéspedes una selección de sitios turísticos, gastronómicos y de ocio</p>
                                </div>
                            </router-link>
                        </div>
                        <div class="fixed-card hover:shadow-outline-34A98F hover:rounded-md transition duration-200 group hover:bg-white">
                            <router-link :to="{ path: '/experiencias' }" class="block p-3">
                                <div class="flex items-center">
                                    <img src="/assets/icons/webapp/1.TH.CAMERA.png" alt="icon" class="w-8 h-8">
                                    <div class="ml-2 h-[32px] items-center flex">
                                        <h3 class="text-[16px] font-medium group-hover:text-[#34A98F]">Experiencias</h3>
                                    </div>
                                </div>
                                <div class="flex items-center mt-2">
                                    <p class="text-sm">Recomienda las mejores experiencias para un viaje inolvidable</p>
                                </div>
                            </router-link>
                        </div>

                        <div class="fixed-card hover:shadow-outline-34A98F hover:rounded-md hover:border-[#34A98F] transition duration-200 group hover:bg-white">
                            <router-link :to="{ path: '/chat/webapp/general' }" class="block p-3">
                                <div class="flex items-center ">
                                    <img src="/assets/icons/webapp/1.TH.Icon.Header.Chat.png" alt="icon" class="w-8 h-8">
                                    <div class="ml-2 h-[32px] items-center flex">
                                        <h3 class="text-[16px] font-medium group-hover:text-[#34A98F]">Chat</h3>
                                    </div>
                                </div>
                                <div class="flex items-center group mt-2">
                                    <p class="text-sm">Tus huéspedes podrán comunicarse directamente con el staff de tu {{ $formatTypeLodging() }}</p>
                                </div>
                            </router-link>
                        </div>
                        <div class="fixed-card hover:shadow-outline-34A98F hover:rounded-md group hover:border-[#34A98F] transition duration-200 hover:bg-white">
                            <router-link :to="{ path: '/feedback/webapp/pre-stay' }" class="block p-3 ">
                                <div class="flex items-center group">
                                    <img src="/assets/icons/webapp/1.TH.Icon.Header.Seguimiento.png" alt="icon" class="w-8 h-8">
                                    <div class="ml-2 h-[32px] items-center flex">
                                        <h3 class="text-[16px] font-medium group-hover:text-[#34A98F]">Seguimiento</h3>
                                    </div>
                                </div>
                                <div class="flex items-center group mt-2 group">
                                    <p class="text-sm">Conoce cómo se sienten tus huéspedes en las diferentes etapas de su estancia</p>
                                </div>
                            </router-link>
                        </div>
                    </div>
                </div>
                <!-- General Configuration Section -->
                <div class="">
                    <!-- <div class="flex justify-start items-center m-4 pt-2">
                        <span class="text-[18px] font-medium mb-4">
                            General
                            <div class="h-1 z-10" style="width: 150%; margin-left: -50%; background: linear-gradient(to right, white 18%, rgb(52, 169, 143));"></div>
                        </span>
                    </div> -->
                    <div class="flex items-center m-4 pt-2">
                        <span class="text-[18px] font-medium uppercase">
                            General
                        </span>
                        <div class="flex-grow border-t border-[#BFBFBF] ml-2"></div>
                    </div>


                    
                    <div class="grid fixed-grid w-1/2">
                        <div class="fixed-card hover:shadow-outline-34A98F hover:rounded-md hover:border-[#34A98F] transition duration-200 hover:bg-white group">
                            <router-link :to="{ path: '' }" class="block p-3">
                                <div class="flex items-center ">
                                    <img src="/assets/icons/1.TH.PROMOCIONA.svg" alt="icon" class="w-8 h-8 p-1 bg-[#34A98F] rounded-md">
                                    <div class="ml-2 h-[2px] items-center flex">
                                        <h3 class="text-[16px] font-medium group-hover:text-[#34A98F] flex flex-col leading-4">
                                            <span>Promocionar</span>
                                            <span>WebApp</span>    
                                        </h3>
                                    </div>
                                </div>
                                <div class="flex items-center group mt-2 group-hover:text-[#FAFAFA] w-[230px]">
                                    <p class="text-sm">Aquí encontrarás las herramientas y medios para promocionar tu WebApp</p>
                                </div>
                            </router-link>
                        </div>
                        <div class="fixed-card hover:shadow-outline-34A98F hover:rounded-md hover:border-[#34A98F] transition duration-200 hover:bg-white group">
                            <router-link :to="{ path: '/comunicaciones' }" class="block p-3">
                                <div class="flex items-center ">
                                    <img src="/assets/icons/webapp/Comunicaciones.png" alt="icon" class="w-8 h-8">
                                    <div class="ml-2 h-[32px] items-center flex">
                                        <h3 class="text-[16px] font-medium group-hover:text-[#34A98F]">Comunicaciones</h3>
                                    </div>
                                </div>
                                <div class="flex items-center group mt-2 group-hover:text-[#FAFAFA]">
                                    <p class="text-sm">Configura los medios y mensajes para comunicarte con tus huéspedes</p>
                                </div>
                            </router-link>
                        </div>

                        <div class="fixed-card hover:shadow-outline-34A98F hover:rounded-md hover:border-[#34A98F] transition duration-200 hover:bg-white group">
                            <router-link :to="{ path: '/apariencia' }" class="block p-3">
                                <div class="flex items-center ">
                                    <img src="/assets/icons/webapp/Personalización.png" alt="icon" class="w-8 h-8">
                                    <div class="ml-2 h-[32px] items-center flex">
                                        <h3 class="text-[16px] font-medium group-hover:text-[#34A98F]">Diseño</h3>
                                    </div>
                                </div>
                                <div class="flex items-center group mt-2 group-hover:text-[#FAFAFA]">
                                    <p class="text-sm">Elige el estilo visual que mejor refleje la identidad de marca de tu alojamiento</p>
                                </div>
                            </router-link>
                        </div>

                        <div class="fixed-card-gallery hover:shadow-outline-34A98F hover:rounded-md transition duration-200 group hover:bg-white">
                            <router-link :to="{ path: '/galeria' }" class="block p-3">
                                <div class="flex items-center">
                                    <img src="/assets/icons/webapp/1.TH.Icon.Header.Galeria de imagenes.png" alt="icon" class="w-8 h-8">
                                    <div class="ml-2 h-[32px] items-center flex">
                                        <h3 class="text-[16px] font-medium group-hover:text-[#34A98F]">Galería de imágenes</h3>
                                    </div>
                                </div>
                                <div class="flex items-center mt-2">
                                    <p class="text-sm">Gestiona la colección de imágenes que utilizarás en tu WebApp</p>
                                </div>
                            </router-link>
                        </div>

                        <div class="fixed-card hover:shadow-outline-34A98F hover:rounded-md hover:border-[#34A98F] transition duration-200 hover:bg-white group">
                            <router-link :to="{ path: '/personalizacion' }" class="block p-3">
                                <div class="flex items-center ">
                                    <img src="/assets/icons/1.TH.Settings-white.svg" alt="icon" class="w-8 h-8 p-1 bg-[#34A98F] rounded-md">
                                    <div class="ml-2 h-[32px] items-center flex">
                                        <h3 class="text-[16px] font-medium group-hover:text-[#34A98F]">Ajustes</h3>
                                    </div>
                                </div>
                                <div class="flex items-center group mt-2 group-hover:text-[#FAFAFA]">
                                    <p class="text-sm">Configura el idioma, URL y los textos legales necesarios para tu WebApp.</p>
                                </div>
                            </router-link>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue';
// COMPONENTS
import BaseTooltipResponsive from "@/components/BaseTooltipResponsive.vue";
import TooltipLanguages from "@/components/TooltipLanguages.vue";
import { useMockupStore } from '@/stores/modules/mockup';

const mockup = useMockupStore();

onMounted(()=>{
    mockup.$setIframeUrl('')
    //mockup.$setInfo1('Guarda para ver tus cambios en tiempo real', '/assets/icons/1.TH.EDIT.OUTLINED.svg')
})



</script>

<style scoped>
#mockup{
    cursor: inherit;
}
#content-mockup{
    border-radius: 0 0 8px 8px;
    height: 460px;
    width: 224px;
}

/* Custom Styles */
.block {
    transition: box-shadow 0.2s, border-color 0.2s;
}
.group:hover .group-hover\:text-[#34A98F] {
    color: #34A98F;
}

.fixed-size-container {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    width: 266px; /* Tamaño fijo */
    height: 540px; /* Tamaño fijo */
    display: flex;
    justify-content: center;
    align-items: center;
}

.fixed-size-image {
    width: 100%;
    height: 540px;
    object-fit: contain; /* Ajusta la imagen dentro del contenedor sin deformarla */
}

.fixed-size-content {
    width: 100%;
    min-width: 500px; /* Ajusta el valor según sea necesario */
}

.fixed-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr); /* 4 columnas por defecto */
    gap: 16px; /* Espacio entre las tarjetas */
}

@media (max-width: 1440px) {
    .fixed-grid {
        grid-template-columns: repeat(3, 1fr); /* Cambia a 3 columnas en pantallas de 1440px o menos */
    }
}


.fixed-card {
    width: 246px;
    height: 136px;
}

.fixed-card-large {
    width: 300px;
    height: 136px;
}

.fixed-card-gallery {
    width: 246px;
    height: 136px;
}
</style>
