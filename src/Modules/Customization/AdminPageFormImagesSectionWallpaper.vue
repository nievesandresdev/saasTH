<template>
    <div class="px-4 py-6 rounded-[10px] hbg-white-100 card-form">
        <div class="max-w-[611px]">
            <h2 class="text-base font-medium">Imagen de fondo</h2>
            <p class="text-sm mt-2">
                Aquí puedes personalizar la imagen de fondo de la home en la webapp. Podrás elegir una imagen de la galería o añadir tu propia imagen. 
            </p>
            <div
                class="card-logo mt-4 rounded-[6px] flex justify-center items-center relative hbg-gray-100  hborder-gray-400"
                @mouseenter="hoverCardWallpaper = index"
                @mouseleave="hoverCardWallpaper = null"
            >
                <div v-if="hoverCardWallpaper === index" class="bg-black bg-opacity-25 w-full h-full absolute inset-0  p-2 flex justify-between">
                    <button
                        v-if="imgSelectedBg.url"
                        class="absolute left-2 top-2 bg-white p-[2px] rounded-[3px] w-[24px] h-[24px]"
                        @click="removeWalpaper"
                    >
                        <img src="/assets/icons/1.TH.DELETE.OUTLINE.svg" class=" w-[20px] h-[20px]">
                    </button>
                    <button
                        class="absolute right-2 top-2 bg-white p-[2px] rounded-[3px] w-[24px] h-[24px]"
                        @click="openGallery"
                    >
                        <img src="/assets/icons/1.TH.EDIT.OUTLINED.svg" class=" w-[20px] h-[20px]">
                    </button>
                </div>
                <img
                    v-if="imgSelectedBg.url"
                    class="object-cover h-full w-full rounded-[6px]" :src="$formatImage({url: imgSelectedBg.url, type: imgSelectedBg.type})" alt="image-wallpaper"
                >
                <img
                    v-else
                    class="object-cover h-full w-full rounded-[6px]"
                    :src="$formatImage({url: bgDefault.url, type: bgDefault.type})"
                    alt="image-default"
                >
            </div>
            <!-- <div v-if="imgSelectedBg?.url">
                <div
                    class="card-logo mt-4 rounded-[6px] flex justify-center items-center relative hbg-gray-100  hborder-gray-400"
                    @mouseenter="hoverCardWallpaper = index"
                    @mouseleave="hoverCardWallpaper = null"
                >
                    <div v-if="hoverCardWallpaper === index" class="bg-black bg-opacity-25 w-full h-full absolute inset-0  p-2 flex justify-between">
                        <button
                            v-if="imgSelectedBg.url"
                                class="absolute left-2 top-2 bg-white p-[2px] rounded-[3px] w-[24px] h-[24px]"
                                @click="removeWalpaper"
                        >
                            <img src="/assets/icons/1.TH.DELETE.OUTLINE.svg" class=" w-[20px] h-[20px]">
                        </button>
                        <button
                            class="absolute right-2 top-2 bg-white p-[2px] rounded-[3px] w-[24px] h-[24px] p-[2px]"
                            @click="openGallery"
                        >
                            <img src="/assets/icons/1.TH.EDIT.OUTLINED.svg" class=" w-[20px] h-[20px]">
                        </button>
                    </div>
                    <img  class="object-cover h-full w-full rounded-[6px]" :src="$formatImage({url: imgSelectedBg.url, type: imgSelectedBg.type})" alt="">
                </div>
            </div>
            <button v-else class="mt-4 relative w-[140px] h-[93px] rounded-[6px] border hborder-black-100 cursor-pointer add-file" @click="openGallery">
                <div class="icon w-[16px] h-[16px] inline-block " />
                <h5 class="text-base font-medium text-center flex flex-column items-center justify-center">
                    Añadir imagen
                </h5>
            </button> -->
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, computed, inject } from 'vue';

import { $formatImage } from '@/utils/helpers';

    const emit = defineEmits(['open:gallery', 'remove:img']);

    const form = inject('form');

    const hoverCardWallpaper = ref(null);

    const imgSelectedBg = inject('imgSelectedBg');
    const bgDefault = inject('bgDefault');

    function openGallery(){
        emit('open:gallery','wallpaper');
    }
    function removeWalpaper () {
        emit('remove:img','wallpaper');
    }

    
   



    //computed

</script>
<style lang="scss">
.icon-cntnr:hover{
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.15);
}
.card-logo{
    width:140px; 
    height: 93px;

    .logo-selected{
        width: 148px;
        height: 101px;
        left: -5px;
        border: 1px solid var(--h-green-700);
    }
}

</style>