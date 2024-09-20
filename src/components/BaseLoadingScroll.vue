<template>
    <div class="loader" :class="class"></div>
</template>

<script setup>
const props = defineProps({
    class: { 
        type: String,
        default: '',
    },
});
</script>

    <style>
        .loader {
            border: 3px solid #f3f3f3;
            border-top: 3px solid #34A98F;
            border-radius: 50%;
            width: 35px;
            height: 35px;
            animation: spin 2s linear infinite;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    </style>