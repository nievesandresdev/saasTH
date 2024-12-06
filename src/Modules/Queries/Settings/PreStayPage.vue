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

    <section class="px-6 my-6">
        <div class="bg-white py-6 px-4 rounded-[10px] shadow-hoster">
            <h1 class="text-base font-semibold leading-[120%]">Mensaje de respuesta</h1>
            <p class="text-sm mt-2">Configura el mensaje de respuesta del hotel, que aparecerá cuando el huésped proporcione su feedback.</p>
            <div class="mt-4" v-if="form.pre_stay_thanks">
                <p class="text-sm font-semibold leading-[120%] mb-2">Mensaje de respuesta cuando el huésped proporcione el feedback</p>
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

    <!-- <section class="px-6 mt-6 mb-10">
        <div class="bg-white py-6 px-4 rounded-[10px] shadow-hoster">
            <h1 class="text-base font-medium">Comentarios adicionales</h1>
            <p class="text-sm mt-2">Establece el mensaje de petición de comentarios adicionales.</p>
            <div class="mt-4">
                <AutoTextArea 
                    :key="forceUpdate"
                    v-if="form.pre_stay_comment"
                    @empty="event => handleEmpty(event,'commentEmpty')"
                    :id="'AutoTextArea2'"
                    v-model="form.pre_stay_comment.es" 
                    :wordLimit="300"
                    mandatory
                />
            </div>
        </div>
    </section> -->

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
    pre_stay_activate:null,
    pre_stay_thanks:null
})
const forceUpdate = ref(0);

onMounted(async() => {
    queriesTexts.value = await querySettingsStore.$getPreStaySettings();
    // console.log('queriesTexts.value',queriesTexts.value)
    assignValuesToForm();
    copyTexts.value = JSON.stringify(queriesTexts.value);
    defineMockup(queriesTexts.value.pre_stay_activate)
})

//functions
function assignValuesToForm(){
    if (queriesTexts.value) {
        form.pre_stay_activate = queriesTexts.value.pre_stay_activate;
        form.pre_stay_thanks = queriesTexts.value.pre_stay_thanks;
    }
}

async function submit(){
    let request  = await querySettingsStore.$updatePreStaySettings(form);
    if(request){
        copyTexts.value = JSON.stringify(form);
        defineMockup(form.pre_stay_activate)
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
    form.pre_stay_activate = oldValues.pre_stay_activate;
    form.pre_stay_thanks = { ...oldValues.pre_stay_thanks };
    forceUpdate.value++;
}

function defineMockup(bool){
    if(bool){
        mockupStore.$setIframeUrl('/inbox/fake','period=pre-stay')
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