import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

import * as placeService from '@/api/services/place.service';
import { useHotelStore } from '@/stores/modules/hotel';


export const usePlaceStore = defineStore('place', () => {

    const URL_STORAGE = process.env.VUE_APP_STORAGE_URL;

    const hotelStore = useHotelStore();


    // FUNCTIONS

    function formatImage (item) {
        let { image: path, type, url } = item ?? {};
        
        let model = 'places';
        if(type == "gallery" || url?.includes('storage')) model = 'gallery'; 

        let urlFull = `${URL_STORAGE}/storage/${model}/${path}`
        return urlFull

    }
    
    async function $getCategoriesByType (params) {
        let { id: idHotel, name: nameName, zone: zoneHotel } =  hotelStore.hotelData;
        let newParams = {
            hotel: { id: idHotel, name: nameName, zone: zoneHotel },
            ...params
        }
        const response = await placeService.getCategoriesByTypeApi(newParams);
        return response;
    }
    async function $getTypePlaces (params) {
        let { id: idHotel, name: nameName, zone: zoneHotel } =  hotelStore.hotelData;
        let newParams = {
            hotel: { id: idHotel, name: nameName, zone: zoneHotel },
            ...params
        }
        const response = await placeService.getTypePlacesApi(newParams);
        return response;
    }
    async function $getAll (params, config = {}) {
        let { id: idHotel, name: nameName, zone: zoneHotel } =  hotelStore.hotelData;
        let newParams = {
            hotel: { id: idHotel, name: nameName, zone: zoneHotel },
            ...params
        }
        const response = await placeService.getAllApi(newParams, config);
        return response;
    }

    async function $getDataUtil (params, config = {}) {
        let { id: idHotel, name: nameName, zone: zoneHotel } =  hotelStore.hotelData;
        let newParams = {
            hotel: { id: idHotel, name: nameName, zone: zoneHotel },
            ...params
        }
        const response = await placeService.getDataUtilApi(newParams, config);
        return response;
        const { ok } = response
        hotelData.value = ok ? response.data : null
        return response.data
    }

    //
    return {
        formatImage,
        $getAll,
        $getDataUtil,
        $getTypePlaces,
        $getCategoriesByType,
    }

})