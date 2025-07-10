<template>
    <div class="mt-4">
        <p class="text-sm font-medium leading-[140%]">OTAs habilitadas para la solicitud de reseña:</p>
        <div class="mt-2">
            <div class="flex items-center gap-4">
                <!-- booking -->
                <Tooltip
                    v-if="disabledOtas.includes('booking')"
                    size="s"
                    :top="112"
                    :left="0"
                >
                    <template v-slot:button>
                        <div class="border border-[#E9E9E9] rounded-[10px] p-2 w-[128px]">
                            <img src="/assets/icons/otas/Booking.svg" alt="" class="w-10 h-10 mx-auto" :class="{'opacity-50': disabledOtas.includes('booking')}">
                            <p class="text-sm font-medium leading-[140%] text-center mt-2">Booking</p>
                            <div class="mx-auto w-4 mt-2" v-if="valuesForm.request_otas">
                                <Checkbox v-model="valuesForm.request_otas.booking" :isDisabled="disabledOtas.includes('booking')"/>
                            </div>
                        </div>
                    </template>
                    <template v-slot:content>
                        <p class="text-sm leading-[120%]">
                            <span class="font-bold">Booking.com</span> solo permite pedir una reseña al huésped una vez finalizada la estancia
                        </p>
                    </template>
                </Tooltip>
                <div class="border border-[#E9E9E9] rounded-[10px] p-2 w-[128px]" v-else>
                    <img src="/assets/icons/otas/Booking.svg" alt="" class="w-10 h-10 mx-auto" :class="{'opacity-50': disabledOtas.includes('booking')}">
                    <p class="text-sm font-medium leading-[140%] text-center mt-2">Booking</p>
                    <div class="mx-auto w-4 mt-2" v-if="valuesForm.request_otas">
                        <Checkbox v-model="valuesForm.request_otas.booking" :isDisabled="disabledOtas.includes('booking')"/>
                    </div>
                </div>
                <!-- expedia -->
                <!-- expedia -->
                <!-- expedia -->
                <Tooltip
                    v-if="disabledOtas.includes('expedia')"
                    size="s"
                    :top="112"
                    :left="0"
                >
                    <template v-slot:button>
                        <div class="border border-[#E9E9E9] rounded-[10px] p-2 w-[128px]">
                            <img src="/assets/icons/otas/Expedia.svg" alt="" class="w-10 h-10 mx-auto" :class="{'opacity-50': disabledOtas.includes('expedia')}">
                            <p class="text-sm font-medium leading-[140%] text-center mt-2">Expedia</p>
                            <div class="mx-auto w-4 mt-2" v-if="valuesForm.request_otas">
                                <Checkbox v-model="valuesForm.request_otas.expedia" :isDisabled="disabledOtas.includes('expedia')"/>
                            </div>
                        </div>
                    </template>
                    <template v-slot:content>
                        <p class="text-sm leading-[120%]">
                            <span class="font-bold">Expedia</span> solo permite pedir una reseña al huésped una vez finalizada la estancia
                        </p>
                    </template>
                </Tooltip>
                <div class="border border-[#E9E9E9] rounded-[10px] p-2 w-[128px]" v-else>
                    <img src="/assets/icons/otas/Expedia.svg" alt="" class="w-10 h-10 mx-auto" :class="{'opacity-50': disabledOtas.includes('expedia')}">
                    <p class="text-sm font-medium leading-[140%] text-center mt-2">Expedia</p>
                    <div class="mx-auto w-4 mt-2" v-if="valuesForm.request_otas">
                        <Checkbox v-model="valuesForm.request_otas.expedia" :isDisabled="disabledOtas.includes('expedia')"/>
                    </div>
                </div>
                <!-- google -->
                <div class="border border-[#E9E9E9] rounded-[10px] p-2 w-[128px]">
                    <img src="/assets/icons/otas/Google.svg" alt="" class="w-10 h-10 mx-auto" :class="{'opacity-50': disabledOtas.includes('google')}">
                    <p class="text-sm font-medium leading-[140%] text-center mt-2">Google</p>
                    <div class="mx-auto w-4 mt-2" v-if="valuesForm.request_otas">
                        <Checkbox v-model="valuesForm.request_otas.google" :isDisabled="disabledOtas.includes('google')"/>
                    </div>
                </div>
                <!-- tripadvisor -->
                <div class="border border-[#E9E9E9] rounded-[10px] p-2 w-[128px]">
                    <img src="/assets/icons/otas/Tripadvisor.svg" alt="" class="w-10 h-10 mx-auto" :class="{'opacity-50': disabledOtas.includes('tripadvisor')}">
                    <p class="text-sm font-medium leading-[140%] text-center mt-2">Tripadvisor</p>
                    <div class="mx-auto w-4 mt-2" v-if="valuesForm.request_otas">
                        <Checkbox v-model="valuesForm.request_otas.tripadvisor" :isDisabled="disabledOtas.includes('tripadvisor')"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import Tooltip from '@/components/Tooltip.vue'
import Checkbox from '@/components/Forms/Checkbox.vue'
import { inject } from 'vue';

const valuesForm = inject('valuesForm')
const disabledOtas = inject('disabledOtas')


</script>