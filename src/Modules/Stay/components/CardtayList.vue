<template>
    <div
        class="aside-stay-card border-t border-b p-4 cursor-pointer hover-gray-100 relative"
        :class="{'hbg-green-200':route.params.stayId == stay.id}"
        @click="goDetailStay(stay.id, stay.trial)"
    >
        <div class="flex items-center">
            <img class="w-5 h-5" src="/assets/icons/1.TH.schedule.svg" alt="">
            <p class="text-xs font-semibold leading-[130%] ml-1">{{ formatDate(stay.check_in) }} - {{ formatDate(stay.check_out) }}</p>
            <span
                class="px-2 py-1 text-[10px] font-semibold leading-[130%] rounded-full ml-2"
                :class="{
                    'bg-[#D9E8F2]':stay.period == 'pre-stay',
                    'bg-[#F2F2F2F2]':stay.period == 'post-stay' || stay.period == 'invalid-stay',
                    'bg-[#D9F2E9]':stay.period == 'in-stay'
                }"
            >
                {{ translatePeriod[stay.period] }}
            </span>

            <img class="w-5 h-5 ml-auto" src="/assets/icons/1.TH.ROOM.svg" alt="">
            <p class="text-xs font-semibold leading-[120%] ml-1">{{ stay.room ?? '-' }}</p>
        </div>

        <div class="flex justify-between items-center mt-2">
            <div class="flex items-center">
                <img 
                    class="w-10 h-6 rounded-[5px] object-cover" 
                    v-if="guest1"
                    :src="`https://ui-avatars.com/api/?name=${guest1.acronym}&color=fff&background=${guest1.color}`"
                >
                <div v-if="guest2" class="bg-white rounded-[5px] relative px-[2px] left-[-2.5px]">
                    <img 
                        class="w-10 h-6 rounded-[5px] object-cover" 
                        :src="`https://ui-avatars.com/api/?name=${guest2.acronym}&color=fff&background=${guest2.color}`"
                    >
                </div>
                <p 
                    v-if="stay.guests.length > 2"
                    class="text-xs font-semibold leading-[120%]"
                >{{ '+'+(stay.guests.length - 2) }}</p>
                <!-- tag trail stay -->
                <div 
                    class="rounded-full ml-2 bg-[#FFF3CC] px-2 py-1 flex items-center gap-2"
                    v-if="stay.trial"
                >
                    <img class="w-4 h-4" src="/assets/icons/1.TH.logo.svg" alt="">
                    <h1 class="text-[10px] font-semibold leading-[90%]">Prueba</h1>
                </div>
            </div>

            <!-- iconos de notificacion -->
            <div class="flex items-center">
                <img 
                    v-if="stay.pending_queries_count > 0"
                    class="w-[21px] h-[21px] ml-2 relative top-[-0.6px]" src="/assets/icons/1.TH.SEGUIMIENTO.NOTIFY.svg"
                >
                <img 
                    v-else-if="stay.answered_queries_count > 0"
                    class="w-5 h-5" src="/assets/icons/1.TH.SEGUIMIENTO.svg"
                >
                <!-- chat -->
                <img 
                    v-if="stay.chats.length && !stay.has_pending_chats" 
                    class="w-5 h-5 ml-2" src="/assets/icons/1.TH.CHAT.svg"
                >
                <img 
                    v-if="stay.chats.length && stay.has_pending_chats"    
                    class="w-[21px] h-[21px] ml-2 relative top-[-0.6px]" src="/assets/icons/1.TH.CHAT.NOTIFY.svg"
                >
            </div>
        </div>
        <div v-if="stay.has_pending_chats || stay.pending_queries_count" class="absolute h-full right-0.5 top-0 w-1 hbg-warning z-10"></div>
    </div>
</template>
<script setup>
import { ref, watch } from 'vue';
import { DateTime } from 'luxon';
import { useRouter, useRoute } from 'vue-router';


const router = useRouter();
const route = useRoute();

const props = defineProps({
    stay: {
        type: Object,
        default: null,
    },
    search: {
        type: String,
        default: null,
    }
});

watch(() => props.search, (newSearch, oldSearch) => {
    searchUpdate.value = newSearch;
});

const searchUpdate = ref(props.search);
const guest1 = ref(props.stay.guests[0] ?? null);
const guest2 = ref(props.stay.guests[1] ?? null);
const translatePeriod = {
    "pre-stay": "PRE-STAY",
    "in-stay": "STAY",
    "post-stay": "POST-STAY",
    "invalid-stay": "POST-STAY",
};

function goDetailStay(id,trial) {
    let queryParams = { search: searchUpdate.value };
    if(trial){
        queryParams = { search: searchUpdate.value, trial: true }
    }
    router.push({
        name: 'StayDetailPage',
        params: { stayId: id },
        query: queryParams
    });
}

// Función para formatear las fechas usando Luxon
const formatDate = (date) => {
    return DateTime.fromISO(date).toFormat('dd/MM');
};
</script>

