import { apiHttp } from '../../AxiosConfig'
import {
    guestPath,
    hosterPath
} from '../../config/apiRoute'


export const inviteToHotelApi = (data) => apiHttp('POST', `${guestPath}/${hosterPath}/inviteToHotel`, data, { showPreloader: false }, 'API_GENERAL', false, true)
export const findByIdApi = (data) => apiHttp('GET', `${guestPath}/${hosterPath}/findById`, data)