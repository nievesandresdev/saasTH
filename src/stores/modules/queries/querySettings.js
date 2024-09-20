import { defineStore } from 'pinia'
import { ref } from 'vue'

import {
    getAllApi,
    updateNotificationsEmailApi,
    getPreStaySettingsApi,
    updatePreStaySettingsApi,
    getStaySettingsApi,
    updateStaySettingsApi,
    getPostStaySettingsApi,
    updatePostStaySettingsApi
} from '@/api/services/queries/querySettings.services'

export const useQuerySettingsStore = defineStore('querySettings', () => {
    
    // STATE

    // ACTIONS
    async function $getAll () {

        const response = await getAllApi()
        const { ok } = response   
        if(ok){
            return response.data
        }
    }

    async function $getPreStaySettings () {

        const response = await getPreStaySettingsApi()
        const { ok } = response   
        if(ok){
            return response.data
        }
    }

    async function $updatePreStaySettings (data) {
        const response = await updatePreStaySettingsApi(data)
        const { ok } = response   
        if(ok){
            return response.data
        }
    }

    async function $getStaySettings () {

        const response = await getStaySettingsApi()
        const { ok } = response   
        if(ok){
            return response.data
        }
    }

    async function $updateStaySettings (data) {
        const response = await updateStaySettingsApi(data)
        const { ok } = response   
        if(ok){
            return response.data
        }
    }

    async function $getPostStaySettings () {

        const response = await getPostStaySettingsApi()
        const { ok } = response   
        if(ok){
            return response.data
        }
    }

    async function $updatePostStaySettings (data) {
        const response = await updatePostStaySettingsApi(data)
        const { ok } = response   
        if(ok){
            return response.data
        }
    }

    async function $updateNotificationsEmail(data) {
        const response = await updateNotificationsEmailApi(data)
        const { ok } = response;
        return ok;
    }

    

    //
    return {
        $getAll,
        $updateNotificationsEmail,
        //
        $getPreStaySettings,
        $updatePreStaySettings,
        //
        $getStaySettings,
        $updateStaySettings,
        //
        $getPostStaySettings,
        $updatePostStaySettings
    }

})