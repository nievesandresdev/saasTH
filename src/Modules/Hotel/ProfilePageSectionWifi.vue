<template>
    <section class="shadow-md px-4 py-6 mt-6 bg-white rounded-[10px] hborder-black-100 space-y-4">
        <div class="max-w-profile">
            <div class="flex mt-2 items-center relative">
                <h2 class="font-medium text-lg">Servicio de WiFi</h2>
                <span 
                    class="text-sm font-semibold leading-[120%] ml-auto mr-1"
                    :class="{'opacity-50':wifiNetworks.length == 0 || !someWifiVisible}"
                >Mostrar en la WebApp</span>
                <div
                    tabindex="0" 
                    @blur="clickOnToggle = false"
                    @click="clickOnToggle = true"
                >
                    <ToggleButton
                        v-model="form.with_wifi"
                        id="toggle-wifi"
                        :disabled="wifiNetworks.length == 0 || !someWifiVisible"
                    />
                </div>
                <!-- error text -->
                <div 
                    class="absolute top-[30px] right-0"
                    v-if="clickOnToggle && (!wifiNetworks.length || !someWifiVisible)"
                >
                    <div class="flex items-center">
                        <img class="inline w-4 h-4 mr-2" src="/assets/icons/1.TH.WARNING.RED.svg"> 
                        <p class="text-xs leading-[90%] htext-alert-negative">
                            {{ !wifiNetworks.length ? 'Añade una red de WiFi' : 'No hay redes visibles'}}
                        </p>        
                    </div>
                </div>
                <!-- :disabled="loadingChangeStatusAttended" -->
                <!-- <div class="flex space-x-2">
                    <label class="text-sm font-medium leading-[110%]" :class="!form.with_wifi ? 'text-[#333]' : 'text-[#A0A0A0]'">No</label>
                    <BaseSwichInput id="toggle-wifi" v-model="form.with_wifi" />
                    <label class="text-sm font-medium leading-[110%]" :class="form.with_wifi ? 'text-[#333]' : 'text-[#A0A0A0]'">Si</label>
                </div> -->
            </div>
            <p class="text-sm text-justify leading-[140%] max-w-[541px] 3xl:max-w-full">
                Comparte con tus huéspedes la ubicación, nombre y contraseña de las redes de WiFi de tu {{$formatTypeLodging()}}.
            </p>
            <div class="mt-4 flex items-center gap-4 flex-wrap">
                <!-- add button -->
                <div 
                    class="relative w-[224px] flex-shrink-0 h-20 rounded-[10px] border hborder-black-100 cursor-pointer gallery-file flex justify-center group container-icon-green"
                    @click="openPanelToCreate"
                >
                    <div class="my-auto">
                        <img src="/assets/icons/1.TH.PLUS.svg" class="w-4 h-4 mx-auto green-600-onhover">
                        <h5 class="text-base font-medium leading-[140%] mt-1 group-hover:text-[#34A98F]">
                            Nueva red
                        </h5>
                    </div>
                </div>
                <!-- card network -->
                <div 
                    class="relative w-[224px] flex-shrink-0 h-20 rounded-[10px] shadow-hoster p-4 bg-white cursor-pointer"
                    v-for="(item, index) in wifiNetworks" :key="item.id"
                    @click="openPanelToCreate(item)"
                >
                    <div class="flex items-center justify-between">
                        <p class="text-sm leading-[140%]">Red:</p>
                        <div class="flex items-center gap-1 px-2 relative">
                            <label class="text-[10px] font-semibold leading-[90%]">Visible</label>
                            <ToggleButton
                                v-model="wifiNetworks[index].visible"
                                @change="updateVisibility(wifiNetworks[index])"
                                :id="`toggle-network-${index}`"
                                 @click.stop
                            />
                        </div>
                    </div>
                    <p class="mt-2 text-sm font-medium leading-[140%] truncate">{{ item.name }}</p>
                </div>
            </div>
        </div>
    </section>

    <PanelToWifi :isOpen="isOpenPanelToWifi" @reloadList="reloadList" />
</template>
<script setup>
import { inject, ref, provide, reactive, watch} from 'vue';
import PanelToWifi from "./Components/PanelToWifi.vue";
import ToggleButton from '@/components/Buttons/ToggleButton.vue';


import { useWifiNetworksStore } from '@/stores/modules/wifiNetworks'
const wifiNetworksStore = useWifiNetworksStore();
import { useToastAlert } from '@/composables/useToastAlert'
const toast = useToastAlert();
import { useMockupStore } from '@/stores/modules/mockup';
const mockupStore = useMockupStore();

const emit = defineEmits(['reloadList'])

const isOpenPanelToWifi = ref(false);
const clickOnToggle = ref(false);

const form = inject('form')
const wifiNetworks = inject('wifiNetworks')
const someWifiVisible = inject('someWifiVisible')

const formNetwork = reactive({
    networkId: null,
    name: null,
    password: null
})


const openPanelToCreate = (data = null) =>{
    formNetwork.networkId = data?.id ?? null;
    formNetwork.name = data?.name ?? null;
    formNetwork.password = data?.password ?? null;    
    isOpenPanelToWifi.value = true;
    // console.log('test formNetwork',formNetwork)
}

const reloadList = async () =>{
    emit('reloadList');
}


const updateVisibility = async (data) =>{
    let test = await wifiNetworksStore.$updateVisibility(data);
    if(test){
        toast.warningToast('Actualizado!','top-right');
    }else{
        toast.errorToast('Error','top-right');
    }
    reloadList();
}


watch(isOpenPanelToWifi, (newVal)=>{
    let wifiIdMockup;
    if(newVal){
        wifiIdMockup = formNetwork.networkId ?? 0;
        mockupStore.$setIframeUrl('/alojamiento','showWifiModal=true&wifiIdMockup='+wifiIdMockup);
    }else{
        mockupStore.$setIframeUrl('/alojamiento');
    }
    // console.log('test isOpenPanelToWifi',newVal)
})
provide('isOpenPanelToWifi', isOpenPanelToWifi)
provide('formNetwork',formNetwork)
</script>