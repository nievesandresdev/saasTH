<template>
    <div class="body-chat flex-grow p-6 bg-white border-b border-l border-r border-shadow-border overflow-y-auto scrolling-sticky scrolling-sticky-main mb-5 mr-5 ml-6">
        <!-- card message -->
        <div class="flex flex-col justify-end">
            <div
                class="card_message mb-6 inline-block"
                v-for="msg in messages" :key="msg"
                :class="{'ml-auto':msg.by == 'Hoster','mr-auto':msg.by !== 'Hoster'}"
            >
                <p v-if="msg.by == 'Guest' && msg.messageable" class="text-sm font-medium mb-2">{{$capitalizeFirstLetter(msg.messageable.name)}}</p>
                <p v-if="msg.by == 'Hoster' && msg.automatic" class="text-xs mb-2 text-right">Respuesta automática</p>
                <p
                    class="p-2 rounded-[10px]"
                    :class="{'hbg-green-800 htext-white-100':msg.by == 'Hoster','bg-[#FAFAFA] font-[#333333]  ':msg.by == 'Guest'}"
                >
                    {{ msg.text }}
                </p>
                <div :class="{'text-left' : msg.by == 'Guest','text-right' : msg.by == 'Hoster'}">
                    <p class="text-xs mt-2 inline">{{ $formatTimestampDate(msg.created_at,'dd/MM/yyyy') }} - {{ $formatTimestampDate(msg.created_at,'HH:mm')}}</p>
                    <template v-if="msg.by == 'Hoster'">
                        <p class="text-xs mt-2 inline font-semibold ml-2 mr-1">{{msg.status}}</p>
                        <img class="inline w-4 h-4" v-if="msg.status=='Entregado'" src="/assets/icons/2.TH.DobleCheck.svg" alt="">
                        <img class="inline w-4 h-4" v-if="msg.status=='Leído'" src="/assets/icons/2.TH.DobleCheckGREEN.svg" alt="">
                    </template>
                </div>
            </div>
        </div>
        <!--END card message -->
        <template v-if="messages.length == 0">
            <div class="flex flex-col h-10 w-full">
                <img class="mt-auto mx-auto w-[330px] h-[294px]" src="/assets/icons/Chat_Conversation.svg" alt="">
                <p class="text-center mt-8 htext-gray-500 text-sm font-medium mb-auto mx-auto max-w-[710px]">
                    Utiliza el chat para responder las preguntas de tus huéspedes. Asegúrate de contestar o marcar como resuelto para dejar de recibir notificaciones.
                </p>
            </div>
        </template>
    </div>
</template>
<script setup>
import { watch , onMounted } from 'vue'
import { $capitalizeFirstLetter } from '@/utils/textWritingTypes'

const props = defineProps({
    messages: {
        type: Array,
        default: () => ([]),
    },
})
watch(
    () => props.messages,
    (newValue, oldValue) => {
        setTimeout(scrollToBottom, 100);
    },
    { deep: true }
);

onMounted(() => {
    scrollToBottom();
});
const scrollToBottom = () => {
    var chatContainer = document.querySelector('.body-chat');
    chatContainer.scrollTop = chatContainer.scrollHeight;
}
</script>
<style lang="scss" scoped>
@media (min-width:1280px){
    .card_message{
        min-width: 186px;
        max-width: 395px;
    }
}

@media (min-width:1440px){
    .card_message{
        min-width: 199px;
        max-width: 423px;
    }
}

@media (min-width:1920px){
    .card_message{
        min-width: 205px;
        max-width: 663px;
    }
}

.scrolling-sticky {
    &::-webkit-scrollbar {
    -webkit-appearance: none;
    }
    &::-webkit-scrollbar:vertical {
        width:16px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #BFBFBF;
        border-radius: 20px;
        border: 4px solid #fff;
    }
    &::-webkit-scrollbar-track {
        border-radius: 10px;
        background-color: #fff;
    }
    &::-webkit-scrollbar:horizontal{
        width:0;
        height: 0;
    }
}
.scrolling-sticky-main {
    &::-webkit-scrollbar-thumb {
        border: 4px solid #fafafa !important;
    }
    &::-webkit-scrollbar-track {
        background-color: #fafafa !important;
    }
}

.shadow-sides::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.15), 4px 0 6px -1px rgba(0, 0, 0, 0.1);
    border-radius: inherit; /* To match the rounded corners */
}


</style>
