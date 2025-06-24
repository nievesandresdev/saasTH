<template>
    <div class="px-6 flex-grow min-h-screen">
        <!-- <HeaderIntegrations /> -->
        <TabsIntegration />
        <div class="grid grid-cols-3 3xl:grid-cols-4 gap-4">
            <div @click="openModalIntegrations('booking')" class="rounded-[10px] border border-[#E9E9E9] bg-white p-4 hover:shadow-[0px_3.5px_7px_0px_rgba(0,0,0,0.15)] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.15)] cursor-pointer">
                <div class="flex items-center gap-2">
                    <img src="/assets/icons/otas/Booking.svg" class="w-8 h-8">
                    <span class="text-[#333333] text-base font-medium">Booking</span>
                </div>
                <div class="flex items-center gap-2 mt-2">
                    <img :src="dataOTAS?.otas?.find(ota => ota.ota === 'BOOKING')?.url ? '/assets/icons/TH.CHECK.svg' : '/assets/icons/1.TH.WARNING.svg'" class="w-[16px] h-[16px]">
                    <span class="text-[#333333] text-[12px] font-medium truncate">
                        {{ dataOTAS?.otas?.find(ota => ota.ota === 'BOOKING')?.url || 'Sin URL' }}
                    </span>
                </div>
                <div class="flex items-center gap-2 mt-2" v-if="!dataOTAS?.otas?.find(ota => ota.ota === 'BOOKING')?.withCredentials">
                    <img src="/assets/icons/1.TH.WARNING.svg" class="w-[16px] h-[16px]">
                    <span class="text-[#333333] text-[12px] font-medium">Sin credenciales</span>
                </div>
                <div class="flex items-center gap-2 mt-2" v-else>
                    <img src="/assets/icons/TH.CHECK.svg" class="w-[16px] h-[16px]">
                    <span class="text-[#333333] text-[12px] font-medium">Credenciales actualizadas</span>
                </div>

            </div>

            <div @click="openModalIntegrations('tripadvisor')" class="rounded-[10px] border border-[#E9E9E9] bg-white p-4 shadow-[0px_2px_4px_0px_rgba(0,0,0,0.15)] hover:shadow-[0px_3.5px_7px_0px_rgba(0,0,0,0.15)] cursor-pointer">
                <div class="flex items-center gap-2">
                    <img src="/assets/icons/otas/Tripadvisor.svg" class="w-8 h-8">
                    <span class="text-[#333333] text-base font-medium">TripAdvisor</span>
                </div>
                <div class="flex items-center gap-2 mt-2">
                    <img :src="dataOTAS?.otas?.find(ota => ota.ota === 'TRIPADVISOR')?.url ? '/assets/icons/TH.CHECK.svg' : '/assets/icons/1.TH.WARNING.svg'" class="w-[16px] h-[16px]">
                    <span class="text-[#333333] text-[12px] font-medium truncate">
                        {{ dataOTAS?.otas?.find(ota => ota.ota === 'TRIPADVISOR')?.url || 'Sin URL' }}
                    </span>
                </div>
                <div class="flex items-center gap-2 mt-2" >
                    <img src="/assets/icons/TH.CHECK.svg" class="w-[16px] h-[16px]">
                    <span class="text-[#333333] text-[12px] font-medium">No requiere credenciales</span>
                </div>
            </div>

            <div @click="openModalIntegrations('expedia')" class="rounded-[10px] border border-[#E9E9E9] bg-white p-4 shadow-[0px_2px_4px_0px_rgba(0,0,0,0.15)] hover:shadow-[0px_3.5px_7px_0px_rgba(0,0,0,0.15)] cursor-pointer">
                <div class="flex items-center gap-2">
                    <img src="/assets/icons/otas/Expedia.svg" class="w-8 h-8">
                    <span class="text-[#333333] text-base font-medium">Expedia</span>
                </div>
                <div class="flex items-center gap-2 mt-2">
                    <img :src="dataOTAS?.otas?.find(ota => ota.ota === 'EXPEDIA')?.url ? '/assets/icons/TH.CHECK.svg' : '/assets/icons/1.TH.WARNING.svg'" class="w-[16px] h-[16px]">
                    <span class="text-[#333333] text-[12px] font-medium truncate">
                        {{ dataOTAS?.otas?.find(ota => ota.ota === 'EXPEDIA')?.url || 'Sin URL' }}
                    </span>
                </div>
                <div class="flex items-center gap-2 mt-2" v-if="!dataOTAS?.otas?.find(ota => ota.ota === 'EXPEDIA')?.withCredentials">
                    <img src="/assets/icons/1.TH.WARNING.svg" class="w-[16px] h-[16px]">
                    <span class="text-[#333333] text-[12px] font-medium">Sin credenciales</span>
                </div>
                <div class="flex items-center gap-2 mt-2" v-else>
                    <img src="/assets/icons/TH.CHECK.svg" class="w-[16px] h-[16px]">
                    <span class="text-[#333333] text-[12px] font-medium">Credenciales actualizadas</span>
                </div>
            </div>

            <div @click="openModalIntegrations('google')" class="rounded-[10px] border border-[#E9E9E9] bg-white p-4 shadow-[0px_2px_4px_0px_rgba(0,0,0,0.15)] hover:shadow-[0px_3.5px_7px_0px_rgba(0,0,0,0.15)] cursor-pointer">
                <div class="flex items-center gap-2">
                    <img src="/assets/icons/otas/Google.svg" class="w-8 h-8">
                    <span class="text-[#333333] text-base font-medium">Google</span>
                </div>
                <div class="flex items-center gap-2 mt-2">
                    <img :src="dataOTAS?.otas?.find(ota => ota.ota === 'GOOGLE')?.url ? '/assets/icons/TH.CHECK.svg' : '/assets/icons/1.TH.WARNING.svg'" class="w-[16px] h-[16px]">
                    <span class="text-[#333333] text-[12px] font-medium truncate">
                        {{ dataOTAS?.otas?.find(ota => ota.ota === 'GOOGLE')?.url || 'Sin URL' }}
                    </span>
                </div>
                <div class="flex items-center gap-2 mt-2">
                    <img src="/assets/icons/TH.CHECK.svg" class="w-[16px] h-[16px]">
                    <span class="text-[#333333] text-[12px] font-medium">No requiere credenciales</span>
                </div>
            </div>

            <div @click="openModalIntegrations('airbnb')" class="rounded-[10px] border border-[#E9E9E9] bg-white p-4 shadow-[0px_2px_4px_0px_rgba(0,0,0,0.15)] hover:shadow-[0px_3.5px_7px_0px_rgba(0,0,0,0.15)] cursor-pointer">
                <div class="flex items-center gap-2">
                    <img src="/assets/icons/otas/Airbnb.svg" class="w-8 h-8">
                    <span class="text-[#333333] text-base font-medium">Airbnb</span>
                </div>
                <div class="flex items-center gap-2 mt-2">
                    <img :src="dataOTAS?.otas?.find(ota => ota.ota === 'AIRBNB')?.url ? '/assets/icons/TH.CHECK.svg' : '/assets/icons/1.TH.WARNING.svg'" class="w-[16px] h-[16px]">
                    <span class="text-[#333333] text-[12px] font-medium truncate" v-if="airbnbUrls.length <= 1">
                        {{ dataOTAS?.otas?.find(ota => ota.ota === 'AIRBNB')?.url || 'Sin URL' }}
                    </span>
                    <span class="text-[#333333] text-[12px] font-medium truncate" v-else>
                        {{ airbnbUrls.length }} URL Actualizadas
                    </span>
                </div>
                <div class="flex items-center gap-2 mt-2" v-if="!dataOTAS?.otas?.find(ota => ota.ota === 'AIRBNB')?.withCredentials">
                    <img src="/assets/icons/1.TH.WARNING.svg" class="w-[16px] h-[16px]">
                    <span class="text-[#333333] text-[12px] font-medium">Sin credenciales</span>
                </div>
                <div class="flex items-center gap-2 mt-2" v-else>
                    <img src="/assets/icons/TH.CHECK.svg" class="w-[16px] h-[16px]">
                    <span class="text-[#333333] text-[12px] font-medium">Credenciales actualizadas</span>
                </div>
            </div>
        </div>
    </div>

    <ModalWindow v-if="open" :isVisible="open"  :width="'480px'" padding-content="p-0" footer="true" @close="closeModalIntegration" >
        <template #content>
            <div class="flex justify-between p-4">
                <span class="text-[18px] font-medium">
                    Configura la integración con {{ selectedOtaCapitalize }}
                </span>
                <button @click="closeModalIntegration" class="cursor-pointer hover:bg-gray-100 rounded-full p-1">
                    <img src="/assets/icons/1.TH.CLOSE.svg" alt="1.TH.CLOSE" class="h-6 w-6">
                </button>
            </div>
            <hr>
            <div class="px-4 pt-4">
                <div v-if="loading" class="flex flex-col gap-2 mb-4">
                    <div class="animate-pulse">
                        <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div class="h-10 bg-gray-200 rounded"></div>
                    </div>
                </div>
                <template v-else>
                    <div class="flex flex-col gap-2 mb-4">
                        <LabelIntegrations :label="'URL de ' + selectedOtaCapitalize" :tooltip="tooltips.url" :tooltip-top="'-208'" :tooltip-left="'-140'" :disabled-tooltip="!disabledInput.url" />
                        <BaseTextField 
                            v-model="form.url" 
                            :placeholder="placeholderUrl"
                            :error="errors.url"
                            :disabled="disabledInput.url"
                        />
                        <div v-if="errors.url" class="flex items-center text-red-500 text-[12px] font-semibold mt-1">
                            <img src="/assets/icons/1.TH.WARNING-RED.svg" class="w-4 h-4 mr-2" alt="Warning">
                            <p class="text-red-500">{{ errorMessage.url }}</p>
                        </div>
                    </div>
                    <div v-if="(serviceSelected === 'expedia' || serviceSelected === 'booking') && (!credentialsOta || credentialsOta.email == '' || credentialsOta.email == null || credentialsOta.password == '' || credentialsOta.password == null)" class="flex flex-col gap-2 mb-4">
                        <LabelIntegrations :label="'Tu dirección de correo de ' + selectedOtaCapitalize" :tooltip="tooltips.email" :tooltip-top="'-166'" :tooltip-left="'-265'" size-tooltip="s" />
                        <BaseTextField v-model="form.email" placeholder="correo@tu-hotel.com" />
                    </div>
                    <div v-if="(serviceSelected === 'expedia' || serviceSelected === 'booking') && (!credentialsOta || credentialsOta.email == '' || credentialsOta.email == null || credentialsOta.password == '' || credentialsOta.password == null)" class="flex flex-col gap-2 mb-4">
                        <LabelIntegrations :label="'Tu contraseña de ' + selectedOtaCapitalize" :tooltip="tooltips.password" :tooltip-top="'-166'" :tooltip-left="'-207'" size-tooltip="s" />
                        <div class="relative">
                            <BaseTextField 
                                v-model="form.password" 
                                :type="visiblePassword ? 'text' : 'password'"
                                placeholder="Introduce tu contraseña" 
                            />
                            <img 
                                v-if="visiblePassword" 
                                class="absolute cursor-pointer w-5 right-2.5 top-3" 
                                src="/assets/icons/1.TH.PASSWORD.OUTLINE.svg" 
                                @click="togglePasswordVisibility"
                            >
                            <img 
                                v-if="!visiblePassword" 
                                class="absolute cursor-pointer w-5 right-2.5 top-3" 
                                src="/assets/icons/1.TH.PASSWORD.OUTLINE.svg" 
                                @click="togglePasswordVisibility"
                            >
                        </div>
                    </div>
                    <section v-if="credentialsOta && credentialsOta.email && credentialsOta.password" class="mb-4">
                        <div class="flex flex-col gap-[6px]">
                            <span class="text-sm font-medium">
                                Tus credenciales de {{ selectedOtaCapitalize }}
                            </span>
                            <div class="flex justify-between items-center">
                                <div class="flex justify-start gap-2">
                                    <img src="/assets/icons/TH.CHECK.svg" class="w-4 h-4">
                                    <span class="text-[#333333] text-xs font-medium">Credenciales actualizadas</span>
                                </div>
                                <div class="rounded-full p-1 hover:bg-gray-100 cursor-pointer" @click="handleDeleteCredentials">
                                    <img src="/assets/icons/1.TH.DELETE.OUTLINE.svg" class="w-4 h-4">
                                </div>
                            </div>
                        </div>
                    </section>
                </template>
            </div>
            <hr>
            <div class="p-4 flex justify-between">
                <button @click="closeModalIntegration" class="hbtn-tertiary text-sm font-medium underline my-auto px-4 py-3">
                    Cancelar
                </button>
                
                <button 
                    @click="submit" 
                    class="hbtn-cta px-4 py-3 text-sm leading-[110%] font-medium"
                    :disabled="!hasChanges"
                >
                    Guardar
                </button>
            </div>
        </template>
    </ModalWindow>

    <ModalAirbnb 
        :open="openAirbnb" 
        :tooltips="tooltips" 
        :airbnbUrls="airbnbUrls"
        @closeModalAirbnb="closeModalAirbnb" 
        @closeModalAirbnbSoft="closeModalAirbnbSoft"
    />

    <ModalNotEdit
        :open="openModalNotEdit"
        @close="closeModalNotEdit"
    />

    <ModalNoSave
        :id="'not-saved'"
        :open="openModalNoSave"
        title="¿Descartar cambios?"
        text="Tienes cambios sin guardar que se perderán si cancelas. ¿Estas seguro de que quieres cancelar?"
        textbtn="Guardar cambios"
        @saveChanges="submit"
        type="exit_save"
        @close="forceCloseModalIntegration"
    />
