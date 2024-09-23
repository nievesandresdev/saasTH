<template>
    <div class="" v-click-away="handleClickOutsideDropDown">
        <div
            class="flex flex-shrink-0 p-2  hover:bg-[#F1F1F1] rounded-[10px] cursor-pointer"
            :class="{'bg-[#F1F1F1]': dropdownOpenn}"
            @click="dropdownOpenn = !dropdownOpenn"
            
        >
            <img class="w-6 h-8" src="/assets/icons/1.TH.logo.svg" alt="">
            <div
                class="truncate-1"
                :class="`flex items-center ${widthMenu} ${displayedMenu ? 'pl-4' : 'group-hover:pl-4'}`"
            >
                <p class="text-sm htext-black-100 font-semibold ml-2 whitespace-nowrap text-left leading-[120%] truncate-1">{{ hotelData.name }}</p>
                <img class="w-3 h-3 ml-auto" src="/assets/icons/1.TH.SWICHT.svg" alt="">
            </div>
        </div>
        <div v-if="dropdownOpenn"
            class=" w-[284px] pt-4 hbg-white-100 absolute top-[64px] left-[12px] z-[100] shadow-dorpdown bg-white rounded-[6px]"
        >
        <!-- @mouseleave="dropdownOpenn = false" -->
            <div class="flex flex-col items-center" :class="{'mb-4': hotelStore.hotelsAvailables?.length  <= 1}">
                <div class="w-[64px] h-[64px] rounded-[3px]">
                    <img
                        v-if="hotelData?.image"
                        :src="hotelStore.formatImage({url: hotelData?.image})"
                        class="rounded-[3px] overflow-hidden w-[64px] h-[64px] object-cover"
                        alt="photo perfil"
                    >
                    <img
                        v-else
                        :src="hotelStore.formatImage({url: '/storage/gallery/general-1.jpg'})"
                        class="rounded-[3px] overflow-hidden w-[64px] h-[64px] object-cover"
                        alt="photo default "
                    >
                </div>
                <h5 class="text-base htext-black-100 font-semibold mt-[12px] px-4 relative">
                    {{ hotelData.name }}
                </h5>
                <div class="w-full flex items-center justify-center">
                    <p class="text-xs font-semibold htext-gray-500 mt-[4px] capitalize">
                        {{ $formatTypeLodging(hotelData.type) }}
                        <template v-if="hotelData.zone">
                            - {{ hotelData.zone }}
                        </template>
                    </p>
                </div>
            </div>
            <div v-if="hotelStore.hotelsAvailables?.length" class="px-4 relative mt-4" v-click-away="handleClickOutsideDropDownSearch">
                <BaseTextField
                    v-model="search"
                    prepend-inner-icon="/assets/icons/1.TH.SEARCH.svg"
                    placeholder="Buscar alojamiento"
                    class-content="w-full"
                    @enter:search="submitSearch" 
                ></BaseTextField>
                <ul
                    v-if="dropdownSearchOpen"
                    class="w-[252px] absolute top-[44px] left-[16px] bg-white rounded-b-[5px] z-10"
                    style="box-shadow: 0px 3.5px 7px 0px rgba(0, 0, 0, 0.15);"
                >
                    <template v-if ="hotelsFoundInSearch.length > 0">
                        <li
                            v-for="(hotel, index) in hotelsFoundInSearch"
                            :key="index"
                            class="px-4 py-[12px] flex items-center space-x-2 h-[77px] cursor-pointer hover-gray-100"
                            @click="changeHotel(hotel)"
                        >
                            <div class="w-[34px] h-[34px] rounded-[3px]">
                                <img v-if="hotel?.image" class="rounded-[3px] w-[34px] h-[34px] object-cover" :src="hotelStore.formatImage({url: hotel?.image})" alt="photo perfil ">
                                <img
                                    v-else
                                    :src="hotelStore.formatImage({url: '/storage/gallery/general-1.jpg'})"
                                    class="rounded-[3px] w-[34px] h-[34px] object-cover"
                                    alt="photo default "
                                >
                            </div>
                            <div class="truncate-1 flex-1">
                                <span class="text-sm font-medium htext-black-100 relative truncate-1">
                                    {{ truncateNameHotelLong(hotel.name, 25) }}
                                    <div
                                        v-if="hotel.with_notificartion"
                                        class="w-[10px] h-[10px] hbg-yellow-cta rounded-full absolute top-[-2.5px] right-[-11px]"
                                    />
                                </span>
                                <p class="text-xs font-semibold htext-gray-500 truncate-1 capitalize">{{ hotel.type }}
                                    <template v-if="hotel.zone">
                                        - {{ hotel.zone }}
                                    </template>
                                </p>
                                <div class="bg-white border text-[10px] p-[2px] leading-[90%] rounded-[3px] inline-block" :class="!hotel.subscribed ?'hborder-alert-negative htext-alert-negative' : 'hborder-green-600 htext-green-600'">{{ hotel.subscribed ? 'Suscrito' : 'No Suscrito' }}</div>
                            </div>
                        </li>
                    </template>
                    <template v-else>
                        <div class="px-[8px] py-[12px]">
                            <p class="text-sm htext-grey-500">No se han encontrado <br> resultados</p>
                        </div>
                    </template>
                </ul>
            </div>
            <div v-if="hotelStore.hotelsAvailables?.length" class="mt-[12px]">
                <div id="container-search-title" class="px-4 pb-[8px] bg-white">
                    <h6 class="text-sm font-semibold htext-black-100">Cambiar de alojamiento</h6>
                </div>
                <ul
                    v-if="!dropdownSearchOpen"
                    id="container-search-list"
                    class="h-[346px] overflow-y-auto"
                    :class="hotels.length <= 3 ? '' : 'h-[269px] overflow-auto'"
                >
                <li
                        v-for="(hotel, index) in hotelStore.hotelsAvailables"
                        :key="index"
                        class="px-4 py-[12px] flex items-center h-[77px] cursor-pointer hover-gray-100 w-full"
                        @click="changeHotel(hotel)"
                    >
                        <div class="w-[34px] h-[34px] rounded-[3px] flex-shrink-0 mr-2">
                            <img
                                v-if="hotel?.image"
                                class="rounded-[3px] w-[34px] h-[34px] object-cover"
                                :src="hotelStore.formatImage({url: hotel?.image})"
                                alt="photo perfil"
                            >
                            <img
                                v-else
                                :src="hotelStore.formatImage({url: '/storage/gallery/general-1.jpg'})"
                                class="rounded-[3px] w-[34px] h-[34px] object-cover"
                                alt="photo default"
                            >
                        </div>
                        <div class="truncate w-auto max-w-[202px]">
                            <span class="text-sm font-medium htext-black-100 relative truncate">
                                <!-- {{ truncateNameHotelLong(hotel.name, 25) }} -->
                                {{ hotel.name }}
                            </span>
                            <p class="text-xs font-semibold htext-gray-500 truncate-1 capitalize">
                                {{ hotel.type }}
                                <template v-if="hotel.zone">
                                    - {{ hotel.zone }}
                                </template>
                            </p>
                            <div class="bg-white border text-[10px] p-[2px] leading-[90%] rounded-[3px] inline-block" :class="!hotel.subscribed ?'hborder-alert-negative htext-alert-negative' : 'hborder-green-600 htext-green-600'">{{ hotel.subscribed ? 'Suscrito' : 'No Suscrito' }}</div>
                        </div>
                        <div class="relative w-[8px] h-full flex-shrink-0">
                            <div
                                v-if="hotel.with_notificartion"
                                class="w-[10px] h-[10px] hbg-yellow-cta rounded-full absolute top-[-2px] right-0 z-10"
                            />
                        </div>
                    </li>
                </ul>
                <div v-else  class="h-[269px] w-full bg-white">

                </div>
            </div>
            <!-- <div v-if="$isAssociate()" class="p-4 hborder-top-gray-400"> -->
            <div class="p-4 hborder-top-gray-400 cursor-pointer hover-hbg-gray-200 rounded-b-[6px]" @click="modalInfoNewHotel = true">
                <p class="hbtn-tertiary text-sm htext-black-100 font-medium underline">¿Quieres añadir otro alojamiento?</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted, watch, inject } from 'vue';

