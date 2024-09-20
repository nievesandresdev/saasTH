import { apiHttp } from '../../AxiosConfig'
import {
    requestSettingsPath,
    hosterPath
} from '../../config/apiRoute'

export const getAllApi = () => apiHttp('GET', `${requestSettingsPath}/getAll`, [])
export const getPostStayRequestDataApi = () => apiHttp('GET', `${requestSettingsPath}/getPostStayRequestData`, [])
export const updateDataApi = (data) => apiHttp('POST', `${requestSettingsPath}/${hosterPath}/updateData`, data)