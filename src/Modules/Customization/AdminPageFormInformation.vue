<template>
    <div class="mt-6 space-y-6">
        <div class="px-4 py-6 rounded-[10px] hbg-white-100 card-form">
            <h2 class="text-base font-medium mb-6">Enlace de acceso a la WebApp</h2>
            <div class="w-[587px] 3xl:w-[587px]">
                <div class="flex items-start w-full">
                    <div class="flex items-start w-full">
                        <div class="h-[40px] flex items-center">
                            <span class="text-sm font-medium inline-block">https://</span>
                        </div>
                        <BaseTextField
                            v-model="form.subdomain"
                            placeholder="Subdominio..."
                            class-content="flex-1 mx-2"
                            :max="'20'"
                            :min="'12'"
                            name="subdomain"
                            :errors="errors"
                            @blur:validate="validate('subdomain')"
                        />
                        <div class="h-[40px] flex items-center">
                            <span class="text-sm font-medium inline-block">.thehoster.io</span>
                        </div>
                    </div>
                    <div class="h-[40px] flex items-center">
                        <BaseTooltipResponsive
                            size="l"
                            :top="25"
                            :right="0"
                        >
                            <template v-slot:button>
                                <img
                                    src="/assets/icons/info.blue.svg"
                                    class="w-5 h-5 ml-1"
                                    alt="icon_info"
                                >
                            </template>
                            <template v-slot:content>
                                <p class="text-sm font-normal mb-4">Para usar tu propio subdominio, por favor solicítalo contactando a atención al cliente.</p>
                                <p class="text-sm font-normal mb-4">Puedes contactarnos en el +34 624 149 605 o vía email a la dirección de correo info@thehoster.es</p>
                                <p class="text-sm font-normal">Nuestro horario de atención es de lunes a jueves de 8:30 a 18:30 y los viernes de 8:30 a 14:30.</p>
                            </template>
                        </BaseTooltipResponsive>
                    </div>
                </div>
                <BaseQrCode :url="urlBaseWebapp" hidden-qr ref="qrCodeRef" />
                <div class="flex space-x-4">
                    <button
                        class="hbtn-tertiary hbtn-tertiary-green-hover text-xs font-medium flex"
                        :disabled="form.subdomain != hotelStore.hotelData.subdomain"
                        @click="copyUrlHuesped()"
                    >
                        <img
                            class="w-4 h-4 inline-block mr-2"
                            src="/assets/icons/1.TH.COPY.svg"
                            alt="1.TH.COPY"
                        >
                        Copiar enlace
                    </button>
                    <button
                        class="hbtn-tertiary hbtn-tertiary-green-hover text-xs font-medium flex space-x-2"
                        :disabled="form.subdomain != hotelStore.hotelData.subdomain"
                        @click="donwloadQR()"
                    >
                        <img
                            class="w-4 h-4 inline-block mr-2"
                            src="/assets/icons/1.TH.DOWNLOAD.svg"
                            alt="icons/1.TH.DOWNLOAD.svg"
                        >
                        Descargar QR
                    </button>
                </div>
            </div>
        </div>
        <div class="px-4 py-6 rounded-[10px] hbg-white-100 card-form">
            <div class="space-y-2">
                <h2 class="text-base font-medium">Idioma de la WebApp</h2>
                <p class="text-sm">El huésped utilizará la WebApp en el idioma por defecto de su navegador, siempre que estén dentro de los 6 idiomas con los que contamos.</p>
                <p class="text-sm mt-0.5">Si el idioma de su navegador no es uno de los 6 idiomas con los que contamos, elige el idioma por defecto:</p>
            </div>
            <div class="form-input space-y-2 mt-4">
                <div class="w-[200px]">
                    <BaseSelectField
                        :id="'type_lodging'"
                        :textLabel="'Idioma'"
                        v-model="form.language_default_webapp"
                        :options="OPTIONS_LANGUAGES"
                        :icon_left="`/assets/icons/flags/${form.language_default_webapp}.svg`"
                        mandatory
                        :error="false"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, provide, reactive, onMounted, computed, inject, watch } from 'vue';

import BaseTooltipResponsive from '@/components/BaseTooltipResponsive.vue';
import BaseTextField from '@/components/Forms/BaseTextField.vue';
import BaseSelectField from '@/components/Forms/BaseSelectField.vue';
import BaseQrCode from '@/components/BaseQrCode.vue';

// STATIC
const OPTIONS_LANGUAGES = [
    { value: 'es', label: 'Español', img: '/assets/icons/flags/es.svg' },
    { value: 'en', label: 'Inglés', img: '/assets/icons/flags/en.svg' },
    { value: 'fr', label: 'Francés', img: '/assets/icons/flags/fr.svg' },
    { value: 'pt', label: 'Portugués', img: '/assets/icons/flags/pt.svg' },
    { value: 'it', label: 'Italiano', img: '/assets/icons/flags/it.svg' },
    { value: 'de', label: 'Alemán', img: '/assets/icons/flags/de.svg' },
    // { value: 'd', label: 'Italiano', img: '/assets/icons/flags/it.svg' },
]


// INJECT
const form = inject('form');
const formRules = inject('formRules');
const urlBaseWebapp = inject('urlBaseWebapp');
const errors = inject('errors');
const validateField = inject('validateField');
const loadingVerifySubdomain = inject('loadingVerifySubdomain');
//
const hotelStore = inject('hotelStore');

const qrCodeRef = ref(null);

// WATCH
watch(()=>form.subdomain, (subdomainCurrent) => {
    form.subdomain = subdomainCurrent.trim().replace(/\s+/g, '');
});


const validate = (field) => {
  validateField(field);
  verifySubdomainExist();
}

// FUNCTION
function copyUrlHuesped () {
    qrCodeRef.value.copyUrl();
}
function donwloadQR () {
    qrCodeRef.value.downloadQr();
}
async function verifySubdomainExist () {
     loadingVerifySubdomain.value = true
     if (!form.subdomain || (typeof errors.value?.['subdomain'] === 'string')) return;
     let queryRequest = {
        subdomain: form.subdomain,
     }
    const response = await hotelStore.$verifySubdomainExistPerHotel(queryRequest);
    const  { ok, data } = response;
    if (ok) {
        if (data.exist === true && (typeof errors.value?.subdomain != 'string')) {
            errors.value['subdomain'] = 'Este subdominio ya está siendo usado'
            return;
            // console.log(errors.value, 'errors.value')
        }
        if (!data?.exist || (typeof errors.value?.subdomain != 'string')) {
            errors.value['subdomain'] = true
        }
    }
    loadingVerifySubdomain.value = false;

 }



</script>

<style lang="scss">
    .card-form {
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.15);
    }
</style>