<template>
  <div class="min-h-screen flex flex-col justify-between px-[24px] bg-[#FAFAFA] ">
    <div>
      <section class="flex justify-between py-[19px] border-b border-[#BFBFBF] mb-6">
        <div class="space-x-2 flex">
          <h1 class="font-medium text-[22px]">Home</h1>
          <BaseTooltipResponsive size="l" :top="35" :left="-0">
            <template #button>
              <img class="w-[24px] h-[24px]" src="/assets/icons/TH.INFO.GREEN.svg" />
            </template>
            <template #content>
              <p class="text-sm leading-[150%] font-normal">
                En esta sección podrás configurar algunos aspectos de la Home de la WebApp de tu alojamiento.
              </p>
            </template>
          </BaseTooltipResponsive>
        </div>
        <hr>
      </section>

      <SectionConfig :margin-bottom="'24px'">
        <template #title>
          <span class="text-base font-medium">Imagen de portada</span>
          <p class="font-normal text-sm">
            Selecciona la imagen que encabezará la Home de tu WebApp. Te recomendamos utilizar una imagen que
            represente la calidad de tu establecimiento.
          </p>
        </template>
        <template #content>
          <div class="max-w-[611px]">
            <div class="mt-4">
                  <div
                      class="card-logo mt-4 rounded-[6px] flex justify-center items-center relative hbg-gray-100  hborder-gray-400"
                      @mouseenter="hoverCardLogo = true"
                      @mouseleave="hoverCardLogo = null"
                  >
                    <div v-if="hoverCardLogo === true" class="bg-black bg-opacity-25 w-full h-full absolute inset-0 p-2 flex justify-between">
                        <button
                            class="absolute left-2 top-2 bg-white p-[2px] rounded-[3px] w-[24px] h-[24px]"
                            @click="openPreview($formatImage({url: imgSelected.url, type: imgSelected.type}))"
                        >
                            <img src="/assets/icons/1.TH.SEARCH.svg" class="w-[20px] h-[20px]">
                        </button>
                        <button
                            class="absolute right-2 top-2 bg-white p-[2px] rounded-[3px] w-[24px] h-[24px]"
                            @click="openModelGallery"
                        >
                            <img src="/assets/icons/1.TH.EDIT.OUTLINED.svg" class="w-[20px] h-[20px]">
                        </button>
                    </div>

                    <img
                        v-if="imgSelected.url"
                        class="object-cover h-full w-full rounded-[6px]" :src="$formatImage({url: imgSelected.url, type: imgSelected.type})" alt="image-wallpaper"
                    >
                    <img
                        v-else
                        class="object-cover h-full w-full rounded-[6px]"
                        :src="$formatImage({url: bgDefault.url, type: bgDefault.type})"
                        alt="image-default"
                    >
              </div>
            </div>
          </div>
        </template>
      </SectionConfig>

      <SectionConfig >
        <template #title>
          <div class="flex  items-center justify-between px-2 py-4 bg-[#FFF2CC] rounded-[10px]" v-if="!form.buttons_home">
              <div class="flex gap-2 items-center">
                <img src="/assets/icons/1.TH.INFO.svg" class="w-4 h-4">
                <span class="text-sm font-normal text-[#333]">La botonera se encuentra oculta y tus huéspedes no podrán verla. Para mostrarla, activa el botón Mostrar en la WebApp</span>
              </div>
              <div class="flex items-center">
                <div class="mr-2 text-[#333] font-semibold text-sm">Mostrar en la WebApp</div>
                <BaseTooltipResponsive 
                  v-if="allButtonsHidden"
                  size="s" 
                  :top="-86" 
                  :right="0"
                >
                  <template #button>
                    <Toggle v-model="form.buttons_home" :show-tooltip="false" :margin-right="'mr-0'" toggle-disabled />
                  </template>
                  <template #content>
                    <p class="text-sm leading-[150%] font-normal">
                      Activa al menos un botón para mostrar la botonera
                    </p>
                  </template>
                </BaseTooltipResponsive>
                <Toggle 
                  v-else
                  v-model="form.buttons_home" 
                  :show-tooltip="false" 
                  :margin-right="'mr-0'" 
                />
              </div>
          </div>
          <div class="flex justify-between mt-4">
            <span class="font-medium text-base">Botonera</span>
            <div class="flex items-center" v-if="form.buttons_home">
                <div class="mr-2 text-[#333] font-semibold text-sm">Mostrar en la WebApp</div>
                <Toggle v-model="form.buttons_home" :show-tooltip="false" :margin-right="'mr-0'" />
              </div>
          </div>
          <p class="font-normal text-sm mb-6">
            Elige los accesos rápidos que deseas para optimizar el uso de tu WebApp.
          </p>
        </template>
        <template #content>
          <SectionButtons 
            v-model:buttons="buttons"
            :buttons-hidden="buttonsHidden"
            :count-buttons="buttons.length"
            :count-buttons-hidden="buttonsHidden.length"
            @updateButtons="handleButtonsUpdate"
            @getButtons="getHotelButtons"
          />
        </template>
      </SectionConfig>
    </div>

    <div class="border-t hbg-white-100 p-6 sticky bottom-0 flex justify-between items-center z-10 mx-[-24px]">
        <button 
            class="text-base leading-[110%] font-medium underline"
            :class="{'htext-gray-300':!isChanged, 'htext-black-100 hover-htext-black-200' : isChanged}"
            :disabled="!isChanged"
            @click="cancelChanges"
        >
            Cancelar
        </button>
        <button
            class="hbtn-cta py-3 px-4 text-sm leading-[110%] font-medium h-11"
            :disabled="isloadingForm || formInvalid || !isChanged"
            :class="{'cta-disabled':isloadingForm || formInvalid || !isChanged}"
            @click="submit"
        >
            Guardar
        </button>
    </div>
  </div>

  <ModalGallery
    ref="modalGaleryRef"
    :id="'modal-gallery'"
    :name-image-new="hotelData.name"
    @update:img="addNewsImages($event)"
  />

  <BasePreviewImage 
    :url-image="previewUrl"
    :is-open="isPreviewOpen"
    @click:close="closePreviewImage"
