import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useStaySessionsStore } from '@/stores/modules/stay/staySessions';

import {
    getFeedbackSummaryByGuestApi,
    togglePendingStateApi,
    countPendingByHotelApi,
    pendingCountByStayApi,
    getGeneralReportApi
} from '@/api/services/queries/query.services'

export const useQueryStore = defineStore('query', () => {
    
    // STATE
    const staySessionsStore = useStaySessionsStore();
    // ACTIONS
    async function $getFeedbackSummaryByGuest (data) {

        const response = await getFeedbackSummaryByGuestApi(data)
        const { ok } = response   
        if(ok){
            return response.data
        }
    }

    async function $togglePendingState (queryId, bool, stayId) {
        let dataUser = staySessionsStore.$getUserDataSession(stayId);
        let data = { queryId, bool };
        let newData = {...data,...dataUser};
        const response = await togglePendingStateApi(newData)
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
        const response = await pendingCountByStayApi(stayId)
        const { ok } = response   
        if(ok){
            return response.data
        }
    }

    async function $getGeneralReport (data) {
        const response = await getGeneralReportApi(data)
        console.log('test getGeneralReport',response)
        const { ok } = response   
        if(ok){
            return response.data
        }
    }
    
    return {
        $getFeedbackSummaryByGuest,
        $togglePendingState,
        $countPendingByHotel,
        $pendingCountByStay,
        $getGeneralReport
    }

})