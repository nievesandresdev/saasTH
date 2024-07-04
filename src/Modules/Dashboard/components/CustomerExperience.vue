<template>
    <div class="flex flex-col border border-[#BFBFBF] rounded-lg p-4">
        <div class="flex flex-col">
            <span class="text-[#0B6357] text-xs font-semibold mb-2">CUSTOMER EXPERIENCE</span>
            <div class="flex gap-4 justify-between">
                <span class="font-semibold text-sm flex gap-4">
                Estancias activas en tu WebApp
                <Tooltip size="l" :top="25" :left="5">
                    <template v-slot:button>
                    <img class="w-6 h-6" src="/assets/icons/info.blue.svg">
                    </template>
                    <template v-slot:content>
                    <p class="text-sm">Tooltip Text</p>
                    </template>
                </Tooltip>
                </span>
                <span class="font-semibold text-sm">Idiomas más utilizados por tus huéspedes</span>
            </div>
        </div>
        <!-- contenido -->
        <div class="grid grid-cols-4 gap-4 mt-4">
            <div class="bg-white border-2 rounded-lg overflow-hidden">
                <div class="bg-[#D9E8F2] py-2 px-3 flex items-center gap-3">
                    <span class="text-xs font-semibold">PRE-STAY</span>
                    <Tooltip  :top="25" :left="5" size="xs" :class="'z-[600]'">
                        <template v-slot:button>
                        <img class="w-6 h-6" src="/assets/icons/info.blue.svg">
                        </template>
                        <template v-slot:content>
                        <p class="text-sm">Tooltip Text</p>
                        </template>
                    </Tooltip>
                </div>
                <div class="p-4">
                    <div class="flex items-center gap-2">
                        <img src="/assets/icons/dashboard/door_tag-hotel-heart-love-valentine.svg" class="w-4 h-4">
                        <span class="text-sm font-medium">- Estancias</span>
                    </div>
                    <div class="flex items-center gap-2 mt-1">
                        <img src="/assets/icons/dashboard/1.TH.HUESPEDES.svg" class="w-4 h-4">
                        <span class="text-sm font-medium">- Huéspedes</span>
                    </div>
                </div>
            </div>
            <div class="bg-white border-2 rounded-lg overflow-hidden">
                <div class="bg-[#D9F2E9] py-2 px-3 flex items-center gap-3">
                    <span class="text-xs font-semibold">STAY</span>
                    <Tooltip  :top="25" :left="5" size="xs" :class="'z-[600]'">
                        <template v-slot:button>
                        <img class="w-6 h-6" src="/assets/icons/info.blue.svg">
                        </template>
                        <template v-slot:content>
                        <p class="text-sm">Tooltip Text</p>
                        </template>
                    </Tooltip>
                </div>
                <div class="p-4">
                    <div class="flex items-center gap-2">
                        <img src="/assets/icons/dashboard/door_tag-hotel-heart-love-valentine.svg" class="w-4 h-4">
                        <span class="text-sm font-medium">- Estancias</span>
                    </div>
                    <div class="flex items-center gap-2 mt-1">
                        <img src="/assets/icons/dashboard/1.TH.HUESPEDES.svg" class="w-4 h-4">
                        <span class="text-sm font-medium">- Huéspedes</span>
                    </div>
                </div>
            </div>
            <div class="bg-white border-2 rounded-lg overflow-hidden">
                <div class="bg-[#F2F2F2] py-2 px-3 flex items-center gap-3">
                    <span class="text-xs font-semibold">POST-STAY</span>
                    <Tooltip  :top="25" :left="5" size="xs" :class="'z-[600]'">
                        <template v-slot:button>
                        <img class="w-6 h-6" src="/assets/icons/info.blue.svg">
                        </template>
                        <template v-slot:content>
                        <p class="text-sm">Tooltip Text</p>
                        </template>
                    </Tooltip>
                </div>
                <div class="p-4">
                    <div class="flex items-center gap-2">
                        <img src="/assets/icons/dashboard/door_tag-hotel-heart-love-valentine.svg" class="w-4 h-4">
                        <span class="text-sm font-medium">- Estancias</span>
                    </div>
                    <div class="flex items-center gap-2 mt-1">
                        <img src="/assets/icons/dashboard/1.TH.HUESPEDES.svg" class="w-4 h-4">
                        <span class="text-sm font-medium">- Huéspedes</span>
                    </div>
                </div>
            </div>
            <div class="bg-white border-2 rounded-lg overflow-hidden">
                <div class="p-4 mt-4">
                    <div class="flex items-center gap-2">
                        <img src="/assets/icons/dashboard/flags/Spain.svg" class="w-4 h-4">
                        <span class="text-sm font-medium">- Español</span>
                    </div>
                    <div class="flex items-center gap-2 mt-1">
                        <img src="/assets/icons/dashboard/flags/France.svg" class="w-4 h-4">
                        <span class="text-sm font-medium">- Frances</span>
                    </div>
                    <div class="flex items-center gap-2 mt-1">
                        <img src="/assets/icons/dashboard/flags/England.svg" class="w-4 h-4">
                        <span class="text-sm font-medium">- Inglés</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import Tooltip from '@/components/Tooltip.vue'
    console.log('CustomerExperience')
</script>