import { apiHttp } from '../AxiosConfig'


export const resetPassword = () => apiHttp('POST', `/forgot-password`)
