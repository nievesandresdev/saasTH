<template>
    <Modal :isVisible="test" width="341px" footer>
        <template #content>
            test modal
        </template>
    </Modal>
</template>
<script setup>
import { inject } from 'vue'
import Modal from '@/components/ModalWindow.vue'

const test = inject('test')
</script>

