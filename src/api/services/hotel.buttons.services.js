import { apiHttp } from '../AxiosConfig'
import {
    hotelButtonsPath,
} from '../config/apiRoute'

const TIMEOUT = 5000; // 5 seconds timeout
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

const makeRequest = async (method, url, data = {}, options = {}) => {
    let retries = 0;
    
    while (retries < MAX_RETRIES) {
        try {
            const response = await apiHttp(method, url, data, {
                showPreloader: false,
                timeout: TIMEOUT,
                headers: {
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache'
                },
                ...options
            });

            if (response?.status === 202 && retries < MAX_RETRIES - 1) {
                retries++;
                await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
                continue;
            }

            return response;
        } catch (error) {
            if (retries === MAX_RETRIES - 1) {
                throw error;
            }
            retries++;
            await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
        }
    }
};

export const getHotelButtonsApi = () => makeRequest('GET', `${hotelButtonsPath}/getButtons`);

//updateOrder
export const updateOrderButtonsApi = (data) => makeRequest('POST', `${hotelButtonsPath}/updateOrder`, data);

export const updateButtonVisibilityApi = (data) => makeRequest('POST', `${hotelButtonsPath}/updateButtonVisibility`, data);
//export const storeOrUpdateHotelButtonsApi = (data) => apiHttp('POST', `${hotelButtonsPath}/storeOrUpdateHotelButtons`, data, {showPreloader: true });
