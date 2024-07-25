import { defineStore } from 'pinia'
import { ref } from 'vue'

import {
    getAllByHotelApi,
    statisticsByHotelApi,
    getdetailDataApi,
    updateDataApi,
    getSessionsApi,
    getAllNotesByStayApi,
    createOrupdateStayNoteApi,
    deleteStayNoteApi,
    createOrupdateGuestNoteApi,
    deleteGuestNoteApi,
    createSessionApi,
    deleteSessionApi,
    getDetailQueryByGuestApi,
    getGuestListWithNotiApi
} from '@/api/services/stay/stay.services'

export const useStayStore = defineStore('stay', () => {
    
    // STATE

    // ACTIONS
    async function $getAllByHotel (data, showLoadPage = true) {
        const response = await getAllByHotelApi(data, showLoadPage)
        const { ok } = response   
        if(ok){
            return response.data
        }
    }

    async function $statisticsByHotel () {
        const response = await statisticsByHotelApi()
        const { ok } = response   
        if(ok){
            return response.data
        }
    }

    async function $getdetailData (stayId) {
        let data = {
            stayId
        };
        const response = await getdetailDataApi(data)
        const { ok } = response   
        if(ok){
            return response.data
        }
    }

    async function $updateData (data) {
        const response = await updateDataApi(data)
        const { ok } = response   
        if(ok){
            return response.data
        }
    }

    async function $getAllNotesByStay (stayId) {
        const response = await getAllNotesByStayApi({stayId})
        const { ok } = response   
        if(ok){
            return response.data
        }
    }

    async function $createOrupdateStayNote (data) {
        const response = await createOrupdateStayNoteApi(data)
        const { ok } = response   
        if(ok){
            return response.data
        }
    }

    async function $deleteStayNote (data) {
        const response = await deleteStayNoteApi(data)
        const { ok } = response   
        if(ok){
            return response.data
        }
    }

    async function $createOrupdateGuestNote (data) {
        const response = await createOrupdateGuestNoteApi(data)
        const { ok } = response   
        if(ok){
            return response.data
        }
    }

    async function $deleteGuestNote (data) {
        const response = await deleteGuestNoteApi(data)
        const { ok } = response   
        if(ok){
            return response.data
        }
    }

    async function $createSession (stayId, field, userEmail, userName, userColor) {
        let data = { stayId, field, userEmail, userName, userColor };
        const response = await createSessionApi(data)
        const { ok } = response   
        if(ok){
            return response.data
        }
    }

    async function $deleteSession (stayId, field, userEmail) {
        let data = { stayId, field, userEmail };
        const response = await deleteSessionApi(data)
        const { ok } = response   
        if(ok){
            return response.data
        }
    }

    async function $getDetailQueryByGuest (stayId, guestId) {
        let data = { stayId, guestId };
        const response = await getDetailQueryByGuestApi(data)
        const { ok } = response   
        if(ok){
            return response.data
        }
    }

    async function $getGuestListWithNoti (stayId) {
        let data = { stayId };
        const response = await getGuestListWithNotiApi(data)
        const { ok } = response   
        if(ok){
            return response.data
        }
    }

    async function $getSessions (stayId) {
        let data = { stayId };
        console.log('getSessions',data)
        const response = await getSessionsApi(data)
        console.log('response',response)
        const { ok } = response   
        if(ok){
            return response.data
        }
    }

    return {
        $getAllByHotel,
        $statisticsByHotel,
        $getdetailData,
        $updateData,
        $getSessions,
        //notes
        $getAllNotesByStay,
        $createOrupdateStayNote,
        $deleteStayNote,
        $createOrupdateGuestNote,
        $deleteGuestNote,
        //sessions
        $createSession,
        $deleteSession,
        //query
        $getDetailQueryByGuest,
        //guests
        $getGuestListWithNoti
    }

})