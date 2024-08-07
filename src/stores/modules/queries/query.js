import { defineStore } from 'pinia'
import { ref } from 'vue'

import {
    getFeedbackSummaryByGuestApi,
    togglePendingStateApi,
    countPendingByHotelApi,
    pendingCountByStayApi
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
        const response = await togglePendingStateApi(data)
        const { ok } = response   
        if(ok){
            return response.data
        }
    }

    async function $countPendingByHotel () {
        const response = await countPendingByHotelApi()
        const { ok } = response   
        if(ok){
            return response.data
        }
    }

    async function $pendingCountByStay (stayId) {
        console.log('$pendingCountByStay',stayId)
        const response = await pendingCountByStayApi(stayId)
        console.log('$pendingCountByStay',response)
        const { ok } = response   
        if(ok){
            return response.data
        }
    }
    
    return {
        $getFeedbackSummaryByGuest,
        $togglePendingState,
        $countPendingByHotel,
        $pendingCountByStay
    }

})