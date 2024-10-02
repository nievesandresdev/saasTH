<template>
    <!-- <HeadSection /> -->
    <div
        class="flex flex-col relative chat-container"
    >
        <!-- header -->
        <HeadChat
            :chat="dataChat"
            :listGuests="listGuests"
            v-if="listGuests?.length"
            ref="HeadChatComponent"
            @updateGuestMessagesCount="handleUpdateGuestMessagesCount"
        />
        <!-- body -->
        <BodyChat :messages="dataMessages" />
        <!-- foot -->
        <div class="mx-6 pt-2 pb-1 pl-6 pr-3 hbg-white-100 flex sticky bottom-0 border-x">
            <textarea
                ref="messageTextarea"
                class="flex-grow border-0 rounded-10 resize-none overflow-hidden pl-2 py-2.5 pr-0 text-sm leading-[115%]"
                placeholder="Escribe un mensaje..."
                v-model="msg"
                rows="1"
                @input="adjustTextareaHeight"
                @keyup.enter="sendMsg"
                @keydown.enter="handleEnter"
            ></textarea>
            <div class="ml-1 my-auto">
                <HoveredIcon
                    :src="'/assets/icons/2.TH.Sendicon.svg'"
                    :height_icon="'24px'"
                    :width_icon="'24px'"
                    :padding_container="'4px'"
                    style="--background-color: #f3f3f3;"
                    @click="sendMsg"
                />
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, watch, provide, onUnmounted, nextTick } from 'vue';
import { useRoute, onBeforeRouteLeave } from 'vue-router';
import { getPusherInstance } from '@/utils/pusherSingleton'
//
// import HeadSection from '../components/HeadDetail.vue'
import BodyChat from './BodyChat'
import HeadChat from './HeadChat'
import HoveredIcon from '@/components/Buttons/HoveredIcon.vue';
//store
import { useStaySessionsStore } from '@/stores/modules/stay/staySessions';
import { useChatStore } from '@/stores/modules/chat/chat'

const staySessionsStore = useStaySessionsStore();
const chatStore = useChatStore();

const route = useRoute();

const data = ref({
    guests:[]
})
const session = ref([])
const dataChat = ref(null)
const dataMessages = ref([])
const listGuests = ref([])

const msg = ref(null)
const messageTextarea = ref(null)
const maxHeight = 125; // Altura máxima en píxeles

//pusher
const channelChat = ref(null)
const pusher = ref(null)


onMounted(async() => {
    data.value.guests = await chatStore.$getGuestListWNoti(route.params.stayId);
    listGuests.value = data.value.guests;
    window.addEventListener('beforeunload', handleBeforeUnload);
    nextTick(() => {
        const textarea = messageTextarea.value;
        textarea.style.height = '34px'; 
    });
})

onUnmounted(() => {
    unSuscribePusher()
});
onBeforeRouteLeave((to, from, next) => {
    if (
        !['StayDetailPage', 'StayQueryDetail', 'StayChatRoom'].includes(to.name) || 
        to.params.stayId !== from.params.stayId && to.name == 'StayDetailPage' 
    ) {
        // Ejecutar `deleteSession`  si la ruta de destino no está en el array allowedRoutes
        // o ejecutar deleteSession si esta ingresando a otra estancia
        deleteSession();
    }
    next();
});


const unSuscribePusher = () => {
    if (channelChat.value) {
        channelChat.value.unbind('App\\Events\\UpdateChatEvent');
        channelChat.value.unbind('App\\Events\\MsgReadChatEvent');
        pusher.value.unsubscribe(channelChat.value);
    }
}
const handleBeforeUnload = (event) => {
    const user = JSON.parse(localStorage.getItem('user'));
    staySessionsStore.$deleteSessionWithApiKey(route.params.stayId, user.email)
    delete event['returnValue']; // Evitar la alerta del navegador
}

const sendMsg = async (e) => {
    if (!e.shiftKey) {
        let text = msg.value
        msg.value = null
        await chatStore.$sendMsg(route.query.g, route.params.stayId, text)
        // await getDataChat(false);
    }
}

const handleEnter = (e) => {
    // Si la tecla Shift NO está presionada, entonces preventDefault para evitar el salto de línea
    if (!e.shiftKey) {
        e.preventDefault()
    }
}

const suscribePusher = (guestId) => {
    channelChat.value = 'private-update-chat.' + guestId
    pusher.value = getPusherInstance()
    channelChat.value = pusher.value.subscribe(channelChat.value)
    channelChat.value.bind('App\\Events\\UpdateChatEvent', async function (data) {
        // console.log('test UpdateChatEvent', data)
        dataChat.value = data.chatData;
        
        if(
            data?.message?.automatic || //mensaje automatico departe del hoster
            dataChat.value?.id == data.message?.chat_id //mensaje del hoster a otros hosters
        ){
            // console.log('cons UpdateChatEvent entro')
            dataMessages.value = [...dataMessages.value, data.message]
        }
        listGuests.value = await chatStore.$getGuestListWNoti(route.params.stayId, false);
        // callHeadChatComponent()
        // if (data.message.by == 'Guest' && current_route == 'stay.hoster.chat') {
        //     mark_msgs_as_read(props.stay.id)
        // }
    })
    channelChat.value.bind('App\\Events\\MsgReadChatEvent', function (data) {
        // dataChat.value = { ...dataChat.value, pending: true };
        // dataChat.value = dataChat.value;
        const count_msgs = dataMessages.value.length
        const arr = dataMessages.value
        for (let i = count_msgs - 1; i >= 0; i--) {
            if (arr[i].status == 'Entregado' && arr[i].by == 'Hoster') {
                arr[i].status = 'Leído'
            } else if (arr[i].status == 'Entregado') {
                break
            }
        }
        dataMessages.value = arr
    })
}

const getDataChat = async (showLoadPage = true) =>{
    let { chat, messages } = await chatStore.$getDataRoom(route.params.stayId, route.query.g, showLoadPage)
    dataChat.value = chat;
    dataMessages.value = messages;
}

const handleUpdateGuestMessagesCount = (guestId, newCount)  => {
    const index = listGuests.value.findIndex(guest => guest.id === guestId);
    if (index !== -1 && listGuests.value[index].chats && listGuests.value[index].chats[0]) {
        listGuests.value[index].chats[0].messages_count = newCount;
    }
}

const adjustTextareaHeight = () => {
    const textarea = messageTextarea.value;
    textarea.style.height = 'auto';
    if (textarea.scrollHeight > maxHeight) {
        textarea.style.height = maxHeight + 'px';
        textarea.classList.remove('overflow-hidden');
        textarea.classList.add('overflow-y-auto');
    } else {
        textarea.style.height = textarea.scrollHeight + 'px';
        textarea.classList.remove('overflow-y-auto');
        textarea.classList.add('overflow-hidden');
    }
};

const deleteSession = async () => {
    let user = JSON.parse(localStorage.getItem('user'));
    if(user){
        await staySessionsStore.$deleteSession(route.params.stayId ,'sessions', user.email);
    }
}

watch(() => route.query.g, async (newId,oldId) => {
    if(oldId){
        unSuscribePusher()
    }
    suscribePusher(newId)
    await getDataChat();
}, { immediate: true });  
provide('data',data)
// provide('session',session)
</script>
<style scoped>
textarea:focus{
    border:none;
}
.chat-container {
    height: calc(100vh - 143px);
}
</style>
