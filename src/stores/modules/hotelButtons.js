import { defineStore } from 'pinia'
import { ref } from 'vue'
import * as hotelButtonsServices from '@/api/services/hotel.buttons.services'


export const useHotelButtonsStore = defineStore('hotelButtons', () => {

    async function $getAllHotelButtons () {
        const response = await hotelButtonsServices.getHotelButtonsApi()
        return response;
    }

    async function $updateOrderButtons (data) {
        const response = await hotelButtonsServices.updateOrderButtonsApi(data)
        return response;
    }

    async function $updateButtonVisibility (data) {
        const response = await hotelButtonsServices.updateButtonVisibilityApi(data)
        return response;
    }



    return {
        $getAllHotelButtons,
        $updateOrderButtons,
        $updateButtonVisibility
    }

})