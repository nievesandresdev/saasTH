<template>
    <div class="h-screen px-[24px] bg-[#FAFAFA]">
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
            <div class="w-full p-2 ml-4 flex-1 fixed-size-content">
                <div class="flex justify-start items-center m-4 pt-2">
                    <span class="text-[18px] font-medium mb-4">
                        Customer Experience + Reputación Online
                        <div class="h-1 z-10" style="width: 150%; margin-left: -50%; background: linear-gradient(to right, white 18%, rgb(52, 169, 143));"></div>
                    </span>
                </div>

                <div class="mb-4 grid-container">
                    <div class="grid fixed-grid w-3/5">
                        <div class="fixed-card hover:shadow-outline-34A98F hover:rounded-md transition duration-200 group hover:bg-white mr-">
                            <router-link :to="{ path: '/alojamiento/perfil' }" class="block p-3">
                                <div class="flex items-center">
                                    <img src="/assets/icons/webapp/1.TH.icon.instalaciones.png" alt="icon" class="w-8 h-8">
                                    <div class="ml-4">
                                        <h3 class="text-[18px] font-medium group-hover:text-[#34A98F]">Alojamiento</h3>
                                    </div>
                                </div>
                                <div class="flex items-center mt-2 group-hover:text-red-200">
                                    <p class="text-sm">Presenta a tus huéspedes tu alojamiento y sus instalaciones</p>
                                </div>
                            </router-link>
                        </div>

                        <div class="fixed-card hover:shadow-outline-34A98F hover:rounded-md hover:border-[#34A98F] transition duration-200 hover:bg-white group">
                            <router-link :to="{ path: '/places',query: {selected_place: 5} }" class="block p-3">
                                <div class="flex items-center ">
                                    <img src="/assets/icons/webapp/1.TH.GUÍA CIUDAD.png" alt="icon" class="w-8 h-8">
                                    <div class="ml-4">
                                        <h3 class="text-[18px] font-medium group-hover:text-[#34A98F]">Destino</h3>
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
                                    <div class="ml-4">
                                        <h3 class="text-[18px] font-medium group-hover:text-[#34A98F]">Experiencias</h3>
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
                                    <div class="ml-4">
                                        <h3 class="text-[18px] font-medium group-hover:text-[#34A98F]">Chat</h3>
                                    </div>
                                </div>
                                <div class="flex items-center group mt-2">
                                    <p class="text-sm">Tus huéspedes podrán comunicarse directamente con el staff de tu hotel</p>
                                </div>
                            </router-link>
                        </div>
                        <div class="fixed-card hover:shadow-outline-34A98F hover:rounded-md group hover:border-[#34A98F] transition duration-200 hover:bg-white">
                            <router-link :to="{ path: '/feedback/webapp/pre-stay' }" class="block p-3 ">
                                <div class="flex items-center group">
                                    <img src="/assets/icons/webapp/1.TH.Icon.Header.Seguimiento.png" alt="icon" class="w-8 h-8">
                                    <div class="ml-4">
                                        <h3 class="text-[18px] font-medium group-hover:text-[#34A98F]">Seguimiento</h3>
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
                <div>
                    <div class="flex justify-start items-center m-4 pt-2">
                        <span class="text-[18px] font-medium mb-4">
                            Administración general
                            <div class="h-1 z-10" style="width: 150%; margin-left: -50%; background: linear-gradient(to right, white 18%, rgb(52, 169, 143));"></div>
                        </span>
                    </div>
                    
                    <div class="grid fixed-grid w-1/2">
                        <div class="fixed-card hover:shadow-outline-34A98F hover:rounded-md hover:border-[#34A98F] transition duration-200 hover:bg-white group">
                            <router-link :to="{ path: '/personalizacion' }" class="block p-3">
                                <div class="flex items-center ">
                                    <img src="/assets/icons/webapp/1.TH.Icon.Header.Personalización.png" alt="icon" class="w-8 h-8">
                                    <div class="ml-4">
                                        <h3 class="text-[18px] font-medium group-hover:text-[#34A98F]">Personalización</h3>
                                    </div>
                                </div>
                                <div class="flex items-center group mt-2 group-hover:text-[#FAFAFA]">
                                    <p class="text-sm">Elige el estilo visual que mejor aplique a la identidad de marca de tu alojamiento.</p>
                                </div>
                            </router-link>
                        </div>

                        <div class="fixed-card hover:shadow-outline-34A98F hover:rounded-md hover:border-[#34A98F] transition duration-200 hover:bg-white group">
                            <router-link :to="{ path: '/legal/general' }" class="block p-3">
                                <div class="flex items-center ">
                                    <img src="/assets/icons/webapp/1.TH.Icon.Header.Textos legales.png" alt="icon" class="w-8 h-8">
                                    <div class="ml-4">
                                        <h3 class="text-[18px] font-medium group-hover:text-[#34A98F]">Textos legales</h3>
                                    </div>
                                </div>
                                <div class="flex items-center group mt-2 group-hover:text-[#FAFAFA]">
                                    <p class="text-sm">Consulta y configura los textos necesarios para cubrir los aspectos legales.</p>
                                </div>
                            </router-link>
                        </div>
                        <div class="fixed-card-gallery hover:shadow-outline-34A98F hover:rounded-md transition duration-200 group hover:bg-white">
                            <router-link :to="{ path: '/galeria-imagenes' }" class="block p-3">
                                <div class="flex items-center">
                                    <img src="/assets/icons/webapp/1.TH.Icon.Header.Galeria de imagenes.png" alt="icon" class="w-8 h-8">
                                    <div class="ml-4">
                                        <h3 class="text-[18px] font-medium group-hover:text-[#34A98F]">Galería de imágenes</h3>
                                    </div>
                                </div>
                                <div class="flex items-center mt-2">
                                    <p class="text-sm">Gestiona la colección de imágenes que utilizarás en tu WebApp.</p>
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
    grid-template-columns: repeat(3, 230px); /* Tres columnas fijas de 230px */
    gap: 16px; /* Espacio entre los elementos */
}

.fixed-card {
    width: 230px;
    height: 136px;
}

.fixed-card-gallery {
    width: 260px;
    height: 136px;
}
</style>
