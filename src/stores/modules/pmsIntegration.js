import { defineStore } from 'pinia'
import * as pmsIntegrationServices from '@/api/services/pms.service'

export const usePmsIntegrationStore = defineStore('pmsIntegration', () => {


    async function $getIntegrationPms() {
        const response = await pmsIntegrationServices.getIntegrationPmsApi();
        return response;
    }

    async function $updateOrCreateCredentialsPms(data) {
        const response = await pmsIntegrationServices.updateOrCreateCredentialsPmsApi(data);
        return response;
    }

    async function $deleteCredentialsPms(data) {
        const response = await pmsIntegrationServices.deleteCredentialsPmsApi(data);
        return response;
    }

    async function $getPmsWithFilters(params) {
        const response = await pmsIntegrationServices.getPmswithFiltersApi(params);
        return response;
    }


    return {
        $getIntegrationPms,
        $updateOrCreateCredentialsPms,
        $deleteCredentialsPms,
        $getPmsWithFilters
    }
})