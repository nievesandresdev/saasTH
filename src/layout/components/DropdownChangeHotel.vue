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
            <div class="flex items-center py-3 px-4" :class="{'mb-4': hotelStore.hotelsAvailables?.length  <= 1}">
                <!-- <div class="w-[64px] h-[64px] rounded-[3px]">
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
                </div> -->
                <div class="w-[64px] h-[64px] rounded-[3px] mr-2 flex-shrink-0">
                    <img v-if="hotelData?.image" class="rounded-[3px] w-[64px] h-[64px] object-cover" :src="hotelStore.formatImage({url: hotelData?.image})" alt="photo perfil ">
                    <img
                        v-else
                        :src="hotelStore.formatImage({url: '/storage/gallery/general-1.jpg'})"
                        class="rounded-[3px] w-[64px] h-[64px] object-cover"
                        alt="photo default "
                    >
                </div>
                
                <div class="">
                    <div class="flex justify-between">
                        <div class="flex w-auto max-w-[178px]">
                            <p class="text-sm font-medium htext-black-100 relative truncate">
                                <!-- {{ truncateNameHotelLong(hotel.name, 25) }} -->
                                {{ hotelData.name }}
                            </p>
                            <!-- <div class="relative w-[8px] h-full flex-shrink-0">
                                <div
                                    v-if="hotelData.with_notificartion"
                                    class="w-[10px] h-[10px] hbg-yellow-cta rounded-full absolute top-[-2px] right-0 z-10"
                                />
                            </div> -->
                        </div>
                    </div>
                    
                    <p class="text-xs font-semibold htext-gray-500 truncate-1 capitalize">{{ hotelData.type }}
                        <template v-if="hotelData.zone">
                            - {{ hotelData.zone }}
                        </template>
                    </p>
                    <div class="flex w-full gap-1">
                        <div
                            v-if="hotelData?.pivot?.is_default" 
                            class="bg-white border text-[10px] p-[2px] leading-[90%] rounded-[3px] inline-block border-[#34A98F] text-[#0B6357]"
                        >Predeterminado</div>
                        <div
                            v-if="!hotelData.subscribed" 
                            class="bg-white border text-[10px] p-[2px] leading-[90%] rounded-[3px] inline-block hborder-alert-negative htext-alert-negative"
                        >No Suscrito</div>
                    </div>
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
                            class="px-4 py-[12px] flex items-center h-[77px] cursor-pointer hover-gray-100"
                            @click="changeHotel(hotel)"
                            :class="{
                                'opacity-100': isHotelInUser(hotel),
                                'opacity-25': !isHotelInUser(hotel),
                                'cursor-pointer': isHotelInUser(hotel),
                                'cursor-not-allowed': !isHotelInUser(hotel)
                            }"
                        >
                            <div class="w-[34px] h-[34px] rounded-[3px] mr-2 flex-shrink-0">
                                <img v-if="hotel?.image" class="rounded-[3px] w-[34px] h-[34px] object-cover" :src="hotelStore.formatImage({url: hotel?.image})" alt="photo perfil ">
                                <img
                                    v-else
                                    :src="hotelStore.formatImage({url: '/storage/gallery/general-1.jpg'})"
                                    class="rounded-[3px] w-[34px] h-[34px] object-cover"
                                    alt="photo default "
                                >
                            </div>
                            <div class="">
                                <div class="flex justify-between"> <!-- between buscador result -->
                                    <div class="flex w-auto max-w-[178px]">
                                        <p class="text-sm font-medium htext-black-100 relative truncate">
                                            <!-- {{ truncateNameHotelLong(hotel.name, 25) }} -->
                                            {{ hotel.name }}
                                        </p>
                                        <div class="relative w-[8px] h-full flex-shrink-0">
                                            <div
                                                v-if="hotel.with_notificartion"
                                                class="w-[10px] h-[10px] hbg-yellow-cta rounded-full absolute top-[-2px] right-0 z-10"
                                            />
                                        </div>
                                    </div>
                                </div>
                                
                                <p class="text-xs font-semibold htext-gray-500 truncate-1 capitalize">{{ hotel.type }}
                                    <template v-if="hotel.zone">
                                        - {{ hotel.zone }}
                                    </template>
                                </p>
                                <div class="flex w-full gap-1">
                                    <div
                                        v-if="hotel?.is_default" 
                                        class="bg-white border text-[10px] p-[2px] leading-[90%] rounded-[3px] inline-block border-[#34A98F] text-[#0B6357]"
                                    >Predeterminado</div>
                                    <div
                                        v-if="!hotel.subscribed" 
                                        class="bg-white border text-[10px] p-[2px] leading-[90%] rounded-[3px] inline-block hborder-alert-negative htext-alert-negative"
                                    >No Suscrito</div>
                                </div>
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
                            class="px-4 py-[12px] flex justify-between  h-[77px] w-full"
                            @click="changeHotel(hotel)"
                            :class="{
                                'opacity-100': isHotelInUser(hotel),
                                'opacity-25': !isHotelInUser(hotel),
                                'cursor-pointer': isHotelInUser(hotel),
                                'cursor-not-allowed': !isHotelInUser(hotel),
                                'hover:bg-[#F3F3F3]': !isSvgHovered[index] && isContainerHovered[index], // Hover solo en el contenedor

                            }"
                            @mouseenter="handleContainerHover(true, index); !isHotelInUser(hotel) ? showPermissionTooltip(index, $event) : null"
                            @mousemove="!isHotelInUser(hotel) ? updateTooltipPosition($event) : null"
                            @mouseleave="handleContainerHover(false, index); hidePermissionTooltip()"
                            
                        >
                                <section class="flex">
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
                                    <div class="flex flex-col">
                                        <div class="flex justify-between w-full items-center">
                                            <div class="flex items-center flex-grow">
                                                <span class="text-sm font-medium htext-black-100 truncate-2">
                                                    {{ hotel.name }} 
                                                </span>
                                                <div class="relative w-[10px] h-full flex-shrink-0 mb-4">
                                                    <div
                                                        v-if="hotel.with_notificartion"
                                                        class="w-[10px] h-[10px] hbg-yellow-cta rounded-full absolute top-0 right-0 z-10"
                                                    />
                                                </div>
                                            </div>
                                            <!-- <svg
                                                @click="toggleDropdown"
                                                class="cursor-pointer"
                                                width="20" height="20" viewBox="0 0 24 24"
                                                
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <circle cx="12" cy="12" r="2" fill="currentColor" />
                                                <circle cx="19" cy="12" r="2" fill="currentColor" />
                                                <circle cx="5" cy="12" r="2" fill="currentColor" />
                                            </svg> -->
                                        </div>
                                        
                                        <p class="text-xs font-semibold htext-gray-500 truncate-1 capitalize">
                                            {{ hotel.type }}
                                            <template v-if="hotel.zone">
                                                - {{ hotel.zone }} 
                                            </template>
                                        </p>
                                        
                                        <div class="flex w-full gap-1">
                                            <div
                                                v-if="hotel?.is_default" 
                                                class="bg-white border text-[10px] p-[2px] leading-[90%] rounded-[3px] inline-block border-[#34A98F] text-[#0B6357]"
                                            >Predeterminado</div>
                                            <div
                                                v-if="!hotel.subscribed" 
                                                class="bg-white border text-[10px] p-[2px] leading-[90%] rounded-[3px] inline-block hborder-alert-negative htext-alert-negative"
                                            >No Suscrito</div>
                                        </div>
                                    </div>
                            </section>
                            
                            <svg
                                @click="toggleTooltip(index,$event)"
                                @mouseenter="handleSvgHover(true, index)"
                                @mouseleave="handleSvgHover(false, index)"
                                v-show="isHotelInUser(hotel) || !hotel.is_default"
                                class="h-5 w-5 flex-shrink-0  cursor-pointer z-[800]"
                                :class="{
                                    'hover:bg-[#F3F3F3] rounded-full': isSvgHovered[index], // Hover en el ícono
                                    'cursor-pointer': true
                                }"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <circle cx="12" cy="12" r="2" fill="currentColor" />
                                <circle cx="19" cy="12" r="2" fill="currentColor" />
                                <circle cx="5" cy="12" r="2" fill="currentColor" />
                            </svg>
                            <!-- Tooltip -->
                            <div
                                v-if="tooltipVisible === index"
                                class="fixed bg-white p-4 text-sm text-black rounded-[10px] shadow-tooltip z-[1000] hover:bg-[#F1F1F1] flex items-center cursor-pointer"
                                :style="tooltipStyle"
                                @mouseenter="handleSvgHover(true, index)"
                                @mouseleave="handleSvgHover(false, index)"
                                @click="handlehHotelDefault(hotel,$event)"
                            >
                                <!-- Image -->
                                <img src="/assets/icons/1.TH.FLAG.svg" class="w-6 h-6 mr-2" alt="flag icon" />
                                <!-- Tooltip text -->
                                Marcar como predeterminado
                            </div>
                            
                    </li>
                    <!-- Tooltip para hoteles sin permisos -->
                    <div
                        v-if="permissionTooltipVisible !== null"
                        class="fixed bg-white p-4 text-sm text-black rounded-[10px] shadow-tooltip z-[1000] opacity-100 w-[290px]"
                        :style="permissionTooltipStyle"
                        style="box-shadow: 0px 3.5px 7px 0px rgba(0, 0, 0, 0.15);"
                    >
                        Necesitas permisos para acceder a este alojamiento. Solicita acceso a tu responsable o superior para poder entrar.
                    </div>
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

