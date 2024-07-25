import { defineStore } from 'pinia'//getDataRoom
import { ref } from 'vue'

import {
    getDataRoomApi,
    getGuestListWNotiApi,
    togglePendingApi,
    sendMsgApi,
    pendingCountByHotelApi,
    pendingCountByStayApi,
    markGuesMsgstAsReadApi
} from '@/api/services/chat/chat.services'

export const useChatStore = defineStore('chat', () => {
    
    async function $getDataRoom (stayId, guestId, showLoadPage = true) {
        let data = { stayId, guestId };
        const response = await getDataRoomApi(data, showLoadPage)
        const { ok } = response   
        if(ok){
            return response.data
        }
    }

    async function $getGuestListWNoti (stayId, showLoadPage = true) {
        let data = { stayId};
        const response = await getGuestListWNotiApi(data, showLoadPage)
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

    async function $sendMsg (guestId, stayId, text) {
        let data = { guestId, stayId, text };
        const response = await sendMsgApi(data)
        const { ok } = response   
        if(ok){
            return response.data
        }
    }

    async function $pendingCountByHotel () {
        const response = await pendingCountByHotelApi()
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

    async function $markGuesMsgstAsRead (stayId, guestId) {
        console.log('stayId',stayId)
        console.log('guestId',guestId)
        const response = await markGuesMsgstAsReadApi(stayId, guestId)
        console.log('markGuesMsgstAsRead',response)
        const { ok } = response   
        if(ok){
            return response.data
        }
    }
    
    //
    return {
        $getDataRoom,
        $getGuestListWNoti,
        $togglePending,
        $sendMsg,
        $pendingCountByHotel,
        $pendingCountByStay,
        $markGuesMsgstAsRead
    }

})