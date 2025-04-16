import { apiHttp } from '../AxiosConfig'
import {
    reviewPath,
    utilityPath
} from '../config/apiRoute'

export const getLanguagesApi = (params) => apiHttp('GET', `language/getAll`, params, {showPreloader: false });
export const getPhoneCodesApi = () => apiHttp('GET', `${utilityPath}/getPhoneCodesApi`, [], {showPreloader: false });