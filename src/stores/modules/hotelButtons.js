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
        if (isRequestPending.value) {
            return { ok: false, error: 'Ya hay una petición en curso' };
        }

        try {
            isRequestPending.value = true;
            lastError.value = null;
            setRequestTimeout();

            const response = await hotelButtonsServices.updateOrderButtonsApi(data);
            
            if (response?.status === 202) {
                await new Promise(resolve => setTimeout(resolve, 1000));
                const retryResponse = await hotelButtonsServices.updateOrderButtonsApi(data);
                return retryResponse;
            }

            return response;
        } catch (error) {
            console.error('Error in updateOrderButtons:', error);
            lastError.value = error.message;
            return { ok: false, error: error.message };
        } finally {
            clearRequestTimeout();
            isRequestPending.value = false;
        }
    }

    async function $updateButtonVisibility(data) {
        if (isRequestPending.value) {
            return { ok: false, error: 'Ya hay una petición en curso' };
        }

        try {
            isRequestPending.value = true;
            lastError.value = null;
            setRequestTimeout();

            const response = await hotelButtonsServices.updateButtonVisibilityApi(data);
            
            if (response?.status === 202) {
                await new Promise(resolve => setTimeout(resolve, 1000));
                const retryResponse = await hotelButtonsServices.updateButtonVisibilityApi(data);
                return retryResponse;
            }

            return response;
        } catch (error) {
            console.error('Error in updateButtonVisibility:', error);
            lastError.value = error.message;
            return { ok: false, error: error.message };
        } finally {
            clearRequestTimeout();
            isRequestPending.value = false;
        }
    }

    return {
        $getAllHotelButtons,
        $updateOrderButtons,
        $updateButtonVisibility,
        isRequestPending,
        lastError
    }
})