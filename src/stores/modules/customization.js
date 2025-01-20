import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

import * as customizationService from '@/api/services/customization.service';
import { useHotelStore } from '@/stores/modules/hotel';


export const useCustomizationStore = defineStore('customization', () => {

    const URL_STORAGE = process.env.VUE_APP_STORAGE_URL;

    const hotelStore = useHotelStore();


    // FUNCTIONS

    async function $findOne () {
        const response = await customizationService.findOneApi();
        return response;
    }

    async function $update (body) {
        const response = await customizationService.updateApi(body, {showPreloader: true});
        return response;
        if(response.ok) return response.data;
        return []
    }

    //
    return {
        $findOne,
        $update,
    }

})