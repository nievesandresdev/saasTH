import { apiHttp } from '../AxiosConfig'
import {
    pmsPath,
} from '../config/apiRoute'

export const getIntegrationPmsApi = () => apiHttp('GET', `${pmsPath}/getIntegrationPms`, {}, {showPreloader: false });
export const updateOrCreateCredentialsPmsApi = (data) => apiHttp('POST', `${pmsPath}/updateOrCreateCredentials`, data, {showPreloader: false });
export const deleteCredentialsPmsApi = (data) => apiHttp('POST', `${pmsPath}/deleteCredentialsPms`, data, {showPreloader: false });
export const getPmswithFiltersApi = (data) => apiHttp('GET', `${pmsPath}/getPmswithFilters/${data}`, {}, {showPreloader: false });

