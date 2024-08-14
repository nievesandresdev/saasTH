import { apiHttp } from '../../AxiosConfig'
import {
    legalPath
} from '../../config/apiRoute'

export const getGeneralLegal = () => apiHttp('GET', `${legalPath}/general`, null, { showPreloader: true })
export const storeGeneralLegal = (params) => apiHttp('POST', `${legalPath}/general`, params, { showPreloader: true })
