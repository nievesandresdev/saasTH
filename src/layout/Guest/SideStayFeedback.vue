<template>
    <aside 
        class="w-[354px] flex-shrink-0 sticky left-0 z-40 hbg-gray-100 shadow-hoster"
    >
        <div class="flex flex-col h-full" :class="['sidebar', showSideBar ? 'sidebar-open' : '',userStore.showSuscriptionBanner ? 'top-with-banner h-with-banner' : 'h-without-banner']">
            <!-- guest data -->
            <div 
                v-if="data?.guest" 
                class="pt-8 px-6 header-shadow bg-white"
                :class="{'pb-8':countStayTest == 0,'pb-2':countStayTest > 0}"
            >
                <div class="flex items-center">
                    <img
                        class="w-20 h-12 rounded-[10px] object-cover"
                        :src="`https://ui-avatars.com/api/?name=${data.guest?.acronym}&color=fff&background=${data.guest.color}`"
                    >
                    <div class="ml-4">
                        <h1 class="text-lg font-semibold leading-[120%]">{{data.guest?.name}} {{data.guest?.lastname}}</h1>
                        <div class="flex items-center">
                            <h2 class="text-sm font-medium leading-[140%]">Idioma - {{ $nameLanguage(data.guest?.lang_web) }}</h2>
                            <img
                                class="w-5 h-5 ml-2"
                                :src="`/assets/icons/flags/${data.guest?.lang_web}.svg`"
                            >
                        </div>
                    </div>
                </div>
            </div>
            <!-- alert section test -->
            <div class="bg-[#FFF2CC] px-6 py-2 flex items-start gap-2" v-if="countStayTest > 0">
                <img class="w-5 h-5" src="/assets/icons/info.svg">
                <p class="text-xs font-medium leading-[150%]">Hemos generado huéspedes  de prueba para mejorar tu experiencia durante el free trial.</p>
            </div>
            <div class="border-t-2 hborder-color-gray-400"></div>
            <div v-if="data?.guest" class="overflow-y-auto flex-grow custom-scrollbar bg-white">
                <div class="pt-8"></div>
                <div class="px-6">
                    <TimeLineQueries :feedback="data.queries" />
                    <div class="mt-6 border-b hborder-color-gray-400"></div>
                </div>

                <!-- stay data -->
                <div v-if="data?.stay" class="mt-6 px-6">
                    <div class="pb-6 border-b hborder-color-gray-400">
                        <h1 class="text-sm font-semibold leading-[120%]">Estancia</h1>
                        <div class="flex mt-4 items-center">
                            <div class="w-[121px]">
                                <span
                                    class="px-4 py-1 text-[10px] font-semibold leading-[130%] rounded-full"
                                    :class="{
                                        'bg-[#D9E8F2]':data.stay.period == 'pre-stay',
                                        'bg-[#F2F2F2F2]':data.stay.period == 'post-stay' || data.stay.period == 'invalid-stay',
                                        'bg-[#D9F2E9]':data.stay.period == 'in-stay'
                                    }"
                                >
                                    {{ translatePeriod[data.stay.period] }}
                                </span>
                            </div>
                            <div class="flex items-center h-full">
                                <img v-if="data.stay.period == 'in-stay'" class="w-4 h-4 mr-[7px]" src="/assets/icons/1.TH.ROOM.svg" alt="">
                                <p class="text-[10px] leading-[130%]" v-html="data.stay.detailPeriod"></p>
                            </div>
                        </div>
                        <div class="flex mt-4">
                            <div class="w-[121px]">
                                <h2 class="text-xs font-semibold leading-[130%]">Check-in</h2>
                                <h1 class="text-[22px] font-medium leading-[110%] mt-1">{{ data.stay.formatCheckin.dayMonth }}</h1>
                                <span class="text-[10px] font-semibold leading-[130%] htext-gray-500">{{ data.stay.formatCheckin.year }}</span>
                            </div>
                            <div class="">
                                <h2 class="text-xs font-semibold leading-[130%]">Check-Out</h2>
                                <h1 class="text-[22px] font-medium leading-[110%] mt-1">{{ data.stay.formatCheckout.dayMonth }}</h1>
                                <span class="text-[10px] font-semibold leading-[130%] htext-gray-500">{{ data.stay.formatCheckout.year }}</span>
                            </div>
                        </div>

                        <div class="flex mt-4">
                            <div class="w-[121px] flex items-center">
                                <img class="w-4 h-4" src="/assets/icons/1.TH.ROOM.svg" alt="">
                                <p class="text-sm font-medium leading-[110%] ml-2">{{ data.stay.room ?? '-' }}</p>
                            </div>
                            <div v-if="data.stay.middle_reservation" class="flex">
                                <img
                                    v-if="middle_icons[data.stay.middle_reservation]"
                                    class="w-4 h-4" :src="middle_icons[data.stay.middle_reservation]"
                                >
                                <p class="text-sm font-medium leading-[110%] ml-2">{{ data.stay.middle_reservation }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- notes data -->
                <div v-if="data?.stay" class="mt-6 px-6">
                    <div class="pb-6 border-b hborder-color-gray-400">
                        <h1 class="text-sm font-semibold leading-[120%] relative">
                            Notas
                            <span class="font-normal">
                                ({{data.guest.notes.length}})
                            </span>
                            <div class="w-10 absolute right-0 top-[-10px]">
                                <HoveredIcon
                                    :src="`/assets/icons/${ openNotes ? '1.TH.I.DROPDOWN.OPEN' : '1.TH.I.dropdown'}.svg`"
                                    :height_icon="'24px'"
                                    :width_icon="'24px'"
                                    :padding_container="'8px'"
                                    style="--background-color: #f3f3f3;"
                                    @click="openNotes = !openNotes"
                                />
                            </div>
                        </h1>

                        <div
                            v-if="openNotes"
                            class="mt-4"
                            v-for="(note, index) in data.guest.notes"
                        >
                            <p class="text-xs font-semibold leading-[130%]">
                                {{$formatTimestampDate(note.created_at, 'dd/MM/yyyy')}} - {{$formatTimestampDate(note.created_at, 'HH:mm')}}hs
                            </p>
                            <div
                                class="pb-4 mt-2"
                                :class="{'border-b hborder-color-gray-400' : index < (data.guest.notes.length-1)}"
                            >
                                <p class="text-sm leading-[140%]" v-html="note.content"></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </aside>
</template>
<script setup>
import { watch, ref, provide } from 'vue'
import { useRoute } from 'vue-router';
import TimeLineQueries from '../Queries/TimeLineQueries.vue'
import HoveredIcon from '@/components/Buttons/HoveredIcon.vue'
//store
import { useQueryStore } from '@/stores/modules/queries/query';
import { useUserStore } from '@/stores/modules/users/users'

const userStore = useUserStore();
const queryStore = useQueryStore();

const data = ref(null)
const openNotes = ref(false)
const showSideBar = ref(false)
const countStayTest = ref(0)

const route = useRoute();

watch(() => route.query.g, async (newId) => {
    showSideBar.value = false;
    if(newId){
        let params ={
            guestId: newId,
            stayId: route.params.stayId,
        }
        data.value = await queryStore.$getFeedbackSummaryByGuest(params);
        console.log('test data',data.value)
        countStayTest.value = data.value.countStayTest;
        if(!showSideBar.value){
            showSideBar.value = true;
        }
    }else{
        data.value = null;
    }
}, { immediate: true });  

const translatePeriod = {
    "pre-stay":"PRE-STAY",
    "in-stay":"STAY",
    "post-stay":"POST-STAY",
    "invalid-stay":"POST-STAY",
}

const middle_icons = {
    "Booking": '/assets/icons/otas/Booking.svg',
    "TripAdvisor": '/assets/icons/otas/TripAdvisor.svg',
    "Expedia": '/assets/icons/otas/Expedia.svg',
    "Hotels.com": '/assets/icons/hotels.com.svg',
    "Email": '/assets/icons/1.TH.EMAIL.svg',
    "Hotel desk": '/assets/icons/TH.Huesped.icono.navbar.home-1.svg',
    "Global Distribution System": '/assets/icons/1.TH.RESERVA.svg',
};
</script>
<style scoped>
.header-shadow {
    box-shadow: 0px 3.5px 7px 0px rgba(0, 0, 0, 0.15);
}

.sidebar {
    transition: transform 0.3s ease-in-out;
    transform: translateX(100%); /* Empieza oculto a la derecha */
    width: 354px; /* Asegúrate de establecer un ancho fijo */
    position: fixed; /* Opcional: Asegura que el sidebar sea flotante y no desplace otros elementos */
    right: 0; /* Alineado a la derecha de la vista */
    height: 100%; /* Ajusta según necesidad */
}

.sidebar-open {
    transform: translateX(0); /* Desliza el sidebar a la vista */
}

</style>
