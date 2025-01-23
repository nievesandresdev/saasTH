import { defineStore } from 'pinia'
import { ref } from 'vue'

import {
    getGeneralSettingsApi,
    updateGeneralSettingsApi,
    getFormSettingsApi,
    updateFormSettingsApi
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

    return {
        $getGeneralSettings,
        $updateGeneralSettings,
        $getFormSettings,
        $updateFormSettings,
    }

})