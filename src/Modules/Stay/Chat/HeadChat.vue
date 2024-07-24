<template>
    <div class="px-6 pt-6 bg-[#FAFAFA] w-full sticky top-11 left-0">
        <div class="flex justify-between items-start w-full">
            <div class="flex">
                <div
                v-for="guest in listGuests"
                class="text-base leading-[110%] font-medium pb-2 relative cursor-pointer"
                :key="guest.id"
                :class="{
                    'bg-white border-t border-l border-r border-shadow-border pt-4 pr-4  pl-4 rounded-t-lg': Number(route.query.g) == guest.id,
                    'text-gray-500 pt-4 pr-4 pl-4 hover:bg-[#ECF9F5] hover:rounded-t-lg': Number(route.query.g) !== guest.id,
                }"
                @click="goGuest(guest.id)"
            >
                <div class="text-[#0B6357] font-semibold relative">
                    <img
                        v-if="guest.chats[0]?.messages_count"
                        class="w-2.5 h-2.5 absolute top-[-4px] right-[-8px]"
                        src="/assets/icons/EllipseWarning.svg" alt=""
                    >
                    {{ guest.name ?? 'Sin nombre'}}
                </div>
            </div>
        </div>



            <!-- Toggle pendiente - atendido -->
            <div class="flex items-center">
                <p class="text-sm font-medium mr-2">
                    Pendiente
                </p>
                <ToggleButton
                    v-model="pending"
                    @change="togglePending"
                    :id="`toggle-${chat?.id}`"
                    :disabledColor="`${chat?.id ? '#FFC506' : '#BFBFBF'}`"
                    :disabled="chat?.id ? sendingChange : true"
                />
                <p class="text-sm font-medium ml-2">
                    Atendido
                </p>
            </div> <!-- fin Toggle pendiente - atendido -->
        </div>
        <!-- <div class="border-b border-gray-300 mt-6"></div> -->
    </div>
</template>

<script setup>
import { ref, inject, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ToggleButton from '@/components/Buttons/ToggleButton.vue'
//store
import { useChatStore } from '@/stores/modules/chat/chat'
//composable
import { useToastAlert } from '@/composables/useToastAlert'



const chatStore = useChatStore();

//PROPS
const props = defineProps({
    chat: {
        type: Object,
        default: () => ({}),
    },
    listGuests: {
        type: Array,
        default: () => ([]),
    }
})
const pending = ref(props.chat ? !props.chat?.pending : false)
const sendingChange = ref(false)

const emit = defineEmits(['updateGuestMessagesCount']);
const toast = useToastAlert();
const route = useRoute()
const router = useRouter()

watch(() => props.chat, async (newChat) => {
    pending.value = newChat ? !newChat?.pending : false;
}, { immediate: true, deep: true });  

//function
const togglePending =() =>{
    sendingChange.value  = true;
    chatStore.$togglePending(route.query.g, route.params.stayId, !pending.value)
    toast.warningToast('Actualizado','top-right');
    sendingChange.value  = false;
}

function goGuest(guestId){
    emit('updateGuestMessagesCount', guestId, 0);
    router.push({
        name: 'StayChatRoom',
        params: { stayId: route.params.stayId },
        query: { g: guestId }
    });
}

// function makePendingChat (){
//     pending.value = false;
// }

// // Exponer el método para que pueda ser accesible desde el padre
// defineExpose({
//     makePendingChat
// });
</script>
<style scoped>
.hbg-warning:hover{
    background-color: #EBC44C;

}
input:checked ~ .block:hover {
    background-color: #2A8873 !important;
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

