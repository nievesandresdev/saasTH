import { apiHttp } from '../AxiosConfig'


export const resetPassword = (data) => apiHttp('POST', `forgot-password`,data)
