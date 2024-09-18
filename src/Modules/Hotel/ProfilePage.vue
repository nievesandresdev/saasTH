<template>
    <div class="h-screen px-[24px] bg-[#FAFAFA]">
        <div class="pb-[104px]">
            <section class="flex justify-between py-[20px] border-b border-[#BFBFBF]">
                <div class="space-x-2 flex">
                    <h1 class="font-medium text-[22px]">Perfil del Alojamiento</h1>
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
                                Aquí podrás gestionar la información del perfil de tu alojamiento. Ésta será la información que verán tus huéspedes en tu WebApp.
                            </p>
                        </template>
                    </BaseTooltipResponsive>
                </div>
                <div class="flex items-center">
                    <div class="mr-2 text-gray-700 font-semibold text-sm">Mostrar al huésped</div>
                    <ToggleShowProfile
                        :showProfile="form.show_profile"
                        @updateShowHotel="updateShowHotel"
                    />
                </div>
            </section>
            <div 
                class="mx-[-24px] bg-[#FFF3CC] py-[14px]"
                v-if="hotelData.show_profile !== undefined && !hotelData.show_profile"
            >
                <h1 class="text-center text-sm font-medium leading-[140%]">Esta sección está oculta y no es visible para tus huéspedes. Activa "Mostrar al huésped" para hacerla visible.</h1>
            </div>
            <section class="shadow-md px-4 py-6 mt-6 space-y-4 bg-white rounded-[10px] hborder-black-100">
                <div class="flex space-x-[16px]">
                    <div class="flex-1">
                        <label class="text-sm font-medium mb-2 inline-block">Tipo de alojamiento</label>
                        <BaseSelectField
                            :id="'type_lodging'"
                            :textLabel="'Tipo de alojamiento'"
                            v-model="form.type"
                            :options="typeLodging"
                            mandatory
                            :error="false"
                        />
                    </div>
                    <div class="flex-1">
                        <label class="text-sm font-medium mb-2 inline-block">Categoría</label>
                        <BaseSelectField
                            :id="'type_lodging'"
                            :textLabel="'Elige categoría'"
                            v-model="form.category"
                            :options="categoryLodging"
                            mandatory
                            :error="false"
                        />
                    </div>
                </div>
                <div class="space-y-2">
                    <label class="text-sm font-medium inline-block">Nombre de alojamiento</label>
                    <p class="text-sm">No introduzcas el tipo de alojamiento en el nombre</p>
                    <BaseTextField
                        v-model="form.name"
                        placeholder="Nombre de alojamiento"
                        class-content="flex-1"
                        name="name"
                        :errors="errors"
                        @blur:validate="validate('name')"
                    />
                </div>
            </section>
            <section class="shadow-md px-4 py-6 mt-6 space-y-4 bg-white rounded-[10px] hborder-black-100">
                <div class="space-y-2">
                    <label class="text-sm font-medium inline-block">Descripción Alojamiento</label>
                    <p class="text-sm">Presenta tu alojamiento a los futuros huéspedes. Describe las características únicas, los servicios y la atmósfera que lo hacen especial.</p>
                    <BaseTextareaField
                        v-model="form.description"
                        placeholder="Descripción..."
                        class-content="flex-1"
                        name="description"
                        :max="'500'"
                    />
                </div>
            </section>
            <section class="shadow-md px-4 py-6 mt-6 bg-white rounded-[10px] hborder-black-100 space-y-4">
                <div class="flex space-x-4">
                    <div class="space-y-2 w-[384px]">
                        <div class="flex justify-between">
                            <label class="text-sm font-medium inline-block">Teléfono principal</label>
                            <BaseTooltipResponsive
                                size="l"
                                :top="-85"
                                :left="0"
                            >
                                <template #button>
                                    <img class="w-[24px] h-[24px]" src="/assets/icons/TH.INFO.GREEN.svg">
                                    </template>
                                    <template #content>
                                    <p class="text-sm leading-[150%] font-normal">
                                        Este es el número de teléfono al que llamará el huésped cuando presione el botón “Llamar a recepción” en tu WebApp
                                    </p>
                                </template>
                            </BaseTooltipResponsive>
                        </div>
                        <BasePhoneField
                            v-model="form.phone"
                            name="phone"
                            :errors="errors"
                            @blur:validate="validate('phone')"
                        />
                    </div>
                    <div class="space-y-2 w-[384px]">
                        <label class="text-sm font-medium inline-block">Teléfono secundario</label>
                        <BasePhoneField
                            v-model="form.phone_optional"
                            name="phone_optional"
                            :errors="errors"
                            @blur:validate="validate('phone_optional')"
                        />
                    </div>
                </div>
                <div class="space-y-2 w-[706px]">
                    <label class="text-sm font-medium inline-block">Email</label>
                    <BaseTextField
                        v-model="form.email"
                        placeholder="Introduce email contacto del alojamiento"
                        class-content="flex-1"
                        name="email"
                        :errors="errors"
                        @blur:validate="validate('email')"
                    />
                </div>
                <div class="space-y-2">
                    <ProfilePageSectionMap ref="profilePageSectionMap" />
                    <!-- {{`log: ${form.metting_point_longitude}`}}
                    {{`lat: ${form.metting_point_latitude}`}}
                    {{`address: ${form.address}`}} -->
                </div>
            </section>
            <section 
                class="shadow-md px-4 py-6 mt-6 bg-white rounded-[10px] hborder-black-100 space-y-4"
                id="checkin-checkout"
            >
                <div class="max-w-profile">
                    <h2 class="font-medium text-lg">Horario Check-in / Check-out</h2>
                    <p class="text-sm htext-gray-500 text-justify mt-2">
                        Este será el horario predeterminado para todas las estancias, pero recuerda que puedes personalizar el horario de Check-in y Check-out para cada estancia en particular cuando lo necesites.
                    </p>
                    <div class="w-[411px] mt-[24px] space-y-4">
                        <div class="flex space-x-[24px]">
                            <div class="flex items-center">
                                <label class="text-sm font-medium w-20 mr-6">Check-in</label>
                                <BaseTimeField
                                    ref="checkin"
                                    v-model="form.checkin"
                                    :id="'checkin'"
                                />
                            </div>
                            <div class="flex items-center">
                                <label class="text-[12px] font-semibold w-[113px] mr-6">Hasta <span class="htext-gray-500">(opcional)</span></label>
                                <div>
                                    <BaseTimeField
                                        ref="checkin_optional"
                                        v-model="form.checkin_until"
                                        :id="'checkin_optional'"
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="flex space-x-[24px]">
                            <div class="flex items-center">
                                <label class="text-sm font-medium w-20 mr-6">Check-out</label>
                                <BaseTimeField
                                    ref="checkin"
                                    v-model="form.checkout"
                                    :id="'checkin'"
                                />
                            </div>
                            <div class="flex items-center">
                                <label class="text-[12px] font-semibold w-[113px] mr-6">Hasta <span class="htext-gray-500">(opcional)</span></label>
                                <div>
                                    <BaseTimeField
                                        ref="checkout_optional"
                                        v-model="form.checkout_until"
                                        :id="'checkout_optional'"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- <p
                        class="mt-2 text-xs htext-alert-negative flex items-center"
                    >
                        <img
                            src="/vendor_asset/img/hoster/icons/1.TH.WARNING.svg"
                            alt="icon alert red"
                            class="inline w-4 h-4 mr-2"
                        />
                        Introduce hora de check in y check out
                    </p> -->
                </div>


            </section>
            <section class="shadow-md px-4 py-6 mt-6 bg-white rounded-[10px] hborder-black-100 space-y-4">
                <div class="max-w-profile">
                    <h2 class="font-medium text-lg">Servicio de WiFi</h2>
                    <div class="flex justify-between mt-2">
                        <p class="text-sm htext-gray-500 text-justify">
                            Comunica a tus huéspedes si tu alojamiento cuenta con servicio de WiFi gratuito
                        </p>
                        <div class="flex space-x-2">
                            <label class="text-sm font-medium leading-[110%]" :class="!form.with_wifi ? 'text-[#333]' : 'text-[#A0A0A0]'">No</label>
                            <BaseSwichInput id="toggle-wifi" v-model="form.with_wifi" />
                            <label class="text-sm font-medium leading-[110%]" :class="form.with_wifi ? 'text-[#333]' : 'text-[#A0A0A0]'">Si</label>
                        </div>
                    </div>
                </div>
            </section>
            <section class="shadow-md px-4 py-6 mt-6 bg-white rounded-[10px] hborder-black-100 space-y-4">
                <h2 class="font-medium text-lg">Fotos</h2>
                <profilePageSectionPhotos @openModelGallery="openModelGallery()" />
            </section>
            <section class="shadow-md px-4 py-6 mt-6 bg-white rounded-[10px] hborder-black-100 space-y-6">
                <h2 class="font-medium text-lg">Redes sociales</h2>
                <div class="space-y-4 w-[585px]">
                    <BaseTextField
                        v-model="form.urlInstagram"
                        placeholder="Instagram URL"
                        class-content="flex-1"
                        prepend-inner-icon="/assets/icons/1.TH.INSTAGRAM.COLOR.svg"
                        name="urlInstagram"
                    />
                    <BaseTextField
                        v-model="form.urlFacebook"
                        placeholder="Facebook URL"
                        class-content="flex-1"
                        prepend-inner-icon="/assets/icons/1.TH.FACEBOOK.COLOR.svg"
                        name="urlFacebook"
                    />
                    <BaseTextField
                        v-model="form.urlPinterest"
                        placeholder="Pinterest URL"
                        class-content="flex-1"
                        prepend-inner-icon="/assets/icons/1.TH.PINTEREST.COLOR.svg"
                        name="urlPinterest"
                    />
                    <BaseTextField
                        v-model="form.urlX"
                        placeholder="X URL"
                        class-content="flex-1"
                        prepend-inner-icon="/assets/icons/1.TH.X.svg"
                        name="urlX"
                    />
                </div>
            </section>

        </div>
        <div class="border-t hbg-white-100 p-6 sticky bottom-0 flex justify-between items-center z-10 mx-[-24px]">
            <button 
                class="text-base leading-[110%] font-medium underline"
                :class="{'htext-gray-300':!isChanged, 'htext-black-100 hover-htext-black-200' : isChanged}"
                :disabled="!isChanged"
                @click="loadHotel"
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
        :name-image-new="hotelData.name"
        multiple
        @update:img="addNewsImages($event)"
    />
