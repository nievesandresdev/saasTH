import { apiHttp } from '../../AxiosConfig'
import {
    stayPath,
    hosterPath,
    queryPath
} from '../../config/apiRoute'

export const findByIdApi = (stayId) => apiHttp('GET', `${stayPath}/${hosterPath}/findById/${stayId}`, null)
export const getAllByHotelApi = (data, showLoadPage) => apiHttp('POST', `${stayPath}/${hosterPath}/getAllByHotel`, data, { showPreloader: showLoadPage }, 'API_GENERAL', false, true)

export const statisticsByHotelApi = () => apiHttp('GET', `${stayPath}/${hosterPath}/statisticsByHotel`, null)
export const getdetailDataApi = (data) => apiHttp('GET', `${stayPath}/${hosterPath}/getdetailData`, data, { showPreloader: true }, 'API_GENERAL', false, true)
export const updateDataApi = (data) => apiHttp('POST', `${stayPath}/${hosterPath}/updateData`, data, { showPreloader: true }, 'API_GENERAL', false, true)
export const deleteTestStaysApi = () => apiHttp('POST', `${stayPath}/${hosterPath}/deleteTestStays`, null, { showPreloader: true }, 'API_GENERAL', false, true)
//notes
export const getAllNotesByStayApi = (data, showPreloader) => apiHttp('GET', `${stayPath}/${hosterPath}/getAllNotesByStay`, data,{ showPreloader })
export const createOrupdateStayNoteApi = (data) => apiHttp('POST', `${stayPath}/${hosterPath}/createOrupdateStayNote`, data, { showPreloader: true }, 'API_GENERAL', false, true)
export const deleteStayNoteApi = (data) => apiHttp('POST', `${stayPath}/${hosterPath}/deleteStayNote`, data, { showPreloader: true }, 'API_GENERAL', false, true)
export const createOrupdateGuestNoteApi = (data) => apiHttp('POST', `${stayPath}/${hosterPath}/createOrupdateGuestNote`, data, { showPreloader: true }, 'API_GENERAL', false, true)
export const deleteGuestNoteApi = (data) => apiHttp('POST', `${stayPath}/${hosterPath}/deleteGuestNote`, data, { showPreloader: true }, 'API_GENERAL', false, true)
//queries
export const getDetailQueryByGuestApi = (data) => apiHttp('GET', `${queryPath}/${hosterPath}/getDetailQueryByGuest`, data, { showPreloader: true })
//guest
export const getGuestListWithNotiApi = (data) => apiHttp('GET', `${stayPath}/${hosterPath}/getGuestListWithNoti`, data)
