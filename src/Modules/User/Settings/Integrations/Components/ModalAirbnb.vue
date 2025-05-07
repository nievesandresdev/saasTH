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
                    <div v-for="(url, index) in urls" :key="url.id" class="flex items-start gap-2">
                        <div class="flex-grow flex flex-col gap-2">
                            <LabelIntegrations 
                                :label="index === 0 ? 'URL de Airbnb' : 'URL adicional'" 
                                :tooltip="tooltips.url" 
                                :tooltip-top="'-172'" 
                                :tooltip-left="'-55'" 
                            />
                            <BaseTextField 
                                v-model="url.value" 
                                :placeholder="'https://www.airbnb.com/hotel/nombre-del-hotel'" 
                            />
                        </div>
                        <div v-if="index > 0" class="mt-8">
                            <div class="rounded-full p-1 hover:bg-gray-100 cursor-pointer" @click="removeUrl(url.id)">
                                <img src="/assets/icons/1.TH.DELETE.OUTLINE.svg" class="w-6 h-6">
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
                <div class="flex flex-col gap-2 mb-4" >
                    <LabelIntegrations :label="'Tu dirección de correo de Airbnb'" :tooltip="tooltips.email" :tooltip-top="'-125'" :tooltip-left="'-55'" />
                    <BaseTextField v-model="form.email" placeholder="correo@tu-hotel.com" />
                </div>
                <div class="flex flex-col gap-2 mb-4" >
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
            <hr>
            <div class="p-4 flex justify-between">
                <button @click="closeModalIntegration" class="hbtn-tertiary text-sm font-medium underline my-auto px-4 py-3">
                    Cancelar
                </button>
                
                <button  @click="submit" class="hbtn-cta px-4 py-3 text-sm leading-[110%] font-medium">
                    Guardar
                </button>
            </div>
        </template>
    </ModalWindow>
</template>

<script setup>
import { ref, defineProps, defineEmits, onMounted } from 'vue';
import ModalWindow from '@/components/ModalWindow';
import BaseTextField from '@/components/Forms/BaseTextField';
import LabelIntegrations from './LabelIntegrations.vue';

const emit = defineEmits(['closeModalAirbnb']);

const props = defineProps({
    open: {
        type: Boolean,
        required: true
    },
    tooltips: {
        type: Object,
        required: true
    }
});

// Simulación de respuesta del endpoint
const mockEndpointResponse = {
    urls: [
        'https://www.airbnb.com/hotel/hotel-principal',
        'https://www.airbnb.com/hotel/hotel-secundario',
        'https://www.airbnb.com/hotel/hotel-terciario'
    ],
    email: 'hotel@example.com',
    password: '********'
};

const form = ref({
    email: '',
    password: '',
});

const urls = ref([]);

// Cargar datos iniciales
onMounted(() => {
    // Simular carga de datos
    if (mockEndpointResponse.urls.length > 0) {
        urls.value = mockEndpointResponse.urls.map((url, index) => ({
            id: index + 1,
            value: url
        }));
    } else {
        urls.value = [{ id: 1, value: '' }];
    }
    
    form.value.email = mockEndpointResponse.email;
    form.value.password = mockEndpointResponse.password;
});

const visiblePassword = ref(false);

const togglePasswordVisibility = () => {
    visiblePassword.value = !visiblePassword.value;
};

const closeModalAirbnb = () => {
    emit('closeModalAirbnb');
};

const submit = () => {
    // Preparar datos para enviar
    const dataToSubmit = {
        urls: urls.value.map(url => url.value).filter(url => url.trim() !== ''),
        email: form.value.email,
        password: form.value.password
    };

    console.log('Datos a enviar:', dataToSubmit);
    // Aquí iría la llamada al endpoint
    // Ejemplo:
    // await api.post('/airbnb-integration', dataToSubmit);
}

const handleDeleteCredentials = () => {
    console.log('Delete credentials');
    // Aquí iría la llamada al endpoint para eliminar credenciales
    // Ejemplo:
    // await api.delete('/airbnb-integration/credentials');
}

const addAnotherUrlAirbnb = () => {
    urls.value.push({ id: Date.now(), value: '' });
};

const removeUrl = (id) => {
    urls.value = urls.value.filter(url => url.id !== id);
};










</script>

