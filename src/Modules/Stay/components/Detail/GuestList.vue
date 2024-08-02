<template>
    <div class="mt-6 3xl:mt-0 3xl:w-[362px] px-4 3xl:px-2 py-6 shadow-hoster rounded-[10px] bg-white">
        <h3 class="text-base font-semibold leading-[120%] pl-2">Huésped</h3>
        <span class="mt-4 block text-[10px] font-semibold leading-[120%] pl-2 text-gray-500">
            {{data.guests.length}} {{ data.guests.length > 1 ? 'HUESPEDES' : 'HUESPED' }} 
        </span>
        <router-link 
            class="p-2 block w-full rounded-[6px]" v-for="g in data.guests" :key="g.id"
            :class="{'hbg-green-200': route.query.g == g.id}"
            :to="{ name: 'StayDetailPage',params: { id: data.id }, query: { g: g.id }}"
        >
            <div class="flex items-center">
                <img 
                    class="w-10 h-8 rounded-[6px] object-cover" 
                    :src="`https://ui-avatars.com/api/?name=${g.acronym}&color=fff&background=${g.color}`"
                >
                <p class="text-base ml-2" v-html="highlightSearch(g.name, searchQuery)"></p>
                <img 
                    class="w-4 h-4 ml-auto" 
                    :src="`/assets/icons/flags/${g.lang_web}.svg`"
                >
            </div>
        </router-link>
    </div>
</template>

<script setup>
import { ref, inject, watch } from 'vue'
import { useRoute } from 'vue-router';

const data = inject('data')

const route = useRoute();
const searchQuery = ref(route.query.search || '');

watch(() => route.query.search, (newSearch) => {
    searchQuery.value = newSearch;
}, { immediate: true });

function highlightSearch(name, query) {
    if (!query) return name;
    const re = new RegExp(query, 'gi');
    return name.replace(re, match => `<span style="background-color:#fff1be;">${match}</span>`);
}
</script>
