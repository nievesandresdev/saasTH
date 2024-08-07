// stores/auth.js (o login.js)
import { defineStore } from 'pinia';
import { login as loginService, logout as LogoutService } from '@/api/services/auth';
import { getUserData } from '@/api/services/users/userSettings.service';
import { deleteSessionByHotelAndEmailApi } from '@/api/services/stay/stay.services'
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
                errorLogin.value = 'Credenciales incorrectas';
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
        let userEmail = user.value.email;
        console.log('logout',userEmail)
        await deleteSessionByHotelAndEmailApi({ userEmail });
        const response = await LogoutService();

        if (response.ok) {
            token.value = '';
            user.value = null;
            
            this.$router.push('/login');

            sessionStorage.removeItem('token');
            sessionStorage.removeItem('user');
            sessionStorage.removeItem('current_hotel');
            sessionStorage.removeItem('current_subdomain');
        }
    }

    const fullName = computed(() => {
        return `${user?.value?.name} ${user?.value?.lastname}`;
    });

    const $currentHotelName = computed(() => {
        return current_hotel?.value?.name;
    })

    

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
        loginAdmin
    };
});
