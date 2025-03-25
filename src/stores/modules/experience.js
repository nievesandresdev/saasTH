import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

import * as experienceService from '@/api/services/experience.service';
import { useHotelStore } from '@/stores/modules/hotel';


export const useExperienceStore = defineStore('experience', () => {

    const URL_STORAGE = process.env.VUE_APP_STORAGE_URL;

    const hotelStore = useHotelStore();


    // FUNCTIONS

    function formatImage (item) {
        let { image: path, type, url, api } = item ?? {};
        if (api) {
            return url;
        }
        if (type == 'gallery' || url?.includes('storage')) return `${URL_STORAGE}${url}`;
        return `${URL_STORAGE}/storage/places/${item?.image}`;
    }

    function getHotelParams(params = {}) {
        const { id: idHotel, name: nameHotel, zone: zoneHotel, city_id: cityId } = hotelStore.hotelData;
        return {
            hotel: { id: idHotel, name: nameHotel, zone: cityId },
            ...params
        };
    }

    async function $getAll (params) {
        let newParams = getHotelParams(params);
        const response = await experienceService.getAllApi(newParams);
        return response;
    }

    async function $getNumbersByFilters (params, config = {}) {
        let newParams = getHotelParams(params);
        const response = await experienceService.getNumbersByFiltersApi(newParams, config);
        return response;
        const { ok } = response
        hotelData.value = ok ? response.data : null
        return response.data
    }

    async function $updateVisibility (params) {
        let newParams = getHotelParams(params);
        console.log(newParams);
        const response = await experienceService.updateVisibilityApi(newParams);
        return response;
        const { ok } = response
        hotelData.value = ok ? response.data : null
        return response.data
    }

    async function $updateRecommendation (params, config = {}) {
        let newParams = getHotelParams(params);
        const response = await experienceService.updateRecommendationApi(newParams, config);
        return response;
        const { ok } = response
        hotelData.value = ok ? response.data : null
        return response.data
    }
    
    async function $updatePosition (body) {
        let newBody = getHotelParams(body);
        const response = await experienceService.updatePositionApi(newBody, {showPreloader: false});
        return response;
        if(response.ok) return response.data;
        return []
    }

    async function $update (body) {
        let newBody = getHotelParams(body);
        const response = await experienceService.updateApi(newBody, {showPreloader: true});
        return response;
        if(response.ok) return response.data;
        return []
    }

    // MANAGE EXPERIENCES BY HOSTER

    async function $storeOrUpdateHoster (params, config = {}) {
        let newParams = getHotelParams(params);
        const response = await experienceService.storeOrUpdateHosterApi(newParams, config);
        return response;
        const { ok } = response
        hotelData.value = ok ? response.data : null
        return response.data
    }

    async function $deleteHoster (id) {
        let { id: idHotel, name: nameName, zone: zoneHotel } =  hotelStore.hotelData;
        let newParams = {
            hotel: { id: idHotel, name: nameName, zone: zoneHotel },
        }
        const response = await experienceService.deleteHosterApi(id, newParams, {showPreloader: false});
        return response;
        if(response.ok) return response.data;
        return [];
    }

    //
    return {
        formatImage,
        $getAll,
        $getNumbersByFilters,
        $updateVisibility,
        $updateRecommendation,
        $updatePosition,
        $update,
        //
        $storeOrUpdateHoster,
        $deleteHoster,
    }

})