</template>
<script setup>
import { ref, onMounted, computed, watch, nextTick } from 'vue';
import HeaderIntegrations from './Components/HeaderIntegrations.vue';
import ModalWindow from '@/components/ModalWindow';
import BaseTextField from '@/components/Forms/BaseTextField';
import LabelIntegrations from './Components/LabelIntegrations.vue';
import ModalAirbnb from './Components/ModalAirbnb.vue';
import { platformsExternalStore } from '@/stores/modules/platformsExternal/platformsExternal';
import { useToastAlert } from '@/composables/useToastAlert';
import ModalNoSave from '@/components/ModalNoSave.vue';
import ModalNotEdit from './Components/ModalNotEdit.vue';
import TabsIntegration from '../components/TabsIntegration.vue';

const platformsStore = platformsExternalStore();
const toast = useToastAlert();

const current_hotel = ref(JSON.parse(localStorage.getItem('current_hotel')));
const dataOTAS = ref([]);
const open = ref(false);
const openAirbnb = ref(false);
const serviceSelected = ref(null);
const loading = ref(false);
const credentialsOta = ref(null);
const openModalNoSave = ref(false);

const openModalNotEdit = ref(false);

// Computed para obtener las URLs de Airbnb
const airbnbUrls = computed(() => {
    return dataOTAS.value?.otas?.filter(ota => ota.ota === 'AIRBNB') || [];
});

