import { apiHttp } from '../../AxiosConfig'
import {
    querySettingsPath,
    hosterPath
} from '../../config/apiRoute'

export const getAllApi = () => apiHttp('GET', `${querySettingsPath}/getAll`, [])
export const updateNotificationsEmailApi = (data) => apiHttp('POST', `${querySettingsPath}/${hosterPath}/updateNotificationsEmail`, data)
export const getPreStaySettingsApi = () => apiHttp('GET', `${querySettingsPath}/${hosterPath}/getPreStaySettings`, [])
