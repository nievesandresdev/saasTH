import { apiHttp } from '../../AxiosConfig'
import {
    stayPath,
    hosterPath
} from '../../config/apiRoute'


export const getAllByHotelApi = (data) => apiHttp('POST', `${stayPath}/${hosterPath}/getAllByHotel`, data)
export const statisticsByHotelApi = () => apiHttp('GET', `${stayPath}/${hosterPath}/statisticsByHotel`, null)
export const getdetailDataApi = (data) => apiHttp('GET', `${stayPath}/${hosterPath}/getdetailData`, data)
export const updateDataApi = (data) => apiHttp('POST', `${stayPath}/${hosterPath}/updateData`, data)