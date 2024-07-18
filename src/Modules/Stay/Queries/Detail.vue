<template>
    <Head />
    <div class="p-6">
        detail queries
        {{ dataRightSide }}
    </div>
</template>
<script setup>
import { inject } from 'vue'
import Head from '../components/HeadDetail.vue'

const dataRightSide = inject('dataRightSide');
</script>
