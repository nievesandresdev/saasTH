<template>
    <span
        class="icon relative flex items-center leading-3"
    >
        <slot name="button"></slot>
        <div class="tooltipp " :class="sizeCustom ? `w-[${sizeCustom}px]` : `width-${size}`" :style="styles">
            <slot name="content"></slot>
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

</script>

<style>
    .tooltipp{
        position: fixed;
        border: none;
        background-color: #fff;
        z-index:90000;
        color: #000;
        padding: 16px;
        text-align: left;
        min-height: 30px;
        border-radius: 10px;
        box-shadow: 0px 3.27806px 6.55612px rgba(0, 0, 0, 0.15);
        z-index: 100000;
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
