<template>
    <HeadSection />
    <div
        class="flex flex-col relative chat-container"
    >
        <!-- header -->
        <HeadChat
            :chat="dataChat"
            :listGuests="listGuests"
            v-if="listGuests?.length"
            ref="HeadChatComponent"
        />
        <!-- body -->
        <BodyChat :messages="dataMessages" />
        <!-- foot -->
        <div class="py-2 px-6 hbg-white-100 flex border-t sticky bottom-0">
            <textarea
                ref="messageTextarea"
                class="flex-grow border-0 rounded-10 h-8 hbg-gray-100 resize-none overflow-hidden"
                placeholder="Escribe un mensaje..."
                v-model="msg"
                rows="1"
                @input="adjustTextareaHeight"
                @keyup.enter="sendMsg"
                @keydown.enter="handleEnter"
            ></textarea>
            <div class="ml-2 my-auto">
                <HoveredIcon
                    :src="'/assets/icons/2.TH.Sendicon.svg'"
                    :height_icon="'24px'"
                    :width_icon="'24px'"
                    :padding_container="'8px'"
                    style="--background-color: #f3f3f3;"
                    @click="sendMsg"
                />
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, watch, provide } from 'vue';
import { useRoute, onBeforeRouteLeave } from 'vue-router';
//
import HeadSection from '../components/HeadDetail.vue'
import BodyChat from './BodyChat'
import HeadChat from './HeadChat'
import HoveredIcon from '@/components/Buttons/HoveredIcon.vue';
//store
import { useStayStore } from '@/stores/modules/stay/stay';
import { useChatStore } from '@/stores/modules/chat/chat'

const stayStore = useStayStore();
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


onMounted(async() => {
    data.value.guests = await chatStore.$getGuestListWNoti(route.params.stayId);
    listGuests.value = data.value.guests;
    session.value = await stayStore.$getSessions(route.params.stayId)
})

watch(() => route.query.g, async (newId) => {
    let { chat, messages } = await chatStore.$getDataRoom(route.params.stayId, route.query.g)
    // console.log('chat',chat)
    dataChat.value = chat;
    dataMessages.value = messages;
}, { immediate: true });  

onBeforeRouteLeave((to, from, next) => {
    if (!['StayDetailPage', 'StayQueryDetail', 'StayChatRoom'].includes(to.name)) {
        // Ejecutar `updateDetailSession` solo si la ruta de destino no está en el array allowedRoutes
        updateDetailSession();
    }
    next();
});

const sendMsg = (e) => {
    if (!e.shiftKey) {
        let text = msg.value
        msg.value = null
        // axios({
        //     url: route('stay.chat.send.msg', {
        //         stay_id: props.selected,
        //         guest_id: props.currentGuestId,
        //         text,
        //     }),
        //     method: 'POST',
        // }).then((res) => {
        //     get_messages()
        // })
    }
}

const handleEnter = (e) => {
    // Si la tecla Shift NO está presionada, entonces preventDefault para evitar el salto de línea
    if (!e.shiftKey) {
        e.preventDefault()
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

const updateDetailSession = async () => {
    let user = JSON.parse(sessionStorage.getItem('user'));
    await stayStore.$deleteSession(route.params.stayId ,'sessions', user.email);
}

// watch(() => route.query.g, async (newId) => {
//     data.value = await stayStore.$getDetailQueryByGuest(stayId.value,newId);
// }, { immediate: true });  
provide('data',data)
provide('session',session)
</script>
<style scoped>
.chat-container {
    height: calc(100vh - 139px);
}
</style>
