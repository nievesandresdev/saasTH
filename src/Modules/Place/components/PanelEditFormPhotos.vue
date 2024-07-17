<template>
    <div class="space-y-6">
        <div class="grid grid-cols-3 gap-4">
                <div
                    class="button-add h-24 w-full border hborder-black-100 flex flex-col justify-center items-center rounded-xl cursor-pointer"
                    @click="openGallery"
                >
                    <img src="/assets/icons/1.TH.PLUS.svg" class=" w-[20px] h-[20px]" >
                    <span class="font-medium text-sm">Añadir imagen</span>
                </div>
                <div
                    v-for="(image, index) in form.images"
                    :key="index"
                    class="h-24 w-full relative rounded-xl"
                    @mouseenter="hoverImg = index"
                    @mouseleave="hoverImg = null"
                >
                    <div v-if="hoverImg === index" class="bg-black bg-opacity-25 w-full h-full absolute inset-0 rounded-xl">
                        <div  class="absolute space-x-4 position-center z-[100]">
                            <button @click="openPreview(placeStore.formatImage(image))">
                                <img class="w-5 h-5" alt="icon_search icon-white"  src="/assets/icons/1.TH.SEARCH.WHITE.svg">
                            </button>
                            <button @click="removeImage(index)" >
                                <img class="w-5 h-5" alt="icon_delete" src="/assets/icons/delete.white.svg">
                            </button>
                        </div>
                    </div>
                    <img class="w-full h-full rounded-xl object-cover " :src="placeStore.formatImage(image)">
                </div>
        </div>
        <!-- <p v-if="form.images.length == 0" class="text-xs text-red-400 mt-2">Debes añadir al menos una imagen</p> -->
    </div>

</template>

<script setup>
import { ref, reactive, onMounted, provide, computed, inject, watch } from 'vue';

// COMPONENTS
import BasePreviewImage from "@/components/BasePreviewImage.vue";

const hoverImg = ref(null);

const form = inject('form');
const urlsimages = inject('urlsimages');

//
const placeStore = inject('placeStore');
const previewUrl = inject('previewUrl');
const isPreviewOpen  = inject('isPreviewOpen');

// FUNCTIONS
function openGallery (){

}

function removeImage (index){
    urlsimages.value.splice(index, 1);
    form.images.splice(index, 1);
}

function openPreview(url) {
    previewUrl.value = url;
    isPreviewOpen.value = true;
}

</script>

<style lang="scss">
    .button-add:hover{
        border: 0.5px solid #34A98F !important;
    }
    .button-add:hover > img{
        filter: invert(52%) sepia(83%) saturate(320%) hue-rotate(116deg) brightness(91%) contrast(90%);
    }
    .button-add:hover > span{
        color: #34A98F;
    }


</style>