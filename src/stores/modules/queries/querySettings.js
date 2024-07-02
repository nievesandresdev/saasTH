import { defineStore } from 'pinia'
import { ref } from 'vue'

import {
    getAllApi,
    updateNotificationsEmailApi,
    getPreStaySettingsApi
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

    async function $getPreStaySettings () {

        const response = await getPreStaySettingsApi()
        const { ok } = response   
        if(ok){
            return response.data
        }
    }

    async function $updateNotificationsEmail() {
        const response = await updateNotificationsEmailApi()
        const { ok } = response;
        return ok;
    }

    //
    return {
        $getAll,
        $updateNotificationsEmail,
        $getPreStaySettings
    }

})