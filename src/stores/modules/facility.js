import { defineStore } from 'pinia'
import { ref } from 'vue'
import * as facilitySevices from '@/api/services/facility.service'


export const useFacilityStore = defineStore('facility', () => {
    
    // STATE
    const URL_STORAGE = process.env.VUE_APP_STORAGE_URL

    // ACTIONS
    function formatImage (img) {
        if (!img) return '';
        let { type, url } = img
        // console.log(img, 'img')
        // console.log(`'type: '${type}, 'url: '${url}`)
        if (type === 'CDN') return url
        if (url?.includes('storage/gallery')) return `${URL_STORAGE}${url}`
        if (!type) return URL_STORAGE+'/storage/facility'+url;
        return `${URL_STORAGE}${url}`

        // url = type != 'CDN' ? `${URL_STORAGE}${url}` : url
        // return url
    }

    async function $getAll () {
        const response = await facilitySevices.getAllApi()
        return response;
        if(response.ok) return response.data
        return []
    }

    async function $updateVisible (data) {
        const response = await facilitySevices.updateVisibleApi(data)
        return response;
        if(response.ok) return response.data
        return []
    }

    async function $updateOrder (data) {
        const response = await facilitySevices.updateOrderApi(data)
        return response;
        if(response.ok) return response.data
        return []
    }

    async function $findById(id) {
        const response = await facilitySevices.findByIdApi(id)
        return response;
        if(response.ok) return response.data
        return []
    }

    //
    return {
        formatImage,
        $getAll,
        $findById,
        $updateVisible,
        $updateOrder,
    }

})