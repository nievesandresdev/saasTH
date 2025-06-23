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
        // let model = 'places';
        // if(type == "gallery" || url?.includes('storage')) model = 'gallery';

        // let urlFull = `${URL_STORAGE}/storage/${model}/${path}`
        // return urlFull

        if (type == 'gallery' || url?.includes('storage')) return `${URL_STORAGE}${url}`;
        return `${URL_STORAGE}/storage/places/${item?.image}`;

    }
    
    async function $getCategoriesByType (params) {
        let { id: idHotel, name: nameName, zone: zoneHotel, city_id: cityId } =  hotelStore.hotelData;
        let newParams = {
            hotel: { id: idHotel, name: nameName, zone: cityId },
            ...params
        }
        const response = await placeService.getCategoriesByTypeApi(newParams);
        return response;
    }
    async function $getTypePlaces (params) {
        let { id: idHotel, name: nameName, zone: zoneHotel, city_id: cityId } =  hotelStore.hotelData;
        let newParams = {
            hotel: { id: idHotel, name: nameName, zone: cityId },
            ...params
        }
        const response = await placeService.getTypePlacesApi();
        return response;
    }
    async function $getAll (params) {
        let { id: idHotel, name: nameName, zone: zoneHotel, city_id: cityId, latitude, longitude } =  hotelStore.hotelData;
        let newParams = {
            hotel: { id: idHotel, name: nameName, zone: cityId, latitude, longitude },
            ...params
        }
        const response = await placeService.getAllApi(newParams);
        return response;
    }

    async function $getDataUtil (params) {
        let { id: idHotel, name: nameName, zone: zoneHotel, city_id: cityId, latitude, longitude } =  hotelStore.hotelData;
        let newParams = {
            hotel: { id: idHotel, name: nameName, zone: cityId, latitude, longitude },
            ...params
        }
        const response = await placeService.getDataUtilApi(newParams);
        return response;
        const { ok } = response
        hotelData.value = ok ? response.data : null
        return response.data
    }

    async function $updateVisibility (params, config = {}) {
        let { id: idHotel, name: nameName, zone: zoneHotel, city_id: cityId  } =  hotelStore.hotelData;
        let newParams = {
            hotel: { id: idHotel, name: nameName, zone: cityId },
            ...params
        }
        const response = await placeService.updateVisibilityApi(newParams, config);
        return response;
        const { ok } = response
        hotelData.value = ok ? response.data : null
        return response.data
    }

    async function $updateRecommendation (params, config = {}) {
        let { id: idHotel, name: nameName, zone: zoneHotel, city_id: cityId  } =  hotelStore.hotelData;
        let newParams = {
            hotel: { id: idHotel, name: nameName, zone: cityId },
            ...params
        }
        const response = await placeService.updateRecommendationApi(newParams, config);
        return response;
        const { ok } = response
        hotelData.value = ok ? response.data : null
        return response.data
    }
    
    async function $updatePosition (body) {
        let { id: idHotel, name: nameName, zone: zoneHotel, city_id: cityId  } =  hotelStore.hotelData;
        let newBody = {
            hotel: { id: idHotel, name: nameName, zone: cityId },
            ...body,
        }
        const response = await placeService.updatePositionApi(newBody, {showPreloader: false});
        return response;
        if(response.ok) return response.data;
        return []
    }

    async function $update (body) {
        let { id: idHotel, name: nameName, zone: zoneHotel, city_id: cityId  } =  hotelStore.hotelData;
        let newBody = {
            hotel: { id: idHotel, name: nameName, zone: cityId },
            ...body,
        }
        // console.log(newBody);
        const response = await placeService.updateApi(newBody, {showPreloader: true});
        return response;
        if(response.ok) return response.data;
        return []
    }

    //
    return {
        formatImage,
        $getAll,
        $getDataUtil,
        $getTypePlaces,
        $getCategoriesByType,
        $updateVisibility,
        $updateRecommendation,
        $updatePosition,
        $update,
    }

})