/>
</template>

<script setup>
import { reactive, ref, onMounted, computed,watch, nextTick } from 'vue';
import Toggle from '@/components/Toggle.vue';
import SectionConfig from '@/components/SectionConfig.vue';
import BaseTooltipResponsive from '@/components/BaseTooltipResponsive.vue';
import ModalGallery from '@/components/ModalGallery.vue';
import { useHotelStore } from '@/stores/modules/hotel';
import { useToastAlert } from '@/composables/useToastAlert'
import BasePreviewImage from '@/components/BasePreviewImage.vue';
import SectionButtons from '@/Modules/Hotel/Components/SectionButtons.vue';

import { useHotelButtonsStore } from '@/stores/modules/hotelButtons'
const hotelButtonsStore = useHotelButtonsStore();

import { useMockupStore } from '@/stores/modules/mockup'
const mockupStore = useMockupStore();

const toast = useToastAlert();
const hotelStorage = useHotelStore();
const { hotelData } = hotelStorage;

const form = reactive({
    show_wifi: false,
    buttons_home: false
});



watch(() => form.buttons_home, (newVal) => {
    if (newVal) {
        if (!form.show_wifi) {
            form.show_wifi = true;
        }
    } else {
        form.show_wifi = false;
    }
});

const buttons = ref([]);
const buttonsHidden = ref([]);
const allButtonsHidden = ref(true);



const getHotelButtons = async () => {
      const response = await hotelButtonsStore.$getAllHotelButtons();
      buttons.value = Object.values(response.data.visible);
      buttonsHidden.value = Object.values(response.data.hidden);
      allButtonsHidden.value = response.data.total === response.data.totalHidden;

      mockupStore.$reloadIframe();
  }

