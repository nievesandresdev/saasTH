import { apiHttp } from '../../AxiosConfig'
import {
    legalPath
} from '../../config/apiRoute'

export const getGeneralLegal = () => apiHttp('GET', `${legalPath}/general`, null, { showPreloader: true })
export const storeGeneralLegal = (params) => apiHttp('POST', `${legalPath}/general`, params, { showPreloader: true })

export const getPoliciesLegal = (params) => apiHttp('GET', `${legalPath}/getPolicies`, params, { showPreloader: true })
export const storePoliciesLegal = (params) => apiHttp('POST', `${legalPath}/policies`, params, { showPreloader: true })
export const updatePoliciesLegal = (params) => apiHttp('POST', `${legalPath}/updatePolicies`, params, { showPreloader: true })
export const apiDeletePolicy = (params) => apiHttp('POST', `${legalPath}/deletePolicy`, params, { showPreloader: true })
