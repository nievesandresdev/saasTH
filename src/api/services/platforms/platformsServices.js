import { apiHttp } from '../../AxiosConfig'
import {
    platformsPath,
} from '../../config/apiRoute'

//requestChangeUrl
export const requestChangeUrlApi = (data) => apiHttp('POST', `${platformsPath}/requestChangeUrl`, data, { showPreloader: false })


