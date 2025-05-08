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
                            <div class="rounded-full p-1 hover:bg-gray-100 cursor-pointer" @click="openDeleteModal(index)">
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
    <ModalDeleteURL 
        :open="openModalDeleteURL" 
        :nameOTA="nameOtaDelete" 
        @submit:delete="() => removeUrl(indexToDelete)" 
        @close:modal="openModalDeleteURL = false" 
    />

    <ModalNoSave
        :id="'not-saved'"
        :open="openModalNoSave"
        text="Tienes cambios sin guardar que se perderán si cancelas. ¿Estas seguro de que quieres cancelar?"
        textbtn="Guardar cambios"
        @saveChanges="submit"
        type="exit_save"
        @close="forceCloseModalAirbnb"
    />
</template>

<script setup>
import { ref, defineProps, defineEmits, onMounted, computed, watch } from 'vue';
import ModalWindow from '@/components/ModalWindow';
import BaseTextField from '@/components/Forms/BaseTextField';
import LabelIntegrations from './LabelIntegrations.vue';
import { platformsExternalStore } from '@/stores/modules/platformsExternal/platformsExternal';
import { useToastAlert } from '@/composables/useToastAlert';
import ModalDeleteURL from '@/Modules/User/Settings/components/ModalDeleteURL.vue';
import ModalNoSave from '@/components/ModalNoSave.vue';

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
//const initialUrls = ref([]);
const initialForm = ref(null);
const current_hotel = ref(JSON.parse(localStorage.getItem('current_hotel')));
const loading = ref(true);
const credentialsByAirbnb = ref(null);
const openModalDeleteURL = ref(false);
const nameOtaDelete = ref('');
const indexToDelete = ref(null);
const openModalNoSave = ref(false);

// Agregar después de la definición de form
const errors = ref({
    email: false,
    password: false
});

const errorMessage = ref({
    email: '',
    password: ''
});

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
    } else {
        urls.value = [{ url: '', _id: '', errors: false, disabled: false, errorMessage: '', delete: false }];
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

        // Actualizar el estado inicial después de cargar los datos
        initialForm.value = JSON.stringify({
            urls: urls.value,
            form: { ...form.value }
        });
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
    if (hasChanges.value) {
        openModalNoSave.value = true;
        console.log('Tienes cambios sin guardar que se perderán si cancelas. ¿Estas seguro de que quieres cancelar?');
        return false;
    }
    emit('closeModalAirbnb');
};

const forceCloseModalAirbnb = () => {
    emit('closeModalAirbnb');
}

const submit = async () => {
    const urlsPayload = [];

    // Procesar todas las URLs, incluyendo las eliminadas
    urls.value.forEach(url => {
        if (url.delete) {
            // URL eliminada - incluir en el payload con delete: true
            urlsPayload.push({
                _id: url._id,
                delete: true,
                ota: 'AIRBNB',
                url: url.url
            });
        } else if (url.url) {
            // URL activa o nueva
            urlsPayload.push({
                _id: url._id || "",
                delete: false,
                ota: 'AIRBNB',
                url: url.url
            });
        }
    });

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
        closeModalAirbnb();
        setTimeout(() => {
            location.reload();
        }, 1100);
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
        credentialsByAirbnb.value = null;
        form.value.email = '';
        form.value.password = '';
        
        // Actualizar el estado inicial con las credenciales que acabamos de eliminar
        initialForm.value = JSON.stringify({
            urls: urls.value,
            form: {
                email: currentCredentials.email,
                password: currentCredentials.password
            }
        });
        
        // Limpiar errores
        errors.value.email = false;
        errors.value.password = false;
        errorMessage.value.email = '';
        errorMessage.value.password = '';

        toast.warningToast('Credenciales eliminadas con éxito', 'top-right');
    } catch (error) {
        toast.errorToast('Error al eliminar las credenciales', 'top-right');
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
    openModalDeleteURL.value = false;
};

const openDeleteModal = (index) => {
    nameOtaDelete.value = 'AIRBNB';
    openModalDeleteURL.value = true;
    // Guardar el índice para usarlo cuando se confirme la eliminación
    indexToDelete.value = index;
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
    
    const initialState = JSON.parse(initialForm.value);
    
    // Verificar cambios en las URLs
    const hasUrlChanges = JSON.stringify(currentState.urls) !== JSON.stringify(initialState.urls);
    
    // Verificar cambios en las credenciales
    const hasCredentialChanges = 
        (initialState.form.email && !currentState.form.email) || 
        (initialState.form.password && !currentState.form.password) ||  
        (currentState.form.email && currentState.form.email !== initialState.form.email) || 
        (currentState.form.password && currentState.form.password !== initialState.form.password); 
    
    return hasUrlChanges || hasCredentialChanges;
});

</script>

