<template>
    <ModalWindow v-if="props.open" :isVisible="props.open"  :width="'440px'" padding-content="p-0" footer="true" >
        <template #content>
            <div class="flex justify-between p-4">
                <span class="text-[18px] font-medium">
                    Configura la integración con Airbnb
                </span>
                <button @click="closeModalAirbnb">
                    <img src="/assets/icons/1.TH.CLOSE.svg" alt="1.TH.CLOSE" class="h-6 w-6">
                </button>
            </div>
            <hr>
            <div class="p-4">
                <div class="flex flex-col gap-2 mb-4">
                    <div v-for="(url, index) in displayedUrls" :key="url._id || index" class="flex items-start gap-2">
                        <div class="flex-grow">
                            <LabelIntegrations 
                                :label="index === 0 ? 'URL de Airbnb' : 'URL adicional'" 
                                :tooltip="tooltips.url" 
                                :tooltip-top="'-172'" 
                                :tooltip-left="'-55'" 
                            />
                            <BaseTextField 
                                v-model="url.url" 
                                :placeholder="'https://www.airbnb.com/hotel/nombre-del-hotel'" 
                                :error="url.errors"
                            />
                            <div v-if="url.errors" class="flex items-center text-red-500 text-[12px] font-semibold mt-1">
                                <img src="/assets/icons/1.TH.WARNING-RED.svg" class="w-4 h-4 mr-2" alt="Warning">
                                <p class="text-red-500">{{ url.errorMessage }}</p>
                            </div>
                        </div>
                        <div v-if="index > 0" class="mt-8">
                            <div class="rounded-full p-1 hover:bg-gray-100 cursor-pointer" @click="removeUrl(index)">
                                <img src="/assets/icons/1.TH.DELETE.OUTLINE.svg" class="w-4 h-4">
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-start items-center gap-2 cursor-pointer" @click="addAnotherUrlAirbnb">
                        <img src="/assets/icons/1.TH.PLUS.svg" class="w-4 h-4">
                        <span class="text-xs font-medium">
                            Añadir otro enlace
                        </span>
                    </div>
                </div>
                <div v-if="loading" class="flex flex-col gap-2 mb-4">
                    <div class="animate-pulse">
                        <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div class="h-10 bg-gray-200 rounded"></div>
                    </div>
                </div>
                <template v-else>
                    <div v-if="credentialsByAirbnb" class="flex flex-col gap-2 mb-4">
                        <section>
                            <div class="flex flex-col gap-[6px]">
                                <span class="text-sm font-medium">
                                    Tus credenciales de Airbnb
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
                    </div>
                    <div v-else class="flex flex-col gap-2 mb-4">
                        <LabelIntegrations :label="'Tu dirección de correo de Airbnb'" :tooltip="tooltips.email" :tooltip-top="'-125'" :tooltip-left="'-55'" />
                        <BaseTextField v-model="form.email" placeholder="correo@tu-hotel.com" />
                    </div>
                    <div v-if="!credentialsByAirbnb" class="flex flex-col gap-2 mb-4">
                        <LabelIntegrations :label="'Tu contraseña de Airbnb'" :tooltip="tooltips.password" :tooltip-top="'22'" :tooltip-left="'-55'" />
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
                </template>
            </div>
            <hr>
            <div class="p-4 flex justify-between">
                <button @click="closeModalAirbnb" class="hbtn-tertiary text-sm font-medium underline my-auto px-4 py-3">
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
</template>

<script setup>
import { ref, defineProps, defineEmits, onMounted, computed, watch } from 'vue';
import ModalWindow from '@/components/ModalWindow';
import BaseTextField from '@/components/Forms/BaseTextField';
import LabelIntegrations from './LabelIntegrations.vue';
import { platformsExternalStore } from '@/stores/modules/platformsExternal/platformsExternal';
import { useToastAlert } from '@/composables/useToastAlert';

const platformsStore = platformsExternalStore();
const toast = useToastAlert();


const emit = defineEmits(['closeModalAirbnb']);

const props = defineProps({
    open: {
        type: Boolean,
        required: true
    },
    tooltips: {
        type: Object,
        required: true
    },
    airbnbUrls: {
        type: Array,
        default: () => []
    }
});

const form = ref({
    email: '',
    password: '',
});

const urls = ref([]);
const initialUrls = ref([]);
const initialForm = ref(null);
const current_hotel = ref(JSON.parse(localStorage.getItem('current_hotel')));
const loading = ref(true);
const credentialsByAirbnb = ref(null);

