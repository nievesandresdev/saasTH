import { apiHttp } from '../AxiosConfig'
import {
    hotelPath,
} from '../config/apiRoute'

export const getAllApi = (data) => apiHttp('GET', `${hotelPath}/getAll`, data);
export const getHotelsByUser = () => apiHttp('GET', `${hotelPath}/getHotelsByUser`);
export const updateDefaultHotel = (data) => apiHttp('POST', `${hotelPath}/updateDefaultHotel`, data);
export const findByParamsApi = (params, config = {}) => apiHttp('GET', `${hotelPath}/findByParams`, params, {showPreloader: true });
export const updateProfileApi = (data) => apiHttp('POST', `${hotelPath}/profile`, data);
export const updateSenderMailMaskApi = (data) => apiHttp('POST', `${hotelPath}/updateSenderMailMask`, data, {showPreloader: false });
export const updateVisivilityServiceApi = (data) => apiHttp('POST', `${hotelPath}/serviceVisivility`, data, {showPreloader: false });
export const updateVisivilityFacilitiesApi = () => apiHttp('POST', `${hotelPath}/facilityVisivility`, [], {showPreloader: false });
export const updateVisivilityExperiencesApi = () => apiHttp('POST', `${hotelPath}/experienceVisivility`, [], {showPreloader: false });
export const updateVisivilityPlacesApi = () => apiHttp('POST', `${hotelPath}/placeVisivility`);
export const updateVisivilityCategoryApi = (data) => apiHttp('POST', `${hotelPath}/categoriVisivility`, data, {showPreloader: false });
export const updateVisivilityTypePlaceApi = (data) => apiHttp('POST', `${hotelPath}/typePlaceVisivility`, data, {showPreloader: false });
export const verifySubdomainExistPerHotel = (params, config) => apiHttp('GET', `${hotelPath}/verifySubdomainExistPerHotel`, params, config);
export const updateCustomization = (data, config={}) => apiHttp('POST', `${hotelPath}/customization`, data, config);
export const updateShowButtons = (data) => apiHttp('POST', `${hotelPath}/updateShowButtons`, data);
export const handleShowReferrals = () => apiHttp('POST', `${hotelPath}/handleShowReferrals`, {},{showPreloader: false});


//communication
export const getHotelCommunication = () => apiHttp('POST', `${hotelPath}/communication/getHotelCommunication`);
