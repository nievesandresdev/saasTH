import { defineStore } from 'pinia'//getDataRoom
import { ref } from 'vue'

import {
    getDataRoomApi,
    getGuestListWNotiApi,
    togglePendingApi,
    sendMsgApi
} from '@/api/services/chat/chat.services'

export const useChatStore = defineStore('chat', () => {
    
    async function $getDataRoom (stayId, guestId) {
        let data = { stayId, guestId };
        const response = await getDataRoomApi(data)
        const { ok } = response   
        if(ok){
            return response.data
        }
    }

    async function $getGuestListWNoti (stayId) {
        let data = { stayId};
        const response = await getGuestListWNotiApi(data)
        const { ok } = response   
        if(ok){
            return response.data
        }
    }

    async function $togglePending (guestId, stayId, pendingBool) {
        let data = { guestId, stayId, pendingBool };
        const response = await togglePendingApi(data)
        const { ok } = response   
        if(ok){
            return response.data
        }
    }

    //
    return {
        $getDataRoom,
        $getGuestListWNoti,
        $togglePending
    }

})