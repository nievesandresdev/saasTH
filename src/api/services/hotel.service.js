import { apiHttp } from '../AxiosConfig'
import {
    hotelPath,
} from '../config/apiRoute'

export const findByParamsApi = (params) => apiHttp('GET', `${hotelPath}/findByParams`, params)
export const updateProfileApi = (data) => apiHttp('POST', `${hotelPath}/profile`, data)
