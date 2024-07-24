import { apiHttp } from '../../AxiosConfig'
import {
    chatPath,
    hosterPath
} from '../../config/apiRoute'

export const getDataRoomApi = (data, showLoadPage = true) => apiHttp('GET', `${chatPath}/${hosterPath}/getDataRoom`, data, { showPreloader: showLoadPage })
export const getGuestListWNotiApi = (data) => apiHttp('GET', `${chatPath}/${hosterPath}/getGuestListWNoti`, data)
export const togglePendingApi = (data) => apiHttp('POST', `${chatPath}/${hosterPath}/togglePending`, data, { showPreloader: false })
export const sendMsgApi = (data) => apiHttp('POST', `${chatPath}/${hosterPath}/sendMsg`, data, { showPreloader: false })