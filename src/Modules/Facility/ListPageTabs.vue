<template>
    <div class="flex mt-4">
        <button 
            class="border hborder-gray-400 px-4 py-2 text-sm font-medium leading-[110%] rounded-[6px]"
            :class="{'htext-gray-500':facilitiesEmpty, 'hborder-green-700 hbg-green-200 htext-green-600' : filter == 'visible', 'hborder-color-gray-400' : filter !== 'visible'}"
            @click="changeVisibility('visible')"
            :disabled="facilitiesEmpty"
        >
            Visibles
        </button>
        <button 
            class="border hborder-gray-400 px-4 py-2 text-sm font-medium leading-[110%] rounded-[6px] ml-4"
            :class="{'htext-gray-500':facilitiesEmpty, 'hborder-green-700 hbg-green-200 htext-green-600' : filter == 'hidden', 'hborder-color-gray-400' : filter !== 'hidden'}"
            @click="changeVisibility('hidden')"
            :disabled="facilitiesEmpty"
        >
            Ocultas
        </button>
    </div>
</template>

<script setup>
    import { ref, reactive, onMounted, provide, computed } from 'vue';

    // DATA
    const facilitiesEmpty = ref(null)
    const filter = ref(null)

    // FUNCTIONS

    function changeVisibility (mode) {

    }

</script>