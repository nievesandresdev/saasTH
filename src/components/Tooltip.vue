<template>
    <span
        class="icon relative flex items-center leading-3"
        v-if="styles"
    >
        <slot name="button"></slot>
        <div class="tooltipp " :class="size_custom ? `w-[${size_custom}px]` : `width-${size}`" :style="styles">
            <slot name="content"></slot>
        </div>
    </span>
</template>

<script setup>
    import { ref, onMounted } from 'vue'
    const { size, top, bottom, right, left, color, size_custom } = defineProps({
        //S M L XS
        size: {
            type: String,
            default: 's'
        },
        size_custom: {
            type: Number,
        },
        top: {
            type: Number,
            default: 26
        },
        bottom: {
            type: Number,
            default: null
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

    const leftDefault = ref(`left: ${left}px !important;`);
    const rightDefault = ref(`right: ${right}px !important;`);
    const topDefault = ref(`top: ${top}px !important;`);
    const bottomDefault = ref(`bottom: ${bottom}px !important;`);
    const backgroundColorDefault = ref(`background-color: ${color} !important;`);

    const styles = ref(null);

    onMounted(() => {
        let verticalAlign = bottom !== null ? bottomDefault.value : topDefault.value;
        let horizontalAlign = left !== null ? leftDefault.value : rightDefault.value;
        styles.value = `${verticalAlign}${horizontalAlign}${backgroundColorDefault.value}`
    })
    // const styles = ref(left == null ? {top: `${top}px !important`, right: `${right}px`, backgroundColor: `${color}`} :{top: `${top}px !important`, left: `${left}px`, backgroundColor: `${color}`});

</script>

<style>
    .tooltipp{
        position: absolute;
        border: none;
        background-color: #fff;
        z-index: 10000;
        color: #000;
        padding: 16px;
        text-align: left;
        min-height: 30px;
        border-radius: 10px;
        box-shadow: 0px 3.27806px 6.55612px rgba(0, 0, 0, 0.15);
        display: none;
        pointer-events: none;
    }

    .icon {
        position: relative;
        display: inline-flex;
        align-items: center;
    }

    .icon:hover .tooltipp {
        display: block;
    }
    .width-xs {
        width: 185px;
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
