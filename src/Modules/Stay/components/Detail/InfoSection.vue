<template>
    <div class="shadow-hoster rounded-[10px] bg-white py-6 px-4 flex-grow">
        <h3 class="text-base font-semibold">Estancia</h3>
        <div class="mt-4 flex items-center gap-6">
            <!-- period and dates -->
            <div class="rounded-[10px] overflow-hidden flex flex-grow border-l border-r border-b border-gray-300">
                <div class="w-1/2">
                    <div class="hbg-green-600 px-4 py-1">
                        <p class="text-xs font-semibold text-white">Check-in</p>
                    </div>
                    <div class="p-4 flex items-center">
                        <img class="w-8 h-8" src="/assets/icons/1.TH.schedule.svg" alt="">
                        <div class="ml-1">
                            <h2 class="text-[22px] font-medium leading-[110%]">{{ data.formatCheckin.dayMonth }}</h2>
                            <span class="text-xs font-semibold leading-[110%] htext-gray-500">{{ data.formatCheckin.year }}</span>
                        </div>
                    </div>
                    <div class="border-t border-gray-300 px-4 py-2">
                        <span 
                            class="rounded-full px-4 py-1 text-[12px] font-semibold"
                            :class="{
                                'bg-[#D9E8F2]':data.period == 'pre-stay',
                                'bg-[#F2F2F2F2]':data.period == 'post-stay' || data.period == 'invalid-stay',
                                'bg-[#D9F2E9]':data.period == 'in-stay'
                            }"
                        >
                            {{ translatePeriod[data.period] }}
                        </span>
                    </div>
                </div>
                <div class="w-1/2">
                    <div class="hbg-green-600 px-4 py-1">
                        <p class="text-xs font-semibold text-white">Check-out</p>
                    </div>
                    <div class="p-4 flex items-center border-l border-gray-300">
                        <img class="w-8 h-8" src="/assets/icons/1.TH.schedule.svg" alt="">
                        <div class="ml-1">
                            <h2 class="text-[22px] font-medium leading-[110%]">{{ data.formatCheckout.dayMonth }}</h2>
                            <span class="text-xs font-semibold leading-[110%] htext-gray-500">{{ data.formatCheckout.year }}</span>
                        </div>
                    </div>
                    <div class="border-t border-gray-300 px-4 flex items-center w-full h-[38px]">
                        <img v-if="data.period == 'in-stay'" class="w-4 h-4 mr-[7px]" src="/assets/icons/THMOON.svg" alt="">
                        <p class="text-xs leading-[130%]" v-html="data.detailPeriod"></p>
                    </div>
                </div>
            </div>

            <!-- hab number and ota reserve -->
            <div class="w-[362px]">
                <div>
                    <label class="text-sm font-medium mb-2 leading-3">Medio de la reserva</label>
                    <BaseSelectField
                        :icon_left="iconLeftDropdown"
                        textLabel="Selecciona el medio de la reserva"
                        :options="middle_optiones"
                        v-model="form.middle_reservation"
                        mandatory
                        @change="update"
                    />
                </div>
                <div class="mt-4">
                    <BaseTextField
                        prependInnerIcon="/assets/icons/1.TH.ROOM.svg"
                        textLabel="Número de habitación"
                        placeholder="Añade el nº de habitación"
                        :customClasses="{
                            'hborder-gray-400':!form.room,
                        }"
                        v-model="form.room"
                        @blur:validate="update"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { inject, computed, reactive, watch } from 'vue'
import BaseSelectField from '@/components/Forms/BaseSelectField.vue'
import BaseTextField from '@/components/Forms/BaseTextField.vue';
//composable
import { useToastAlert } from '@/composables/useToastAlert'
//store
import { useStayStore } from '@/stores/modules/stay/stay';

const stayStore = useStayStore();
const toast = useToastAlert();

const data = inject('data')

const form = reactive({
    room:  null,
    stayId: null,
    middle_reservation: null,
    guestId:null
});

const update = async ()=>{
    await stayStore.$updateData(form);
    toast.warningToast('Actualizado.','top-right');
}

const iconLeftDropdown = computed( () => {
    let defaultIcon = "/assets/icons/1.TH.RESERVACALENDAR.svg";
    if(form.middle_reservation){
        let value = middle_optiones.find(item => item.value == form.middle_reservation)  
        if(value){
            return value.img;
        }
    }
    return defaultIcon;
})

watch(() => data.value, async (newData) => {
    form.room = newData.room;
    form.middle_reservation = newData.middle_reservation;
    form.stayId = newData.id;
}, { immediate: true });              


const middle_optiones = [
    { value:'Booking', label:'Booking', img:'/assets/icons/otas/Booking.svg' },
    { value:'TripAdvisor', label:'TripAdvisor', img:'/assets/icons/otas/Tripadvisor.svg' },
    { value:'Expedia', label:'Expedia', img:'/assets/icons/otas/Expedia.svg' },
    { value:'Hotels.com', label:'Hotels.com', img:'/assets/icons/hotels.com.svg' },
    { value:'Email', label:'Email', img:'/assets/icons/1.TH.EMAIL.svg' },
    { value:'Hotel desk', label:'Hotel desk', img:'/assets/icons/TH.Huesped.icono.navbar.home-1.svg' },
    { value:'Global Distribution System', label:'Global Distribution System', img:'/assets/icons/1.TH.RESERVA.svg' },
]

const translatePeriod = {
    "pre-stay":"PRE-STAY",
    "in-stay":"STAY",
    "post-stay":"POST-STAY",
    "invalid-stay":"POST-STAY",
}
</script>