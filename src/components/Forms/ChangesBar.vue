<template>
    <section class=" bottom-0  hbg-white-100 p-6 border-t hborder-gray-400 z-10" :class="{ 'fixed': forceBottom , 'sticky w-full  left-0': !forceBottom}" :style="{ 'width': forceBottom ? 'calc(100% - 650px)' : '' }" >
        <!-- <section 
        class="fixed bottom-0 bg-white p-6 border-t border-gray-400 z-10"
        :style="`width: calc(100% - 650px)`"
    > -->
        <div class="flex w-full justify-between items-center">
            <button 
                :class="[
                    {'htext-gray-300':!existingChanges || !validChanges, 'htext-black-100 hover-htext-black-200 cursor-pointer' : existingChanges && validChanges},
                    textCancelClass
                ]"
                :disabled="!existingChanges || !validChanges"
                @click="cancelChanges"
            >
                Cancelar
            </button>
            <button 
                class="hbtn-cta py-3 px-4 text-sm leading-[110%] font-medium cursor-pointer"
                :class="{'cta-disabled':!validChanges}"
                :disabled="!validChanges"
                @click="submit"
            >
                Guardar
            </button>
        </div>
    </section>
</template>
<script setup>
defineProps({
    existingChanges:{
        type:Boolean,
        default:false
    },
    validChanges:{
        type:Boolean,
        default:false
    },
    forceBottom:{
        type:Boolean,
        default:false
    },
    textCancelClass:{
        type:String,
        default:'text-base leading-[110%] font-medium underline'
    }
})
const emit = defineEmits(['cancel','submit'])


function submit(){
    emit('submit')
}

function cancelChanges(){
    emit('cancel')
}
</script>