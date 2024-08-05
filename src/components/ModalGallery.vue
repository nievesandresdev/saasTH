<template>
<ModalWindow v-if="open" :isVisible="open"  :width="'768px'" padding-content="p-0" footer="true">
    <template #content>
        <div class="h-[637px]">
            <div class="px-6 py-4 flex items-center justify-between">
                <h2 class="text-[18px] font-medium">Galería de imágenes</h2>
                <button @click="closeModal">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <BaseTab v-model="tabCurrent" class="px-[24px] mt-[24px]" :items="ITEMS_TABS" />
            <div class="h-[412px] overflow-auto">
                <div class="px-6 space-y-6">
                    <p class="text-[16px] font-medium mt-6">Elige las imágenes que deseas añadir</p>
                    <BaseTextField
                        v-model="form.search"
                        prepend-inner-icon="/assets/icons/1.TH.SEARCH.svg"
                        placeholder="Buscar imagen..."
                        class-content="w-[345px]"
                        :append-inner-icon="{icon: '/assets/icons/1.TH.CLOSE.svg', type: 'BUTTON', show: form.search?.length > 0 }"
                        @enter:search="loadGallery"
                        @click:append_inner="resetFilter(tabCurrent)"
                    />
                    <p v-if="!imagesContainer?.length" class="text-sm font-medium htext-gray-500 ">No cuentas con imágenes. Busca imágenes en tu ordenador y añadelas</p>
                    <p v-else-if="imagesContainer?.length > 0 && imageSelected?.length == 0" class="text-sm font-medium htext-gray-500">{{ textNumbersImagesFound }}</p>
                    <div v-else-if="imagesContainer?.length > 0 && imageSelected?.length > 0" class="flex space-x-[4px] items-center">
                        <img src="/assets/icons/1.TH.Checkbox.svg" class="w-[16px] h-[16px]">
                        <span class="text-sm font-medium"> {{ textNumbersImagesSelected }} </span>
                    </div>
                </div>
                <div class="mt-[16px] px-[24px] overlay-auto">
                    <div class="grid grid-cols-3 gap-4">
                        <label 
                            for="fileInput"
                            class="relative w-[224px] h-[149px] py-[12px] rounded-[6px] border hborder-black-100 cursor-pointer button-add flex flex-col justify-center items-center"
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
                                        class="w-[224px] h-[149px] rounded-[6px] object-cover"
                                        loading="lazy"
                                        :src="galleryStore.formatImage({ url: img.url, type: img.type, urlDefault: img?.default })"
                                    >
                                    <div
                                        v-if="indexImageHover === index || checkSelectedImage(img.url)"
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
                                            :checked="checkSelectedImage(img.url)"
                                            :value="img.id"
                                            :id="index"
                                            class="hcheckbox w-[24px] h-[24px]"
                                            @click="multiple ? selectImageMultiple(img, index) : selectImage(img, index)"
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
            <div class="p-6 w-full flex justify-end  hborder-top-gray-400 z-[1000] hbg-white-100 w-full">
                <button
                    class="hbtn-cta px-4 py-3 font-medium rounded-[6px] text-sm"
                    :disabled="!imageSelected?.length"
                    @click="addImages"
                >
                    Añadir
                </button>
            </div>
        </div>
    </template>
</ModalWindow>
<BasePreviewImage 
    :url-image="previewUrl"
    :is-open="isPreviewOpen"
    @click:close="closePreviewImage"
/>

</template>

<script setup>
import { ref, reactive, onMounted, provide, computed, watch } from 'vue';

import ModalWindow from '@/components/ModalWindow';
import BaseTextField from '@/components/Forms/BaseTextField';
import BaseTab from '@/components/BaseTab.vue';
import BasePreviewImage from '@/components/BasePreviewImage.vue';

// import { useGallery } from '@/composables/useGallery';

const emits = defineEmits(['update:img']);

const props = defineProps({
    multiple: {
        type: Boolean,
        default: false,
    },
});

import { useGalleryStore } from '@/stores/modules/gallery';
const galleryStore = useGalleryStore();
import { useHotelStore } from '@/stores/modules/hotel';
const hotelStore = useHotelStore();
import { useMockupStore } from '@/stores/modules/mockup';
const mockupStore = useMockupStore();
// COMPOSABLES
import { useToastAlert } from '@/composables/useToastAlert'
const toast = useToastAlert();

const open = ref(false);

