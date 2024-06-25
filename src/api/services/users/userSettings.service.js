import { apiHttp } from '../../AxiosConfig'

//work position
export const getWorkPosition = () => apiHttp('GET', 'users/work-position')

