<template>
    <div class="min-h-screen flex flex-col justify-between px-[24px] bg-[#FAFAFA]">
      <div>
        <section class="flex justify-between py-[20px]">
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
                    <div v-if="hoverCardWallpaper === index" class="bg-black bg-opacity-25 w-full h-full absolute inset-0  p-2 flex justify-between">
                        <button
                            v-if="imgSelected.url"
                            class="absolute left-2 top-2 bg-white p-[2px] rounded-[3px] w-[24px] h-[24px]"
                            @click="removeLogo"
                        >
                            <img src="/assets/icons/1.TH.DELETE.OUTLINE.svg" class=" w-[20px] h-[20px]">
                        </button>
                        <button
                            class="absolute right-2 top-2 bg-white p-[2px] rounded-[3px] w-[24px] h-[24px]"
                            @click="openModelGallery"
                        >
                            <img src="/assets/icons/1.TH.EDIT.OUTLINED.svg" class=" w-[20px] h-[20px]">
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
  
        <SectionConfig>
          <template #title>
            <div class="flex justify-between">
              <span class="font-medium text-base">Botonera</span>
              <div class="flex items-center">
                <div class="mr-2 text-[#333] font-semibold text-[10px]">{{ form.show_all ? 'Visible' : 'Oculto' }}</div>
                <!-- Toggle para mostrar todos -->
                <Toggle v-model="form.show_all" :show-tooltip="false" :margin-right="'mr-0'" />
              </div>
            </div>
            <p class="font-normal text-sm mb-6">
              Elige y controla la visibilidad de los botones para la botonera de la Home de tu WebApp.
            </p>
          </template>
          <template #content>
            <div class="grid grid-cols-3 3xl:w-3/5 1x1:w-full">
              <!-- Toggle para WIFI -->
              <div class="bg-white rounded-lg shadow-md py-4 px-4 h-[141px] w-[224px] flex flex-col justify-between">
                <div class="flex justify-end">
                  <div class="mr-2 text-[#333] font-semibold text-[10px]">{{ form.show_wifi ? 'Visible' : 'Oculto' }}</div>
                  <Toggle  v-model="form.show_wifi" :show-tooltip="false" :margin-right="'mr-0'" />
                </div>
                <div class="flex flex-col justify-start mt-auto gap-1">
                  <img src="/assets/icons/1.TH.WiFi.png" alt="Wifi" class="h-6 w-6 " :class="{
                    'opacity-50': !form.show_wifi
                  }" />
                  <h3 :class="['text-base font-medium leading-3', { 'text-[#333]': form.show_wifi, 'text-[#A0A0A0]': !form.show_wifi }]">Información de WiFi</h3>
                </div>
              </div>
  
              <!-- Toggle para Llamar al hotel -->
              <div class="bg-white rounded-lg shadow-md py-4 px-4 h-[141px] w-[224px] flex flex-col justify-between">
                <div class="flex justify-end">
                  <div class="mr-2 text-[#333] font-semibold text-[10px]">{{ form.show_call ? 'Visible' : 'Oculto' }}</div>
                  <Toggle  v-model="form.show_call" :show-tooltip="false" :margin-right="'mr-0'" />
                </div>
                <div class="flex flex-col justify-start mt-auto gap-1">
                  <img src="/assets/icons/1.TH.PHONE.svg" alt="Llamar" class="h-6 w-6" :class="{
                    'opacity-50': !form.show_call
                  }" />
                  <h3 :class="['text-base font-medium leading-3', { 'text-[#333]': form.show_call, 'text-[#A0A0A0]': !form.show_call }]">Llamar al hotel</h3>
                </div>
              </div>
  
              <!-- Toggle para Normas del hotel -->
              <div :class="['bg-white rounded-lg shadow-md py-4 px-4 h-[141px] w-[224px] flex flex-col justify-between']">
                <div class="flex justify-end">
                  <div :class="['mr-2 font-semibold text-[10px]', { 'text-[#333]': !isDisabled, 'text-[#A0A0A0]': isDisabled }]">{{ form.show_legal_text ? 'Visible' : 'Oculto' }}</div>
                  <Toggle v-model="form.show_legal_text" :show-tooltip="false" :margin-right="'mr-0'" :toggleDisabled="isDisabled" />
                </div>
                <div class="flex flex-col justify-start mt-auto gap-1">
                  <img :class="['h-6 w-6', { 'text-[#333]': !isDisabled, 'opacity-50': isDisabled || !form.show_legal_text, }]" src="/assets/icons/1.TH.SEGUIMIENTO.svg" alt="Normas" />
                  <div class="flex flex-col">
                    <h3 :class="['text-base font-medium leading-3', { 'text-[#333]': !isDisabled || form.show_legal_text, 'text-[#A0A0A0]': isDisabled || !form.show_legal_text }]">Normas del hotel</h3>
                    <div class="flex mt-2" v-if="isDisabled">
                      <img
                          src="/assets/icons/1.TH.WARNING.RED.svg"
                          alt="icon alert red"
                          class="inline w-4 h-4 mr-1"
                      />
                      <span  class="text-[12px] font-semibold text-[#FF6666]">Carga las normas del hotel {{isDisabled}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
</template>
  
<script setup>
    import { reactive, ref, onMounted, computed,watch } from 'vue';
    import Toggle from '@/components/Toggle.vue';
    import SectionConfig from '@/components/SectionConfig.vue';
    import BaseTooltipResponsive from '@/components/BaseTooltipResponsive.vue';
    import ModalGallery from '@/components/ModalGallery.vue';
    import { useHotelStore } from '@/stores/modules/hotel';
    import { useToastAlert } from '@/composables/useToastAlert'


    const toast = useToastAlert();
    const hotelStorage = useHotelStore();
    const { hotelData } = hotelStorage;

    const form = reactive({
        show_wifi: false,
        show_call: false,
        show_legal_text: false,
        show_all: false
    });

    const checkAllHidden = () => {
        if (!form.show_wifi && !form.show_call && !form.show_legal_text) {
            form.show_all = false; // Ocultar si todos los botones están ocultos
        } else {
            form.show_all = true; // Marcar Visible si al menos un botón está activo
        }
    };

    watch([() => form.show_wifi, () => form.show_call, () => form.show_legal_text], () => {
        checkAllHidden();
    });

    watch(() => form.show_all, (newVal) => {
        if (newVal) {
            if (!form.show_wifi && !form.show_call && !form.show_legal_text) {
                form.show_wifi = true;
                form.show_call = true;
                form.show_legal_text = isDisabled.value ? false : true;
            }
        } else {
            form.show_wifi = false;
            form.show_call = false;
            form.show_legal_text = false;
        }
    });

    const imgSelected = ref({ url: hotelData.image, type: getTypeImg(hotelData.image) });
    const bgDefault = {url: '/storage/gallery/general-1.jpg', type: 'STORAGE', default: true}
    const hoverCardLogo = ref(false);
    const modalGaleryRef = ref(null);
    const isloadingForm = ref(false);
    const formInvalid = false;
    const initialState = reactive({});
    const isDisabled = ref(false);

    const isChanged = computed(() => {
        return (
        form.show_wifi !== initialState.show_wifi ||
        form.show_call !== initialState.show_call ||
        form.show_legal_text !== initialState.show_legal_text ||
        form.show_all !== initialState.show_all ||
        (initialImage.value && imgSelected.value?.url !== initialImage.value?.url) ||
        (!initialImage.value && imgSelected.value) 
        );
    });

    function getTypeImg (url) {
        if (!url) return;
        let type = url?.includes('https://') ? 'CDN' : 'STORAGE'
        return type
    }

    

    const initialImage = ref(null);

    onMounted(() => {
        
        imgSelected.value ={ url: hotelData.image, type: getTypeImg(hotelData.image) }; 
        initialImage.value = { ...imgSelected.value };
        Object.assign(initialState, form);
        loadHotel()
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
            buttons: {
            show_wifi: form.show_wifi,
            show_call: form.show_call,
            show_legal_text: form.show_legal_text,
            show_all: form.show_all
            },
            image: imgSelected.value.url ?? null
        };

        const response  = await hotelStorage.$updateShowButtons(body);
            // console.log(response, 'response')
            const  {ok, data} = response ?? {}
            await loadHotel()
            isloadingForm.value = false
            if (ok) {
                toast.warningToast('Cambios guardados con éxito','top-right');
            } else {
                toast.warningToast(data?.message,'top-right');
            }
            //mockupStore.$reloadIframe()

        
    };
    async function loadHotel () {
        const hotel = await hotelStorage.$findByParams()

        Object.assign(hotelData, hotel)
        loadForm(hotel)

        

        // Guardar los valores iniciales una vez que los datos del hotel se han cargado
        Object.assign(initialState, { ...form });
        initialImage.value = { ...imgSelected.value };
    }

    const loadForm = (hotel) => {
        form.show_wifi = hotel.buttons_home.show_wifi || false;
        form.show_call = hotel.buttons_home.show_call || false;
        form.show_legal_text = hotel.buttons_home.show_legal_text || false;
        form.show_all = hotel.buttons_home.show_all || false;
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

    const removeLogo = () => {
        imgSelected.value = {...bgDefault};
    };
</script>
  
<style lang="scss" scoped>

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
  