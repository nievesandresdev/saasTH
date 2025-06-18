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
                        <p class="text-sm font-bold leading-[120%]">Bueno</p>
                    </div>
                    <!-- request review -->
                    <div class="mt-4">
                        <div class="flex items-center gap-2">
                            <RadioButton value="true" v-model="valuesForm.request_activate"/>
                            <p class="text-sm font-semibold leading-[120%]">Solicitar reseña en <span class="font-bold">Stay</span> al huésped</p>
                        </div>
                        <div v-if="valuesForm.request_activate == 'true'" class="flex items-center gap-2 mt-2 h-[52px] px-2 rounded-[10px] bg-[#FFF2CC] max-w-[661px]" >
                            <img src="/assets/icons/1.TH.INFO.svg" alt="" class="w-4 h-4">
                            <p class="text-sm leading-[140%]">
                                Recomendado solamente para hoteles con una nota media en OTAs menor a 9/10 o 4.5/5
                            </p>
                        </div>
                        <div class="flex items-center gap-2 mt-2">
                            <RadioButton value="false" v-model="valuesForm.request_activate"/>
                            <p class="text-sm font-semibold leading-[120%]">No solicitar reseña en <span class="font-bold">Stay</span> al huésped</p>
                        </div>
                    </div>
                    <RequestReviewData 
                        v-if="valuesForm.request_activate == 'true'" 
                        @handleEmpty="handleEmpty"
                    />
                    <NoRequestReviewData 
                    v-else
                    @handleEmpty="handleEmpty"
                    />
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
import RadioButton from '@/components/Forms/RadioButton.vue';
import ModalNoSave from '@/components/ModalNoSave.vue'
import RequestReviewData from './components/RequestReviewData.vue'
import NoRequestReviewData from './components/NoRequestReviewData.vue'
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
    queriesTexts.value = await querySettingsStore.$getPostStayGoodSettings();
    // console.log('test queriesTexts.value',queriesTexts.value)
    assignValuesToForm();
    // queriesTexts.value.in_stay_good_request_activate = String(form.in_stay_good_request_activate);
    copyTexts.value = JSON.stringify(queriesTexts.value);
    defineMockup()
})

function defineMockup(){
    mockupStore.$setIframeUrl('','period=post-stay&openFakeMsg=true&qualification=GOOD')
    mockupStore.$setInfo1('Edita y guardar para ver tus cambios en tiempo real', '/assets/icons/1.TH.EDIT.OUTLINED.svg')
}


const form = reactive({
    post_stay_good_request_activate:'true',
    post_stay_good_response_title:null,
    post_stay_good_response_msg:null,
    post_stay_good_request_otas:null,
    post_stay_good_no_request_comment_activate:null,
    post_stay_good_no_request_comment_msg:null,
    post_stay_good_no_request_thanks_title:null,
    post_stay_good_no_request_thanks_msg:null,
})

const valuesForm = reactive({
    request_activate:'true',
    response_title:null,
    response_msg:null,
    request_otas:null,
    no_request_comment_activate:null,
    no_request_comment_msg:null,
    no_request_thanks_title:null,
    no_request_thanks_msg:null,
})

const submit = async () =>{
    updateGeneralForm();
    let res  = await querySettingsStore.$updatePostStayGoodSettings(form);
    if(res){
        copyTexts.value = JSON.stringify(form);
        mockupStore.$reloadIframe();
        toast.warningToast('Cambios guardados con éxito','top-right');
    }
}

function assignValuesToForm(){
    if (queriesTexts.value) {
        valuesForm.response_title = queriesTexts.value.post_stay_good_response_title;
        valuesForm.response_msg = queriesTexts.value.post_stay_good_response_msg;
        valuesForm.request_otas = queriesTexts.value.post_stay_good_request_otas;
        valuesForm.no_request_comment_activate = queriesTexts.value.post_stay_good_no_request_comment_activate;
        valuesForm.no_request_comment_msg = queriesTexts.value.post_stay_good_no_request_comment_msg;
        valuesForm.no_request_thanks_title = queriesTexts.value.post_stay_good_no_request_thanks_title;
        valuesForm.no_request_thanks_msg = queriesTexts.value.post_stay_good_no_request_thanks_msg;
        valuesForm.request_activate = String(queriesTexts.value.post_stay_good_request_activate);
    }
}

function updateGeneralForm(){
    form.post_stay_good_response_title = valuesForm.response_title;
    form.post_stay_good_response_msg = valuesForm.response_msg;
    form.post_stay_good_request_otas = valuesForm.request_otas;
    form.post_stay_good_no_request_comment_activate = valuesForm.no_request_comment_activate;
    form.post_stay_good_no_request_comment_msg = valuesForm.no_request_comment_msg;
    form.post_stay_good_no_request_thanks_title = valuesForm.no_request_thanks_title;
    form.post_stay_good_no_request_thanks_msg = valuesForm.no_request_thanks_msg;
    form.post_stay_good_request_activate = valuesForm.request_activate == 'true' ? true : false;
    
}

function cancelChanges(){
    const oldValues = JSON.parse(copyTexts.value);
    valuesForm.response_title = oldValues.post_stay_good_response_title;
    valuesForm.response_msg = { ...oldValues.post_stay_good_response_msg };
    valuesForm.request_otas = oldValues.post_stay_good_request_otas;
    valuesForm.no_request_comment_activate = oldValues.post_stay_good_no_request_comment_activate;
    valuesForm.no_request_comment_msg = { ...oldValues.post_stay_good_no_request_comment_msg };
    valuesForm.no_request_thanks_title = { ...oldValues.post_stay_good_no_request_thanks_title };
    valuesForm.no_request_thanks_msg = { ...oldValues.post_stay_good_no_request_thanks_msg };
    valuesForm.request_activate = String(oldValues.post_stay_good_request_activate);
    
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