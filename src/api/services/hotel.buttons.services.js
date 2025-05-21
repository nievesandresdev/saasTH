import { apiHttp } from '../AxiosConfig'
import {
    hotelButtonsPath,
} from '../config/apiRoute'

export const getHotelButtonsApi = () => apiHttp('GET', `${hotelButtonsPath}/getButtons`, {}, {showPreloader: false });
//updateOrder
export const updateOrderButtonsApi = (data) => apiHttp('POST', `${hotelButtonsPath}/updateOrder`, data, {showPreloader: false },'API_GENERAL',false,true);
export const updateButtonVisibilityApi = (data) => apiHttp('POST', `${hotelButtonsPath}/updateButtonVisibility`, data, {showPreloader: false },'API_GENERAL',false,true);
//export const storeOrUpdateHotelButtonsApi = (data) => apiHttp('POST', `${hotelButtonsPath}/storeOrUpdateHotelButtons`, data, {showPreloader: true });
