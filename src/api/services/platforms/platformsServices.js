import { apiHttp } from '../../AxiosConfig'
import {
    platformsPath,
} from '../../config/apiRoute'

export const requestChangeUrlApi = (data) => apiHttp('POST', `${platformsPath}/requestChangeUrl`, data, { showPreloader: false })
//export const dataOTAS = () => apiHttp('GET', `${platformsPath}/getDataOtas`)
export const dataOTAS = (params) => apiHttp('GET', `hotelOtas/getByParams`,params,{},'API_REVIEW')
export const updateBulkOTASApi = (params) => apiHttp('POST', `hotelOtas/updateBulk`,params,{},'API_REVIEW')

//export const updateBulkOTASApi = (data) => apiHttp('POST', `${platformsPath}/updateBulkOTAS`, data)


