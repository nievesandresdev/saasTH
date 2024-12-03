<template>
    <div class="flex flex-col h-full">
        <div class="flex-grow overflow-y-auto">
            <!-- head -->
            <Header />
        
            <!-- info -->
            <div class="mt-6 px-6">
                <div class="flex items-center gap-2">
                    <h2 class="text-lg font-medium leading-[120%]">Solicitud en Stay</h2>
                    <p class="text-sm font-semibold leading-[120%] ml-auto">Solicitar reseña al huésped</p>
                    <ToggleButton
                        v-model="form.in_stay_activate"
                        id="toggle-1"
                    />
                    <Tooltip
                        size="l"
                        :top="25"
                        :right="0"
                    >
                        <template v-slot:button>
                            <img class="w-6 h-6" src="/assets/icons/info.blue.svg">
                        </template>
                        <template v-slot:content>
                            <p class="text-sm leading-[150%]">
                                Determinaremos qué huéspedes han tenido una experiencia satisfactoria, concluida la estancia y tras analizar los feedbacks recibidos. Una vez segmentados, se les enviará la solicitud de reseña a aquellos que puedan derivar en una reseña positiva.
                            </p>
                        </template>
                    </Tooltip>
                </div>
                <p class="text-sm leading-[140%] mt-2">Tendrá como objetivo solicitar una reseña a aquellos huéspedes que han proporcionado un feedback positivo durante su estancia en el hotel.</p>
            </div>
            
            <!-- body section -->
            <section class="px-6 mt-6 mb-10">

                <div class="bg-white py-6 px-4 rounded-[10px] shadow-hoster">
                    <h2 class="text-base font-semibold leading-[120%]">Configuración de la solicitud de reseña en la WebApp</h2>
                    <p class="text-sm leading-[150%] mt-2">Configura los aspectos generales de la solicitud de reseña, que se mostrará a tu huésped tras proporcionar un feedback positivo en Stay.</p>

                    <div class="mt-4">
                        <p class="text-sm font-semibold leading-[120%] mb-2">Título del mensaje</p>
                        <!-- <pre v-if="form.in_stay_msg_title">
                            {{form.in_stay_msg_title}}
                        </pre> -->
                        <Editor 
                            v-if="form.in_stay_msg_title"
                            v-model="form.in_stay_msg_title['es']"
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
                            v-if="form.in_stay_msg_text"
                            v-model="form.in_stay_msg_text['es']"
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
                                <Checkbox  isDisabled/>
                                <p class="text-xs font-medium leading-[130%] ml-2 opacity-50 mr-1">Booking</p>
                                <Tooltip
                                    size="s"
                                    :top="25"
                                    :left="0"
                                >
                                    <template v-slot:button>
                                        <img class="w-4 h-4" src="/assets/icons/info.blue.svg">
                                    </template>
                                    <template v-slot:content>
                                        <p class="text-sm leading-[150%]">
                                            Booking permite dejar una reseña una vez terminada la estancia.
                                        </p>
                                    </template>
                                </Tooltip>
                            </div>
                            <!-- Expedia -->
                            <div class="flex items-center mt-2">
                                <Checkbox  isDisabled/>
                                <p class="text-xs font-medium leading-[130%] ml-2 opacity-50 mr-1">Expedia</p>
                                <Tooltip
                                    size="l"
                                    :top="25"
                                    :left="0"
                                >
                                    <template v-slot:button>
                                        <img class="w-4 h-4" src="/assets/icons/info.blue.svg">
                                    </template>
                                    <template v-slot:content>
                                        <p class="text-sm leading-[150%]">
                                            Expedia permite dejar una reseña una vez terminada la estancia.
                                        </p>
                                    </template>
                                </Tooltip>
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
                                <Checkbox  isDisabled/>
                                <p class="text-xs font-medium leading-[130%] ml-2 opacity-50 mr-1">AirBnb</p>
                                <Tooltip
                                    size="s"
                                    :bottom="25"
                                    :left="0"
                                >
                                    <template v-slot:button>
                                        <img class="w-4 h-4" src="/assets/icons/info.blue.svg">
                                    </template>
                                    <template v-slot:content>
                                        <p class="text-sm leading-[150%]">
                                            AirBnb permite dejar una reseña una vez terminada la estancia.
                                        </p>
                                    </template>
                                </Tooltip>
                            </div>
                        </div>
                        <p 
                            class="text-xs font-medium htext-alert-negative mt-2 leading-[90%]"
                            v-if="!form.otas_enabled_google && !form.otas_enabled_tripadvisor"
                        >Debes seleccionar al menos una OTA para solicitar la reseña</p>
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
    mockupStore.$setIframeUrl('/consultas/fakeLinkOtas')
    mockupStore.$setInfo1('Edita y guarda para aplicar tus cambios', '/assets/icons/1.TH.EDIT.OUTLINED.svg')
    settings.value = await requestSettingStore.$getAll();
    console.log('test settings',settings.value)
    const data = JSON.parse(JSON.stringify(settings.value));
    assignValuesToForm(data);
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
    in_stay_activate:true,
    in_stay_msg_title: null,
    in_stay_msg_text: null,
    otas_enabled_google: null,
    otas_enabled_tripadvisor: null,
    in_stay_otas_enabled: null
});

const submit = async () =>{
    form.in_stay_otas_enabled = { google: form.otas_enabled_google, tripadvisor: form.otas_enabled_tripadvisor};
    let request  = await requestSettingStore.$updateDataInStay(form);
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
        form.in_stay_activate = data.in_stay_activate;
        form.in_stay_msg_title = data.in_stay_msg_title;
        form.in_stay_msg_text = data.in_stay_msg_text;
        form.otas_enabled_google = data.in_stay_otas_enabled?.google;
        form.otas_enabled_tripadvisor = data.in_stay_otas_enabled?.tripadvisor;
        // Asegúrate de manejar la estructura de in_stay_otas_enabled si es necesaria
        form.in_stay_otas_enabled = {
            google: form.otas_enabled_google,
            tripadvisor: form.otas_enabled_tripadvisor
        };
        settingsRef.value = JSON.parse(JSON.stringify(form))
    }
}


//computed

const changes = computed(()=>{
    if(!settingsRef.value) return

    let changes = JSON.stringify(settingsRef.value.in_stay_activate) !== JSON.stringify(form.in_stay_activate) ||
            JSON.stringify(settingsRef.value.in_stay_msg_title) !== JSON.stringify(form.in_stay_msg_title) ||
            JSON.stringify(settingsRef.value.in_stay_msg_text) !== JSON.stringify(form.in_stay_msg_text) ||
            settingsRef.value.in_stay_otas_enabled.google !== form.otas_enabled_google ||
            settingsRef.value.in_stay_otas_enabled.tripadvisor !== form.otas_enabled_tripadvisor;
    return changes;
});

const valid = computed(()=>{
    if(!settingsRef.value) return
    let valid = !!form.in_stay_msg_title?.es && textTitleFull.value && textBodyFull.value && (form.otas_enabled_google || form.otas_enabled_tripadvisor);
    return valid;
});
</script>