import { defineStore } from 'pinia'
import { ref } from 'vue'

import {
    getAllByHotelApi,
} from '@/api/services/stay/stay.services'

export const useStayStore = defineStore('stay', () => {
    
    // STATE

    // ACTIONS
    async function $getAllByHotel () {

        const response = await getAllByHotelApi()
        console.log('getAllByHotel',response)
        const { ok } = response   
        if(ok){
            return response.data
        }
    }
    

    return {
        $getAllByHotel
    }

})