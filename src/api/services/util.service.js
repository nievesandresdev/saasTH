import { apiHttp } from '../AxiosConfig'
import {
    reviewPath,
} from '../config/apiRoute'

export const getLanguagesApi = (params) => apiHttp('GET', `/language/getAll`, params, {showPreloader: false });