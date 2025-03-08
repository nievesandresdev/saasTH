<template>
    <div class="space-y-4">
        <div class="space-y-2">
             <label class="text-sm font-medium">Nombre del subservicio</label>
            <BaseTextField
                v-model="form.name"
                placeholder="Ej: Salón de masajes"
                class-content="flex-1"
                name="name"
                :max="'50'"
                :errors="errors"
                @blur:validate="validate('name')"
            />
        </div>
        <div class="space-y-2">
             <label class="text-sm font-medium">Descripción</label>
            <BaseTextareaField
                v-model="form.description"
                placeholder="Descubre la relajación absoluta con nuestro Masaje con Aceites, un tratamiento que combina técnicas suaves de masaje con aceites esenciales naturales cuidadosamente seleccionados para aliviar el estrés, mejorar la circulación y revitalizar tus sentidos."
                class-content="flex-1"
                class-input="text-sm h-[66px] min-h-[64px] p-3"
                name="description"
            />
        </div>
        <div class="space-y-2">
             <label class="text-sm font-medium">Imagen del subservicio</label>
             <div class="flex space-x-2 flex items-center">
                <BaseCardCreateImage title="Añadir imagen" :url-image="confortStore.formatImage(form.image)" @click="openGallery()" />
                <p class="text-sm font-medium htext-gray-500">Podrás añadir máximo una imagen por subservicio</p>
             </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, defineEmits, provide, computed, inject, watch } from 'vue';
// COMPONENTS
import BaseTextField from "@/components/Forms/BaseTextField.vue";
import BaseTextareaField from "@/components/Forms/BaseTextareaField.vue";
import BaseTooltipResponsive from "@/components/BaseTooltipResponsive.vue";
import Editor from "@/components/Forms/Editor.vue";

const emits = defineEmits(['open:gallery']);

import BaseCardCreateImage from '@/components/Card/BaseCardCreateImage.vue';

const confortStore = inject('confortStore');
const form = inject('form');
const errors = inject('errors');
const formRules = inject('formRules');
const validateField = inject('validateField');

// DATA
const radioItems = [
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



const validate = (field) => {
    validateField(field);
}

watch(() => form.type_price, () => {
    formRules.price =  [
      (value) => {
        if (form.type_price === 3) {
          return true; // Si es 3, no validar
        }
        return !!value ? true : 'Este campo es obligatorio';
      },
    ];
    validate('price');
});

watch(() => form.price, () => {
    formRules.price =  [
      (value) => {
        if (form.type_price === 3) {
          return true; // Si es 3, no validar
        }
        return !!value ? true : 'Este campo es obligatorio';
      },
    ];
    validate('price');
});

const resetPrice = (v) => {
    let price = v.target.value;
    if (price == 3) {
        form.price = null;
    }
}

function openGallery (){
    emits('open:gallery');
}

</script>