import { defineStore } from 'pinia'
import { ref } from 'vue'
import * as hotelButtonsServices from '@/api/services/hotel.buttons.services'

export const useHotelButtonsStore = defineStore('hotelButtons', () => {
    const isRequestPending = ref(false);
    const lastError = ref(null);

    async function $getAllHotelButtons() {
        // Si ya hay una petición pendiente, no hacer nada
        if (isRequestPending.value) {
            return { ok: false, error: 'Ya hay una petición en curso' };
        }

        try {
            isRequestPending.value = true;
            lastError.value = null;

            const response = await hotelButtonsServices.getHotelButtonsApi();
            
            // Si la respuesta es 202, esperar un momento y reintentar
            if (response?.status === 202) {
                await new Promise(resolve => setTimeout(resolve, 1000));
                return await $getAllHotelButtons();
            }

            return response;
        } catch (error) {
            console.error('Error in getAllHotelButtons:', error);
            lastError.value = error.message;
            return { ok: false, error: error.message };
        } finally {
            isRequestPending.value = false;
        }
    }

    async function $updateOrderButtons(data) {
        if (isRequestPending.value) {
            return { ok: false, error: 'Ya hay una petición en curso' };
        }

        try {
            isRequestPending.value = true;
            lastError.value = null;
            const response = await hotelButtonsServices.updateOrderButtonsApi(data);
            return response;
        } catch (error) {
            console.error('Error in updateOrderButtons:', error);
            lastError.value = error.message;
            return { ok: false, error: error.message };
        } finally {
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
            const response = await hotelButtonsServices.updateButtonVisibilityApi(data);
            return response;
        } catch (error) {
            console.error('Error in updateButtonVisibility:', error);
            lastError.value = error.message;
            return { ok: false, error: error.message };
        } finally {
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