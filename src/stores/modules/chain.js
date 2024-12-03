import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

import * as chainService from '@/api/services/chain.service';


export const useChainStore = defineStore('chain', () => {

    // const hotelStore = useHotelStore();

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

    //
    return {
        $verifySubdomainExistPerChain,
        $updateConfigGeneral
    }

});
