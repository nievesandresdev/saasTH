<template>
    <SlidePanel :isOpen="panelSelected === 'buttonsSection'" @closePanel="panelSelected = null" :right="0">
        <div>
            <!-- head panel -->
            <section class="px-4 py-6 border-b hborder-gray-400 flex items-center justify-between">
                <h1 class="text-[22px] font-medium leading-[72%]">Botonera</h1>
                <button @click="closePanel">
                    <img src="/assets/icons/1.TH.CLOSE.svg" alt="close" class="w-6 h-6">
                </button>
            </section>
            <WarningHiddenSection v-if="rawSections.buttonsSection.visibility === false" />

            <section class="mt-6 px-4">
            <p class="text-sm leading-[140%] mb-4">Elige los accesos rápidos que deseas para optimizar el uso de tu WebApp.</p>
                <SectionButtons 
                    v-model:buttons="buttons"
                    :buttons-hidden="buttonsHidden"
                    :count-buttons="buttons.length"
                    :count-buttons-hidden="buttonsHidden.length"
                    @updateButtons="handleButtonsUpdate"
                    @getButtons="getHotelButtons"
                    @updateLocalButtons="updateLocalButtons"
                />
            </section>
        </div>
        <!-- <ChangesBar 
            :existingChanges="false"
            :validChanges="false"
            @cancel="closePanel" 
            @submit="submit"
        /> -->
    </SlidePanel>
</template>
<script setup>
import { inject, onMounted, ref, reactive } from 'vue';
import SlidePanel from '@/components/SlidePanel.vue';
import SectionButtons from '@/Modules/Hotel/Components/SectionButtons.vue';
import WarningHiddenSection from '@/Modules/Hotel/Components/WarningHiddenSection.vue';
import ChangesBar from '@/components/Forms/ChangesBar.vue';
//
import { useHotelButtonsStore } from '@/stores/modules/hotelButtons'
const hotelButtonsStore = useHotelButtonsStore();

const panelSelected = inject('panelSelected')
const rawSections = inject('rawSections')
const buttons = ref([]);
const buttonsHidden = ref([]);
const allButtonsHidden = ref(true);
const form = reactive({
    show_wifi: false,
    buttons_home: false
});

onMounted(() => {
    getHotelButtons()
});


const getHotelButtons = async () => {
    const response = await hotelButtonsStore.$getAllHotelButtons();
    console.log('test response', response);
    buttons.value = Object.values(response.data.visible);
    buttonsHidden.value = Object.values(response.data.hidden);
    allButtonsHidden.value = response.data.total === response.data.totalHidden;

    // if(response.data.totalHidden === response.data.total) {
    // form.buttons_home = false;
    // submit();
    // }
}

const updateLocalButtons = (data) => {
    console.log('test updateLocalButtons', data.data);
    buttons.value = Object.values(data.data.visible);
    buttonsHidden.value = Object.values(data.data.hidden);
    allButtonsHidden.value = data.data.total === data.data.totalHidden;
}

// const submit = async () => {
//     const body = {
//       buttons_home: form.buttons_home,
//       image: imgSelected.value.url ?? null
//     };

//     const response = await hotelStorage.$updateShowButtons(body);
//     if (response.ok) {
//       toast.warningToast('Configuración actualizada correctamente');
//       loadHotel()
//     } else {
//       toast.errorToast('Error al actualizar la configuración');
//     }
// };

async function loadHotel () {
    const hotel = await hotelStorage.$findByParams()

    Object.assign(hotelData, hotel)
    loadForm(hotel) 

    form.buttons_home = Boolean(hotel.buttons_home)

    // Object.assign(initialState, { ...form });
    // initialImage.value = { ...imgSelected.value };
}

const handleButtonsUpdate = async () => {
    // Esta función se mantiene para compatibilidad pero ya no necesita parámetros
    // La gestión del estado se hace internamente en SectionButtons
};


</script>