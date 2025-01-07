<template>
    <div class="h-full bg-[#FAFAFA] flex flex-col">
        <div class="px-[24px]">
            <div class="py-[20px] border-b border-[#BFBFBF] flex space-x-2">
                <h1 class="text-[22px] font-medium">
                    Diseño
                </h1>
                <BaseTooltipResponsive
                    size="l"
                    :top="35"
                    :left="-0"
                >
                    <template #button>
                        <img class="w-[24px] h-[24px]" src="/assets/icons/TH.INFO.GREEN.svg">
                        </template>
                        <template #content>
                        <p class="text-sm leading-[150%] font-normal">
                            En esta vista podrás configurar todos los aspectos visuales de la WebApp.
                        </p>
                    </template>
                </BaseTooltipResponsive>
            </div>
        </div>
        <div
            v-if="typeChain.CHAIN === hotelData.chain.type"
            class="h-[48px] w-full bg-[#D9E8F2] text-center flex items-center justify-center py-[14px]"
        >
            <p class="text-sm font-medium mx-2">Los aspectos configurados en esta sección se aplicarán a la WebApp de todos los alojamientos de la cadena asociados a la cuenta.</p>
        </div>
        <div class="p-[24px] space-y-[24px] mb-[33px] flex-1">

             <div class="px-4 py-6 rounded-[10px] hbg-white-100 card-form">
                <h5 class="text-base font-semibold mb-2">Colores</h5>
                <p class="mb-[24px]">Elige los colores para los elementos de navegación en tu WebApp. Puedes previsualizarlos aplicados en la vista del panel de la derecha.</p>
                <div class="3xl:flex">
                    <div class=" mr-[116px] relative">
                        <h5 class="text-base font-semibold mb-2">Color 1</h5>
                        <p class="w-[449px] mb-4 text-xs font-medium text-[#858181] h-[32px]">Este color se aplicará a barra de navegación, botones principales e indicador del alojamiento en el mapa  </p>
                        <PickColor :codes-color="{codHex: colorsForm?.[0]?.cod_hex, codRbg: colorsForm?.[0]?.cod_rbg}" @change:color="handleColor($event, 0)" />
                        <h5 class="text-base font-semibold mt-4">Color de contraste 1</h5>
                        <p class="text-[12px] font-medium mt-2">Este color se aplicará a textos, iconos y bordes sobre el Color 1</p>
                        <div class="mt-4 flex space-x-[32px]">
                            <div class="flex space-x-2">
                                <!-- <RadioButton id="color-1" :value="'0'" v-model="colorsForm[0].contrast"/> -->
                                <input
                                    v-model="colorsForm[0].contrast"
                                    :value="'0'"
                                    :checked="colorsForm[0].contrast === '0'"
                                    name="color-1"
                                    type="radio"
                                    class="size-[24px] hradio"
                                >
                                <span class="text-base">Negro</span>
                            </div>
                            <div class="flex space-x-2">
                                <!-- <RadioButton id="color-1" :value="'1'" v-model="colorsForm[0].contrast"/> -->
                                 <input
                                    v-model="colorsForm[0].contrast"
                                    :value="'1'"
                                    :checked="colorsForm[0].contrast === '1'"
                                    name="color-1"
                                    type="radio"
                                    class="size-[24px] hradio"
                                >
                                <span class="text-base">Blanco</span>
                            </div>
                        </div>
                    </div>
                    <div class="mt-[33px] 3xl:mt-0 relative">
                        <h5 class="text-base font-semibold mb-2">Color 2</h5>
                        <p class="w-[449px] mb-4 text-xs font-medium text-[#858181] h-[32px]">Este color se aplicará a banners y elementos de notificación</p>
                        <PickColor :codes-color="{codHex: colorsForm?.[1]?.cod_hex, codRbg: colorsForm?.[1]?.cod_rbg}"  @change:color="handleColor($event, 1)" />
                        <h5 class="text-base font-semibold mt-4">Color de contraste 2</h5>
                        <p class="text-[12px] font-medium mt-2">Este color se aplicará a textos, iconos y bordes sobre el Color 2</p>
                        <div class="mt-4 flex space-x-[32px]">
                            <div class="flex space-x-2">
                                <!-- <RadioButton id="color-2" :value="'0'" v-model="colorsForm[1].contrast"/> -->
                                <input
                                    v-model="colorsForm[1].contrast"
                                    :value="'0'"
                                    :checked="colorsForm[1].contrast === '0'"
                                    name="color-2"
                                    type="radio"
                                    class="size-[24px] hradio"
                                >
                                <span class="text-base">Negro</span>
                            </div>
                            <div class="flex space-x-2">
                                <!-- <RadioButton id="color-2" class-content="size-[24px]" :value="'1'" v-model="colorsForm[1].contrast"/> -->
                                <input
                                    v-model="colorsForm[1].contrast"
                                    :value="'1'"
                                    :checked="colorsForm[1].contrast === '1'"
                                    name="color-2"
                                    type="radio"
                                    class="size-[24px] hradio"
                                >
                                <span class="text-base">Blanco</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="px-4 py-6 rounded-[10px] hbg-white-100 card-form">
                <h5 class="text-base font-semibold mb-2">Logo o Nombre del hotel</h5>
                <p class="mb-[16px] ">Añade el logo de tu alojamiento para que tus huéspedes lo visualicen en el banner principal de tu WebApp, o puedes optar por mostrar el nombre en formato texto.</p>
                <div class="flex 3xl:justify-start">
                    <div class="3xl:w-[380px] mr-[20px] flex flex-col flex-1  3xl:flex-none">
                        <div class="flex items-center">
                            <div
                                v-if="form.logo"
                                class="card-logo mt-4 rounded-[6px] p-2 flex justify-center items-center relative border hbg-gray-100 hborder-gray-400"
                                @mouseenter="hoverCardLogo = true"
                                @mouseleave="hoverCardLogo = null"
                            >
                                <div v-if="hoverCardLogo === true" class="bg-black bg-opacity-25 w-full h-full absolute inset-0  p-2 flex justify-between z-[1000]">
                                    <button
                                        v-if="form.logo"
                                            class="absolute left-2 top-2 bg-white p-[2px] rounded-[3px] w-[24px] h-[24px]"
                                            @click="removeLogo"
                                    >
                                        <img src="/assets/icons/1.TH.DELETE.OUTLINE.svg" class=" w-[20px] h-[20px]">
                                    </button>
                                    <button
                                        class="absolute right-2 top-2 bg-white p-[2px] rounded-[3px] w-[24px] h-[24px] p-[2px]"
                                        @click="openGallery"
                                    >
                                        <img src="/assets/icons/1.TH.EDIT.OUTLINED.svg" class=" w-[20px] h-[20px]">
                                    </button>
                                </div>
                                
                                <div class="box-img flex">
                                    <img  class="object-contain" :src="$formatImage({url: form.logo, type: 'STORAGE', urlDefault: null })" alt="">
                                </div>
                            </div>
                            <button
                                v-else
                                class="mt-4 relative w-[140px] h-[93px] rounded-[6px] border hborder-black-100 cursor-pointer add-file"
                                @click="openGallery"
                            >
                                <div class="icon w-[16px] h-[16px] inline-block " />
                                <h5 class="text-xs font-medium text-center flex flex-column items-center justify-center">
                                    Añadir logo
                                </h5>
                            </button>
                            <div class="py-[15px] pl-4 pr-[20px]">
                                <p class="text-xs font-medium text-[#858181]">Tamaño máximo del archivo: 5MB <br> Formatos recomendados: .PNG o .SVG</p>
                            </div>
                        </div>
                        <div class="flex space-x-2 mt-[20px]">
                            <!-- <RadioButton :value="'0'" v-model="form.type_header"/> -->
                            <input
                                v-model="form.type_header"
                                :value="'0'"
                                :checked="form.type_header === '0'"
                                name="type_header-0"
                                type="radio"
                                class="size-[24px] hradio"
                            >
                            <span class="text-base">Logo</span>
                        </div>
                    </div>
                    <div class="3xl:w-[446px] flex flex-col justify-between space-y-[20px] flex-1  3xl:flex-none">
                        <div>
                            <p class="text-sm font-medium mb-2">Nombre del hotel o de la cadena de hoteles</p>
                            <BaseTextField
                                v-model="form.name"
                                placeholder="Escribe texto"
                                class-content="flex-1"
                                name="title"
                            />
                        </div>
                        <div class="flex space-x-2">
                             <!-- <RadioButton :value="'1'" v-model="form.type_header"/> -->
                            <input
                                v-model="form.type_header"
                                :value="'1'"
                                :checked="form.type_header === '1'"
                                name="type_header-1"
                                type="radio"
                                class="size-[24px] hradio"
                            >
                            <span class="text-base">Nombre</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="px-4 py-6 rounded-[10px] hbg-white-100 card-form">
                <h5 class="text-base font-semibold mb-2">Header</h5>
                <p class="mb-[24px]">Elige si quieres mostrar el header de tu WebApp en tonalidad oscura o clara. Si utilizas una imagen de logo, asegúrate de que contraste correctamente.</p>
                <div class="flex 3xl:justify-start">
                    <div class="w-[341px] 3xl:w-[380px] space-y-[24px] mr-[24px]">
                        <div class="rounded-[10px] py-[24px] px-4 border border-[#BFBFBF] hbg-black-100 w-full flex items-start justify-between">
                                <span class="text-[30px] font-medium text-white leading-[32px]">Nombre Hotel</span>
                                <div class="w-[48px] h-[48px]">
                                    <img
                                        src="assets/icons/TH.WA.AVATAR.BUTTON.svg"
                                        alt="TH.WA.AVATAR.BUTTON"
                                        class="w-full h-full"
                                    >
                                </div>
                        </div>
                        <div class="flex space-x-2">
                            <!-- <RadioButton :value="'0'" v-model="form.tonality_header"/> -->
                            <input
                                v-model="form.tonality_header"
                                :value="'0'"
                                :checked="form.tonality_header === '0'"
                                name="tonality_header-0"
                                type="radio"
                                class="size-[24px] hradio"
                            >
                            <span class="text-base font-medium">Tono oscuro</span>
                        </div>
                    </div>
                    <div class="w-[341px] 3xl:w-[380px] space-y-[24px]">
                        <div class="rounded-[10px] py-[24px] px-4 border border-[#BFBFBF] hbg-gray-100 w-full flex items-start justify-between">
                                <span class="text-[30px] font-medium htext-black-100 leading-[32px]">Nombre Hotel</span>
                                <div class="w-[48px] h-[48px]">
                                    <img
                                        src="assets/icons/TH.WA.AVATAR.BUTTON.svg"
                                        alt="TH.WA.AVATAR.BUTTON"
                                        class="w-full h-full"
                                    >
                                </div>
                        </div>
                        <div class="flex space-x-2">
                            <!-- <RadioButton :value="'1'" v-model="form.tonality_header"/> -->
                            <input
                                v-model="form.tonality_header"
                                :value="'1'"
                                :checked="form.tonality_header === '1'"
                                name="tonality_header-1"
                                type="radio"
                                class="size-[24px] hradio"
                            >
                            <span class="text-base font-medium">Tono claro</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="border-t hbg-white-100 p-6 sticky bottom-0 flex justify-between z-10">
            <button
                class="hbtn-tertiary text-sm underline"
                :disabled="!isChanged"
                @click="cancelChanges"
            >
                Cancelar
            </button>
            <button
                class="px-4 text-sm font-medium h-11 hbtn-cta"
                :disabled="isloadingForm || !isChanged"
                @click="submit"
            >
                Guardar
            </button>
        </div>
    </div>

    <ModalNoSave
        :id="'not-saved'"
        :open="isChanged"
        text="Tienes cambios sin guardar. Para aplicar los cambios realizados debes guardar."
        textbtn="Guardar"
        @saveChanges="submit"
        type="save_changes"
    />

    <ModalGallery
        ref="modalGaleryRef"
        :id="'modal-gallery'"
        :name-image-new="hotelStore.hotelData.name"
        @update:img="addNewsImages($event)"
    />

