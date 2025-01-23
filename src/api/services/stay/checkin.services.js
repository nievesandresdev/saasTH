import { apiHttp } from '../../AxiosConfig'
import {
    stayPath,
    hosterPath,
    checkinPath
} from '../../config/apiRoute'

export const getGeneralSettingsApi = () => apiHttp('GET', `${stayPath}/${hosterPath}/${checkinPath}/getGeneralSettings`)
export const updateGeneralSettingsApi = (data) => apiHttp('POST', `${stayPath}/${hosterPath}/${checkinPath}/updateGeneralSettings`, data, { showPreloader: false })

export const getFormSettingsApi = () => apiHttp('GET', `${stayPath}/${hosterPath}/${checkinPath}/getFormSettings`)
export const updateFormSettingsApi = (data) => apiHttp('POST', `${stayPath}/${hosterPath}/${checkinPath}/updateFormSettings`, data, { showPreloader: false })