import { useToastAlert } from '@/composables/useToastAlert'


import BaseTextField from '@/components/Forms/BaseTextField';

const props = defineProps({
    widthMenu: String,
    displayedMenu: String,
});


const hotelStore = inject('hotelStore');
const onHoverMainMenu = inject('onHoverMainMenu');
const modalInfoNewHotel = inject('modalInfoNewHotel');

const toast = useToastAlert();
const router = useRouter();

const { hotelData, hotelsAvailables,hotelsUser,hotelsByUserAvailables,$handleDefaultHotel,loadHotelsAvailables,loadHotelsByUser } = hotelStore;

const dropdownOpenn = ref(false);
const dropdownSearchOpen = ref(false);
const hotelsFoundInSearch = ref([]);
const search = ref(null);
const hotels = ref([]);


console.log({
    'parentsHotels' : hotelStore.hotelsParent,
    'userHotels': hotelStore.hotelsUser,
    'hotelData' : hotelStore.hotelData,
    'hotelsAvaliableT' : hotelStore.hotelsAvailables,
    'awaitHotelUser' : hotelStore.hotelsByUserAvailables
})

// Función para verificar si el hotel está en hotelsUser
function isHotelInUser(hotel) {
    //console.log('hotel', hotel);
    return hotelStore.hotelsByUserAvailables.some(userHotel => userHotel.id === hotel.id);
}

