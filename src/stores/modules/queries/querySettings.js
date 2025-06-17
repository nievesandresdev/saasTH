import { defineStore } from 'pinia'
import { ref } from 'vue'

import {
    getAllApi,
    getPreStaySettingsApi,
    updatePreStaySettingsApi,
    //
    getStayVeryGoodSettingsApi,
    updateStayVeryGoodSettingsApi,
    getStayGoodSettingsApi,
    updateStayGoodSettingsApi,
    getStayBadSettingsApi,
    updateStayBadSettingsApi,
    //
    getPostStayVeryGoodSettingsApi,
    updatePostStayVeryGoodSettingsApi,
    getPostStayGoodSettingsApi,
    updatePostStayGoodSettingsApi,
    getPostStayBadSettingsApi,
    updatePostStayBadSettingsApi
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

    async function $getStayVeryGoodSettings () {
        const response = await getStayVeryGoodSettingsApi()
        const { ok } = response   
        if(ok){
            return response.data
        }
    }

    async function $getStayGoodSettings () {
        const response = await getStayGoodSettingsApi()
        const { ok } = response   
        if(ok){
            return response.data
        }
    }

    async function $getStayBadSettings () {
        const response = await getStayBadSettingsApi()
        const { ok } = response   
        if(ok){
            return response.data
        }
    }

    async function $updateStayVeryGoodSettings (data) {
        const response = await updateStayVeryGoodSettingsApi(data)
        const { ok } = response   
        if(ok){
            return response.data
        }
    }

    async function $updateStayGoodSettings (data) {
        const response = await updateStayGoodSettingsApi(data)
        const { ok } = response   
        if(ok){
            return response.data
        }
    }

    async function $updateStayBadSettings (data) {
        const response = await updateStayBadSettingsApi(data)
        const { ok } = response   
        if(ok){
            return response.data
        }
    }

    async function $getPostStayVeryGoodSettings () {

        const response = await getPostStayVeryGoodSettingsApi()
        const { ok } = response   
        if(ok){
            return response.data
        }
    }

    async function $updatePostStayVeryGoodSettings (data) {
        const response = await updatePostStayVeryGoodSettingsApi(data)
        const { ok } = response   
        if(ok){
            return response.data
        }
    }

    async function $getPostStayGoodSettings () {
        const response = await getPostStayGoodSettingsApi()
        const { ok } = response   
        if(ok){
            return response.data
        }
    }

    async function $updatePostStayGoodSettings (data) {
        const response = await updatePostStayGoodSettingsApi(data)
        const { ok } = response   
        if(ok){
            return response.data
        }
    }

    async function $getPostStayBadSettings () {
        const response = await getPostStayBadSettingsApi()
        const { ok } = response   
        if(ok){
            return response.data
        }
    }

    async function $updatePostStayBadSettings (data) {
        const response = await updatePostStayBadSettingsApi(data)
        const { ok } = response   
        if(ok){
            return response.data
        }
    }

    //
    return {
        $getAll,
        //
        $getPreStaySettings,
        $updatePreStaySettings,
        //
        $getStayVeryGoodSettings,
        $updateStayVeryGoodSettings,
        $getStayGoodSettings,
        $updateStayGoodSettings,
        $getStayBadSettings,
        $updateStayBadSettings,
        //
        $getPostStayVeryGoodSettings,
        $updatePostStayVeryGoodSettings,
        $getPostStayGoodSettings,
        $updatePostStayGoodSettings,
        $getPostStayBadSettings,
        $updatePostStayBadSettings,
    }

})