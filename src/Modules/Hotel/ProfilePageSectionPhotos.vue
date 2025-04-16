<template>
    <div class="max-w-profile">
        <div class="flex flex-wrap gap-4">
            <div class="w-[224px] h-[149px] rounded-[6px] border hborder-black-100 cursor-pointer gallery-file flex flex-shrink-0" @click="openModalImage">
                <div class="m-auto">
                    <img src="/assets/icons/1.TH.PLUS.svg" class="w-4 h-4 mx-auto green-600-onhover">
                    <h5 class="text-base font-medium leading-[140%] mt-1 group-hover:text-[#34A98F] text-center">
                        Añadir imagen
                    </h5>
                </div>
            </div>

            <template v-for="(image, index) in collapsedImages" :key="index">
                <!-- :class="{'opacity-50': (index > imagesOpacityFromIndex) && isCollapsed && (images.length > maxImagesCollapsed)}" -->
                <div
                    class="group "
                >
                    <div class="w-[224px] h-[149px] relative" @click="openPreview(index)">
                        <div class="group-hover:bg-[linear-gradient(0deg,rgba(0,0,0,0.30)0%,rgba(0,0,0,0.30)100%)] w-full h-full absolute top-0 left-0 z-10 rounded-[6px]"></div>

                        <img
                            :src="hotelStorage.formatImage({image})"
                            alt="photo preview"
                            loading="lazy"
                            class="w-full h-full rounded-[6px] object-cover"
                        />
                        <div class="absolute z-20 top-2 left-2 bg-white rounded-[3px] p-0.5 hidden group-hover:block cursor-pointer">
                            <img class="w-5 h-5" src="/assets/icons/1.TH.SEARCH.svg" alt="">
                        </div>
                        <div 
                            class="absolute z-20 top-2 right-2 bg-white rounded-[3px] hidden group-hover:block cursor-pointer"
                            @click.stop="deleteImage(image.id)"
                        >
                            <img class="w-6 h-6" src="/assets/icons/1.TH.DELETE.OUTLINE.svg" alt="">
                        </div>
                    </div>
                    <p class="text-xs font-medium leading-[130%] mt-2 w-[224px] truncate">{{ image?.name }}</p>
                    <!-- <div
                        v-if="index <= imagesOpacityFromIndex && isCollapsed"
                        class="absolute w-5 h-5 bg-white rounded-full top-2 right-4 cursor-pointer flex items-center justify-center"
                    >
                        <img
                            src="\assets\icons\erase-image.svg"
                            alt="delete"
                            class="w-[0.648rem] h-[0.833rem]"
                        />
                    </div> -->
                </div>
            </template>
        </div>
        <div v-if="images.length > maxImagesCollapsed" class="w-full flex justify-center pt-4 relative" :class="{'mt-[30px]' : !isCollapsed}">
            <button class="hbtn-tertiary underline text-sm font-medium" @click="isCollapsed = !isCollapsed">
                {{ isCollapsed ? 'Ver más' : 'Ver menos' }}
            </button>

            <div v-if="isCollapsed" class="absolute w-full h-[100px] left-0 top-[-100px] bg-[linear-gradient(to_bottom,transparent_0%,transparent_0%,white_105%,white_100%)]"></div>
        </div>
    </div>

    <ProfileImagePreview :images="images" :initialImageIndex="selectedImageIndex" @close="closePreview" />

</template>

<script setup>
    import { ref, reactive, onMounted, provide, computed, inject } from 'vue';
    import ProfileImagePreview from './Components/ProfileImagePreview.vue';

    // STATE
    import { useHotelStore } from '@/stores/modules/hotel';
    const hotelStorage = useHotelStore();

    import { useToastAlert } from '@/composables/useToastAlert'
    const toast = useToastAlert();

    const emits = defineEmits(['openModelGallery','reloadImages']);

    // DATA
    const form = inject('form');
    const windowWidth = window.innerWidth;
    const isCollapsed = ref(true);
    const imagesOpacityFromIndex = ref(windowWidth < 1920 ? 2 : 5)
    const maxImagesCollapsed = ref(windowWidth < 1920 ? 5 : 9)
    const isPreviewOpen = ref(false);

    const selectedImageIndex = ref(0);

    // const isOpacity = (index) => {
    //     if (form.images_hotel?.length > ) {
    //         let o = (index > imagesOpacityFromIndex.value) && isCollapsed.value;
    //         return o;
    //     } else {

    //     }
    // };

    const images = computed(() => {
        // console.log('test images_hotel',form.images_hotel);
        return [...form.images_hotel];
    });

    const collapsedImages = computed(() => {
        if (isCollapsed.value) {
            const i = images.value.slice(0, maxImagesCollapsed.value);
            return i;
        } else {
            return images.value;
        }
    });

    function openModalImage () {
        emits('openModelGallery');
    }

    const openPreview = (index) => {
        selectedImageIndex.value = index;
        isPreviewOpen.value = true;
    };

    const closePreview = () => {
        isPreviewOpen.value = false;
    };

    const deleteImage = async (id) =>{
        const { ok, data } = await hotelStorage.$deleteImageByHotel({imageId : id})
        if (ok) {
            toast.warningToast('Imagen eliminada.','top-right');
            emits('reloadImages')
        } else {
            toast.errorToast(data?.message,'top-right');
        }

    }

    provide('isPreviewOpen',isPreviewOpen)

</script>

<style lang="scss" scoped>
    .gradient-images {
    background: linear-gradient(
        to bottom,
        transparent 0%,
        transparent 60%,
        white 60%,
        white 100%
    );
    }

    .gallery-file {
        & .icon {
            width: 20px;
            height: 20px;
            background-image: url('/public/assets/icons/1.TH.PLUS.svg');
            background-size: cover;
        }
        &:hover {
            border-color: #34A98F;

            & > h5 {
                color: #34A98F;
            }

            & .icon {
                background-image: url('/public/assets/icons/1.TH.PLUS.GREEN.svg');
            }

        } 
    }
</style>