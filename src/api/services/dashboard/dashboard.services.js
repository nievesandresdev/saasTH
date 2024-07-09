import { apiHttp } from '../../AxiosConfig'
import {
    dashboardPath,
} from '../../config/apiRoute'

export const dataCustomerExperience = () => apiHttp('GET', `${dashboardPath}/dataCustomerExperience`)
//export const dataCustomerExperience = () => apiHttp('GET', `${dashboardPath}/dataCustomerExperience`,null,{},'API_REVIEW')
//feedback
export const dataFeedback = () => apiHttp('GET', `${dashboardPath}/dataFeedback`)
export const dataReviewOTA = () => apiHttp('GET', `${dashboardPath}/getDataReviewOTA`)
export const dataReviewOTADirect = (params) => apiHttp('GET', `/hotels/getSummaryReviewsOtas`,params,{},'API_REVIEW')