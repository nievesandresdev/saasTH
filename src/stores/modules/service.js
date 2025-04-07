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
        availability: '',
        address: '',
        requeriment: '',
        subservices: [],
    }
    
    const form = reactive(JSON.parse(JSON.stringify(valueFormDefault)));
    const itemSelected = reactive(JSON.parse(JSON.stringify(valueFormDefault)));
    const formDefault = reactive(JSON.parse(JSON.stringify(valueFormDefault)));

    function calPrice (item) {
        let { from_price: fromPrice, price: price, name_api: nameApi, type_price: typePrice, fields_visibles: fieldsValues, type: typeService, subservices } = item;
        price = price ?? fromPrice;
        price = price ? parseFloat(price) : 0;
    
        if(nameApi == 'viator') {
            return `${price?.toFixed(2)}€`;
        }
    
        if (typePrice == 'Activities') {
            return `${price?.toFixed(2)}€`;
        }
    
        if (typeService == '2') {
            let minPrice = calMinPriceSubservices(subservices);
            if (minPrice == 0) {
                return 'GRATIS';
            }
            return `Desde ${minPrice?.toFixed(2)}€`;
        }
    
        if (!['1','2'].includes(typePrice) && !fieldsValues.includes('PRICE')) {
            return `${price?.toFixed(2)}€`;
        }
    
        if (fieldsValues.includes('PRICE')) {
            return "GRATIS";
        }
    
        return `${price?.toFixed(2)}€`;
    }
    
    function calMinPriceSubservices (subservices) {
        let minPrice = subservices.reduce((acc, item) => {
            if (item.price < acc) {
                return item.price;
            }
            return acc;
        }, 0);
        return minPrice;
    }

    return {
        form,
        itemSelected,
        formDefault,
        calPrice
    }

})