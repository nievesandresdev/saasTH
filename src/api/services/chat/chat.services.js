import { apiHttp } from '../../AxiosConfig'
import {
    chatPath,
    hosterPath
} from '../../config/apiRoute'

export const getDataRoomApi = (data, showLoadPage = true) => apiHttp('GET', `${chatPath}/${hosterPath}/getDataRoom`, data, { showPreloader: showLoadPage })
export const getGuestListWNotiApi = (data, showLoadPage = true) => apiHttp('GET', `${chatPath}/${hosterPath}/getGuestListWNoti`, data, { showPreloader: showLoadPage })
export const togglePendingApi = (data) => apiHttp('POST', `${chatPath}/${hosterPath}/togglePending`, data, { showPreloader: false })
export const sendMsgApi = (data) => apiHttp('POST', `${chatPath}/${hosterPath}/sendMsg`, data, { showPreloader: false })
export const pendingCountByHotelApi = () => apiHttp('GET', `${chatPath}/${hosterPath}/pendingCountByHotel`, [], { showPreloader: false })
export const pendingCountByStayApi = (stayId) => apiHttp('GET', `${chatPath}/${hosterPath}/pendingCountByStay/${stayId}`, [], { showPreloader: false })
export const markGuesMsgstAsReadApi = (stayId, guestId) => apiHttp('POST', `${chatPath}/${hosterPath}/markGuesMsgstAsRead/${stayId}/${guestId}`, [], { showPreloader: false })