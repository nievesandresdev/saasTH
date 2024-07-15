import { defineStore } from 'pinia'
import { ref } from 'vue'

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
} from '@/api/services/stay/stay.services'

export const useStayStore = defineStore('stay', () => {
    
    // STATE

    // ACTIONS
    async function $getAllByHotel (data) {
        const response = await getAllByHotelApi(data)
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
    
    
    
    return {
        $getAllByHotel,
        $statisticsByHotel,
        $getdetailData,
        $updateData,
        $getAllNotesByStay,
        $createOrupdateStayNote,
        $deleteStayNote,
        $createOrupdateGuestNote,
        $deleteGuestNote
    }

})