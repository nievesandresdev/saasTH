<template>
    <div class="px-6 flex-grow min-h-screen">
        <!-- <HeaderIntegrations /> -->
        <TabsIntegration />
        <div class="relative flex w-1/3 mt-4 mb-2" >
            <input
            type="text"
            class="th-Input p-input-icon-left w-full"
            placeholder="Buscar PMS"
            v-model="form_filter.search_terms"
            :class="{'border-dark':form_filter.search_terms}"
            @keypress.enter="submit_filters"
            @input="updateSearchTerms"
            >
            <div class="absolute inset-y-0 left-0 flex items-center pl-3">
            <img src="/assets/icons/1.TH.SEARCH.svg" class="w-6 h-6" alt="search icon">
            </div>
        </div>
        <span class="text-sm font-medium">{{ dataPMS.length }} PMS encontrados</span>
        <div v-if="loading" class="flex flex-col items-center justify-center h-[calc(100vh-200px)]">
            <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
        <div v-else-if="!loading && dataPMS.length > 0" class="grid grid-cols-3 3xl:grid-cols-4 gap-4 mt-4">
            <div v-for="pms in dataPMS" :key="pms.id" @click="openModalIntegrations(pms)" class="rounded-[10px] border border-[#E9E9E9] bg-white p-4 hover:shadow-[0px_3.5px_7px_0px_rgba(0,0,0,0.15)] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.15)] cursor-pointer">
                <div class="flex items-center gap-2">
                    <img :src="`/assets/icons/pms/${pms.icon_pms}.svg`" class="w-8 h-8">
                    <span class="text-[#333333] text-base font-medium">{{ pms.name_pms }}</span>
                </div>
                <div class="flex items-center gap-2 mt-2">
                    <img src="/assets/icons/TH.CHECK.svg" class="w-[16px] h-[16px]">
                    <span class="text-[#333333] text-[12px] font-medium truncate">
                        No requiere URL
                    </span>
                </div>
                <div class="flex items-center gap-2 mt-2" v-if="!pms.with_credentials">
                    <img src="/assets/icons/1.TH.WARNING.svg" class="w-[16px] h-[16px]">
                    <span class="text-[#333333] text-[12px] font-medium">Sin credenciales</span>
                </div>
                <div class="flex items-center gap-2 mt-2" v-else>
                    <img src="/assets/icons/TH.CHECK.svg" class="w-[16px] h-[16px]">
                    <span class="text-[#333333] text-[12px] font-medium">Credenciales actualizadas</span>
                </div>

            </div>

        </div>
        <div v-else class="flex flex-col items-center justify-center h-[calc(100vh-200px)]">
            <img src="/assets/img/2.TH.empty-integraciones.svg" alt="No PMS found" class="w-auto h-auto">
            <span class="mt-4 text-[#A0A0A0] text-base font-normal">
                No se han encontrado PMS intenta con otra búsqueda
            </span>
        </div>
    </div>

    <ModalWindow v-if="open" :isVisible="open"  :width="'480px'" padding-content="p-0" footer="true" @close="closeModalIntegrationPMS" >
        <template #content>
            <div class="flex justify-between p-4">
                <span class="text-[18px] font-medium">
                    Configura la integración con {{ selectedOtaCapitalize }}
                </span>
                <button @click="closeModalIntegrationPMS" class="cursor-pointer hover:bg-gray-100 rounded-full p-1">
                    <img src="/assets/icons/1.TH.CLOSE.svg" alt="1.TH.CLOSE" class="h-6 w-6">
                </button>
            </div>
            <hr>
            <div class="px-4 pt-4">
                <div  class="flex flex-col gap-2 mb-4" v-if="!dataSelected.with_credentials">
                    <LabelIntegrations :label="'Tu dirección de correo de ' + selectedOtaCapitalize" :tooltip="tooltips.email" :tooltip-top="'-166'" :tooltip-left="'-265'" size-tooltip="s" />
                    <BaseTextField v-model="form.email" placeholder="correo@tu-hotel.com" />
                </div>
                <div  class="flex flex-col gap-2 mb-4" v-if="!dataSelected.with_credentials">
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
                <section v-else class="mb-4">
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
            </div>
            <hr>
            <div class="p-4 flex justify-between">
                <button @click="closeModalIntegrationPMS" class="hbtn-tertiary text-sm font-medium underline my-auto px-4 py-3">
                    Cancelar
                </button>
                
                <button 
                    @click="submit" 
                    class="hbtn-cta px-4 py-3 text-sm leading-[110%] font-medium"
                    :disabled="!hasChanges || dataSelected.with_credentials"
                >
                    Guardar
                </button>
            </div>
        </template>
    </ModalWindow>


    <ModalNoSave
        :id="'not-saved'"
        :open="openModalNoSave"
        title="¿Descartar cambios?"
        text="Tienes cambios sin guardar que se perderán si cancelas. ¿Estas seguro de que quieres cancelar?"
        textbtn="Guardar cambios"
        @saveChanges="submit"
        type="exit_save"
        @close="forceCloseModalIntegrationPMS"
    />