</template>

<script setup>
    import { ref, reactive, onMounted, provide, computed, nextTick } from 'vue';
    //COMPONENTS
    import BaseTooltipResponsive from "@/components/BaseTooltipResponsive.vue";
    import ToggleShowProfile from '@/Modules/Hotel/Components/ToggleShowProfile.vue';
    import BaseSelectField from "@/components/Forms/BaseSelectField.vue";
    import BaseTextField from "@/components/Forms/BaseTextField.vue";
    import BaseTextareaField from "@/components/Forms/BaseTextareaField.vue";
    import BasePhoneField from "@/components/Forms/BasePhoneField.vue";
    import BaseTimeField from "@/components/Forms/BaseTimeField.vue";
    import BaseSwichInput from "@/components/Forms/BaseSwichInput.vue";
    //
    import ModalGallery from '@/components/ModalGallery.vue';
    import ModalNoSave from '@/components/ModalNoSave.vue'
    import ProfilePageSectionMap from "./ProfilePageSectionMap.vue";
    import ProfilePageSectionPhotos from "./ProfilePageSectionPhotos.vue";
    
    import { useFormValidation } from '@/composables/useFormValidation'
    import * as rules from '@/utils/rules';
    
    // STATE
    import { useHotelStore } from '@/stores/modules/hotel';
    const hotelStorage = useHotelStore();
    // const { hotelData } = hotelStorage;
    import { useMockupStore } from '@/stores/modules/mockup';
    const mockupStore = useMockupStore();

    // COMPOSABLES
    import { useToastAlert } from '@/composables/useToastAlert'
    const toast = useToastAlert();
    import useScrollToElement from '@/composables/useScrollToElement';
    const { scrollToElement } = useScrollToElement();
    //DATA
    const form = reactive({
        hotel_id: null,
        name: null,
        type: null,
        category: null,
        email: null,
        phone: null,
        phone_optional: null,
        address: null,
        metting_point_latitude: null,
        metting_point_longitude: null,
        checkin: null,
        checkin_until: null,
        checkout: null,
        checkout_until: null,
        description: null,
        delete_imgs: [],
        urlInstagram: null,
        urlPinterest: null,
        urlFacebook: null,
        urlX: null,
        city: null,
        // images_hotel: JSON.parse(JSON.stringify(data_images.value)),
        images_hotel: [],
        show_profile: false,
        with_wifi: false,
    });
    const modalGaleryRef = ref(null);
    const isloadingForm = ref(false);
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const formRules = {
        name: [value => value.trim() ? true : 'Introduce el nombre de tu alojamiento'],
        email: [value => emailPattern.test(value) ? true : 'Formato de e-mail permitido ej: xxxx@email.com'],
        phone: [value => (value.trim().length > 10 && value.trim().length < 16) && value.includes('+')  ? true : 'La cantidad de dígitos ingresada es incorrecta'],
        phone_optional: [value => !value || (!!value && (value.trim().length > 10 && value.trim().length < 16) && value.includes('+')) ? true : 'La cantidad de dígitos ingresada es incorrecta'],
    };

    const { errors, validateField, formInvalid } = useFormValidation(form, formRules);

    const hotelData = reactive({});
    const profilePageSectionMap = ref(null);

    const categoryLodging = computed(()=>{
        let options = [
            { value: 1, label: "1 estrella" },
            { value: 2, label: "2 estrellas" },
            { value: 3, label: "3 estrellas" },
            { value: 4, label: "4 estrellas" },
            { value: 6, label: "4 estrellas Superior" },
            { value: 5, label: "5 estrellas" },
            { value: 7, label: "5 estrellas Gran Lujo" },
        ];
        // if (form.type == "Hostal" || form.type == "Pensión") {
        //     options = [
        //     { value: 1, label: "1 estrella" },
        //     { value: 2, label: "2 estrellas" },
        //     { value: 3, label: "3 estrellas" }
        //     ];
        // }
        return options;
    });

    const typeLodging = [
        { value: "Hotel", label: "Hotel", disabled: false },
        { value: "hostal", label: "Hostal", disabled: false },
        { value: "pension", label: "Pensión", disabled: false },
        {
            value: "ca",
            label: "Complejo de apartamentos",
            disabled: true,
            tag: { text: "Próximamente", class: "success-tag" }
        },
        {
            value: "at",
            label: "Apartamento turístico",
            disabled: true,
            tag: { text: "Próximamente", class: "success-tag" }
        },
        {
            value: "vft",
            label: "Vivienda con fines turísticos",
            disabled: true,
            tag: { text: "Próximamente", class: "success-tag" }
        },
    ]


    provide('form', form)
    provide('hotelData', hotelData)

    onMounted(async() => {
        loadHotel()
        loadMockup()
        await nextTick();
        useScrollToElement();
    })

    // COMPUTED
    const isChanged = computed(()=>{
        let c =
            form.name !== hotelData.name || form.type !== hotelData.type ||
            Number(form.category) !== Number(hotelData.category) ||
            normalize(form.email) !== normalize(hotelData.email) ||
            normalize(form.phone) !== normalize(hotelData.phone) ||
            normalize(form.phone_optional) !== normalize(hotelData?.phone_optional) ||
            Boolean(form.with_wifi) !== Boolean(hotelData.with_wifi) ||
            normalize(form.address) !== hotelData.address ||
            normalize(form.checkin) !== hotelData.checkin ||
            normalize(form.checkin_until) !== hotelData.checkin_until ||
            normalize(form.checkout) !== hotelData.checkout ||
            normalize(form.checkout_until) !== hotelData.checkout_until ||
            normalize(form.description) !== hotelData.description ||
            normalize(form.urlInstagram) !== hotelData.instagram_url ||
            normalize(form.urlPinterest) !== hotelData.pinterest_url ||
            normalize(form.urlFacebook) !== hotelData.facebook_url ||
            normalize(form.urlX) !== hotelData.x_url ||
            form.images_hotel?.length !== hotelData.images?.length ||
            Boolean(form.show_profile) !== Boolean(hotelData.show_profile);
        return c;
    });

    //FUNCTIONS

    const normalize = (value) => {
      return value === "" || value === null || value === undefined ? null : value;
    }

    async function loadHotel () {
        const hotel = await hotelStorage.$findByParams()
        Object.assign(hotelData, hotel)
        loadForm(hotel)
        loadMap()
    }

    function loadMap () {
        if (profilePageSectionMap.value?.initGoogleMap) {
            profilePageSectionMap.value.initGoogleMap()
        }
    }

    function loadForm(hotel) {
        form.hotel_id = hotel.id || null;
        form.name = hotel.name || null;
        form.type = hotel.type || null;
        form.category = hotel.category || null;
        form.email = hotel.email || null;
        form.phone = hotel.phone || null;
        form.phone_optional = hotel.phone_optional || null;
        form.address = hotel.address || null;
        form.metting_point_latitude = hotel.latitude || null;
        form.metting_point_longitude = hotel.longitude || null;
        form.checkin = hotel.checkin || null;
        form.checkin_until = hotel.checkin_until || null;
        form.checkout = hotel.checkout || null;
        form.checkout_until = hotel.checkout_until || null;
        form.description = hotel.description || null;
        form.urlInstagram = hotel.instagram_url || null;
        form.urlPinterest = hotel.pinterest_url || null;
        form.urlFacebook = hotel.facebook_url || null;
        form.urlX = hotel.x_url || null;
        form.city = hotel.city || null;
        form.images_hotel = [...hotel.images];
        form.show_profile = hotel.show_profile || false;
        form.with_wifi = hotel.with_wifi || false;
    }

    function updateShowHotel (val) {
        form.show_profile = val
        mockupStore.$reloadIframe()
    }

    const validate = (field) => {
        validateField(field)
    }
    
    function loadMockup () {
        mockupStore.$setIframeUrl('/sobre-nosotros')
        mockupStore.$setInfo1('Guarda para ver tus cambios en tiempo real', '/assets/icons/info.svg')
        mockupStore.$setLanguageTooltip(true)
    }
    // Bienvenido al Hotel Nobu, donde la elegancia se encuentra con la comodidad en el corazón de la ciudad. Nuestras habitaciones lujosas y nuestras instalaciones de primera clase te ofrecen una estancia inolvidable. Disfruta de deliciosa cocina internacional, relájate en nuestro bar y spa, y aprovecha nuestras instalaciones para eventos. Con servicio impecable y atención personalizada, tu experiencia en el Hotel Nobu será única.

    async function submit () {
        // isloadingForm.value = true
        form.metting_point_latitude = form.metting_point_latitude?.toString()
        form.metting_point_longitude = form.metting_point_longitude?.toString()
        const body = {...form}
        const response  = await hotelStorage.$updateProfile(body);
        // console.log(response, 'response')
        const  {ok, data} = response ?? {}
        await loadHotel()
        isloadingForm.value = false
        if (ok) {
            toast.warningToast('Cambios guardados con éxito','top-right');
        } else {
            toast.warningToast(data?.message,'top-right');
        }
        mockupStore.$reloadIframe()
    }

    function openModelGallery () {
        modalGaleryRef.value.openModal();
    }

    function addNewsImages (images) {
        images.forEach(item => {
            let { url, name, type } = item;
            form.images_hotel.unshift({ id: null, url, name, type });
        });
    }

</script>

