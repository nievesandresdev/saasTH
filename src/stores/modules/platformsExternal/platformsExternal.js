import { defineStore } from 'pinia';
import { dataOTAS,updateBulkOTASApi,getAllDataByOtas } from '@/api/services/platforms/platformsServices';

export const platformsExternalStore = defineStore('platformsExternal', () => {


  /**
   * 
   * dataOTAS
   */
  async function $getDataOTAS(params){
    const response = await dataOTAS(params);
    return response;
  }

  async function $getAllDataByOtas(params){
    const response = await getAllDataByOtas(params);
    return response;
  }
  
  async function $bulkUpdateOTAS(data) {
    const response = await updateBulkOTASApi(data);
    return response;
  }


  return {
    $getDataOTAS,
    $bulkUpdateOTAS,
    $getAllDataByOtas,
  };

});
