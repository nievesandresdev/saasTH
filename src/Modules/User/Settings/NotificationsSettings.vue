<template>
    
    <!-- head -->
    <section>
        <div class="px-6">
            <h1 class="text-[22px] font-medium leading-[110%] py-5">Equipo</h1>
            <MenuSettings />
        </div>
        <!-- info banner -->
        <div class="bg-[#D9E8F2] px-24 py-[14px]">
            <p class="text-sm font-semibold leading-[150%]">Las notificaciones visuales dentro de la plataforma son esenciales para ayudar y guiar en la operativa diaria. Permanecerán siempre activas.</p>
            </div>
    </section>

    <!-- body view -->
    <section class="p-6 mb-6 overflow-y-auto h-[62vh]">

        <!-- customer experience -->
        <div class="flex justify-between items-center pb-4 border-b hborder-gray-400">
            <p class="text-lg font-semibold leading-[110%]" :class="loadData ? loadClasses : ''">Customer Experience</p>
            <div class="grid gap-10 grid-cols-3 w-[452px]">
                <div>
                    <p :class="loadData ? loadClasses : ''" class="text-[10px] font-semibold leading-[130%] text-center">Propietario</p>
                    <!-- checkbox's -->
                    <div class="flex gap-6 mt-2">
                        <div>
                            <p :class="loadData ? loadClasses : ''" class="text-[10px] font-semibold leading-[130%] text-center">Plataforma</p>
                            <div class="mt-1 text-center">
                                <Checkbox :loading="loadData" v-model="plataformDefault" isDisabled/>
                            </div>
                        </div>
                        <div class="flex-grow">
                            <p :class="loadData ? loadClasses : ''" class="text-[10px] font-semibold leading-[130%] text-center">Email</p>
                            <div class="mt-1 text-center">
                                <Checkbox :loading="loadData" v-model="allChecked.chat.Associate" @change="maskAllEmailsForRole('chat','Associate')"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <p :class="loadData ? loadClasses : ''" class="text-[10px] font-semibold leading-[130%] text-center">Administrador</p>
                    <!-- checkbox's -->
                    <div class="flex gap-6 mt-2">
                        <div>
                            <p :class="loadData ? loadClasses : ''" class="text-[10px] font-semibold leading-[130%] text-center">Plataforma</p>
                            <div class="mt-1 text-center">
                                <Checkbox :loading="loadData" v-model="plataformDefault" isDisabled/>
                            </div>
                        </div>
                        <div class="flex-grow">
                            <p :class="loadData ? loadClasses : ''" class="text-[10px] font-semibold leading-[130%] text-center">Email</p>
                            <div class="mt-1 text-center">
                                <Checkbox :loading="loadData" v-model="allChecked.chat.Administrator" @change="maskAllEmailsForRole('chat','Administrator')"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <p :class="loadData ? loadClasses : ''" class="text-[10px] font-semibold leading-[130%] text-center">Operador</p>
                    <!-- checkbox's -->
                    <div class="flex gap-6 mt-2">
                        <div>
                            <p :class="loadData ? loadClasses : ''" class="text-[10px] font-semibold leading-[130%] text-center">Plataforma</p>
                            <div class="mt-1 text-center">
                                <Checkbox :loading="loadData" v-model="plataformDefault" isDisabled/>
                            </div>
                        </div>
                        <div class="flex-grow">
                            <p :class="loadData ? loadClasses : ''" class="text-[10px] font-semibold leading-[130%] text-center">Email</p>
                            <div class="mt-1 text-center">
                                <Checkbox :loading="loadData" v-model="allChecked.chat.Operator" @change="maskAllEmailsForRole('chat','Operator')"/>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- chat -->
        <div class="mt-6">
            <h2 :class="loadData ? loadClasses : ''" class="text-base font-medium leading-[120%]">Chat</h2>
            <div class="shadow-hoster rounded-[10px] bg-white py-6 mt-4">
                <!-- new chat -->
                <div class="border-b hborder-gray-400 pb-4 px-4 flex items-center">
                    <div>
                        <h3 :class="loadData ? loadClasses : ''" class="text-base font-medium leading-[140%]">Nuevo chat</h3>
                        <p :class="loadData ? loadClasses : ''" class="text-sm leading-[150%] mt-2">Notificar cuando se reciba un nuevo chat.</p>
                    </div>
                    <div class="w-[418px] ml-auto flex gap-[74px]">
                        <!-- owner -->
                        <div class="flex justify-between flex-grow">
                            <Checkbox :loading="loadData" v-model="plataformDefault" isDisabled/>
                            <Checkbox :loading="loadData" v-model="boolBoxToKeysChat.email_notify_new_message_to.Associate" @change="reviewAllCheckup('chat','Associate')"/>
                        </div>
                        <!-- administrator -->
                        <div class="flex justify-between flex-grow">
                            <Checkbox :loading="loadData" v-model="plataformDefault" isDisabled/>
                            <Checkbox :loading="loadData"  v-model="boolBoxToKeysChat.email_notify_new_message_to.Administrator" @change="reviewAllCheckup('chat','Administrator')"/>
                        </div>
                        <!-- operator -->
                        <div class="flex justify-between flex-grow">
                            <Checkbox :loading="loadData" v-model="plataformDefault" isDisabled/>
                            <Checkbox :loading="loadData"  v-model="boolBoxToKeysChat.email_notify_new_message_to.Operator" @change="reviewAllCheckup('chat','Operator')"/>
                        </div>
                    </div>
                </div>
                <!-- pending chat -->
                <div class="border-b hborder-gray-400 py-4 px-4 flex items-center">
                    <div>
                        <h3 :class="loadData ? loadClasses : ''" class="text-base font-medium leading-[140%]">Chat pendiente</h3>
                        <p :class="loadData ? loadClasses : ''" class="text-sm leading-[150%] mt-2">Notificar cuando hayan transcurrido 10 minutos con un chat pendiente.</p>
                    </div>
                    <div class="w-[418px] ml-auto flex gap-[74px]">
                        <!-- owner -->
                        <div class="flex justify-between flex-grow">
                            <Checkbox :loading="loadData" v-model="plataformDefault" isDisabled/>
                            <Checkbox :loading="loadData"  v-model="boolBoxToKeysChat.email_notify_pending_chat_to.Associate" @change="reviewAllCheckup('chat','Associate')"/>
                        </div>
                        <!-- administrator -->
                        <div class="flex justify-between flex-grow">
                            <Checkbox :loading="loadData" v-model="plataformDefault" isDisabled/>
                            <Checkbox :loading="loadData"  v-model="boolBoxToKeysChat.email_notify_pending_chat_to.Administrator" @change="reviewAllCheckup('chat','Administrator')"/>
                        </div>
                        <!-- operator -->
                        <div class="flex justify-between flex-grow">
                            <Checkbox :loading="loadData" v-model="plataformDefault" isDisabled/>
                            <Checkbox :loading="loadData"  v-model="boolBoxToKeysChat.email_notify_pending_chat_to.Operator" @change="reviewAllCheckup('chat','Operator')"/>
                        </div>
                    </div>
                </div>
                <!-- inactive chat -->
                <div class="pt-4 px-4 flex items-center">
                    <div>
                        <h3 :class="loadData ? loadClasses : ''" class="text-base font-medium leading-[140%] mr-2">Chat inactivo</h3>
                        <p :class="loadData ? loadClasses : ''" class="text-sm leading-[150%] mt-2 mr-2">Notificar cuando haya personal disponible en el chat y hayan transcurrido 30 minutos sin responder ningún chat.</p>
                    </div>
                    <div class="w-[418px] ml-auto flex gap-[74px] flex-shrink-0">
                        <!-- owner -->
                        <div class="flex justify-between flex-grow">
                            <Checkbox :loading="loadData" v-model="plataformDefault" isDisabled/>
                            <Checkbox :loading="loadData" v-model="boolBoxToKeysChat.email_notify_not_answered_chat_to.Associate" @change="reviewAllCheckup('chat','Associate')"/>
                        </div>
                        <!-- administrator -->
                        <div class="flex justify-between flex-grow">
                            <Checkbox :loading="loadData" v-model="plataformDefault" isDisabled/>
                            <Checkbox :loading="loadData" v-model="boolBoxToKeysChat.email_notify_not_answered_chat_to.Administrator" @change="reviewAllCheckup('chat','Administrator')"/>
                        </div>
                        <!-- operator -->
                        <div class="flex justify-between flex-grow">
                            <Checkbox :loading="loadData" v-model="plataformDefault" isDisabled/>
                            <Checkbox :loading="loadData" v-model="boolBoxToKeysChat.email_notify_not_answered_chat_to.Operator" @change="reviewAllCheckup('chat','Operator')"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- reputation online -->
        <div class="flex justify-between items-center pb-4 border-b hborder-gray-400 mt-8">
            <p :class="loadData ? loadClasses : ''" class="text-lg font-semibold leading-[110%]">Reputación online</p>
            <div class="grid gap-10 grid-cols-3 w-[452px]">
                <div>
                    <p :class="loadData ? loadClasses : ''" class="text-[10px] font-semibold leading-[130%] text-center">Propietario</p>
                    <!-- checkbox's -->
                    <div class="flex gap-6 mt-2">
                        <div>
                            <p :class="loadData ? loadClasses : ''" class="text-[10px] font-semibold leading-[130%] text-center">Plataforma</p>
                            <div class="mt-1 text-center">
                                <Checkbox :loading="loadData" v-model="plataformDefault" isDisabled/>
                            </div>
                        </div>
                        <div class="flex-grow">
                            <p :class="loadData ? loadClasses : ''" class="text-[10px] font-semibold leading-[130%] text-center">Email</p>
                            <div class="mt-1 text-center">
                                <Checkbox :loading="loadData" v-model="allChecked.queries.Associate" @change="maskAllEmailsForRole('queries','Associate')"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <p :class="loadData ? loadClasses : ''" class="text-[10px] font-semibold leading-[130%] text-center">Administrador</p>
                    <!-- checkbox's -->
                    <div class="flex gap-6 mt-2">
                        <div>
                            <p :class="loadData ? loadClasses : ''" class="text-[10px] font-semibold leading-[130%] text-center">Plataforma</p>
                            <div class="mt-1 text-center">
                                <Checkbox :loading="loadData" v-model="plataformDefault" isDisabled/>
                            </div>
                        </div>
                        <div class="flex-grow">
                            <p :class="loadData ? loadClasses : ''" class="text-[10px] font-semibold leading-[130%] text-center">Email</p>
                            <div class="mt-1 text-center">
                                <Checkbox :loading="loadData" v-model="allChecked.queries.Administrator" @change="maskAllEmailsForRole('queries','Administrator')"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <p :class="loadData ? loadClasses : ''" class="text-[10px] font-semibold leading-[130%] text-center">Operador</p>
                    <!-- checkbox's -->
                    <div class="flex gap-6 mt-2">
                        <div>
                            <p :class="loadData ? loadClasses : ''" class="text-[10px] font-semibold leading-[130%] text-center">Plataforma</p>
                            <div class="mt-1 text-center">
                                <Checkbox :loading="loadData" v-model="plataformDefault" isDisabled/>
                            </div>
                        </div>
                        <div class="flex-grow">
                            <p :class="loadData ? loadClasses : ''" class="text-[10px] font-semibold leading-[130%] text-center">Email</p>
                            <div class="mt-1 text-center">
                                <Checkbox :loading="loadData" v-model="allChecked.queries.Operator" @change="maskAllEmailsForRole('queries','Operator')"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- feedback -->
        <div class="mt-6">
            <h2 :class="loadData ? loadClasses : ''" class="text-base font-medium leading-[120%]">Seguimiento</h2>
            <div class="shadow-hoster rounded-[10px] bg-white py-6 mt-4">
                <!-- new feedback -->
                <div class="border-b hborder-gray-400 pb-4 px-4 flex items-center">
                    <div>
                        <h3 :class="loadData ? loadClasses : ''" class="text-base font-medium leading-[140%]">Nuevo feedback</h3>
                        <p :class="loadData ? loadClasses : ''" class="text-sm leading-[150%] mt-2">Notificar cuando se reciba un nuevo feedback.</p>
                    </div>
                    <div class="w-[418px] ml-auto flex gap-[74px]">
                        <!-- owner -->
                        <div class="flex justify-between flex-grow">
                            <Checkbox :loading="loadData" v-model="plataformDefault" isDisabled/>
                            <Checkbox :loading="loadData" v-model="boolBoxToKeysQueries.email_notify_new_feedback_to.Associate"  @change="reviewAllCheckup('queries','Associate')"/>
                        </div>
                        <!-- administrator -->
                        <div class="flex justify-between flex-grow">
                            <Checkbox :loading="loadData" v-model="plataformDefault" isDisabled/>
                            <Checkbox :loading="loadData" v-model="boolBoxToKeysQueries.email_notify_new_feedback_to.Administrator"  @change="reviewAllCheckup('queries','Administrator')"/>
                        </div>
                        <!-- operator -->
                        <div class="flex justify-between flex-grow">
                            <Checkbox :loading="loadData" v-model="plataformDefault" isDisabled/>
                            <Checkbox :loading="loadData" v-model="boolBoxToKeysQueries.email_notify_new_feedback_to.Operator"  @change="reviewAllCheckup('queries','Operator')"/>
                        </div>
                    </div>
                </div>
                <!-- inactive feedback -->
                <div class="pt-4 px-4 flex items-center">
                    <div>
                        <h3 :class="loadData ? loadClasses : ''" class="text-base font-medium leading-[140%]">Feedback pendiente</h3>
                        <p :class="loadData ? loadClasses : ''" class="text-sm leading-[150%] mt-2">Notificar cuando hayan transcurrido 10 minutos con un feedback pendiente.</p>
                    </div>
                    <div class="w-[418px] ml-auto flex gap-[74px] flex-shrink-0">
                        <!-- owner -->
                        <div class="flex justify-between flex-grow">
                            <Checkbox :loading="loadData" v-model="plataformDefault" isDisabled/>
                            <Checkbox :loading="loadData" v-model="boolBoxToKeysQueries.email_notify_pending_feedback_to.Associate"  @change="reviewAllCheckup('queries','Associate')"/>
                        </div>
                        <!-- administrator -->
                        <div class="flex justify-between flex-grow">
                            <Checkbox :loading="loadData" v-model="plataformDefault" isDisabled/>
                            <Checkbox :loading="loadData" v-model="boolBoxToKeysQueries.email_notify_pending_feedback_to.Administrator"  @change="reviewAllCheckup('queries','Administrator')"/>
                        </div>
                        <!-- operator -->
                        <div class="flex justify-between flex-grow">
                            <Checkbox :loading="loadData" v-model="plataformDefault" isDisabled/>
                            <Checkbox :loading="loadData" v-model="boolBoxToKeysQueries.email_notify_pending_feedback_to.Operator"  @change="reviewAllCheckup('queries','Operator')"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <ModalNoSave
            :id="'not-saved'"
            :open="changes &&  valid"
            text="Tienes cambios sin guardar. Para aplicar los cambios realizados debes guardar."
            textbtn="Guardar"
            @saveChanges="submit"
            type="save_changes"
        />
    </section>
    <ChangesBar 
        :existingChanges="changes" :validChanges="valid"
        @cancel="cancelChanges" @submit="submit"
    />
    
