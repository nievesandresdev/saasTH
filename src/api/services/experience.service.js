import { apiHttp } from '../AxiosConfig'
import {
    saasExperiencePath,
    experiencePath,
} from '../config/apiRoute'

export const getAllApi = (params, confing) => apiHttp('POST', `${saasExperiencePath}/getAll`, params, { showPreloader: false }, 'API_HELPER');
export const getNumbersByFiltersApi = (data, config = {}) => apiHttp('POST', `${saasExperiencePath}/getNumbersByFilters`, data, config, 'API_HELPER');

export const updateVisibilityApi = (data, config = {}) => apiHttp('POST', `${saasExperiencePath}/visibility`, data, { showPreloader: false }, 'API_HELPER');
export const updateRecommendationApi = (data, config = {}) => apiHttp('POST', `${saasExperiencePath}/recommendation`, data, config, 'API_HELPER');
export const updatePositionApi = (data, config = {}) => apiHttp('POST', `${saasExperiencePath}/position`, data, config, 'API_HELPER');
export const updateApi = (data, config = {}) => apiHttp('POST', `${saasExperiencePath}`, data, config, 'API_HELPER');

// HOSTER
export const storeOrUpdateHosterApi = (data, config = {}) => apiHttp('POST', `${saasExperiencePath}/hoster/store`, data, config, 'API_HELPER');