const closeModalIntegration = () => {
    if (hasChanges.value) {
        openModalNoSave.value = true;
    } else {
        open.value = false;
        disabledInput.value.url = false;
    }
}

const closeModalNotEdit = () => {
    openModalNotEdit.value = false;
}

const forceCloseModalIntegration = () => {
    openModalNoSave.value = false;
    open.value = false;
    disabledInput.value.url = false;
}

const form = ref({
    _id: '',
    url: '',
    email: '',
    password: '',
});

// Agregar estado para controlar si el input de URL debe estar deshabilitado
const disabledInput = ref({
    url: false
});

// Agregar estado inicial del formulario para comparar cambios
const initialForm = ref(null);

// Agregar estado para errores
const errors = ref({
    url: false,
    email: false,
    password: false
});

const errorMessage = ref({
    url: '',
    email: '',
    password: ''
});

// Función de validación de URLs
const validateUrl = (url, type) => {
    // Si el campo está vacío, no hay errores
    if (!url) {
        return null;
    }

    let urlParts;
    try {
        urlParts = new URL(url);
    } catch (error) {
        return 'URL no válida';
    }

    const hostname = urlParts.origin; 
    let pathname = urlParts.pathname;

    // Verifica que termine en .com
    /* if (!hostname.endsWith('.com')) {
        return 'El dominio del enlace es incorrecto. Asegúrate que termine en ".com".';
    } */

    // Elimina cualquier query string o fragmento en la URL
    pathname = pathname.split('?')[0].split('#')[0];

    switch (type) {
        case 'booking':
            // Elimina cualquier cosa después de ".html" en la URL
            if (pathname.includes('.html')) {
                pathname = pathname.substring(0, pathname.indexOf('.html') + 5);
                form.value.url = hostname + pathname;
            }
            if (!pathname.includes('/hotel/') || !pathname.endsWith('.html')) {
                return 'El formato del enlace de Booking es incorrecto. Debe contener "/hotel/" y terminar en ".html".';
            }
            break;
        case 'tripadvisor':
            if (!pathname.startsWith('/Hotel_Review-') || !pathname.endsWith('.html')) {
                return 'El formato del enlace de TripAdvisor es incorrecto. Debe empezar con "/Hotel_Review-" y terminar en ".html".';
            }
            break;
        case 'google':
            /* if (!pathname.startsWith('/maps/place/')) {
                return 'El formato del enlace de Google es incorrecto. Debe empezar con "/maps/place/".';
            } */
            return null;
        case 'airbnb':
            if (!url.startsWith('https://es.airbnb.com/rooms/')) {
                return 'El formato del enlace de Airbnb es incorrecto. Debe comenzar con "https://es.airbnb.com/rooms/".';
            }
            break;
        case 'expedia':
            // No hay validación específica para Expedia
            return null;
        default:
            return 'Tipo de enlace no soportado';
    }

    return null;
};

