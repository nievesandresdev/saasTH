<template>
    <section class="shadow-md px-4 py-6 mt-6 bg-white rounded-[10px] hborder-black-100 space-y-4">
        <div class="max-w-profile">
            <div class="flex mt-2 items-center relative">
                <h2 class="font-medium text-lg">Servicio de WiFi</h2>
                <span class="text-sm font-semibold leading-[120%] ml-auto mr-1 opacity-50">Mostrar en la WebApp</span>
                <ToggleButton
                    v-model="form.with_wifi"
                    id="toggle-wifi"
                    disabled
                />
                <!-- error text -->
                <div class="absolute top-[30px] right-0">
                    <div class="flex items-center">
                        <img class="inline w-4 h-4 mr-2" src="/assets/icons/1.TH.WARNING.RED.svg"> 
                        <p class="text-xs leading-[90%] htext-alert-negative">Añade una red de WiFi</p>        
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
            <div class="mt-4 flex items-center gap-4">
                <!-- add button -->
                <div 
                    class="relative w-[224px] h-20 rounded-[10px] border hborder-black-100 cursor-pointer gallery-file flex justify-center group container-icon-green"
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
                    class="relative w-[224px] h-20 rounded-[10px] shadow-hoster p-4 bg-white"
                    v-for="(item, index) in wifiNetworks" :key="item.id"
                >
                    <div class="flex items-center justify-between">
                        <p class="text-sm leading-[140%]">Red:</p>
                        <div class="flex items-center gap-1 px-2 relative">
                            <label class="text-[10px] font-semibold leading-[90%]">Visible</label>
                            <ToggleButton
                                v-model="wifiNetworks[index]"
                                :id="`toggle-network-${index}`"
                            />
                        </div>
                    </div>
                    <p class="mt-2 text-sm font-medium leading-[140%]">{{ item.name }}</p>
                </div>
            </div>
        </div>
    </section>

    <PanelToWifi :isOpen="isOpenPanelToWifi" @reloadList="reloadList" />
</template>
<script setup>
import { inject, ref, provide, reactive } from 'vue';
import PanelToWifi from "./Components/PanelToWifi.vue";
import ToggleButton from '@/components/Buttons/ToggleButton.vue';
import { useWifiNetworksStore } from '@/stores/modules/wifiNetworks'
const wifiNetworksStore = useWifiNetworksStore();


const isOpenPanelToWifi = ref(false);

const form = inject('form')
const wifiNetworks = inject('wifiNetworks')
const formNetwork = reactive({
    networkId: null,
    name: null,
    password: null
})

const openPanelToCreate = (data = null) =>{
    if(data){
        formNetwork.networkId = data.id;
        formNetwork.name = data.name;
        formNetwork.password = data.password;    
    }
    isOpenPanelToWifi.value = true;
    formNetwork.networkId = null;
    formNetwork.name = null;
    formNetwork.password = null;
}

const reloadList = async () =>{
    wifiNetworks.value = await wifiNetworksStore.$getAll();
}
provide('isOpenPanelToWifi', isOpenPanelToWifi)
provide('formNetwork',formNetwork)
</script>