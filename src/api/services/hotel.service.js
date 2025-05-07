import { apiHttp } from '../AxiosConfig'
import {
    hotelPath,
    hosterPath,
    wifiNetworksPath
} from '../config/apiRoute'


export const deleteImageByHotelApi = (data) => apiHttp('POST', `${hotelPath}/${hosterPath}/deleteImageByHotel`, data, {showPreloader: false });


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
export const updateOrStoreHotelCommunication = (data) => apiHttp('POST', `${hotelPath}/communication/updateOrStoreHotelCommunication`, data);


//wifi networks
export const storeNetworkApi = (params) => apiHttp('POST', `${hotelPath}/${wifiNetworksPath}/store`, params);
export const updateByIdNetworkApi = (params) => apiHttp('POST', `${hotelPath}/${wifiNetworksPath}/updateById`, params);
export const updateVisibilityNetworkApi = (params) => apiHttp('POST', `${hotelPath}/${wifiNetworksPath}/updateVisibilityNetwork`, params, {showPreloader: false });
export const getAllByHotelApi = () => apiHttp('GET', `${hotelPath}/${wifiNetworksPath}/getAllByHotel`, null, {showPreloader: false });
//
export const toggleChatService = (data) => apiHttp('POST', `${hotelPath}/${hosterPath}/toggleChatService`, data, {showPreloader: false });
export const toggleCheckinService = (data) => apiHttp('POST', `${hotelPath}/${hosterPath}/toggleCheckinService`, data, {showPreloader: false });
export const toggleReviewsService = (data) => apiHttp('POST', `${hotelPath}/${hosterPath}/toggleReviewsService`, data, {showPreloader: false });

export const updateContactPhonesApi = (data) => apiHttp('POST', `${hotelPath}/${hosterPath}/updateContactPhones`, data, {showPreloader: false });
export const updateContactEmailApi = (data) => apiHttp('POST', `${hotelPath}/${hosterPath}/updateContactEmail`, data, {showPreloader: false });
export const updateContactWhatsappApi = (data) => apiHttp('POST', `${hotelPath}/${hosterPath}/updateContactWhatsapp`, data, {showPreloader: false });

export const getProfilePhonesApi = () => apiHttp('GET', `${hotelPath}/${hosterPath}/getProfilePhones`);
export const getProfileEmailApi = () => apiHttp('GET', `${hotelPath}/${hosterPath}/getProfileEmail`);
export const getProfileWhatsappApi = () => apiHttp('GET', `${hotelPath}/${hosterPath}/getProfileWhatsapp`);
export const getShowContactApi = () => apiHttp('GET', `${hotelPath}/${hosterPath}/getShowContact`); 
export const toggleShowContactApi = (data) => apiHttp('POST', `${hotelPath}/${hosterPath}/toggleShowContact`, data, {showPreloader: false });

    
