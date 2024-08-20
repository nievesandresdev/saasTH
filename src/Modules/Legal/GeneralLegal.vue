<template>
    <div class="h-screen px-[24px] bg-[#FAFAFA]">
        <HeadLegal />
        <TabLegal />

        <SectionConfig :widht="'67%'">
            <template #title>
                <div class="flex flex-col mb-6 gap-2">
                    <span class="font-semibold text-base">General</span>
                    <span class="text-sm font-normal mb-2">Información general que se utilizará para redactar los distintos textos legales.</span>
                </div>
            </template>
            <template #content>
                <div class="w-full">
                    <section class="mb-4">
                        <label class="text-sm font-medium mb-[6px] block">Razón social</label>
                        <BaseTextField v-model="form.name" placeholder="Ejemplo: Tecnologías Innovadoras S.A." />
                    </section>
                    <section class="mb-4">
                        <label class="text-sm font-medium mb-[6px] block">Domicilio fiscal</label>
                        <input
                            v-model="form.address"
                            id="fiscal_address"
                            type="text"
                            placeholder="Ejemplo: Plaza Trinidad 15, 5C - Sevilla"
                            class="h-10 rounded-[6px] text-sm font-medium w-full pl-3 hinput border hinput-green"
                            :class="`${form.address ? 'hborder-black-100' : 'hborder-gray-400'}`"
                        >
                    </section>
                    <section class="mb-4">
                        <label class="text-sm font-medium mb-[6px] block">NIF</label>
                        <BaseTextField v-model="form.nif" placeholder="Ejemplo: A87654321" />
                    </section>
                    <section class="mb-6">
                        <label class="text-sm font-medium mb-[6px] block">Email de contacto</label>
                        <BaseTextField v-model="form.email" placeholder="Ejemplo: direccion@dominio.com" :error="!isEmailValid"/>
                        <div v-if="!isEmailValid" class="flex mt-1 text-[#FF6666] justify-left">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="mr-1 bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
                                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                            </svg>
                            <small>Es necesario poner un correo electrónico válido</small>
                        </div>
                    </section>
                    <section class="flex justify-between items-center mb-4">
                        <label class="text-sm font-semibold">¿Cuentan con delegado de protección de datos?</label>
                        <div class="flex">
                            <span class="text-sm font-semibold mr-1">{{ form.protection ? 'Si' : 'No' }}</span>
                            <BaseSwitchInput v-model="form.protection" />
                        </div>
                    </section>
                    <transition name="fade">
                        <section v-if="form.protection" class="mb-6">
                            <label class="text-sm font-medium mb-[6px] block">Correo electrónico del delegado*</label>
                            <BaseTextField v-model="form.email_protection" placeholder="Ejemplo: direccion2@dominio.com" :error="!isEmailProtectionValid"/>
                            <div v-if="!isEmailProtectionValid" class="flex mt-1 text-[#FF6666] justify-left">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="mr-1 bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
                                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                                </svg>
                                <small>Es necesario poner un correo electrónico válido</small>
                            </div>
                        </section>
                    </transition>
                </div>
            </template>
        </SectionConfig>
    </div>
    <ChangesBar 
        :existingChanges="changes"
        :validChanges="changes && valid"
        @cancel="cancelChange" 
        @submit="submit"
    />
</template>

<script setup>
import { ref, reactive, onMounted, computed, nextTick, watch } from 'vue';
import HeadLegal from './components/HeadLegal.vue';
import TabLegal from './components/TabLegal.vue';
import SectionConfig from '@/components/SectionConfig.vue';
import BaseSwitchInput from "@/components/Forms/BaseSwichInput.vue";
import { storeGeneralLegal, getGeneralLegal } from '@/api/services/legal/legal.services';
import BaseTextField from '@/components/Forms/BaseTextField.vue';
import ChangesBar from '@/components/Forms/ChangesBar.vue';
import { useToastAlert } from '@/composables/useToastAlert'

const toast = useToastAlert();

const form = reactive({
    name: '',
    address: '',
    nif: '',
    email: '',
    protection: false,
    email_protection: ''
});

const initialForm = ref(null);
const isEmailProtectionValid = ref(false);
const isEmailValid = ref(false);

onMounted(() => {
    loadGoogleMapsScript();
    initialForm.value = JSON.stringify(form);

    getData();
    isEmailProtectionValid.value = false; 
    isEmailValid.value = false; 
});

const getData = async() => {
    const response = await getGeneralLegal();
    
    form.name = response.data.legal?.name || '';
    form.address = response.data.legal?.address || '';
    form.nif = response.data.legal?.nif || '';
    form.email = response.data.legal?.email || '';
    form.protection = response.data.legal?.protection || false;
    form.email_protection = response.data.legal?.email_protection || '';

    isEmailValid.value = validateEmail(form.email);
    isEmailProtectionValid.value = validateEmail(form.email_protection);
};

watch(() => form.email, (newValue) => {
    isEmailValid.value = validateEmail(newValue);
});

watch(() => form.email_protection, (newValue) => {
    isEmailProtectionValid.value = validateEmail(newValue);
});

watch(() => form.protection, (newValue) => {
    if(!newValue){
        form.email_protection = '';
        isEmailProtectionValid.value = true;
    }
});

const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

const changes = computed(() => {
    return JSON.stringify(form) !== initialForm.value;
});

const valid = computed(() => {
    return form.name.trim() !== '' && 
           form.address.trim() !== '' && 
           form.nif.trim() !== '' && 
           form.email.trim() !== '' && isEmailValid.value &&
           (!form.protection || (form.email_protection.trim() !== '' && isEmailProtectionValid.value));
});

const cancelChange = () => {
    const oldValues = JSON.parse(initialForm.value);
    form.name = oldValues.name;
    form.address = oldValues.address;
    form.nif = oldValues.nif;
    form.email = oldValues.email;
    form.protection = oldValues.protection;
    form.email_protection = oldValues.email_protection;
};

const submit = async () => {
    if (!valid.value) {
        toast.errorToast('Por favor, complete todos los campos requeridos.', 'top-right');
        return;
    }

    initialForm.value = JSON.stringify(form);

    const response = await storeGeneralLegal(form);

    if(response.ok){
        toast.warningToast('Se han guardado los cambios','top-right')
    } else {
        toast.errorToast('Ha ocurrido un error al guardar los cambios','top-right')
    }

    console.log('Formulario guardado', form, response);
};

function loadGoogleMapsScript() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.VUE_APP_KEY_GOOGE}&libraries=places`;
    script.async = true;
    document.head.appendChild(script);
    script.onload = () => {
        nextTick(() => {
            initAutocomplete();
        });
    };
}

function initAutocomplete() {
    const input = document.getElementById('fiscal_address');
    const autocomplete = new google.maps.places.Autocomplete(input, {
        types: ['address'],
        componentRestrictions: { country: "es" }
    });
    autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place.geometry) {
            form.address = place.formatted_address;
        }
    });
}

</script>
