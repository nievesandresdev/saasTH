<template>
    <div class="rounded-[10px] py-6 px-5 shadow-hoster w-[295px]" :class="{'flex flex-col':special}">
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
        <p class="mt-2 text-sm leading-[140%]"><slot name="msg"></slot></p>
        <div class="flex justify-between"  :class="{'mt-auto':special,'mt-6':!special}">
            <div>
                <h3 class="text-xs font-medium leading-[110%] htext-gray-500">Canales</h3>
                <div class="mt-1 rounded-full bg-[#f3f3f3] h-10 w-10">
                    <slot name="canal"></slot>
                </div>
            </div>
            <div class="mt-auto">
                <slot name="button"></slot>
            </div>
        </div>
    </div>
</template>
<script setup>
defineProps({
    title:String,
    period:String,
    special:Boolean
})

const periodsColor = {
    'pre-stay':'#D9E8F2',
    'stay':'#D9F2E9',
}
</script>