<template>
    <div class="space-y-4">
        <div class="flex space-x-2">
            <div class="mr-2 font-medium text-sm" :class="form.featured ? 'htext-green-800' : 'htext-black-100'">EXPERIENCIA RECOMENDADA</div>
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
                name="recommendation"
                :max="'300'"
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


    watch(modelActive, async (newVal) => {
    });

const validate = (field) => {
    validateField(field);
}

</script>