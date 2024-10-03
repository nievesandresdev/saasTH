import { defineStore } from 'pinia';
import { login as loginService, logout as LogoutService } from '@/api/services/auth';
import { getUserData } from '@/api/services/users/userSettings.service';
import { deleteSessionByHotelAndEmailApi } from '@/api/services/stay/staySession.services';
import { computed, ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
    const MAX_INACTIVITY_TIME = 5 * 24 * 60 * 60 * 1000; // 5 días en milisegundos
    const user = ref(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : []);

    const token = ref(localStorage.getItem('token') || '');
    const current_hotel = ref(JSON.parse(localStorage.getItem('current_hotel')) || '');
    const current_subdomain = ref(localStorage.getItem('current_subdomain') || '');
    const errorLogin = ref(null);
    const loading = ref(false);

    // Función para verificar si la sesión ha expirado
    function checkSessionExpiration() {
        const currentTime = new Date().getTime();
        const loginTime = localStorage.getItem('loginTime');

        if (loginTime && (currentTime - loginTime > MAX_INACTIVITY_TIME)) {
            // Si ha pasado más de 5 días, se invalida la sesión
            alert('La sesión ha expirado');
            logout();
            return false;
        } else {
            // Si no ha expirado, actualizamos el tiempo de actividad
            localStorage.setItem('loginTime', currentTime);
            return true;
        }
    }

    // Función para iniciar sesión
    async function login(credentials) {
        loading.value = true;
        errorLogin.value = null;

        try {
            const response = await loginService(credentials);

            if (response.ok) {
                token.value = response.data.token;
                user.value = response.data.user;
                errorLogin.value = null;

                // Guardamos la sesión en localStorage y el tiempo de inicio
                const currentTime = new Date().getTime();
                localStorage.setItem('token', token.value);
                localStorage.setItem('user', JSON.stringify(user.value));
                localStorage.setItem('current_hotel', JSON.stringify(response.data.user.current_hotel));
                localStorage.setItem('current_subdomain', response.data.user.current_hotel.subdomain);
                localStorage.setItem('loginTime', currentTime); // Guardamos la hora actual

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

    // Función para iniciar sesión como administrador
    async function loginAdmin(token) {
        //console.log('tokenAdmin', token);
        loading.value = true;
        errorLogin.value = null;
        

        try {
            const response = await getUserData(token);
            user.value = response.user;
            errorLogin.value = null;


            // Guardamos la sesión en localStorage y el tiempo de inicio
            const currentTime = new Date().getTime();
            localStorage.setItem('user', JSON.stringify(response.user));
            //token
            //localStorage.setItem('token', token);
            localStorage.setItem('current_hotel', JSON.stringify(response.user.current_hotel));
            localStorage.setItem('current_subdomain', response.user.current_hotel.subdomain);
            localStorage.setItem('loginTime', currentTime); // Guardamos la hora actual

            this.$router.push('/dashboard');
        } catch (error) {
            errorLogin.value = error.response?.data?.message || 'Ha ocurrido un error';
        } finally {
            loading.value = false;
        }
    }

    // Función para establecer el usuario
    function $setUser(data) {
        user.value = data;
        localStorage.setItem('user', JSON.stringify(data));
    }

    // Función para cerrar sesión
    async function logout() {
        try {
            const userEmail = user.value?.email;
            if (userEmail) {
                await deleteSessionByHotelAndEmailApi({ userEmail });
            }
            await LogoutService();
        } catch (error) {
            console.error('Error during logout:', error);
        } finally {
            token.value = '';
            user.value = null;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('current_hotel');
            localStorage.removeItem('current_subdomain');
            localStorage.removeItem('loginTime');
            localStorage.removeItem('redirectTo');
        }
    }

    // Computed para el nombre completo del usuario
    const fullName = computed(() => {
        return user.value ? `${user.value.name} ${user.value.lastname}` : '';
    });

    // Computed para el nombre del hotel actual
    const $currentHotelName = computed(() => {
        return current_hotel.value ? current_hotel.value.name : '';
    });

    // Computed para obtener los permisos del usuario
    const $getPermissions = computed(() => {
        if (user.value && user.value.permissions) {
            return JSON.parse(user.value.permissions);
        }
        return [];
    });

    const $getCodeHotel = computed(() => {
        if (current_hotel.value && current_hotel.value.code) {
            return current_hotel.value.code;
        }
        return '';
    });

    // Verificamos la expiración de la sesión al iniciar
    if (!checkSessionExpiration()) {
        logout(); // Si ha expirado, cerramos sesión
    }

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
        $getPermissions,
        $getCodeHotel
    };
});
