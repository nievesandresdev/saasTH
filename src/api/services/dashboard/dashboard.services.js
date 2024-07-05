import { apiHttp } from '../../AxiosConfig'
import {
    dashboardPath,
} from '../../config/apiRoute'

export const dataCustomerExperience = () => apiHttp('GET', `${dashboardPath}/dataCustomerExperience`)
//feedback
export const dataFeedback = () => apiHttp('GET', `${dashboardPath}/dataFeedback`)