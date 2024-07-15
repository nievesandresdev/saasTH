<template>
    <div class="px-6">
        <h1 class="text-[22px] font-medium leading-[110%] py-5 flex gap-2">
            Plataformas externas
            <Tooltip size="s" :top="25" :left="5">
                <template v-slot:button>
                    <img class="w-6 h-6" src="/assets/icons/info.blue.svg">
                </template>
                <template v-slot:content>
                    <p class="text-sm">Configura los enlaces a las distintas plataformas externas en las que se encuentra tu alojamiento.</p>
                </template>
            </Tooltip>
        </h1>

        <div class="font-montserrat">
            <div class="w-full h-min mb-6">
                <div :class="['flex', hoverValidation ? 'border-green-500' : 'border-gray-300']">
                    <span :class="['inline-flex items-center px-2 text-sm text-gray-900 border border-e-0', hoverValidation ? 'border-green-500' : 'border-gray-300', 'rounded-s-md']">
                        <img src="/assets/icons/otas/tripadvisor.svg" class="w-8 h-8 mr-2" alt="Tripadvisor">
                        <span class="font-semibold text-sm">Tripadvisor</span>
                    </span>
                    <input type="text" :class="['rounded-none rounded-e-lg border block flex-1 min-w-0 w-full text-sm p-2.5 placeholder:text-[#A0A0A0] placeholder:font-medium placeholder:text-[14px]', hoverValidation ? 'border-green-500 focus:ring-green-500' : 'border-gray-300 focus:ring-green-500']" placeholder="Escribe URL">
                </div>
            </div>
        </div>
    </div> 
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useAuthStore } from '@/stores/modules/auth/login';
import { useUserStore } from '@/stores/modules/users/users';
import { useToastAlert } from '@/composables/useToastAlert';
import { useRouter } from 'vue-router';
import Tooltip from '@/components/Tooltip.vue'

const authStore = useAuthStore();
const userStore = useUserStore();
const toast = useToastAlert();
const router = useRouter();

const hoverValidation = ref(false); // Add your condition here
</script>
