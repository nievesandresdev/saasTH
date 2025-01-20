import { apiHttp } from '../AxiosConfig'
import {
    chainPath,
} from '../config/apiRoute'

export const verifySubdomainExistPerChainApi = (params, config = {}) => apiHttp('GET', `${chainPath}/verifySubdomainExist`, params, config);
export const updateConfigGeneralApi = (body, config = {}) => apiHttp('POST', `${chainPath}/configGeneral/update`, body, config);