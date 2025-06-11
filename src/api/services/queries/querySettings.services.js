import { apiHttp } from '../../AxiosConfig'
import {
    querySettingsPath,
    hosterPath
} from '../../config/apiRoute'

export const getAllApi = () => apiHttp('GET', `${querySettingsPath}/getAll`, [])
export const updateNotificationsEmailApi = (data) => apiHttp('POST', `${querySettingsPath}/${hosterPath}/updateNotificationsEmail`, data, { showPreloader: true }, 'API_GENERAL', false, true)

export const getPreStaySettingsApi = () => apiHttp('GET', `${querySettingsPath}/${hosterPath}/getPreStaySettings`, [])
export const updatePreStaySettingsApi = (data) => apiHttp('POST', `${querySettingsPath}/${hosterPath}/updatePreStaySettings`, data, { showPreloader: true }, 'API_GENERAL', false, true)

export const getStaySettingsApi = () => apiHttp('GET', `${querySettingsPath}/${hosterPath}/getStaySettings`, [])
export const updateStaySettingsApi = (data) => apiHttp('POST', `${querySettingsPath}/${hosterPath}/updateStaySettings`, data, { showPreloader: true }, 'API_GENERAL', false, true)

export const getPostStaySettingsApi = () => apiHttp('GET', `${querySettingsPath}/${hosterPath}/getPostStaySettings`, [])
export const updatePostStaySettingsApi = (data) => apiHttp('POST', `${querySettingsPath}/${hosterPath}/updatePostStaySettings`, data, { showPreloader: true }, 'API_GENERAL', false, true)
