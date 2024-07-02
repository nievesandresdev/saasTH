<template>
    <div class="mt-6 flex justify-between items-center">
        <h1 class="text-lg font-medium">Feedback en {{ status }}</h1>
        <div class="flex items-center gap-2" v-if="!hideToggleButton">
            <p class="text-sm font-semibold">Mostrar feedback al huésped</p>
            <label for="toggle" id="toggle-input" class="relative cursor-pointer mb-0">
                <input
                    type="checkbox"
                    id="toggle"
                    class="sr-only"
                    :checked="defaultToggle"
                    @input="toggle"
                />
                <div class="block hbg-gray-400 w-[1.875rem] h-[1.125rem] rounded-full hborder-gray-400"></div>
                <div class="dot absolute left-[0.125rem] top-[0.125rem] hbg-white-100 w-3.5 h-3.5 rounded-full transition"></div>
                
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
                        {{ tooltipText }}
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
        default:false
    },
    hideToggleButton:{
        type:Boolean,
        default:false
    },
    status:{
        type:String,
        default:'Pre-Stay'
    },
    tooltipText:{
        type:String,
        default:'La desactivación del feedback en Pre-Stay se aplicará a las estancias que se creen a partir de este momento. Las estancias que ya están creadas recibirán el flujo de feedback que estaba programado.'
    }
})
const emit = defineEmits(['onchange'])

function toggle(event){
    emit('onchange',event.target.checked)
    console.log('toggle',event.target.checked)
}
</script>