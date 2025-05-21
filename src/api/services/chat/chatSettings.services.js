import { apiHttp } from '../../AxiosConfig'
import {
    chatPath,
    hosterPath,
    chatSettingsPath
} from '../../config/apiRoute'

export const getAllApi = () => apiHttp('GET', `${chatPath}/${hosterPath}/${chatSettingsPath}/getAll`, [])
export const updateNotificationsEmailApi = (data) => apiHttp('POST', `${chatPath}/${hosterPath}/${chatSettingsPath}/updateNotificationsEmail`, data, { showPreloader: false }, 'API_GENERAL', false, true)




//Settings Chat
export const getSettings = () => apiHttp('GET', `${chatPath}/${hosterPath}/${chatSettingsPath}/getSettings`, [])
//searchLang
export const searchLang = (params) => apiHttp('POST', `${chatPath}/${hosterPath}/${chatSettingsPath}/searchLang`, params,{ showPreloader: false }, 'API_GENERAL', false, true)
//storeGeneralSetting
export const storeGeneralSetting = (params) => apiHttp('POST', `${chatPath}/${hosterPath}/${chatSettingsPath}/storeGeneralSetting`, params,{ showPreloader: true }, 'API_GENERAL', false, true)
//updateAvailability
export const updateAvailability = (params) => apiHttp('POST', `${chatPath}/${hosterPath}/${chatSettingsPath}/updateAvailability`, params,{ showPreloader: true }, 'API_GENERAL', false, true)
//updateResponses
export const updateResponses = (params) => apiHttp('POST', `${chatPath}/${hosterPath}/${chatSettingsPath}/updateResponses`, params,{ showPreloader: true }, 'API_GENERAL', false, true)
