<template>
    <div class="flex flex-col h-full">
        <div class="flex-grow overflow-y-auto">
            <!-- head info -->
            <!-- head -->
            <Header />
        
            <!-- info -->
            <div class="mt-6 px-6">
                <h2 class="text-lg font-medium leading-[120%]">Solicitud en Post-Stay</h2>
                <p class="text-sm leading-[140%] mt-2">Tendrá como objetivo, la segmentación de los huéspedes en base a los feedbacks obtenidos durante la estancia para conocer a que huéspedes solicitar una reseña.</p>
            </div>

            <!-- body section -->
            <section class="px-6 mt-6 mb-10">

                <div class="bg-white py-6 px-4 rounded-[10px] shadow-hoster">
                    <h2 class="text-base font-semibold leading-[120%]">Configuración de la solicitud de reseña en la WebApp</h2>
                    <p class="text-sm leading-[150%] mt-2">Configura cómo será el mensaje que se mostrará a tu huésped tras proporcionar un feedback positivo en Post-Stay.</p>

                    <div class="mt-4">
                        <p class="text-sm font-semibold leading-[120%] mb-2">Título del mensaje</p>
                        <Editor 
                            v-if="form.msg_title"
                            v-model="form.msg_title['es']"
                            placeholder="Debes introducir un texto"
                            showCounter
                            mandatory
                            :maxLength="300"
                            @validation="textTitleFull = $event"
                            countType="static"
                        />
                    </div>

                    <div class="mt-4 relative">
                        <p class="text-sm font-semibold leading-[120%] mb-2">Texto del mensaje</p>
                        <Editor 
                            v-if="form.msg_text"
                            v-model="form.msg_text['es']"
                            placeholder="Debes introducir un texto"
                            showCounter
                            mandatory
                            :maxLength="300"
                            @validation="textBodyFull = $event"
                            countType="static"
                        />
                    </div>

                    <div class="mt-4">
                        <p class="text-sm font-medium leading-[140%]">OTAs habilitadas para la solicitud de reseña:</p>
                        <div class="mt-4">
                            <!-- Booking -->
                            <div class="flex items-center">
                                <Checkbox  v-model="form.otas_enabled_booking"/>
                                <p class="text-xs font-medium leading-[130%] ml-2">Booking</p>
                            </div>
                            <!-- Expedia -->
                            <div class="flex items-center mt-2">
                                <Checkbox   v-model="form.otas_enabled_expedia"/>
                                <p class="text-xs font-medium leading-[130%] ml-2">Expedia</p>
                            </div>
                            <!-- Google -->
                            <div class="flex items-center mt-2">
                                <Checkbox  v-model="form.otas_enabled_google"/>
                                <p class="text-xs font-medium leading-[130%] ml-2">Google</p>
                            </div>
                            <!-- TripAdvisor -->
                            <div class="flex items-center mt-2">
                                <Checkbox  v-model="form.otas_enabled_tripadvisor"/>
                                <p class="text-xs font-medium leading-[130%] ml-2">TripAdvisor</p>
                            </div>
                            <!-- AirBnb -->
                            <div class="flex items-center mt-2">
                                <Checkbox   v-model="form.otas_enabled_airbnb"/>
                                <p class="text-xs font-medium leading-[130%] ml-2">AirBnb</p>
                            </div>
                        </div>
                        <p 
                            class="text-xs font-medium htext-alert-negative mt-2 leading-[90%]"
                            v-if="AnythingSelectedOta"
                        >Debes seleccionar al menos una OTA para solicitar la reseña</p>
                    </div>

                    <div class="mt-4">
                        <p class="text-sm font-medium leading-[140%]">La solicitud de reseña se mostrará a los huéspedes</p>
                        <div class="mt-4">
                            <div class="flex items-center gap-2">
                                <RadioButton :value="DEFAULT_GOOD_STRING" v-model="form.request_to"/>
                                <p class="text-xs leading-[150%]">Con feedback muy bueno o bueno</p>
                                <span class="text-[10px] leading-[110%] ml-1 htext-green-600">Recomendado</span>
                            </div>
                            <div class="flex items-center gap-2 mt-2">
                                <RadioButton :value="DEFAULT_DEFAULT_STRING" v-model="form.request_to"/>
                                <p class="text-xs leading-[150%]">Con feedback muy bueno o bueno, neutral y no respondido</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            
        </div>
        <div>
            <ChangesBar 
                :existingChanges="changes"
                :validChanges="changes && valid"
                @cancel="cancelChanges" 
                @submit="submit"
            />
        </div>
            <ModalNoSave
                :id="'not-saved'"
                :open="changes &&  valid"
                text="Tienes cambios sin guardar. Para aplicar los cambios realizados debes guardar."
                textbtn="Guardar"
                @saveChanges="submit"
                type="save_changes"
            />
    </div>
