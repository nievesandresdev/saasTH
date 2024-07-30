<template>
    <!-- head info -->
    <section class="px-6">
        <div class="py-5 border-b hborder-gray-400 flex items-center gap-2">
            <h1 class="text-[22px] font-medium leading-[110%]">Seguimiento - Solicitudes</h1>
            <Tooltip
                size="l"
                :top="25"
                :left="0"
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
    </section>

    <!-- body section -->
    <section class="px-6 mt-6 mb-10">

        <div class="bg-white py-6 px-4 rounded-[10px] shadow-hoster">
            <h2 class="text-base font-medium leading-[110%]">Configuración del mensaje en la WebApp</h2>
            <p class="text-sm leading-[150%] mt-2">Configura cómo será el mensaje que se mostrará a tu huésped tras proporcionar un feedback positivo en Post-Stay.</p>

            <div class="mt-4">
                <p class="text-sm font-medium leading-[110%] mb-2">Título del mensaje</p>
                <Editor 
                    v-if="form.msg_title"
                    v-model="form.msg_title['es']"
                    placeholder="Debes introducir un texto"
                    showCounter
                    mandatory
                    :maxLength="300"
                    @validation="textFull = $event"
                    countType="static"
                />
            </div>

            <div class="mt-4 relative">
                <p class="text-sm font-medium leading-[110%] mb-2">Texto del mensaje</p>
                <Editor 
                    v-if="form.msg_text"
                    v-model="form.msg_text['es']"
                    placeholder="Debes introducir un texto"
                    showCounter
                    mandatory
                    :maxLength="300"
                    @validation="textFull = $event"
                    countType="static"
                />
            </div>

            <div class="mt-4">
                <p class="text-sm font-medium leading-[110%]">OTAs habilitadas para la solicitud de reseña</p>
                <div class="mt-4">
                    <div class="flex items-center gap-2">
                        <Checkbox  v-model="form.otas_enabled_google"/>
                        <p class="text-xs leading-[150%]">Google</p>
                    </div>
                    <div class="flex items-center gap-2 mt-2">
                        <Checkbox  v-model="form.otas_enabled_tripadvisor"/>
                        <p class="text-xs leading-[150%]">TripAdvisor</p>
                    </div>
                </div>
                <p 
                    class="text-xs font-medium htext-alert-negative mt-2 leading-[90%]"
                    v-if="!form.otas_enabled_google && !form.otas_enabled_tripadvisor"
                >Debes seleccionar al menos una OTA para solicitar la reseña</p>
            </div>

            <div class="mt-4">
                <p class="text-sm font-medium leading-[110%]">La solicitud de reseña se mostrará a los huéspedes</p>
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

    <ChangesBar 
        :existingChanges="changes"
        :validChanges="changes && valid"
        @cancel="cancelChanges" 
        @submit="submit"
    />
    <ModalNoSave
        :id="'not-saved'"
        :open="changes &&  valid"
        text="Tienes cambios sin guardar. Para aplicar los cambios realizados debes guardar."
        textbtn="Guardar"
        @saveChanges="submit"
        type="save_changes"
    />
</template>
<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import ChangesBar from '@/components/Forms/ChangesBar.vue'
import RadioButton from '@/components/Forms/RadioButton.vue';
import ModalNoSave from '@/components/ModalNoSave.vue'
import Editor from '@/components/Forms/Editor.vue'
import Checkbox from '@/components/Forms/Checkbox.vue'
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
    const data = JSON.parse(JSON.stringify(settings.value));
    assignValuesToForm(data);
})


const settings = ref(null);
const anyEmpty = ref([]);
const anyOverLimit = ref([]);
const beforeUrl = ref({link: null,force: false})
const settingsRef = ref(null);
const textFull = ref(true);
const DEFAULT_GOOD_STRING = JSON.stringify(['GOOD','VERYGOOD'])
const DEFAULT_DEFAULT_STRING = JSON.stringify(['GOOD','VERYGOOD','NORMAL','NOTANSWERED'])
// const urlMockup = ref(`${urlBase}/consultas/fakeLinkOtas?mockup=true&subdomain=${hotelSubdomain}`);

const form = reactive({
    msg_title: null,
    msg_text: null,
    otas_enabled_google: null,
    otas_enabled_tripadvisor: null,
    request_to: null,
    otas_enabled: null
});

const submit = async () =>{
    form.otas_enabled = { google: form.otas_enabled_google, tripadvisor: form.otas_enabled_tripadvisor};
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
        form.request_to = data.request_to;
        // Asegúrate de manejar la estructura de otas_enabled si es necesaria
        form.otas_enabled = {
            google: form.otas_enabled_google,
            tripadvisor: form.otas_enabled_tripadvisor
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
            settingsRef.value.request_to !== form.request_to;
    return changes;
});

const valid = computed(()=>{
    if(!settingsRef.value) return
    let valid = !!form.msg_title?.es && textFull.value && (form.otas_enabled_google || form.otas_enabled_tripadvisor);
    return valid;
});
</script>