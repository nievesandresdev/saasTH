import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

import * as hotelService from '@/api/services/hotel.service'

// import { useMainStore } from '@/stores'
// const mainStore = useMainStore()

export const useHotelStore = defineStore('hotel', () => {
    
    const hotelSession = computed(() => {
        let hotel = sessionStorage.getItem('current_hotel') ?? null;
        if (hotel) {
            hotel = JSON.parse(hotel);
            if (hotel?.images) {
                delete hotel.images;
            }
            return hotel;
        }
        return;
    })

    // STATE
    const hotelData = ref({...hotelSession.value});
    const subdomain = ref(sessionStorage.getItem('current_subdomain') ?? null);
    const URL_STORAGE = process.env.VUE_APP_STORAGE_URL;
    

    // ACTIONS

    function updateHoteInSession (hotel) {
        if (hotel?.images) {
            delete hotel.images;
        }
        sessionStorage.setItem('current_hotel', JSON.stringify(hotel));
    }

    function formatImage (image) {
        let url = image?.url;
        if (!url) return;
        let type = url.includes('https://') ? 'CDN' : 'STORAGE';
        // console.log(process.env.VUE_APP_STORAGE_URL, 'process.env.VUE_APP_STORAGE_URL')
        url = type != 'CDN' ? `${URL_STORAGE}${url}` : url;
        // console.log(url, 'url')
        return url;
    }

    async function reloadHotel () {
        let hotel = await $findByParams();
        
        updateHoteInSession(hotel);
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

    async function $updateProfile (data) {
        // console.log('findByParamsApi',localStorage.getItem('subdomain'))
        const response = await hotelService.updateProfileApi(data)
        return response
        const { ok } = response

        hotelData.value = ok ? response.data : null
        return response.data
    }

    async function $updateVisivilityFacilities () {
        // console.log('findByParamsApi',localStorage.getItem('subdomain'))
        const response = await hotelService.updateVisivilityFacilitiesApi()
        return response
        const { ok } = response

        hotelData.value = ok ? response.data : null
        return response.data
    }
    



    //
    return {
        hotelData,
        subdomain,
        formatImage,
        reloadHotel,
        $findByParams,
        $updateProfile,
        $updateVisivilityFacilities,
    }

})