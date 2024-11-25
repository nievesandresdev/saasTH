<template>
    <div class="h-screen px-[24px] bg-[#FAFAFA] overflow-hidden">
        <HeadLegal />
        <TabLegal />
        <div class="w-[720px] 3xl:w-[1040px] py-6 px-4 rounded-[10px] shadow-hoster bg-white mb-10">
            <div class="flex flex-col mb-4 gap-2">
                <span class="font-semibold text-base">General</span>
                <span class="text-sm font-normal mb-2">Información general que se utilizará para redactar los distintos textos legales.</span>
            </div>
            <div class="w-full">
                <section class="mb-4">
                    <label class="text-sm font-medium mb-[6px] block">Razón social*</label>
                    <BaseTextField 
                        v-model="form.name" 
                        :placeholder="form.nameError && submitted ? 'Debes introducir la razón social' : 'Ejemplo: Tecnologías Innovadoras S.A.'" 
                        :error="form.nameError && submitted" 
                    />
                </section>
                <section class="mb-4">
                    <label class="text-sm font-medium mb-[6px] block">Domicilio fiscal*</label>
                    <input
                        v-model="form.address"
                        id="fiscal_address"
                        type="text"
                        :placeholder="form.addressError && submitted ? 'Debes introducir el domicilio fiscal' : 'Ejemplo: Plaza Trinidad 15, 5C - Sevilla'"
                        class="h-10 rounded-[6px] text-sm font-medium w-full pl-3 hinput border"
                        :class="form.addressError && submitted ? 'border-red-500 placeholder:text-red-500' : form.address ? 'border-black hinput-green' : 'hborder-gray-400'"
                    >
                </section>
                <section class="mb-4">
                    <label class="text-sm font-medium mb-[6px] block">NIF*</label>
                    <BaseTextField 
                        v-model="form.nif" 
                        :placeholder="form.nifError && submitted ? 'Debes introducir NIF' : 'Ejemplo: A87654321'" 
                        :error="form.nifError && submitted" 
                    />
                </section>
                <section class="mb-6">
                    <label class="text-sm font-medium mb-[6px] block">Correo electrónico de la empresa*</label>
                    <BaseTextField 
                        v-model="form.email" 
                        :placeholder="form.emailError && submitted ? 'Introduce el correo electrónico de la empresa' : 'Ejemplo: direccion@dominio.com'" 
                        :error="form.emailError && submitted || !isEmailValid"
                    />
                    <div v-if="!isEmailValid" class="flex mt-1 text-[#FF6666] justify-left">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="mr-1 bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
                            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                        </svg>
                        <small>El formato de correo electrónico introducido es incorrecto</small>
                    </div>
                </section>
                <section class="flex justify-between items-center">
                    <label class="text-sm font-semibold">¿Cuentan con delegado de protección de datos?</label>
                    <div class="flex">
                        <span class="text-sm font-semibold mr-1">{{ form.protection ? 'Si' : 'No' }}</span>
                        <BaseSwitchInput v-model="form.protection" id="dataProtectionSwitch" />
                    </div>
                </section>
                <transition name="fade">
                    <section v-if="form.protection" class="mb-6">
                        <label class="text-sm font-medium mb-[6px] block">Correo electrónico del delegado*</label>
                        <BaseTextField 
                            v-model="form.email_protection" 
                            :placeholder="form.emailProtectionError && submitted ? 'Introduce el correo electrónico del delegado' : 'Ejemplo: direccion2@dominio.com'" 
                            :error="form.emailProtectionError && submitted || !isEmailProtectionValid" 
                            ref="emailProtectionInput"
                        />
                        <div v-if="!isEmailProtectionValid" class="flex mt-1 text-[#FF6666] justify-left">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="mr-1 bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
                                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                            </svg>
                            <small>El formato de correo electrónico introducido es incorrecto</small>
                        </div>
                    </section>
                </transition>
            </div>
        </div>
    </div>
    <div class="border-t hbg-white-100 p-6 sticky bottom-0 flex justify-between z-10">
        <button
            class="hbtn-tertiary text-sm underline"
            :disabled="!changes"
            @click="cancelChange"
        >
            Cancelar
        </button>
        <button
            class="px-4 text-sm font-medium h-11 "
            :class="{ 
                'hbtn-cta-disabled': !changes || !valid,
                'hbtn-cta': changes && valid
            }"
            @click="submit"
        >
            Guardar
        </button>
    </div>

    <ModalNoSave
        :id="'not-saved'"
        :open="changes && valid"
        text="Tienes cambios sin guardar. Para aplicar los cambios realizados debes guardar."
        textbtn="Guardar"
        @saveChanges="submit"
        type="save_changes"
    />