// Modificar la validación de credenciales
const validateCredentials = () => {
    // Si hay credenciales iniciales y se están eliminando
    if (credentialsOta.value && !form.value.email && !form.value.password) {
        return true;
    }

    // Si se está intentando agregar credenciales
    if (form.value.email || form.value.password) {
        if (!form.value.email || !form.value.password) {
            errors.value.email = true;
            errors.value.password = true;
            errorMessage.value.email = 'Ambos campos son obligatorios';
            errorMessage.value.password = 'Ambos campos son obligatorios';
            return false;
        }
    }
    
    errors.value.email = false;
    errors.value.password = false;
    errorMessage.value.email = '';
    errorMessage.value.password = '';
    return true;
};

// Modificar el computed hasChanges
const hasChanges = computed(() => {
    if (!initialForm.value) return false;
    
    const currentState = {
        url: form.value.url,
        email: form.value.email,
        password: form.value.password
    };
    
    const initialState = JSON.parse(initialForm.value);
    
    // Verificar cambios en la URL solo si no está deshabilitada
    const hasUrlChanges = !disabledInput.value.url && currentState.url !== initialState.url;
    
    // Verificar cambios en las credenciales
    const hasCredentialChanges = 
        (initialState.email && !currentState.email) || // Se eliminó el email
        (initialState.password && !currentState.password) || // Se eliminó la contraseña
        (currentState.email && currentState.email !== initialState.email) || // Se modificó el email
        (currentState.password && currentState.password !== initialState.password); // Se modificó la contraseña
    
    // Verificar si los campos están vacíos
    const hasEmptyFields = !currentState.url;
    
    // Si hay cambios pero los campos están vacíos, no permitir guardar
    if (hasEmptyFields) return false;

    const isEmailValid = !form.value.email || isValidEmail(form.value.email);
    
    return (hasUrlChanges || hasCredentialChanges) && isEmailValid;
});

