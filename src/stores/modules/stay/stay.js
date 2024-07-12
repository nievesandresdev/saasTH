import { defineStore } from 'pinia'
import { ref } from 'vue'

import {
    getAllByHotelApi,
    statisticsByHotelApi,
    getdetailDataApi,
    updateDataApi,
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
        console.log('updateData',response)
        const { ok } = response   
        if(ok){
            return response.data
        }
    }
    
    
    return {
        $getAllByHotel,
        $statisticsByHotel,
        $getdetailData,
        $updateData
    }

})