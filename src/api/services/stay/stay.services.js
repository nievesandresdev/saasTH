import { apiHttp } from '../../AxiosConfig'
import {
    stayPath,
    hosterPath
} from '../../config/apiRoute'


export const getAllByHotelApi = (data) => apiHttp('GET', `${stayPath}/${hosterPath}/getAllByHotel`, data)