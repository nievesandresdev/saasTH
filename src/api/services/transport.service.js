import { apiHttp } from '../AxiosConfig'
import {
    transportPath,
} from '../config/apiRoute'

export const  getAllApi = (params, config = {}) => apiHttp('POST', `${transportPath}/getAll`, params, {showPreloader: false}, 'API_HELPER', false, true);
export const updateOrderApi = (data, config = {}) => apiHttp('POST', `${transportPath}/order`, data, {showPreloader: false}, 'API_HELPER', false, true);
export const storeOrUpdateApi = (data, config = {}) => apiHttp('POST', `${transportPath}/storeOrUpdate`, data, {showPreloader: false}, 'API_HELPER', false, true);
export const deleteApi = (id, data, config = {}) => apiHttp('DELETE', `${transportPath}/${id}`, data, {showPreloader: false}, 'API_HELPER', false, true);
export const updateVisibleApi = (data, config = {}) => apiHttp('POST', `${transportPath}/visibility`, data, {showPreloader: false}, 'API_HELPER', false, true);
