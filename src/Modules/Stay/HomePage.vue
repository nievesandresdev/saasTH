<template>
    <div class="px-6">
        <!-- head -->
        <section class="py-5 flex justify-between items-end border-b hborder-gray-400">
            <h1 class="text-[22px] font-medium leading-[110%]">Visión general de las estancias</h1>
            <Tooltip
                size="l"
                :top="25"
                :right="0"
            >
                <template v-slot:button>
                    <img class="w-6 h-6" src="/assets/icons/info.blue.svg">
                </template>
                <template v-slot:content>
                    <p class="text-sm leading-[150%]">
                        Selecciona una <span class="font-semibold">Estancia</span> del menu lateral para operar en ella. Podrás consultar 
                        las fechas de <span class="font-semibold">Check-in</span> y <span class="font-semibold">Check-out</span>, la información y el <span class="font-semibold">feedback</span> de tus 
                        huéspedes y <span class="font-semibold">chatear</span> con ellos.
                    </p>
                </template>
            </Tooltip>
        </section>

        <!-- stays info -->
        <section class="mt-6 flex gap-6">
            <!-- today info-->
            <div class="border hborder-gray-400 rounded-[10px] py-6 pl-4 pr-4 3xl:pl-[37px] 3xl:pr-[91px] flex items-center flex-shrink-0 bg-white">
                <!-- current date -->
                <div class="w-[96px]">
                    <h3 class="text-[20px] font-semibold leading-[90%] text-center">Hoy</h3>
                    <h1 class="text-[64px] font-semibold leading-[90%] text-center mt-1"> {{ statistics?.today ?? 0 }}</h1>
                    <h4 class="text-base font-semibold leading-[90%] text-center mt-1">{{ statistics?.month ?? 0 }}</h4>
                </div>
                <div class="border-r hborder-gray-400 mx-2 h-full 3xl:mx-10"></div>
                <!-- counter checkin and checkout -->
                <div >
                    <div class="flex gap-1 items-center">
                        <img class="w-5 h-5" src="/assets/icons/1.TH.ESTANCIAS.MM.svg" >
                        <h5 class="text-sm font-medium leading-[90%]">{{statistics?.checkinToday ?? 0}} Estancias ingresan</h5>
                    </div>
                    <div class="flex gap-1 items-center mt-4">
                        <img class="w-5 h-5" src="/assets/icons/1.TH.ESTANCIAS.MM.svg" >
                        <h5 class="text-sm font-medium leading-[90%]">{{statistics?.checkoutToday ?? 0}} Estancias se van</h5>
                    </div>
                </div>
            </div>
            <!-- create and guest info -->
            <div class="py-6 px-4 flex shadow-hoster rounded-[10px] bg-white"> 
                <!-- create info -->
                <div class="w-[306px] 3xl:w-[465px] flex-shrink-0">
                    <p class="text-sm font-semibold leading-[120%]">¿Cómo se crean las estancias?</p>
                    <p class="mt-4 text-sm leading-[150%]">
                        Tus huéspedes crearán las estancias digitales cuando accedan a tu WebApp y carguen sus datos, las verás reflejadas en el menú lateral <strong>Estancias</strong>.
                    </p>
                </div>
                <div class="border-l hborder-gray-400 h-full mx-4"></div>
                <div class="flex flex-col">
                    <p class="text-sm leading-[150%]">
                        Configura los medios a través de los cuales tus huéspedes acceden a la WebApp de tu hotel desde
                        <router-link :to="{name:'ComunicationHome'}" class="italic font-medium underline hover:underline">aquí</router-link>.
                    </p>
                    <p class="text-sm leading-[150%]">
                        O puedes invitar a tus huéspedes desde el botón:
                    </p>
                    <button class="hbtn-primary py-3 px-2 h-8 text-xs font-medium leading-[0%] ml-auto mt-auto" @click="openInviteGuest = true">
                        Invitar huésped
                    </button>
                </div>
            </div>
        </section>

        <section class="mt-6 rounded-[10px] border hborder-gray-400 py-6 px-4 bg-white">
            <div class="flex gap-4 items-end">
                <!-- stay periods card -->
                <div class="flex-grow flex-1" v-for="(count, key, index) in statistics?.countsByPeriod" :key="index">
                    <h3 class="htext-green-800 text-[10px] font-semibold leading-[130%]" v-if="key == 'pre-stay'">ESTANCIAS</h3>
                    <h3 class="text-sm font-semibold leading-[120%] flex items-center mt-2" v-if="key == 'pre-stay'">
                        Activas en tu WebApp
                        <TooltipStayActive type="title"/>
                    </h3>
                    <div class="mt-4 border hborder-gray-400 rounded-[10px]">
                        <div class="py-2 px-4 rounded-t-[10px] bg-[#D9E8F2]" :class="stayColors[key]">
                            <h3 class="text-xs font-semibold leading-[130%] flex items-center">
                                <span class="uppercase">{{ $translatePeriod(key) }}</span>
                                <TooltipStayActive :type="key"/>
                            </h3>
                        </div>
                        <div class="p-4">
                            <div class="flex gap-2 items-center">
                                <img class="w-6 h-6" src="/assets/icons/1.TH.ESTANCIAS.MM.svg" >
                                <p class="text-sm font-medium leading-[140%]">{{ count }} {{count == 1 ? 'Estancia' : 'Estancias'}}</p>
                            </div>
                            <div class="flex gap-2 items-center mt-2">
                                <img class="w-6 h-6" src="/assets/icons/dashboard/1.TH.HUESPEDES.svg" >
                                <p class="text-sm font-medium leading-[140%]">{{ statistics.guestsByPeriod[key] }} {{statistics.guestsByPeriod[key] == 1 ? 'Huésped' : 'Huéspedes'}} </p>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- languages card -->
                <div class="flex-grow flex-1">
                    <h3 class="text-sm font-semibold leading-[120%]">Idiomas más utilizados</h3>
                    <div class="mt-4 border hborder-gray-400 rounded-[10px] p-4">
                        <div v-for="(item, key, index) in langsPercentage" :key="index" class="flex items-center" :class="{'mt-2':index >0}">
                            <img v-if="key !== 'others'" :src="`/assets/icons/flags/${key}.svg`" class="w-6 h-6 mr-1">
                            <img v-else src="/assets/icons/1.TH.SINIDIOMA.svg" class="w-6 h-6 mr-1">
                            <span class="text-base font-semibold leading-[120%] mr-1">
                                {{item}}% 
                            </span>
                            <span class="text-sm font-medium"> {{ $nameLanguage(key) == 'Desconocido' ? 'Otros' : $nameLanguage(key) }}</span>
                        </div> 
                    </div>
                </div>
            </div>
        </section>
    </div>
    <InviteGuest />
</template>
<script setup>
import { onMounted, ref, provide } from 'vue'
import Tooltip from '@/components/Tooltip.vue'
import TooltipStayActive from './components/TooltipStayActive.vue'
import InviteGuest from './components/InviteGuestModal.vue'
//store
import { useStayStore } from '@/stores/modules/stay/stay';

const stayStore = useStayStore();
const stayColors= {
    "pre-stay":'bg-[#D9E8F2]',
    "in-stay":'bg-[#D9F2E9]',
    "post-stay":'bg-[#F2F2F2F2]'
}

const statistics = ref([]);
const openInviteGuest = ref(false);
const langsPercentage = ref([]);
onMounted(async() => {
    statistics.value = await stayStore.$statisticsByHotel();  
    langsPercentage.value = statistics.value.percentageLangs;
})

provide('openInviteGuest',openInviteGuest)
</script>
