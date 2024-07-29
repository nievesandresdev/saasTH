<template>
<div class="h-screen bg-[#FAFAFA] flex flex-col">
    <div class="px-[24px]">
        <div class="py-[20px]">
            <h1 class="text-[22px] font-medium">
                Galería de imágenes
            </h1>
        </div>
        <BaseTab v-model="tabCurrent" :items="ITEMS_TABS" />
    </div>
    <div class="px-6 mt-[24px] pb-[52px] flex-1 overflow-y-auto">
        <BaseTextField
            v-model="form.search"
            prepend-inner-icon="/assets/icons/1.TH.SEARCH.svg"
            placeholder="Buscar imagen..."
            class-content="w-[345px]"
        />
        <p v-if="imageSelected?.length == 0" class="text-sm font-medium htext-gray-500 mt-6">{{ textNumbersImagesFound }}</p>
        <div v-else class="flex space-x-[4px] mt-6 items-center">
            <img src="/assets/icons/1.TH.Checkbox.svg" class="w-[16px] h-[16px]">
            <span class="text-sm font-medium"> {{ textNumbersImagesSelected }} </span>
        </div>
        <div class="mt-4">
            <div class="w-[968px] 3xl:w-[1464px] grid grid-cols-4 3xl:grid-cols-6 gap-4">
                <label 
                    for="fileInput"
                    class="relative w-[239px] h-[160px] py-[12px] rounded-[6px] border hborder-black-100 cursor-pointer button-add flex flex-col justify-center items-center"
                >   
                    <img src="/assets/icons/1.TH.PLUS.svg" class=" w-[16px] h-[16px]" >
                    <span class="font-medium text-base">Añadir imagen</span>
                    <input
                        type="file"
                        accept=".jpg, .jpeg, .png, .svg" 
                        id="fileInput"
                        multiple
                        style="display: none;"
                        @change="handleFiles"
                        ref="fileInput"
                    />
                </label>
                
                <div v-for="(img, index) in imagesContainer" :key="index">
                    <div 
                        class="gallery-card truncate relative rounded-[6px]"
                    >
                        <div 
                            class="relative h-full"
                            @mouseover="indexImageHover = index"
                            @mouseleave="indexImageHover = null"
                        >

                            <img 
                                class="w-[239px] h-[160px] rounded-6 object-cover"
                                loading="lazy"
                                :src="galleryStore.formatImage({ url: img.url, type: img.type, urlDefault: img?.default })"
                            >
                            <div
                                v-if="indexImageHover === index"
                                class="h-full w-full absolute z-[50] rounded-[6px] top-0 left-0 p-2 flex justify-between items-start"
                                style="background: linear-gradient(0deg, rgba(0, 0, 0, 0.30) 0%, rgba(0, 0, 0, 0.30) 100%);"
                            >

                                <button
                                    class="bg-white p-[2px] rounded-[3px] w-[24px] h-[24px]"
                                    @click="openPreview(galleryStore.formatImage({ url: img.url, type: img.type, urlDefault: img?.default }))"
                                >
                                    <img src="/assets/icons/1.TH.SEARCH.svg" class=" w-[20px] h-[20px]">
                                </button>
                                <!-- <Checkbox
                                    v-model="imageSelected"
                                    class="w-[24px] h-[24px]"
                                /> -->
                                <input
                                    type="checkbox"
                                    v-model="imageSelected"
                                    :value="index"
                                    :id="index"
                                    class="w-[24px] h-[24px]"
                                >
                            </div>
                        </div>
                    </div>
                    <p class="text-xs font-medium mt-2 truncate pl-3 w-[12.438rem]">
                        {{ img?.name ?? img?.file?.name }}
                    </p>
                </div>
            </div>
        </div>
    </div>
    <div class="p-6 w-full flex justify-between  hborder-top-gray-400 z-[1000] hbg-white-100 w-full">
        <button
            class="py-3"
            :class="{'opacity-25':!imageSelected?.length }"
        >
            <span class="underline font-medium">Cancelar</span>
        </button>
        <button
            class="hbtn-cta px-4 py-3 font-medium rounded-[6px] leading-[110%]"
             :disabled="!imageSelected?.length"
            @click="submitDelete"
        >
            Eliminat
        </button>
    </div>
</div>

