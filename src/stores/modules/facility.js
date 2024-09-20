import { defineStore } from 'pinia'
import { ref } from 'vue'
import * as facilityServices from '@/api/services/facility.service'


export const useFacilityStore = defineStore('facility', () => {
    
    // STATE
    const URL_STORAGE = process.env.VUE_APP_STORAGE_URL

    // ACTIONS
    function formatImage (img) {
        if (!img) return '';
        let { type, url } = img;

        // console.log(`'type: '${type}, 'url: '${url}`)
        if (type === 'CDN') return url;
        if (url?.includes('storage/gallery')) return `${URL_STORAGE}${url}`;
        if (!type) return URL_STORAGE+'/storage/facility'+url;
        return `${URL_STORAGE}${url}`;

        // url = type != 'CDN' ? `${URL_STORAGE}${url}` : url
        // return url
    }

    async function $getAll () {
        const response = await facilityServices.getAllApi()
        return response;
        if(response.ok) return response.data
        return []
    }

    async function $updateVisible (data) {
        const response = await facilityServices.updateVisibleApi(data)
        return response;
        if(response.ok) return response.data
        return []
    }

    async function $updateOrder (data) {
        const response = await facilityServices.updateOrderApi(data, {showPreloader: false});
        return response;
        if(response.ok) return response.data;
        return []
    }

    async function $findById(id) {
        const response = await facilityServices.findByIdApi(id)
        return response;
        if(response.ok) return response.data
        return []
    }

    async function $storeOrUpdate(body) {
        const response = await facilityServices.storeOrUpdateApi(body);
        return response;
        if(response.ok) return response.data;
        return [];
    }

    async function $delete(id) {
        const response = await facilityServices.deleteApi(id);
        return response;
        if(response.ok) return response.data;
        return [];
    }

    //
    return {
        formatImage,
        $getAll,
        $findById,
        $updateVisible,
        $updateOrder,
        $storeOrUpdate,
        $delete,
    }

})