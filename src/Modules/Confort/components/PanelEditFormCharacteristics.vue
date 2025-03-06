<template>
    <div class="space-y-4">
        <div class="space-y-2">
             <label class="text-sm font-medium">Cantidad de servicios</label>
            <BaseSelectField
                id="type-service"
                :textLabel="'Cantidad de servicio'"
                v-model="dropdownFilter"
                :options="typeServicesOptions"
                mandatory
            />
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, provide, computed, inject, watch } from 'vue';

// COMPONENTS
import BaseTextField from "@/components/Forms/BaseTextField.vue";
import BaseTextareaField from "@/components/Forms/BaseTextareaField.vue";
import BaseTooltipResponsive from "@/components/BaseTooltipResponsive.vue";
import Editor from "@/components/Forms/Editor.vue";

const form = inject('form');
const errors = inject('errors');
const formRules = inject('formRules');
const validateField = inject('validateField');

// DATA
const typeServicesOptions = [
    {
        label: 'Único',
        value: 1,
    },
    {
        label: 'Desde',
        value: 2,
        tooltip: true,
    },
    {
        label: 'Gratuito',
        value: 3,
    },
];

</script>