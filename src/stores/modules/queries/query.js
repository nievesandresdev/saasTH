import { defineStore } from 'pinia'
import { ref } from 'vue'

import {
    getFeedbackSummaryByGuestApi,
    togglePendingStateApi,
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

    async function $togglePendingState (queryId, bool) {
        let data = { queryId, bool };
        console.log('togglePendingState',data)
        const response = await togglePendingStateApi(data)
        console.log('response',response)
        const { ok } = response   
        if(ok){
            return response.data
        }
    }
    
    return {
        $getFeedbackSummaryByGuest,
        $togglePendingState
    }

})