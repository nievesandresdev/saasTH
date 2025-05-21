import { apiHttp } from '../AxiosConfig'
import {
    subservicePath,
} from '../config/apiRoute'

export const  getAllApi = (params, config = {}) => apiHttp('GET', `${subservicePath}/getAll`, params, {showPreloader: false}, 'API_HELPER');
export const updateOrderApi = (data, config = {}) => apiHttp('POST', `${subservicePath}/order`, data, {showPreloader: false}, 'API_HELPER', false, true);
export const storeOrUpdateApi = (data, config = {}) => apiHttp('POST', `${subservicePath}/storeOrUpdate`, data, {showPreloader: false}, 'API_HELPER', false, true);
export const deleteApi = (id, data, config = {}) => apiHttp('DELETE', `${subservicePath}/${id}`, data, {showPreloader: false}, 'API_HELPER', false, true);