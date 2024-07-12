import { apiHttp } from '../../AxiosConfig'
import {
    guestPath,
    hosterPath
} from '../../config/apiRoute'


export const inviteToHotelApi = (data) => apiHttp('POST', `${guestPath}/${hosterPath}/inviteToHotel`, data)