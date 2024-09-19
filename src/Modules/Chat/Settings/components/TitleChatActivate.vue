<template>
    <div class="mt-6 flex justify-between items-center z-[300] px-6">
        <div class="flex justify-start items-center gap-2">
            <h1 class="text-[22px] font-medium">Configuración de chat</h1>
            <Tooltip
                size="l"
                :top="25"
                :left="0"
            >
                <template v-slot:button>
                    <img class="w-6 h-6" src="/assets/icons/info.blue.svg">
                </template>
                <template v-slot:content>
                    <p class="text-sm">
                        Aquí podrás configurar los aspectos, funcionamientos y disponibilidad horaria del chat, mediante el cual te comunicarás con tus huéspedes.
                    </p>
                </template>
            </Tooltip>
        </div>
        <div class="flex items-center gap-2" v-if="!hideToggleButton">
            <p class="text-sm font-semibold">Mostrar en la WebApp</p>
            <label for="toggle" id="toggle-input" class="relative cursor-pointer mb-0">
                <input
                    :checked="defaultToggle"
                    type="checkbox"
                    class="sr-only"
                    id="toggle"
                    @change="toggle"
                />
                <div
                :class="['block w-[1.875rem] h-[1.125rem] rounded-full', defaultToggle ? 'bg-[#34A98F]' : 'bg-gray-400']"
                ></div>
                <div
                :class="['dot absolute top-[0.125rem] w-3.5 h-3.5 rounded-full transition bg-white', defaultToggle ? 'transform translate-x-full' : 'left-[0.125rem]']"
                ></div>
            </label>
            <Tooltip
                size="l"
                :top="25"
                :right="0"
            >
                <template v-slot:button>
                    <img class="w-6 h-6" src="/assets/icons/info.blue.svg">
                </template>
                <template v-slot:content>
                    <p class="text-sm">
                        Con el interruptor "Mostrar en la WebApp" controlas la visibilidad de cierta información para el huésped.<br><br>
                            Mientras se encuentre apagado, tus huéspedes dejarán de ver el contenido de esta sección en tu WebApp.
                    </p>
                </template>
            </Tooltip>
        </div>
    </div>
</template>
<script setup>
import Tooltip from '@/components/Tooltip.vue'

const props = defineProps({
    defaultToggle:{
        type:Boolean,
        default:null
    },
    hideToggleButton:{
        type:Boolean,
        default:null
    },
})
const emit = defineEmits(['onchange'])

function toggle(event){
    emit('onchange',event.target.checked)
}
</script>