<BasePreviewImage 
    :url-image="previewUrl"
    :is-open="isPreviewOpen"
    @click:close="closePreviewImage"
/>

</template>

<script setup>

import { ref, provide, reactive, onMounted, computed } from 'vue';


// STATE
//
import { useGalleryStore } from '@/stores/modules/gallery';
const galleryStore = useGalleryStore();
provide('galleryStore', galleryStore);
import { useHotelStore } from '@/stores/modules/hotel';
const hotelStore = useHotelStore();
provide('hotelStore', hotelStore);
import { useMockupStore } from '@/stores/modules/mockup';
const mockupStore = useMockupStore();
// COMPOSABLES
import { useToastAlert } from '@/composables/useToastAlert'
const toast = useToastAlert();

// COMPONENTS
import BaseTab from '@/components/BaseTab';
import BasePreviewImage from '@/components/BasePreviewImage';
import BaseTextField from '@/components/Forms/BaseTextField';
import Checkbox from '@/components/Forms/Checkbox';

const PLACE = 'PLACE';
const HOTEL = 'HOTEL';
const ITEMS_TABS = [{name: 'Mi alojamiento', value: HOTEL}, {name: 'Destino', value: PLACE}];

// DATA
const tabCurrent = ref(HOTEL);
const search = ref(null);
const form = reactive({
    search: '',
});
const images = ref([]);
const imageSelected = ref([]);
const multiple = ref(false);
const indexImageHover = ref(null);

const previewUrl = ref(null);
const isPreviewOpen = ref(false);

const imagesContainer = computed(()=> {
    // console.log('images_container computed')
    const imagesCurrent = tabCurrent.value === HOTEL ? images.value.images_gallery_hotel : images.value.images_gallery_places;
    return imagesCurrent;
})


const textNumbersImagesFound = computed(() => {
    let numbers = imagesContainer.value?.length;
    let text =  numbers != 1 ? `${numbers} imágenes encontradas` : `${numbers} imágen encontrada`;
    return text;
});

const textNumbersImagesSelected = computed(() => {
    let numbers = imageSelected.value?.length;
    let text =  numbers != 1 ? `${numbers} imágenes seleccionadas` : `${numbers} imágen encontrada`;
    return text;
});

// FUNCTION
function openGallery () {

}

onMounted(() => {
    loadGallery();  
});

function handleFiles () {

}

async function loadGallery() {
    let config = { showPreloader: false  }
    const response = await galleryStore.$getAll(form, config);
    const { ok, data} = response;
    if (ok) {
        images.value = data;
    }
}

function checkSelectedImage (url) {
    let exit = imageSelected.value?.some(item => item?.url == url)
    return exit
}

function selectImage (img, index) {
    // if (image_selected.value.length > 0) {
    //     image_selected.value = []
    // }
    // if(img?.file){
    //     image_selected.value.push({ id: null, name:img?.name ??img?.file?.name, url: img.url, exists: false, index, type: img.type, url_origin: img.url_origin })
    // }else{
    //     image_selected.value.push({ id: img.id, name:img?.name ??img?.file?.name, url: img.url, exists: true, index, type: img.type, url_origin: img.url_origin })
    // }
}

function selectImageMultiple(img, index){
    // if (check_selected_image(img.url)) {
    //     let index_image_selected = image_selected.value.findIndex(item => item.url === img.url)
    //     image_selected.value?.splice(index_image_selected, 1)     
    // } else {
    //     if(img?.file){
    //         image_selected.value.push({id: null, name:img?.name ??img?.file?.name, url:img.url,exists:false,index, type: img.type, url_origin: img.url_origin })
    //     }else{
    //         image_selected.value.push({id: img.id, name:img?.name ??img?.file?.name, url:img.url,exists:true,index, type: img.type, url_origin: img.url_origin })
    //     }
    // }
}

function submitDelete () {

}

function openPreview(url) {
    // console.log(url,'url');
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

    .gallery-card {
        box-shadow: 0px 2.144px 4.288px 0px rgba(0, 0, 0, 0.15);
        &:hover {
            box-shadow: 0px 2.144px 4.288px 0px rgba(0, 0, 0, 0.15);
        }
        &__selected {
            border: 1px solid var(--h-gray-400);
            box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.15);
        }
    }
</style>
