<template>
    <!-- title and activate -->
    <div class="my-5 flex justify-between items-center z-[300] px-6">
        <div class="flex justify-start items-center gap-2">
            <h1 class="text-[22px] font-medium">Contacto</h1>
            <Tooltip
                size="m"
                :top="25"
                :left="0"
            >
                <template v-slot:button>
                    <img class="w-5 h-5" src="/assets/icons/info.blue.svg">
                </template>
                <template v-slot:content>
                    <p class="text-sm">
                        Configura todos los canales a través de los cuales los huéspedes podrán contactar con tu {{ $formatTypeLodging() }}
                    </p>
                </template>
            </Tooltip>
        </div>
        <div class="flex items-center gap-2">
            <p class="text-sm font-semibold">Mostrar Contacto en la WebApp</p>
            <ToggleButton
                v-model="showCheckin"
                id="ToggleButton_showCheckin"
                @change="toggle"
                :disabled="updateCheckin"
            />
            <Tooltip
                size="l"
                :top="25"
                :right="0"
            >
                <template v-slot:button>
                    <img class="w-5 h-5" src="/assets/icons/info.blue.svg">
                </template>
                <template v-slot:content>
                    <p class="text-sm">
                        Con el interruptor “Mostrar en la WebApp” controlas la visibilidad de cierta información para el huésped.<br><br>
                        Mientras se encuentre apagado, tus huéspedes dejarán de ver el contenido de esta sección en tu WebApp.
                    </p>
                </template>
            </Tooltip>
        </div>
    </div>
    <div v-if="!showCheckin" class="bg-[#FFF3CC] py-3 px-6">
        <p class="text-center text-sm font-medium leading-[140%]">
            Tienes desactivado el Check-in online. Activa "Mostrar en la WebApp" para permitir a tus huéspedes completar el formulario antes de su llegada al hotel.
        </p>
    </div>
    <div class="bg-[#fafafa] px-6 z-50 mb-6">
        <TabMenuContainer>
            <TabLink
                label="Teléfono"
                viewName="ContactPhones"
                :selected="route.name == 'ContactPhones'"
            />
            <TabLink
                label="Whatsapp"
                viewName="ContactWhatsapp"
                :selected="route.name == 'ContactWhatsapp'"
            />
            <TabLink
                label="Email"
                viewName="ContactEmail"
                :selected="route.name == 'ContactEmail'"
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
import { $formatTypeLodging } from '@/utils/helpers';
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