// Modificar el watch para validar la URL solo cuando cambia
watch(() => form.value.url, (newUrl) => {
    if (serviceSelected.value) {
        const validationError = validateUrl(newUrl, serviceSelected.value);
        errors.value.url = !!validationError;
        errorMessage.value.url = validationError || '';
    }
}, { immediate: false }); // Cambiar a false para que no valide al inicio

const visiblePassword = ref(false);

const togglePasswordVisibility = () => {
    visiblePassword.value = !visiblePassword.value;
};

const openModalIntegrations = (service) => {
   let serviceUpper = service.toUpperCase();
   if(service === 'tripadvisor' || service === 'google'){
    if(dataOTAS?.value?.otas?.find(ota => ota.ota === serviceUpper)?.url){
        openModalNotEdit.value = true;
        return false;
    }
   }
    form.value.email = '';
    form.value.password = '';
    errorMessage.value.url = '';
    errorMessage.value.email = '';
    errorMessage.value.password = '';
    if (service === 'airbnb') {
        openAirbnb.value = true;
        serviceSelected.value = service;
    } else {
        open.value = true;
        serviceSelected.value = service;
        getDataByOta(service);
        getAllDataByOtas(service);
    }

    
};

const getDataByOta = async (ota) => {
    const params = {
        googleMapCid: current_hotel.value.code,
        ota: ota.toUpperCase(),
    };
    const response = await platformsStore.$findByParamsOta(params);
    form.value.url = response.data?.ota?.url;
    form.value._id = response.data?.ota?._id;
    
    // Si existe una URL, deshabilitar el input
    disabledInput.value.url = !!response.data?.ota?.url;
    
    // Guardar estado inicial después de cargar los datos
    initialForm.value = JSON.stringify({
        url: form.value.url,
        email: form.value.email,
        password: form.value.password
    });
}

