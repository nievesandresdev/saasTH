<template>
    <div class="flex flex-col min-h-screen">
        <div class="px-6 flex-grow min-h-screen">
            <h1 class="text-[22px] font-medium leading-[110%] py-5 flex gap-2">
                Plataformas externas
                <Tooltip size="s" :top="25" :left="5">
                    <template v-slot:button>
                        <img class="w-6 h-6" src="/assets/icons/info.blue.svg">
                    </template>
                    <template v-slot:content>
                        <p class="text-sm">Configura los enlaces a las distintas plataformas externas en las que se encuentra tu alojamiento.</p>
                    </template>
                </Tooltip>
            </h1>
            <hr class="mb-5">

            <div class="font-montserrat">
                <!-- Booking -->
                <div class="w-full h-min mb-4 px-4 py-6 bg-white shadow-md rounded-lg flex flex-col gap-2">
                    <div class="flex justify-between">
                        <div class="flex">
                            <img src="/assets/icons/otas/Booking.svg" class="w-6 h-6 mr-2" alt="Booking">
                            <span class="font-semibold text-sm">Booking</span>
                        </div>
                        <div class="flex cursor-pointer items-center" @click="changeUrlModal('booking', form.booking.url)">
                            <img src="/assets/icons/Group3421.svg" class="w-4 h-4 mr-2" alt="Group 3421">
                            <span class="text-sm font-medium">¿Necesitas cambiar el enlace?</span>
                        </div>
                    </div>
                    <div :class="['flex', errors.booking ? 'border-red-500' : hoverValidation.booking ? 'border-green-500' : 'border-gray-300']">
                        <input type="text" v-model="form.booking.url" :class="['rounded-md border block flex-1 min-w-0 w-full text-sm p-2.5', errors.booking ? 'border-red-500 text-red-500' : hoverValidation.booking ? 'border-green-500 focus:ring-green-500 text-green-500' : 'border-gray-300 focus:ring-green-500 placeholder:text-[#A0A0A0] placeholder:font-medium placeholder:text-[14px]']" placeholder="Escribe URL" @input="marcarCambio('booking')" :disabled="disabledInput.booking">
                    </div>
                    <div v-if="errors.booking" class="flex items-center text-red-500 text-[12px] font-semibold mt-1">
                        <img src="/assets/icons/1.TH.WARNING-RED.svg" class="w-4 h-4 mr-2" alt="Warning">
                        <p class="text-red-500">{{ errorMessage.booking }}</p>
                    </div>
                </div>
                
                <!-- Expedia -->
                <div class="w-full h-min mb-4 px-4 py-6 bg-white shadow-md rounded-lg flex flex-col gap-2">
                    <div class="flex justify-between">
                        <div class="flex">
                            <img src="/assets/icons/otas/Expedia.svg" class="w-6 h-6 mr-2" alt="Expedia">
                            <span class="font-semibold text-sm">Expedia</span>
                        </div>
                        <div class="flex cursor-pointer items-center" @click="changeUrlModal('expedia', form.expedia.url)">
                            <img src="/assets/icons/Group3421.svg" class="w-4 h-4 mr-2" alt="Group 3421">
                            <span class="text-sm font-medium">¿Necesitas cambiar el enlace?</span>
                        </div>
                    </div>
                    <div :class="['flex', errors.expedia ? 'border-red-500' : hoverValidation.expedia ? 'border-green-500' : 'border-gray-300']">
                        <input type="text" v-model="form.expedia.url" :class="['rounded-md border block flex-1 min-w-0 w-full text-sm p-2.5', errors.expedia ? 'border-red-500 text-red-500' : hoverValidation.expedia ? 'border-green-500 focus:ring-green-500 text-green-500' : 'border-gray-300 focus:ring-green-500 placeholder:text-[#A0A0A0] placeholder:font-medium placeholder:text-[14px]']" placeholder="Escribe URL" @input="marcarCambio('expedia')" :disabled="disabledInput.expedia">
                    </div>
                    <div v-if="errors.expedia" class="flex items-center text-red-500 text-[12px] font-semibold mt-1">
                        <img src="/assets/icons/1.TH.WARNING-RED.svg" class="w-4 h-4 mr-2" alt="Warning">
                        <p class="text-red-500">{{ errorMessage.expedia }}</p>
                    </div>
                </div>

                <!-- Tripadvisor -->
                <div class="w-full h-min mb-4 px-4 py-6 bg-white shadow-md rounded-lg flex flex-col gap-2">
                    <div class="flex justify-between">
                        <div class="flex">
                            <img src="/assets/icons/otas/Tripadvisor.svg" class="w-6 h-6 mr-2" alt="Tripadvisor">
                            <span class="font-semibold text-sm">Tripadvisor</span>
                        </div>
                        <div class="flex cursor-pointer items-center" @click="changeUrlModal('tripadvisor', form.tripadvisor.url)">
                            <img src="/assets/icons/Group3421.svg" class="w-4 h-4 mr-2" alt="Group 3421">
                            <span class="text-sm font-medium">¿Necesitas cambiar el enlace?</span>
                        </div>
                    </div>
                    <div :class="['flex', errors.tripadvisor ? 'border-red-500' : hoverValidation.tripadvisor ? 'border-green-500' : 'border-gray-300']">
                        <input type="text" v-model="form.tripadvisor.url" :class="['rounded-md border block flex-1 min-w-0 w-full text-sm p-2.5', errors.tripadvisor ? 'border-red-500 text-red-500' : hoverValidation.tripadvisor ? 'border-green-500 focus:ring-green-500 text-green-500' : 'border-gray-300 focus:ring-green-500 placeholder:text-[#A0A0A0] placeholder:font-medium placeholder:text-[14px]']" placeholder="Escribe URL" @input="marcarCambio('tripadvisor')" :disabled="disabledInput.tripadvisor">
                    </div>
                    <div v-if="errors.tripadvisor" class="flex items-center text-red-500 text-[12px] font-semibold mt-1">
                        <img src="/assets/icons/1.TH.WARNING-RED.svg" class="w-4 h-4 mr-2" alt="Warning">
                        <p class="text-red-500">{{ errorMessage.tripadvisor }}</p>
                    </div>
                </div>

                <!-- Google -->
                <div class="w-full h-min mb-4 px-4 py-6 bg-white shadow-md rounded-lg flex flex-col gap-2">
                    <div class="flex justify-between">
                        <div class="flex">
                            <img src="/assets/icons/otas/Google.svg" class="w-6 h-6 mr-2" alt="Google">
                            <span class="font-semibold text-sm">Google</span>
                        </div>
                        <div class="flex cursor-pointer items-center" @click="changeUrlModal('google', form.google.url)">
                            <img src="/assets/icons/Group3421.svg" class="w-4 h-4 mr-2" alt="Group 3421">
                            <span class="text-sm font-medium">¿Necesitas cambiar el enlace?</span>
                        </div>
                    </div>
                    <div :class="['flex', errors.google ? 'border-red-500' : hoverValidation.google ? 'border-green-500' : 'border-gray-300']">
                        <input type="text" v-model="form.google.url" :class="['rounded-md border block flex-1 min-w-0 w-full text-sm p-2.5', errors.google ? 'border-red-500 text-red-500' : hoverValidation.google ? 'border-green-500 focus:ring-green-500 text-green-500' : 'border-gray-300 focus:ring-green-500 placeholder:text-[#A0A0A0] placeholder:font-medium placeholder:text-[14px]']" placeholder="Escribe URL" @input="marcarCambio('google')" :disabled="disabledInput.google">
                    </div>
                    
                    <div v-if="errors.google" class="flex items-center text-red-500 text-[12px] font-semibold mt-1">
                        <img src="/assets/icons/1.TH.WARNING-RED.svg" class="w-4 h-4 mr-2" alt="Warning">
                        <p class="text-red-500">{{ errorMessage.google }}</p>
                    </div>
                </div>
                
                <!-- Airbnb -->
                <div class="w-full h-min mb-4 px-4 py-6 bg-white shadow-md rounded-lg flex flex-col gap-2">
                    <div class="flex justify-between">
                        <div class="flex">
                            <img src="/assets/icons/otas/Airbnb.svg" class="w-6 h-6 mr-2" alt="Airbnb">
                            <div class="flex gap-2 items-center">
                                <span class="font-semibold text-sm">Airbnb</span>
                                <Tooltip size="s" :top="25" :left="5">
                                    <template v-slot:button>
                                        <img class="w-5 h-5" src="/assets/icons/info.blue.svg">
                                    </template>
                                    <template v-slot:content>
                                        <p class="text-sm">Si tienes más de una propiedad en AirBnb podrás añadirla aquí.</p>
                                    </template>
                                </Tooltip>
                            </div>
                        </div>
                        <div class="flex cursor-pointer items-center" @click="changeUrlModal('airbnb', form.airbnb.url)">
                            <img src="/assets/icons/Group3421.svg" class="w-4 h-4 mr-2" alt="Group 3421">
                            <span class="text-sm font-medium">¿Necesitas cambiar el enlace?</span>
                        </div>
                    </div>
                    <div :class="['flex', errors.airbnb ? 'border-red-500' : hoverValidation.airbnb ? 'border-green-500' : 'border-gray-300']">
                        <input type="text" v-model="form.airbnb.url" :class="['rounded-md border block flex-1 min-w-0 w-full text-sm p-2.5', errors.airbnb ? 'border-red-500 text-red-500' : hoverValidation.airbnb ? 'border-green-500 focus:ring-green-500 text-green-500' : 'border-gray-300 focus:ring-green-500 placeholder:text-[#A0A0A0] placeholder:font-medium placeholder:text-[14px]']" placeholder="Escribe URL" @input="marcarCambio('airbnb')">
                    </div>
                    <div v-if="errors.airbnb" class="flex items-center text-red-500 text-[12px] font-semibold mt-1">
                        <img src="/assets/icons/1.TH.WARNING-RED.svg" class="w-4 h-4 mr-2" alt="Warning">
                        <p class="text-red-500">{{ errorMessage.airbnb }}</p>
                    </div>
                    <div class="flex items-center mt-3 cursor-pointer" @click="addAnotherLink">
                        <img src="/assets/icons/1.TH.PLUS.svg" class="w-4 h-4 mr-2" alt="Add Another Link">
                        <span class="text-sm font-medium">Añadir otro enlace</span>
                    </div>
                    <div v-for="(link, index) in additionalLinks" :key="index" class="mt-3" v-if="link?.status !== 0">
                        <div :class="['flex', link.errors ? 'border-red-500' : link.hoverValidation ? 'border-green-500' : 'border-gray-300']">
                            <input type="text" v-model="link.url" :class="['rounded-md border block flex-1 min-w-0 w-full text-sm p-2.5', link.errors ? 'border-red-500 text-red-500' : link.hoverValidation ? 'border-green-500 focus:ring-green-500 text-green-500' : 'border-gray-300 focus:ring-green-500 placeholder:text-[#A0A0A0] placeholder:font-medium placeholder:text-[14px]']" placeholder="Escribe URL" @input="markAdditionalLinkChange(index)">
                        </div>
                        <div class="flex items-center mt-3 cursor-pointer justify-end" @click="openDeleteModal(index)">
                            <img :class="['w-4 h-4 mr-2', {'text-green-500': link.url.length}]" src="/assets/icons/1.TH.DELETE.OUTLINE.svg" alt="Delete Link">
                            <span :class="['text-sm font-medium', {'text-green-500': link.url.length}]">Eliminar</span>
                        </div>
                        <div v-if="link.errors" class="flex items-center text-red-500 text-[12px] font-semibold mt-1">
                            <img src="/assets/icons/1.TH.WARNING-RED.svg" class="w-4 h-4 mr-2" alt="Warning">
                            <p class="text-red-500">{{ link.errorMessage }}</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <ModalNoSave
                :id="'not-saved'"
                :open="changesComputed && valid"
                text="Tienes cambios sin guardar. Para aplicar los cambios realizados debes guardar."
                textbtn="Guardar"
                @saveChanges="submit"
                type="save_changes"
            />
            <ModalDeleteURL :open="openModalDeleteURL" @submit:delete="submitDelete" @close:modal="openDeleteModal" />
            <ModalChangeURL :open="openModalchangeUrl" @submit:change="handleEmail" @close:change="changeUrlModal" />
        </div> 
        <ChangesBar 
            :existingChanges="changesComputed"
            :validChanges="changesComputed && valid"
            @cancel="cancelChange" 
            @submit="submit"
        />
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed, watch } from 'vue';
import Tooltip from '@/components/Tooltip.vue';
import ChangesBar from '@/components/Forms/ChangesBar.vue';
import ModalNoSave from '@/components/ModalNoSave.vue';
import ModalDeleteURL from './components/ModalDeleteURL.vue';
import ModalChangeURL from './components/ModalChangeURL.vue';
import { platformsExternalStore } from '@/stores/modules/platformsExternal/platformsExternal';
import { useAuthStore } from '@/stores/modules/auth/login';
import { useToastAlert } from '@/composables/useToastAlert';
import { useRouter } from 'vue-router';
import { $getPropertyInUrl } from '@/utils/helpers';
import {
    requestChangeUrlApi,
} from '@/api/services/platforms/platformsServices'

