import { apiHttp } from '../AxiosConfig'
import {
    facilityPath,
} from '../config/apiRoute'

export const getAllApi = (params) => apiHttp('GET', `${facilityPath}/hoster/getAll`, params, {showPreloader: false });
export const findByIdApi = (id) => apiHttp('GET', `${facilityPath}/findById/${id}`);
export const updateOrderApi = (data) => apiHttp('POST', `${facilityPath}/order`, data, {showPreloader: false }, 'API_GENERAL', false, true);
export const updateVisibleApi = (data) => apiHttp('POST', `${facilityPath}/visible`, data, {showPreloader: false }, 'API_GENERAL', false, true);
export const storeOrUpdateApi = (data) => apiHttp('POST', `${facilityPath}/storeOrUpdate`, data, {showPreloader: false }, 'API_GENERAL', false, true);
export const deleteApi = (id) => apiHttp('DELETE', `${facilityPath}/${id}`, {showPreloader: false }, 'API_GENERAL', false, true);