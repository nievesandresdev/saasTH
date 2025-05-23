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
                        Con el interruptor "Mostrar en la WebApp" controlas la visibilidad de cierta información para el huésped.<br><br>    
                        Mientras se encuentre apagado, tus huéspedes dejarán de ver el contenido de esta sección en tu WebApp.
                    </p>
                </template>
            </Tooltip>
        </div>
        <div class="flex items-center gap-2">
            <p class="text-sm font-semibold">Mostrar Contacto en la WebApp</p>
            <ToggleButton
                v-model="showContact"
                id="ToggleButton_showContact"
                @change="toggle"
                :disabled="updateContact"
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
    <div class="bg-[#fafafa] px-6 z-50" :class="{'mb-6': showContact}">
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
    <div v-if="!showContact" class="bg-[#FFF3CC] py-3 px-6 mb-6">
        <p class="text-center text-sm font-medium leading-[140%]">
            Esta sección se encuentra oculta, tus huéspedes no podrán verla en tu WebApp. Para mostrarla, activa el toggle de "Mostrar Contacto en la WebApp"
        </p>
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
import { useHotelStore } from '@/stores/modules/hotel'
const hotelStore = useHotelStore();

const showContact = ref(true)
const updateContact = ref(false)

onMounted(async() => {
    let response = await hotelStore.$getShowContact();
    showContact.value = response.data;
})


async function toggle(){
    updateContact.value = true;
    await hotelStore.$toggleShowContact(showContact.value);
    updateContact.value = false;
    toast.warningToast('Actualizado!','top-right');
}

</script>