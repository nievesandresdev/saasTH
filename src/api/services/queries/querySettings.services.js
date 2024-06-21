import { apiHttp } from '../../AxiosConfig'
import {
    querySettingsPath,
} from '../../config/apiRoute'

export const getAllApi = () => apiHttp('GET', `${querySettingsPath}/getAll`, [])

