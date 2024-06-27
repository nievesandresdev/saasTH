import { defineStore } from 'pinia';
import { login as loginService,logout as LogoutService } from '@/api/services/auth';
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {

    const user = ref(JSON.parse(sessionStorage.getItem('user')) || null);
    const token = ref(sessionStorage.getItem('token') || '');
    const current_hotel = ref(sessionStorage.getItem('current_hotel') || '');
    const current_subdomain = ref(sessionStorage.getItem('current_subdomain') || '')
    const errorLogin = ref(null);
    const loading = ref(false);


    async function login(credentials) {
        this.loading = true;
        this.errorLogin = null;
  
        try {
          const response = await loginService(credentials);
          
          if (response.ok) {
            this.token = response.data.token;
            this.user = response.data.user;
            this.errorLogin = null;

            //set session token and user data
            sessionStorage.setItem('token', this.token);
            sessionStorage.setItem('user', JSON.stringify(this.user));
            //current_hotel
            sessionStorage.setItem('current_hotel',JSON.stringify(response.data.user.current_hotel));
            //current_subdomain
            sessionStorage.setItem('current_subdomain',response.data.user.curent_subdmain_hotel);
            this.$router.push('/dashboard')

          } else {
            this.errorLogin = 'Credenciales incorrectas';
          }

        } catch (error) {
          this.errorLogin = error.response?.data?.message || 'Ha ocurrido un error';
        } finally {
          this.loading = false;
        }
      }

    async function logout() {
      const response = await LogoutService();

      if (response.ok) {
        this.token = '';
        this.user = null;
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('current_hotel');
        sessionStorage.removeItem('current_subdomain');
        this.$router.push('/login')
      }
    }

    return {
        user,
        token,
        errorLogin,
        loading,
        login,
        logout,
        current_hotel,
        current_subdomain
    };
  
});
