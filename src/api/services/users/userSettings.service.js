import { apiHttp } from '../../AxiosConfig'
import {
    userPath,
} from '../../config/apiRoute'

//work position
export const getWorkPosition = () => apiHttp('GET', `${userPath}/work-position`,[], { showPreloader: false })
export const createWorkPosition = (data) => apiHttp('POST', `${userPath}/work-position`, data, { showPreloader: true }, 'API_GENERAL', false, true)
export const updateWorkPosition = (data) => apiHttp('POST', `${userPath}/work-position/update`, data, { showPreloader: true }, 'API_GENERAL', false, true)
export const deleteWPosition = (data) => apiHttp('POST', `${userPath}/work-position/delete`, data, { showPreloader: true }, 'API_GENERAL', false, true)

//getTrial
export const getTrial = () => apiHttp('GET', `${userPath}/getTrial`,[], { showPreloader: false })
//getStatusSubscription
export const getStatusSubscription = () => apiHttp('GET', `${userPath}/getStatusSubscription`,[], { showPreloader: false })

//users
//getUserData
export const getUserData = (params) => apiHttp('GET', `${userPath}/getUserData`,params)
export const getUsers = (params) => apiHttp('GET', `${userPath}/getUsers`,params , { showPreloader: false })
export const getUser = (params) => apiHttp('GET', `${userPath}/getUser/${params}`)
export const createUser = (data) => apiHttp('POST', `${userPath}/store`, data, { showPreloader: true }, 'API_GENERAL', false, true)
export const updateUser = (data) => apiHttp('POST', `${userPath}/update`, data, { showPreloader: true }, 'API_GENERAL', false, true)
export const updateProfile = (data) => apiHttp('POST', `${userPath}/update-profile`, data, { showPreloader: true }, 'API_GENERAL', false, true)
export const deleteUser = (data) => apiHttp('POST', `${userPath}/delete`, data, { showPreloader: true }, 'API_GENERAL', false, true)
export const enableUser = (data) => apiHttp('POST', `${userPath}/enabled`, data, { showPreloader: true }, 'API_GENERAL', false, true)
export const disableUser = (data) => apiHttp('POST', `${userPath}/disabled`, data, { showPreloader: true }, 'API_GENERAL', false, true)
export const getSubscriptionStatus = () => apiHttp('GET', `${userPath}/get-subscription-status`)

//verifyExistMail
export const verifyExistMail = (data) => apiHttp('POST', `${userPath}/verifyExistMail`, data,{ showPreloader: true }, 'API_GENERAL', false, true)




//testMail
export const testMail = () => apiHttp('GET', `${userPath}/testMail`)

