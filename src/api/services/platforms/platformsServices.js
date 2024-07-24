import { apiHttp } from '../../AxiosConfig'
import {
    platformsPath,
} from '../../config/apiRoute'

export const requestChangeUrlApi = (data) => apiHttp('POST', `${platformsPath}/requestChangeUrl`, data, { showPreloader: false })
export const dataOTAS = () => apiHttp('GET', `${platformsPath}/getDataOtas`)
export const updateBulkOTASApi = (data) => apiHttp('POST', `${platformsPath}/updateBulkOTAS`, data)


