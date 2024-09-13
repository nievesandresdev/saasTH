import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useStaySessionsStore } from '@/stores/modules/stay/staySessions';

import {
    getAllByHotelApi,
    statisticsByHotelApi,
    getdetailDataApi,
    updateDataApi,
    getAllNotesByStayApi,
    createOrupdateStayNoteApi,
    deleteStayNoteApi,
    createOrupdateGuestNoteApi,
    deleteGuestNoteApi,
    getDetailQueryByGuestApi,
    getGuestListWithNotiApi,
    deleteTestStaysApi
} from '@/api/services/stay/stay.services'

export const useStayStore = defineStore('stay', () => {
    
    const staySessionsStore = useStaySessionsStore();

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
        let dataUser = staySessionsStore.$getUserDataSession(data.stayId);
        let newData = {...data,...dataUser};
        const response = await updateDataApi(newData)
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
        let dataUser = staySessionsStore.$getUserDataSession(data.stayId);
        let newData = {...data,...dataUser};
        const response = await createOrupdateStayNoteApi(newData)
        const { ok } = response   
        if(ok){
            return response.data
        }
    }

    async function $deleteStayNote (data) {
        let dataUser = staySessionsStore.$getUserDataSession(data.stayId);
        let newData = {...data,...dataUser};
        const response = await deleteStayNoteApi(newData)
        const { ok } = response   
        if(ok){
            return response.data
        }
    }

    async function $createOrupdateGuestNote (data) {
        let dataUser = staySessionsStore.$getUserDataSession(data.stayId);
        let newData = {...data,...dataUser};
        const response = await createOrupdateGuestNoteApi(newData)
        const { ok } = response   
        if(ok){
            return response.data
        }
    }

    async function $deleteGuestNote (data) {
        let dataUser = staySessionsStore.$getUserDataSession(data.stayId);
        let newData = {...data,...dataUser};
        const response = await deleteGuestNoteApi(newData)
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

    async function $deleteTestStays () {
        const response = await deleteTestStaysApi()
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
        $deleteTestStays,
        //notes
        $getAllNotesByStay,
        $createOrupdateStayNote,
        $deleteStayNote,
        $createOrupdateGuestNote,
        $deleteGuestNote,
        //query
        $getDetailQueryByGuest,
        //guests
        $getGuestListWithNoti
    }

})