</template>
<script setup>
import { ref, onMounted, computed, watch, onUnmounted } from 'vue';
import ModalWindow from '@/components/ModalWindow';
import BaseTextField from '@/components/Forms/BaseTextField';
import LabelIntegrations from './Components/LabelIntegrations.vue';
import { useToastAlert } from '@/composables/useToastAlert';
import ModalNoSave from '@/components/ModalNoSave.vue';
import TabsIntegration from '../components/TabsIntegration.vue';
import { usePmsIntegrationStore } from '@/stores/modules/pmsIntegration';
import { debounce } from 'lodash';

const pmsIntegrationStore = usePmsIntegrationStore();

const toast = useToastAlert();


const dataPMS = ref([]);
const open = ref(false);

const serviceSelected = ref(null);
const dataSelected = ref({});
const loading = ref(false);
const credentialsOta = ref(null);
const openModalNoSave = ref(false);

//const openModalNotEdit = ref(false);


const closeModalIntegrationPMS = () => {
    if (hasChanges.value && !form.value.email && !form.value.password) {
        openModalNoSave.value = true;
    } else {
        open.value = false;
    }
}


const forceCloseModalIntegrationPMS = () => {
    openModalNoSave.value = false;
    open.value = false
}

const form = ref({
    _id: '',
    url: '',
    email: '',
    password: '',
});

const form_filter = ref({
    search_terms: ''
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

const searchPms = async (searchTerm) => {
    loading.value = true;
    try {
        const response = await pmsIntegrationStore.$getPmsWithFilters(searchTerm);
        dataPMS.value = response.data;
    } catch (error) {
        console.error('Error searching PMS:', error);
        toast.errorToast('Error al buscar PMS', 'top-right');
    } finally {
        loading.value = false;
    }
};

// debounce search
const debouncedSearch = debounce(searchPms, 350);

const updateSearchTerms = () => {
    debouncedSearch(form_filter.value.search_terms);
};

// limpiar
onUnmounted(() => {
    debouncedSearch.cancel();
});

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
        email: form.value.email,
        password: form.value.password
    };
    
    const initialState = JSON.parse(initialForm.value);
    
    // Verificar si hay cambios en las credenciales
    const hasCredentialChanges = 
        (currentState.email !== initialState.email) || // Se modificó el email
        (currentState.password !== initialState.password); // Se modificó la contraseña
    
    // Validar que ambos campos tengan contenido
    const hasContent = Boolean(currentState.email) && Boolean(currentState.password) &&
        currentState.email.trim() !== '' && currentState.password.trim() !== '';
    
    // Validar que la contraseña tenga más de 3 caracteres
    const isPasswordValid = Boolean(currentState.password) && currentState.password.trim().length > 3;
    
    const isEmailValid = !currentState.email || isValidEmail(currentState.email);
    
    return hasCredentialChanges && hasContent && isEmailValid && isPasswordValid;
});



const visiblePassword = ref(false);

const togglePasswordVisibility = () => {
    visiblePassword.value = !visiblePassword.value;
};

const openModalIntegrations = (pms) => {
    form.value.email = pms.email_pms;
    form.value.password = pms.password_pms;
    errorMessage.value.url = '';
    errorMessage.value.email = '';
    errorMessage.value.password = '';
    form.value._id = pms.id;
    dataSelected.value = pms;

    // Inicializar el estado inicial del formulario
    initialForm.value = JSON.stringify({
        email: '',
        password: ''
    });

    open.value = true;
    serviceSelected.value = pms.name_pms;
};


onMounted(async () => {
    await getIntegrationPms();

});

const getIntegrationPms = async () => {
    loading.value = true;
    try {
        const response = await pmsIntegrationStore.$getIntegrationPms();
        dataPMS.value = response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        loading.value = false;
    }
};

const selectedOtaCapitalize = computed(() => {
    return serviceSelected?.value?.charAt(0).toUpperCase() + serviceSelected?.value?.slice(1);
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


    const dataToSubmit = {
        pmsId: form.value._id,
        email: form.value.email,
        password: form.value.password
    }

    console.log('Datos a enviar:', dataToSubmit);

    const response = await pmsIntegrationStore.$updateOrCreateCredentialsPms(dataToSubmit);
    //console.log('response', response);
    if(response.ok){
        toast.warningToast('Cambios guardados con éxito', 'top-right');
        open.value = false;
        await getIntegrationPms();
    }else{
        toast.errorToast('Error al actualizar las credenciales', 'top-right');
    }

}

const handleDeleteCredentials = async () => {
    try {
        loading.value = true;
        
        const currentCredentials = {
            pmsId: form.value._id
        };
         
        // Actualizar el estado inicial con las credenciales que acabamos de eliminar
        initialForm.value = JSON.stringify({
            email: '',
            password: ''
        });

        const response = await pmsIntegrationStore.$deleteCredentialsPms(currentCredentials);
        if(response.ok){
            toast.warningToast('Credenciales eliminadas con éxito', 'top-right');
            errors.value.email = false;
            errors.value.password = false;
            errorMessage.value.email = '';
            errorMessage.value.password = '';
            form.value.email = '';
            form.value.password = '';
            dataSelected.value = {};
            form.value._id = '';
            //close modal integration
            open.value = false;
            await getIntegrationPms();
        }else{
            toast.errorToast('Error al eliminar las credenciales', 'top-right');
        }

    } catch (error) {
       toast.errorToast('Error al eliminar las credenciales', 'top-right');
    } finally {
        loading.value = false;
    }
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


