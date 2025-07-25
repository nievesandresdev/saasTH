import { apiHttp } from '../../AxiosConfig'
import {
    stayPath,
    hosterPath,
    checkinPath
} from '../../config/apiRoute'

export const getGeneralSettingsApi = () => apiHttp('GET', `${stayPath}/${hosterPath}/${checkinPath}/getGeneralSettings`)
export const updateGeneralSettingsApi = (data) => apiHttp('POST', `${stayPath}/${hosterPath}/${checkinPath}/updateGeneralSettings`, data, { showPreloader: true }, 'API_GENERAL', false, true)

export const getFormSettingsApi = () => apiHttp('GET', `${stayPath}/${hosterPath}/${checkinPath}/getFormSettings`)
export const updateFormSettingsApi = (data) => apiHttp('POST', `${stayPath}/${hosterPath}/${checkinPath}/updateFormSettings`, data, { showPreloader: true }, 'API_GENERAL', false, true)

export const updateToggleShowCheckinHotelApi = (data) => apiHttp('POST', `${stayPath}/${hosterPath}/${checkinPath}/updateToggleShowCheckinHotel`, data, { showPreloader: true }, 'API_GENERAL', false, true)
export const getToggleShowCheckinHotelApi = () => apiHttp('GET', `${stayPath}/${hosterPath}/${checkinPath}/getToggleShowCheckinHotel`)
export const getGuestsForTabsCheckinStayApi = (params) => apiHttp('GET', `${stayPath}/${hosterPath}/${checkinPath}/getGuestsForTabsCheckinStay`, params)
