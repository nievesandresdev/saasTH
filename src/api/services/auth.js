import { apiHttp } from '../AxiosConfig'


export const resetPassword = (data) => apiHttp('POST', `auth/forgot-password`,data,{ showPreloader: true }, 'API_GENERAL', false, true)
export const verifyToken = (data) => apiHttp('POST', `auth/password/verify-token`,data,{ showPreloader: true }, 'API_GENERAL', false, true)
export const changePassword = (data) => apiHttp('POST', `auth/password/reset`,data,{ showPreloader: true }, 'API_GENERAL', false, true)
export const login = (data) => apiHttp('POST', 'auth/login', data,{ showPreloader: true }, 'API_GENERAL', false, true)
export const loginByCode = (code) => apiHttp('GET', `auth/login/code/${code}`)
export const logout = () => apiHttp('POST', 'auth/logout',{ showPreloader: true }, 'API_GENERAL', false, true)
//check-current-password
export const checkCurrentPassword = (data) => apiHttp('POST', `auth/check-current-password`, data,{ showPreloader: true }, 'API_GENERAL', false, true)

