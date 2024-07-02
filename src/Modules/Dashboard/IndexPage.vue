<template>
    <h1 class="font-semibold text-3xl">
        dashboard
    </h1>
    <pre>
        {{$route.fullPath}}
    </pre>
    <button 
        class="bg-red-200 p-2 rounded"
        @click="defineMockupData"
    >cambiar</button>
</template>
<script setup>
import { onMounted } from 'vue'
import { useToastAlert } from '@/composables/useToastAlert'
import { useMockupStore } from '@/stores/modules/mockup'

const mockupStore = useMockupStore();

const toast = useToastAlert();

onMounted(()=>{
    mockupStore.$setIframeUrl('https://nobuhotelsevillatest.test.thehoster.io/webapp/?g=9')
    mockupStore.$setInfo1('Guarda para ver tus cambios en tiempo real', '/assets/icons/1.TH.EDIT.OUTLINED.svg')
})

function defineMockupData() {
    mockupStore.$setIframeUrl('https://nobuhotelsevillatest.test.thehoster.io/webapp/consultas?g=9')
    mockupStore.$setInfo1('Guarda', '/assets/icons/1.TH.EDIT.OUTLINED.svg')
    toast.warningToast('texto','top-right')
}

</script>