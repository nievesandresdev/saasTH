import { defineStore } from 'pinia'
import { ref } from 'vue'

import {
    getSessionsApi,
    createSessionApi,
    deleteSessionApi,
    getDefaultGuestIdAndSessionsApi
} from '@/api/services/stay/staySession.services'

export const useStaySessionsStore = defineStore('staySessions', () => {
    
    // STATE
    const URL_BASE_BACKEND_GENERAL = process.env.VUE_APP_API_URL_BACKEND_GENERAL

    // ACTION
    async function $createSession (stayId, field) {
        let data = $getUserDataSession(stayId);
        const response = await createSessionApi(data)
        const { ok } = response   
        if(ok){
            return response.data
        }
    }

    function $getUserDataSession (stayId) {
        //data para crear o actualizar sesion
        let user = JSON.parse(sessionStorage.getItem('user'));
        let userEmail = user.email;
        let userName = user.name;
        let userColor = user.color;
        let data = { stayId, userEmail, userName, userColor };
        return data;
    }

    async function $deleteSession (stayId, field, userEmail) {
        let data = { stayId, field, userEmail };
        const response = await deleteSessionApi(data)
        const { ok } = response   
        if(ok){
            return response.data
        }
    }

    async function $deleteSessionWithApiKey (stayId, userEmail) {
        // Crea una URL con parámetros de consulta
        let endpoint = `${URL_BASE_BACKEND_GENERAL}/stay/hoster/deleteSessionWithApiKey?`;
        endpoint += `stayId=${encodeURIComponent(stayId)}`;
        endpoint += `&userEmail=${encodeURIComponent(userEmail)}`;
        endpoint += `&field=sessions`;
        endpoint += `&xKeyApi=${encodeURIComponent(process.env.VUE_APP_X_KEY_API)}`;
        // Llama a navigator.sendBeacon con la URL
        navigator.sendBeacon(endpoint);
    }
    
    async function $getSessions (stayId) {
        let data = { stayId };
        const response = await getSessionsApi(data)
        const { ok } = response   
        if(ok){
            return response.data
        }
    }

    async function $getDefaultGuestIdAndSessions (stayId) {
        const response = await getDefaultGuestIdAndSessionsApi(stayId)
        const { ok } = response   
        if(ok){
            return response.data
        }
    }

    return {
        $getDefaultGuestIdAndSessions,
        $getSessions,
        $createSession,
        $deleteSession,
        $deleteSessionWithApiKey,
        $getUserDataSession
    }

})