</template>
<script setup>
import { ref, onMounted, nextTick, computed  } from 'vue'
import MenuSettings from './components/MenuSettings.vue';
import Checkbox from '@/components/Forms/Checkbox.vue'
import ChangesBar from '@/components/Forms/ChangesBar.vue'
import ModalNoSave from '@/components/ModalNoSave.vue'
//composable
import { useToastAlert } from '@/composables/useToastAlert'
//store
import { useQuerySettingsStore } from '@/stores/modules/queries/querySettings';
import { useChatSettingsStore } from '@/stores/modules/chat/chatSettings';


const toast = useToastAlert();

const querySettingsStore = useQuerySettingsStore();
const chatSettingsStore = useChatSettingsStore();

const plataformDefault = ref(true);
const loadData = ref(true);
const querySettings = ref([]);
const chatSettings = ref([]);
const loadClasses = 'hbg-gray-500 htext-gray-500 rounded animate-pulse';
const allChecked = ref({
    chat:{
        Associate:false,
        Administrator:false,
        Operator:false,
    },
    queries:{
        Associate:false,
        Administrator:false,
        Operator:false,
    },
});

const boolBoxToKeysChat = ref({
    email_notify_new_message_to:{
        Associate:false,
        Administrator:false,
        Operator:false,
    },
    email_notify_pending_chat_to:{
        Associate:false,
        Administrator:false,
        Operator:false,
    },
    email_notify_not_answered_chat_to:{
        Associate:false,
        Administrator:false,
        Operator:false,
    }
});

