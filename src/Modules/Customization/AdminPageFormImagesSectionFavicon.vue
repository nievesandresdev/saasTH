<template>
    <div class="px-4 py-6 rounded-[10px] hbg-white-100 card-form">
        <div class="max-w-[611px]">
            <div class="flex">
                <h2 class="text-base font-medium mr-2">Favicon</h2>
                <BaseTooltipResponsive
                    size="m"
                    :top="25"
                    :left="0"
                >
                    <template v-slot:button>
                        <img class="w-4 h-4" src="/assets/icons/TH.INFO.GREEN.svg">
                    </template>
                    <template v-slot:content>
                        <p class="text-sm font-medium">¿Qué es un favicon?</p>
                        <p class="text-sm mt-4">Es un pequeño icono que se utiliza para identificar un sitio web en los navegadores web. Se muestran en la pestaña del navegador, en la barra de direcciones y en la lista de marcadores, entre otros lugares.</p>
                    </template>
                </BaseTooltipResponsive>
            </div>
            <p class="text-sm mt-2">
                Añade tu favicon para ayudar a tus usuarios a reconocer tu marca, en caso contrario, se mostrará el logo predeterminado.
            </p>
            <p class="text-sm mt-2">
                Te recomendamos que sea en formato .png o .svg. Para un resultado óptimo debe ser cuadrado y con unas dimensiones de al menos 16x16 px.
            </p>
            <button class="cursor-pointer bg-red-600 rounde-full bg-red-600" @click="open_gallery">
            </button>
            <div class="mt-4 flex justify-start">
                <div>
                    <div class="flex items-end">
                        <div
                            class="card-logo rounded-[6px] p-2 flex justify-center items-center relative border hbg-gray-100 hborder-gray-400 overflow-hidden"
                            @mouseenter="hoverCardFavicon = true"
                            @mouseleave="hoverCardFavicon = null"
                        >
                            <div v-if="hoverCardFavicon === true" class="bg-black bg-opacity-25 w-full h-full absolute inset-0  p-2 flex justify-between">
                                <button
                                    class="absolute right-2 top-2 bg-white p-[2px] rounded-[3px] w-[24px] h-[24px] p-[2px]"
                                    @click="openGallery"
                                >
                                    <img src="/assets/icons/1.TH.EDIT.OUTLINED.svg" class=" w-[20px] h-[20px]">
                                </button>
                                <button
                                    v-if="imgSelectedFav.url"
                                    class="absolute left-2 top-2 bg-white p-[2px] rounded-[3px] w-[24px] h-[24px]"
                                    @click="removeLogo"
                                >
                                    <img src="/assets/icons/1.TH.DELETE.OUTLINE.svg" class=" w-[20px] h-[20px]">
                                </button>
                            </div>
                            <img 
                                v-if="imgSelectedFav.url"
                                class="favicon-img absolute inset-0 m-auto" 
                                :src="$formatImage({url: imgSelectedFav.url, type: imgSelectedFav.type})"  
                            >
                            <img 
                                v-else
                                class="favicon-img absolute inset-0 m-auto" 
                                src="/assets/icons/1.TH.icon.instalaciones.svg"
                            >
                        </div>
                    </div>
                    <p v-if="imgSelectedFav?.name" class="text-xs mt-2">
                        {{ imgSelectedFav?.name ?? imgSelectedFav.file?.name }}
                    </p>
                </div>
                <div class="w-[235px] ml-[112px]">
                    <p class="text-xs font-medium">Favicon en la pestaña del navegador</p>
                    <img class="mt-6" src="/assets/img/tab-img-browser-customatization.svg" alt="">
                </div>
            </div>
            <p v-if="!isValidFavicon && !loadFavicon" class="text-xs mt-2 htext-alert-negative">
                {{ textValidFavicon }}
            </p>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, computed, watch, inject } from 'vue'

import { $formatImage } from '@/utils/helpers';

import BaseTooltipResponsive from "@/components/BaseTooltipResponsive.vue";

const emit = defineEmits(['open:gallery', 'remove:img']);

const form = inject('form');
const imgSelectedFav = inject('imgSelectedFav');
const isValidFavicon = inject('isValidFavicon');
const loadFavicon = inject('loadFavicon');
const textValidFavicon = inject('textValidFavicon');

//data
const faviconDefault = '/vendor_asset/img/hoster/icons/1.TH.icon.instalaciones.svg';

const hoverCardFavicon = ref(null);

function openGallery(){
    emit('open:gallery','favicon');
}

function removeLogo(){
    emit('remove:img','wallpaper');
}


</script>
<style lang="scss" scoped>
.favicon-img {
  aspect-ratio: 1/1;
  max-width: 78px;
  max-height: 78px;
  min-width: 32px;
  min-height: 32px;
  width: auto;
  height: auto;
  object-fit: contain;
}

.icon-cntnr:hover{
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.15);
}
.card-logo{
    width:140px; 
    height: 93px;
}

</style>