// const {
//     //DATA
//     ITEMS_TABS,
//     tabCurrent,
//     form,
//     search,
//     indexImageHover,
//     textNumbersImagesFound,
//     textNumbersImagesSelected,
//     previewUrl,
//     isPreviewOpen,
//     // FUNCTIONS
//     loadGallery,
//     resetFilter,
//     imagesContainer,
//     imageSelected,
//     handleFiles,
//     openPreview,
//     closePreviewImage,
//     resetCompoent,
// } = useGallery();


    const PLACE = 'image-place';
    const HOTEL = 'image-hotel';
    const ITEMS_TABS = [{name: 'Mi alojamiento', value: HOTEL}, {name: 'Destino', value: PLACE}];

    // DATA
    const tabCurrent = ref(HOTEL);
    const form = reactive({
        search: '',
    });
    const search = ref('');
    const images = ref([]);
    const imageSelected = ref([]);
    const indexImageHover = ref(null);

    const previewUrl = ref(null);
    const isPreviewOpen = ref(false);

    const modalDeleteRef = ref(null);

    // COMPUTED
    const imagesContainer = computed(()=> {
        // console.log('images_container computed')
        const imagesCurrent = tabCurrent.value === HOTEL ? images.value.images_gallery_hotel : images.value.images_gallery_places ?? [];
        return imagesCurrent;
    });

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

    function handleFiles(e) {
        const files = Array.from(e.target.files);
        const maxSize = 5 * 1024 * 1024;

        files.forEach((file) => {
            if (!(file instanceof File)) return;
            if (file.size > maxSize) {
                toast.error("Archivo mayor a 5mb", { position: "top-right", });
                return;
            }
            
            const reader = new FileReader();

            reader.onload = (e) => {
                if(file.type == "image/svg+xml" || file.type == "image/jpeg" || file.type == "image/png" || file.type == "image/jpg"){
                        uploadFile(e.target.result,file);
                }else{
                    toast.error("Tipo de archivo no permitido", { position: "top-right", });
                }
            };
            reader.readAsDataURL(file);
        });
    }

    async function uploadFile (url,file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('type',  tabCurrent.value);
        formData.append('name_image', formateNameImage(hotelStore.hotelData.name));
        const response = await galleryStore.$upload(formData);
        const { ok, data} = response;
        if (ok) {
            toast.warningToast('Imagen guardada','top-right');
            resetCompoent();
        } else {
            toast.warningToast(data?.message,'top-right');
        }
    }

    function formateNameImage (nameImageOld) {
        let nameImageNew = nameImageOld?.replace(/<\/?[^>]+(>|$)/g, "")?.trim()  ?? null;
        return nameImageNew;
    }

    async function loadGallery() {
        imageSelected.value = [];
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

    function resetCompoent () {
        loadGallery();
        resetSelected();
    }

    async function submitDelete () {
            let bodyRequest = {
                ids_delete: [...imageSelected.value]
            }
            const response = await galleryStore.$deleteBulk(bodyRequest);
            const { ok, data } = response;
            if (ok) {
                toast.warningToast('Cambios guardados con éxito','top-right');
                resetCompoent();
            } else {
                toast.warningToast(data?.message,'top-right');
            }
    }

    function openModalDelete () {
        modalDeleteRef.value.openModal();
    }

    function openPreview(url) {
        // console.log(url,'url');
        previewUrl.value = url;
        isPreviewOpen.value = true;
    }

    function closePreviewImage () {
        previewUrl.value = null;
        isPreviewOpen.value = false;
    }

    function resetSelected () {
        imageSelected.value = [];
    }

    function resetFilter  (TYPE) {
        tabCurrent.value = TYPE
        search.value = ''
        form.search = ''
        loadGallery();
    }


// FUNCTION
function closeModal () {
    open.value = false;
}

function selectImage (img, index) {
    if (imageSelected.value.length > 0) {
        imageSelected.value = []
    }
    if(img?.file){
        imageSelected.value.push({ id: null, name:img?.name ??img?.file?.name, url: img.url, exists: false, index, type: img.type, url_origin: img.url_origin })
    }else{
        imageSelected.value.push({ id: img.id, name:img?.name ??img?.file?.name, url: img.url, exists: true, index, type: img.type, url_origin: img.url_origin })
    }
}

function selectImageMultiple(img, index){
    if (checkSelectedImage(img.url)) {
        let indexImageSelected = imageSelected.value.findIndex(item => item.url === img.url)
        imageSelected.value?.splice(index_image_selected, 1)     
    } else {
        if(img?.file){
            imageSelected.value.push({id: null, name:img?.name ??img?.file?.name, url:img.url,exists:false,index, type: img.type, url_origin: img.url_origin })
        }else{
            imageSelected.value.push({id: img.id, name:img?.name ??img?.file?.name, url:img.url,exists:true,index, type: img.type, url_origin: img.url_origin })
        }
    }
}

function openModal() {
    loadGallery();
    open.value = true; 
}
defineExpose({ openModal });

function addImages () {
    emits('update:img', props.multiple ? imageSelected.value : imageSelected.value?.[0]);
    open.value = false;
    resetCompoent();
}

</script>