const boolBoxToKeysQueries = ref({
    email_notify_new_feedback_to:{
        Associate:false,
        Administrator:false,
        Operator:false,
    },
    email_notify_pending_feedback_to:{
        Associate:false,
        Administrator:false,
        Operator:false,
    }
});

const boxToKeysChatRef = ref(null)
const boxToKeysQueriesRef = ref(null)


onMounted(async () => {
    await getQuerySettings();
    await getChatSettings();
    await nextTick();
    matchDataWithBoxes()
})

const updateSettingsFromCheckBoxes = async () => {
    // Iterar sobre cada categoría de notificación y actualizar según los checkboxes
    let updatedChatSettings = {};
    let updatedQuerySettings = {};

    for (const [key, roles] of Object.entries(boolBoxToKeysChat.value)) {
        updatedChatSettings[key] = Object.entries(roles)
            .filter(([role, isChecked]) => isChecked)
            .map(([role, _]) => role);
    }

    for (const [key, roles] of Object.entries(boolBoxToKeysQueries.value)) {
        updatedQuerySettings[key] = Object.entries(roles)
            .filter(([role, isChecked]) => isChecked)
            .map(([role, _]) => role);
    }

    try {
        // Aquí asumo que tienes métodos en tus stores para actualizar estos ajustes
        querySettings.value = updatedQuerySettings;
        chatSettings.value = updatedChatSettings;
    } catch (error) {
        console.error('Error updating settings:', error);
    }
};

