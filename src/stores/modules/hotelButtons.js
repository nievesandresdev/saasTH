import { defineStore } from 'pinia'
import { ref } from 'vue'
import * as hotelButtonsServices from '@/api/services/hotel.buttons.services'

export const useHotelButtonsStore = defineStore('hotelButtons', () => {
    const isRequestPending = ref(false);
    const lastError = ref(null);
    const requestTimeout = ref(null);

    const clearRequestTimeout = () => {
        if (requestTimeout.value) {
            clearTimeout(requestTimeout.value);
            requestTimeout.value = null;
        }
    };

    const setRequestTimeout = () => {
        clearRequestTimeout();
        requestTimeout.value = setTimeout(() => {
            isRequestPending.value = false;
            lastError.value = 'La petición ha excedido el tiempo de espera';
        }, 10000); // 10 segundos de timeout
    };

    async function $getAllHotelButtons() {
        const response = await hotelButtonsServices.getHotelButtonsApi();
        return response;
    }

    async function $updateOrderButtons(data) {
       
        const response = await hotelButtonsServices.updateOrderButtonsApi(data);
        return response;
            
    }

    async function $updateButtonVisibility(data) {
       

            const response = await hotelButtonsServices.updateButtonVisibilityApi(data);
            
            return response;
    }

    return {
        $getAllHotelButtons,
        $updateOrderButtons,
        $updateButtonVisibility,
        isRequestPending,
        lastError
    }
})