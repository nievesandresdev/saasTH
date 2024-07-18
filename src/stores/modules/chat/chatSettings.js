import { defineStore } from 'pinia'
import { ref } from 'vue'

import {
    getAllApi,
    updateNotificationsEmailApi,
    getSettings
} from '@/api/services/chat/chatSettings.services'

export const useChatSettingsStore = defineStore('chatSettings', () => {
    
    // STATE

    // ACTIONS

    /*
    * Get all settings notification role
    */
    async function $getAll () {

        const response = await getAllApi()
        const { ok } = response   
        if(ok){
            return response.data
        }
    }

    async function $updateNotificationsEmail(data) {
        const response = await updateNotificationsEmailApi(data)
        const { ok } = response;
        return ok;
    }


    async function $getAllSettingsChat() {
        const response = await getSettings()
        const { ok } = response
        if(ok){
            return response.data
        }
    }


    //
    return {
        $getAll,
        $updateNotificationsEmail,
        $getAllSettingsChat
    }

})