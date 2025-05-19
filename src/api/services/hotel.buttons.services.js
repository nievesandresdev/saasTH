import { apiHttp } from '../AxiosConfig'
import {
    hotelButtonsPath,
} from '../config/apiRoute'

const TIMEOUT = 5000; // 5 seconds timeout

export const getHotelButtonsApi = () => apiHttp('GET', `${hotelButtonsPath}/getButtons`, {}, {
    showPreloader: false,
    timeout: TIMEOUT,
    headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
    }
});

//updateOrder
export const updateOrderButtonsApi = (data) => apiHttp('POST', `${hotelButtonsPath}/updateOrder`, data, {
    showPreloader: false,
    timeout: TIMEOUT
});

export const updateButtonVisibilityApi = (data) => apiHttp('POST', `${hotelButtonsPath}/updateButtonVisibility`, data, {
    showPreloader: false,
    timeout: TIMEOUT
});
//export const storeOrUpdateHotelButtonsApi = (data) => apiHttp('POST', `${hotelButtonsPath}/storeOrUpdateHotelButtons`, data, {showPreloader: true });
