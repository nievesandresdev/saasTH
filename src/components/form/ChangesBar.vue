<template>
    <section class="w-full sticky bottom-0 left-0 hbg-white-100 p-6 border-t hborder-gray-400 z-10">
        <div class="flex w-full justify-between">
            <button 
                class="text-base leading-[110%] font-medium underline"
                :class="{'htext-gray-300':!existingChanges, 'htext-black-100 hover-htext-black-200' : existingChanges}"
                :disabled="!existingChanges"
                @click="cancelChanges"
            >
                Cancelar
            </button>
            <button 
                class="hbtn-cta py-3 px-4 text-sm leading-[110%] font-medium"
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
})
const emit = defineEmits(['cancel','submit'])

function submit(){
    emit('submit')
}

function cancelChanges(){
    emit('cancel')
}
</script>