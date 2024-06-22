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
    <section class="p-6 mb-6">

        <!-- customer experience -->
        <div class="flex justify-between items-center pb-4 border-b hborder-gray-400">
            <p class="text-lg font-semibold leading-[110%]">Customer Experience</p>
            <div class="grid gap-10 grid-cols-3 w-[452px]">
                <div>
                    <p class="text-[10px] font-semibold leading-[130%] text-center">Propietario</p>
                    <!-- checkbox's -->
                    <div class="flex gap-6 mt-2">
                        <div>
                            <p class="text-[10px] font-semibold leading-[130%] text-center">Plataforma</p>
                            <div class="mt-1 text-center">
                                <Checkbox v-model="plataformDefault" isDisabled/>
                            </div>
                        </div>
                        <div class="flex-grow">
                            <p class="text-[10px] font-semibold leading-[130%] text-center">Email</p>
                            <div class="mt-1 text-center">
                                <Checkbox :modelValue="emailOwnerChecked" @change="updateEmailsForRole('Associate', emailOwnerChecked)" />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <p class="text-[10px] font-semibold leading-[130%] text-center">Administrador</p>
                    <!-- checkbox's -->
                    <div class="flex gap-6 mt-2">
                        <div>
                            <p class="text-[10px] font-semibold leading-[130%] text-center">Plataforma</p>
                            <div class="mt-1 text-center">
                                <Checkbox v-model="plataformDefault" isDisabled/>
                            </div>
                        </div>
                        <div class="flex-grow">
                            <p class="text-[10px] font-semibold leading-[130%] text-center">Email</p>
                            <div class="mt-1 text-center">
                                <Checkbox :modelValue="emailAdminChecked" @change="updateEmailsForRole('Administrator', emailAdminChecked)" />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <p class="text-[10px] font-semibold leading-[130%] text-center">Operador</p>
                    <!-- checkbox's -->
                    <div class="flex gap-6 mt-2">
                        <div>
                            <p class="text-[10px] font-semibold leading-[130%] text-center">Plataforma</p>
                            <div class="mt-1 text-center">
                                <Checkbox v-model="plataformDefault" isDisabled/>
                            </div>
                        </div>
                        <div class="flex-grow">
                            <p class="text-[10px] font-semibold leading-[130%] text-center">Email</p>
                            <div class="mt-1 text-center">
                                <Checkbox :modelValue="emailOperatorChecked" @change="updateEmailsForRole('Operator', emailOperatorChecked)" />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- chat -->
        <div v-if="chatSettings.email_notify_new_message_to" class="mt-6">
            <h2 class="text-base font-medium leading-[120%]">Chat</h2>
            <div class="shadow-hoster rounded-[10px] bg-white py-6 mt-4">
                <!-- new chat -->
                <div class="border-b hborder-gray-400 pb-4 px-4 flex items-center">
                    <div>
                        <h3 class="text-base font-medium leading-[140%]">Nuevo chat</h3>
                        <p class="text-sm leading-[150%] mt-2">Notificar cuando se reciba un nuevo chat.</p>
                    </div>
                    <div class="w-[418px] ml-auto flex gap-[74px]">
                        <!-- owner -->
                        <div class="flex justify-between flex-grow">
                            <Checkbox v-model="plataformDefault" isDisabled/>
                            <Checkbox :modelValue="isChatSChecked('email_notify_new_message_to', 'Associate')" @update:modelValue="updateChatSetting('email_notify_new_message_to', 'Associate', $event)"/>
                        </div>
                        <!-- administrator -->
                        <div class="flex justify-between flex-grow">
                            <Checkbox v-model="plataformDefault" isDisabled/>
                            <Checkbox :modelValue="isChatSChecked('email_notify_new_message_to', 'Administrator')" @update:modelValue="updateChatSetting('email_notify_new_message_to', 'Administrator', $event)"/>
                        </div>
                        <!-- operator -->
                        <div class="flex justify-between flex-grow">
                            <Checkbox v-model="plataformDefault" isDisabled/>
                            <Checkbox :modelValue="isChatSChecked('email_notify_new_message_to', 'Operator')" @update:modelValue="updateChatSetting('email_notify_new_message_to', 'Operator', $event)"/>
                        </div>
                    </div>
                </div>
                <!-- pending chat -->
                <div class="border-b hborder-gray-400 py-4 px-4 flex items-center">
                    <div>
                        <h3 class="text-base font-medium leading-[140%]">Chat pendiente</h3>
                        <p class="text-sm leading-[150%] mt-2">Notificar cuando hayan transcurrido 10 minutos con un chat pendiente.</p>
                    </div>
                    <div class="w-[418px] ml-auto flex gap-[74px]">
                        <!-- owner -->
                        <div class="flex justify-between flex-grow">
                            <Checkbox v-model="plataformDefault" isDisabled/>
                            <Checkbox :modelValue="isChatSChecked('email_notify_pending_chat_to', 'Associate')" @update:modelValue="updateChatSetting('email_notify_pending_chat_to', 'Associate', $event)"/>
                        </div>
                        <!-- administrator -->
                        <div class="flex justify-between flex-grow">
                            <Checkbox v-model="plataformDefault" isDisabled/>
                            <Checkbox :modelValue="isChatSChecked('email_notify_pending_chat_to', 'Administrator')" @update:modelValue="updateChatSetting('email_notify_pending_chat_to', 'Administrator', $event)"/>
                        </div>
                        <!-- operator -->
                        <div class="flex justify-between flex-grow">
                            <Checkbox v-model="plataformDefault" isDisabled/>
                            <Checkbox :modelValue="isChatSChecked('email_notify_pending_chat_to', 'Operator')" @update:modelValue="updateChatSetting('email_notify_pending_chat_to', 'Operator', $event)"/>
                        </div>
                    </div>
                </div>
                <!-- inactive chat -->
                <div class="pt-4 px-4 flex items-center">
                    <div>
                        <h3 class="text-base font-medium leading-[140%]">Chat inactivo</h3>
                        <p class="text-sm leading-[150%] mt-2">Notificar cuando haya personal disponible en el chat y hayan transcurrido 30 minutos sin responder ningún chat.</p>
                    </div>
                    <div class="w-[418px] ml-auto flex gap-[74px] flex-shrink-0">
                        <!-- owner -->
                        <div class="flex justify-between flex-grow">
                            <Checkbox v-model="plataformDefault" isDisabled/>
                            <Checkbox :modelValue="isChatSChecked('email_notify_not_answered_chat_to', 'Associate')" @update:modelValue="updateChatSetting('email_notify_not_answered_chat_to', 'Associate', $event)"/>
                        </div>
                        <!-- administrator -->
                        <div class="flex justify-between flex-grow">
                            <Checkbox v-model="plataformDefault" isDisabled/>
                            <Checkbox :modelValue="isChatSChecked('email_notify_not_answered_chat_to', 'Administrator')" @update:modelValue="updateChatSetting('email_notify_not_answered_chat_to', 'Administrator', $event)"/>
                        </div>
                        <!-- operator -->
                        <div class="flex justify-between flex-grow">
                            <Checkbox v-model="plataformDefault" isDisabled/>
                            <Checkbox :modelValue="isChatSChecked('email_notify_not_answered_chat_to', 'Operator')" @update:modelValue="updateChatSetting('email_notify_not_answered_chat_to', 'Operator', $event)"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- reputation online -->
        <div class="flex justify-between items-center pb-4 border-b hborder-gray-400 mt-8">
            <p class="text-lg font-semibold leading-[110%]">Reputación online</p>
            <div class="grid gap-10 grid-cols-3 w-[452px]">
                <div>
                    <p class="text-[10px] font-semibold leading-[130%] text-center">Propietario</p>
                    <!-- checkbox's -->
                    <div class="flex gap-6 mt-2">
                        <div>
                            <p class="text-[10px] font-semibold leading-[130%] text-center">Plataforma</p>
                            <div class="mt-1 text-center">
                                <Checkbox v-model="plataformDefault" isDisabled/>
                            </div>
                        </div>
                        <div class="flex-grow">
                            <p class="text-[10px] font-semibold leading-[130%] text-center">Email</p>
                            <div class="mt-1 text-center">
                                <Checkbox v-model="test"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <p class="text-[10px] font-semibold leading-[130%] text-center">Administrador</p>
                    <!-- checkbox's -->
                    <div class="flex gap-6 mt-2">
                        <div>
                            <p class="text-[10px] font-semibold leading-[130%] text-center">Plataforma</p>
                            <div class="mt-1 text-center">
                                <Checkbox v-model="plataformDefault" isDisabled/>
                            </div>
                        </div>
                        <div class="flex-grow">
                            <p class="text-[10px] font-semibold leading-[130%] text-center">Email</p>
                            <div class="mt-1 text-center">
                                <Checkbox v-model="test"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <p class="text-[10px] font-semibold leading-[130%] text-center">Operador</p>
                    <!-- checkbox's -->
                    <div class="flex gap-6 mt-2">
                        <div>
                            <p class="text-[10px] font-semibold leading-[130%] text-center">Plataforma</p>
                            <div class="mt-1 text-center">
                                <Checkbox v-model="plataformDefault" isDisabled/>
                            </div>
                        </div>
                        <div class="flex-grow">
                            <p class="text-[10px] font-semibold leading-[130%] text-center">Email</p>
                            <div class="mt-1 text-center">
                                <Checkbox v-model="test"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- feedback -->
        <div v-if="querySettings.email_notify_new_feedback_to" class="mt-6">
            <h2 class="text-base font-medium leading-[120%]">Seguimiento</h2>
            <div class="shadow-hoster rounded-[10px] bg-white py-6 mt-4">
                <!-- new feedback -->
                <div class="border-b hborder-gray-400 pb-4 px-4 flex items-center">
                    <div>
                        <h3 class="text-base font-medium leading-[140%]">Nuevo feedback</h3>
                        <p class="text-sm leading-[150%] mt-2">Notificar cuando se reciba un nuevo feedback.</p>
                    </div>
                    <div class="w-[418px] ml-auto flex gap-[74px]">
                        <!-- owner -->
                        <div class="flex justify-between flex-grow">
                            <Checkbox v-model="plataformDefault" isDisabled/>
                            <Checkbox :modelValue="isSQChecked('email_notify_new_feedback_to', 'Associate')" @update:modelValue="updateQuerySetting('email_notify_new_feedback_to', 'Associate', $event)"/>
                        </div>
                        <!-- administrator -->
                        <div class="flex justify-between flex-grow">
                            <Checkbox v-model="plataformDefault" isDisabled/>
                            <Checkbox :modelValue="isSQChecked('email_notify_new_feedback_to', 'Administrator')" @update:modelValue="updateQuerySetting('email_notify_new_feedback_to', 'Administrator', $event)"/>
                        </div>
                        <!-- operator -->
                        <div class="flex justify-between flex-grow">
                            <Checkbox v-model="plataformDefault" isDisabled/>
                            <Checkbox :modelValue="isSQChecked('email_notify_new_feedback_to', 'Operator')" @update:modelValue="updateQuerySetting('email_notify_new_feedback_to', 'Operator', $event)"/>
                        </div>
                    </div>
                </div>
                <!-- inactive feedback -->
                <div class="pt-4 px-4 flex items-center">
                    <div>
                        <h3 class="text-base font-medium leading-[140%]">Feedback pendiente</h3>
                        <p class="text-sm leading-[150%] mt-2">Notificar cuando hayan transcurrido 10 minutos con un feedback pendiente.</p>
                    </div>
                    <div class="w-[418px] ml-auto flex gap-[74px] flex-shrink-0">
                        <!-- owner -->
                        <div class="flex justify-between flex-grow">
                            <Checkbox v-model="plataformDefault" isDisabled/>
                            <Checkbox :modelValue="isSQChecked('email_notify_pending_feedback_to', 'Associate')" @update:modelValue="updateQuerySetting('email_notify_pending_feedback_to', 'Associate', $event)"/>
                        </div>
                        <!-- administrator -->
                        <div class="flex justify-between flex-grow">
                            <Checkbox v-model="plataformDefault" isDisabled/>
                            <Checkbox :modelValue="isSQChecked('email_notify_pending_feedback_to', 'Administrator')" @update:modelValue="updateQuerySetting('email_notify_pending_feedback_to', 'Administrator', $event)"/>
                        </div>
                        <!-- operator -->
                        <div class="flex justify-between flex-grow">
                            <Checkbox v-model="plataformDefault" isDisabled/>
                            <Checkbox :modelValue="isSQChecked('email_notify_pending_feedback_to', 'Operator')" @update:modelValue="updateQuerySetting('email_notify_pending_feedback_to', 'Operator', $event)"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </section>
    <ChangesBar />
