import { defineStore } from 'pinia'
import { ref } from 'vue'

import {
    getAllApi,
    updateNotificationsEmailApi
} from '@/api/services/queries/querySettings.services'

export const useQuerySettingsStore = defineStore('querySettings', () => {
    
    // STATE

    // ACTIONS
    async function $getAll () {

        const response = await getAllApi()
        const { ok } = response   
        if(ok){
            return response.data
        }
    }

    async function $updateNotificationsEmail(data) {
        const response = await updateNotificationsEmailApi(data)
        console.log('response',response)
        const { ok } = response;
        return ok;
    }



    //
    return {
        $getAll,
        $updateNotificationsEmail
    }

})