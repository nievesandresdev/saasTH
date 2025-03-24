import { defineStore } from 'pinia'
import { ref } from 'vue'
import * as subserviceServices from '@/api/services/subservice.service'

import { useHotelStore } from '@/stores/modules/hotel';

export const useSubserviceStore = defineStore('subservice', () => {

    const hotelStore = useHotelStore();
    
    // STATE
    const URL_STORAGE = process.env.VUE_APP_STORAGE_URL

    // ACTIONS
    function formatImage (img) {
        if (!img) return '';
        let { type, url } = img;

        // console.log(`'type: '${type}, 'url: '${url}`)
        if (type === 'CDN') return url;
        if (url?.includes('storage/gallery')) return `${URL_STORAGE}${url}`;
        if (!type) return URL_STORAGE+'/storage/subservice'+url;
        return `${URL_STORAGE}${url}`;
    }

    async function $getAll (params) {
        let { id: idHotel, name: nameName, zone: zoneHotel } =  hotelStore.hotelData;
        let newParams = {
            hotel: { id: idHotel, name: nameName, zone: zoneHotel },
            ...params
        }
        const response = await subserviceServices.getAllApi(newParams);
        if(response.ok) return response;
        return [];
    }

    // async function $updateVisible (data) {
    //     const response = await facilityServices.updateVisibleApi(data)
    //     return response;
    //     if(response.ok) return response.data
    //     return []
    // }

    async function $updateOrder (params) {
        let { id: idHotel, name: nameName, zone: zoneHotel } =  hotelStore.hotelData;
        let newParams = {
            hotel: { id: idHotel, name: nameName, zone: zoneHotel },
            ...params
        }
        const response = await subserviceServices.updateOrderApi(newParams, {showPreloader: false});
        return response;
        if(response.ok) return response.data;
        return []
    }

    // async function $findById(id) {
    //     const response = await facilityServices.findByIdApi(id)
    //     return response;
    //     if(response.ok) return response.data
    //     return []
    // }

    async function $storeOrUpdate(params) {
        let { id: idHotel, name: nameName, zone: zoneHotel } =  hotelStore.hotelData;
        let newParams = {
            hotel: { id: idHotel, name: nameName, zone: zoneHotel },
            ...params
        }
        const response = await subserviceServices.storeOrUpdateApi(newParams, {showPreloader: false});
        return response;
        if(response.ok) return response.data;
        return [];
    }

    async function $delete (id, params) {
        let { id: idHotel, name: nameName, zone: zoneHotel } =  hotelStore.hotelData;
        let newParams = {
            hotel: { id: idHotel, name: nameName, zone: zoneHotel },
            ...params
        }
        const response = await subserviceServices.deleteApi(id, newParams, {showPreloader: false});
        return response;
        if(response.ok) return response.data;
        return [];
    }

    //
    return {
        formatImage,
        $getAll,
        // $findById,
        // $updateVisible,
        $updateOrder,
        $storeOrUpdate,
        $delete,
    }

})