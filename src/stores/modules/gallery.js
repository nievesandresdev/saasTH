import { defineStore } from 'pinia'
import { ref } from 'vue'
import * as galleryServices from '@/api/services/gallery.service'


export const useGalleryStore = defineStore('gallery', () => {
    
    // STATE
    const URL_STORAGE = process.env.VUE_APP_STORAGE_URL

    // ACTIONS
    function formatImage (img) {
        // if (!img) return '';
        // let { type, url } = img
        // if (type === 'CDN') return url
        // if (url?.includes('storage/gallery')) return `${URL_STORAGE}${url}`
        // if (!type) return URL_STORAGE+'/storage/facility'+url;
        // return `${URL_STORAGE}${url}`

        let { url, type, urlDefault } = img
        if (!url) return;
        if (urlDefault) return url;
        let type_d = url.includes('https://') ? 'CDN' : 'STORAGE'
        type = type ?? type_d
        if (type == 'CDN' || type == 'image-hotel-scraper') return url
        let path = URL_STORAGE+url
        return path
    }

    async function $getAll (params, config) {
        const response = await galleryServices.getAllApi(params, config);
        return response;
        if(response.ok) return response.data
        return []
    }

    async function $deleteBulk (data, config) {
        const response = await galleryServices.deleteBulkApi(data, config);
        return response;
        if(response.ok) return response.data
        return []
    }

    //
    return {
        formatImage,
        $getAll,
        $deleteBulk,
    }

})