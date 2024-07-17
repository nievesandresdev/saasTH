<template>
    <div class="space-y-4">
        <div class="flex space-x-2">
            <div class="mr-2 font-semibold text-sm" :class="form.featured ? 'htext-green-800' : 'htext-black-100'">LUGAR RECOMENDADO</div>
            <BaseSwichInput
                id="swich-recommendarion"
                v-model="form.featured"
                class="mr-4"
            />
        </div>
        <div class="space-y-2">
            <div class="flex justify-between">
                <label class="text-sm font-medium">Recomendación</label>
                <BaseTooltipResponsive
                    size="s"
                    :top="34"
                    :right="0"
                >
                    <template #button>
                        <img class="w-[24px] h-[24px]" src="/assets/icons/TH.INFO.GREEN.svg">
                        </template>
                        <template #content>
                        <p class="text-sm leading-[150%] font-normal">
                            Este texto opcional acompaña la recomendación del lugar, tus huéspedes lo verán en el detalle del mismo en tu WebApp
                        </p>
                    </template>
                </BaseTooltipResponsive>
            </div>
            <BaseTextareaField
                v-model="form.recommendation"
                placeholder="Cuéntales a tus huéspedes por qué este lugar es especial"
                class-content="flex-1"
                class-input="text-sm h-[44px]"
                name="recommendation"
                :max="'300'"
            />
        </div>
        <div class="space-y-2">
             <label class="text-sm font-medium">Titulo</label>
            <BaseTextField
                v-model="form.title"
                placeholder="Nombre del lugar"
                class-content="flex-1"
                class-input="text-sm h-[44px]"
                name="title"
                :max="'50'"
            />
        </div>
        <div class="space-y-2">
            <label class="text-sm font-medium">Descripción</label>
            <!-- <BaseTextField
                v-model="form.description"
                placeholder="Descripción del lugar"
                class-content="flex-1"
                class-input="text-sm h-[44px]"
                name="description"
                :max="'300'"
            /> -->
            <BaseTextareaField
                v-model="form.description"
                placeholder="Descripción del lugar"
                class-content="flex-1"
                class-input="text-sm h-[44px]"
                name="description"
                :max="'300'"
            />
        </div>
        <div class="space-y-2">
            <label class="text-sm font-medium">Ubicación</label>
            <!-- <div class="relative">
                <input
                    v-model="form.address"
                    type="text"
                    id="metting_point"
                    ref="metting_point"
                    class="h-[10px] rounded-[6px] text-sm font-medium w-full p-3 hoverForm"
                    :class="{
                        'hborder-alert-negative htext-alert-negative no-hover-input': !form.address,
                        'hborder-black-100': form.address,
                    }"
                    :placeholder="'Introduce la ubicación hotel'"
                />
            </div>
            <div
                id="map"
                class="h-[159px] w-full rounded-[10px] border-1 hborder-black-100 mt-4"
                v-show="itemSelected.metting_point_latitude !== form.metting_point_latitude && showMap"
            ></div> -->
            <BaseTextField
                v-model="form.address"
                placeholder="Introduce la ubicación"
                class-content="flex-1"
                class-input="text-sm h-[44px]"
                :max="'50'"
            />
        </div>
        <div class="space-y-2">
            <label class="text-sm font-medium">Teléfono</label>
            <BaseTextField
                v-model="form.phone"
                placeholder="Introduce el teléfono"
                class-content="flex-1"
                class-input="text-sm h-[44px]"
                :max="'50'"
            />
        </div>
        <div class="space-y-2">
            <label class="text-sm font-medium">Correo electrónico</label>
            <BaseTextField
                v-model="form.email"
                placeholder="Introduce el correo electrónico"
                class-content="flex-1"
                class-input="text-sm h-[44px]"
                :max="'50'"
            />
        </div>
        <div class="space-y-2">
            <label class="text-sm font-medium">Web</label>
            <BaseTextField
                v-model="form.url_web"
                placeholder="Introduce el sitio web del lugar"
                class-content="flex-1"
                class-input="text-sm h-[44px]"
                :max="'50'"
            />
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, provide, computed, inject, watch } from 'vue';
import { useGoogleMaps } from '@/composables/useGoogleMaps';
// COMPONENTS
import BaseTextField from "@/components/Forms/BaseTextField.vue";
import BaseTextareaField from "@/components/Forms/BaseTextareaField.vue";
import BaseSwichInput from "@/components/Forms/BaseSwichInput.vue";
import BaseTooltipResponsive from "@/components/BaseTooltipResponsive.vue";

const { map, marker, loadMapScript, initMap } = useGoogleMaps();

const form = inject('form');
const itemSelected = inject('itemSelected');
const errors = inject('errors');
const modelActive = inject('modelActive');
const validateField = inject('validateField');

    const showMap = ref(false);
    const addressRef = ref(null);


    watch(() => itemSelected, (newVal, oldVal) => {
        // if (newVal && map.value && marker.value) {
        //     const newCenter = { lat: newVal.metting_point_latitude, lng: newVal.metting_point_longitude };
        //     map.value.setCenter(newCenter);
        //     marker.value.setPosition(newCenter);
        // }
    }, {
        deep: true,
        immediate: true
    });

    watch(modelActive, async (newVal) => {
        // if (newVal) {
        //     // Espera a que Vue actualice el DOM antes de cargar el script e inicializar el mapa
        //     await nextTick();
        //     try {
        //         console.log('d')
        //         await loadMapScript();
        //         const mapElement = document.getElementById('map');
        //         if (mapElement) {
        //             initMap(mapElement, { lat: -34.397, lng: 150.644 });
        //             initAutocomplete();
        //         }
        //     } catch (error) {
        //         console.error("Error loading Google Maps script", error);
        //     }
        // }
    });

const validate = (field) => {
    validateField(field);
}


const initAutocomplete = () => {
    autocomplete.value = new google.maps.places.Autocomplete(
        document.getElementById('metting_point'),
        { types: ['geocode'] }
    );

    autocomplete.value.bindTo('bounds', map.value);

    autocomplete.value.addListener('place_changed', () => {
        const place = autocomplete.value.getPlace();

        if (!place.geometry) {
            console.log("No details available for input: '" + place.name + "'");
            return;
        }

        // Actualiza las propiedades de form con la información del lugar seleccionado
        form.address = place.formatted_address || '';
        form.metting_point_latitude = place.geometry.location.lat();
        form.metting_point_longitude = place.geometry.location.lng();

        if (place.geometry.viewport) {
            map.value.fitBounds(place.geometry.viewport);
        } else {
            map.value.setCenter(place.geometry.location);
            map.value.setZoom(17);
        }

        marker.value.setPosition(place.geometry.location);

        showMap.value = true;
        // console.log('form.address',form.address)
        // console.log('showMap.value',showMap.value)
        // console.log('form.metting_point_latitude',form.metting_point_latitude)
        // console.log('form.metting_point_longitude',form.metting_point_longitude)
    });
};

</script>