import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

import * as reviewService from '@/api/services/review.service';
import { useHotelStore } from '@/stores/modules/hotel';


export const useReviewStore = defineStore('review', () => {

    const URL_STORAGE = process.env.VUE_APP_STORAGE_URL;

    const hotelStore = useHotelStore();
    const otas = [
        'BOOKING',
        'EXPEDIA',
        'TRIPADVISOR',
        'GOOGLE',
        'AIRBNB',
    ]
    const scaleRating = {
        BOOKING: 10,
        EXPEDIA: 10,
        TRIPADVISOR: 5,
        GOOGLE: 5,
        AIRBNB: 5,
    }

    const otasWithUrls = ref([]);

    const numbersOtasWithUrls = computed(() => {
        return otasWithUrls.value.length;
    });

    //SETTERS

    function setOtasWithUrls (val) {
        otasWithUrls.value = val;
    }

    // FUNCTIONS

    async function $findByIdReview (params) {
        let config = {
            showPreloader: false,
        }
        params.googleMapCid = hotelStore.hotelData.code;
        const response = await reviewService.findByIdReviewApi(params, config);
        return response;
    }
    async function $getByOtas (params) {
        let config = {
            showPreloader: false,
        }
        params.googleMapCid = hotelStore.hotelData.code;
        const response = await reviewService.getByOtasApi(params, config);
        return response;
    }
    async function $getNumbersDistributionByFilters (params) {
        let config = {
            showPreloader: false,
        }
        params.googleMapCid = hotelStore.hotelData.code;
        const response = await reviewService.getNumbersDistributionByFiltersApi(params, config);
        return response;
    }
    async function $getSummaryGeneral () {
        let config = {
            showPreloader: false,
        }
        let params = {
            googleMapCid: hotelStore.hotelData.code
        }
        const response = await reviewService.getSummaryGeneralApi(params, config);
        return response;
    }
    async function $countReviewsPending () {
        let config = {
            showPreloader: false,
        }
        let params = {
            googleMapCid: hotelStore.hotelData.code
        }
        const response = await reviewService.getNotificationsApi(params, config);
        return response?.data?.numbersReviewsAttended || 0;
    }
    async function $updateAttentionStatus (data) {
        let config = {
            showPreloader: false,
        }
        data.googleMapCid = hotelStore.hotelData.code;
        const response = await reviewService.updateAttentionStatusApi(data, config);
        return response;
    }
    async function $updateLanguage (data) {
        let config = {
            showPreloader: false,
        }
        data.googleMapCid = hotelStore.hotelData.code;
        const response = await reviewService.updateLanguageApi(data, config);
        return response;
    }

    //
    return {
        otas,
        scaleRating,
        otasWithUrls,
        numbersOtasWithUrls,
        setOtasWithUrls,
        $findByIdReview,
        $countReviewsPending,
        $getByOtas,
        $getNumbersDistributionByFilters,
        $getSummaryGeneral,
        $updateAttentionStatus,
        $updateLanguage,
    }

})