<template>
    <div v-if="show_guest === false" class="w-full bg-[#FFF3CC] p-4 mb-4">
        <p class="text-sm font-medium text-center">
            La sección <strong>Chat</strong> está oculta y no es visible para tus huéspedes. Activa "Mostrar al huésped" para hacerla visible.
        </p>
    </div>
</template>
<script setup>
const props = defineProps({
    show_guest:{
        type:Boolean,
        default:null // Cambiado a null para evitar mostrar el alert al inicio
    }
})
</script>