const tooltipVisible = ref(null);

const tooltipStyle = ref({ top: '0px', left: '0px' });

const toggleTooltip = (index, event) => {
  event.stopPropagation();
  if (tooltipVisible.value === index) {
    tooltipVisible.value = null;
  } else {
    tooltipVisible.value = index;

    // Obtener la posición del botón
    const top = event.clientY + 8; // 8px debajo del clic
    const left = event.clientX - 20; // ajusta este valor para alinear el tooltip

    tooltipStyle.value = {
      top: `${top}px`,
      left: `${left}px`,
    };
  }
};

const handlehHotelDefault = async (hotel, event) => {
  event.stopPropagation();

  const params = {
    hotel_id: hotel.id
  };

  const response = await hotelStore.$handleDefaultHotel(params);
  const { ok } = response;

  if (ok) {
    // update data current_hotel localstorage
    localStorage.setItem('current_hotel', JSON.stringify(response.data));
    // current_subdomain
    localStorage.setItem('current_subdomain', response.data.subdomain);

    // Marca el hotel visualmente como predeterminado y remueve el estado del anterior
    hotelStore.hotelsAvailables.forEach(h => {
      if (h.is_default) {
        h.is_default = false; // Elimina el predeterminado del anterior
      }
      if (h.id === hotel.id) {
        h.is_default = true; // Marca este hotel como predeterminado
      }
    });

    hotelStore.hotelData.pivot.is_default = false; // Marca el hotel actual como predeterminado

    toast.warningToast(hotel.name + ' marcado como predeterminado', 'top-right');

    setTimeout(() => {
        location.reload();
    }, 1100);

    // tooltipVisible debe ocultarse después de que el cambio se haya aplicado
    tooltipVisible.value = null;
  } else {
    toast.errorToast('Error al marcar como predeterminado', 'top-right');
  }
};

const permissionTooltipVisible = ref(null); // Nueva variable para este tooltip específico
const permissionTooltipStyle = ref({ top: '0px', left: '0px' });

const showPermissionTooltip = (index, event) => {
  permissionTooltipVisible.value = index;
  updateTooltipPosition(event); // Actualizamos la posición inicial del tooltip
};

const updateTooltipPosition = (event) => {
  const tooltipOffset = 6; // Ajuste fino para que el tooltip esté pegado al mouse
  const top = event.clientY + tooltipOffset;
  const left = event.clientX + -60;

  permissionTooltipStyle.value = {
    top: `${top}px`,
    left: `${left}px`,
  };
};

const hidePermissionTooltip = () => {
  permissionTooltipVisible.value = null;
};

// Variables para gestionar el hover independiente de contenedor y el ícono
const isContainerHovered = ref([]); // Estado para hover del contenedor
const isSvgHovered = ref([]); // Estado para hover del ícono

// Función para manejar el hover del contenedor
const handleContainerHover = (hoverState, index) => {
  isContainerHovered.value[index] = hoverState;
  if (hoverState) {
    isSvgHovered.value[index] = false; // Si el contenedor está en hover, quitamos el hover del ícono
  }
};

// Función para manejar el hover del ícono SVG
const handleSvgHover = (hoverState, index) => {
  isSvgHovered.value[index] = hoverState;
  if (hoverState) {
    isContainerHovered.value[index] = false; // Si el ícono está en hover, quitamos el hover del contenedor
  }else{
    isContainerHovered.value[index] = true;
  }
};


    
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
        tooltipVisible.value = null;
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
    tooltipVisible.value = null;
}
function handleClickOutsideDropDownSearch (event) {
    dropdownSearchOpen.value = false;
}

async function changeHotel (hotel) {
if (isHotelInUser(hotel)) {
    await hotelStore.changeHotel(hotel);
    router.go();
}

return false;
}


</script>

<style lang="scss">

    .shadow-d {
        box-shadow: 0px 3.5px 7px 0px rgba(0, 0, 0, 0.15);
    }
    .shadow-dorpdown {
        box-shadow: 0px 3.5px 7px 0px rgba(0, 0, 0, 0.15);
    }

    .shadow-tooltip {
        box-shadow: 0px 3.5px 7px 0px rgba(0, 0, 0, 0.15);
    }
    
</style>