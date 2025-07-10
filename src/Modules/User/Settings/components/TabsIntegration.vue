<template>
    <!-- title and activate -->
    <div class="my-5 flex justify-between items-center z-[300]">
        <div class="flex justify-start items-center gap-2">
            <h1 class="text-[22px] font-medium">Integraciones</h1>
            <Tooltip
                size="l"
                :top="25"
                :left="0"
            >
                <template v-slot:button>
                    <img class="w-5 h-5" src="/assets/icons/info.blue.svg">
                </template>
                <template v-slot:content>
                    <p class="text-sm">
                        Aquí puedes añadir las credenciales de tus plataformas externas para que podamos incluir enlaces a tu WebApp en los mensajes automáticos que se envían cuando se genera una reserva.
                    </p>
                </template>
            </Tooltip>
        </div>
    </div>

    <div class="bg-[#fafafa] z-50 mb-6">
        <TabMenuContainer>
            <TabLink
                label="OTAS"
                viewName="Integrations"
                :selected="route.name == 'Integrations'"
            />
            <TabLink
                label="PMS"
                viewName="IntegrationsPMS"
                :selected="route.name == 'IntegrationsPMS'"
            />
        </TabMenuContainer>
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import Tooltip from '@/components/Tooltip.vue'
import ToggleButton from '@/components/Buttons/ToggleButton.vue'
import TabMenuContainer from '@/components/TabMenuWSlot.vue'
import TabLink from '@/components/TabMenuLink.vue'
//
import { useToastAlert } from '@/composables/useToastAlert'
const toast = useToastAlert();
//
import { useRoute } from 'vue-router';
const route = useRoute();
//
import { useCheckinStore } from '@/stores/modules/stay/checkin'
const checkinStore = useCheckinStore();

const showCheckin = ref(true)
const updateCheckin = ref(false)

onMounted(async() => {
    showCheckin.value = await checkinStore.$getToggleShowCheckinHotel();
})


async function toggle(){
    updateCheckin.value = true;
    await checkinStore.$updateToggleShowCheckinHotel(showCheckin.value);
    updateCheckin.value = false;
    toast.warningToast('Actualizado!','top-right');
}

</script>