</template>

<script setup>

import { ref, reactive, onMounted, computed } from 'vue';

import { cloneDeep } from 'lodash';


const color = ref(null);

import { $formatImage } from '@/utils/helpers';
import { typeChain } from '@/utils/enums';

// COMPONENTS
import BaseTextField from "@/components/Forms/BaseTextField.vue";
import RadioButton from '@/components/Forms/RadioButton.vue';
import BaseTooltipResponsive from '@/components/BaseTooltipResponsive.vue';
import PickColor from './components/PickColor.vue';
import ModalGallery from '@/components/ModalGallery';
import ModalNoSave from '@/components/ModalNoSave.vue';

import { useCustomizationStore } from '@/stores/modules/customization';
const customizationStore = useCustomizationStore();
import { useHotelStore } from '@/stores/modules/hotel';
const hotelStore = useHotelStore();
const hotelData = ref(hotelStore.hotelData);
import { useMockupStore } from '@/stores/modules/mockup';
const mockupStore = useMockupStore();

// COMPOSABLES
import { useToastAlert } from '@/composables/useToastAlert'
const toast = useToastAlert();

// DATA
const isloadingForm = ref(false);
const hoverCardLogo = ref(null);
const modalGaleryRef = ref(null);

const colorsDedault = ([
    {
        cod_hex: '#333333',
        cod_rbg: 'rgb(51, 51, 51)',
        contrast: '1',
    },
    {
        cod_hex: '#FFD700',
        cod_rbg: 'rgb(250, 215, 0)',
        contrast: '0',
    }
]);

