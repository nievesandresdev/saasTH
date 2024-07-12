import { defineStore } from 'pinia'
import { ref } from 'vue'

import {
    inviteToHotelApi,
} from '@/api/services/guest/guest.services'

export const useGuestStore = defineStore('guest', () => {
    
    // STATE

    // ACTIONS
    async function $inviteToHotel (data) {
        const response = await inviteToHotelApi(data)
        console.log('response',response)
        const { ok } = response   
        if(ok){
            return response.data
        }
    }
    
    
    return {
        $inviteToHotel
    }

})