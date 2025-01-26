import { apiHttp } from '../AxiosConfig'
import {
    transportPath,
} from '../config/apiRoute'

export const  getAllApi = (params, config = {}) => apiHttp('POST', `${transportPath}/getAll`, params, config, 'API_HELPER');
export const updateOrderApi = (data, config = {}) => apiHttp('POST', `${transportPath}/order`, data, {showPreloader: false}, 'API_HELPER');
export const storeOrUpdateApi = (data, config = {}) => apiHttp('POST', `${transportPath}/storeOrUpdate`, data, {showPreloader: false}, 'API_HELPER');