const dataFormDefault ={
    colors: cloneDeep(colorsDedault),
    logo: null,
    name: null,
    type_header: '0',
    tonality_header: '0',
};

const formDefault = reactive(cloneDeep(dataFormDefault));
const form = reactive(cloneDeep(dataFormDefault));

const colorsForm = computed(() => {
    return form.colors;
});

const isChanged = computed(()=>{
    let c =
        form.colors?.[0]?.cod_hex !== formDefault.colors?.[0]?.cod_hex ||
        form.colors?.[1]?.cod_hex !== formDefault.colors?.[1]?.cod_hex ||
        form.colors?.[0]?.contrast !== formDefault.colors?.[0]?.contrast ||
        form.colors?.[1]?.contrast !== formDefault.colors?.[1]?.contrast ||
        form.name !== formDefault.name ||
        form.logo !== formDefault.logo  ||
        form.type_header !== formDefault.type_header ||
        form.tonality_header !== formDefault.tonality_header

    return c;
});
const normalize = (value) => {
    return value === "" || value === null || value === undefined ? null : value;
}

onMounted(() => {
    loadCustomization();
    loadMockup();
});

function openGallery () {
    modalGaleryRef.value.openModal();
}

function addNewsImages (e) {
    form.logo = e.url;
}

function loadForm (customization) {
    if (!customization) return;
    form.colors = cloneDeep(customization.colors);
    form.logo = customization.logo;
    form.name = customization.name;
    form.type_header = String(customization.type_header);
    form.tonality_header = String(customization.tonality_header);
    formDefault.colors = cloneDeep(customization.colors);
    formDefault.logo = customization.logo;
    formDefault.name = customization.name;
    formDefault.type_header = String(customization.type_header);
    formDefault.tonality_header = String(customization.tonality_header);
}

