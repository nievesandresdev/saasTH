import { defineStore } from 'pinia'
import { ref } from 'vue'

import {
    getGeneralSettingsApi,
    updateGeneralSettingsApi,
    getFormSettingsApi,
    updateFormSettingsApi,
    updateToggleShowCheckinHotelApi,
    getToggleShowCheckinHotelApi,
    getGuestsForTabsCheckinStayApi
} from '@/api/services/stay/checkin.services'

export const useCheckinStore = defineStore('checkin', () => {
    
    // STATE
    const URL_BASE_BACKEND_GENERAL = process.env.VUE_APP_API_URL_BACKEND_GENERAL

    // ACTION
    async function $getGeneralSettings () {

        const response = await getGeneralSettingsApi()
        const { ok } = response   
        if(ok){
            return response.data
        }
    }

    async function $updateGeneralSettings (data) {
        const response = await updateGeneralSettingsApi(data)
        const { ok } = response   
        if(ok){
            return response.data
        }
    }

    async function $getFormSettings () {

        const response = await getFormSettingsApi()
        const { ok } = response   
        if(ok){
            return response.data
        }
    }

    async function $updateFormSettings (data) {
        const response = await updateFormSettingsApi(data)
        const { ok } = response   
        if(ok){
            return response.data
        }
    }

    async function $updateToggleShowCheckinHotel (value) {
        const response = await updateToggleShowCheckinHotelApi({ value })
        const { ok } = response   
        if(ok){
            return response.data
        }
    }

    async function $getToggleShowCheckinHotel () {
        const response = await getToggleShowCheckinHotelApi()
        const { ok } = response   
        if(ok){
            return response.data
        }
    }

    async function $getGuestsForTabsCheckinStay (stayId) {
        const response = await getGuestsForTabsCheckinStayApi({stayId})
        const { ok } = response   
        if(ok){
            return response.data
        }
    }
    
    
    return {
        $getGeneralSettings,
        $updateGeneralSettings,
        $getFormSettings,
        $updateFormSettings,
        $updateToggleShowCheckinHotel,
        $getToggleShowCheckinHotel,
        $getGuestsForTabsCheckinStay
    }

})