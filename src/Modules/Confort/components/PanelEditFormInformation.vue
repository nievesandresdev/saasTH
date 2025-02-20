<template>
    <div class="space-y-4">
        <div class="space-y-2">
             <label class="text-sm font-medium">Nombre del servicio</label>
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
            <Editor
                v-model="form.description"
                :placeholder="`Ej: Disfruta de nuestro salón de masajes. Ofrecemos una amplia gama de tratamientos personalizados.
Opciones del servicio:
1. Masaje con aceites - 60 minutos - 50€
2. Stone hot massage - 90 minutos - 80€
3. Masaje con aromaterapia - 75 minutos - 70€
                `"
                mandatory
                :max-length="4000"
                countType="static"
                minHeight="180px"
                @validation="textTitleFull = $event"
            />
        </div>
        <div class="space-y-2">
             <label class="text-sm font-medium">Cómo contratar</label>
            <BaseTextareaField
                v-model="form.hire"
                :placeholder="`Ej: Para reservar tu cita, contacta con la recepción del hotel o visita directamente nuestro salón. También puedes gestionar tu reserva a través de la página web.`"
                class-content="flex-1"
                name="hire"
                :errors="errors"
                @blur:validate="validate('hire')"
            />
        </div>
        <div class="space-y-2">
             <label class="text-sm font-medium">Enlace a la página web para reservar (opcional)</label>
            <BaseTextField
                v-model="form.link_url"
                placeholder="Ej: https//www.nombredehotel.com/es/hotel/masajes/offers"
                class-content="flex-1"
                name="link_url"
                :errors="errors"
                @blur:validate="validate('link_url')"
            />
        </div>
        <div class="space-y-2">
            <label class="text-sm font-medium">Precio</label>
            <div class="flex space-x-4">
                <template v-for="(item, indexRadio) in radioItems">
                    <div class="flex space-x-1 items-center">
                        <input
                            v-model="form.type_price"
                            :value="item.value"
                            :checked="form.type_price === item.value"
                            name="price-type"
                            type="radio"
                            class="size-[24px] hradio"
                            @change="resetPrice"
                        >
                        <label class="text-xs font-medium">{{ item.label }}</label>
                        <BaseTooltipResponsive
                            v-if="item?.tooltip"
                            size="xs"
                            :top="-88"
                            :left="0"
                        >
                            <template #button>
                                <img class="w-[24px] h-[24px]" src="/assets/icons/TH.INFO.GREEN.svg">
                            </template>
                            <template #content>
                                <p class="text-xs leading-[150%]">
                                    Si son varios servicios, selecciona <span class="font-bold">desde</span> y añade el de menor importe.
                                </p>
                            </template>
                        </BaseTooltipResponsive>
                    </div>
                </template>
            </div>
            <div class="flex space-x-2 items-center">
                <BaseTextField
                    v-model="form.price"
                    type="number"
                    :disabled="form.type_price == 3"
                    placeholder="0,00"
                    class-content="w-[80px]"
                    class-input="text-right"
                    name="price"
                    :errors="errors"
                />
                <span
                    :class="{'opacity-40': form.type_price == 3}"
                    class="text-sm font-medium"
                >
                    Є
                </span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, provide, computed, inject } from 'vue';
// COMPONENTS
import BaseTextField from "@/components/Forms/BaseTextField.vue";
import BaseTextareaField from "@/components/Forms/BaseTextareaField.vue";
import BaseTooltipResponsive from "@/components/BaseTooltipResponsive.vue";
import Editor from "@/components/Forms/Editor.vue";

const form = inject('form');
const errors = inject('errors');
const validateField = inject('validateField');

// DATA
const radioItems = [
    {
        label: 'Uníco',
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

const resetPrice = (v) => {
    let price = v.target.value;
    if (price == 3) {
        form.price = null;
    }
}

</script>