const platformsStore = platformsExternalStore();
const authStore = useAuthStore();
const toast = useToastAlert();
const router = useRouter();

const dataMail = ref(null);
const dataMailtype = ref(null);
const openModalDeleteURL = ref(false);
const openModalchangeUrl = ref(false);
const indexToDelete = ref(null);

const hoverValidation = ref({
    booking: false,
    tripadvisor: false,
    expedia: false,
    google: false,
    airbnb: false
});
const errors = ref({
    booking: false,
    tripadvisor: false,
    expedia: false,
    google: false,
    airbnb: false
});
const errorMessage = ref({
    booking: '',
    tripadvisor: '',
    expedia: '',
    google: '',
    airbnb: ''
});
const changes = ref(0);

const form = reactive({
    booking: { url: '', _id: null },
    tripadvisor: { url: '', _id: null },
    google: { url: '', _id: null },
    expedia: { url: '', _id: null },
    airbnb: { url: '', _id: null }
});

const disabledInput = ref({
    booking: false,
    tripadvisor: false,
    expedia: false,
    google: false,
    airbnb: false
});

const additionalLinks = ref([]);
const initialForm = ref(null);

onMounted(async () => {
    await getSettings();
    initialForm.value = JSON.stringify({ ...form, additionalLinks: additionalLinks.value });
});

