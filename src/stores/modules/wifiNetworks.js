import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

import {
    getAllByHotelApi,
    storeNetworkApi,
    updateByIdNetworkApi,
    updateVisibilityNetworkApi
} from '@/api/services/hotel.service'


export const useWifiNetworksStore = defineStore('wifiNetworks', () => {

    
    //
    async function $getAll () {
        const response = await getAllByHotelApi()
        console.log('test response',response)
        if(response.ok) return response.data
        return []
    }

    async function $store (data) {
        const response = await storeNetworkApi(data)
        const { ok } = response   
        if(ok){
            return response.data
        }
        return null
    }

    async function $updateById (data) {
        const response = await updateByIdNetworkApi(data)
        const { ok } = response   
        if(ok){
            return response.data
        }
    }

    async function $updateVisibility (data) {
        const response = await updateVisibilityNetworkApi(data)
        const { ok } = response   
        if(ok){
            return response.data
        }
    }

    return {
        $getAll,
        $store,
        $updateById,
        $updateVisibility
    }

})