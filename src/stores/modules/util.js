import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

import * as utilService from '@/api/services/util.service';


export const useUtilStore = defineStore('util', () => {

    // FUNCTIONS

    async function $getLanguages () {
        let params ={ isWebapp: 0 }
        const response = await utilService.getLanguagesApi(params);
        return response;
    }

    async function $getPhoneCodesApi () {
        return utilService.getPhoneCodesApi();
        // console.log('test getPhoneCodesApi',response)
        // return response;
    }
    //
    return {
        $getLanguages,
        $getPhoneCodesApi
    }

})