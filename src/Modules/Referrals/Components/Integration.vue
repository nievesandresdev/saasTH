<template>
    <section>
        <h1 class="text-sm font-semibold mb-2">Integración para la obtención de los beneficios</h1>
        <p class="text-sm font-normal mb-4">
            Integra este código en tu página web para la verificación y asignación de los beneficios al huésped en la página de confirmación tras su uso. 
        </p>
        <div class="flex justify-start gap-1 items-center ">
            <img class="w-[17px] h-[17px]" src="/assets/icons/info-white.svg" />
            <span class="text-sm font-medium">¿Cómo integrarlo?</span>
            <img 
                class="w-4 h-4 transition-transform duration-300 cursor-pointer"
                :class="{ 'rotate-180': showDescription }" 
                src="/assets/icons/1.TH.I.dropdown.svg" 
                @click="toggleDescription"
            />
        </div>
        <div class="flex w-full mt-1 " v-show="showDescription">
            <p class="text-sm leading-[150%] font-normal">
                Cuando el usuario introduce un código promocional en el formulario de reservas y lo valida, el sistema envía el código mediante una solicitud HTTP POST a un endpoint del servidor, que consulta una base de datos para verificar si el código existe, está vigente y cumple las condiciones asociadas. Si el código es válido, el servidor responde con los beneficios aplicables, como un descuento, y el total de la reserva se actualiza en tiempo real, mostrando un mensaje de confirmación al usuario; si es inválido o expirado, se muestra un error. Todo el proceso utiliza HTTPS y autenticación para garantizar la seguridad.
            </p>
        </div>
        <div class="flex justify-start items-center gap-1 mt-2" v-if="!props.referent.used">
            <img class="w-[20px] h-[20px]" src="/assets/icons/1.TH.WARNING.svg" />
            <span class="text-sm font-medium">Hasta que no se realice la integración, no se activarán y otorgarán los beneficios.</span>
        </div>
        <div class="flex justify-start items-center gap-1 mt-2" v-else> 
            <img class="w-[20px] h-[20px]" src="/assets/icons/TH.CHECK.svg" />
            <span class="text-sm font-medium">Integración realizada</span>
        </div>
    </section>
</template>


<script setup>
import { ref, defineProps } from 'vue'

const showDescription = ref(false)

const props = defineProps({
    referent: {
        type: Object,
        required: true
    }
})



const toggleDescription = () => {
    showDescription.value = !showDescription.value
}
</script>

<style scoped>
.rotate-180 {
    transform: rotate(180deg);
}
</style>
