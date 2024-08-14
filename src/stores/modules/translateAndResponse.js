import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

import * as translateAndResponseService from '@/api/services/translateAndResponse.service';
import { useHotelStore } from '@/stores/modules/hotel';


export const useTranslateAndResponseStore = defineStore('translateAndResponse', () => {

    const hotelStore = useHotelStore();

    async function $findByReviewId (params) {
        let config = {
            showPreloader: false,
        }
        params.googleMapCid = hotelStore.hotelData.code;
        const response = await translateAndResponseService.findByReviewIdApi(params, config);
        return response;
    }

    //
    return {
        $findByReviewId,
    }

})