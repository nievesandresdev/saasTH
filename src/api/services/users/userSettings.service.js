import { apiHttp } from '../../AxiosConfig'
import {
    userPath,
} from '../../config/apiRoute'

//work position
export const getWorkPosition = () => apiHttp('GET', `${userPath}/work-position`)
export const createWorkPosition = (data) => apiHttp('POST', `${userPath}/work-position`, data)
export const updateWorkPosition = (data) => apiHttp('POST', `${userPath}/work-position/update`, data)
export const deleteWPosition = (data) => apiHttp('POST', `${userPath}/work-position/delete`, data)

//users
export const getUsers = () => apiHttp('GET', `${userPath}/users`)
export const createUser = (data) => apiHttp('POST', `${userPath}/store`, data)

