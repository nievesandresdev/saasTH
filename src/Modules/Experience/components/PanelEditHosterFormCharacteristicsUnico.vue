<template>
    <div class="space-y-2">
        <label class="text-sm font-semibold mb-2">Precio del Servicio</label>
        <div class="flex space-x-1">
            <label class="text-sm font-semibold">Gratis</label>
            <BaseSwichInput
              v-model="inputsVisibles.price"
              class-content="w-full"
              class-input="text-sm"
              id="price-switch"
              @change="resetPriceFree(form)"
            />
        </div>
        <div class="flex items-center">
            <BaseTextField
                v-model="form.price"
                type="number"
                :disabled="form.type_price == 3 || form.fields_visibles.includes('PRICE')"
                placeholder="0,00"
                class-content="w-[80px]"
                class-input="text-right"
                is-price
            />
            <!--  -->
            <span
                :class="{'opacity-40': form.type_price == 3}"
                class="text-sm font-medium ml-2"
            >
                €
            </span>
        </div>
    </div>
    <div class="space-y-2">
        <div class="flex">
            <label class="text-sm font-semibold">Duración</label>
            <BaseSwichInput
              v-model="inputsVisibles.duration"
              class-content="w-full"
              class-input="text-sm"
              id="duration-switch"
            />
        </div>
        <div class="flex items-center">
            <BaseTextField
                v-model="form.duration"
                type="number"
                placeholder="0"
                class-content="w-[80px]"
                class-input="text-right"
            />
            <!--  -->
            <span
                :class="{'opacity-40': form.type_price == 3}"
                class="text-sm font-medium ml-2"
            >
                h
            </span>
        </div>
    </div>
    <div class="space-y-2 w-full">
        <div class="flex space-x-1">
            <label class="text-sm font-semibold">Disponibilidad</label>
            <BaseSwichInput
              v-model="inputsVisibles.availability"
              class-content="w-full"
              class-input="text-sm"
              id="availability-switch"
            />
        </div>
        <div class="flex items-center">
            <BaseTextField
                v-model="form.availability"
                placeholder="Ej: durante toda la estancia"
                class-content="flex-1"
                name="availability"
            />
        </div>
    </div>
    <div class="space-y-2">
        <div class="flex space-x-1">
            <label class="text-sm font-semibold mb-2">Accesible</label>
            <BaseSwichInput
              v-model="inputsVisibles.accessible"
              class-content="w-full"
              class-input="text-sm"
              id="accessible-switch"
            />
        </div>
    </div>
    <div class="space-y-2 w-full">
        <div class="flex space-x-1">
            <label class="text-sm font-semibold">Ubicación</label>
            <BaseSwichInput
              v-model="inputsVisibles.address"
              class-content="w-full"
              class-input="text-sm"
              id="address-switch"
            />
        </div>
        <div class="flex items-center">
            <BaseTextField
                v-model="form.address"
                placeholder="Ej: recepción del hotel"
                class-content="flex-1"
                name="requeriment"
            />
        </div>
    </div>
    <div class="space-y-2 w-full">
        <div class="flex space-x-1">
            <label class="text-sm font-semibold">Idiomas disponibles</label>
            <BaseSwichInput
              v-model="inputsVisibles.languages"
              class-content="w-full"
              class-input="text-sm"
              id="languages-switch"
            />
        </div>
        <div class=" items-center w-full">
            <InputSearchLanguage v-model="form.languages" placeholder="Busca y añade los idiomas disponibles"/>
        </div>
    </div>
    <div class="space-y-2">
        <div class="flex space-x-1">
            <label class="text-sm font-semibold">Requisitos</label>
            <BaseSwichInput
              v-model="inputsVisibles.requeriment"
              class-content="w-full"
              class-input="text-sm"
              id="requirement-switch"
            />
        </div>
        <div class="flex items-center">
            <!-- <BaseTextField
                v-model="form.requeriment"
                placeholder="Ej: debe traer su propia indumentaria"
                class-content="flex-1"
                name="requeriment"
            /> -->
            <BaseTextareaField
                v-model="form.requeriment"
                placeholder="Ej: debe traer su propia indumentaria"
                class-content="flex-1"
                name="requeriment"
            />
            <!-- <Editor
                v-model="form.requeriment"
                :placeholder="'Ej: debe traer su propia indumentaria'"
                mandatory
                :max-length="4000"
                countType="static"
                minHeight="180px"
            /> -->
        </div>
    </div>
</template>

<script setup>

import { ref, reactive, onMounted, provide, computed, inject, watch } from 'vue';

// COMPONENTS
import BaseTextField from "@/components/Forms/BaseTextField.vue";
import BaseTextareaField from "@/components/Forms/BaseTextareaField.vue";
import BaseSelectField from "@/components/Forms/BaseSelectField.vue";
import BaseSwichInput from "@/components/Forms/BaseSwichInput.vue";
import InputSearchLanguage from "@/components/Forms/InputSearchLanguage.vue";
import BaseTooltipResponsive from "@/components/BaseTooltipResponsive.vue";
import Editor from "@/components/Forms/Editor.vue";

import { ServiceTypeArray } from "@/shared/enums/ServiceTypeEnum";

import { useService } from '@/composables/useService';
const { resetPriceFree } = useService();

const form = inject('form');
const errors = inject('errors');
const formRules = inject('formRules');
const validateField = inject('validateField');

const inputsVisibles = ref({
    price: false,
    duration: false,
    accessible: false,
    address: false,
    requeriment: false,
    languages: false,
});

onMounted(() => {
    loadInputsVisibles();
})

watch(() => form.requeriment, (value) => {
    if (value == '<p><br></p>') {
        form.requeriment = '';
    }
});

watch(inputsVisibles, (inputs) => {
    for (let [key, value] of Object.entries(inputs)) {
        if (value && !form.fields_visibles.includes(key.toUpperCase())) {
            form.fields_visibles.push(key.toUpperCase());
        }
        if (!value && form.fields_visibles.includes(key.toUpperCase())) {
            let index = form.fields_visibles.indexOf(key.toUpperCase());
            form.fields_visibles.splice(index, 1);
        }
    }
}, {deep: true});

// FUNCTION
function loadInputsVisibles () {
    for (let field of form.fields_visibles) {
        let fieldLower = field.toLowerCase();
        inputsVisibles.value[fieldLower] = true;
    }
}

</script>