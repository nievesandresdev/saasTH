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
    const hotelsAvailables = ref([]);
    const subdomain = ref(sessionStorage.getItem('current_subdomain') ?? null);
    const URL_STORAGE = process.env.VUE_APP_STORAGE_URL;
    

    // ACTIONS

    async function loadHotelsAvailables () {
        if (hotelsAvailables.value?.length <= 0) {
            const response = await $getAll();
            const { ok } = response;
            hotelsAvailables.value = ok ? response.data : null;
        }
    }

    function updateHoteInSession (hotel) {
        if (hotel?.images) {
            delete hotel.images;
        }
        sessionStorage.setItem('current_hotel', JSON.stringify(hotel));
        sessionStorage.setItem('current_subdomain', hotel.subdomain);
    }

    function formatImage ({image = null, url = null}) {
        url = image?.url || url;
        if (!url) return;
        let type = url.includes('https://') ? 'CDN' : 'STORAGE';
        // console.log(process.env.VUE_APP_STORAGE_URL, 'process.env.VUE_APP_STORAGE_URL')
        url = type != 'CDN' ? `${URL_STORAGE}${url}` : url;
        // console.log(url, 'url')
        return url;
    }

    async function changeHotel (hotel) {
        let params = {subdomain: hotel.subdomain}
        let hotelResponse = await $findByParams(params);
        updateHoteInSession(hotelResponse);
    }

    async function reloadHotel () {
        let hotel = await $findByParams();
        
        updateHoteInSession(hotel);
    }

    async function $getAll () {
        const response = await hotelService.getAllApi();
        return response;
        const { ok } = response
        hotelData.value = ok ? response.data : null
        return response.data
    }

    async function $findByParams (params = null) {
        if (!params) {
            params = {
                subdomain: subdomain.value,
            }
        }
        // console.log('findByParamsApi',localStorage.getItem('subdomain'))
        const response = await hotelService.findByParamsApi(params);
        const { ok } = response;
        hotelData.value = ok ? response.data : null;
        return response.data;
    }

    async function $findHotelFullByParams () {
        let params = {
            subdomain: subdomain.value,
        }
        // console.log('findByParamsApi',localStorage.getItem('subdomain'))
        const response = await hotelService.findByParamsApi(params);
        const { ok } = response;

        hotelData.value = ok ? response.data : null;
        return response.data;
    }

    async function $updateProfile (data) {
        // console.log('findByParamsApi',localStorage.getItem('subdomain'))
        const response = await hotelService.updateProfileApi(data);
        return response;
        const { ok } = response

        hotelData.value = ok ? response.data : null
        return response.data
    }

    async function $updateVisivilityFacilities () {
        // console.log('findByParamsApi',localStorage.getItem('subdomain'))
        const response = await hotelService.updateVisivilityFacilitiesApi();
        return response;
        const { ok } = response

        hotelData.value = ok ? response.data : null
        return response.data
    }

    async function $updateVisivilityExperiences () {
        const response = await hotelService.updateVisivilityExperiencesApi();
        return response;
        const { ok } = response

        hotelData.value = ok ? response.data : null
        return response.data
    }

    async function $updateVisivilityPlaces () {
        // console.log('findByParamsApi',localStorage.getItem('subdomain'))
        const response = await hotelService.updateVisivilityPlacesApi();
        return response;
        const { ok } = response

        hotelData.value = ok ? response.data : null
        return response.data
    }
    async function $updateVisivilityCategory (body) {
        const response = await hotelService.updateVisivilityCategoryApi(body);
        return response;
        const { ok } = response

        hotelData.value = ok ? response.data : null
        return response.data
    }
    async function $updateVisivilityTypePlace (body) {
        const response = await hotelService.updateVisivilityTypePlaceApi(body);
        return response;
        const { ok } = response

        hotelData.value = ok ? response.data : null
        return response.data
    }
    



    //
    return {
        hotelData,
        hotelsAvailables,
        subdomain,
        formatImage,
        reloadHotel,
        changeHotel,
        loadHotelsAvailables,
        $findByParams,
        $updateProfile,
        $getAll,
        $updateVisivilityFacilities,
        $updateVisivilityExperiences,
        $updateVisivilityPlaces,
        $updateVisivilityCategory,
        $updateVisivilityTypePlace,
    }

})