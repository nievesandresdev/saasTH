import { apiHttp } from '../../AxiosConfig'
import {
    queryPath,
    hosterPath
} from '../../config/apiRoute'

export const getFeedbackSummaryByGuestApi = (data) => apiHttp('GET', `${queryPath}/${hosterPath}/getFeedbackSummaryByGuest`, data, { showPreloader: false })
export const togglePendingStateApi = (data) => apiHttp('POST', `${queryPath}/${hosterPath}/togglePendingState`, data, { showPreloader: false })
export const countPendingByHotelApi = () => apiHttp('GET', `${queryPath}/${hosterPath}/countPendingByHotel`, null, { showPreloader: false })