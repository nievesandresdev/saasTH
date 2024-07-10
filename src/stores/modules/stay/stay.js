import { defineStore } from 'pinia'
import { ref } from 'vue'

import {
    getAllByHotelApi,
    statisticsByHotelApi,
} from '@/api/services/stay/stay.services'

export const useStayStore = defineStore('stay', () => {
    
    // STATE

    // ACTIONS
    async function $getAllByHotel (data) {
        const response = await getAllByHotelApi(data)
        const { ok } = response   
        if(ok){
            return response.data
        }
    }

    async function $statisticsByHotel () {
        const response = await statisticsByHotelApi()
        console.log('response',response)
        const { ok } = response   
        if(ok){
            return response.data
        }
    }
    
    
    return {
        $getAllByHotel,
        $statisticsByHotel
    }

})