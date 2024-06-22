import { defineStore } from 'pinia';
import { login as loginService } from '@/api/services/auth';
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {

    const user = ref(JSON.parse(sessionStorage.getItem('user')) || null);
    const token = ref(sessionStorage.getItem('token') || '');
    const errorLogin = ref(null);
    const loading = ref(false);


    async function login(credentials) {
        this.loading = true;
        this.errorLogin = null;

  
        try {
          const response = await loginService(credentials);
          
          if (response.ok) {
            console.log('ssdsfsfsResponde',response.ok);
            this.token = response.data.token;
            this.user = response.data.user;
            this.errorLogin = null;
            sessionStorage.setItem('token', this.token);
            sessionStorage.setItem('user', JSON.stringify(this.user));
            this.$router.push('/dashboard')
          } else {
            this.errorLogin = 'Credenciales incorrectas';
          }

          console.log('credentials445',this.errorLogin);
        } catch (error) {
          this.errorLogin = error.response?.data?.message || 'Ha ocurrido un error';
        } finally {
          this.loading = false;
        }
      }

    function logout() {
        user.value = null;
        token.value = '';
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        this.$router.push('/login')
    }

    return {
        user,
        token,
        errorLogin,
        loading,
        login,
        logout,
    };
  
});
