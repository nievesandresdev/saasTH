import { apiHttp } from '../AxiosConfig'
import {
    chainPath,
} from '../config/apiRoute'

export const verifySubdomainExistPerChainApi = (params, config = {}) => apiHttp('GET', `${chainPath}/verifySubdomainExist`, params, config);
export const updateConfigGeneralApi = (body, config = {}) => apiHttp('POST', `${chainPath}/configGeneral/update`, body, config, { showPreloader: true }, 'API_GENERAL', false, true);
//getChainBySubdomain es un servicio para trer el dato chain de un hotel
export const getChainBySubdomainApi = (params, config = {}) => apiHttp('GET', `${chainPath}/getChainBySubdomain`, params, config);
