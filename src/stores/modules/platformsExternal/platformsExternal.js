import { defineStore } from 'pinia';
import { dataOTAS,updateBulkOTASApi } from '@/api/services/platforms/platformsServices';

export const platformsExternalStore = defineStore('platformsExternal', () => {


  /**
   * 
   * dataOTAS
   */
  async function $getDataOTAS(){
    const response = await dataOTAS();
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
