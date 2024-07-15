import { defineStore } from 'pinia'
import { ref } from 'vue'

import {
    getFeedbackSummaryByGuestApi,
} from '@/api/services/queries/query.services'

export const useQueryStore = defineStore('query', () => {
    
    // STATE

    // ACTIONS
    async function $getFeedbackSummaryByGuest (data) {

        const response = await getFeedbackSummaryByGuestApi(data)
        const { ok } = response   
        if(ok){
            return response.data
        }
    }
    
    return {
        $getFeedbackSummaryByGuest,
    }

})