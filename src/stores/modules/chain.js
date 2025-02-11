import { defineStore } from 'pinia'
import { ref, computed, onMounted } from 'vue'

import * as chainService from '@/api/services/chain.service';


export const useChainStore = defineStore('chain', () => {

    // const hotelStore = useHotelStore();

    const chainData = ref({});

    async function $verifySubdomainExistPerChain (params) {
        const response = await chainService.verifySubdomainExistPerChainApi(params, {showPreloader: false});
        return response;
        const { ok } = response

        hotelData.value = ok ? response.data : null
        return response.data
    }

    async function $updateConfigGeneral (body) {
        const response = await chainService.updateConfigGeneralApi(body, {showPreloader: false});
        return response;
        const { ok } = response

        hotelData.value = ok ? response.data : null
        return response.data
    }

    async function $getChainBySubdomain (params) {
        const response = await chainService.getChainBySubdomainApi(params, {showPreloader: false});
        chainData.value = response.data;
        return response;
    }

  

    //
    return {
        $verifySubdomainExistPerChain,
        $updateConfigGeneral,
        $getChainBySubdomain
    }

});
