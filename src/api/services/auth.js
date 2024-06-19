import { apiHttp } from '../AxiosConfig'


export const resetPassword = (data) => apiHttp('POST', `forgot-password`,data)
export const verifyToken = (data) => apiHttp('POST', `password/verify-token`,data)
export const changePassword = (data) => apiHttp('POST', `password/reset`,data)