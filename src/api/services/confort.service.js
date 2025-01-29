import { apiHttp } from '../AxiosConfig'
import {
    confortPath,
} from '../config/apiRoute'

export const  getAllApi = (params, config = {}) => apiHttp('POST', `${confortPath}/getAll`, params, config, 'API_HELPER');
export const updateOrderApi = (data, config = {}) => apiHttp('POST', `${confortPath}/order`, data, {showPreloader: false}, 'API_HELPER');
export const storeOrUpdateApi = (data, config = {}) => apiHttp('POST', `${confortPath}/storeOrUpdate`, data, {showPreloader: false}, 'API_HELPER');
export const deleteApi = (id, data, config = {}) => apiHttp('DELETE', `${confortPath}/${id}`, data, {showPreloader: false}, 'API_HELPER');