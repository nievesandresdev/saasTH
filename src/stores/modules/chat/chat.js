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
    markGuesMsgstAsReadApi,
    markHosterMsgstAsReadApi
} from '@/api/services/chat/chat.services'

export const useChatStore = defineStore('chat', () => {
    
    const staySessionsStore = useStaySessionsStore();
    const messages = ref([]);

    async function $addMessage(dataMsg) {
        messages.value.push(dataMsg);
    }

    async function $setMessagesList(msgs) {
        messages.value = msgs ?? [];
    }
    
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
        if(!text || !text.trim()) return;
        let dataUser = staySessionsStore.$getUserDataSession(stayId);
        let data = { guestId, text };
        let newData = {...data,...dataUser};
        //
        const ahora = new Date();
        const isoConMicrosegundos = ahora.toISOString().replace('Z', '000Z');
        await $addMessage({
            automatic:false,
            status:'Entregado',
            by: "Hoster",   
            created_at: isoConMicrosegundos,
            text
        });
        //
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

    async function $markHosterMsgstAsRead (stayId, guestId) {

        const count_msgs = messages.value.length
        const arr = messages.value
        for (let i = count_msgs - 1; i >= 0; i--) {
            if (arr[i].status == 'Entregado' && arr[i].by == 'Hoster') {
                arr[i].status = 'Leído'
            } else if (arr[i].status == 'Entregado') {
                break
            }
        }
        messages.value = arr
        const response = await markHosterMsgstAsReadApi(stayId, guestId)
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
        $markGuesMsgstAsRead,
        $setMessagesList,
        messages,
        $addMessage,
        $markHosterMsgstAsRead
    }

})