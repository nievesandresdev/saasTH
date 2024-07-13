import { apiHttp } from '../../AxiosConfig'
import {
    stayPath,
    hosterPath
} from '../../config/apiRoute'


export const getAllByHotelApi = (data) => apiHttp('POST', `${stayPath}/${hosterPath}/getAllByHotel`, data)
export const statisticsByHotelApi = () => apiHttp('GET', `${stayPath}/${hosterPath}/statisticsByHotel`, null)
export const getdetailDataApi = (data) => apiHttp('GET', `${stayPath}/${hosterPath}/getdetailData`, data)
export const updateDataApi = (data) => apiHttp('POST', `${stayPath}/${hosterPath}/updateData`, data)
export const getAllNotesByStayApi = (data) => apiHttp('GET', `${stayPath}/${hosterPath}/getAllNotesByStay`, data)
//notes
export const createOrupdateStayNoteApi = (data) => apiHttp('POST', `${stayPath}/${hosterPath}/createOrupdateStayNote`, data)
export const deleteStayNoteApi = (data) => apiHttp('POST', `${stayPath}/${hosterPath}/deleteStayNote`, data)
export const createOrupdateGuestNoteApi = (data) => apiHttp('POST', `${stayPath}/${hosterPath}/createOrupdateGuestNote`, data)
export const deleteGuestNoteApi = (data) => apiHttp('POST', `${stayPath}/${hosterPath}/deleteGuestNote`, data)
