import { apiHttp } from '../AxiosConfig'
import {
    hotelPath,
} from '../config/apiRoute'

export const getAllApi = () => apiHttp('GET', `${hotelPath}/getAll`);
export const findByParamsApi = (params) => apiHttp('GET', `${hotelPath}/findByParams`, params);
export const updateProfileApi = (data) => apiHttp('POST', `${hotelPath}/profile`, data);
export const updateVisivilityFacilitiesApi = () => apiHttp('POST', `${hotelPath}/facilityVisivility`);
export const updateVisivilityPlacesApi = () => apiHttp('POST', `${hotelPath}/placeVisivility`);
export const updateVisivilityCategoryApi = (data) => apiHttp('POST', `${hotelPath}/categoriVisivility`, data);
export const updateVisivilityTypePlaceApi = (data) => apiHttp('POST', `${hotelPath}/typePlaceVisivility`, data);
