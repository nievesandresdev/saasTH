import { apiHttp } from '../../AxiosConfig'
import {
    hosterPath,
    notificationsPath,
} from '../../config/apiRoute'

export const getNotificationsByUserApi = (UserId) => apiHttp('GET', `${hosterPath}/${notificationsPath}/getNotificationsByUser/${UserId}`,null)


