import { defineStore } from 'pinia'
import { ref } from 'vue'

import * as hotelService from '@/api/services/hotel.service'

// import { useMainStore } from '@/stores'
// const mainStore = useMainStore()

export const useHotelStore = defineStore('hotel', () => {
    
    // STATE
    const hotelData = ref(sessionStorage.getItem('current_hotel') ?? null);
    const subdomain = ref(sessionStorage.getItem('current_subdomain') ?? null)
    const URL_STORAGE = process.env.VUE_APP_STORAGE_URL

    // ACTIONS

    function formatImage (image) {
        let url = image?.url;
        if (!url) return;
        let type = url.includes('https://') ? 'CDN' : 'STORAGE';
        // console.log(process.env.VUE_APP_STORAGE_URL, 'process.env.VUE_APP_STORAGE_URL')
        url = type != 'CDN' ? `${URL_STORAGE}${url}` : url;
        // console.log(url, 'url')
        return url;
    }

    async function $findByParams () {
        let params = {
            subdomain: subdomain.value,
        }
        // console.log('findByParamsApi',localStorage.getItem('subdomain'))
        const response = await hotelService.findByParamsApi(params)
        const { ok } = response

        hotelData.value = ok ? response.data : null
        return response.data
    }

    async function $findHotelFullByParams () {
        let params = {
            subdomain: subdomain.value,
        }
        // console.log('findByParamsApi',localStorage.getItem('subdomain'))
        const response = await hotelService.findByParamsApi(params)
        const { ok } = response

        hotelData.value = ok ? response.data : null
        return response.data
    }
    



    //
    return {
        hotelData,
        subdomain,
        formatImage,
        $findByParams,
    }

})