const submit = async () => {
    await updateSettingsFromCheckBoxes();
    let saveChatSettings = await chatSettingsStore.$updateNotificationsEmail(chatSettings.value)
    let saveQuerySettings = await querySettingsStore.$updateNotificationsEmail(querySettings.value)
    matchDataWithBoxes();
    if(saveChatSettings && saveQuerySettings){
        toast.warningToast('Cambios guardados con éxito','top-right');
    }
    
};

const cancelChanges = () =>{
    boolBoxToKeysChat.value = JSON.parse(boxToKeysChatRef.value);
    boolBoxToKeysQueries.value = JSON.parse(boxToKeysQueriesRef.value);
}

const getQuerySettings = async() =>{
    querySettings.value = await querySettingsStore.$getAll();
}

const getChatSettings = async() =>{
    chatSettings.value = await chatSettingsStore.$getAll();
}

const matchDataWithBoxes = () =>{
    let keysChat = Object.keys(boolBoxToKeysChat.value);
    let keysFeedback = Object.keys(boolBoxToKeysQueries.value);
    let keyRoles = ['Associate','Administrator','Operator'];

    keysChat.forEach(key => {
        keyRoles.forEach(role => {
            const newState = chatSettings.value[key].includes(role);
            const updatedRoleStates = {
                ...boolBoxToKeysChat.value[key],
                [role]: newState
            };
            boolBoxToKeysChat.value[key] = { ...updatedRoleStates };
            //actualizar checbox's generales
            reviewAllCheckup('chat', role)
        });
    });
    boxToKeysChatRef.value = JSON.stringify(boolBoxToKeysChat.value);
    keysFeedback.forEach(key => {
        keyRoles.forEach(role => {
            const newState = querySettings.value[key].includes(role);
            const updatedRoleStates = {
                ...boolBoxToKeysQueries.value[key],
                [role]: newState
            };
            boolBoxToKeysQueries.value[key] = { ...updatedRoleStates };
            //actualizar checbox's generales
            reviewAllCheckup('queries', role)
        });
    });
    boxToKeysQueriesRef.value = JSON.stringify(boolBoxToKeysQueries.value);
    loadData.value = false;
}

