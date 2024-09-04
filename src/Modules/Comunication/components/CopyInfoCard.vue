<template>
    <div class="w-[752px]">
        <div class="border hborder-gray-400 rounded-[10px] p-4 w-full h-[250px]" v-html="text"></div>
        <div class="text-right mt-8">
            <a @click="copyTextToClipboard" href="javascript:void(0)" class="hbtn-primary cursor-pointer px-4 py-3 h-10 text-sm leading-[100%] inline-block">
                Copiar mensaje
            </a>
        </div>
    </div>
</template>
<script setup>
// composable
import { useToastAlert } from '@/composables/useToastAlert'

const { text } = defineProps({
    text: String
})

const toast = useToastAlert();

const copyTextToClipboard = async () => {
    try {
        await navigator.clipboard.writeText(text);
        toast.warningToast('Copiado con éxito', 'top-right');
    } catch (err) {
        console.error('Error al copiar el texto: ', err);
        toast.errorToast('Error al copiar el texto', 'top-right');
    }
}
</script>