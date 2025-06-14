<template>
    <div class="px-6">
        <div class="z-[300] relative border-b hborder-gray-400">
            <h1 class="py-5 text-[22px] font-medium leading-[110%]">Seguimiento - {{ period }}</h1>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router';

const route = useRoute();
const props = defineProps({
    period: {
        type: String,
        required: true
    }
});

</script>