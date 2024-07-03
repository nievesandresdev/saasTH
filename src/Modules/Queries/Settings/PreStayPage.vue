<template>
    <Head />
    <section class="px-6">
        <TitleAndActivate 
            :defaultToggle="form.pre_stay_activate"
            @onchange="(value) => form.pre_stay_activate = value"
        />
        <p class="text-sm mt-2">
            Nos enfocamos en conocer las preferencias e inquietudes de los huéspedes antes de su llegada, teniendo como objetivo igualar o superar sus expectativas.
        </p>
    </section>

    <QueryTerms />

    <section class="px-6 mt-6">
        <div class="bg-white py-6 px-4 rounded-[10px] shadow-hoster">
            <h1 class="text-base font-medium">Mensaje de agradecimiento</h1>
            <p class="text-sm mt-2">Configura el mensaje de agradecimiento que aparecerá cuando el huésped proporcione su feedback. </p>
            <div class="mt-4" v-if="form.pre_stay_thanks">
                <AutoTextArea 
                    :key="forceUpdate"
                    @empty="event => handleEmpty(event,'thanksEmpty')"
                    :id="'AutoTextArea1'"
                    v-model="form.pre_stay_thanks.es" 
                    :wordLimit="150"
                    mandatory
                />
            </div>
        </div>
    </section>

    <section class="px-6 mt-6 mb-10">
        <div class="bg-white py-6 px-4 rounded-[10px] shadow-hoster">
            <h1 class="text-base font-medium">Comentarios adicionales</h1>
            <p class="text-sm mt-2">Establece el mensaje de petición de comentarios adicionales.</p>
            <div class="mt-4">
                <AutoTextArea 
                    :key="forceUpdate"
                    v-if="form.pre_stay_comment"
                    @empty="event => handleEmpty(event,'thanksEmpty')"
                    :id="'AutoTextArea2'"
                    v-model="form.pre_stay_comment.es" 
                    :wordLimit="300"
                    mandatory
                />
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
import { ref, reactive, onMounted, computed, provide } from 'vue'
import Head from './components/HeadSettings.vue'
import QueryTerms from './components/QueryTerms.vue'
import AutoTextArea from '@/components/Forms/AutoTextArea.vue'
import ChangesBar from '@/components/Forms/ChangesBar.vue'
import TitleAndActivate from './components/TitleAndActivate.vue'
import ModalNoSave from '@/components/ModalNoSave.vue'
//composable
import { useToastAlert } from '@/composables/useToastAlert'
//store
import { useQuerySettingsStore } from '@/stores/modules/queries/querySettings';


const toast = useToastAlert();

const querySettingsStore = useQuerySettingsStore();


//data
const queriesTexts = ref(null);
const beforeUrl = ref({link: null,force: false})
const urlMockup = ref(null);
const copyMockup = ref(null);
const anyEmpty = ref([]);
const anyOverLimit = ref([]);
const copyTexts = ref(null);
const form = reactive({
    pre_stay_activate:null,
    pre_stay_thanks:null,
    pre_stay_comment:null,
})
const forceUpdate = ref(0);
//static 
const desactiveCopy = {text:'Para visualizar, activa la opción de mostrar feedback al huésped', icon:'/vendor_asset/img/hoster/icons/1.TH.MOBILE.svg'}
const activeCopy = {text:'Edita y guarda para aplicar tus cambios', icon:'/vendor_asset/img/hoster_landing/icons/info.svg'}
// const urlBase = usePage().props.value.url_base_huesped
// const hotelSubdomain = usePage().props.value.currentHotel.subdomain
onMounted(async() => {
    queriesTexts.value = await querySettingsStore.$getPreStaySettings();
    // console.log('queriesTexts.value',queriesTexts.value)
    assignValuesToForm();
    copyTexts.value = JSON.stringify(queriesTexts.value);
    // defineMockup(queriesTexts.value.pre_stay_activate)
    // defineCopyMockup(queriesTexts.value.pre_stay_activate)
})

//functions
function assignValuesToForm(){
    if (queriesTexts.value) {
        form.pre_stay_activate = queriesTexts.value.pre_stay_activate;
        form.pre_stay_thanks = queriesTexts.value.pre_stay_thanks;
        form.pre_stay_comment = queriesTexts.value.pre_stay_comment;
    }
}

function submit(){
    console.log('submit')
}

function handleEmpty(event,input) {
    // console.log('handleEmpty',event)
    if(event){
        anyEmpty.value.push(input)
    }else{
        anyEmpty.value = anyEmpty.value.filter(item => item !== input)
    }
}

function handleLimit(event,input) {
    if(event){
        anyOverLimit.value.push(input)
    }else{
        anyOverLimit.value = anyOverLimit.value.filter(item => item !== input)
    }
    console.log('handleLimit',anyOverLimit.value)
}

function cancelChanges(){
    const oldValues = JSON.parse(copyTexts.value);
    form.pre_stay_activate = oldValues.pre_stay_activate;
    form.pre_stay_thanks = { ...oldValues.pre_stay_thanks };
    form.pre_stay_comment = { ...oldValues.pre_stay_comment };
    forceUpdate.value++;
}


function defineCopyMockup(bool){
    if(!bool){
        copyMockup.value = desactiveCopy;
    }else{
        copyMockup.value = activeCopy;
    }
}

function defineMockup(bool){
    var iframe = document.getElementById('iframeMockup');
    if(bool){
        urlMockup.value = `${urlBase}/consultas/fake?period=pre-stay&mockup=true&subdomain=${hotelSubdomain}`
    }else{
        urlMockup.value = `${urlBase}?&subdomain=${hotelSubdomain}&mockup=true`
    }
    iframe.src = urlMockup.value;
}

provide('customCopy',copyMockup)
//computed

const changes = computed(()=>{
    let stringForm = JSON.stringify(form)
    return copyTexts.value !== stringForm
});

const valid = computed(()=>{
    let empty = anyEmpty.value.length > 0;
    if(empty) return false
    return true
});
</script>