import { apiHttp } from '../AxiosConfig'
import {
    saasPlacePath,
    placePath,
} from '../config/apiRoute'

// export const getAllApi = (params) => apiHttp('POST', `${placePath}/getAll`, params, {}, 'API_HELPER');
export const getCategoriesByTypeApi = (params) => apiHttp('POST', `${placePath}/getCategoriesByType`, params, { showPreloader: false }, 'API_HELPER');
export const getTypePlacesApi = (params = {}) => apiHttp('GET', `${placePath}/getTypePlaces`, params, { showPreloader: false }, 'API_HELPER');
export const getAllApi = (data) => apiHttp('POST', `${saasPlacePath}/getPlacesSectionPlataform`, data, { showPreloader: false }, 'API_HELPER');
export const getDataUtilApi = (data) => apiHttp('POST', `${saasPlacePath}/getDataSectionPlataform`, data, { showPreloader: false }, 'API_HELPER');

export const updateVisibilityApi = (data) => apiHttp('POST', `${saasPlacePath}/visibility`, data, { showPreloader: false }, 'API_HELPER', false, true);
export const updateRecommendationApi = (data) => apiHttp('POST', `${saasPlacePath}/recommendation`, data, { showPreloader: false }, 'API_HELPER', false, true);
export const updatePositionApi = (data) => apiHttp('POST', `${saasPlacePath}/position`, data, { showPreloader: false }, 'API_HELPER', false, true);
export const updateApi = (data) => apiHttp('POST', `${saasPlacePath}`, data, { showPreloader: false }, 'API_HELPER', false, true);
