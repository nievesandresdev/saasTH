import { apiHttp } from '../AxiosConfig'
import {
    galleryPath,
} from '../config/apiRoute'

export const getAllApi = (params, config = {}) => apiHttp('GET', `${galleryPath}/getAll`, params, config, 'API_GENERAL', false, true);
export const deleteBulkApi = (data, config = {}) => apiHttp('POST', `${galleryPath}/deleteBulk`, data, config, 'API_GENERAL', false, true);
export const uploadApi = (data, config = {}) => apiHttp('POST', `${galleryPath}/upload`, data, config, 'API_GENERAL', true, true);