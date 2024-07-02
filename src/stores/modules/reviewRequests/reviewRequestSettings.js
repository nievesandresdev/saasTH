import { defineStore } from 'pinia'
import { ref } from 'vue'

import {
    getAllApi,
    getPostStayRequestDataApi,
    updateDataApi
} from '@/api/services/reviewRequests/requestSettings.services'

export const useRequestSettingStore = defineStore('requestSettings', () => {
    
    // STATE

    // ACTIONS
    async function $getAll () {

        const response = await getAllApi()
        const { ok } = response   
        if(ok){
            return response.data
        }
    }

    async function $getPostStayRequestData () {

        const response = await getPostStayRequestDataApi()
        const { ok } = response   
        if(ok){
            return response.data
        }
    }

    async function $updateData(data) {
        const response = await updateDataApi(data)
        const { ok } = response;
        return ok;
    }

    //
    return {
        $getAll,
        $getPostStayRequestData,
        $updateData
    }

})