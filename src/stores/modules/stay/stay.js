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
    const URL_BASE_BACKEND_GENERAL = process.env.VUE_APP_API_URL_BACKEND_GENERAL

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
        console.log('statisticsByHotel',response)
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

    async function $getAllNotesByStay (stayId, showPreloader = true) {
        const response = await getAllNotesByStayApi({stayId}, showPreloader)
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

    async function $createSession (stayId, field) {
        let user = JSON.parse(sessionStorage.getItem('user'));
        let userEmail = user.email;
        let userName = user.name;
        let userColor = user.color;
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

    async function $deleteSessionWithApiKey (stayId, userEmail) {
        // Crea una URL con parámetros de consulta
        let endpoint = `${URL_BASE_BACKEND_GENERAL}/stay/hoster/deleteSessionWithApiKey?`;
        endpoint += `stayId=${encodeURIComponent(stayId)}`;
        endpoint += `&userEmail=${encodeURIComponent(userEmail)}`;
        endpoint += `&field=sessions`;
        endpoint += `&xKeyApi=${encodeURIComponent(process.env.VUE_APP_X_KEY_API)}`;
        // Llama a navigator.sendBeacon con la URL
        navigator.sendBeacon(endpoint);
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
        const response = await getSessionsApi(data)
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
        $deleteSessionWithApiKey,
        //query
        $getDetailQueryByGuest,
        //guests
        $getGuestListWithNoti
    }

})