<template>
    <ModalWindow v-if="open == 'Chat'" :isVisible="open"  padding-content="p-0" topOffset="0" @close="closeModal" width="1050px">
        <template #header>
            <div class="p-6 flex justify-between">
                <div class="flex items-center gap-2">
                    <img class="w-[56px] h-[56px]" src="/assets/icons/1.TH.chat-fill-green.svg" alt="">
                    <div>
                        <h1 class="text-[22px] font-medium leading-[110%]">Chat</h1>
                        <p class="text-[14px] font-medium leading-[140%]">Tus huéspedes podrán comunicarse directamente con el staff de tu alojamiento</p>
                    </div>
                </div>
                
                <div>
                    <HoveredIcon 
                        src="/assets/icons/1.TH.CLOSE.svg"
                        :height_icon="'24px'"
                        :width_icon="'24px'"
                        :padding_container="'4px'"
                        style="--background-color: #f3f3f3;"
                        @click="closeModal"
                    />
                </div>
                
            </div>
        </template>
        <template #content>
            <div class="border-t hborder-gray-400 flex">
                <div class="p-6 border-r hborder-gray-400 w-[716px]">
                    <p class="text-[14px] font-medium leading-[140%]">Solo tienes que activar el chat para que tus huéspedes puedan comunicarse directamente con el staff de tu alojamiento y resolver dudas o incidencias en tiempo real.</p>
                    <div class="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
                        <div class="flex items-center gap-2">
                            <img class="w-[16px] h-[16px]" src="/assets/icons/TH.CHECK.svg" alt="">
                            <p class="text-[14px] font-semibold leading-[120%]">Resolución incidencias al inmediata</p>
                        </div>
                        <div class="flex items-center gap-2">
                            <img class="w-[16px] h-[16px]" src="/assets/icons/TH.CHECK.svg" alt="">
                            <p class="text-[14px] font-semibold leading-[120%]">Menos reseñas negativas </p>
                        </div>
                        <div class="flex items-center gap-2">
                            <img class="w-[16px] h-[16px]" src="/assets/icons/TH.CHECK.svg" alt="">
                            <p class="text-[14px] font-semibold leading-[120%]">Mejora la percepción del servicio</p>
                        </div>
                        <div class="flex items-center gap-2">
                            <img class="w-[16px] h-[16px]" src="/assets/icons/TH.CHECK.svg" alt="">
                            <p class="text-[14px] font-semibold leading-[120%]">Canal directo entre staff y huésped</p>
                        </div>
                    </div>
                    <div
                        ref="gallery"
                        class="flex gap-2 overflow-x-auto mt-4 no-scrollbar cursor-grab select-none"
                        @wheel.prevent="$event.currentTarget.scrollLeft += $event.deltaY"
                        @pointerdown="startDrag"
                        @pointermove="onDrag"
                        @pointerup="stopDrag"
                        @pointerleave="stopDrag"
                        @dragstart.prevent 
                    >

                        <img class="w-[128px] h-[258px] flex-shrink-0" src="/assets/img/MarketplaceMockupChat1.png" alt="">
                        <div class="rounded-[10px] border border-[#e9e9e9] flex-shrink-0">
                            <img class="rounded-[10px] w-[431px] h-[258px]" src="/assets/img/MarketplaceChat2.png" alt="">
                        </div>
                        <div class="rounded-[10px] border border-[#e9e9e9] flex-shrink-0">
                            <img class="rounded-[10px] w-[431px] h-[258px]" src="/assets/img/MarketplaceChat3.png" alt="">
                        </div>
                    </div>
                </div>
                <div class="flex flex-col justify-between flex-grow">
                    <div class="px-6">
                        <div class="mt-6">
                            <router-link 
                                class="flex items-center gap-2 justify-end text-sm font-medium leading-[110%] underline hover:underline container-icon-green hover-htext-green-600"
                                v-if="hotelStore.hotelData.chat_service_enabled"
                                :to="{name:'GeneralSettings'}"
                                @click="closeModal"
                            >
                                Ir a funcionalidad
                                <img class="green-600-onhover w-[16px] h-[16px]" src="/assets/icons/1.TH.ARROW RIGHT.svg" alt="">
                            </router-link>
                        </div>
                        <div class="mt-6">
                            <p class="text-[12px] font-medium leading-[130%] htext-gray-500">Precio:</p>
                            <p class="text-[14px] font-medium leading-[140%]">Gratis</p>
                        </div>
                        <div class="mt-2">
                            <p class="text-[12px] font-medium leading-[130%] htext-gray-500">Operación:</p>
                            <p class="text-[14px] font-medium leading-[140%]">Requiere atención activa del staff</p>
                        </div>
                        <div class="mt-2">  
                            <p class="text-[12px] font-medium leading-[130%] htext-gray-500">Notificaciones:</p>
                            <p class="text-[14px] font-medium leading-[140%]">Genera avisos configurables</p>
                        </div>
                    </div>
                    <div class="p-6 text-right border-t hborder-gray-400">
                        <button 
                            class="hbtn-primary py-3 px-4 rounded-[6px] text-sm font-medium leading-[110%]"
                            :class="{ 'primary-disabled': updating }"
                            @click="toggleChatService"
                            :disabled="updating"
                        >
                            {{ hotelStore.hotelData.chat_service_enabled ? 'Desactivar funcionalidad' : 'Activar funcionalidad' }}
                        </button>
                    </div>
                </div>
            </div>
        </template>
    </ModalWindow>
</template>
<script setup>
import { ref, inject } from 'vue';
import ModalWindow from '@/components/ModalWindow.vue';
import HoveredIcon from '@/components/Buttons/HoveredIcon.vue';
// stores
import { useHotelStore } from '@/stores/modules/hotel'
const hotelStore = useHotelStore();
import { useToastAlert } from '@/composables/useToastAlert'
const toast = useToastAlert();

const open = inject('openModal');
const updating = ref(false);
// -------- lóg. modal ----------
function closeModal() { open.value = null; }

// -------- lóg. drag‑to‑scroll ----------
const gallery     = ref(null);
let   isDragging  = false;
let   startX      = 0;   // posición inicial del puntero
let   scrollStart = 0;   // scrollLeft inicial

function startDrag(e) {
  if (!gallery.value) return;
  isDragging = true;
  gallery.value.setPointerCapture(e.pointerId);
  gallery.value.classList.add('cursor-grabbing');
  startX      = e.pageX;
  scrollStart = gallery.value.scrollLeft;
}

function stopDrag(e) {
  if (!gallery.value) return;
  isDragging = false;
  gallery.value.releasePointerCapture(e.pointerId);
  gallery.value.classList.remove('cursor-grabbing');
}

function onDrag(e) {
  if (!isDragging || !gallery.value) return;
  const delta = e.pageX - startX;
  gallery.value.scrollLeft = scrollStart - delta;
  e.preventDefault();
}

async function toggleChatService() {
    updating.value = true;
    let response = await hotelStore.$toggleChatService(!hotelStore.hotelData.chat_service_enabled);
    if (response) {
        toast.warningToast('Actualizado','top-right');
    }else{
        toast.errorToast('Error al guardar los cambios','top-right');
    }
    closeModal();
    updating.value = false;
}
</script>

<style scoped>
.cursor-grab     { cursor: grab; }
.cursor-grabbing { cursor: grabbing; }
.no-scrollbar    { scrollbar-width: none; -ms-overflow-style: none; }
.no-scrollbar::-webkit-scrollbar { display: none; }

</style>