async function loadCustomization () {
        const body = {...form}
        const response  = await customizationStore.$findOne();
        const  {ok, data} = response ?? {};
        if (ok) {
            loadForm(data);
        }
}

async function submit () {
        isloadingForm.value = true;
        const body = {...form}
        const response  = await customizationStore.$update(body);
        const  {ok, data} = response ?? {}
        if (ok) {
            toast.warningToast('Cambios guardados con éxito','top-right');
        } else {
            toast.warningToast(data?.message,'top-right');
        }
        isloadingForm.value = false;
        loadCustomization();
       mockupStore.$reloadIframe();
}

function cancelChanges (){
    Object.assign(form, formDefault);
}

function handleColor (e, index) {
    form.colors[index].cod_hex = e.codHex;
    form.colors[index].cod_rbg = e.codRbg;
}

function loadMockup () {
    mockupStore.$setIframeUrl('/');
    mockupStore.$setInfo1('Guarda para ver tus cambios en tiempo real', '/assets/icons/info.svg')
    mockupStore.$setLanguageTooltip(true)
}

</script>

<style lang="scss">

.icon-cntnr:hover{
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.15);
}
.card-logo{
    width:140px; 
    height: 93px;
    .box-img{
        width: 78px;
        height: 78px;
    }
    .logo-selected{
        width: 148px;
        height: 101px;
        left: -5px;
        border: 1px solid var(--h-green-700);
    }
}

.add-file {
    & .icon {
        width: 20px;
        height: 20px;
        background-image: url('/public/assets/icons/1.TH.PLUS.svg');
        background-size: cover;
    }
    &:hover {
        border-color: var(--h-green-600);

        & > h5 {
            color: var(--h-green-600);
        }

        & .icon {
            background-image: url('/public/assets/icons/1.TH.PLUS.GREEN.svg');
        }

    }
}

    
</style>