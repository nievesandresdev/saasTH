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
            <!-- mockup container -->
            <div class="flex flex-col items-center">
                <div id="mockup" class="relative h-[520px] w-[265px]">
                    <div id="content-mockup" class="bg-gray-100 absolute z-[100] top-11 left-5 overflow-hidden">
                        <iframe class="w-full h-full" :src="mockup.iframeUrl"></iframe>
                    </div>
                    <div class="fixed-size-container">
                        <img class="fixed-size-image left-0 top-0 h-full z-50 w-[520px]" src="/assets/img/1.TH.DEV.MOCKUPTRANSPARENTE.BIG.png" alt="">
                    </div>
                </div>
                <!-- Add "Ir a la WebApp" link below mockup -->
                <div class="flex items-center gap-2 mt-8 group" @click="openMockup">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" class="cursor-pointer">
                        <path d="M10 2H14V6" stroke="#333333" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round" class="group-hover:stroke-[#34A98F]"/>
                        <path d="M6.66675 9.33333L14.0001 2" stroke="#333333" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round" class="group-hover:stroke-[#34A98F]"/>
                        <path d="M12 8.66667V12.6667C12 13.0203 11.8595 13.3594 11.6095 13.6095C11.3594 13.8595 11.0203 14 10.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V5.33333C2 4.97971 2.14048 4.64057 2.39052 4.39052C2.64057 4.14048 2.97971 4 3.33333 4H7.33333" stroke="#333333" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round" class="group-hover:stroke-[#34A98F]"/>
                    </svg>
                    <p class="text-xs leading-[130%] font-semibold underline cursor-pointer group-hover:text-[#34A98F]">Ir a la WebApp</p>
                </div>
            </div>
            <!-- section -->
            <div class="w-full p-2 ml-[15px] flex-1 fixed-size-content">
                <div class="mb-4">
                    <div class="grid fixed-grid w-3/5">
                        <div class="fixed-card hover:shadow-outline-34A98F hover:rounded-md transition duration-200 group hover:bg-white mr-">
                            <router-link :to="{ path: 'alojamiento/configuracion/home' }" class="block p-4">
                                <div class="flex items-center">
                                    <img src="/assets/icons/1.TH.Home.svg" alt="icon" class="w-8 h-8 p-1 bg-[#34A98F] rounded-md">
                                    <div class="ml-2 h-[32px] items-center flex">
                                        <h3 class="text-[16px] font-medium group-hover:text-[#34A98F]">Home</h3>
                                    </div>
                                </div>
                                <div class="flex items-center mt-2 group-hover:text-red-200">
                                    <p class="text-sm">Configura el contenido que tus huéspedes verán en la Home de tu WebApp</p>
                                </div>
                            </router-link>
                        </div>
                        <div class="fixed-card hover:shadow-outline-34A98F hover:rounded-md transition duration-200 group hover:bg-white mr-">
                            <router-link :to="{ path: '/alojamiento/perfil' }" class="block p-4">
                                <div class="flex items-center">
                                    <img src="/assets/icons/webapp/1.TH.icon.instalaciones.svg" alt="icon" class="w-8 h-8">
                                    <div class="ml-2 h-[32px] items-center flex">
                                        <h3 class="text-[16px] font-medium group-hover:text-[#34A98F]">{{ $formatTypeLodging(true) }}</h3>
                                    </div>
                                </div>
                                <div class="flex items-center mt-2 group-hover:text-red-200">
                                    <p class="text-sm">Presenta a tus huéspedes tu {{ $formatTypeLodging() }} y sus instalaciones</p>
                                </div>
                            </router-link>
                        </div>

                        <div class="fixed-card hover:shadow-outline-34A98F hover:rounded-md hover:border-[#34A98F] transition duration-200 hover:bg-white group">
                            <router-link :to="{ path: '/places',query: {selected_place: 5} }" class="block p-4">
                                <div class="flex items-center ">
                                    <img src="/assets/icons/webapp/1.TH.GUÍA CIUDAD.svg" alt="icon" class="w-8 h-8">
                                    <div class="ml-2 h-[32px] items-center flex">
                                        <h3 class="text-[16px] font-medium group-hover:text-[#34A98F]">Destino</h3>
                                    </div>
                                </div>
                                <div class="flex items-center group mt-2 group-hover:text-[#FAFAFA]">
                                    <p class="text-sm">Ofrece a tus huéspedes una selección de sitios turísticos, gastronómicos y de ocio</p>
                                </div>
                            </router-link>
                        </div>
                        <!-- <div class="fixed-card hover:shadow-outline-34A98F hover:rounded-md transition duration-200 group hover:bg-white">
                            <router-link :to="{ path: '/experiencias' }" class="block p-4">
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
                        </div> -->
                        <div class="fixed-card hover:shadow-outline-34A98F hover:rounded-md transition duration-200 group hover:bg-white">
                            <router-link :to="{ path: '/servicios/conforts' }" class="block p-4">
                                <div class="flex items-center">
                                    <img src="/assets/icons/webapp/1.TH.Recepcion.svg" alt="icon" class="w-8 h-8">
                                    <div class="ml-2 h-[32px] items-center flex">
                                        <h3 class="text-[16px] font-medium group-hover:text-[#34A98F]">Servicios</h3>
                                    </div>
                                </div>
                                <div class="flex items-center mt-2">
                                    <p class="text-sm">Da a conocer a tus huéspedes las opciones y experiencias disponibles para su estancia</p>
                                </div>
                            </router-link>
                        </div>

                        <div class="fixed-card hover:shadow-outline-34A98F hover:rounded-md transition duration-200 group hover:bg-white">
                            <router-link :to="{ path: '/webapp/contacto/telefonos' }" class="block p-4">
                                <div class="flex items-center">
                                    <img src="/assets/icons/webapp/contacto.svg" alt="icon" class="w-8 h-8">
                                    <div class="ml-2 h-[32px] items-center flex">
                                        <h3 class="text-[16px] font-medium group-hover:text-[#34A98F]">Contacto</h3>
                                    </div>
                                </div>
                                <div class="flex items-center mt-2">
                                    <p class="text-sm">Facilita la comunicación a tus huéspedes desde distintos canales</p>
                                </div>
                            </router-link>
                        </div>

                        <div 
                            class="fixed-card hover:shadow-outline-34A98F hover:rounded-md hover:border-[#34A98F] transition duration-200 group hover:bg-white"
                            v-if="hotelStore.hotelData?.chat_service_enabled"
                        >
                            <router-link :to="{ path: '/chat/webapp/general' }" class="block p-4">
                                <div class="flex items-center ">
                                    <img src="/assets/icons/webapp/1.TH.Icon.Header.Chat.svg" alt="icon" class="w-8 h-8">
                                    <div class="ml-2 h-[32px] items-center flex">
                                        <h3 class="text-[16px] font-medium group-hover:text-[#34A98F]">Chat</h3>
                                    </div>
                                </div>
                                <div class="flex items-center group mt-2">
                                    <p class="text-sm">Tus huéspedes podrán comunicarse directamente con el staff de tu {{ $formatTypeLodging() }}</p>
                                </div>
                            </router-link>
                        </div>

                        <div 
                            class="fixed-card hover:shadow-outline-34A98F hover:rounded-md hover:border-[#34A98F] transition duration-200 group hover:bg-white"
                            v-if="hotelStore.hotelData?.checkin_service_enabled"
                        >
                            <router-link :to="{ path: '/webapp/checkin/general' }" class="block p-4">
                                <div class="flex items-center ">
                                    <img src="/assets/icons/webapp/checkin.svg" alt="icon" class="w-8 h-8">
                                    <div class="ml-2 h-[32px] items-center flex">
                                        <h3 class="text-[16px] font-medium group-hover:text-[#34A98F]">Check-in</h3>
                                    </div>
                                </div>
                                <div class="flex items-center group mt-2">
                                    <p class="text-sm">Permite a tus huéspedes realizar su Check-in online desde tu WebApp</p>
                                </div>
                            </router-link>
                        </div>

                        <div class="fixed-card hover:shadow-outline-34A98F hover:rounded-md group hover:border-[#34A98F] transition duration-200 hover:bg-white">
                            <router-link :to="{ path: '/feedback/webapp/pre-stay' }" class="block p-3 ">
                                <div class="flex items-center group">
                                    <img src="/assets/icons/webapp/1.TH.Icon.Header.Seguimiento.svg" alt="icon" class="w-8 h-8">
                                    <div class="ml-2 h-[32px] items-center flex">
                                        <h3 class="text-[16px] font-medium group-hover:text-[#34A98F]">Seguimiento</h3>
                                    </div>
                                </div>
                                <div class="flex items-center group mt-2 group">
                                    <p class="text-sm">Conoce cómo se sienten tus huéspedes en las diferentes etapas de su estancia</p>
                                </div>
                            </router-link>
                        </div>

                        <div class="fixed-card hover:shadow-outline-34A98F hover:rounded-md hover:border-[#34A98F] transition duration-200 group hover:bg-white">
                            <router-link :to="{ path: '/webapp/referidos' }" class="block p-4">
                                <div class="flex items-center ">
                                    <img src="/assets/icons/webapp/referrals.svg" alt="icon" class="w-8 h-8">
                                    <div class="ml-2 h-[32px] items-center flex">
                                        <h3 class="text-[16px] font-medium group-hover:text-[#34A98F]">Programa de referidos</h3>
                                    </div>
                                </div>
                                <div class="flex items-center group mt-2">
                                    <p class="text-sm">Incentiva a tus huéspedes a recomendar el {{ $formatTypeLodging() }} mediante regalos exclusivos</p>
                                </div>
                            </router-link>
                        </div>
                    </div>
                </div>
                <!-- General Configuration Section -->
                <div class="">
                    <div class="flex items-center m-4 pt-2">
                        <span class="text-[18px] font-medium uppercase">
                            General
                        </span>
                        <div class="flex-grow border-t border-[#BFBFBF] ml-2"></div>
                    </div>


                    
                    <div class="grid fixed-grid w-1/2">
                        <div class="fixed-card hover:shadow-outline-34A98F hover:rounded-md hover:border-[#34A98F] transition duration-200 hover:bg-white group">
                            <router-link :to="{ path: '/promociona-webapp' }" class="block p-4">
                                <div class="flex items-center ">
                                    <img src="/assets/icons/1.TH.PROMOCIONA.svg" alt="icon" class="w-8 h-8 p-1 bg-[#34A98F] rounded-md">
                                    <div class="ml-2 h-[2px] items-center flex">
                                        <h3 class="text-[16px] font-medium group-hover:text-[#34A98F] flex flex-col leading-4">
                                            Promocionar WebApp
                                        </h3>
                                    </div>
                                </div>
                                <div class="flex items-center group mt-2 group-hover:text-[#FAFAFA] w-[230px]">
                                    <p class="text-sm">Aquí encontrarás las herramientas y medios para promocionar tu WebApp</p>
                                </div>
                            </router-link>
                        </div>

                        <div class="fixed-card hover:shadow-outline-34A98F hover:rounded-md hover:border-[#34A98F] transition duration-200 hover:bg-white group">
                            <router-link :to="{ path: '/comunicaciones' }" class="block p-4">
                                <div class="flex items-center ">
                                    <img src="/assets/icons/webapp/Comunicaciones.svg" alt="icon" class="w-8 h-8">
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
                            <router-link :to="{ path: '/apariencia' }" class="block p-4">
                                <div class="flex items-center ">
                                    <img src="/assets/icons/webapp/Personalizacion.svg" alt="icon" class="w-8 h-8">
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
                            <router-link :to="{ path: '/galeria' }" class="block p-4">
                                <div class="flex items-center">
                                    <img src="/assets/icons/webapp/1.TH.Icon.Header.Galeria.svg" alt="icon" class="w-8 h-8">
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
                            <router-link :to="{ path: '/personalizacion' }" class="block p-4">
                                <div class="flex items-center ">
                                    <img src="/assets/icons/1.TH.Settings-white.svg" alt="icon" class="w-8 h-8 p-1 bg-[#34A98F] rounded-md">
                                    <div class="ml-2 h-[32px] items-center flex">
                                        <h3 class="text-[16px] font-medium group-hover:text-[#34A98F]">Ajustes</h3>
                                    </div>
                                </div>
                                <div class="flex items-center group mt-2 group-hover:text-[#FAFAFA]">
                                    <p class="text-sm">Configura el idioma, URL y los textos legales necesarios para tu WebApp</p>
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
import { useHotelStore } from '@/stores/modules/hotel';
const hotelStore = useHotelStore();
import { useRouter } from 'vue-router';
const router = useRouter();

const openMockup = () => {
    const route = router.resolve({ name: 'WebAppUsable', params: { subdomain: hotelStore.hotelData.subdomain } });
    window.open(route.href, '_blank');
}

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
