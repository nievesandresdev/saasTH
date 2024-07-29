import { apiHttp } from '../AxiosConfig'
import {
    galleryPath,
} from '../config/apiRoute'

export const getAllApi = (params, config = {}) => apiHttp('GET', `${galleryPath}/getAll`, params, config);