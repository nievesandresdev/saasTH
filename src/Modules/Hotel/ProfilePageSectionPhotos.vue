<template>
    <div class="max-w-profile" style="margin-left:-8px;margin-right:-8px">
        <div class="flex flex-wrap max-w-[611px] 3xl:max-w-[1081px]">
            <div class="w-[152.5px] h-[94px] mt-6 px-2">
                <label
                    class="w-full h-full flex items-center justify-center cursor-pointer rounded-[6px] text-sm font-medium border hborder-black-100 gallery-file"
                >
                    <h5 class="text-sm font-medium text-center flex flex-column items-center justify-center">
                        <div class="icon w-[20px] h-[20px] inline-block" />
                        Añadir imagen
                    </h5>
                </label>
            </div>

            <template v-for="(image, index) in collapsedImages" :key="index">
                <div
                    
                    :class="{'opacity-50': index > imagesOpacityFromIndex && isCollapsed}"
                    class="w-[152.5px] h-[94px] relative mt-6 px-2"
                >
                    <img
                        :src="hotelStorage.formatImage({image})"
                        alt="photo preview"
                        loading="lazy"
                        class="w-full h-full rounded-[6px] object-cover"
                    />
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
        <div class="w-full mt-[20px] flex justify-center  max-w-[611px] 3xl:max-w-[1081px]">
            <button class="hbtn-tertiary underline text-sm font-medium" @click="isCollapsed = !isCollapsed">
                {{ isCollapsed ? 'Ver más' : 'Ver menos' }}
            </button>
        </div>
    </div>
</template>

<script setup>
    import { ref, reactive, onMounted, provide, computed, inject } from 'vue';
    // STATE
    import { useHotelStore } from '@/stores/modules/hotel';
    const hotelStorage = useHotelStore();

    // DATA
    const form = inject('form');
    const windowWidth = window.innerWidth;
    const isCollapsed = ref(true);
    const imagesOpacityFromIndex = ref(windowWidth < 1920 ? 2 : 5)
    const maxImagesCollapsed = ref(windowWidth < 1920 ? 7 : 13)

    const collapsedImages = computed(() => {
        const images = [...form.images_hotel];
        if (isCollapsed.value) {
            const i = images.slice(0, maxImagesCollapsed.value);
            return i;
        } else {
            return images;
        }
    });

</script>

<style lang="scss">
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