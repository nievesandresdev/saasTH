import { apiHttp } from '../AxiosConfig'
import {
    customizationPath,
} from '../config/apiRoute'

export const findOneApi = (params, confing) => apiHttp('GET', `${customizationPath}/findOne`, params, { showPreloader: false });

export const updateApi = (data, config = {}) => apiHttp('POST', `${customizationPath}`, data, { showPreloader: false }, 'API_GENERAL', false, true);