const imgSelected = ref({ url: hotelData.image, type: getTypeImg(hotelData.image) });
const bgDefault = {url: '/storage/gallery/general-1.jpg', type: 'STORAGE', default: true}
const hoverCardLogo = ref(null);
const modalGaleryRef = ref(null);
const isloadingForm = ref(false);
const formInvalid = false;
const initialState = reactive({});
const isDisabled = ref(false);

const previewUrl = ref('');
const isPreviewOpen = ref(false);

const isChanged = computed(() => {
    return (
        form.buttons_home !== initialState.buttons_home ||
        (initialImage.value && imgSelected.value?.url !== initialImage.value?.url) ||
        (!initialImage.value && imgSelected.value) 
    );
});

function getTypeImg (url) {
    if (!url) return;
    let type = url?.includes('https://') ? 'CDN' : 'STORAGE'
    return type
}


function openPreview(url) {
    // console.log(url,'url');
    previewUrl.value = url;
    isPreviewOpen.value = true;
}

function closePreviewImage () {
    previewUrl.value = null;
    isPreviewOpen.value = false;
}


const initialImage = ref(null);

onMounted(() => {
    mockupStore.$setIframeUrl('')
    imgSelected.value ={ url: hotelData.image, type: getTypeImg(hotelData.image) }; 
    initialImage.value = { ...imgSelected.value };
    Object.assign(initialState, form);
    loadHotel()
    getHotelButtons()
});

const openModelGallery = () => {
    modalGaleryRef.value.openModal();
};

const addNewsImages = (images) => {
    imgSelected.value = { ...images };
};

const cancelChanges = () => {
    window.location.reload();
};

const submit = async () => {
    const body = {
      buttons_home: form.buttons_home,
      image: imgSelected.value.url ?? null
    };

    const response = await hotelStorage.$updateShowButtons(body);
    if (response.ok) {
      toast.warningToast('Configuración actualizada correctamente');
      loadHotel()
      mockupStore.$reloadIframe();
    } else {
      toast.errorToast('Error al actualizar la configuración');
    }
};
async function loadHotel () {
    const hotel = await hotelStorage.$findByParams()

    Object.assign(hotelData, hotel)
    loadForm(hotel) 

    // Actualizamos form.buttons_home después de cargar los datos
    form.buttons_home = Boolean(hotel.buttons_home)

    // Guardar los valores iniciales una vez que los datos del hotel se han cargado
    Object.assign(initialState, { ...form });
    initialImage.value = { ...imgSelected.value };
}

const loadForm = (hotel) => {

    imgSelected.value = { url: hotel.image, type: getTypeImg(hotel.image) };

    isDisabled.value = hotel.legal;

    //console.log(hotel.legal, 'hotel')
};

const $formatImage = (payload) => {
    const URL_STORAGE = process.env.VUE_APP_STORAGE_URL;
    let { url, type, urlDefault } = payload;
    if (!url || !URL_STORAGE) return;
    if (urlDefault) return url;
    let type_d = url.includes('https://') ? 'CDN' : 'STORAGE';
    type = type ?? type_d;
    return type === 'CDN' || type === 'image-hotel-scraper' ? url : URL_STORAGE + url;
};


watch(() => form.buttons_home, (newVal) => {
    buttons.value.forEach(button => {
        button.is_visible = newVal;
    });
});

const handleButtonsUpdate = async (newButtons) => {
    //buttons.value = newButtons;
    //console.log(buttons.value, 'buttons')
    //await getHotelButtons();
};
</script>

<style lang="scss" scoped>

  .icon-cntnr:hover{
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.15);
  }
  .card-logo{
      width:224px; 
      height: 149px;
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

  .shadow-card {
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.15);
  }

  .shadow-draginng {
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  }

  .buttom-drag {
    transition: all 0.2s ease;
    &:hover {
      transform: scale(1.1);
    }
  }

</style>