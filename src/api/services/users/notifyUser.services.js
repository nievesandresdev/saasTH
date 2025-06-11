import { apiHttp } from '../../AxiosConfig'
import {
    hosterPath,
    notificationsPath,
} from '../../config/apiRoute'

export const getNotificationsByUserApi = (UserId) => apiHttp('GET', `${hosterPath}/${notificationsPath}/getNotificationsByUser/${UserId}`,null, { showPreloader: false })
export const voteApi = (data) => apiHttp('POST', `${hosterPath}/${notificationsPath}/vote`, data, { showPreloader: true }, 'API_GENERAL', false, true)


