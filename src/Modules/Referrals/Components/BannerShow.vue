<template>
    <div class="w-full h-[68px] bg-[#FFF3CC] flex flex-col items-center justify-center text-center text-sm font-medium py-[12px] px-6" v-if="!show">
      <p>Esta sección está oculta y no es visible para tus huéspedes. Activa "Mostrar al huésped" para hacerla visible.</p>
      <div class="flex items-center gap-1 mt-1">
        <img class="w-4 h-4" src="/assets/icons/1.TH.INFO.svg" alt="Info Icon">
        <span>Los cambios en el programa de referidos <strong>afectarán a todos los alojamientos de la cuenta.</strong></span>
      </div>
    </div>
    <div class="w-full h-[40px] bg-[#D9E8F2] flex flex-col items-center justify-center text-center text-sm font-medium py-[12px] px-6" v-if="show && props.chain.type === 'CHAIN'">
      <p>Los cambios en el programa de referidos <strong>afectarán a todos los alojamientos de la cuenta.</strong></p>
    </div>
</template>
<script setup>

const props = defineProps({
  show: Boolean,
  chain: Object
})

</script>
  