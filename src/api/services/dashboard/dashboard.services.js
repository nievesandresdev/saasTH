import { apiHttp } from '../../AxiosConfig'
import {
    dashboardPath,
} from '../../config/apiRoute'

export const dataCustomerExperience = () => apiHttp('GET', `${dashboardPath}/dataCustomerExperience`)
//export const dataCustomerExperience = () => apiHttp('GET', `${dashboardPath}/dataCustomerExperience`,null,{},'API_REVIEW')
//feedback
export const dataFeedback = () => apiHttp('GET', `${dashboardPath}/dataFeedback`)
export const dataReviewOTATest = () => apiHttp('GET', `${dashboardPath}/getDataReviewOTA`)
export const dataReviewOTA = (params) => apiHttp('GET', `/hotels/getSummaryReviewsOtas`,params,{},'API_REVIEW')