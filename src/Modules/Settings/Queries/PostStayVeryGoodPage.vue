<template>
    <div class="h-full flex flex-col">
        <Head period="Post-stay"/>
        <DescriptionSectionPostStay />

        <div class="mt-6 px-6">
            <TabMenu 
                :views="{
                    'VERYGOOD' : 'SettingsPostStayVeryGoodPage',
                    'GOOD' : 'SettingsPostStayGoodPage',
                    'NORMAL' : 'SettingsPostStayNormalPage'
                }"
            />

            <!-- content view -->
            <section class="py-6 px-4 mb-10 shadow-hoster rounded-b-[10px] rounded-rt bg-white">
                <p class="text-sm leading-[140%]">Si el huésped responde a la pregunta con: </p>
                <div class="mt-2">
                    <div class="flex items-center">
                        <img src="/assets/icons/1.TH.EmojisGOODTAB.svg" alt="" class="w-8 h-8 mr-1">
                        <p class="text-sm font-bold leading-[120%]">Muy bueno</p>
                    </div>
                    <div class="mt-[-16px]">
                        <RequestReviewData 
                            @handleEmpty="handleEmpty"
                        />
                    </div>
                </div>
            </section>
        </div>

        <div class="mt-auto sticky bottom-0 left-0">
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
import { reactive, ref, computed, provide, onMounted } from 'vue';
import Head from './components/HeadSettings.vue'
import TabMenu from './components/TabMenu.vue'
import DescriptionSectionPostStay from './components/DescriptionSectionPostStay.vue'
import ChangesBar from '@/components/Forms/ChangesBar.vue'
import ModalNoSave from '@/components/ModalNoSave.vue'
import RequestReviewData from './components/RequestReviewData.vue'
//store
import { useQuerySettingsStore } from '@/stores/modules/queries/querySettings';
import { useMockupStore } from '@/stores/modules/mockup'
import { useToastAlert } from '@/composables/useToastAlert'
const mockupStore = useMockupStore();
const toast = useToastAlert();
const querySettingsStore = useQuerySettingsStore();

//data
const queriesTexts = ref(null);
const copyTexts = ref(null);
const anyEmpty = ref([]);
const forceUpdate = ref(0);
const textBodyFull = ref(true);
const textBodyFullNoRequest = ref(true);
const disabledOtas = ref([]);

onMounted(async() => {
    queriesTexts.value = await querySettingsStore.$getPostStayVeryGoodSettings();
    console.log('test queriesTexts.value',queriesTexts.value)
    assignValuesToForm();
    // queriesTexts.value.in_stay_good_request_activate = String(form.in_stay_good_request_activate);
    copyTexts.value = JSON.stringify(queriesTexts.value);
})


const form = reactive({
    post_stay_verygood_response_title:null,
    post_stay_verygood_response_msg:null,
    post_stay_verygood_request_otas:null
})

const valuesForm = reactive({
    response_title:null,
    response_msg:null,
    request_otas:null,
})

const submit = async () =>{
    updateGeneralForm();
    let res  = await querySettingsStore.$updatePostStayVeryGoodSettings(form);
    if(res){
        copyTexts.value = JSON.stringify(form);
        // defineMockup(form.pre_stay_activate)
        // mockupStore.$reloadIframe();
        toast.warningToast('Cambios guardados con éxito','top-right');
    }
}

function assignValuesToForm(){
    if (queriesTexts.value) {
        valuesForm.response_title = queriesTexts.value.post_stay_verygood_response_title;
        valuesForm.response_msg = queriesTexts.value.post_stay_verygood_response_msg;
        valuesForm.request_otas = queriesTexts.value.post_stay_verygood_request_otas;
    }
}

function updateGeneralForm(){
    form.post_stay_verygood_response_title = valuesForm.response_title;
    form.post_stay_verygood_response_msg = valuesForm.response_msg;
    form.post_stay_verygood_request_otas = valuesForm.request_otas;
    
}

function cancelChanges(){
    const oldValues = JSON.parse(copyTexts.value);
    valuesForm.response_title = oldValues.post_stay_verygood_response_title;
    valuesForm.response_msg = { ...oldValues.post_stay_verygood_response_msg };
    valuesForm.request_otas = oldValues.post_stay_verygood_request_otas;
    
    forceUpdate.value++;
}

function handleEmpty(event,input) {
    if(event){
        anyEmpty.value.push(input)
    }else{
        anyEmpty.value = anyEmpty.value.filter(item => item !== input)
    }
}

const changes = computed(()=>{
    updateGeneralForm()
    let stringForm = JSON.stringify(form);
    return copyTexts.value !== stringForm
});

const valid = computed(()=>{
    let empty = anyEmpty.value.length > 0 || textBodyFull.value == false || textBodyFullNoRequest.value == false;
    if(empty) return false
    return true
});

provide('valuesForm', valuesForm)
provide('forceUpdate', forceUpdate)
provide('textBodyFull', textBodyFull)
provide('textBodyFullNoRequest', textBodyFullNoRequest)
provide('disabledOtas', disabledOtas)
</script>
<style scoped>
.rounded-rt{
    border-top-right-radius: 10px;
}
</style>