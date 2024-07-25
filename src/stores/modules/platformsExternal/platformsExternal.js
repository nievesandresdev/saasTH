import { defineStore } from 'pinia';
import { dataOTAS,updateBulkOTASApi } from '@/api/services/platforms/platformsServices';

export const platformsExternalStore = defineStore('platformsExternal', () => {


  /**
   * 
   * dataOTAS
   */
  async function $getDataOTAS(params){
    const response = await dataOTAS(params);
    return response;
  }
  
  async function $bulkUpdateOTAS(data) {
    const response = await updateBulkOTASApi(data);
    return response;
  }


  return {
    $getDataOTAS,
    $bulkUpdateOTAS,
  };

});
