import { defineStore } from 'pinia'
import { ref } from 'vue'
import * as notifyUserServices from '@/api/services/users/notifyUser.services'


export const useNotifyUserStore = defineStore('notifyUser', () => {
    
    // STATE

    // const URL_STORAGE = process.env.VUE_APP_STORAGE_URL

    // ACTIONS
    async function $getNotificationsByUser () {
        let user = JSON.parse(localStorage.getItem('user'));
        const response = await notifyUserServices.getNotificationsByUserApi(user.id)
        const { ok } = response   
        console.log('response',response)
        if(ok){
            return response.data
        }
    }

    async function $vote (noticationId, face) {
        let user = JSON.parse(localStorage.getItem('user'));
        let data = {
            userId:user.id,
            noticationId,
            face
        };
        const response = await notifyUserServices.voteApi(data)
        const { ok } = response   
        if(ok){
            return response.data
        }
      }
    //
    return {
        $getNotificationsByUser,
        $vote
    }

})