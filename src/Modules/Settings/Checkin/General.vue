<template>
<div class="h-full flex flex-col">
    <HeadSettingsCheckin />

    <section class="px-6">

        <div class="rounded-[10px] bg-white shadow-hoster py-6 px-4">
            <h2 class="text-base font-semibold leading-[120%]">Mensaje de éxito</h2>
            <p class="mt-2 text-sm">
                Configura el mensaje que verán tus huéspedes al completar el formulario de Check-in.
            </p>
            <p class="text-sm">
                Puedes añadir instrucciones para que tus huéspedes tengan una excelente llegada a tu alojamiento. 
            </p>
            <div class="flex mt-4">
                <p class="text-sm font-medium leading-[140%]">Título del mensaje:</p>
                <p class="text-sm leading-[140%] ml-2">Check-in completado!</p>
            </div>
            <div class="mt-4">
                <p class="text-sm font-medium leading-[140%] mb-2">Texto del mensaje</p>
                <Editor 
                    v-if="message"
                    v-model="message['es']"
                    placeholder="Debes introducir un texto"
                    showCounter
                    mandatory
                    :maxLength="300"
                    @validation="messageFull = $event"
                    countType="static"
                />
            </div>
        </div>
    </section>

    <section class="mt-auto">
        <ChangesBar 
            :existingChanges="changes"
            :validChanges="changes && valid"
            @cancel="cancelChanges" 
            @submit="submit"
        />
    </section>
</div>
</template>
<script setup>
import { ref, onMounted, computed } from 'vue'
import HeadSettingsCheckin from './components/HeadSettingsCheckin.vue';
import ChangesBar from '@/components/Forms/ChangesBar.vue'
import Editor from '@/components/Forms/Editor.vue'
//
import { useToastAlert } from '@/composables/useToastAlert'
const toast = useToastAlert();
//
import { useMockupStore } from '@/stores/modules/mockup'
const mockupStore = useMockupStore();
import { useCheckinStore } from '@/stores/modules/stay/checkin'
const checkinStore = useCheckinStore();

const message = ref(null);
const msgRef = ref(null);
const messageFull = ref(true);

onMounted(async ()=>{
    mockupStore.$setLanguageTooltip(true)
    mockupStore.$setInfo1('Guarda para ver tus cambios en tiempo real', '/assets/icons/info.svg')

    let data = await checkinStore.$getGeneralSettings();
    assignValuesToForm(data)
})


async function assignValuesToForm(data){
    if(data){
        message.value = data.succes_message;
        msgRef.value = JSON.parse(JSON.stringify(data.succes_message))
    }
}

async function submit(){
    let update  = await checkinStore.$updateGeneralSettings({succes_message:message.value});
    if(update){
        assignValuesToForm(update)
        mockupStore.$reloadIframe();
        toast.warningToast('Cambios guardados con éxito','top-right');
    }
}


function cancelChanges(){
    assignValuesToForm({succes_message:msgRef.value});
}

const changes = computed(()=>{
    if(!msgRef.value) return

    let changes = JSON.stringify(message.value) !== JSON.stringify(msgRef.value);
    return changes;
});

const valid = computed(()=>{
    if(!msgRef.value) return
    let valid = !!message.value?.es && messageFull.value;
    return valid;
});
</script>