const getAllDataByOtas = async (ota) => {
    loading.value = true;
    let otaCapitalize = ota.toUpperCase();
    try {
        const response = await platformsStore.$getAllDataByOtas({ googleMapCid: current_hotel.value.code });
        credentialsOta.value = response.data.hotelDetail?.credentialsByOtas?.[otaCapitalize];

        if (credentialsOta.value) {
            form.value.email = credentialsOta.value.email;
            form.value.password = credentialsOta.value.password;
            
            // Actualizar el estado inicial con las credenciales
            initialForm.value = JSON.stringify({
                url: form.value.url,
                email: credentialsOta.value.email,
                password: credentialsOta.value.password
            });
        }
    } catch (error) {
        console.error('Error loading credentials:', error);
    } finally {
        loading.value = false;
    }
}

onMounted(async () => {
    await getSettings();

});

const getSettings = async () => {
    const params = {
        googleMapCid: current_hotel.value.code,
    };

    try {
        const response = await platformsStore.$getDataOTAS(params);
        dataOTAS.value = response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const selectedOtaCapitalize = computed(() => {
    return serviceSelected?.value?.charAt(0).toUpperCase() + serviceSelected?.value?.slice(1);
});

const placeholderUrl = computed(() => {
    switch (serviceSelected.value) {
        case 'booking':
            return 'https://www.booking.com/Seville-Hotels-Hotel-Tayko-Sevilla.h81845900.Hotel-Information';
        case 'tripadvisor':
            return 'https://www.tripadvisor.com/hotel/nombre-del-hotel';
        case 'expedia':
            return 'https://www.expedia.com/hotel/nombre-del-hotel';
        case 'google':
            return 'hhttps://maps.google.com/hotel/nombre-del-hotel';
        case 'airbnb':
            return 'https://www.airbnb.com/hotel/nombre-del-hotel';
        default:
            return '';
    }
});

const tooltips = computed(() => {
    return {
        url: `<div>
            <span style="font-size: 14px; font-weight: 500; margin-bottom: 8px; display: block;">¿Necesitas cambiar la URL?</span>
            <p style="font-size: 14px; margin-top: 8px; font-weight: normal;">Encontrarás atención personalizada llamando al teléfono +34 644 237 564 o a la dirección de correo electrónico info@thehoster.io <br><br>Nuestro horario de atención es de lunes a jueves de 8:30 a 18:30 y los viernes de 8:30 a 14:30. Estaremos encantados de poder ayudarte</p>
        </div>`,
        email: `<div>
            <span style="font-size: 14px; font-weight: 400;">Utiliza el correo asociado a tu cuenta de ${selectedOtaCapitalize.value} con permisos de administrador.</span>
            <p style="margin-top: 8px;">Si tienes dudas, accede a tu cuenta para confirmar qué correo tienes configurado.</p>
        </div>`,
        password: `<div>
            <span style="font-size: 14px; font-weight: 400;">Introduce la contraseña que usas para acceder a tu cuenta de ${selectedOtaCapitalize.value}.</span>
            <p style="margin-top: 8px;">Si no la recuerdas, puedes verificarla o restablecerla desde el sitio de ${selectedOtaCapitalize.value}.</p>
        </div>`
    };
});

const submit = async () => {
    if (!validateCredentials()) {
        return;
    }

    const urlsPayload = [];
    
    // Si hay una URL existente (aunque esté deshabilitada), incluirla en el payload
    if (form.value.url) {
        urlsPayload.push({
            _id: form.value._id || "",
            delete: false,
            ota: serviceSelected.value.toUpperCase(),
            url: form.value.url
        });
    }

    const dataToSubmit = {
        googleMapCid: current_hotel.value.code,
        credentialsByOtas: serviceSelected.value === 'expedia' || serviceSelected.value === 'booking' 
            ? {
                [serviceSelected.value.toUpperCase()]: {
                    email: form.value.email || '',
                    password: btoa(form.value.password) || ''
                }
            }
            : {},
        urls: urlsPayload
    };

    console.log('Datos a enviar:', dataToSubmit);
    const response = await platformsStore.$bulkUpdateOTAS(dataToSubmit);

    if (response.ok) {
        toast.warningToast('Cambios guardados con éxito', 'top-right');
        await getSettings();
        //closeModalIntegration();
        open.value = false;
        setTimeout(() => {
            location.reload();
        }, 1050);
    } else {
        toast.errorToast(response.message.text, 'top-right');
    }
}

const handleDeleteCredentials = async () => {
    try {
        loading.value = true;
        
        // Guardar el estado actual antes de eliminar
        const currentCredentials = {
            email: form.value.email,
            password: form.value.password
        };
        
        // Limpiar las credenciales
        credentialsOta.value = null;
        form.value.email = '';
        form.value.password = '';
        
        // Actualizar el estado inicial con las credenciales que acabamos de eliminar
        initialForm.value = JSON.stringify({
            url: form.value.url,
            email: currentCredentials.email,
            password: currentCredentials.password
        });
        
        // Limpiar errores
        errors.value.url = false;
        errors.value.email = false;
        errors.value.password = false;
        errorMessage.value.url = '';
        errorMessage.value.email = '';
        errorMessage.value.password = '';
        
        // Forzar una actualización del estado
        await nextTick();
        toast.warningToast('Credenciales eliminadas con éxito', 'top-right');
    } catch (error) {
       toast.errorToast('Error al eliminar las credenciales', 'top-right');
    } finally {
        loading.value = false;
    }
}

const closeModalAirbnb = async () => {
    toast.warningToast('Cambios guardados con éxito', 'top-right');
    await getSettings();
    openAirbnb.value = false;
}

const closeModalAirbnbSoft = async () => {
    openAirbnb.value = false;
}

// Agregar watch para validar credenciales cuando cambian
watch([() => form.value.email, () => form.value.password], () => {
    validateCredentials();
});

const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};


</script>


