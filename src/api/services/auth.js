import { apiHttp } from '../AxiosConfig'


export const resetPassword = (data) => apiHttp('POST', `auth/forgot-password`,data)
export const verifyToken = (data) => apiHttp('POST', `auth/password/verify-token`,data)
export const changePassword = (data) => apiHttp('POST', `auth/password/reset`,data)
export const login = (data) => apiHttp('POST', 'auth/login', data)
export const logout = () => apiHttp('POST', 'auth/logout')

