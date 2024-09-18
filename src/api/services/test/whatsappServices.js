import { apiHttp } from '../../AxiosConfig'

// Importa la variable de entorno
//const wabaId = import.meta.env.VITE_WABA_ID;

export const getDataWB = () => apiHttp('GET', `api/v1/waba/317194641480294/init`);