</template>
<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import Header from './Components/Header.vue'
import ChangesBar from '@/components/Forms/ChangesBar.vue'
import RadioButton from '@/components/Forms/RadioButton.vue';
import ModalNoSave from '@/components/ModalNoSave.vue'
import Editor from '@/components/Forms/Editor.vue'
import Checkbox from '@/components/Forms/Checkbox.vue'
import ToggleButton from '@/components/Buttons/ToggleButton.vue'
import Tooltip from '@/components/Tooltip.vue'
//composable
import { useToastAlert } from '@/composables/useToastAlert'
//STORES
import { useRequestSettingStore } from '@/stores/modules/reviewRequests/reviewRequestSettings'
import { useMockupStore } from '@/stores/modules/mockup'

const mockupStore = useMockupStore();
const requestSettingStore = useRequestSettingStore();
const toast = useToastAlert();

// const urlBase = usePage().props.value.url_base_huesped
// const hotelSubdomain = usePage().props.value.currentHotel.subdomain
onMounted(async ()=>{
    mockupStore.$setIframeUrl('/inbox/fakeLinkOtas','period=post-stay')
    mockupStore.$setInfo1('Edita y guarda para aplicar tus cambios', '/assets/icons/1.TH.EDIT.OUTLINED.svg')
    settings.value = await requestSettingStore.$getAll();
    const data = JSON.parse(JSON.stringify(settings.value));
    assignValuesToForm(data);
    mockupStore.$setLanguageTooltip(true)
})


const settings = ref(null);
const anyEmpty = ref([]);
const anyOverLimit = ref([]);
const beforeUrl = ref({link: null,force: false})
const settingsRef = ref(null);
const textTitleFull = ref(true);
const textBodyFull = ref(true);
const DEFAULT_GOOD_STRING = JSON.stringify(['GOOD','VERYGOOD'])
const DEFAULT_DEFAULT_STRING = JSON.stringify(['GOOD','VERYGOOD','NORMAL','NOTANSWERED'])
// const urlMockup = ref(`${urlBase}/consultas/fakeLinkOtas?mockup=true&subdomain=${hotelSubdomain}`);

const form = reactive({
    msg_title: null,
    msg_text: null,
    otas_enabled_google: null,
    otas_enabled_tripadvisor: null,
    otas_enabled_booking: null,
    otas_enabled_expedia: null,
    otas_enabled_airbnb: null,
    request_to: null,
    otas_enabled: null
});

const submit = async () =>{
    form.otas_enabled = { 
        google: form.otas_enabled_google, 
        tripadvisor: form.otas_enabled_tripadvisor,
        booking: form.otas_enabled_booking,
        expedia: form.otas_enabled_expedia,
        airbnb: form.otas_enabled_airbnb,
    };
    let request  = await requestSettingStore.$updateData(form);
    if(request){
        settingsRef.value = JSON.parse(JSON.stringify(form))
        mockupStore.$reloadIframe();
        toast.warningToast('Cambios guardados con éxito','top-right');
    }
}

function cancelChanges(){
    const data = JSON.parse(JSON.stringify(settingsRef.value));
    assignValuesToForm(data);
}

function assignValuesToForm(data){
    if (data) {
        form.msg_title = data.msg_title;
        form.msg_text = data.msg_text;
        form.otas_enabled_google = data.otas_enabled?.google;
        form.otas_enabled_tripadvisor = data.otas_enabled?.tripadvisor;
        form.otas_enabled_booking = data.otas_enabled?.booking;
        form.otas_enabled_expedia = data.otas_enabled?.expedia;
        form.otas_enabled_airbnb = data.otas_enabled?.airbnb;
        form.request_to = data.request_to;
        // Asegúrate de manejar la estructura de otas_enabled si es necesaria
        form.otas_enabled = { 
            google: form.otas_enabled_google, 
            tripadvisor: form.otas_enabled_tripadvisor,
            booking: form.otas_enabled_booking,
            expedia: form.otas_enabled_expedia,
            airbnb: form.otas_enabled_airbnb,
        };
        settingsRef.value = JSON.parse(JSON.stringify(form))
    }
}


//computed

const changes = computed(()=>{
    if(!settingsRef.value) return

    let changes = JSON.stringify(settingsRef.value.msg_title) !== JSON.stringify(form.msg_title) ||
            JSON.stringify(settingsRef.value.msg_text) !== JSON.stringify(form.msg_text) ||
            settingsRef.value.otas_enabled.google !== form.otas_enabled_google ||
            settingsRef.value.otas_enabled.tripadvisor !== form.otas_enabled_tripadvisor ||
            settingsRef.value.otas_enabled.booking !== form.otas_enabled_booking ||
            settingsRef.value.otas_enabled.expedia !== form.otas_enabled_expedia ||
            settingsRef.value.otas_enabled.airbnb !== form.otas_enabled_airbnb ||
            settingsRef.value.request_to !== form.request_to;
    return changes;
});

const valid = computed(()=>{
    if(!settingsRef.value) return
    let valid = !!form.msg_title?.es && textTitleFull.value && textBodyFull.value && 
    (
        form.otas_enabled_google || form.otas_enabled_tripadvisor || 
        form.otas_enabled_booking || form.otas_enabled_expedia || form.otas_enabled_airbnb
    );
    return valid;
});


const AnythingSelectedOta = computed(()=>{
    return !form.otas_enabled_google && !form.otas_enabled_tripadvisor && 
            !form.otas_enabled_booking && !form.otas_enabled_expedia && !form.otas_enabled_airbnb
});

</script>