import { apiHttp } from '../../AxiosConfig'
import {
    rewardsPath,
} from '../../config/apiRoute'

export const getRewardsApi = () => apiHttp('GET', `${rewardsPath}/getRewards`, {}, {showPreloader: false });
export const storeRewardsApi = (data) => apiHttp('POST', `${rewardsPath}/storeRewards`, data, {showPreloader: true });
