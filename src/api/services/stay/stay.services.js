import { apiHttp } from '../../AxiosConfig'
import {
    stayPath,
    hosterPath,
    queryPath
} from '../../config/apiRoute'


export const getAllByHotelApi = (data, showLoadPage) => apiHttp('POST', `${stayPath}/${hosterPath}/getAllByHotel`, data, { showPreloader: showLoadPage })
export const statisticsByHotelApi = () => apiHttp('GET', `${stayPath}/${hosterPath}/statisticsByHotel`, null)
export const getdetailDataApi = (data) => apiHttp('GET', `${stayPath}/${hosterPath}/getdetailData`, data)
export const updateDataApi = (data) => apiHttp('POST', `${stayPath}/${hosterPath}/updateData`, data, { showPreloader: false })
export const getSessionsApi = (data) => apiHttp('GET', `${stayPath}/${hosterPath}/getSessions`, data)
//notes
export const getAllNotesByStayApi = (data, showPreloader) => apiHttp('GET', `${stayPath}/${hosterPath}/getAllNotesByStay`, data,{ showPreloader })
export const createOrupdateStayNoteApi = (data) => apiHttp('POST', `${stayPath}/${hosterPath}/createOrupdateStayNote`, data, { showPreloader: false })
export const deleteStayNoteApi = (data) => apiHttp('POST', `${stayPath}/${hosterPath}/deleteStayNote`, data, { showPreloader: false })
export const createOrupdateGuestNoteApi = (data) => apiHttp('POST', `${stayPath}/${hosterPath}/createOrupdateGuestNote`, data, { showPreloader: false })
export const deleteGuestNoteApi = (data) => apiHttp('POST', `${stayPath}/${hosterPath}/deleteGuestNote`, data, { showPreloader: false })
//sessions
export const createSessionApi = (data) => apiHttp('POST', `${stayPath}/${hosterPath}/createSession`, data)
export const deleteSessionApi = (data) => apiHttp('POST', `${stayPath}/${hosterPath}/deleteSession`, data, { showPreloader: false })
//queries
export const getDetailQueryByGuestApi = (data) => apiHttp('GET', `${queryPath}/${hosterPath}/getDetailQueryByGuest`, data)
//guest
export const getGuestListWithNotiApi = (data) => apiHttp('GET', `${stayPath}/${hosterPath}/getGuestListWithNoti`, data)
