import { defineStore } from 'pinia'
import { ref } from 'vue'

import {
    inviteToHotelApi,
    findByIdApi
} from '@/api/services/guest/guest.services'

export const useGuestStore = defineStore('guest', () => {
    
    // STATE

    // ACTIONS
    async function $inviteToHotel (data) {
        const response = await inviteToHotelApi(data)
        const { ok } = response   
        if(ok){
            return response.data
        }
    }
    
    async function $findById (data) {
        const response = await findByIdApi(data)
        const { ok } = response   
        if(ok){
            return response.data
        }
    }
    
    return {
        $inviteToHotel,
        $findById
    }

})