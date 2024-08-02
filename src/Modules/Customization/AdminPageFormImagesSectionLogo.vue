<template>
    <div class="px-4 py-6 rounded-[10px] hbg-white-100 card-form">
        <div class="max-w-[611px]">
            <h2 class="text-base font-medium">Logo</h2>
            <p class="text-sm mt-[4px]">
                Añade tu logo para que tus huéspedes puedan visualizarlo en la webapp.  <br>
                Tendrá que tener un tamaño máximo de 5MB. Te recomendamos que sea en formato .png o .svg
            </p>
            <div
                v-if="imgSelected?.url"
                class="mt-4"
            >
                <div class="card-logo mt-4 rounded-[6px] p-2 flex justify-center items-center relative border hbg-gray-100 hborder-gray-400">
                        <!-- <button
                            class="absolute right-2 top-2 cursor-pointer rounded-full w-[20px] h-[20px] pt-[1.5px] pl-[1.5px] pb-[2px] pr-[2px] hover:bg-[#FAFAFA] bg-[#D9D9D9] hbtn-hover"
                            @click="openGallery"
                        >
                            <img
                                src="/vendor_asset/img/hoster/icons/editar.svg"
                                class="w-[16px] h-[16px]"
                                alt="editar"
                            >
                        </button> -->
                        <button
                            class="absolute right-2 top-2 bg-white p-[2px] rounded-[3px] w-[24px] h-[24px] p-[2px]"
                            @click="openGallery"
                        >
                            <img src="/assets/icons/1.TH.EDIT.OUTLINED.svg" class=" w-[20px] h-[20px]">
                        </button>
                    
                    <div class="box-img flex">
                        <img  class="object-contain" :src="$formatImage({url: imgSelected.url, type: imgSelected.type, urlDefault: imgSelected?.default })" alt="">
                    </div>
                    <a 
                        class="underline text-sm font-medium absolute cursor-pointer" style="bottom: -4px;right: -53px;"
                        @click="removeLogo"
                    >
                        Borrar    
                    </a>
                </div>
                <p class="text-xs mt-2">
                    {{ imgSelected?.name ?? imgSelected.file?.name }}
                </p>    
            </div>
            <button v-else class="mt-4 relative w-[140px] h-[93px] rounded-[6px] border hborder-black-100 cursor-pointer add-file" @click="openGallery">
                <div class="icon w-[16px] h-[16px] inline-block " />
                <h5 class="text-base font-medium text-center flex flex-column items-center justify-center">
                    Añadir imagen
                </h5>
            </button>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, computed, inject } from 'vue'

import { $formatImage } from '@/utils/helpers';

    const emit = defineEmits(['remove:img','open:gallery']);

    const imgSelected = inject('imgSelectedLogo');

    //data

    function openGallery(){
        emit('open:gallery','logo');
    }

    function removeLogo(){
        emit('remove:img','logo');
    }

    function closemodal(){
        // $('#modal-warning').modal('hide')
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
    .box-img{
        width: 78px;
        height: 78px;
    }
    .logo-selected{
        width: 148px;
        height: 101px;
        left: -5px;
        border: 1px solid var(--h-green-700);
    }
}

.add-file {
    & .icon {
        width: 20px;
        height: 20px;
        background-image: url('/public/assets/icons/1.TH.PLUS.svg');
        background-size: cover;
    }
    &:hover {
        border-color: var(--h-green-600);

        & > h5 {
            color: var(--h-green-600);
        }

        & .icon {
            background-image: url('/public/assets/icons/1.TH.PLUS.GREEN.svg');
        }

    }
}

</style>