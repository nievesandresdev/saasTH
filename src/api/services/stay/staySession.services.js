import { apiHttp } from '../../AxiosConfig'
import {
    stayPath,
    hosterPath,
    queryPath
} from '../../config/apiRoute'

export const getDefaultGuestIdAndSessionsApi = (stayId) => apiHttp('GET', `${stayPath}/${hosterPath}/getDefaultGuestIdAndSessions/${stayId}`, null, { showPreloader: false })
export const getSessionsApi = (data) => apiHttp('GET', `${stayPath}/${hosterPath}/getSessions`, data)
export const createSessionApi = (data) => apiHttp('POST', `${stayPath}/${hosterPath}/createSession`, data, { showPreloader: false })
export const deleteSessionApi = (data) => apiHttp('POST', `${stayPath}/${hosterPath}/deleteSession`, data, { showPreloader: false })
export const deleteSessionByHotelAndEmailApi = (data) => apiHttp('POST', `${stayPath}/${hosterPath}/deleteSessionByHotelAndEmail`, data)
