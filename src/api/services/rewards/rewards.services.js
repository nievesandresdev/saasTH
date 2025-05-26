import { apiHttp } from '../../AxiosConfig'
import {
    rewardsPath,
} from '../../config/apiRoute'

export const getRewardsApi = () => apiHttp('GET', `${rewardsPath}/getRewards`, {}, {showPreloader: false });
export const storeOrUpdateRewardsApi = (data) => apiHttp('POST', `${rewardsPath}/storeOrUpdateRewards`, data, {showPreloader: true }, 'API_GENERAL', false, true);
