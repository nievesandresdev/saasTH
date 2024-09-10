import { apiHttp } from '../AxiosConfig'
import {
    hotelPath,
} from '../config/apiRoute'

export const getAllApi = () => apiHttp('GET', `${hotelPath}/getAll`);
export const findByParamsApi = (params, config = {}) => apiHttp('GET', `${hotelPath}/findByParams`, params, {showPreloader: false });
export const updateProfileApi = (data) => apiHttp('POST', `${hotelPath}/profile`, data);
export const updateSenderMailMaskApi = (data) => apiHttp('POST', `${hotelPath}/updateSenderMailMask`, data, {showPreloader: false });
export const updateVisivilityFacilitiesApi = () => apiHttp('POST', `${hotelPath}/facilityVisivility`);
export const updateVisivilityExperiencesApi = () => apiHttp('POST', `${hotelPath}/experienceVisivility`);
export const updateVisivilityPlacesApi = () => apiHttp('POST', `${hotelPath}/placeVisivility`);
export const updateVisivilityCategoryApi = (data) => apiHttp('POST', `${hotelPath}/categoriVisivility`, data);
export const updateVisivilityTypePlaceApi = (data) => apiHttp('POST', `${hotelPath}/typePlaceVisivility`, data);
export const verifySubdomainExistPerHotel = (params, config) => apiHttp('GET', `${hotelPath}/verifySubdomainExistPerHotel`, params, config);
export const updateCustomization = (data, config={}) => apiHttp('POST', `${hotelPath}/customization`, data, config);