const getSettings = async () => {

    const params = {
        googleMapCid: $getPropertyInUrl(authStore.current_hotel.url_google, 'cid'),
    }
    
    try {
        const response = await platformsStore.$getDataOTAS(params);
        if (response && response.data && response.data.otas) {
            response.data.otas.forEach(ota => {
                switch(ota.ota.toLowerCase()) {
                    case 'tripadvisor':
                        disabledInput.value.tripadvisor = ota.attemptsToUpdate >= 3;
                        form.tripadvisor.url = ota.url;
                        form.tripadvisor._id = ota._id;
                        hoverValidation.value.tripadvisor = ota.url.length > 0;
                        break;
                    case 'expedia':
                        disabledInput.value.expedia = ota.attemptsToUpdate >= 3;
                        form.expedia.url = ota.url;
                        form.expedia._id = ota._id;
                        hoverValidation.value.expedia = ota.url.length > 0;
                        break;
                    case 'google':
                        disabledInput.value.google = ota.attemptsToUpdate >= 3;
                        form.google.url = ota.url;
                        form.google._id = ota._id;
                        hoverValidation.value.google = ota.url.length > 0;
                        break;
                    case 'booking':
                        disabledInput.value.booking = ota.attemptsToUpdate >= 3;
                        form.booking.url = ota.url;
                        form.booking._id = ota._id;
                        hoverValidation.value.booking = ota.url.length > 0;
                        break;
                    case 'airbnb':
                        form.airbnb.url = ota.url;
                        form.airbnb._id = ota._id;
                        hoverValidation.value.airbnb = ota.url.length > 0;
                        break;
                }
            });
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const validateUrl = (url, type) => {
    console.log('Validating:', url, type);

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
    const pathname = urlParts.pathname + urlParts.search + urlParts.hash; // /path/to/

    // Verifica que el dominio termine en .com
    if (!hostname.endsWith('.com')) {
        return 'El dominio del enlace es incorrecto. Asegúrate que termine en ".com".';
    }

    switch (type) {
        case 'booking':
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
            if (!pathname.startsWith('/maps/place/')) {
                return 'El formato del enlace de Google es incorrecto. Debe empezar con "/maps/place/".';
            }
            break;
        case 'airbnb':
            console.log('Validating Airbnb:', url);
            break;
        default:
            return 'Tipo de enlace no soportado';
    }

    return null;
};

const marcarCambio = (field) => {
    changes.value += 1;
    const validationError = validateUrl(form[field].url, field);
    if (!validationError) {
        hoverValidation.value[field] = true;
        errors.value[field] = false;
        errorMessage.value[field] = '';
    } else {
        hoverValidation.value[field] = false;
        errors.value[field] = true;
        errorMessage.value[field] = validationError;
    }
};

const markAdditionalLinkChange = (index) => {
    changes.value += 1;  // Incrementa el contador de cambios cada vez que se verifica un enlace.
    const validationError = validateUrl(additionalLinks.value[index].url, 'airbnb');
    if (!validationError) {
        additionalLinks.value[index].hoverValidation = true;
        additionalLinks.value[index].errors = false;
        additionalLinks.value[index].errorMessage = '';
    } else {
        additionalLinks.value[index].hoverValidation = false;
        additionalLinks.value[index].errors = true;
        additionalLinks.value[index].errorMessage = validationError;
    }
};

const addAnotherLink = () => {
    additionalLinks.value.push({ url: '', _id: null, hoverValidation: false, errors: false, errorMessage: '', status: 1 });
};

const openDeleteModal = (index) => {
    indexToDelete.value = index;
    openModalDeleteURL.value = !openModalDeleteURL.value;
};

const submitDelete = () => {
    const index = indexToDelete.value;
    if (additionalLinks.value[index].url === '') {
        additionalLinks.value.splice(index, 1);
    } else {
        additionalLinks.value[index].status = 0;
    }
    openModalDeleteURL.value = false;
    changes.value += 1;
};

const changeUrlModal = (type, url) => {
    dataMail.value = url;
    dataMailtype.value = type;

    openModalchangeUrl.value = !openModalchangeUrl.value;
};

const cancelChange = () => {
    const oldValues = JSON.parse(initialForm.value);
    form.booking = oldValues.booking;
    form.tripadvisor = oldValues.tripadvisor;
    form.expedia = oldValues.expedia;
    form.google = oldValues.google;
    form.airbnb = oldValues.airbnb;
    additionalLinks.value = oldValues.additionalLinks || [];
    Object.keys(errors.value).forEach(key => errors.value[key] = false);
};

const handleEmail = async () => {
    const payload = {
        booking: form.booking,
        tripadvisor: form.tripadvisor,
        expedia: form.expedia,
        google: form.google,
        airbnb: additionalLinks.value.filter(link => link.status !== 0)
    };
    console.log('handleEmail:', dataMail.value);

    const params = {
        type: dataMailtype.value,
        url: dataMail.value,
        init : initialForm.value,
        end : JSON.stringify(payload)
    }

    const response = await requestChangeUrlApi(params);   
    
    if(response.ok){
        toast.warningToast(response.data.message, 'top-right')
        openModalchangeUrl.value = false;
    }else{
        toast.errorToast(response.data.message, 'top-right')
    }
    initialForm.value = JSON.stringify({ ...form, additionalLinks: additionalLinks.value }); // Update the initial state after saving
};

const submit = async () => {
    const payload = [];

    const buildPayloadEntry = (otaName, data) => {
        if (data.url) {
            payload.push({
                ota: otaName.toUpperCase(),
                url: data.url,
                _id: data._id || null
            });
        }
    };

    buildPayloadEntry('booking', form.booking);
    buildPayloadEntry('tripadvisor', form.tripadvisor);
    buildPayloadEntry('expedia', form.expedia);
    buildPayloadEntry('google', form.google);
    buildPayloadEntry('airbnb', form.airbnb);

    additionalLinks.value.filter(link => link.status !== 0).forEach(link => {
        payload.push({
            ota: 'AIRBNB',
            url: link.url,
            _id: link._id || null
        });
    });

    console.log('Saving changes:', payload);

    const params = {
        googleMapCid: $getPropertyInUrl(authStore.current_hotel.url_google, 'cid'),
        urls: payload
    }

    const response = await platformsStore.$bulkUpdateOTAS(params);

    if(response.ok){
        toast.warningToast('Cambios aplicados con éxito', 'top-right')
    }else{
        toast.errorToast(response.data.message, 'top-right')
    }

    initialForm.value = JSON.stringify({ ...form, additionalLinks: additionalLinks.value }); // Update the initial state after saving
};

const changesComputed = computed(() => {
    return JSON.stringify({ ...form, additionalLinks: additionalLinks.value }) !== initialForm.value;
});

const valid = computed(() => {
    return !Object.values(errors.value).some(error => error) && additionalLinks.value.every(link => !link.errors && link.url);
});

watch(form, () => {}, { deep: true });
watch(additionalLinks, () => {}, { deep: true });

</script>
