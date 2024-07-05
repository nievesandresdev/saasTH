import { apiHttp } from '../../AxiosConfig'
import {
    dashboardPath,
} from '../../config/apiRoute'

export const dataCustomerExperience = (params) => apiHttp('GET', `${dashboardPath}/dataCustomerExperience`,params)
//feedback
export const dataFeedback = (params) => apiHttp('GET', `${dashboardPath}/dataFeedback`,params)