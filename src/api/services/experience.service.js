import { apiHttp } from '../AxiosConfig'
import {
    saasExperiencePath,
    experiencePath,
} from '../config/apiRoute'

export const getAllApi = (params, confing) => apiHttp('POST', `${saasExperiencePath}/getAll`, params, { showPreloader: false });
export const getNumbersByFiltersApi = (data, config = {}) => apiHttp('POST', `${saasExperiencePath}/getNumbersByFilters`, data, config);

export const updateVisibilityApi = (data, config = {}) => apiHttp('POST', `${saasExperiencePath}/visibility`, data, { showPreloader: false });
export const updateRecommendationApi = (data, config = {}) => apiHttp('POST', `${saasExperiencePath}/recommendation`, data, config);
export const updatePositionApi = (data, config = {}) => apiHttp('POST', `${saasExperiencePath}/position`, data, config);
export const updateApi = (data, config = {}) => apiHttp('POST', `${saasExperiencePath}`, data, config);
