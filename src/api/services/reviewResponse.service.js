import { apiHttp } from '../AxiosConfig'
import {
    reviewResponsePath,
} from '../config/apiRoute'

export const getAllApi = (params, config = {}) => apiHttp('GET', `${reviewResponsePath}`, params, config, 'API_REVIEW');
export const translateApi = (data, config = {}) => apiHttp('POST', `${reviewResponsePath}/translate`, data, config, 'API_REVIEW', false, true);