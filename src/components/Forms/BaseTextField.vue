<template>
    <div class="relative" :class="classContent">
        <img
            v-if="prependInnerIcon"
            :src="prependInnerIcon"
            alt="prepend inner icon"
            class="absolute left-3 top-[7.5px] w-6 h-6 z-10"
        >
        <div class="relative">
            <input
                ref="inputElement"
                :id="inputId"
                :type="type"
                :value="inputValue"
                @input="handleInput"
                class="w-full hinput border rounded-[6px]"
                :class="customInputClass"
                :placeholder="placeholder"
                :minlength="min"
                :maxlength="max"
                @keyup.enter="searchbyenter"
                @keypress="searchbyKey"
                @keyup.prevent="handleKeyup"
                @click="onClick"
                @blur="handleBlur"
                :disabled="disabled"
                :step="type === 'number' ? '0.01' : undefined"
            >
            <div v-if="(safeErrors[name] && safeErrors[name] != true) || max" class="flex w-full" :class="!(safeErrors[name] && safeErrors[name] != true) && max ? 'justify-end' : 'justify-between'">
                <p v-if="safeErrors[name] && safeErrors[name] != true" class="text-[10px] font-medium text-left mt-[4px] text-red-600 flex items-center">
                    <img class="inline w-4 h-4 mr-2" src="/assets/icons/1.TH.WARNING.RED.svg">
                    {{ safeErrors[name] }}
                </p>
                <p class="text-[12px] htext-gray-500 text-right mt-[4px]">{{ max ? `${inputValue?.length || 0}/${max || 0}` : '' }}</p>
            </div>
        </div>
        <button
            v-if="appendInnerIcon?.icon && appendInnerIcon?.type === 'BUTTON' && appendInnerIcon?.show"
            class="absolute right-3 top-2"
            @click="$emit('click:appendInner')"
        >
            <img class="w-6 h-6" :src="appendInnerIcon.icon" alt="append inner icon">
        </button>
        <img
            v-if="appendInnerIcon?.icon && appendInnerIcon?.type === 'ICON' && appendInnerIcon?.show"
            class="w-6 h-6 absolute right-3 top-3"
            :src="appendInnerIcon.icon"
            alt="append inner icon"
        >
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const emit = defineEmits([
    'click:appendInner',
    'update:modelValue',
    'blur:validate',
    'enter:search',
    'enter:key',
    'input:typing',
    'click',
    'keyup:prevent',
    'input:search',
]);

const props = defineProps({
    type: { type: String, default: 'text' },
    classContent: { type: String, default: '' },
    classInput: { type: String, default: '' },
    prependInnerIcon: { type: String, default: '' },
    appendInnerIcon: {
        type: Object,
        default: () => ({ icon: null, type: null, show: false }),
    },
    placeholder: { type: String, default: '' },
    modelValue: { type: [String, Number], default: '' },
    min: { type: Number, default: null },
    max: { type: Number, default: null },
    name: { type: String, default: '' },
    error: { type: Boolean, default: false },
    errors: {
        type: Object,
        default: () => ({}),
    },
    disabled: { type: Boolean, default: false },
    inputId: { type: String, default: 'InputData' },
    decimalPlaces: { type: Number, default: 2 }, // Número de decimales
});

const safeErrors = computed(() => props.errors || {});

const inputValue = ref(props.modelValue);

watch(inputValue, (newValue) => {
    emit('update:modelValue', newValue);
    emit('input:typing', newValue);
    emit('blur:validate');
});

watch(
    () => props.modelValue,
    (newValue) => {
        inputValue.value = newValue;
    }
);

const customInputClass = computed(() => {
    let c = `${props.classInput} p-3 h-10 text-sm`;
    if (props.prependInnerIcon) {
        c += ' pl-11';
    }
    if (safeErrors.value?.[props.name] && safeErrors.value?.[props.name] != true) {
        c += ' hinput-error';
    }
    if (props.disabled) {
        c += ' bg-[#FAFAFA] border-[#BFBFBF] text-[#A0A0A0]';
    }
    return c;
});

const handleInput = (event) => {
    let value = event.target.value;

    if (props.type === 'number') {
        value = value.replace(/[^0-9.]/g, ''); // Permitir solo números y puntos decimales
        if (value) {
            value = parseFloat(value).toFixed(props.decimalPlaces); // Formatear con decimales
        }
    }

    inputValue.value = value;
    emit('update:modelValue', value);
};

const onClick = () => {
    emit('click');
};
</script>

<style lang="scss" scoped>
.hinput-error {
    border-color: #DC2626;
}
input::placeholder {
    font-weight: 500;
    color: var(--h-gray-500);
}
</style>
