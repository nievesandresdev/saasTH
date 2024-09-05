import { apiHttp } from '../../AxiosConfig'
import {
    userPath,
} from '../../config/apiRoute'

//work position
export const getWorkPosition = () => apiHttp('GET', `${userPath}/work-position`,[], { showPreloader: false })
export const createWorkPosition = (data) => apiHttp('POST', `${userPath}/work-position`, data)
export const updateWorkPosition = (data) => apiHttp('POST', `${userPath}/work-position/update`, data)
export const deleteWPosition = (data) => apiHttp('POST', `${userPath}/work-position/delete`, data)

//users
//getUserData
export const getUserData = (params) => apiHttp('GET', `${userPath}/getUserData`,params)
export const getUsers = (params) => apiHttp('GET', `${userPath}/getUsers`,params , { showPreloader: false })
export const getUser = () => apiHttp('GET', `${userPath}/getUser`)
export const createUser = (data) => apiHttp('POST', `${userPath}/store`, data)
export const updateUser = (data) => apiHttp('POST', `${userPath}/update`, data)
export const updateProfile = (data) => apiHttp('POST', `${userPath}/update-profile`, data)
export const deleteUser = (data) => apiHttp('POST', `${userPath}/delete`, data)
export const enableUser = (data) => apiHttp('POST', `${userPath}/enabled`, data)
export const disableUser = (data) => apiHttp('POST', `${userPath}/disabled`, data)
export const getSubscriptionStatus = () => apiHttp('GET', `${userPath}/get-subscription-status`)


//testMail
export const testMail = () => apiHttp('GET', `${userPath}/testMail`)

