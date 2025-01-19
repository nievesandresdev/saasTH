import { defineStore } from 'pinia'
import { ref } from 'vue'
import * as rewardsServices from '@/api/services/rewards/rewards.services'


export const useRewardStore = defineStore('rewards', () => {
    
    async function $getAllRewards () {
        const response = await rewardsServices.getRewardsApi()
        return response;
    }

    async function $storeRewards (data) {
        const response = await rewardsServices.storeRewardsApi(data)
        return response;
    }


    return {
        $getAllRewards,
        $storeRewards
    }

})