</template>

<script setup>
import { ref, reactive, onMounted, nextTick, watch } from 'vue';
import HeadLegal from './components/HeadLegal.vue';
import TabLegal from './components/TabLegal.vue';
import SectionConfig from '@/components/SectionConfig.vue';
import BaseSwitchInput from "@/components/Forms/BaseSwichInput.vue";
import { storeGeneralLegal, getGeneralLegal } from '@/api/services/legal/legal.services';
import BaseTextField from '@/components/Forms/BaseTextField.vue';
import { useToastAlert } from '@/composables/useToastAlert';
import ModalNoSave from '@/components/ModalNoSave.vue'

const toast = useToastAlert();

const form = reactive({
    name: '',
    address: '',
    nif: '',
    email: '',
    protection: false,
    email_protection: '',
    nameError: false,
    addressError: false,
    nifError: false,
    emailError: false,
    emailProtectionError: false
});

const initialForm = ref(null);
const submitted = ref(false); 
const isEmailProtectionValid = ref(false);
const isEmailValid = ref(false);
const changes = ref(false); 
const valid = ref(false); 

onMounted(async () => {
    isEmailProtectionValid.value = true;
    isEmailValid.value = true;
    await getData();
    initialForm.value = JSON.stringify(form);
    validateForm(); 
    loadGoogleMapsScript();
});

const getData = async() => {
    const response = await getGeneralLegal();
    
    form.name = response.data.legal?.name || '';
    form.address = response.data.legal?.address || '';
    form.nif = response.data.legal?.nif || '';
    form.email = response.data.legal?.email || '';
    form.protection = response.data.legal?.protection || false;
    form.email_protection = response.data.legal?.email_protection || '';

    validateForm();
};

watch([() => form.name, () => form.address, () => form.nif, () => form.email, () => form.email_protection, () => form.protection], validateForm);

function validateForm() {
    submitted.value = false;
    
    // Validación independiente para el email principal
    isEmailValid.value = validateEmail(form.email);
    form.emailError = !form.email.trim() || !isEmailValid.value;

    // Validación independiente para el email de protección de datos
    isEmailProtectionValid.value = validateEmail(form.email_protection);
    form.emailProtectionError = form.protection && (!form.email_protection.trim() || !isEmailProtectionValid.value);

    // Verificación de otros campos
    form.nameError = !form.name.trim();
    form.addressError = !form.address.trim();
    form.nifError = !form.nif.trim();

    // Calcular si el formulario es válido
    valid.value = !form.nameError && !form.addressError && !form.nifError &&
                  !form.emailError && (!form.protection || !form.emailProtectionError);

    // Determinar si hay cambios
    changes.value = JSON.stringify(form) !== initialForm.value;
}

function validateEmail(email) {
    if (email === '') return true; 
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function cancelChange() {
    Object.assign(form, JSON.parse(initialForm.value));
    validateForm();
}

async function submit() {
    if(!changes.value || !valid.value){
        submitted.value = true;
        return;
    }else{
        submitted.value = false;
    }
    validateForm();  

    // if (!valid.value) {
    //     /* toast.errorToast('Por favor, complete todos los campos requeridos.', 'top-right'); */
    //     return;
    // } 

    const response = await storeGeneralLegal(form);

    if (response.ok) {
        toast.warningToast('Guardado con éxito', 'top-right');
        initialForm.value = JSON.stringify(form);
        changes.value = false;
        submitted.value = false; // Reiniciar la bandera de submit después de guardar
    } else {
        toast.errorToast('Ha ocurrido un error al guardar los cambios', 'top-right');
    }
}

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

const emailProtectionInput = ref(null);
watch(() => form.protection, (newValue) => {
    nextTick(() => {
        if (newValue) {
            if (emailProtectionInput.value) {
                emailProtectionInput.value.$el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        } else {
            const switchElement = document.getElementById('dataProtectionSwitch');
            if (switchElement) {
                switchElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});
</script>
<style scoped>


.hbtn-cta-disabled{
    background-color: #DADADA !important;
    border-radius: 6px;
    color:  #A0A0A0;
}
</style>
