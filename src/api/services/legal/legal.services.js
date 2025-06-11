import { apiHttp } from '../../AxiosConfig'
import {
    legalPath
} from '../../config/apiRoute'

export const getGeneralLegal = () => apiHttp('GET', `${legalPath}/general`, null, { showPreloader: false })
export const storeGeneralLegal = (params) => apiHttp('POST', `${legalPath}/general`, params, { showPreloader: true }, 'API_GENERAL', false, true)

export const getPoliciesLegal = (params) => apiHttp('GET', `${legalPath}/getPolicies`, params, { showPreloader: false })
export const storePoliciesLegal = (params) => apiHttp('POST', `${legalPath}/policies`, params, { showPreloader: true }, 'API_GENERAL', false, true)
export const updatePoliciesLegal = (params) => apiHttp('POST', `${legalPath}/updatePolicies`, params, { showPreloader: true }, 'API_GENERAL', false, true)
export const apiDeletePolicy = (params) => apiHttp('POST', `${legalPath}/deletePolicy`, params, { showPreloader: true }, 'API_GENERAL', false, true)
export const generatePdf = (params) => apiHttp('POST', `${legalPath}/generate-pdf`, params, { showPreloader: true }, 'API_GENERAL', false, true)

export const getCountPoliciesByHotelApi = () => apiHttp('GET', `${legalPath}/getCountPoliciesByHotel`, null)