<template>
    <div class="flex flex-col min-h-screen">
        <div class="px-6 flex-grow">
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
                <div class="w-full h-min mb-4 px-4 py-6 bg-white shadow-md rounded-lg flex flex-col gap-2">
                    <span class="font-medium text-sm">Alojamiento 1</span>
                    <div :class="['flex', hoverValidation.booking ? 'border-green-500' : 'border-gray-300']">
                        <span :class="['inline-flex items-center px-2 text-sm text-gray-900 border border-e-0 pr-6', hoverValidation.booking ? 'border-green-500' : 'border-gray-300', 'rounded-s-md']">
                            <img src="/assets/icons/otas/Booking.svg" class="w-8 h-8 mr-2" alt="Booking">
                            <span class="font-semibold text-sm">Booking</span>
                        </span>
                        <input type="text" v-model="form.booking" :class="['rounded-none rounded-e-lg border block flex-1 min-w-0 w-full text-sm p-2.5', hoverValidation.booking ? 'border-green-500 focus:ring-green-500 text-green-500' : 'border-gray-300 focus:ring-green-500 placeholder:text-[#A0A0A0] placeholder:font-medium placeholder:text-[14px]']" placeholder="Escribe URL" @input="marcarCambio('booking')">
                    </div>
                </div>
                <div class="w-full h-min mb-4 px-4 py-6 bg-white shadow-md rounded-lg flex flex-col gap-2">
                    <span class="font-medium text-sm">Alojamiento 1</span>
                    <div :class="['flex', hoverValidation.tripadvisor ? 'border-green-500' : 'border-gray-300']">
                        <span :class="['inline-flex items-center px-2 text-sm text-gray-900 border border-e-0', hoverValidation.tripadvisor ? 'border-green-500' : 'border-gray-300', 'rounded-s-md']">
                            <img src="/assets/icons/otas/Tripadvisor.svg" class="w-8 h-8 mr-2" alt="Tripadvisor">
                            <span class="font-semibold text-sm">Tripadvisor</span>
                        </span>
                        <input type="text" v-model="form.tripadvisor" :class="['rounded-none rounded-e-lg border block flex-1 min-w-0 w-full text-sm p-2.5', hoverValidation.tripadvisor ? 'border-green-500 focus:ring-green-500 text-green-500' : 'border-gray-300 focus:ring-green-500 placeholder:text-[#A0A0A0] placeholder:font-medium placeholder:text-[14px]']" placeholder="Escribe URL" @input="marcarCambio('tripadvisor')">
                    </div>
                </div>
                <div class="w-full h-min mb-4 px-4 py-6 bg-white shadow-md rounded-lg flex flex-col gap-2">
                    <span class="font-medium text-sm">Alojamiento 1</span>
                    <div :class="['flex', hoverValidation.expedia ? 'border-green-500' : 'border-gray-300']">
                        <span :class="['inline-flex items-center px-2 text-sm text-gray-900 border border-e-0 pr-6', hoverValidation.expedia ? 'border-green-500' : 'border-gray-300', 'rounded-s-md']">
                            <img src="/assets/icons/otas/Expedia.svg" class="w-8 h-8 mr-2" alt="Expedia">
                            <span class="font-semibold text-sm">Expedia</span>
                        </span>
                        <input type="text" v-model="form.expedia" :class="['rounded-none rounded-e-lg border block flex-1 min-w-0 w-full text-sm p-2.5', hoverValidation.expedia ? 'border-green-500 focus:ring-green-500 text-green-500' : 'border-gray-300 focus:ring-green-500 placeholder:text-[#A0A0A0] placeholder:font-medium placeholder:text-[14px]']" placeholder="Escribe URL" @input="marcarCambio('expedia')">
                    </div>
                </div>
                <div class="w-full h-min mb-4 px-4 py-6 bg-white shadow-md rounded-lg flex flex-col gap-2">
                    <span class="font-medium text-sm">Alojamiento 1</span>
                    <div :class="['flex', hoverValidation.google ? 'border-green-500' : 'border-gray-300']">
                        <span :class="['inline-flex items-center px-2 text-sm text-gray-900 border border-e-0 pr-6', hoverValidation.google ? 'border-green-500' : 'border-gray-300', 'rounded-s-md']">
                            <img src="/assets/icons/otas/Google.svg" class="w-8 h-8 mr-2" alt="Google">
                            <span class="font-semibold text-sm">Google</span>
                        </span>
                        <input type="text" v-model="form.google" :class="['rounded-none rounded-e-lg border block flex-1 min-w-0 w-full text-sm p-2.5', hoverValidation.google ? 'border-green-500 focus:ring-green-500 text-green-500' : 'border-gray-300 focus:ring-green-500 placeholder:text-[#A0A0A0] placeholder:font-medium placeholder:text-[14px]']" placeholder="Escribe URL" @input="marcarCambio('google')">
                    </div>
                </div>
            </div>
            <ModalNoSave
                :id="'not-saved'"
                :open="true"
                text="Tienes cambios sin guardar. Para aplicar los cambios realizados debes guardar."
                textbtn="Guardar"
                @saveChanges="submit"
                type="save_changes"
            />
        </div> 
        <ChangesBar 
            :existingChanges="changes > 0" :validChanges="valid"
            @cancel="cancelarCambios" @submit="submit"
        />
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useUserStore } from '@/stores/modules/users/users';
import { useToastAlert } from '@/composables/useToastAlert';
import { useRouter } from 'vue-router';
import Tooltip from '@/components/Tooltip.vue';
import ChangesBar from '@/components/Forms/ChangesBar.vue';
import ModalNoSave from '@/components/ModalNoSave.vue';

const userStore = useUserStore();
const toast = useToastAlert();
const router = useRouter();

const hoverValidation = ref({
    booking: false,
    tripadvisor: false,
    expedia: false,
    google: false
});
const changes = ref(0);

const form = ref({
    booking: '',
    tripadvisor: '',
    expedia: '',
    google: ''
});

const submit = () => {
    alert('Cambios guardados');
    changes.value = 0;
}

const cancelarCambios = () => {
    alert('Cambios cancelados');
    changes.value = 0;
}

const valid = computed(() => {
    return changes.value > 0;
});

const marcarCambio = (field) => {
    changes.value += 1;
    hoverValidation.value[field] = form.value[field].length > 0;
};

onMounted(async () => {
    try {
        const response = await userStore.$getDataOTAS();
        if (response && response.data && response.data.otas.otas) {
            response.data.otas.otas.forEach(ota => {
                switch(ota.ota.toLowerCase()) {
                    case 'tripadvisor':
                        form.value.tripadvisor = ota.url;
                        hoverValidation.value.tripadvisor = ota.url.length > 0;
                        break;
                    case 'expedia':
                        form.value.expedia = ota.url;
                        hoverValidation.value.expedia = ota.url.length > 0;
                        break;
                    case 'booking':
                        form.value.booking = ota.url;
                        hoverValidation.value.booking = ota.url.length > 0;
                        break;
                    case 'google':
                        form.value.google = ota.url;
                        hoverValidation.value.google = ota.url.length > 0;
                        break;
                }
            });
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        // El formulario se queda vacío si hay un error
    }
});
</script>
