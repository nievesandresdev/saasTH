import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

import * as hotelService from '@/api/services/hotel.service'

// import { useMainStore } from '@/stores'
// const mainStore = useMainStore()

export const useHotelStore = defineStore('hotel', () => {
    
    const hotelSession = computed(() => {
        let hotel = localStorage.getItem('current_hotel') ?? null;
        if (hotel) {
            hotel = JSON.parse(hotel);
            if (hotel?.images) {
                delete hotel.images;
            }
            return hotel;
        }
        //return;
        return false;
    })

    const hotelsUser = computed(() => {
        // Obtener el objeto 'user' del localStorage
        let user = localStorage.getItem('user') ?? null;
        
        if (user) {
            // Convertir la cadena JSON a un objeto JavaScript
            user = JSON.parse(user);
            
            // Retornar la propiedad 'parent_hotels' si existe
            return user.hotels ?? [];
        }
        
        // Retornar un array vacío o false si no se encuentra el usuario
        return [];
    });


    const hotelsParent = computed(() => {
        // Obtener el objeto 'user' del localStorage
        let user = localStorage.getItem('user') ?? null;
        
        if (user) {
            // Convertir la cadena JSON a un objeto JavaScript
            user = JSON.parse(user);
            
            // Retornar la propiedad 'parent_hotels' si existe
            return user.parent_hotels ?? [];
        }
        
        // Retornar un array vacío o false si no se encuentra el usuario
        return [];
    });
    

    // STATE
    const hotelData = ref({...hotelSession.value});
    const hotelsAvailables = ref([]);
    const hotelsByUserAvailables = ref([]);
    const subdomain = ref(localStorage.getItem('current_subdomain') ?? null);
    const URL_STORAGE = process.env.VUE_APP_STORAGE_URL;
    

    // ACTIONS

    async function $handleDefaultHotel (hotel){
         const response = await hotelService.updateDefaultHotel(hotel);
        return response;

    }

    

    function updateHoteInSession (hotel) {
        if (hotel?.images) {
            delete hotel.images;
        }
        localStorage.setItem('current_hotel', JSON.stringify(hotel));
        localStorage.setItem('current_subdomain', hotel.subdomain);
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
        let hotelResponse = await $findByParams(params, { showPreloader: false });
        updateHoteInSession(hotelResponse);
    }

    async function reloadHotel () {
        let params = {subdomain: subdomain.value}
        let hotel = await $findByParams(params, { showPreloader: false });
        console.log(hotel, 'reloadHotel');
        updateHoteInSession(hotel);
        return hotel;
    }

    async function $getAll (withoutCurrent = false) {
        let data = { withoutCurrent };
        const response = await hotelService.getAllApi(data);
        return response;
        const { ok } = response
        hotelData.value = ok ? response.data : null
        return response.data
    }

    async function loadHotelsAvailables (withoutCurrent = false) {
        if (hotelsAvailables.value?.length <= 0) {
            const response = await $getAll(withoutCurrent);
            const { ok } = response;
            hotelsAvailables.value = ok ? response.data : null;
            // console.log('test hotelsAvailables.value',hotelsAvailables.value)
        }
    }

    //getAvailables
    async function $getHotelsByUser () {
        const response = await hotelService.getHotelsByUser();
        return response;
    }

    async function loadHotelsByUser () {
        //if (hotelsByUserAvailables.value?.length <= 0) {
            const response = await $getHotelsByUser();
            const { ok } = response;
            
            hotelsByUserAvailables.value = ok ? response.data : null
        //}
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
    
    async function $updateSenderMailMask (data) {
        const response = await hotelService.updateSenderMailMaskApi(data);
        // console.log('updateSenderMailMask',response)
        const { ok } = response
        hotelData.value = ok ? response.data : null
        return response;
    }
    

    async function $updateVisivilityFacilities () {
        // console.log('findByParamsApi',localStorage.getItem('subdomain'))
        const response = await hotelService.updateVisivilityFacilitiesApi();
        return response;
        const { ok } = response

        hotelData.value = ok ? response.data : null
        return response.data
    }

    async function $updateVisivilityService (data) {
        // console.log('findByParamsApi',localStorage.getItem('subdomain'))
        const response = await hotelService.updateVisivilityServiceApi(data);
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

    async function $verifySubdomainExistPerHotel (params) {
        const response = await hotelService.verifySubdomainExistPerHotel(params, {showPreloader: false});
        return response;
        const { ok } = response

        hotelData.value = ok ? response.data : null
        return response.data
    }

    async function $updateCustomization (data) {
        const response = await hotelService.updateCustomization(data);
        return response;
        const { ok } = response

        hotelData.value = ok ? response.data : null
        return response.data
    }

    async function $updateShowButtons (data) {
        const response = await hotelService.updateShowButtons(data);
        return response;
    }

    async function $handleShowReferrals () {
        const response = await hotelService.handleShowReferrals();
        return response;
    }
    



    //
    return {
        hotelData,
        hotelsAvailables,
        hotelsByUserAvailables,
        $handleShowReferrals,
        subdomain,
        formatImage,
        reloadHotel,
        changeHotel,
        loadHotelsAvailables,
        $findByParams,
        $updateProfile,
        $getAll,
        $updateShowButtons,
        $getHotelsByUser,
        loadHotelsByUser,
        $updateVisivilityFacilities,
        $updateVisivilityExperiences,
        $updateVisivilityService,
        $updateVisivilityPlaces,
        $updateVisivilityCategory,
        $updateVisivilityTypePlace,
        $verifySubdomainExistPerHotel,
        $updateCustomization,
        $updateSenderMailMask,
        hotelsUser,
        hotelsParent,
        $handleDefaultHotel
    }

})