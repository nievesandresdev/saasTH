<template>
    <SlidePanel :isOpen="panelSelected === 'heroSection'" @closePanel="closePanel" :right="0">
        <!-- content -->
        <div>
            <!-- head panel -->
            <section class="px-4 py-6 border-b hborder-gray-400">
                <h1 class="text-[22px] font-medium leading-[72%]">Imagen de portada</h1>
            </section>

            <section class="px-4 py-6 h-[calc(100vh-153px)] overflow-y-auto">
                <h2 class="text-sm leading-[140%] font-medium htext-gray-500">{{ imagesContainer.length }} imagenes</h2>
                <div class="grid grid-cols-2 gap-3 mt-2">
                    <label 
                        for="fileInput"
                        class="relative w-[224px] h-[172px] py-[12px] rounded-[6px] border hborder-gray-400 cursor-pointer flex flex-col justify-center items-center shadow-hoster m-1"
                    >   
                        <p class="text-sm leading-[140%] text-center htext-black-200">+</p>
                        <p class="text-sm leading-[140%] text-center htext-black-200">Subir imagen</p>
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
                    
                    <div 
                        v-for="(img, index) in imagesContainer" :key="index"
                        class="border-4 rounded-[9px]"
                        :class="{'hborder-green-600': checkSelectedImage(img.url), 'border-transparent': !checkSelectedImage(img.url)}"
                    >
                        <div 
                            class="truncate relative"
                        >
                            <div 
                                class="relative h-full cursor-pointer"
                                @click="selectImage(img, index)"
                            >
                                <img 
                                    class="w-[224px] h-[149px] object-cover shadow-hoster rounded-[6px]"
                                    loading="lazy"
                                    :src="galleryStore.formatImage({ url: img.url, type: img.type, urlDefault: img?.default })"
                                >
                            </div>
                        </div>
                        <p class="text-xs font-medium mt-2 truncate w-[12.438rem]">
                            {{ img?.name ?? img?.file?.name }}
                        </p>
                    </div>
                </div>
            </section>

            <section class="flex justify-between items-center">
                <ChangesBar 
                    :existingChanges="imageSelected && !loading"
                    :validChanges="imageSelected && !loading"
                    @cancel="closePanel" 
                    @submit="submit"
                />
            </section>
        </div>
    </SlidePanel>
</template>
<script setup>
import { inject, computed, ref, onMounted } from 'vue';
import SlidePanel from '@/components/SlidePanel.vue';
import ChangesBar from '@/components/Forms/ChangesBar.vue'
// STORES
import { useGalleryStore } from '@/stores/modules/gallery';
const galleryStore = useGalleryStore()
import { useToastAlert } from '@/composables/useToastAlert'
const toast = useToastAlert();
import { useHotelStore } from '@/stores/modules/hotel';
const hotelStore = useHotelStore()


// DATA
const panelSelected = inject('panelSelected')
//
const images = ref([])
const imageSelected = ref(null)
const indexImageHover = ref(null);
const loading = ref(false);

onMounted(()=> {
    loadGallery()
})

async function loadGallery() {
    imageSelected.value = null;
    let config = { showPreloader: false  }
    const response = await galleryStore.$getAll({search: ''}, config);
    const { ok, data} = response;
    if (ok) {
        images.value = data.images_gallery_hotel;
    }
}


const imagesContainer = computed(()=> {
    const imagesCurrent = images.value;
    return imagesCurrent;
});

function checkSelectedImage (url) {
    let exit = imageSelected.value?.url == url;
    return exit
}

function selectImage (img, index) {
    if (imageSelected.value) {
        imageSelected.value = null
    }
    if(img.name){
        imageSelected.value = { id: null, name:img?.name ??img?.file?.name, url: img.url, exists: false, index, type: img.type, url_origin: img.url_origin }
    }
}

function handleFiles(e) {
    const files = Array.from(e.target.files);
    const maxSize = 5 * 1024 * 1024;
    console.log('test handleFiles',files)
    files.forEach((file) => {
        if (!(file instanceof File)) return;
        if (file.size > maxSize) {
            toast.error("Archivo mayor a 5mb", { position: "top-right", });
            return;
        }
        
        const reader = new FileReader();

        reader.onload = (e) => {
            console.log('test 3 file',file)
            if(file.type == "image/svg+xml" || file.type == "image/jpeg" || file.type == "image/png" || file.type == "image/jpg"){
                    console.log('test 3 guardo')
                    uploadFile(e.target.result,file);
            }else{
                console.log('test 3 noguardo')
                toast.error("Tipo de archivo no permitido", { position: "top-right", });
            }
        };
        console.log('test ultimo')
        reader.readAsDataURL(file);
    });
}

async function uploadFile (url,file) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type',  'image-hotel');
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

async function submit () {
    const body = {
      buttons_home: false,
      image: imageSelected.value.url ?? null
    };
    console.log('test body',body)
    console.log('test imageSelected',imageSelected.value)
    loading.value = true;
    const response = await hotelStore.$updateShowButtons(body);
    await hotelStore.reloadHotel();
    if (response.ok) {
      toast.warningToast('Configuración actualizada correctamente');
      closePanel()  
      resetCompoent();
    } else {
      toast.errorToast('Error al actualizar la configuración');
    }
    loading.value = false;
    
}

function formateNameImage (nameImageOld) {
    let nameImageNew = nameImageOld?.replace(/<\/?[^>]+(>|$)/g, "")?.trim()  ?? null;
    return nameImageNew;
}

function resetCompoent () {
    loadGallery();
    imageSelected.value = null;
}

function closePanel () {
    imageSelected.value = null;
    panelSelected.value = null;

}


</script>