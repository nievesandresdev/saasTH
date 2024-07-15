<template>
    <div class="mt-6 3xl:mt-0 3xl:w-[362px] px-4 3xl:px-2 py-6 shadow-hoster rounded-[10px] bg-white">
        <h3 class="text-base font-semibold leading-[120%] pl-2">Huésped</h3>
        <span class="mt-4 block text-[10px] font-semibold leading-[120%] pl-2 htext-gray-500">
            {{data.guests.length}} {{ data.guests.length > 1 ? 'HUESPEDES' : 'HUESPED' }} 
        </span>
        <router-link 
            class="p-2 block w-full rounded-[6px]" v-for="g in data.guests" :key="g.id"
            :class="{'hbg-green-200': guestId == g.id}"
            :to="{ name: 'StayDetailPage',params: { id: data.id }, query: { g: g.id }}"
        >
            <div class="flex items-center">
                <img 
                    class="w-10 h-8 rounded-[6px] object-cover" 
                    :src="`https://ui-avatars.com/api/?name=${g.acronym}&color=fff&background=${g.color}`"
                >
                <p class="text-base ml-2">{{ g.name }}</p>
                <img 
                    class="w-4 h-4 ml-auto" 
                    :src="`/assets/icons/flags/${g.lang_web}.svg`"
                >
            </div>
        </router-link>
    </div>
</template>
<script setup>
import { inject } from 'vue'

const data = inject('data')
const guestId = inject('guestId')
</script>