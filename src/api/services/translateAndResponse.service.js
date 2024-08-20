import { apiHttp } from '../AxiosConfig'
import {
    translateAndResponsePath,
} from '../config/apiRoute'

export const findByReviewIdApi = (params, config = {}) => apiHttp('GET', `${translateAndResponsePath}/findByReviewId`, params, config, 'API_REVIEW');