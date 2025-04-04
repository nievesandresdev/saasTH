<template>
    <SlidePanel :isOpen="isOpenPanelToWifi" @closePanel="closePanel">
        <!-- content -->
        <div>
            <!-- head panel -->
            <div class="py-5 px-6 flex justify-between items-center border-b hborder-gray-400">
                <h1 class="text-[22px] font-medium leading-[110%]">
                    {{ networkId ? 'Editar' : 'Nueva'}} red WiFi
                </h1>
                <button @click="closePanel">
                    <img src="/assets/icons/1.TH.CLOSE.svg" alt="close" class="w-6 h-6">
                </button>
            </div>
            <!-- body panel -->
            <div class="p-6">
                <div class="">
                    <BaseTextField 
                        v-model="formNetwork.name"
                        textLabel="Red"
                        tooltipText="Completa este campo con el nombre real de la red."
                        @input:typing="validateInputs"
                    />
                </div>
                <div class="mt-4">
                    <BaseTextField 
                        v-model="formNetwork.password"
                        textLabel="Contraseña"
                        tooltipText="Para facilitar la conexión, tus huéspedes podrán copiar la clave del WiFi desde tu WebApp.</br></br>Si dejas este campo vacío, se indicará que la red no tiene contraseña."
                        @input:typing="validateInputs"
                    />
                </div>
                <!-- {{ JSON.stringify(errors) }} <br>
                {{ String(Boolean(changesExists)) }}<br>
                {{ String(Boolean(!formInvalid)) }}<br> -->
            </div>
        </div>
        <!-- footer panel -->
        <div class="">
            <ChangesBar 
                textCancelClass="text-sm leading-[110%] font-medium underline"    
                :existingChanges="changesExists"
                :validChanges="!formInvalid && changesExists"
                @cancel="cancelChanges" 
                @submit="submit"
            />
        </div>
    </SlidePanel>
</template>
<script setup>
import { inject, computed, onMounted, watch } from 'vue';
import SlidePanel from '@/components/SlidePanel.vue';
import BaseTextField from '@/components/Forms/BaseTextField.vue';
import ChangesBar from '@/components/Forms/ChangesBar.vue'
import { useFormValidation } from '@/composables/useFormValidation'
//
import { useToastAlert } from '@/composables/useToastAlert'
const toast = useToastAlert();
import { useWifiNetworksStore } from '@/stores/modules/wifiNetworks'
const wifiNetworksStore = useWifiNetworksStore();

const emit =  defineEmits(['reloadList']);

const isOpenPanelToWifi = inject('isOpenPanelToWifi');
const formNetwork = inject('formNetwork');
const wifiNetworks = inject('wifiNetworks')

const formRules = {
    name: [value => value?.trim() ? true : '']
};
const { errors, formInvalid, validateField } = useFormValidation(formNetwork, formRules);

const closePanel = () => {
    isOpenPanelToWifi.value = false;
}

const cancelChanges = () => {
    isOpenPanelToWifi.value = false;
}

const submit = async () => {
    closePanel();
    let textAlert = 'Red WiFi modificada';
    if(formNetwork.networkId){
        await wifiNetworksStore.$updateById(formNetwork);
        
    }else{
        await wifiNetworksStore.$store(formNetwork);
        textAlert = 'Nueva red WiFi añadida';
    }
    toast.warningToast(textAlert,'top-right');
    emit('reloadList')
}

const validateInputs = () =>{
    validateField('name');
    // validateField('password');
}

const currentItem = computed(()=> wifiNetworks.value.find(item => item.id == formNetwork.networkId))

const changesExists = computed(()=>{ 
    
    if(formNetwork.networkId){
        return (formNetwork.name !== currentItem.value?.name?.trim() || formNetwork.password?.trim() !== currentItem.value?.password?.trim())
    }
    return formNetwork.name?.trim();
})

watch(isOpenPanelToWifi,(newVal)=>{
    if(newVal){
        validateField('name')  
    }
    // console.log('test isOpenPanelToWifi',newVal)
})


</script>