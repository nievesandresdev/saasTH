import { apiHttp } from '../AxiosConfig'
import {
    saasPlacePath,
    placePath,
} from '../config/apiRoute'

// export const getAllApi = (params) => apiHttp('POST', `${placePath}/getAll`, params, {}, 'API_HELPER');
export const getCategoriesByTypeApi = (params) => apiHttp('POST', `${placePath}/getCategoriesByType`, params, {}, 'API_HELPER');
export const getTypePlacesApi = (params = {}) => apiHttp('GET', `${placePath}/getTypePlaces`, params, {}, 'API_HELPER');
export const getAllApi = (data, config = {}) => apiHttp('POST', `${saasPlacePath}/getPlacesSectionPlataform`, data, config, 'API_HELPER');
export const getDataUtilApi = (data, config = {}) => apiHttp('POST', `${saasPlacePath}/getDataSectionPlataform`, data, config, 'API_HELPER');

export const updateVisibilityApi = (data, config = {}) => apiHttp('POST', `${saasPlacePath}/visibility`, data, config, 'API_HELPER');
export const updateRecommendationApi = (data, config = {}) => apiHttp('POST', `${saasPlacePath}/recommendation`, data, config, 'API_HELPER');
export const updatePositionApi = (data, config = {}) => apiHttp('POST', `${saasPlacePath}/position`, data, config, 'API_HELPER');
export const updateApi = (data, config = {}) => apiHttp('POST', `${saasPlacePath}`, data, config, 'API_HELPER');