//marcar todas las casillas
const maskAllEmailsForRole = (model, role) => {
    let keys, data;

    if (model === 'chat') {
        keys = Object.keys(boolBoxToKeysChat.value);
        data = boolBoxToKeysChat.value;
    } else {
        keys = Object.keys(boolBoxToKeysQueries.value);
        data = boolBoxToKeysQueries.value;
    }

    keys.forEach(key => {
        let newState = allChecked.value[model][role];
        if (model === 'chat') {
            boolBoxToKeysChat.value[key][role] = newState;
        } else {
            boolBoxToKeysQueries.value[key][role] = newState;
        }   
    });
}

const reviewAllCheckup = (model, role) => {

    let keys, data;

    if (model === 'chat') {
        keys = Object.keys(boolBoxToKeysChat.value);
        data = boolBoxToKeysChat.value;
    } else {
        keys = Object.keys(boolBoxToKeysQueries.value);
        data = boolBoxToKeysQueries.value;
    }

    const everyChecked = keys.every(key => data[key][role]);
    const anyChecked = keys.some(key => data[key][role]);

    // Prepara un nuevo objeto para forzar la reactividad
    let updatedState = {};

    if (model === 'chat') {
        updatedState = { ...allChecked.value.chat, [role]: everyChecked };
        allChecked.value.chat = updatedState; // Reasigna el objeto actualizado
    } else {
        updatedState = { ...allChecked.value.queries, [role]: everyChecked };
        allChecked.value.queries = updatedState; // Reasigna el objeto actualizado
    }

    if (!anyChecked) {
        if (model === 'chat') {
            allChecked.value.chat = { ...allChecked.value.chat, [role]: false };
        } else {
            allChecked.value.queries = { ...allChecked.value.queries, [role]: false };
        }
    }
}

const changes = computed(()=>{
    if(boxToKeysQueriesRef.value){
        let result = JSON.stringify(boolBoxToKeysQueries.value) !== boxToKeysQueriesRef.value || JSON.stringify(boolBoxToKeysChat.value) !==  boxToKeysChatRef.value;
        return result;
    }
    return false;
})

const valid = computed(()=>{
    if(boxToKeysQueriesRef.value && boxToKeysChatRef.value && changes.value) return true
    return false;
})

</script>
