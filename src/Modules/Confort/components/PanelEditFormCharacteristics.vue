<template>
    <div class="space-y-4">
        <div class="space-y-2 pb-2">
             <label class="text-sm font-medium">Cantidad de servicios</label>
            <BaseSelectField
                id="type-service"
                :textLabel="'Cantidad de servicio'"
                v-model="form.type"
                :options="ServiceTypeArray"
                mandatory
            />
        </div>
        <template v-if="form.type == 1">
            <PanelEditFormCharacteristicsUnico />
        </template>
        <template v-else>
            <PanelEditFormCharacteristicsVarious />
        </template>
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

import PanelEditFormCharacteristicsUnico from "./PanelEditFormCharacteristicsUnico.vue";
import PanelEditFormCharacteristicsVarious from "./PanelEditFormCharacteristicsVarious.vue";

import { ServiceTypeArray } from "@/shared/enums/ServiceTypeEnum";

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
    availability: false,
});

onMounted(() => {
    loadInputsVisibles();
})

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