// Función para inicializar las URLs
const initializeUrls = () => {
    if (props.airbnbUrls.length > 0) {
        urls.value = props.airbnbUrls.map(url => ({
            url: url.url,
            _id: url._id,
            errors: false,
            disabled: false,
            errorMessage: '',
            delete: false
        }));
        // Guardar el estado inicial
        initialUrls.value = [...urls.value];
    } else {
        urls.value = [{ url: '', _id: '', errors: false, disabled: false, errorMessage: '', delete: false }];
        initialUrls.value = [];
    }
    
    // Guardar estado inicial del formulario
    initialForm.value = JSON.stringify({
        urls: urls.value,
        form: { ...form.value }
    });
};

// Watch para cuando cambia el estado de open o las URLs
watch(
    () => [props.open, props.airbnbUrls],
    ([newOpen]) => {
        if (newOpen) {
            initializeUrls();
            getAllDataByOtas();
        }
    },
    { immediate: true }
);

// Modificar onMounted para usar la función de inicialización
onMounted(() => {
    initializeUrls();
    //getAllDataByOtas();
});

const getAllDataByOtas = async () => {
    loading.value = true;
    try {
        const response = await platformsStore.$getAllDataByOtas({ googleMapCid: current_hotel.value.code });
        credentialsByAirbnb.value = response.data.hotelDetail?.credentialsByOtas?.AIRBNB;

        if (credentialsByAirbnb.value) {
            form.value.email = credentialsByAirbnb.value.email;
            form.value.password = credentialsByAirbnb.value.password;
        }
    } catch (error) {
        console.error('Error loading credentials:', error);
    } finally {
        loading.value = false;
    }
}

const visiblePassword = ref(false);

const togglePasswordVisibility = () => {
    visiblePassword.value = !visiblePassword.value;
};

const closeModalAirbnb = () => {
    emit('closeModalAirbnb');
};

const submit = async () => {
    const urlsPayload = [];

    /* console.log('URLs antes del submit:', urls.value);
    console.log('URLs iniciales:', initialUrls.value); */

    // Procesar todas las URLs, incluyendo las eliminadas
    urls.value.forEach(url => {
        const initialUrl = initialUrls.value.find(initial => initial._id === url._id);
        //console.log('Procesando URL:', { url, initialUrl });
        
        if (initialUrl) {
            // URL existente
            if (url.delete) {
                console.log('URL marcada como eliminada:', url);
                // URL eliminada - mantener la URL original
                urlsPayload.push({
                    _id: url._id,
                    delete: true,
                    ota: 'AIRBNB',
                    url: initialUrl.url // Usar la URL original
                });
            } else {
                // URL activa (modificada o sin cambios)
                urlsPayload.push({
                    _id: url._id,
                    delete: false,
                    ota: 'AIRBNB',
                    url: url.url
                });
            }
        } else if (url.url) {
            // Nueva URL
            urlsPayload.push({
                _id: url._id || "",
                delete: false,
                ota: 'AIRBNB',
                url: url.url
            });
        }
    });

    //console.log('URLs payload final:', urlsPayload);

    const dataToSubmit = {
        googleMapCid: current_hotel.value.code,
        credentialsByOtas: {
            AIRBNB: {
                email: form.value.email || null,
                password: form.value.password || null
            }
        },
        urls: urlsPayload
    };

    console.log('Datos a enviar:', dataToSubmit);
    const response = await platformsStore.$bulkUpdateOTAS(dataToSubmit);

    if (response.ok) {
        toast.warningToast('Cambios guardados con éxito', 'top-right');
        //await getSettings();
    } else {
        toast.errorToast(response.message.text, 'top-right');
    }
}

const handleDeleteCredentials = async () => {
    try {
        loading.value = true;
        // Aquí iría la llamada al endpoint para eliminar credenciales
        // await api.delete('/airbnb-integration/credentials');
        credentialsByAirbnb.value = null;
        form.value.email = '';
        form.value.password = '';
    } catch (error) {
        console.error('Error deleting credentials:', error);
    } finally {
        loading.value = false;
    }
}

const addAnotherUrlAirbnb = () => {
    urls.value.push({ 
        url: '', 
        _id: '', 
        errors: false, 
        disabled: false, 
        errorMessage: '', 
        delete: false 
    });
};

const removeUrl = (index) => {
    const url = urls.value[index];
    if (url.url === '') {
        // Si la URL está vacía, eliminamos el objeto directamente
        urls.value.splice(index, 1);
    } else {
        // Marcamos el objeto como eliminado
        url.delete = true;
    }
};

const displayedUrls = computed(() => {
    return urls.value.filter(url => !url.delete);
});

// Computed para verificar si hay cambios
const hasChanges = computed(() => {
    if (!initialForm.value) return false;
    
    const currentState = {
        urls: urls.value,
        form: { ...form.value }
    };
    
    return JSON.stringify(currentState) !== initialForm.value;
});

</script>

