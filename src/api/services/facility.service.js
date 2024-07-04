import { apiHttp } from '../AxiosConfig'
import {
    facilityPath,
} from '../config/apiRoute'

export const getAllApi = (params) => apiHttp('GET', `${facilityPath}/getAll`, params);
export const findByIdApi = (id) => apiHttp('GET', `${facilityPath}/findById/${id}`);
export const updateOrderApi = (data) => apiHttp('POST', `${facilityPath}/order`, data);
export const updateVisibleApi = (data) => apiHttp('POST', `${facilityPath}/visible`, data);
