import { defineStore } from 'pinia';
import { dataOTAS,updateBulkOTASApi,getAllDataByOtas,findByParamsOta } from '@/api/services/platforms/platforms.service';

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

  async function $findByParamsOta(params){
    const response = await findByParamsOta(params);
    return response;
  }



  return {
    $getDataOTAS,
    $bulkUpdateOTAS,
    $getAllDataByOtas,
    $findByParamsOta,
  };

});