import { $isAssociate, $isAdmin, $formatTypeLodging } from '@/utils/helpers';

import { useRouter } from 'vue-router';

const router = useRouter();

import BaseTextField from '@/components/Forms/BaseTextField';

const props = defineProps({
    widthMenu: String,
    displayedMenu: String,
});

const hotelStore = inject('hotelStore');
const onHoverMainMenu = inject('onHoverMainMenu');
const modalInfoNewHotel = inject('modalInfoNewHotel');

const { hotelData, hotelsAvailables } = hotelStore;

const dropdownOpenn = ref(false);
const dropdownSearchOpen = ref(false);
const hotelsFoundInSearch = ref([]);
const search = ref(null);
const hotels = ref([]);

    
onMounted(() => {
    if (hotels.value.length > 3 && !!dropdownOpenn.value) {
        const scrollableContainerSearchList = document.getElementById('container-search-list');
        const scrollableContainerSearchTitle = document.getElementById('container-search-title');
    
        scrollableContainerSearchList.addEventListener('scroll', () => {
            if (scrollableContainerSearchList.scrollTop > 0) {
                scrollableContainerSearchTitle.classList.add('shadow-d');
            } else {
                scrollableContainerSearchTitle.classList.remove('shadow-d');
            }
        });
    }
});

watch(search, (newVal) => {
    if (newVal) {
        filterHolter();
    }else{
        dropdownSearchOpen.value = false;
        hotelsFoundInSearch.value = []; 
    }
});


watch(onHoverMainMenu, (newValue, oldValue)=>{
    if (!newValue) {
        dropdownOpenn.value = false;
    }
});

// FUNCTIONS
function truncateNameHotelLong (name, maxLength) {
    if (name.length > maxLength) {
        return name.slice(0, maxLength) + "...";
    } else {
        return name;
    }
}

function submitSearch () {

}

function filterHolter () {
    dropdownSearchOpen.value = true;
    const term = search.value.toLowerCase();
    if (!term) {
        hotelsFoundInSearch.value = []; 
        return;   
    }
    hotelsFoundInSearch.value = hotelStore.hotelsAvailables.filter(hotel =>
            hotel.name.toLowerCase().includes(term) ||
            hotel.type.toLowerCase().includes(term) ||
            hotel?.zone?.toLowerCase().includes(term)
    );
}

function openMainDropdown () {
    dropdownOpenn.value = true;
}

function handleClickOutsideDropDown (event) {
    dropdownOpenn.value = false;
}
function handleClickOutsideDropDownSearch (event) {
    dropdownSearchOpen.value = false;
}

async function changeHotel (hotel) {
    await hotelStore.changeHotel(hotel);
    router.go();
}


</script>

<style lang="scss">

    .shadow-d {
        box-shadow: 0px 3.5px 7px 0px rgba(0, 0, 0, 0.15);
    }
    .shadow-dorpdown {
        box-shadow: 0px 3.5px 7px 0px rgba(0, 0, 0, 0.15);
    }
    
</style>