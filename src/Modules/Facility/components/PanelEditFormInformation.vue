<template>
    <div class="space-y-4">
        <div class="space-y-2">
             <label class="text-sm font-medium">Nombre de la instalación</label>
            <BaseTextField
                v-model="form.title"
                placeholder="Nueva instalación"
                class-content="flex-1"
                class-input="text-sm h-[44px]"
                name="title"
                :max="'50'"
                :errors="errors"
                @blur:validate="validate('title')"
            />
        </div>
        <div class="space-y-2">
             <label class="text-sm font-medium">Descripción</label>
            <BaseTextField
                v-model="form.description"
                placeholder="Describe la nueva instalación"
                class-content="flex-1"
                class-input="text-sm h-[44px]"
                name="description"
                :max="'500'"
            />
        </div>
        <div class="space-y-2">
            <div class="flex items-center">
                <label class="text-sm font-medium mr-2">Etiqueta de anuncio</label>
                <BaseTooltipResponsive
                    size="s"
                    :top="40"
                    :left="0"
                >
                    <template #button>
                        <img class="w-[24px] h-[24px]" src="/assets/icons/TH.INFO.GREEN.svg">
                        </template>
                        <template #content>
                        <p class="text-sm leading-[150%] font-normal">
                            Puedes agregar una etiqueta para anunciar información eventual sobre esta instalación. 
                        </p>
                        <p class="mt-2 text-sm leading-[150%] font-normal">
                            Ej: “Cierre temporal”, “20% Off”, “Happy hour”, etc.
                        </p>
                    </template>
                </BaseTooltipResponsive>
            </div>
            <BaseTextField
                v-model="form.ad_tag"
                placeholder="Ingresa tu texto"
                class-content="flex-1"
                class-input="text-sm h-[44px]"
                name="ad_tag"
                :max="'20'"
            />
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, provide, computed, inject } from 'vue';
// COMPONENTS
import BaseTextField from "@/components/Forms/BaseTextField.vue";
import BaseTooltipResponsive from "@/components/BaseTooltipResponsive.vue";

const form = inject('form');
const errors = inject('errors');
const validateField = inject('validateField');

const validate = (field) => {
    validateField(field);
}

</script>