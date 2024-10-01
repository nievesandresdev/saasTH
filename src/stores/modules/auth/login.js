// stores/auth.js (o login.js)
import { defineStore } from 'pinia';
import { login as loginService, logout as LogoutService } from '@/api/services/auth';
import { getUserData } from '@/api/services/users/userSettings.service';
import { deleteSessionByHotelAndEmailApi } from '@/api/services/stay/staySession.services'
import { computed, ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
    const user = ref(JSON.parse(sessionStorage.getItem('user')) || null);
    const token = ref(sessionStorage.getItem('token') || '');
    const current_hotel = ref(JSON.parse(sessionStorage.getItem('current_hotel')) || '');
    const current_subdomain = ref(sessionStorage.getItem('current_subdomain') || '');
    const errorLogin = ref(null);
    const loading = ref(false);

    async function login(credentials) {
        loading.value = true;
        errorLogin.value = null;

        try {
            const response = await loginService(credentials);

            if (response.ok) {
                token.value = response.data.token;
                user.value = response.data.user;
                errorLogin.value = null;

                // Set session token and user data
                sessionStorage.setItem('token', token.value);
                sessionStorage.setItem('user', JSON.stringify(user.value));
                sessionStorage.setItem('current_hotel', JSON.stringify(response.data.user.current_hotel));
                sessionStorage.setItem('current_subdomain', response.data.user.current_hotel.subdomain);
                this.$router.push('/dashboard');
            } else {
                errorLogin.value = response.data.motives.message;
                console.log('errorLogin', response.data);
            }

        } catch (error) {
            errorLogin.value = error.response?.data?.message || 'Ha ocurrido un error';
        } finally {
            loading.value = false;
        }
    }

    async function loginAdmin(token) {
        loading.value = true;
        errorLogin.value = null;

        try {
            
            const response = await getUserData(token);

                //token.value = response.token;
                user.value = response.user;

                //console('storeAjhsihj',user.value)
                errorLogin.value = null;

                // Set session token and user data
                //sessionStorage.setItem('token', token.value);
                sessionStorage.setItem('user', JSON.stringify(user.value));
                sessionStorage.setItem('current_hotel', JSON.stringify(response.user.current_hotel));
                sessionStorage.setItem('current_subdomain', response.user.current_hotel.subdomain);
                this.$router.push('/dashboard');
           

        } catch (error) {
            errorLogin.value = error.response?.data?.message || 'Ha ocurrido un error';
        } finally {
            loading.value = false;
        }
    }

    function $setUser(data) {
        user.value = data;
        sessionStorage.setItem('user', JSON.stringify(data));
    }

    async function logout() {
        try {
            const userEmail = user.value.email;
            await deleteSessionByHotelAndEmailApi({ userEmail });
            await LogoutService();
        } catch (error) {
            console.error('Error during logout:', error);
        } finally {
            token.value = '';
            user.value = null;
    
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('user');
            sessionStorage.removeItem('current_hotel');
            sessionStorage.removeItem('current_subdomain');
            sessionStorage.removeItem('redirectTo');
    
            // No redirigimos aquí, el middleware se encargará de ello
        }
    }
    

    const fullName = computed(() => {
        return `${user?.value?.name} ${user?.value?.lastname}`;
    });

    const $currentHotelName = computed(() => {
        return current_hotel?.value?.name;
    })


    //computed format  user.value.permissions
    const $getPermissions = computed(() => {
        //return json parse
        return JSON.parse(user.value.permissions);
    });

    

    return {
        user,
        token,
        errorLogin,
        loading,
        login,
        logout,
        current_hotel,
        current_subdomain,
        $setUser,
        fullName,
        $currentHotelName,
        loginAdmin,
        $getPermissions
    };
});
