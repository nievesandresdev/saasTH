import { defineStore } from 'pinia'//getDataRoom
import { ref } from 'vue'
import { useStaySessionsStore } from '@/stores/modules/stay/staySessions';

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
    
    const staySessionsStore = useStaySessionsStore();

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
        let dataUser = staySessionsStore.$getUserDataSession(stayId);
        let data = { guestId, pendingBool };
        let newData = {...data,...dataUser};
        const response = await togglePendingApi(newData)
        const { ok } = response   
        if(ok){
            return response.data
        }
    }

    async function $sendMsg (guestId, stayId, text) {
        let dataUser = staySessionsStore.$getUserDataSession(stayId);
        let data = { guestId, text };
        let newData = {...data,...dataUser};
        const response = await sendMsgApi(newData)
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
        const response = await markGuesMsgstAsReadApi(stayId, guestId)
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