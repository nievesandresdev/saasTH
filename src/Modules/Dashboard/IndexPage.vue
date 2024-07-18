<template>
    <div class="px-6">
        <h1 class="text-[22px] font-medium leading-[110%] py-5">Dashboard</h1>
        <div class="border-b border-[#BFBFBF] mb-5"></div>
        <CustomerExperience />
        <HomeFeedback />
    </div>
    
</template>
<script setup>
import { onMounted } from 'vue'
import { useToastAlert } from '@/composables/useToastAlert'
import { useMockupStore } from '@/stores/modules/mockup'
import CustomerExperience from './components/CustomerExperience.vue'
import HomeFeedback from './components/HomeFeedback.vue'


const mockupStore = useMockupStore();

const toast = useToastAlert();

onMounted(()=>{
    mockupStore.$setIframeUrl('')
    mockupStore.$setInfo1('Guarda para ver tus cambios en tiempo real', '/assets/icons/1.TH.EDIT.OUTLINED.svg')
})

function defineMockupData() {
    mockupStore.$setIframeUrl('/consultas/fakeLinkOtas')
    mockupStore.$setInfo1('Guarda', '/assets/icons/1.TH.EDIT.OUTLINED.svg')
    toast.warningToast('texto','top-right')
}

</script>