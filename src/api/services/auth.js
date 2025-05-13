import { apiHttp } from '../AxiosConfig'


export const resetPassword = (data) => apiHttp('POST', `auth/forgot-password`,data)
export const verifyToken = (data) => apiHttp('POST', `auth/password/verify-token`,data)
export const changePassword = (data) => apiHttp('POST', `auth/password/reset`,data)
export const login = (data) => apiHttp('POST', 'auth/login', data)
export const loginByCode = (code) => apiHttp('GET', `auth/login/code/${code}`)

export const logout = () => apiHttp('POST', 'auth/logout')
//check-current-password
export const checkCurrentPassword = (data) => apiHttp('POST', `auth/check-current-password`, data,{ showPreloader: false })