</template>
<script setup>
import { ref, onMounted } from 'vue'
import MenuSettings from './components/MenuSettings.vue';
import Checkbox from '@/components/Forms/Checkbox.vue'
import ChangesBar from '@/components/Forms/ChangesBar.vue'
//store
import { useQuerySettingsStore } from '@/stores/modules/queries/querySettings';
import { useChatSettingsStore } from '@/stores/modules/chat/chatSettings';

const querySettingsStore = useQuerySettingsStore();
const chatSettingsStore = useChatSettingsStore();

const plataformDefault = ref(true)
const querySettings = ref([])
const chatSettings = ref([])

const emailOwnerChecked = ref(false);
const emailAdminChecked = ref(false);
const emailOperatorChecked = ref(false);


onMounted(async () => {
    await getQuerySettings();
    await getChatSettings();
    ['Associate', 'Administrator', 'Operator'].forEach(checkAndUpdateMasterCheckbox);
})

const getQuerySettings = async() =>{
    querySettings.value = await querySettingsStore.$getAll();
}

const getChatSettings = async() =>{
    chatSettings.value = await chatSettingsStore.$getAll();
}


const isSQChecked = (settingKey, role) => {
    if(querySettings.value[settingKey]){
        return querySettings.value[settingKey].includes(role);
    }
    return false;
    
}

