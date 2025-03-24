import { defineStore } from 'pinia'
import { reactive } from 'vue'

import { useHotelStore } from '@/stores/modules/hotel';

import { ServiceTypeEnum } from "@/shared/enums/ServiceTypeEnum";

export const useServiceStore = defineStore('service', () => {

    // DATA
    const valueFormDefault = {
        id: null,
        name: '',
        description: '',
        hire: '',
        link_url: '',
        type_price: 1,
        price: null,
        images: [],
        type: ServiceTypeEnum.UNICO,
        languages: [],
        fields_visibles: [],
        duration: null,
        address: '',
        requeriment: '',
        subservices: [],
    }
    
    const form = reactive(JSON.parse(JSON.stringify(valueFormDefault)));
    const itemSelected = reactive(JSON.parse(JSON.stringify(valueFormDefault)));
    const formDefault = reactive(JSON.parse(JSON.stringify(valueFormDefault)));

    return {
        form,
        itemSelected,
        formDefault,
    }

})