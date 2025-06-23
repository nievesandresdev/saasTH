import { apiHttp } from '../../AxiosConfig'
import {
    querySettingsPath,
    hosterPath
} from '../../config/apiRoute'

export const getAllApi = () => apiHttp('GET', `${querySettingsPath}/getAll`, [])

export const getPreStaySettingsApi = () => apiHttp('GET', `${querySettingsPath}/${hosterPath}/getPreStaySettings`, [])
export const updatePreStaySettingsApi = (data) => apiHttp('POST', `${querySettingsPath}/${hosterPath}/updatePreStaySettings`, data, { showPreloader: true }, 'API_GENERAL', false, true)
//
export const getStayVeryGoodSettingsApi = () => apiHttp('GET', `${querySettingsPath}/${hosterPath}/getStayVeryGoodSettings`, [])
export const updateStayVeryGoodSettingsApi = (data) => apiHttp('POST', `${querySettingsPath}/${hosterPath}/updateStayVeryGoodSettings`, data, { showPreloader: true }, 'API_GENERAL', false, true)
export const getStayGoodSettingsApi = () => apiHttp('GET', `${querySettingsPath}/${hosterPath}/getStayGoodSettings`, [])
export const updateStayGoodSettingsApi = (data) => apiHttp('POST', `${querySettingsPath}/${hosterPath}/updateStayGoodSettings`, data, { showPreloader: true }, 'API_GENERAL', false, true)
export const getStayBadSettingsApi = () => apiHttp('GET', `${querySettingsPath}/${hosterPath}/getStayBadSettings`, [])
export const updateStayBadSettingsApi = (data) => apiHttp('POST', `${querySettingsPath}/${hosterPath}/updateStayBadSettings`, data, { showPreloader: true }, 'API_GENERAL', false, true)
//
export const getPostStayVeryGoodSettingsApi = () => apiHttp('GET', `${querySettingsPath}/${hosterPath}/getPostStayVeryGoodSettings`, [])
export const updatePostStayVeryGoodSettingsApi = (data) => apiHttp('POST', `${querySettingsPath}/${hosterPath}/updatePostStayVeryGoodSettings`, data, { showPreloader: true }, 'API_GENERAL', false, true)
export const getPostStayGoodSettingsApi = () => apiHttp('GET', `${querySettingsPath}/${hosterPath}/getPostStayGoodSettings`, [])
export const updatePostStayGoodSettingsApi = (data) => apiHttp('POST', `${querySettingsPath}/${hosterPath}/updatePostStayGoodSettings`, data, { showPreloader: true }, 'API_GENERAL', false, true)
export const getPostStayBadSettingsApi = () => apiHttp('GET', `${querySettingsPath}/${hosterPath}/getPostStayBadSettings`, [])
export const updatePostStayBadSettingsApi = (data) => apiHttp('POST', `${querySettingsPath}/${hosterPath}/updatePostStayBadSettings`, data, { showPreloader: true }, 'API_GENERAL', false, true)

