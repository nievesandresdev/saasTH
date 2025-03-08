<template>
    <label
        v-if="!urlImage"
        class="relative w-[134px] rounded-[10px] border hborder-black-100 cursor-pointer gallery-file flex justify-center items-center h-[91px]"
        @click="handleClick"
    >   
        <h5 class="text-sm font-medium text-center flex flex-col items-center justify-center">
            <div class="icon w-[240px] inline-block mb-2 " />
            {{ title }}
        </h5>
    </label>
    <div
        v-else
        class="relative rounded-[10px] w-[134px] h-[91px] cursor-pointer"
        @click="handleClick"
    >
        <img class="w-full h-full rounded-xl object-cover " :src="urlImage">
    </div>
</template>

<script setup>

const props = defineProps({
    title: {
        type: String,
        default: ''
    },
    urlImage: {
        type: String,
        default: ''
    },
});

const emits = defineEmits(['click']);

function handleClick () {
    emits('click');
}

</script>

<style lang="scss">
.shadow-card{
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.15);
}

.shadow-selected,
.shadow-card:hover{
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.15);
}


.hidden-overlay{
    background: rgba(0, 0, 0, 0.30)
}
.shadow-draginng {
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}
.hover-swich{
    box-shadow: 0px 3.5px 7px 0px rgba(0, 0, 0, 0.15);
}
.gallery-file {
    & .icon {
        width: 16px;
        height: 16px;
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