<template>
    <span
        class="icon relative flex items-center leading-3"
    >
        <slot name="button"></slot>
        <div class="tooltipp " :class="sizeCustom ? `w-[${sizeCustom}px]` : `width-${size}`" :style="styles">
            <p class="text-sm leading-[150%] font-normal">
                Nuestra IA, Hosty, traducirá todo el contenido de la WebApp del español al idioma preferido por tu huésped.
            </p>
            <br>
            <p class="text-sm leading-[150%] font-normal">
                Cada cambio que realices en la configuración se traducirá automáticamente del español a todos los idiomas disponibles.
            </p>
            <br>
            <div class="grid grid-cols-3 gap-4">
                <template v-for="(language, index) in languages">
                    <div class="flex items-center">
                        <img :src="language.img" class="w-[24px] h-[24px]">
                        <span class="text-sm font-normal ml-2">{{ language.label }}</span>
                    </div>
                </template>
            </div>
        </div>
    </span>
</template>

<script setup>
    import { ref } from 'vue'
    const { size, top, right, left, color, sizeCustom } = defineProps({
        //S M L
        size: {
            type: String,
            default: 's'
        },
        sizeCustom: {
            type: Number,
        },
        top: {
            type: Number,
            default: 25
        },
        right: {
            type: Number,
            default: -15
        },
        left: {
            type: Number,
            default: null
        },
        color: {
            type: String,
            default: '#fff'
        },
    })

    const styles = ref(left == null ? {top: `${top}px !important`, right: `${right}px`, backgroundColor: `${color}`} :{top: `${top}px !important`, left: `${left}px`, backgroundColor: `${color}`});

    const languages = [
        { value: 'es', label: 'Español', img: '/assets/icons/flags/es.svg' },
        { value: 'pt', label: 'Portugues', img: '/assets/icons/flags/pt.svg' },
        { value: 'al', label: 'Alemán', img: '/assets/icons/flags/al.svg' },
        { value: 'en', label: 'Inglés', img: '/assets/icons/flags/en.svg' },
        { value: 'it', label: 'Italiano', img: '/assets/icons/flags/it.svg' },
        { value: 'fr', label: 'Francés', img: '/assets/icons/flags/fr.svg' },
    ]

</script>

<style>
    .tooltipp{
        position: absolute;
        border: none;
        background-color: #fff;
        z-index:9000000;
        color: #000;
        padding: 16px;
        text-align: left;
        min-height: 30px;
        border-radius: 10px;
        box-shadow: 0px 3.27806px 6.55612px rgba(0, 0, 0, 0.15);
        /* right: -15px;
        top: 25px; */
        display: none;
    }

    /* .icon:hover {
        color: #ff9c06;
    } */
    .icon:hover .tooltipp {
        display: block;
    }
    .width-xs {
        width: 215px;
    }
    .width-s {
        width: 290px;
    }
    .width-m {
        width: 395px;
    }
    .width-l {
        width: 500px;
    }
</style>
