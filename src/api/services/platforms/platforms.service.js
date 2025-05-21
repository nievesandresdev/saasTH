import { apiHttp } from '../../AxiosConfig'
import {
    platformsPath,
} from '../../config/apiRoute'

export const requestChangeUrlApi = (data) => apiHttp('POST', `${platformsPath}/requestChangeUrl`, data, { showPreloader: false })
//export const dataOTAS = () => apiHttp('GET', `${platformsPath}/getDataOtas`)
export const dataOTAS = (params) => apiHttp('GET', `hotelOtas/getByParams`,params,{ showPreloader: true },'API_REVIEW')
export const updateBulkOTASApi = (params) => apiHttp('POST', `hotelOtas/updateBulk`,params,{ showPreloader: false },'API_REVIEW' , false, true)
export const findByParamsOta = (params) => apiHttp('GET', `hotelOtas/findByParams`,params,{ showPreloader: false },'API_REVIEW')
export const getAllDataByOtas = (params) => apiHttp('GET', `hotelDetails/findOne`,params,{ showPreloader: false },'API_REVIEW')


//export const updateBulkOTASApi = (data) => apiHttp('POST', `${platformsPath}/updateBulkOTAS`, data)


