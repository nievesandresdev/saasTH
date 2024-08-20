import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

import * as reviewResponseService from '@/api/services/reviewResponse.service';
import { useHotelStore } from '@/stores/modules/hotel';


export const useReviewResponseStore = defineStore('reviewResponse', () => {

    const hotelStore = useHotelStore();

    async function $getAll (params) {
        let config = {
            showPreloader: false,
        }
        const response = await reviewResponseService.getAllApi(params, config);
        return response;
    }

    async function $tranlate (data) {
        let config = {
            showPreloader: false,
        }
        data.googleMapCid = hotelStore.hotelData.code;
        const response = await reviewResponseService.translateApi(data, config);
        return response;
    }

    //
    return {
        $getAll,
        $tranlate,
    }

})