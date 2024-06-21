import { defineStore } from 'pinia'
import { ref } from 'vue'

import {
    getAllApi,
} from '@/api/services/chat/chatSettings.services'

export const useChatSettingsStore = defineStore('chatSettings', () => {
    
    // STATE

    // ACTIONS
    async function $getAll () {

        const response = await getAllApi()
        const { ok } = response   
        if(ok){
            return response.data
        }
    }



    //
    return {
        $getAll,
    }

})