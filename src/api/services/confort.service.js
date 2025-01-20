import { apiHttp } from '../AxiosConfig'
import {
    confortPath,
} from '../config/apiRoute'

export const  getAllApi = (params, config = {}) => apiHttp('GET', `${confortPath}/getAll`, params, config, 'API_HELPER');
export const updateOrderApi = (data, config = {}) => apiHttp('POST', `${confortPath}/order`, data, {showPreloader: false}, 'API_HELPER');
export const storeOrUpdateApi = (data, config = {}) => apiHttp('POST', `${confortPath}/storeOrUpdate`, data, {showPreloader: false}, 'API_HELPER');