import { defineStore } from 'pinia';
import { useAuthStore } from '@/stores/modules/auth/login';
import { createUser } from '@/api/services/users/userSettings.service';
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

  /**
   * 
   * guardar usuario
   */
  async function $storeUser(data) {

    const response = await createUser(data);
    const { ok } = response;
    return ok;
  }


  return {
    $getHotels,
    $storeUser
  };
});
