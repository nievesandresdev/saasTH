import { defineStore } from 'pinia'
import { ref } from 'vue'
import * as rewardsServices from '@/api/services/rewards/rewards.services'


export const useRewardStore = defineStore('rewards', () => {
    
    async function $getAllRewards () {
        const response = await rewardsServices.getRewardsApi()
        return response;
    }


    return {
        $getAllRewards,
    }

})