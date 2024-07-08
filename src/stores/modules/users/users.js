import { defineStore } from 'pinia';
import { useAuthStore } from '@/stores/modules/auth/login';
import { createUser,getUsers,updateUser,updateProfile,getUser,deleteUser,getSubscriptionStatus } from '@/api/services/users/userSettings.service';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const authStore = useAuthStore();
  const user = ref(authStore.user);

  /**
   * hoteles del usuario con atributos especificos 
  **/
  function $getHotels(attributes = []) {
    if (!user.value || !user.value.hotels) {
      return [];
    }

    // si no hay atributos trae todos
    if (attributes.length === 0) {
      return user.value.hotels;
    }

    return user.value.hotels.map(hotel => {
      let selectedAttributes = {};
      attributes.forEach(attr => {
        if (hotel.hasOwnProperty(attr)) {
          selectedAttributes[attr] = hotel[attr];
        }
      });
      return selectedAttributes;
    });
  }

  function $getDataHotel(attributes = []) {
    if (attributes.length === 0) {
        return user.value.current_hotel;
    }

    return attributes.reduce((result, attr) => {
        if (user.value.current_hotel.hasOwnProperty(attr)) {
            result[attr] = user.value.current_hotel[attr];
        }
        return result;
    }, {});
}

  /*
  *avatar ui
  */
 function $userAvatar(){
   return `https://ui-avatars.com/api/?name=${user.value.name}&color=fff&background=${user.value.color}`
 }

  /**
    * guardar usuario
   */
  async function $storeUser(data) {
    const response = await createUser(data);
    return response;
  }

  /**
    * actualizar usuario
   */
  async function $updateUser(data) {
    const response = await updateUser(data);
    return response;
  }
  
  /**
    * get usuarios
  */
  async function $getUsers(data){
    const response = await getUsers(data);
    return response;
  }

  /**
   * get user data with id
   */
  async function $getUser(){
    const response = await getUser();
    return response;
  }

  /**
   * /update-profile
   */
  async function $updateProfile(data){
    const response = await updateProfile(data);
    return response;
  }

  /**
   * eliminar
   */
  async function $deleteUser(data){
    const response = await deleteUser(data);
    return response;
  }

  /**
   * get status subscription
   */
  async function $getSubscriptionStatus() {
    const response = await getSubscriptionStatus();
    return response;
  }


  return {
    $getHotels,
    $storeUser,
    $getUsers,
    $updateUser,
    $updateProfile,
    $userAvatar,
    $getUser,
    $deleteUser,
    $getDataHotel,
    $getSubscriptionStatus
  };
});
