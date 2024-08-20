<template>
    <div
        class="space-x-1 flex items-center"   
    >
        <button
            :class="{'opacity-35':disabledButtons || disabledPrev}"
            :disabled="disabledButtons || disabledPrev"
            @click="prev"
        >
            <img
                class="w-4 h-4 icon-inactive rotate-180"
                :src="`/assets/icons/1.TH.NEXT.svg`"
            >
        </button>
        <p class="text-base leading-[110%]" :class="{'opacity-25': disabledButtons}">
            {{ pageCurrent }}/{{ numberPages }}
        </p>
        <button
            :class="{'opacity-35': disabledButtons || disabledNext}"
            :disabled="disabledButtons || disabledNext"
            @click="next"
        >
            <img
                class="w-4 h-4"
                :src="`/assets/icons/1.TH.NEXT.svg`"
            >
        </button>
    </div>
</template>

<script setup>
import { inject, ref, computed } from 'vue';

const emits = defineEmits(['change-page']);

// INJECT
const responseCurrent = inject('responseCurrent');
const responseReviewData = inject('responseReviewData');
const responseGenerated = inject('responseGenerated');
const disabledButtons = inject('disabledButtons');
const pageCurrent = inject('pageCurrent');

// COMPUTED
const numberPages = computed(() => {
    return responseReviewData.value.length;
});
const disabledNext = computed(() => {
    return pageCurrent.value >= numberPages.value;
});
const disabledPrev = computed(() => {
    return pageCurrent.value <= 1 ;
});

// FUNCTION
function next () {
    pageCurrent.value++;
    emits('change-page', pageCurrent.value);
}
function prev () {
    if (pageCurrent.value > 1) {
        pageCurrent.value--;
    }
    emits('change-page', pageCurrent.value);
}

</script>