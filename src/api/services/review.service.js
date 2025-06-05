import { apiHttp } from '../AxiosConfig'
import {
    reviewPath,
} from '../config/apiRoute'

export const findByIdReviewApi = (params, config = {}) => apiHttp('GET', `${reviewPath}/findByIdReview`, params, config, 'API_REVIEW');
export const getByOtasApi = (data, config = {}) => apiHttp('POST', `${reviewPath}/getByOtas`, data, config, 'API_REVIEW', false, true);
export const getNumbersDistributionByFiltersApi = (data, config = {}) => apiHttp('POST', `${reviewPath}/getNumbersDistributionByFilters`, data, config, 'API_REVIEW', false, true);
export const getSummaryGeneralApi = (params, config = {}) => apiHttp('GET', `${reviewPath}/getSummaryGeneral`, params, config, 'API_REVIEW');
export const getNotificationsApi = (params, config = {}) => apiHttp('GET', `${reviewPath}/getNotifications`, params, config, 'API_REVIEW');
export const updateAttentionStatusApi = (data, config = {}) => apiHttp('POST', `${reviewPath}/updateAttentionStatus`, data, config, 'API_REVIEW', false, true);
export const updateLanguageApi = (data, config = {}) => apiHttp('POST', `${reviewPath}/language/update`, data, config, 'API_REVIEW', false, true);