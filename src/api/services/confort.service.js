import { apiHttp } from '../AxiosConfig'
import {
    confortPath,
} from '../config/apiRoute'

export const  getAllApi = (params, config = {}) => apiHttp('POST', `${confortPath}/getAll`, params, {showPreloader: false}, 'API_HELPER', false, true);
export const updateOrderApi = (data, config = {}) => apiHttp('POST', `${confortPath}/order`, data, {showPreloader: true}, 'API_HELPER', false, true);
export const storeOrUpdateApi = (data, config = {}) => apiHttp('POST', `${confortPath}/storeOrUpdate`, data, {showPreloader: true}, 'API_HELPER', false, true);
export const deleteApi = (id, data, config = {}) => apiHttp('DELETE', `${confortPath}/${id}`, data, {showPreloader: true}, 'API_HELPER', false, true);
export const updateVisibilityApi = (data, config = {}) => apiHttp('POST', `${confortPath}/visibility`, data, {showPreloader: true}, 'API_HELPER', false, true);