const updateQuerySetting = (settingKey, role, isChecked) => {
    if (isChecked) {
        if (!querySettings.value[settingKey].includes(role)) {
            querySettings.value[settingKey].push(role);
        }
    } else {
        const index = querySettings.value[settingKey].indexOf(role);
        if (index > -1) {
            querySettings.value[settingKey].splice(index, 1);
        }
    }
}

const isChatSChecked = (settingKey, role) => {
    if(chatSettings.value[settingKey]){
        return chatSettings.value[settingKey].includes(role);
    }
    return false;
    
}

const updateChatSetting = (settingKey, role, isChecked) => {
    if (isChecked) {
        if (!chatSettings.value[settingKey].includes(role)) {
            chatSettings.value[settingKey].push(role);
        }
    } else {
        const index = chatSettings.value[settingKey].indexOf(role);
        if (index > -1) {
            chatSettings.value[settingKey].splice(index, 1);
        }
    }
}
const updateEmailsForRole = (role, newValue) => {
    const settingsKeys = [
        'email_notify_new_message_to',
        'email_notify_pending_chat_to',
        'email_notify_not_answered_chat_to'
    ];

    settingsKeys.forEach(key => {
        if (newValue === false) {
            chatSettings.value[key][role] = false;
        } else {
            chatSettings.value[key][role] = true;
        }
    });
    checkAndUpdateMasterCheckbox(role);
}

const checkAndUpdateMasterCheckbox = (role) => {
    const settingsKeys = [
        'email_notify_new_message_to',
        'email_notify_pending_chat_to',
        'email_notify_not_answered_chat_to'
    ];
    console.log('chatSettings.value',chatSettings.value)
    const allChecked = settingsKeys.every(key => chatSettings.value[key][role]);
    const anyChecked = settingsKeys.some(key => chatSettings.value[key][role]);
    console.log('role',role)
    console.log('allChecked',allChecked)
    console.log('anyChecked',anyChecked)
    if (role === 'Associate') {
        emailOwnerChecked.value = allChecked;
    } else if (role === 'Administrator') {
        emailAdminChecked.value = allChecked;
    } else if (role === 'Operator') {
        emailOperatorChecked.value = allChecked;
    }

    // Si todos están desactivados, se puede usar `anyChecked` para manipular el comportamiento inverso
}


</script>
