<template>
    <div class="rounded-[10px] p-6 shadow-hoster w-[296px] flex flex-col justify-between">
        <div class="flex justify-between items-center">
            <h1 v-if="title" class="text-base font-semibold leading-[120%]">{{ title }}</h1>
            <span 
                v-if="period"
                class="uppercase h-6 text-[10px] font-semibold px-2 leading-[104%] py-2 rounded-full"
                :class="`bg-[${periodsColor[period]}]`"
            >
                {{ period }}
            </span>
        </div>
        <!-- Contenedor del Mensaje -->
        <div class="mt-2 flex-1">
            <p 
                class="text-sm leading-[140%] overflow-hidden text-ellipsis" 
                :class="{'line-clamp-3': special}"
            >
                <slot name="msg"></slot>
            </p>
        </div>
        <!-- Botón y Canales -->
        <div class="flex justify-between items-end mt-[14px]">
            <div>
                <h3 class="text-xs font-medium leading-[110%] text-gray-500">Canales</h3>
                <div v-if="!multichannel.length" class="mt-1 rounded-full bg-[#f3f3f3] h-10 w-10">
                    <slot name="canal"></slot>
                </div>
                <div v-else class="mt-1 flex items-center max-w-[145px]">
                    <div 
                        v-for="(channel, index) in multichannel" 
                        :key="channel"
                        class="rounded-full h-10 w-10 border border-white bg-[#f3f3f3] relative flex-shrink-0"
                        :style="{ left: '-' + (index > 0 ? (index * 4) : 0) + 'px' }"
                    >
                        <div class="h-full w-full p-2">
                            <img class="mx-auto w-6 h-6" :src="`/assets/icons/comunications/${channel}.svg`" alt="">
                        </div>
                    </div>
                </div>
            </div>
            <!-- Botón Fijo -->
            <div>
                <slot name="button"></slot>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    title: String,
    period: String,
    special: Boolean,
    multichannel: {
        type: Array,
        default: [],
    },
});

const periodsColor = {
    "pre-stay": "#D9E8F2",
    stay: "#D9F2E9",
};
</script>
