<template>
    <div class="pb-[40px]">
        <div class="mt-6 space-y-6">
            <div class="mt-6">
                <AdminPageFormImagesSectionLogo
                    @open:gallery="openGallery('logo')"
                    @remove:img="deleteImgSection('logo')"
                />
            </div>
        </div>
        <div class="mt-6">
            <AdminPageFormImagesSectionFavicon
                @open:gallery="openGallery('favicon')"
                @remove:img="deleteImgSection('favicon')"
            />
        </div>

        <div class="mt-6">
            <AdminPageFormImagesSectionWallpaper
                @open:gallery="openGallery('wallpaper')"
                @remove:img="deleteImgSection('wallpaper')"
            />
        </div>
    </div>

    <ModalGallery
        ref="modalGaleryRef"
        :id="'modal-gallery'"
        :name-image-new="hotelStore.hotelData.name"
        @update:img="addNewsImages($event)"
    />


</template>

<script setup>
import { ref, provide, reactive, onMounted, computed, inject, watchEffect } from 'vue';

import AdminPageFormImagesSectionWallpaper from './AdminPageFormImagesSectionWallpaper';
import AdminPageFormImagesSectionFavicon from './AdminPageFormImagesSectionFavicon';
import AdminPageFormImagesSectionLogo from './AdminPageFormImagesSectionLogo';
import ModalGallery from '@/components/ModalGallery';

import { $formatImage } from '@/utils/helpers';

const form = inject('form');
const containerImages = inject('containerImages');
const bgDefault = inject('bgDefault');
const imgSelectedLogo = inject('imgSelectedLogo');
const imgSelectedFav = inject('imgSelectedFav');
const imgSelectedBg = inject('imgSelectedBg');
const faviconDefault = inject('faviconDefault');
const isValidFavicon = inject('isValidFavicon');
//
const hotelStore = inject('hotelStore');

// DATA
const modalGaleryRef = ref(null); 
const currentSection = ref(null);


const textValidFavicon = ref(null);
const loadFavicon = ref(false);


provide('textValidFavicon', textValidFavicon);
provide('loadFavicon', loadFavicon);

watchEffect(() => {
    isValidFavicon.value = true;
    if (imgSelectedFav.value?.url) {
        validateFavicon().then(result => {
            isValidFavicon.value = result;
            loadFavicon.value = false;
        });
    }
    
});

// FUNCTIONS
function openGallery (section) {
    modalGaleryRef.value.openModal();
    currentSection.value = section;
}

function addNewsImages (e) {
    currentSection.value == 'logo' ? imgSelectedLogo.value = e : '';
    currentSection.value == 'logo' ? form.img_selected_logo = imgSelectedLogo.value : '';
    currentSection.value == 'wallpaper' ? imgSelectedBg.value = e : '';
    currentSection.value == 'wallpaper' ? form.img_selected_bg = imgSelectedBg.value : '';
    currentSection.value == 'favicon' ? imgSelectedFav.value = e : '';
    currentSection.value == 'favicon' ? form.img_selected_fav = imgSelectedFav.value : '';
}

function deleteImgSection(section){
    section == 'logo' ? imgSelectedLogo.value.url = null : '';
    section == 'logo' ? form.img_selected_logo = imgSelectedLogo.value : '';
    if(section == 'favicon'){
        imgSelectedFav.value.url = null;
        form.img_selected_fav = null
    }
    if(section == 'wallpaper'){
        imgSelectedBg.value = bgDefault;
        form.img_selected_bg = bgDefault;
    }
    // submit()
}


    function validateFavicon() {
        if (!imgSelectedFav.value.url) return;
        // if (img_selected_fav.value.url == favicon_default.url) return;
        const urlFavicon = $formatImage({url: imgSelectedFav.value.url});
        return new Promise((resolve, reject) => {
            if(imgSelectedFav.value.url == faviconDefault.url) return resolve(true);
            textValidFavicon.value = null
            loadFavicon.value = true;
            // Verificar la extensión.
            const validExtensions = ['.png', '.svg'];
            const extension = new URL(urlFavicon).pathname.split('.').pop();
            if (!validExtensions.includes(`.${extension}`)) {
                textValidFavicon.value = 'Formato de archivo incorrecto. Solo se admiten imágenes en formato .png o.svg';
                resolve(false);
                return;
            }

            // Verificar las dimensiones de la imagen.
            const image = new Image();
            image.onload = () => {
                let { height, width } = image
                if (width < 16 || height < 16 || width > 32 || height > 32) {
                    textValidFavicon.value = 'La imagen no cumple con las dimensiones especificadas. debe ser al menos 16x16px y máximo 32x32px';
                    resolve(false);
                    return;
                } else {
                    resolve(true);
                }
            };
            image.onerror = () => {
                textValidFavicon.value = 'error al cargar la imagen';
                resolve(false);
            };

            image.src = urlFavicon;
        });
    }

</script>
<style lang="scss">
    .card-form {
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.15);
    }
</style>