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
                <p class="text-sm leading-[140%]">Si el huésped responde a la pregunta con:  </p>
                <div class="mt-2">
                    <div class="flex items-center gap-6">
                        <div class="flex items-center">
                            <img src="/assets/icons/reviews/NORMAL.svg" alt="" class="w-8 h-8 mr-1">
                            <p class="text-sm font-bold leading-[120%]">Normal</p>
                        </div>
                        <div class="flex items-center">
                            <img src="/assets/icons/reviews/WRONG.svg" alt="" class="w-8 h-8 mr-1">
                            <p class="text-sm font-bold leading-[120%]">Malo</p>
                        </div>
                        <div class="flex items-center">
                            <img src="/assets/icons/reviews/VERYWRONG.svg" alt="" class="w-8 h-8 mr-1">
                            <p class="text-sm font-bold leading-[120%]">Muy malo</p>
                        </div>
                    </div>
                    
                    
                </div>
                <div class="mt-4">
                    <h3 class="text-base font-semibold leading-[120%]">Respuesta al huésped</h3>
                    <p class="text-sm leading-[140%] mt-2">Le daremos un espacio para que deje un comentario privado, que sólo verá tu personal, y le mostraremos el siguiente mensaje:</p>
                    <div class="mt-4">
                        <p class="text-sm font-semibold leading-[120%] mb-2">Título del mensaje</p>
                        <AutoTextArea 
                            v-if="form.post_stay_bad_response_title"
                            :key="forceUpdate"
                            @empty="event => handleEmpty(event,'post_stay_bad_response_title')"
                            :id="'AutoTextArea1'"
                            v-model="form.post_stay_bad_response_title['es']" 
                            :wordLimit="60"
                            mandatory
                        />
                    </div>
                    <div class="mt-4">
                        <p class="text-sm font-semibold leading-[120%] mb-2">Texto del mensaje</p>
                        <AutoTextArea 
                            v-if="form.post_stay_bad_response_msg"
                            :key="forceUpdate"
                            @empty="event => handleEmpty(event,'post_stay_bad_response_msg')"
                            :id="'AutoTextArea2'"
                            v-model="form.post_stay_bad_response_msg['es']" 
                            :wordLimit="300"
                            mandatory
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
import AutoTextArea from '@/components/Forms/AutoTextArea.vue'
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

onMounted(async() => {
    queriesTexts.value = await querySettingsStore.$getPostStayBadSettings();
    // console.log('test queriesTexts.value',queriesTexts.value)
    assignValuesToForm();
    // queriesTexts.value.in_stay_good_request_activate = String(form.in_stay_good_request_activate);
    copyTexts.value = JSON.stringify(queriesTexts.value);
})


const form = reactive({
    post_stay_bad_response_title:null,
    post_stay_bad_response_msg:null,
})

const submit = async () =>{
    let res  = await querySettingsStore.$updatePostStayBadSettings(form);
    if(res){
        copyTexts.value = JSON.stringify(form);
        // defineMockup(form.pre_stay_activate)
        // mockupStore.$reloadIframe();
        toast.warningToast('Cambios guardados con éxito','top-right');
    }
}

function assignValuesToForm(){
    if (queriesTexts.value) {
        form.post_stay_bad_response_title = queriesTexts.value.post_stay_bad_response_title;
        form.post_stay_bad_response_msg = queriesTexts.value.post_stay_bad_response_msg;
    }
}


function cancelChanges(){
    const oldValues = JSON.parse(copyTexts.value);
    form.post_stay_bad_response_title = { ...oldValues.post_stay_bad_response_title };
    form.post_stay_bad_response_msg = { ...oldValues.post_stay_bad_response_msg };
    
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
    let stringForm = JSON.stringify(form);
    return copyTexts.value !== stringForm
});

const valid = computed(()=>{
    let empty = anyEmpty.value.length > 0 || textBodyFull.value == false || textBodyFullNoRequest.value == false;
    if(empty) return false
    return true
});
</script>
<style scoped>
.rounded-rt{
    border-top-right-radius: 10px;
}
</style>