
import { defineStore } from 'pinia'

import * as hotelService from '@/api/services/hotel.service'

// import { useMainStore } from '@/stores'
// const mainStore = useMainStore()

export const useHotelCommunicationStore = defineStore('hotelCommunication', () => {

    async function $getHotelCommunication () {
        const response = await hotelService.getHotelCommunication()
        return response;
    }

    //
    return {
        $getHotelCommunication
    }
     

})