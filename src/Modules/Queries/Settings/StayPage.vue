<template>
    <Head />
    <section class="px-6">
        <TitleAndActivate 
            status="Stay"
            :defaultToggle="form.in_stay_activate"
            @onchange="(value) => form.in_stay_activate = value"
            tooltipText="La desactivación del feedback en Stay se aplicará a las estancias que se creen a partir de este momento. Las estancias que ya están creadas recibirán el flujo de feedback que estaba programado."
        />
        <p class="text-sm mt-2">
            Tendrá como objetivo conocer el sentimiento del huésped en el tiempo transcurrido desde que comenzó su estancia, para poder identificar posibles problemas y evitar que deriven en una reseña negativa.
        </p>
    </section>

    <QueryTerms 
        status="Stay"
        question="¿Cómo calificarías tu nivel de satisfacción con tu estancia hasta ahora?"    
        questionOptions="Muy malo/Malo/Normal/Bueno/Muy bueno" 
        queryTrigger="Se enviará un día después del check-in"    
        whenAvailable="Hasta el día del check-out"   
    />

    <section class="px-6 mt-6">
        <div class="bg-white py-6 px-4 rounded-[10px] shadow-hoster">
            <h1 class="text-base font-medium">Mensaje de agradecimiento</h1>
            <p class="text-sm mt-2">Configura el mensaje de agradecimiento que aparecerá cuando el huésped proporcione su feedback. Puedes personalizarlo según la respuesta obtenida. </p>

            <p class="text-sm font-medium leading-[110%] mt-4">Cuando el huésped responda muy bueno o bueno</p>
            <div class="mt-2" v-if="form.in_stay_thanks_good">
                <AutoTextArea 
                    :key="forceUpdate"
                    @empty="event => handleEmpty(event,'thanksEmpty')"
                    :id="'AutoTextArea1'"
                    v-model="form.in_stay_thanks_good.es" 
                    :wordLimit="150"
                    mandatory
                />
            </div>
            <p class="text-sm font-medium leading-[110%] mt-2">Cuando el huésped responda normal, malo o muy malo</p>
            <div class="mt-2" v-if="form.in_stay_thanks_normal">
                <AutoTextArea 
                    :key="forceUpdate"
                    @empty="event => handleEmpty(event,'thanksEmpty')"
                    :id="'AutoTextArea3'"
                    v-model="form.in_stay_thanks_normal.es" 
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
                    v-if="form.in_stay_comment"
                    @empty="event => handleEmpty(event,'thanksEmpty')"
                    :id="'AutoTextArea2'"
                    v-model="form.in_stay_comment.es" 
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
import { useMockupStore } from '@/stores/modules/mockup'

const mockupStore = useMockupStore();
const toast = useToastAlert();
const querySettingsStore = useQuerySettingsStore();


//data
const queriesTexts = ref(null);
const anyEmpty = ref([]);
const copyTexts = ref(null);
const form = reactive({
    in_stay_activate:null,
    in_stay_thanks_good:null,
    in_stay_thanks_normal:null,
    in_stay_comment:null,
})
const forceUpdate = ref(0);

onMounted(async() => {
    queriesTexts.value = await querySettingsStore.$getStaySettings();
    // console.log('queriesTexts.value',queriesTexts.value)
    assignValuesToForm();
    copyTexts.value = JSON.stringify(queriesTexts.value);
    defineMockup(queriesTexts.value.in_stay_activate)
})

//functions
function assignValuesToForm(){
    if (queriesTexts.value) {
        form.in_stay_activate = queriesTexts.value.in_stay_activate;
        form.in_stay_thanks_good = queriesTexts.value.in_stay_thanks_good;
        form.in_stay_thanks_normal = queriesTexts.value.in_stay_thanks_normal;
        form.in_stay_comment = queriesTexts.value.in_stay_comment;
    }
}

async function submit(){
    let request  = await querySettingsStore.$updateStaySettings(form);
    if(request){
        copyTexts.value = JSON.stringify(form);
        defineMockup(form.in_stay_activate)
        mockupStore.$reloadIframe();
        toast.warningToast('Cambios guardados con éxito','top-right');
    }
}

function handleEmpty(event,input) {
    if(event){
        anyEmpty.value.push(input)
    }else{
        anyEmpty.value = anyEmpty.value.filter(item => item !== input)
    }
}

function cancelChanges(){
    const oldValues = JSON.parse(copyTexts.value);
    form.in_stay_activate = oldValues.in_stay_activate;
    form.in_stay_thanks_good = { ...oldValues.in_stay_thanks_good };
    form.in_stay_thanks_normal = { ...oldValues.in_stay_thanks_normal };
    form.in_stay_comment = { ...oldValues.in_stay_comment };
    forceUpdate.value++;
}

function defineMockup(bool){
    if(bool){
        mockupStore.$setIframeUrl('/consultas/fake','period=in-stay')
        mockupStore.$setInfo1('Edita y guarda para aplicar tus cambios', '/assets/icons/1.TH.EDIT.OUTLINED.svg')
    }else{
        mockupStore.$setIframeUrl('')
        mockupStore.$setInfo1('Para visualizar, activa la opción de mostrar feedback al huésped', '/assets/icons/1.TH.MOBILE.svg')
    }
    
}

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