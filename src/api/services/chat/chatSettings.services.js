import { apiHttp } from '../../AxiosConfig'
import {
    chatPath,
    hosterPath,
    chatSettingsPath
} from '../../config/apiRoute'

export const getAllApi = () => apiHttp('GET', `${chatPath}/${hosterPath}/${chatSettingsPath}/getAll`, [])
export const updateNotificationsEmailApi = (data) => apiHttp('POST', `${chatPath}/${hosterPath}/${chatSettingsPath}/updateNotificationsEmail`, data)
