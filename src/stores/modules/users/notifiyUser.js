import { defineStore } from 'pinia'
import { ref } from 'vue'
import * as notifyUserServices from '@/api/services/users/notifyUser.services'


export const useNotifyUserStore = defineStore('notifyUser', () => {
    
    // STATE

    // const URL_STORAGE = process.env.VUE_APP_STORAGE_URL

    // ACTIONS
    async function $getNotificationsByUser () {
      let user = JSON.parse(sessionStorage.getItem('user'));
        const response = await notifyUserServices.getNotificationsByUserApi(user.id)
        console.log('response',response)
        const { ok } = response   
        if(ok){
            return response.data
        }
    }
    //
    return {
        $getNotificationsByUser
    }

})