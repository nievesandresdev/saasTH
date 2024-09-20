import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

import * as experienceService from '@/api/services/experience.service';
import { useHotelStore } from '@/stores/modules/hotel';


export const useExperienceStore = defineStore('experience', () => {

    const URL_STORAGE = process.env.VUE_APP_STORAGE_URL;

    const hotelStore = useHotelStore();


    // FUNCTIONS

    function formatImage (item) {
        let { image: path, type, url } = item ?? {};
            return url;
        // let model = 'places';
        // if(type == "gallery" || url?.includes('storage')) model = 'gallery'; 

        // let urlFull = `${URL_STORAGE}/storage/${model}/${path}`
        // return urlFull;

    }

    async function $getAll (params, config = {}) {
        const response = await experienceService.getAllApi(params, config);
        return response;
    }

    async function $getNumbersByFilters (params, config = {}) {
        const response = await experienceService.getNumbersByFiltersApi(params, config);
        return response;
        const { ok } = response
        hotelData.value = ok ? response.data : null
        return response.data
    }

    async function $updateVisibility (params, config = {}) {
        const response = await experienceService.updateVisibilityApi(params, config);
        return response;
        const { ok } = response
        hotelData.value = ok ? response.data : null
        return response.data
    }

    async function $updateRecommendation (params, config = {}) {
        const response = await experienceService.updateRecommendationApi(params, config);
        return response;
        const { ok } = response
        hotelData.value = ok ? response.data : null
        return response.data
    }
    
    async function $updatePosition (body) {
        const response = await experienceService.updatePositionApi(body, {showPreloader: false});
        return response;
        if(response.ok) return response.data;
        return []
    }

    async function $update (body) {
        const response = await experienceService.updateApi(body, {showPreloader: true});
        return response;
        if(response.ok) return response.data;
        return []
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
    }

})