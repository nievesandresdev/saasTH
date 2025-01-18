import { apiHttp } from '../../AxiosConfig'
import {
    rewardsPath,
} from '../../config/apiRoute'

export const getRewardsApi = () => apiHttp('GET', `${rewardsPath}/getRewards`, {}, {showPreloader: false });
