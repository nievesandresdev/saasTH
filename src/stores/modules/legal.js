import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

import {
    getCountPoliciesByHotelApi
} from '@/api/services/legal/legal.services'


export const useLegalStore = defineStore('legal', () => {

    
    //
    async function $getCountPoliciesByHotel () {
        const response = await getCountPoliciesByHotelApi()
        if(response.ok) return response.data
        return 0
    }


    return {
        $getCountPoliciesByHotel
    }

})