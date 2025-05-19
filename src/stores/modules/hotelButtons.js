import { defineStore } from 'pinia'
import { ref } from 'vue'
import * as hotelButtonsServices from '@/api/services/hotel.buttons.services'

export const useHotelButtonsStore = defineStore('hotelButtons', () => {
    // Cache state
    const cachedButtons = ref(null);
    const lastFetchTime = ref(null);
    const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

    async function $getAllHotelButtons() {
        try {
            // Check if we have valid cached data
            if (cachedButtons.value && lastFetchTime.value) {
                const now = Date.now();
                if (now - lastFetchTime.value < CACHE_DURATION) {
                    return { ok: true, data: cachedButtons.value };
                }
            }

            // If no cache or expired, fetch new data
            const response = await hotelButtonsServices.getHotelButtonsApi();
            
            if (response?.ok && response?.data) {
                // Update cache
                cachedButtons.value = response.data;
                lastFetchTime.value = Date.now();
                return response;
            } else {
                // If we have cached data, return it even if expired
                if (cachedButtons.value) {
                    return { ok: true, data: cachedButtons.value };
                }
                throw new Error('Invalid response from server');
            }
        } catch (error) {
            console.error('Error fetching hotel buttons:', error);
            // If we have cached data, return it even if expired
            if (cachedButtons.value) {
                return { ok: true, data: cachedButtons.value };
            }
            return { ok: false, error: error.message };
        }
    }

    async function $updateOrderButtons(data) {
        try {
            const response = await hotelButtonsServices.updateOrderButtonsApi(data);
            if (response?.ok) {
                // Invalidate cache after successful update
                cachedButtons.value = null;
                lastFetchTime.value = null;
            }
            return response;
        } catch (error) {
            console.error('Error updating button order:', error);
            return { ok: false, error: error.message };
        }
    }

    async function $updateButtonVisibility(data) {
        try {
            const response = await hotelButtonsServices.updateButtonVisibilityApi(data);
            if (response?.ok) {
                // Invalidate cache after successful update
                cachedButtons.value = null;
                lastFetchTime.value = null;
            }
            return response;
        } catch (error) {
            console.error('Error updating button visibility:', error);
            return { ok: false, error: error.message };
        }
    }

    return {
        $getAllHotelButtons,
        $updateOrderButtons,
        $updateButtonVisibility
    }
})